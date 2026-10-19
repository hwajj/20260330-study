import react from "@vitejs/plugin-react";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const root = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root,
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "^/(health|chat|catalog|tools|sessions|files|webhook)": {
        target: "http://localhost:8787",
        changeOrigin: true,
      },
    },
  },
});
