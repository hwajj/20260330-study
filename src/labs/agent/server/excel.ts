import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import * as XLSX from "xlsx";
import type { Quote } from "./sessions.js";

const filesDir = join(dirname(fileURLToPath(import.meta.url)), "..", ".data", "files");

export function ensureFilesDir() {
  mkdirSync(filesDir, { recursive: true });
}

export function writeSettlementXlsx(quote: Quote): { fileId: string; rowCount: number; path: string } {
  ensureFilesDir();
  const fileId = quote.quoteId;
  const sheetRows = [
    ["SKU", "품명", "수량", "단위", "단가", "금액"],
    ...quote.rows.map((r) => [
      r.sku,
      r.name,
      r.qty,
      r.unit,
      r.unitPrice,
      r.lineTotal,
    ]),
    [],
    ["", "", "", "", "합계", quote.total],
  ];
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(sheetRows);
  XLSX.utils.book_append_sheet(wb, ws, "정산");
  const path = join(filesDir, `${fileId}.xlsx`);
  const buf = XLSX.write(wb, { type: "buffer", bookType: "xlsx" }) as Buffer;
  writeFileSync(path, buf);
  return { fileId, rowCount: quote.rows.length, path };
}

export function filePathFor(fileId: string): string {
  return join(filesDir, `${fileId}.xlsx`);
}
