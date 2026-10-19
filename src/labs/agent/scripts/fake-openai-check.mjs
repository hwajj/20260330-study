// 키 없이 실 LLM 경로 요청 형식을 검증: 가짜 OpenAI 서버 + 서버 /chat
import { spawn } from "node:child_process";
import http from "node:http";

const FAKE_PORT = 9911;
const APP_PORT = 8799;
const problems = [];
let calls = 0;

const fake = http.createServer((req, res) => {
  let body = "";
  req.on("data", (c) => (body += c));
  req.on("end", () => {
    const j = JSON.parse(body);
    calls += 1;

    if (calls === 1) {
      const names = (j.tools ?? []).map((t) => t.function.name);
      const parse = j.tools?.find((t) => t.function.name === "parse_line_items");
      if (names.length !== 4) problems.push(`tools count ${names.length}`);
      if (!parse?.function.parameters?.properties?.text)
        problems.push("parse_line_items parameters lack `text` property");
      if (!parse?.function.description || parse.function.description === "parse_line_items")
        problems.push("tool description missing");
    }

    // tool 메시지 앞에는 tool_calls 가진 assistant가 있어야 한다
    j.messages.forEach((m, i) => {
      if (m.role !== "tool") return;
      let k = i - 1;
      while (k >= 0 && j.messages[k].role === "tool") k -= 1;
      const prev = j.messages[k];
      const ids = (prev?.tool_calls ?? []).map((t) => t.id);
      if (prev?.role !== "assistant" || !ids.includes(m.tool_call_id))
        problems.push(`call ${calls}: tool msg ${m.tool_call_id} has no matching assistant.tool_calls`);
    });

    const toolCount = j.messages.filter((m) => m.role === "tool").length;
    const message =
      toolCount === 0
        ? {
            content: null,
            tool_calls: [
              {
                id: "c1",
                type: "function",
                function: { name: "parse_line_items", arguments: JSON.stringify({ text: "무2개 고춧가루 1통" }) },
              },
            ],
          }
        : { content: "done" };
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ choices: [{ message }] }));
  });
});

await new Promise((r) => fake.listen(FAKE_PORT, r));

const app = spawn("npx", ["tsx", "server/index.ts"], {
  cwd: new URL("..", import.meta.url),
  shell: true,
  env: {
    ...process.env,
    PORT: String(APP_PORT),
    OPENAI_API_KEY: "test-key",
    OPENAI_BASE_URL: `http://localhost:${FAKE_PORT}/v1`,
  },
  stdio: "ignore",
});

let ready = false;
for (let i = 0; i < 40 && !ready; i += 1) {
  await new Promise((r) => setTimeout(r, 500));
  ready = await fetch(`http://localhost:${APP_PORT}/health`).then((r) => r.ok).catch(() => false);
}

if (!ready) {
  problems.push("app did not start");
} else {
  const d = await fetch(`http://localhost:${APP_PORT}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: "무2개 고춧가루 1통" }),
  }).then((r) => r.json());
  console.log("assistantText:", d.assistantText, "| fake LLM calls:", calls);
  if (d.assistantText !== "done") problems.push(`unexpected assistantText: ${d.assistantText}`);
}

app.kill();
spawn("taskkill", ["/pid", String(app.pid), "/T", "/F"], { stdio: "ignore", shell: true });
fake.close();

if (problems.length) {
  console.log("FAIL\n- " + problems.join("\n- "));
  process.exit(1);
}
console.log("PASS: tools schema/description + assistant.tool_calls ordering OK");
process.exit(0);
