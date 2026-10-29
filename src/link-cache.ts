import * as fs from "node:fs";
import path from "node:path";
import type { AuditConfig } from "./types.js";
import { projectRoot } from "./config.js";

const CACHE_TTL_MS = 24 * 60 * 60 * 1000;
const memory = new Map<string, { status: number; finalUrl: string }>();

interface DiskEntry {
  status: number;
  finalUrl: string;
  checked_at: string;
}

function cachePath(): string {
  return path.join(projectRoot(), "data", "link-status.json");
}

function loadDisk(): Record<string, DiskEntry> {
  const p = cachePath();
  if (!fs.existsSync(p)) return {};
  try {
    return JSON.parse(fs.readFileSync(p, "utf8")) as Record<string, DiskEntry>;
  } catch {
    return {};
  }
}

function saveDisk(data: Record<string, DiskEntry>): void {
  const p = cachePath();
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, JSON.stringify(data, null, 2));
}

export async function checkUrl(
  url: string,
  config: AuditConfig,
): Promise<{ status: number; finalUrl: string }> {
  if (memory.has(url)) return memory.get(url)!;

  const disk = loadDisk();
  const entry = disk[url];
  if (entry) {
    const age = Date.now() - new Date(entry.checked_at).getTime();
    if (age < CACHE_TTL_MS) {
      const result = { status: entry.status, finalUrl: entry.finalUrl };
      memory.set(url, result);
      return result;
    }
  }

  let current = url;
  let status = 0;
  for (let i = 0; i < 10; i++) {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), config.fetch.timeout_ms);
    try {
      const res = await fetch(current, {
        method: "HEAD",
        headers: { "User-Agent": config.fetch.user_agent },
        signal: ctrl.signal,
        redirect: "manual",
      });
      status = res.status;
      if (status >= 300 && status < 400) {
        const loc = res.headers.get("location");
        if (!loc) break;
        current = new URL(loc, current).href;
        continue;
      }
      if (status === 405 || status === 501) {
        const getRes = await fetch(current, {
          method: "GET",
          headers: { "User-Agent": config.fetch.user_agent },
          signal: ctrl.signal,
          redirect: "follow",
        });
        status = getRes.status;
        current = getRes.url;
      }
      break;
    } catch {
      status = 0;
      break;
    } finally {
      clearTimeout(t);
    }
  }
  const result = { status, finalUrl: current };
  memory.set(url, result);
  disk[url] = {
    status: result.status,
    finalUrl: result.finalUrl,
    checked_at: new Date().toISOString(),
  };
  saveDisk(disk);
  return result;
}

export function clearLinkCache(): void {
  memory.clear();
}
