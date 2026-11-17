import type { TokenUsage } from "./types.js";
import type { ComplianceFinding } from "./compliance.js";
import type { GeoCodeCheck } from "./geo-code.js";
import type { GeoLlmResult } from "./geo-llm.js";
import type { SeoCheck } from "./seo.js";
import type { TechCheck } from "./site-tech.js";

/** Result format of a page in a run (schema_version 2): three separate layers. */
export interface ComplianceLayerResult {
  hash: string;
  cached: boolean;
  /** verdict derived in code from the findings (see deriveAction) */
  action: string | null;
  /** the model's own verdict, kept for comparison */
  model_action?: string | null;
  summary: string | null;
  /** what the model reported; `problems` adds the term list and applies the current severity table */
  llm_problems: ComplianceFinding[];
  problems: ComplianceFinding[];
  usage: TokenUsage | null;
  error: string | null;
  /** the layer was turned off for this run (`error` says so too, so readers show "not checked") */
  skipped?: boolean;
  /** a page check that did not run this layer keeps the result of the check before; this is when that check was made */
  as_of?: string;
}

export interface GeoLayerResult {
  hash: string;
  cached: boolean;
  skipped?: boolean;
  /** code checks and the keyword placement are recomputed on every run; only `llm` is cached */
  code: GeoCodeCheck[];
  llm: GeoLlmResult[];
  placement: GeoCodeCheck | null;
  usage: TokenUsage | null;
  error: string | null;
  /** the result of the check before, kept because this one did not run the layer (see ComplianceLayerResult) */
  as_of?: string;
}

export interface SeoLayerResult {
  checks: SeoCheck[];
  skipped?: boolean;
  as_of?: string;
}

export interface PageReport {
  schema_version: 2;
  url: string;
  final_url: string;
  status: number | null;
  title: string;
  category: string;
  subsection: string;
  profile: string;
  geo_type: string;
  template: string;
  checked_at: string;
  /** audited page zones: id, label and kind, so reports can name a zone without the zones file */
  zones: { id: string; label: string; kind: string }[];
  zone_warnings: string[];
  /** ids of the shared-zone variants this page carries (see SiteReport.shared.variants) */
  shared_variants: string[];
  /** hash of the page's own zones (see contentHash): the same text gives the same value, so a snapshot can tell a checked page changed */
  content_hash?: string;
  compliance: ComplianceLayerResult;
  geo: GeoLayerResult;
  seo: SeoLayerResult;
}

/** One distinct text of a shared zone (banner CTA, forms), audited once per run. */
export interface SharedVariant {
  /** e.g. "banner_cta@2": the zone id used in findings */
  id: string;
  zone: string;
  text_hash: string;
  pages: string[];
}

export interface SeoSiteResult {
  /** `others_as_of`: some of the URLs come from the site map, last fetched at the oldest of these times */
  duplicates: { id: "duplicate_title" | "duplicate_meta" | "duplicate_h1"; value: string; urls: string[]; others_as_of?: string }[];
  /** identical failures across a profile, one entry instead of N */
  collapsed: { id: string; profile: string; pages_failing: number; pages_total: number; value: string }[];
  /** in-scope URLs that redirect, return non-2xx or are noindex */
  sitemap_hygiene: { url: string; problem: string; severity?: "high" | "medium" }[];
  /** pages of the checked profiles that no other in-scope page links to (absent in older runs) */
  orphans?: string[];
  /** why orphans were not worked out */
  orphans_note?: string;
}

/** One URL of the sitemap: where it is, whether the scope covers it, and what the site knows about it. */
export interface SitemapRow {
  url: string;
  /** the sitemap file it comes from (short name) */
  sitemap: string;
  /** "Category/Subsection", or null when the scope does not cover the URL */
  scope: string | null;
  /** matches `exclude_url_patterns`: never audited */
  excluded: boolean;
  /** fetched in this run */
  in_run: boolean;
  /** HTTP status of the fetch in this run */
  status: number | null;
  /** when the site map last fetched this URL (any run) */
  last_fetched: string | null;
  /** how many other in-scope pages link to it from their content; null when the link graph is not complete */
  inbound?: number | null;
}

export interface SiteReport {
  schema_version: 2;
  run_id: string;
  basics: {
    robots: { value: string; ok: boolean };
    llms_txt: { value: string; ok: boolean };
    sitemaps: Record<string, number>;
  };
  scope_counts: Record<string, number>;
  /** checks that exist only for the whole site (absent in snapshots made before they existed) */
  tech?: TechCheck[];
  /** every sitemap URL (absent in runs made before the table existed) */
  sitemap?: SitemapRow[];
  shared: {
    variants: SharedVariant[];
    compliance: ComplianceLayerResult | null;
  };
  site_schema: ComplianceLayerResult | null;
  seo: SeoSiteResult;
}
