import type { Finding, PageReport, RunIndexFile, RunListEntry, RunMeta, SiteReport, SiteSources } from "./types.js";

async function fetchJson<T>(path: string): Promise<T> {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`Failed to load ${path}: ${res.status}`);
  return res.json() as Promise<T>;
}

const run = (id: string) => `/data/${encodeURIComponent(id)}`;

export const getRuns = () => fetchJson<RunListEntry[]>("/data/runs.json");
export const getIndex = (id: string) => fetchJson<RunIndexFile>(`${run(id)}/index.json`);
export const getRun = (id: string) => fetchJson<RunMeta>(`${run(id)}/run.json`);
export const getSite = (id: string) => fetchJson<SiteReport>(`${run(id)}/site.json`);
export const getSiteFindings = (id: string) => fetchJson<Finding[]>(`${run(id)}/site.findings.json`);
export const getPage = (id: string, slug: string) =>
  fetchJson<PageReport>(`${run(id)}/pages/${encodeURIComponent(slug)}.json`);
export const getPageFindings = (id: string, slug: string) =>
  fetchJson<Finding[]>(`${run(id)}/pages/${encodeURIComponent(slug)}.findings.json`);
export const getSiteSources = (id: string) => fetchJson<SiteSources>(`${run(id)}/site-sources.json`);
