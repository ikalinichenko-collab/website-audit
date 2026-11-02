export interface ResourceInfo {
  id: string;
  group: "sources" | "settings" | "prompts";
  label: string;
  file: string;
  kind: "markdown" | "json";
  description: string;
  size: number;
  modified: string | null;
}

export interface AppState {
  base_url: string;
  model: string;
  has_api_key: boolean;
  running_job: string | null;
  latest_run: string | null;
}

export interface JobSummary {
  id: string;
  status: "running" | "done" | "error" | "stopped";
  started_at: string;
  ended_at: string | null;
  options: { urls: string[]; all?: boolean; limit?: number; force?: boolean; noLlm?: boolean; draft?: { name: string } };
  run_id: string | null;
  error: string | null;
}

export interface JobDetail extends JobSummary {
  log: string[];
  log_total: number;
}

export interface SaveResult {
  changed: boolean;
  warnings?: string[];
  running_job?: string | null;
}

export class ApiError extends Error {}

async function call<T>(method: string, path: string, body?: unknown): Promise<T> {
  let res: Response;
  try {
    res = await fetch(path, {
      method,
      headers: body === undefined ? undefined : { "Content-Type": "application/json" },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch {
    throw new ApiError("The app server is not reachable. Start it with: pnpm app");
  }
  const text = await res.text();
  let data: unknown = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    /* not JSON */
  }
  if (!res.ok) {
    const msg = (data as { error?: string } | null)?.error;
    throw new ApiError(msg ?? `Request failed (${res.status})`);
  }
  return data as T;
}

export const api = {
  state: () => call<AppState>("GET", "/api/state"),
  resources: () => call<ResourceInfo[]>("GET", "/api/resources"),
  resource: (id: string) => call<ResourceInfo & { content: string }>("GET", `/api/resources/${id}`),
  save: (id: string, content: string) => call<SaveResult>("PUT", `/api/resources/${id}`, { content }),
  history: (id: string) => call<{ ts: string; size: number }[]>("GET", `/api/resources/${id}/history`),
  historyContent: (id: string, ts: string) => call<{ content: string }>("GET", `/api/resources/${id}/history/${ts}`),
  restore: (id: string, ts: string) => call<SaveResult>("POST", `/api/resources/${id}/restore`, { ts }),
  scope: () => call<{ total: number; by_subsection: Record<string, number> }>("GET", "/api/scope"),
  startJob: (body: {
    text?: string;
    all?: boolean;
    limit?: number;
    force?: boolean;
    noLlm?: boolean;
    draft?: { name: string; content: string; type: string };
  }) => call<{ id: string; rejected: string[] }>("POST", "/api/jobs", body),
  jobs: () => call<JobSummary[]>("GET", "/api/jobs"),
  job: (id: string, from: number) => call<JobDetail>("GET", `/api/jobs/${id}?from=${from}`),
  stopJob: (id: string) => call<{ stopped: boolean }>("POST", `/api/jobs/${id}/stop`),
  deleteRun: (id: string) => call<{ deleted: string }>("DELETE", `/api/runs/${encodeURIComponent(id)}`),
};
