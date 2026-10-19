import cors from "cors";
import express from "express";

const PORT = Number(process.env.PORT) || 8787;

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "order-settlement-agent" });
});

app.listen(PORT, () => {
  console.log(`[server] http://localhost:${PORT}/health`);
});
