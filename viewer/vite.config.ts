import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const viewerRoot = path.dirname(fileURLToPath(import.meta.url));
const resultsDir = path.resolve(viewerRoot, "../results");

/** Tailwind content globs must be absolute; cwd is repo root when `pnpm viewer` runs. */
const tailwindContent = [
  path.join(viewerRoot, "index.html"),
  path.join(viewerRoot, "src/**/*.{js,ts,jsx,tsx}"),
].map((p) => p.replace(/\\/g, "/"));

const tailwindConfig = {
  content: tailwindContent,
  darkMode: "class" as const,
  theme: { extend: {} },
  plugins: [],
};

export default defineConfig({
  root: viewerRoot,
  css: {
    postcss: {
      plugins: [tailwindcss(tailwindConfig), autoprefixer()],
    },
  },
  plugins: [
    react(),
    {
      name: "serve-results-data",
      configureServer(server) {
        server.middlewares.use("/data", (req, res, next) => {
          const raw = req.url?.split("?")[0] ?? "/";
          const rel = decodeURIComponent(raw.replace(/^\//, ""));
          const filePath = path.normalize(path.join(resultsDir, rel));
          if (!filePath.startsWith(resultsDir)) {
            res.statusCode = 403;
            res.end("Forbidden");
            return;
          }
          if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
            next();
            return;
          }
          res.setHeader("Content-Type", "application/json; charset=utf-8");
          fs.createReadStream(filePath).pipe(res);
        });
      },
    },
  ],
  build: { outDir: path.join(viewerRoot, "dist"), emptyOutDir: true },
  server: {
    open: true,
    port: 5173,
    proxy: { "/api": "http://127.0.0.1:8787" },
  },
});
