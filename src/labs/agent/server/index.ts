import cors from "cors";
import express from "express";
import { existsSync } from "node:fs";
import { runAgentLoop } from "./agent/loop.js";
import { loadCatalog, resolveLines, type ResolveLine } from "./catalog.js";
import { filePathFor } from "./excel.js";
import { generateExcelIfConfirmed } from "./excelGate.js";
import {
  attachQuote,
  confirmQuote,
  createSession,
  getSession,
} from "./sessions.js";
import { extractKakaoText, toKakaoSkillResponse } from "./kakao/adapter.js";
import { executeTool, listToolSchemas } from "./tools/execute.js";

const PORT = Number(process.env.PORT) || 8787;

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "order-settlement-agent" });
});

app.get("/catalog", (_req, res) => {
  res.json({ items: loadCatalog() });
});

app.post("/catalog/resolve", (req, res) => {
  const lines = req.body?.lines as ResolveLine[] | undefined;
  if (!Array.isArray(lines) || lines.length === 0) {
    res.status(400).json({ error: "body.lines[] required" });
    return;
  }
  for (const line of lines) {
    if (!line?.raw || typeof line.qty !== "number") {
      res.status(400).json({ error: "each line needs raw + qty" });
      return;
    }
  }
  res.json(resolveLines(lines));
});

app.get("/tools", (_req, res) => {
  res.json({ tools: listToolSchemas() });
});

app.post("/tools/:name", (req, res) => {
  if (req.params.name === "generate_settlement_excel") {
    const sessionId = req.body?.sessionId as string | undefined;
    if (!sessionId) {
      res.status(400).json({ ok: false, error: "sessionId required" });
      return;
    }
    const out = generateExcelIfConfirmed(sessionId);
    if (!out.ok) {
      res.status(403).json(out);
      return;
    }
    res.json({ ok: true, tool: "generate_settlement_excel", result: out });
    return;
  }

  const result = executeTool(req.params.name, req.body ?? {});
  if (!result.ok) {
    res.status(400).json(result);
    return;
  }
  res.json(result);
});

app.post("/chat", async (req, res) => {
  const text = req.body?.message ?? req.body?.text;
  if (typeof text !== "string" || !text.trim()) {
    res.status(400).json({ error: "body.message required" });
    return;
  }
  const maxSteps = Number(req.body?.maxSteps) || undefined;
  const session = createSession();

  try {
    const result = await runAgentLoop(text.trim(), { maxSteps });
    let quote = null;
    if (result.pendingQuote) {
      quote = attachQuote(session.id, result.pendingQuote);
    }
    res.json({
      sessionId: session.id,
      ...result,
      quote,
      needsConfirm: Boolean(quote),
    });
  } catch (err) {
    res.status(502).json({
      sessionId: session.id,
      error: err instanceof Error ? err.message : "agent loop failed",
      retryable: true,
    });
  }
});

/**
 * 카카오 오픈빌더 스킬 웹훅 스텁 (실채널 X).
 * @see docs/KAKAO-SETUP.md
 */
app.post("/webhook/kakao", async (req, res) => {
  const { text, userKey } = extractKakaoText(req.body);
  if (!text) {
    res.status(400).json({
      ok: false,
      error: "utterance/message required",
      hint: "see server/kakao/fixtures/sample-utterance.json",
    });
    return;
  }

  // «확인 <sessionId>» 퀵리플라이 → HITL confirm
  const confirmMatch = /^확인\s+(\S+)/.exec(text);
  if (confirmMatch) {
    try {
      const s = confirmQuote(confirmMatch[1]);
      const excel = generateExcelIfConfirmed(s.id);
      if (!excel.ok) {
        res.status(400).json({ ok: false, ...excel });
        return;
      }
      const publicBase = (process.env.PUBLIC_BASE_URL || "").replace(/\/$/, "");
      const downloadUrl = publicBase
        ? `${publicBase}${excel.downloadUrl}`
        : excel.downloadUrl;
      res.json({
        ok: true,
        kakao: toKakaoSkillResponse({
          text: `정산서 ${excel.rowCount}행을 만들었습니다.`,
          sessionId: s.id,
          downloadUrl,
        }),
        excel,
        userKey,
      });
    } catch (err) {
      res.status(404).json({
        ok: false,
        error: err instanceof Error ? err.message : "confirm failed",
      });
    }
    return;
  }

  const session = createSession();
  try {
    const result = await runAgentLoop(text);
    let quote = null;
    if (result.pendingQuote) {
      quote = attachQuote(session.id, result.pendingQuote);
    }
    const needsConfirm = Boolean(quote);
    const summary = needsConfirm
      ? `${result.assistantText}\n합계 ${quote!.total.toLocaleString()}원`
      : result.assistantText;

    res.json({
      ok: true,
      sessionId: session.id,
      userKey,
      pipeline: {
        assistantText: result.assistantText,
        trace: result.trace,
        quote,
        needsConfirm,
      },
      kakao: toKakaoSkillResponse({
        text: summary,
        sessionId: session.id,
        needsConfirm,
      }),
    });
  } catch (err) {
    res.status(502).json({
      ok: false,
      sessionId: session.id,
      error: err instanceof Error ? err.message : "webhook failed",
      kakao: toKakaoSkillResponse({
        text: "일시 오류입니다. 잠시 후 다시 보내 주세요.",
      }),
    });
  }
});

app.post("/sessions/:id/confirm-quote", (req, res) => {
  try {
    const s = confirmQuote(req.params.id);
    const excel = generateExcelIfConfirmed(s.id);
    if (!excel.ok) {
      res.status(400).json(excel);
      return;
    }
    res.json({
      confirmed: true,
      quote: s.quote,
      excel,
    });
  } catch (err) {
    res.status(404).json({
      error: err instanceof Error ? err.message : "confirm failed",
    });
  }
});

/** 확인 없이 엑셀만 요청 → 403 */
app.post("/sessions/:id/excel", (req, res) => {
  const s = getSession(req.params.id);
  if (!s) {
    res.status(404).json({ error: "session not found" });
    return;
  }
  const excel = generateExcelIfConfirmed(s.id);
  if (!excel.ok) {
    res.status(403).json(excel);
    return;
  }
  res.json(excel);
});

app.get("/files/:fileId", (req, res) => {
  const path = filePathFor(req.params.fileId);
  if (!existsSync(path)) {
    res.status(404).json({ error: "file not found" });
    return;
  }
  res.download(path, `settlement-${req.params.fileId}.xlsx`);
});

app.listen(PORT, () => {
  console.log(`[server] http://localhost:${PORT}/health`);
});
