export interface PageTypeRule {
  type: string;
  path_equals?: string;
  path_starts_with?: string[];
  default?: boolean;
}

export interface ScopeRule {
  category: string;
  subsection: string;
  /** Key into `profiles` of config/seo.json. */
  profile: string;
  path_equals?: string;
  path_starts_with?: string[];
  exclude_path_equals?: string[];
}

export interface Settings {
  base_url: string;
  sitemap: string;
  exclude_url_patterns: string[];
  report_language: string;
  llm: {
    provider: string;
    model: string;
    reasoning_effort?: string | { compliance?: string; geo?: string };
    max_output_tokens: number;
    /** Pages processed in parallel (LLM calls are slow). */
    concurrency?: number;
    price_per_million_tokens: {
      input: number | null;
      cached_input: number | null;
      output: number | null;
    };
  };
  fetch: {
    user_agent: string;
    delay_ms: number;
    timeout_ms: number;
    content_exclude_selectors?: string[];
    hidden_selectors?: string[];
  };
  site_wide_schema_share: number;
  page_types: PageTypeRule[];
  /** Allow-list: a URL matching no rule is not audited. */
  scope: ScopeRule[];
}

export interface PageLink {
  href: string;
  text: string;
}

export interface PageImage {
  src: string;
  alt: string | null;
}

export type ZoneKind =
  | "title"
  | "meta_description"
  | "og_title"
  | "og_description"
  | "json_ld"
  | "h1"
  | "date"
  | "block"
  | "toc"
  | "article_section"
  | "author"
  | "modals"
  | "banner_cta"
  | "unknown"
  | "related"
  | "site_header"
  | "site_footer";

export type ZonePartType =
  | "heading"
  | "paragraph"
  | "list_item"
  | "table_cell"
  | "button"
  | "link"
  | "image"
  | "field";

export interface ZonePart {
  type: ZonePartType;
  /** 1-based index among parts of the same type inside the zone. */
  index: number;
  text: string;
  /** Heading level (headings only). */
  level?: number;
  /** Theme area (block-header, block-main, ...) or numbered group (slide 3, item 2). */
  area?: string;
  href?: string;
  /** Images: real file URL, file name and the three alt states. */
  src?: string;
  file?: string;
  alt?: string | null;
  alt_state?: "missing" | "empty" | "text";
  /** Images: both width and height attributes are set. */
  dims?: boolean;
  /** Anchors inside this part (text parts) or the anchor itself (link parts). */
  links?: { href: string; text: string }[];
}

export interface Zone {
  id: string;
  kind: ZoneKind;
  label: string;
  scope: "page" | "shared";
  /** True for zones recorded but not audited (related, site header/footer). */
  skipped: boolean;
  text: string;
  parts: ZonePart[];
}

export interface PageZones {
  template: "block" | "article" | "legal" | "unknown";
  zones: Zone[];
  warnings: string[];
}

export interface ExtractedPage {
  url: string | null;
  final_url: string | null;
  status: number | null;
  page_type: string;
  title: string;
  meta_description: string;
  meta_robots: string;
  canonical: string;
  h1: string[];
  h2: string[];
  first_paragraph: string;
  main_text: string;
  internal_links: PageLink[];
  images: PageImage[];
  json_ld: unknown[];
  page_json_ld: Record<string, unknown>[];
  author: string | null;
  date_published: string | null;
  date_modified: string | null;
  source: "url" | "file";
  file_path?: string;
}

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
