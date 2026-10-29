import type { PageCheckId } from "./checklist-meta.js";

export type CheckStatus = "pass" | "fail" | "warn" | "na" | "skip" | "info";

export type Location =
  | "title"
  | "meta"
  | "h1"
  | "h2"
  | "first_paragraph"
  | "body"
  | "schema"
  | "link_text"
  | "image_alt";

export interface CheckItem {
  name: string;
  status: CheckStatus;
  evidence: string[];
  locations: Location[];
  count: number | null;
  fix: string;
}

export interface CheckResult {
  status: CheckStatus;
  severity: "high" | "medium" | "low";
  evidence: string[];
  locations: Location[];
  count: number | null;
  fix: string;
  source_ref: string;
  items?: CheckItem[];
  value?: string;
}

export interface MainContentImage {
  src: string;
  alt: string | null;
  file_name: string;
}

export interface PageLink {
  href: string;
  text: string;
  internal: boolean;
}

export interface PageImage {
  src: string;
  alt: string | null;
}

export interface PageData {
  url: string;
  final_url: string;
  status: number;
  redirect_chain?: string[];
  page_type: string;
  title: string;
  meta_description: string;
  meta_robots: string;
  canonical: string;
  open_graph: Record<string, string>;
  json_ld: unknown[];
  h1: string[];
  h2: string[];
  h3: string[];
  first_paragraph: string;
  body: string;
  main_text: string;
  internal_links: PageLink[];
  external_links: PageLink[];
  images_without_alt: PageImage[];
  main_content_images: MainContentImage[];
  date_published: string | null;
  date_modified: string | null;
  author: string | null;
  author_visible: string | null;
  content_hash: string;
  fetched_at: string;
}

export interface PageResult {
  url: string;
  page_type: string;
  checked_at: string;
  content_hash: string;
  sources_hash: string;
  checklist_hash: string;
  audit_hash: string;
  first_paragraph: string;
  results: Record<PageCheckId, CheckResult>;
  recommendation: {
    action: string;
    priority: string;
    reasons: string[];
  };
}

export interface SiteResult {
  checked_at: string;
  results: Record<string, CheckResult>;
}

export interface AuditConfig {
  version: string;
  site: {
    base_url: string;
    sitemap: string;
    exclude_url_patterns: string[];
    service_pages: { staffing: string; recruiting: string };
  };
  sources: { files: string[] };
  llm: {
    provider: string;
    model: string;
    reasoning_effort: string;
    max_output_tokens: number;
    retry_on_incomplete?: number;
  };
  not_applicable_by_type?: Record<string, string[]>;
  fetch: {
    user_agent: string;
    delay_ms: number;
    timeout_ms: number;
    main_content_selectors: string[];
    exclude_selectors: string[];
  };
  page_types: {
    rules: Array<{
      type: string;
      path_equals?: string;
      path_starts_with?: string[];
      default?: boolean;
    }>;
  };
  requirements_by_type: Record<
    string,
    { author: boolean; dates: boolean; schema: string[] }
  >;
  seo: {
    title_length: { min: number; max: number };
    meta_description_length: { min: number; max: number };
    h1_count: number;
    first_paragraph_max_words: number;
  };
  code_facts: {
    brand_name: string;
    phone_digits: string;
    clients?: Record<string, string[]>;
  };
  exact_phrases: {
    items: Array<{
      phrase: string;
      replace_with: string | null;
      case_sensitive?: boolean;
      not_inside?: string[];
    }>;
  };
  brand_spelling: {
    wrong_spellings: string[];
    allowed_phrases: string[];
  };
  context_terms: { items: string[] };
  style: { em_dash: boolean };
  site_checks: { ai_bots: string[]; llms_txt_url: string };
  paths: { data_dir: string; results_dir: string };
}
