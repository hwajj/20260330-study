import { FormEvent, useState } from "react";

type Message = {
  id: string;
  role: "user" | "assistant" | "system";
  text: string;
};

type TraceStep = {
  step: number;
  type: "assistant" | "tool";
  tool?: string;
  args?: unknown;
  resultSummary?: string;
  content?: string;
};

type QuoteRow = {
  sku: string;
  name: string;
  qty: number;
  unit: string;
  unitPrice: number;
  lineTotal: number;
};

type Quote = {
  quoteId: string;
  rows: QuoteRow[];
  subtotal: number;
  total: number;
};

async function postJson<T>(url: string, body: unknown, attempt = 1): Promise<T> {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = (await res.json()) as T & { error?: string; retryable?: boolean };
    if (!res.ok) {
      if (res.status >= 500 && attempt < 2 && (data as { retryable?: boolean }).retryable !== false) {
        return postJson(url, body, attempt + 1);
      }
      throw new Error(data.error || `HTTP ${res.status}`);
    }
    return data;
  } catch (err) {
    if (attempt < 2) {
      return postJson(url, body, attempt + 1);
    }
    throw err;
  }
}

export function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [trace, setTrace] = useState<TraceStep[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [quote, setQuote] = useState<Quote | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const text = draft.trim();
    if (!text || busy) return;

    setDraft("");
    setError(null);
    setDownloadUrl(null);
    setQuote(null);
    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), role: "user", text },
    ]);
    setBusy(true);

    try {
      const data = await postJson<{
        sessionId: string;
        assistantText: string;
        trace: TraceStep[];
        quote: Quote | null;
        needsConfirm?: boolean;
        error?: string;
      }>("/chat", { message: text });

      setSessionId(data.sessionId);
      setTrace(data.trace ?? []);
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          text: data.assistantText,
        },
      ]);
      if (data.quote) setQuote(data.quote);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "요청 실패";
      setError(msg);
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "system",
          text: `오류: ${msg} (1회 재시도 후에도 실패)`,
        },
      ]);
    } finally {
      setBusy(false);
    }
  }

  async function onConfirm() {
    if (!sessionId || busy) return;
    setBusy(true);
    setError(null);
    try {
      const data = await postJson<{
        excel: { downloadUrl: string; rowCount: number };
      }>(`/sessions/${sessionId}/confirm-quote`, {});
      setDownloadUrl(data.excel.downloadUrl);
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          text: `확인 완료. 정산서 ${data.excel.rowCount}행 생성됨.`,
        },
      ]);
      setQuote(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "확인 실패");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="shell">
      <div className="app">
        <header className="header">
          <h1>주문·정산 Agent</h1>
          <p className="sub">확인 후 엑셀 · 트레이스는 오른쪽</p>
        </header>

        <main className="chat">
          {messages.length === 0 ? (
            <p className="empty">예: 무2개 고춧가루 1통</p>
          ) : (
            <ul className="messages">
              {messages.map((m) => (
                <li key={m.id} className={`msg msg-${m.role}`}>
                  <span className="role">
                    {m.role === "user" ? "나" : m.role === "system" ? "시스템" : "Agent"}
                  </span>
                  <p>{m.text}</p>
                </li>
              ))}
            </ul>
          )}

          {quote && (
            <section className="confirm-card" aria-label="견적 확인">
              <h2>이대로 정산서 만들까요?</h2>
              <ul>
                {quote.rows.map((r) => (
                  <li key={r.sku + r.name}>
                    {r.name} {r.qty}
                    {r.unit} · {r.unitPrice.toLocaleString()}원 ={" "}
                    {r.lineTotal.toLocaleString()}원
                  </li>
                ))}
              </ul>
              <p className="total">합계 {quote.total.toLocaleString()}원</p>
              <button type="button" onClick={onConfirm} disabled={busy}>
                확인 · 엑셀 생성
              </button>
            </section>
          )}

          {downloadUrl && (
            <p className="download">
              <a href={downloadUrl} download>
                정산서 다운로드
              </a>
            </p>
          )}

          {error && <p className="err">{error}</p>}
        </main>

        <form className="composer" onSubmit={onSubmit}>
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="주문 문장 입력…"
            aria-label="메시지 입력"
            disabled={busy}
          />
          <button type="submit" disabled={busy}>
            {busy ? "…" : "보내기"}
          </button>
        </form>
      </div>

      <aside className="trace" aria-label="트레이스">
        <h2>Trace</h2>
        {trace.length === 0 ? (
          <p className="empty-trace">아직 없음</p>
        ) : (
          <ol>
            {trace.map((t, i) => (
              <li key={i}>
                <strong>
                  #{t.step} {t.type}
                  {t.tool ? ` · ${t.tool}` : ""}
                </strong>
                {t.content && <pre>{t.content}</pre>}
                {t.args !== undefined && (
                  <pre>{JSON.stringify(t.args, null, 0)}</pre>
                )}
                {t.resultSummary && <pre>{t.resultSummary}</pre>}
              </li>
            ))}
          </ol>
        )}
      </aside>
    </div>
  );
}
