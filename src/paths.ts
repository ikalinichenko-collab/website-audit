import * as fs from "node:fs";
import path from "node:path";
import { projectRoot } from "./utils.js";

export function runDir(runId: string): string {
  return path.join(projectRoot(), "results", runId);
}

export function latestPointerPath(): string {
  return path.join(projectRoot(), "results", "latest");
}

export function resolveLatestRunId(): string | null {
  const latest = latestPointerPath();
  if (!fs.existsSync(latest)) return null;
  const stat = fs.lstatSync(latest);
  if (stat.isSymbolicLink() || stat.isDirectory()) {
    return path.basename(fs.realpathSync(latest));
  }
  try {
    const id = fs.readFileSync(latest, "utf8").trim();
    return id || null;
  } catch {
    return null;
  }
}

export function setLatestRun(runId: string): void {
  const resultsRoot = path.join(projectRoot(), "results");
  fs.mkdirSync(resultsRoot, { recursive: true });
  const target = runDir(runId);
  const link = latestPointerPath();
  if (fs.existsSync(link)) {
    fs.rmSync(link, { recursive: true, force: true });
  }
  try {
    fs.symlinkSync(target, link, "junction");
  } catch {
    fs.writeFileSync(link, runId, "utf8");
  }
}

export function readJson<T>(filePath: string): T | null {
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, "utf8")) as T;
}
