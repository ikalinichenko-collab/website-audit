export interface TokenUsage {
  input: number;
  cached_input: number;
  output: number;
}

export interface RunMeta {
  run_id: string;
  started_at: string;
  ended_at: string;
  pages_checked: number;
  pages_skipped: number;
  llm_calls: number;
  llm_errors: number;
  tokens: TokenUsage;
  cost_usd: number | null;
  /** absent in runs made before models and layers could be chosen */
  model?: string;
  layers?: Layers;
  subsections?: string[];
  /** a snapshot whose shared blocks were checked by the model afterwards */
  site_llm?: { model: string; at: string };
  /** a page check that read its pages from the copy kept in the latest snapshot */
  from_snapshot?: { id: string; used: number; total: number };
}

export interface Layers {
  compliance: boolean;
  geo: boolean;
  seo: boolean;
}

export interface RunListEntry {
  id: string;
  started_at: string;
  ended_at: string;
  pages_checked: number;
  cost_usd: number | null;
  tokens: TokenUsage;
  model?: string;
  layers?: Layers;
  started_by?: string;
  /** "site": a snapshot of the whole site (what the Site page shows); "pages": a run of some pages */
  kind?: "pages" | "site";
  /** for a run of pages: the snapshot its pages were read against */
  site_run_id?: string;
  status?: string;
  format?: 1 | 2;
  /** an old snapshot whose stored pages were removed: its reports still open, the model cannot be asked about it */
  details_removed?: boolean;
}

export interface Sev {
  high: number;
  medium: number;
  low: number;
}

export interface PageIndexEntry {
  slug: string;
  url: string;
  title: string;
  group: string;
  subsection: string;
  profile: string;
  template: string;
  action: string | null;
  summary: string | null;
  compliance: Sev & { error: string | null };
  /** the severity split is absent in runs made before GEO had severities */
  geo: { to_fix: number; high?: number; medium?: number; low?: number; error: string | null };
  seo: Sev;
  checked_at: string;
  /** checked pages only */
  checked_by?: string | null;
  model?: string | null;
  layers?: Layers | null;
  /** everything spent on this page so far */
  cost_usd?: number | null;
  /** the latest snapshot has a different text of the page (null: not known) */
  changed?: boolean | null;
  /** the person looking checked it */
  mine?: boolean;
}

/** Same shape as `Spending` in src/page-checks.ts. */
export interface Spending {
  total: { cost: number; calls: number; checks: number };
  by_month: { month: string; cost: number; calls: number; checks: number }[];
  by_person: { person: string; cost: number; calls: number; checks: number }[];
  recent: { at: string; kind: string; by: string | null; url: string; model: string | null; cost: number; calls: number; tokens: TokenUsage }[];
}

export interface GroupTotals {
  pages: number;
  compliance: Sev;
  geo: number;
  geo_sev?: Sev;
  seo: Sev;
  actions: Record<string, number>;
}

export interface RunIndexFile {
  schema_version: 2;
  pages: PageIndexEntry[];
  totals: GroupTotals;
  by_group: Record<string, GroupTotals>;
  by_subsection: Record<string, GroupTotals>;
  site: { compliance: Sev; seo: number; geo: number };
  layers?: Layers;
}

export type Layer = "compliance" | "geo" | "seo";

/** Same shape as `Finding` in src/findings.ts. */
export type FindingStatus = "accepted" | "false_positive" | "fixed";

export interface Finding {
  fid: string;
  status?: FindingStatus;
  status_note?: string;
  status_by?: string | null;
  status_at?: string;
  /** marked fixed earlier, found again in a later run */
  reopened?: boolean;
  /** not in the previous run of the page */
  change?: "new";
  url: string;
  group: string;
  subsection: string;
  layer: Layer;
  severity: "high" | "medium" | "low" | "";
  kind: string;
  title: string;
  zone_id: string;
  zone_label: string;
  part: string;
  quote: string;
  issue: string;
  fix: string;
  rule: string;
  verified: boolean;
  fragment: string | null;
  basis?: "contradicts sources" | "not in sources" | "term list";
  place?: string;
  reason?: string;
  page_value?: string;
  source_value?: string;
  fix_where: FixWhere;
}

export interface PageCompare {
  previous_run: string;
  previous_at: string;
  /** layers compared: those that ran cleanly in both runs */
  layers: Layer[];
  /** findings of the previous run that are gone now */
  resolved: Finding[];
}

/** Same shape as `SinceSnapshot` in src/store.ts. */
export interface SinceSnapshot {
  snapshot_run: string;
  snapshot_at: string;
  resolved: Finding[];
  added: Finding[];
  unchanged: number;
}

/** Same shape as `PageShared` in src/store.ts. */
export interface PageShared {
  snapshot_run: string;
  snapshot_at: string;
  checked: boolean;
  variants: { id: string; label: string; pages: number; problems: { title: string; severity: string; basis: string }[] }[];
  schema: { problems: { title: string; severity: string; basis: string }[] };
}

export interface PageFindingsResult {
  findings: Finding[];
  compare: PageCompare | null;
  since_snapshot: SinceSnapshot | null;
}

export type FixWhere = "template" | "page" | "author";

export interface GeoAnswerView {
  id: string;
  answer: "yes" | "no" | "na" | "none";
  value: string | null;
  note: string;
  /** what to change, only for "no" */
  fix?: string | null;
  /** absent in runs made before the questions had titles */
  title?: string;
  /** the question as asked in this run; absent in older runs */
  question?: string;
  severity?: "high" | "medium" | "low";
  needs_confirm?: boolean;
  confirmed?: boolean;
}

export interface PageReport {
  url: string;
  final_url: string;
  title: string;
  category: string;
  subsection: string;
  template: string;
  checked_at: string;
  zones: { id: string; label: string; kind: string }[];
  zone_warnings: string[];
  shared_variants: string[];
  compliance: { action: string | null; summary: string | null; error: string | null; cached: boolean; skipped?: boolean; as_of?: string };
  geo: {
    llm: GeoAnswerView[];
    code?: { id: string; status: "pass" | "fail" | "na"; value: string }[];
    error: string | null;
    cached: boolean;
    skipped?: boolean;
    as_of?: string;
  };
  seo: { skipped?: boolean; as_of?: string };
}

/** Same shape as `SitemapRow` in src/report-types.ts. */
export interface SitemapRow {
  url: string;
  sitemap: string;
  scope: string | null;
  excluded: boolean;
  in_run: boolean;
  status: number | null;
  last_fetched: string | null;
  inbound?: number | null;
}

/** Same shape as `SiteCheck` in src/store.ts. */
export interface SiteCheck {
  available: boolean;
  as_of: string | null;
  map_pages: number;
  duplicates: { field: "title" | "meta" | "h1"; value: string; urls: string[] }[];
  inbound: { url: string; title: string }[];
  orphan_checked: boolean;
}

export interface SiteReport {
  run_id: string;
  basics: {
    robots: { value: string; ok: boolean };
    llms_txt: { value: string; ok: boolean };
    sitemaps: Record<string, number>;
  };
  scope_counts: Record<string, number>;
  sitemap?: SitemapRow[];
  shared: { variants: { id: string; zone: string; pages: string[] }[] };
  seo: {
    collapsed: { id: string; profile: string; pages_failing: number; pages_total: number; value: string }[];
    duplicates: { id: string; value: string; urls: string[]; others_as_of?: string }[];
    sitemap_hygiene: { url: string; problem: string; severity?: "high" | "medium" }[];
    orphans?: string[];
    orphans_note?: string;
  };
}

export type AuditSeverity = "high" | "medium" | "low";
export type AuditWhere = "template" | "page" | "author";

/** Same shape as `AuditRow` in src/site-audit.ts. */
export interface AuditRow {
  id: string;
  layer: "seo" | "geo";
  group: string;
  title: string;
  why: string;
  fix: string;
  where: AuditWhere;
  severity: AuditSeverity;
  status: "ok" | "fail" | "not_checked";
  failing: number;
  total: number;
  places: number;
  by_profile: { profile: string; failing: number; total: number }[];
  items: { url: string; profile?: string; profiles?: string[]; value: string; urls?: string[] }[];
  more: number;
  note?: string;
  /** against the previous snapshot */
  change?: { added: number; fixed: number; prev_failing: number };
}

/** Same shape as `TemplateIssue` in src/site-audit.ts. */
export interface TemplateIssue {
  title: string;
  kind: string;
  severity: AuditSeverity;
  basis: string;
  places: string[];
  pages: number;
  quote: string;
  issue: string;
  fix: string;
  rule: string;
}

export interface AuditCounts {
  high: number;
  medium: number;
  low: number;
  ok: number;
  total: number;
}

/** Same shape as `SiteAudit` in src/site-audit.ts. */
export interface SiteAudit {
  run_id: string;
  groups: { key: string; title: string; blurb: string; apart?: boolean }[];
  pages: number;
  coverage: { sitemap_urls: number | null; in_scope: number | null; outside_scope: number | null };
  blocks: Record<string, string>;
  /** page address to its slug in this snapshot */
  slugs: Record<string, string>;
  profiles: { profile: string; pages: number }[];
  previous: { run_id: string; started_at: string; pages: number; fixed: number; added: number; checks_cleared: number; checks_broken: number } | null;
  summary: {
    seo: AuditCounts;
    geo: AuditCounts;
    style: { checks: number; failing: number; pages: number; places: number };
    template: { checked: boolean; findings: number; high: number; medium: number; low: number; issues: TemplateIssue[] };
    first: { id: string; title: string; severity: AuditSeverity; failing: number; total: number; where: AuditWhere; fix: string }[];
    not_checked: string[];
  };
  rows: AuditRow[];
}

export type ActionKey = "rewrite" | "needs_decision" | "fix" | "keep" | "not_checked";

/** Same shape as `SiteSources` in src/site-sources.ts. */
export interface SiteSources {
  schema_nodes: {
    type: string;
    name: string;
    pages: number;
    pages_total: number;
    sample_url: string;
    json: Record<string, unknown>;
  }[];
  variants: { id: string; zone: string; label: string; text: string; pages: string[] }[];
}
