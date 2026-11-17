import { toSignIn } from "./api.js";
import type { Finding, PageFindingsResult, PageShared, SiteAudit, SiteCheck, PageReport, RunIndexFile, RunListEntry, RunMeta, SiteReport, SiteSources, Spending } from "./types.js";

async function fetchJson<T>(path: string): Promise<T> {
  const res = await fetch(path);
  if (res.status === 401) toSignIn();
  if (!res.ok) throw new Error(`Failed to load ${path}: ${res.status}`);
  return res.json() as Promise<T>;
}

/** Where a run's files are served: the app builds them from the database when asked. */
export const runUrl = (id: string) => `/api/runs/${encodeURIComponent(id)}`;

export const getRuns = () => fetchJson<RunListEntry[]>("/api/runs");
/** The pages of a snapshot (`id`), or the checked pages (null). */
export const getIndex = (id: string | null) => fetchJson<RunIndexFile>(id ? `${runUrl(id)}/index` : "/api/checks");
/** Where one page is served from: a page of a snapshot, or a checked page (`id` null). */
const pageBase = (id: string | null, slug: string): string => (id ? `${runUrl(id)}/pages/${encodeURIComponent(slug)}` : `/api/checks/${encodeURIComponent(slug)}`);
export const getSpending = () => fetchJson<Spending>("/api/checks/spending");
export const getRun = (id: string) => fetchJson<RunMeta>(`${runUrl(id)}/run`);
export const getSite = (id: string) => fetchJson<SiteReport>(`${runUrl(id)}/site`);
export const getSiteFindings = (id: string) => fetchJson<Finding[]>(`${runUrl(id)}/site-findings`);
export const getPage = (id: string | null, slug: string) => fetchJson<PageReport>(pageBase(id, slug));
export const getPageFindings = (id: string | null, slug: string) => fetchJson<PageFindingsResult>(`${pageBase(id, slug)}/findings`);
export const getPageShared = (id: string | null, slug: string) => fetchJson<PageShared | null>(`${pageBase(id, slug)}/shared`);
export const getSiteCheck = (id: string | null, slug: string) => fetchJson<SiteCheck>(`${pageBase(id, slug)}/site-check`);
export const getSiteAudit = (id: string) => fetchJson<SiteAudit>(`${runUrl(id)}/site-audit`);
export const getSiteSources = (id: string) => fetchJson<SiteSources>(`${runUrl(id)}/site-sources`);
