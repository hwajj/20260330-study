export type ParsedLine = { raw: string; qty: number; unit?: string };

const UNIT = "개|통|박스|봉|kg|g|근|포기";

/**
 * 규칙 파서 (단계 5). 예: `무2 고추2`, `무2개 고춧가루 1통`, `무 2 / 고추2`
 * SKU·단가는 하지 않음 — resolve/quote 단계.
 */
export function parseLineItems(text: string): { lines: ParsedLine[] } {
  const normalized = text.replace(/\//g, " ").replace(/\s+/g, " ").trim();
  const lines: ParsedLine[] = [];
  const re = new RegExp(`([가-힣A-Za-z]+)\\s*(\\d+)\\s*(${UNIT})?`, "g");
  let m: RegExpExecArray | null;
  while ((m = re.exec(normalized)) !== null) {
    const raw = m[1];
    const qty = Number(m[2]);
    const unit = m[3] || undefined;
    if (raw && qty > 0) {
      lines.push(unit ? { raw, qty, unit } : { raw, qty });
    }
  }
  return { lines };
}
