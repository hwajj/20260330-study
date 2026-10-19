const base = "http://localhost:8787";

async function main() {
  const chat = await fetch(`${base}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: "무2개 고춧가루 1통" }),
  }).then((r) => r.json());

  console.log("chat", {
    needsConfirm: chat.needsConfirm,
    total: chat.quote?.total,
    sessionId: chat.sessionId,
  });

  const blocked = await fetch(`${base}/sessions/${chat.sessionId}/excel`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: "{}",
  });
  console.log("excel without confirm", blocked.status, await blocked.json());

  const confirmed = await fetch(
    `${base}/sessions/${chat.sessionId}/confirm-quote`,
    { method: "POST", headers: { "Content-Type": "application/json" }, body: "{}" },
  ).then((r) => r.json());
  console.log("confirm", {
    rowCount: confirmed.excel?.rowCount,
    downloadUrl: confirmed.excel?.downloadUrl,
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
