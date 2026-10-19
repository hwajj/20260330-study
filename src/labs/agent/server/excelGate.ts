import { writeSettlementXlsx } from "./excel.js";
import { getSession } from "./sessions.js";

/** 확인된 세션만 엑셀 생성. 확인 없으면 null + reason. */
export function generateExcelIfConfirmed(sessionId: string): {
  ok: true;
  fileId: string;
  downloadUrl: string;
  rowCount: number;
} | {
  ok: false;
  error: string;
} {
  const s = getSession(sessionId);
  if (!s) return { ok: false, error: "session not found" };
  if (!s.quote) return { ok: false, error: "no quote" };
  if (!s.confirmed) {
    return { ok: false, error: "confirm required before excel" };
  }
  const { fileId, rowCount } = writeSettlementXlsx(s.quote);
  s.fileId = fileId;
  return {
    ok: true,
    fileId,
    downloadUrl: `/files/${fileId}`,
    rowCount,
  };
}
