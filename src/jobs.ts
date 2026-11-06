import { runAudit } from "./audit.js";
import { loadSettings } from "./config.js";
import { db } from "./db.js";
import type { Layers } from "./types.js";

export interface JobOptions {
  /** URLs to audit. Empty with `all` set means the whole scope. */
  urls: string[];
  all?: boolean;
  /** "Category/Subsection" keys. */
  subsections?: string[];
  limit?: number;
  layers?: Layers;
  model?: string;
  force?: boolean;
  noLlm?: boolean;
}

export interface Job {
  id: string;
  status: "running" | "done" | "error" | "stopped" | "interrupted";
  started_at: string;
  ended_at: string | null;
  options: JobOptions;
  log: string[];
  run_id: string | null;
  error: string | null;
}

interface JobRow {
  id: string;
  status: Job["status"];
  started_at: Date;
  ended_at: Date | null;
  options: JobOptions;
  log: string[];
  run_id: string | null;
  error: string | null;
}

const toJob = (r: JobRow): Job => ({
  id: r.id,
  status: r.status,
  started_at: r.started_at.toISOString(),
  ended_at: r.ended_at ? r.ended_at.toISOString() : null,
  options: r.options,
  log: r.log,
  run_id: r.run_id,
  error: r.error,
});

/** The job of this process that is running. The audit itself runs in the server process. */
let runningId: string | null = null;
let stopRequested = false;

/** A job or run left in "running" by a server that stopped: nobody is working on it any more. Call once at start. */
export async function markInterrupted(): Promise<void> {
  await db().query("UPDATE jobs SET status = 'interrupted', ended_at = now() WHERE status = 'running'");
  await db().query("UPDATE runs SET status = 'interrupted', ended_at = now() WHERE status = 'running'");
}

export async function listJobs(): Promise<Omit<Job, "log">[]> {
  const r = await db().query<JobRow>("SELECT id::text, status, started_at, ended_at, options, '[]'::jsonb AS log, run_id, error FROM jobs ORDER BY id DESC LIMIT 20");
  return r.rows.map((x) => {
    const { log: _log, ...rest } = toJob(x);
    return rest;
  });
}

export async function getJob(id: string): Promise<Job | undefined> {
  if (!/^[0-9]+$/.test(id)) return undefined;
  const r = await db().query<JobRow>("SELECT id::text, status, started_at, ended_at, options, log, run_id, error FROM jobs WHERE id = $1", [id]);
  return r.rows[0] ? toJob(r.rows[0]) : undefined;
}

export function runningJobId(): string | null {
  return runningId;
}

export async function requestStop(id: string): Promise<boolean> {
  if (runningId !== id) return false;
  stopRequested = true;
  await db().query("UPDATE jobs SET stop_requested = true, log = log || $2::jsonb WHERE id = $1", [id, JSON.stringify(["Stop requested: finishing the pages in progress..."])]);
  return true;
}

/** Normalises pasted URLs: one per line or space separated, same host as the site, no duplicates. */
export function parseUrls(text: string): { urls: string[]; rejected: string[] } {
  const base = new URL(loadSettings().base_url);
  const urls: string[] = [];
  const rejected: string[] = [];
  for (const raw of text.split(/[\s,]+/).map((s) => s.trim()).filter(Boolean)) {
    try {
      const u = new URL(raw);
      if (!/^https?:$/.test(u.protocol) || u.hostname !== base.hostname) {
        rejected.push(raw);
        continue;
      }
      u.hash = "";
      const href = u.href;
      if (!urls.includes(href)) urls.push(href);
    } catch {
      rejected.push(raw);
    }
  }
  return { urls, rejected };
}

/** Starts a job in the background. Only one job runs at a time. */
export async function startJob(options: JobOptions): Promise<Job> {
  if (runningId) throw new Error("Another audit is already running");
  const started = new Date();
  const ins = await db().query<{ id: string }>("INSERT INTO jobs (status, started_at, options) VALUES ('running', $1, $2) RETURNING id::text", [started, JSON.stringify(options)]);
  const id = ins.rows[0]!.id;
  runningId = id;
  stopRequested = false;

  // log lines are written one after another, in order
  let writes: Promise<unknown> = Promise.resolve();
  const queue = (sql: string, params: unknown[]): void => {
    writes = writes.then(() => db().query(sql, params)).catch((e) => console.error("job log write failed", e));
  };
  const onLog = (line: string): void => queue("UPDATE jobs SET log = log || $2::jsonb WHERE id = $1", [id, JSON.stringify([line])]);

  runAudit({ ...options, onLog, isCancelled: () => stopRequested })
    .then((runId) => queue("UPDATE jobs SET run_id = $2, status = $3, ended_at = now() WHERE id = $1", [id, runId, stopRequested ? "stopped" : "done"]))
    .catch((e) => {
      const message = e instanceof Error ? e.message : String(e);
      onLog(`Error: ${message}`);
      queue("UPDATE jobs SET status = 'error', error = $2, ended_at = now() WHERE id = $1", [id, message]);
    })
    .finally(() => {
      runningId = null;
    });

  return { id, status: "running", started_at: started.toISOString(), ended_at: null, options, log: [], run_id: null, error: null };
}
