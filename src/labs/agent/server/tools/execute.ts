import type { z } from "zod";
import { resolveLines } from "../catalog.js";
import { parseLineItems } from "./parseLineItems.js";
import {
  generateSettlementExcelArgs,
  parseLineItemsArgs,
  quoteSettlementArgs,
  resolveProductsArgs,
  TOOL_NAMES,
  type ToolName,
  toolSchemas,
} from "./schemas.js";

export type ToolExecResult =
  | { ok: true; tool: ToolName; result: unknown }
  | { ok: false; tool?: string; error: string; issues?: unknown };

/** 서버 전용 도구 실행. 잘못된 인자·미등록 도구 거절. */
export function executeTool(name: string, args: unknown): ToolExecResult {
  if (!TOOL_NAMES.includes(name as ToolName)) {
    return {
      ok: false,
      tool: name,
      error: `unknown tool (allowlist: ${TOOL_NAMES.join(", ")})`,
    };
  }

  const tool = name as ToolName;
  const parsed = toolSchemas[tool].safeParse(args);
  if (!parsed.success) {
    return {
      ok: false,
      tool,
      error: "invalid arguments",
      issues: parsed.error.flatten(),
    };
  }

  switch (tool) {
    case "parse_line_items": {
      const { text } = parsed.data as z.infer<typeof parseLineItemsArgs>;
      return { ok: true, tool, result: parseLineItems(text) };
    }
    case "resolve_products": {
      const { lines } = parsed.data as z.infer<typeof resolveProductsArgs>;
      return { ok: true, tool, result: resolveLines(lines) };
    }
    case "quote_settlement": {
      const { items } = parsed.data as z.infer<typeof quoteSettlementArgs>;
      const rows = items.map((it) => ({
        ...it,
        lineTotal: Math.round(it.qty * it.unitPrice),
      }));
      const subtotal = rows.reduce((s, r) => s + r.lineTotal, 0);
      return {
        ok: true,
        tool,
        result: { rows, subtotal, total: subtotal },
      };
    }
    case "generate_settlement_excel": {
      const data = parsed.data as z.infer<typeof generateSettlementExcelArgs>;
      return {
        ok: true,
        tool,
        result: {
          fileId: data.quoteId ?? "stub",
          downloadUrl: `/files/${data.quoteId ?? "stub"}`,
          stub: true,
          note: "xlsx in step 9; confirm gate in step 8",
        },
      };
    }
  }
}

export function listToolSchemas() {
  return TOOL_NAMES.map((name) => ({
    name,
    description: name,
  }));
}
