import type { Finding, PageFindingsResult, PageReport, RunIndexFile, RunListEntry, RunMeta, SiteReport, SiteSources } from "./types.js";

async function fetchJson<T>(path: string): Promise<T> {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`Failed to load ${path}: ${res.status}`);
  return res.json() as Promise<T>;
}

/** Where a run's files are served: the app builds them from the database when asked. */
export const runUrl = (id: string) => `/api/runs/${encodeURIComponent(id)}`;

export const getRuns = () => fetchJson<RunListEntry[]>("/api/runs");
export const getIndex = (id: string) => fetchJson<RunIndexFile>(`${runUrl(id)}/index`);
export const getRun = (id: string) => fetchJson<RunMeta>(`${runUrl(id)}/run`);
export const getSite = (id: string) => fetchJson<SiteReport>(`${runUrl(id)}/site`);
export const getSiteFindings = (id: string) => fetchJson<Finding[]>(`${runUrl(id)}/site-findings`);
export const getPage = (id: string, slug: string) => fetchJson<PageReport>(`${runUrl(id)}/pages/${encodeURIComponent(slug)}`);
export const getPageFindings = (id: string, slug: string) =>
  fetchJson<PageFindingsResult>(`${runUrl(id)}/pages/${encodeURIComponent(slug)}/findings`);
export const getSiteSources = (id: string) => fetchJson<SiteSources>(`${runUrl(id)}/site-sources`);
