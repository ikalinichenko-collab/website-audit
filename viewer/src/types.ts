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
}

export interface RunListEntry {
  id: string;
  started_at: string;
  ended_at: string;
  pages_checked: number;
  cost_usd: number | null;
  tokens: TokenUsage;
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
  geo: { to_fix: number; error: string | null };
  seo: Sev;
  checked_at: string;
}

export interface GroupTotals {
  pages: number;
  compliance: Sev;
  geo: number;
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
}

export type Layer = "compliance" | "geo" | "seo";

/** Same shape as `Finding` in src/findings.ts. */
export interface Finding {
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
}

export interface GeoAnswerView {
  id: string;
  answer: "yes" | "no" | "na";
  value: string | null;
  note: string;
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
  compliance: { action: string | null; summary: string | null; error: string | null; cached: boolean };
  geo: { llm: GeoAnswerView[]; error: string | null; cached: boolean };
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
