import { executeTool, type ToolExecResult } from "../tools/execute.js";
import { openAiTools, type ToolName } from "../tools/schemas.js";
import { SYSTEM_PROMPT } from "../prompt.js";
import type { QuoteRow } from "../sessions.js";

export type ChatMessage = {
  role: "system" | "user" | "assistant" | "tool";
  content: string;
  name?: string;
  tool_call_id?: string;
  /** assistant가 도구를 호출한 턴 — OpenAI는 tool 메시지 앞에 이 필드가 필요 */
  tool_calls?: ToolCall[];
};

export type TraceStep = {
  step: number;
  type: "assistant" | "tool";
  tool?: string;
  args?: unknown;
  resultSummary?: string;
  content?: string;
};

export type PendingQuote = {
  rows: QuoteRow[];
  subtotal: number;
  total: number;
};

export type LoopResult = {
  messages: ChatMessage[];
  assistantText: string;
  trace: TraceStep[];
  stepsUsed: number;
  capped: boolean;
  pendingQuote: PendingQuote | null;
  ambiguous?: unknown;
};

const DEFAULT_MAX_STEPS = 8;

type ToolCall = { id: string; name: string; arguments: string };

async function callModel(messages: ChatMessage[]): Promise<{
  content: string | null;
  tool_calls?: ToolCall[];
}> {
  const key = process.env.OPENAI_API_KEY;
  if (!key) {
    return mockModel(messages);
  }

  const base = (process.env.OPENAI_BASE_URL || "https://api.openai.com/v1").replace(
    /\/$/,
    "",
  );
  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

  const res = await fetch(`${base}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages: messages.map((m) => ({
        role: m.role,
        content: m.content,
        ...(m.name ? { name: m.name } : {}),
        ...(m.tool_call_id ? { tool_call_id: m.tool_call_id } : {}),
        ...(m.tool_calls?.length
          ? {
              tool_calls: m.tool_calls.map((t) => ({
                id: t.id,
                type: "function",
                function: { name: t.name, arguments: t.arguments },
              })),
            }
          : {}),
      })),
      tools: openAiTools(),
      tool_choice: "auto",
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`LLM ${res.status}: ${body.slice(0, 200)}`);
  }

  const data = (await res.json()) as {
    choices: {
      message: {
        content?: string | null;
        tool_calls?: {
          id: string;
          function: { name: string; arguments: string };
        }[];
      };
    }[];
  };
  const msg = data.choices[0]?.message;
  return {
    content: msg?.content ?? null,
    tool_calls: msg?.tool_calls?.map((t) => ({
      id: t.id,
      name: t.function.name,
      arguments: t.function.arguments,
    })),
  };
}

function mockModel(messages: ChatMessage[]): {
  content: string | null;
  tool_calls?: ToolCall[];
} {
  const toolResults = messages.filter((m) => m.role === "tool");
  const lastUser = [...messages].reverse().find((m) => m.role === "user");

  if (toolResults.length === 0 && lastUser) {
    return {
      content: null,
      tool_calls: [
        {
          id: "call_parse",
          name: "parse_line_items",
          arguments: JSON.stringify({ text: lastUser.content }),
        },
      ],
    };
  }

  if (toolResults.length === 1) {
    let lines: unknown[] = [];
    try {
      const parsed = JSON.parse(toolResults[0].content) as {
        result?: { lines?: unknown[] };
      };
      lines = parsed.result?.lines ?? [];
    } catch {
      lines = [];
    }
    return {
      content: null,
      tool_calls: [
        {
          id: "call_resolve",
          name: "resolve_products",
          arguments: JSON.stringify({ lines }),
        },
      ],
    };
  }

  if (toolResults.length === 2) {
    let items: unknown[] = [];
    try {
      const parsed = JSON.parse(toolResults[1].content) as {
        result?: { items?: unknown[]; ambiguous?: unknown };
      };
      items = parsed.result?.items ?? [];
      if (parsed.result?.ambiguous) {
        return {
          content:
            "품목이 애매합니다. 후보를 확인해 주세요. 예: 고추 → 고추(개) / 고춧가루(통).",
        };
      }
    } catch {
      items = [];
    }
    if (items.length === 0) {
      return { content: "매칭된 품목이 없습니다." };
    }
    return {
      content: null,
      tool_calls: [
        {
          id: "call_quote",
          name: "quote_settlement",
          arguments: JSON.stringify({ items }),
        },
      ],
    };
  }

  return {
    content: "이대로 정산서를 만들까요? 아래 요약에서 확인해 주세요.",
  };
}

function summarizeTool(result: ToolExecResult): string {
  if (!result.ok) return `error: ${result.error}`;
  const r = result.result;
  if (r && typeof r === "object") {
    return JSON.stringify(r).slice(0, 200);
  }
  return String(r).slice(0, 200);
}

function parseToolPayload(content: string): {
  pendingQuote: PendingQuote | null;
  ambiguous?: unknown;
} {
  try {
    const wrapped = JSON.parse(content) as {
      ok?: boolean;
      tool?: string;
      result?: {
        rows?: QuoteRow[];
        subtotal?: number;
        total?: number;
        ambiguous?: unknown;
        items?: unknown[];
      };
    };
    if (wrapped.tool === "quote_settlement" && wrapped.result?.rows) {
      return {
        pendingQuote: {
          rows: wrapped.result.rows,
          subtotal: wrapped.result.subtotal ?? 0,
          total: wrapped.result.total ?? 0,
        },
      };
    }
    if (wrapped.tool === "resolve_products" && wrapped.result?.ambiguous) {
      return { pendingQuote: null, ambiguous: wrapped.result.ambiguous };
    }
  } catch {
    /* ignore */
  }
  return { pendingQuote: null };
}

export async function runAgentLoop(
  userText: string,
  opts?: { maxSteps?: number; system?: string },
): Promise<LoopResult> {
  const maxSteps = opts?.maxSteps ?? DEFAULT_MAX_STEPS;
  const messages: ChatMessage[] = [
    {
      role: "system",
      content: opts?.system ?? SYSTEM_PROMPT,
    },
    { role: "user", content: userText },
  ];
  const trace: TraceStep[] = [];
  let stepsUsed = 0;
  let capped = false;
  let assistantText = "";
  let pendingQuote: PendingQuote | null = null;
  let ambiguous: unknown;

  while (stepsUsed < maxSteps) {
    stepsUsed += 1;
    const modelOut = await callModel(messages);

    if (modelOut.tool_calls?.length) {
      const names = modelOut.tool_calls.map((t) => t.name).join(", ");
      messages.push({
        role: "assistant",
        content: modelOut.content ?? "",
        tool_calls: modelOut.tool_calls,
      });
      trace.push({
        step: stepsUsed,
        type: "assistant",
        content: `tool_calls: ${names}`,
      });

      for (const call of modelOut.tool_calls) {
        // HITL: 루프 안에서 엑셀 생성 도구는 막음 — confirm API만
        if (call.name === "generate_settlement_excel") {
          const blocked = {
            ok: false as const,
            tool: call.name,
            error: "confirm required before excel",
          };
          trace.push({
            step: stepsUsed,
            type: "tool",
            tool: call.name,
            args: {},
            resultSummary: blocked.error,
          });
          messages.push({
            role: "tool",
            name: call.name as ToolName,
            tool_call_id: call.id,
            content: JSON.stringify(blocked),
          });
          continue;
        }

        let args: unknown = {};
        try {
          args = JSON.parse(call.arguments || "{}");
        } catch {
          args = {};
        }

        const result = executeTool(call.name, args);
        trace.push({
          step: stepsUsed,
          type: "tool",
          tool: call.name,
          args,
          resultSummary: summarizeTool(result),
        });

        const payload = JSON.stringify(result);
        const extracted = parseToolPayload(payload);
        if (extracted.pendingQuote) pendingQuote = extracted.pendingQuote;
        if (extracted.ambiguous) ambiguous = extracted.ambiguous;

        messages.push({
          role: "tool",
          name: call.name as ToolName,
          tool_call_id: call.id,
          content: payload,
        });
      }
      continue;
    }

    assistantText = modelOut.content?.trim() || "(빈 응답)";
    messages.push({ role: "assistant", content: assistantText });
    trace.push({ step: stepsUsed, type: "assistant", content: assistantText });
    break;
  }

  if (stepsUsed >= maxSteps && !assistantText) {
    capped = true;
    assistantText = `최대 단계(${maxSteps})에 도달해 중단했습니다.`;
    messages.push({ role: "assistant", content: assistantText });
    trace.push({ step: stepsUsed, type: "assistant", content: assistantText });
  }

  return {
    messages,
    assistantText,
    trace,
    stepsUsed,
    capped,
    pendingQuote,
    ambiguous,
  };
}
