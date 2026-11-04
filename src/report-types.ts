import type { TokenUsage } from "./types.js";
import type { ComplianceFinding } from "./compliance.js";
import type { GeoCodeCheck } from "./geo-code.js";
import type { GeoLlmResult } from "./geo-llm.js";
import type { SeoCheck } from "./seo.js";

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
}

export interface SeoLayerResult {
  checks: SeoCheck[];
  skipped?: boolean;
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
  duplicates: { id: "duplicate_title" | "duplicate_meta" | "duplicate_h1"; value: string; urls: string[] }[];
  /** identical failures across a profile, one entry instead of N */
  collapsed: { id: string; profile: string; pages_failing: number; pages_total: number; value: string }[];
  /** in-scope URLs that redirect, return non-2xx or are noindex */
  sitemap_hygiene: { url: string; problem: string }[];
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
  shared: {
    variants: SharedVariant[];
    compliance: ComplianceLayerResult | null;
  };
  site_schema: ComplianceLayerResult | null;
  seo: SeoSiteResult;
}
