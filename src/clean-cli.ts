import * as fs from "node:fs";
import path from "node:path";
import { loadAuditConfig, projectRoot } from "./config.js";

function isFullRun(dir: string): boolean {
  return fs.existsSync(path.join(dir, "site.json"));
}

function main(): void {
  const config = loadAuditConfig();
  const resultsDir = path.join(projectRoot(), config.paths.results_dir);
  if (!fs.existsSync(resultsDir)) {
    console.log("No results directory.");
    return;
  }

  const entries = fs
    .readdirSync(resultsDir)
    .filter((name) => {
      if (name === "latest") return false;
      const full = path.join(resultsDir, name);
      return fs.statSync(full).isDirectory();
    })
    .map((name) => ({
      name,
      path: path.join(resultsDir, name),
      mtime: fs.statSync(path.join(resultsDir, name)).mtimeMs,
    }))
    .sort((a, b) => b.mtime - a.mtime);

  const fullRuns = entries.filter((e) => isFullRun(e.path));
  const keep = new Set<string>(["latest"]);
  if (fullRuns[0]) keep.add(fullRuns[0]!.name);

  let removed = 0;
  for (const e of entries) {
    if (keep.has(e.name)) continue;
    fs.rmSync(e.path, { recursive: true, force: true });
    removed++;
  }
  console.log(`Removed ${removed} run folder(s). Kept: ${[...keep].join(", ")}`);
}

main();
