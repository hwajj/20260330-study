import { FormEvent, useState } from "react";

type Message = {
  id: string;
  role: "user" | "assistant";
  text: string;
};

export function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), role: "user", text },
    ]);
    setDraft("");
    // LLM 연결은 단계 4~
  }

  return (
    <div className="app">
      <header className="header">
        <h1>주문·정산 Agent</h1>
        <p className="sub">DAY1 — 빈 채팅 (LLM 미연결)</p>
      </header>

      <main className="chat">
        {messages.length === 0 ? (
          <p className="empty">메시지를 입력해 보세요. 예: 무2 고추2</p>
        ) : (
          <ul className="messages">
            {messages.map((m) => (
              <li key={m.id} className={`msg msg-${m.role}`}>
                <span className="role">{m.role === "user" ? "나" : "Agent"}</span>
                <p>{m.text}</p>
              </li>
            ))}
          </ul>
        )}
      </main>

      <form className="composer" onSubmit={onSubmit}>
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="주문 문장 입력…"
          aria-label="메시지 입력"
        />
        <button type="submit">보내기</button>
      </form>
    </div>
  );
}
