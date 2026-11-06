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
  format?: 1 | 2;
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

export interface PageFindingsResult {
  findings: Finding[];
  compare: PageCompare | null;
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
  compliance: { action: string | null; summary: string | null; error: string | null; cached: boolean; skipped?: boolean };
  geo: {
    llm: GeoAnswerView[];
    code?: { id: string; status: "pass" | "fail" | "na"; value: string }[];
    error: string | null;
    cached: boolean;
    skipped?: boolean;
  };
  seo: { skipped?: boolean };
}

export interface SiteReport {
  run_id: string;
  basics: {
    robots: { value: string; ok: boolean };
    llms_txt: { value: string; ok: boolean };
    sitemaps: Record<string, number>;
  };
  scope_counts: Record<string, number>;
  shared: { variants: { id: string; zone: string; pages: string[] }[] };
  seo: {
    collapsed: { id: string; profile: string; pages_failing: number; pages_total: number; value: string }[];
    duplicates: { id: string; value: string; urls: string[] }[];
    sitemap_hygiene: { url: string; problem: string }[];
  };
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
