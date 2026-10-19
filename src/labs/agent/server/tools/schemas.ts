import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

export const parseLineItemsArgs = z.object({
  text: z.string().min(1),
});

export const resolveProductsArgs = z.object({
  lines: z
    .array(
      z.object({
        raw: z.string().min(1),
        qty: z.number().positive(),
        unit: z.string().optional(),
      }),
    )
    .min(1),
});

export const quoteSettlementArgs = z.object({
  items: z
    .array(
      z.object({
        sku: z.string().min(1),
        name: z.string().min(1),
        qty: z.number().positive(),
        unit: z.string().min(1),
        unitPrice: z.number().nonnegative(),
      }),
    )
    .min(1),
});

export const generateSettlementExcelArgs = z.object({
  quoteId: z.string().min(1).optional(),
  rows: z
    .array(
      z.object({
        sku: z.string(),
        name: z.string(),
        qty: z.number(),
        unit: z.string(),
        unitPrice: z.number(),
        lineTotal: z.number().optional(),
      }),
    )
    .optional(),
}).refine((v) => Boolean(v.quoteId || (v.rows && v.rows.length > 0)), {
  message: "quoteId or rows required",
});

export const toolSchemas = {
  parse_line_items: parseLineItemsArgs,
  resolve_products: resolveProductsArgs,
  quote_settlement: quoteSettlementArgs,
  generate_settlement_excel: generateSettlementExcelArgs,
} as const;

export type ToolName = keyof typeof toolSchemas;

export const TOOL_NAMES = Object.keys(toolSchemas) as ToolName[];

export const TOOL_DESCRIPTIONS: Record<ToolName, string> = {
  parse_line_items:
    "주문 문장에서 품명·수량·단위를 구조화한다. 예: '무2 고추2', '무2개 고춧가루 1통'. SKU·단가는 정하지 않는다.",
  resolve_products:
    "parse 결과의 품명을 카탈로그 SKU로 매칭한다. 애매하면 ambiguous 후보를 돌려준다. 단가는 카탈로그 값만 쓴다.",
  quote_settlement:
    "resolve된 items로 행별 금액과 합계를 서버에서 계산한다. 합계는 이 도구 결과만 인용한다.",
  generate_settlement_excel:
    "정산 엑셀을 만든다. 사용자가 견적을 확인한 뒤에만 서버가 허용하며, 에이전트 루프에서는 호출해도 거절된다.",
};

/** OpenAI-compatible `tools` 배열 (Zod → JSON Schema) */
export function openAiTools() {
  return TOOL_NAMES.map((name) => {
    const { $schema: _omit, ...parameters } = zodToJsonSchema(toolSchemas[name], {
      target: "openApi3",
    }) as Record<string, unknown>;
    return {
      type: "function" as const,
      function: {
        name,
        description: TOOL_DESCRIPTIONS[name],
        parameters,
      },
    };
  });
}
