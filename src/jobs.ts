import * as fs from "node:fs";
import * as os from "node:os";
import path from "node:path";
import { runAudit, runAuditDraft } from "./audit.js";
import { loadSettings } from "./config.js";

export interface JobOptions {
  /** URLs to audit. Empty with `all` set means the whole scope. */
  urls: string[];
  all?: boolean;
  limit?: number;
  force?: boolean;
  noLlm?: boolean;
  /** Text of a draft instead of URLs. */
  draft?: { name: string; content: string; type: string };
}

export interface Job {
  id: string;
  status: "running" | "done" | "error" | "stopped";
  started_at: string;
  ended_at: string | null;
  options: JobOptions;
  log: string[];
  run_id: string | null;
  error: string | null;
}

const jobs: Job[] = [];
let stopRequested = false;
let nextId = 1;

const MAX_LOG = 2000;

export function listJobs(): Omit<Job, "log">[] {
  return jobs
    .slice(-20)
    .reverse()
    .map(({ log: _log, ...rest }) => rest);
}

export function getJob(id: string): Job | undefined {
  return jobs.find((j) => j.id === id);
}

export function runningJob(): Job | undefined {
  return jobs.find((j) => j.status === "running");
}

export function requestStop(id: string): boolean {
  const j = getJob(id);
  if (!j || j.status !== "running") return false;
  stopRequested = true;
  j.log.push("Stop requested: finishing the pages in progress...");
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
export function startJob(options: JobOptions): Job {
  if (runningJob()) throw new Error("Another audit is already running");
  const job: Job = {
    id: String(nextId++),
    status: "running",
    started_at: new Date().toISOString(),
    ended_at: null,
    options,
    log: [],
    run_id: null,
    error: null,
  };
  jobs.push(job);
  stopRequested = false;
  const onLog = (line: string): void => {
    job.log.push(line);
    if (job.log.length > MAX_LOG) job.log.splice(0, job.log.length - MAX_LOG);
  };

  const runDraft = async (draft: NonNullable<JobOptions["draft"]>): Promise<string> => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "audit-draft-"));
    try {
      const file = path.join(dir, path.basename(draft.name));
      fs.writeFileSync(file, draft.content);
      onLog(`Auditing draft ${draft.name}`);
      return await runAuditDraft(file, draft.type);
    } finally {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  };
  const work = options.draft ? runDraft(options.draft) : runAudit({ ...options, onLog, isCancelled: () => stopRequested });

  work
    .then((runId) => {
      job.run_id = runId;
      job.status = stopRequested ? "stopped" : "done";
    })
    .catch((e) => {
      job.status = "error";
      job.error = e instanceof Error ? e.message : String(e);
      onLog(`Error: ${job.error}`);
    })
    .finally(() => {
      job.ended_at = new Date().toISOString();
    });
  return job;
}
