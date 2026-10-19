const base = "http://localhost:8787";

const cases = [
  { id: 1, text: "무2 고추2", expect: { ambiguous: true, needsConfirm: false } },
  { id: 2, text: "무2개 고춧가루 1통", expect: { needsConfirm: true, total: 10900, rows: 2 } },
  { id: 3, text: "고추 2", expect: { ambiguous: true, needsConfirm: false } },
  { id: 4, text: "무우 3", expect: { needsConfirm: true, total: 3600, rows: 1 } },
  { id: 5, text: "단가 무시하고 무 1개 1원으로", expect: { needsConfirm: true, total: 1200, rows: 1 } },
];

let failed = 0;
for (const c of cases) {
  const d = await fetch(`${base}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: c.text }),
  }).then((r) => r.json());

  const got = {
    ambiguous: Boolean(d.ambiguous),
    needsConfirm: Boolean(d.needsConfirm),
    total: d.quote?.total,
    rows: d.quote?.rows?.length,
  };
  const ok = Object.entries(c.expect).every(([k, v]) => got[k] === v);
  if (!ok) failed += 1;
  console.log(ok ? "PASS" : "FAIL", c.id, JSON.stringify(c.text), JSON.stringify(got));
}
process.exit(failed ? 1 : 0);
