import { readFileSync } from "node:fs";
import path from "node:path";
import type { ModelInfo, Settings, TokenUsage } from "./types.js";
import type { SeoConfig } from "./seo.js";
import { projectRoot, sha256 } from "./utils.js";

const ROOT = projectRoot();

export function loadSettings(): Settings {
  const raw = readFileSync(path.join(ROOT, "config", "settings.json"), "utf8");
  return JSON.parse(raw) as Settings;
}

/** The registered model with this id (default model when none is given). Throws on an unknown id. */
export function resolveModel(settings: Settings, id?: string): ModelInfo {
  const want = id || settings.llm.model;
  const m = settings.llm.models.find((x) => x.id === want);
  if (!m) throw new Error(`Unknown model "${want}". Known: ${settings.llm.models.map((x) => x.id).join(", ")}`);
  return m;
}

/** Dollar cost of the tokens at the model's price. */
export function usageCost(u: TokenUsage, m: ModelInfo): number {
  const p = m.price_per_million_tokens;
  return (u.input * p.input + u.cached_input * p.cached_input + u.output * p.output) / 1_000_000;
}

export function loadSeoConfig(): SeoConfig {
  const raw = readFileSync(path.join(ROOT, "config", "seo.json"), "utf8");
  return JSON.parse(raw) as SeoConfig;
}

export interface GeoCodeConfig {
  ai_bots: string[];
  llms_txt_url: string;
  home_title: string;
  trap_terms: { term: string; pattern: string }[];
  nearshore_words: string[];
  faq_min_question_headings: number;
  ampersand_allowlist: string[];
  uk_spelling_words: string[];
  uk_spelling_stems: string[];
  uk_spelling_endings: string[];
  /** severity of each code check; medium when a check is not listed */
  severity?: Record<string, "high" | "medium" | "low">;
}

export function loadGeoCodeConfig(): GeoCodeConfig {
  const raw = readFileSync(path.join(ROOT, "config", "geo.json"), "utf8");
  return JSON.parse(raw) as GeoCodeConfig;
}

const SOURCE_FILES = [
  "sources/decisions.md",
  "sources/GoGloby Fact Sheet.md",
  "sources/GoGloby Glossary.md",
];

let sourcesTextCache: string | null = null;

/** Forget the cached sources text (after a source file was replaced in a running process). */
export function resetSourcesCache(): void {
  sourcesTextCache = null;
}

/** Byte-stable company sources block (same string on every LLM call in a process). */
export function loadSourcesText(): string {
  if (sourcesTextCache !== null) return sourcesTextCache;
  const headings = ["# decisions.md", "# GoGloby Fact Sheet.md", "# GoGloby Glossary.md"];
  const parts = SOURCE_FILES.map((rel) => readFileSync(path.join(ROOT, rel), "utf8"));
  sourcesTextCache = headings.map((h, i) => `${h}\n\n${parts[i]}`).join("\n\n---\n\n");
  return sourcesTextCache;
}

export function loadComplianceZonesInstruction(reportLanguage: string): string {
  const raw = readFileSync(path.join(ROOT, "prompts", "compliance-zones.md"), "utf8");
  return raw.replace(/\{\{report_language\}\}/g, reportLanguage);
}

export interface BannedTerm {
  id: string;
  term: string;
  pattern: string;
  category: string;
  rule: string;
  note?: string;
}

export interface ComplianceConfig {
  severity: Record<string, "high" | "medium" | "low">;
  /** Severity of a problem whose source value is "not in ..." (a claim the sources do not contain), by category. */
  unverified_severity: Record<string, "high" | "medium" | "low">;
  banned_terms: BannedTerm[];
  old_terms_high_kinds: string[];
  old_terms_high_zone_prefixes: string[];
  max_locations: number;
}

export function loadComplianceConfig(): ComplianceConfig {
  return JSON.parse(readFileSync(path.join(ROOT, "config", "compliance.json"), "utf8")) as ComplianceConfig;
}

/** Extra page data a question may ask to see, beyond the page text. */
export const GEO_NEEDS = ["json_ld", "og", "author", "links"] as const;
export type GeoNeed = (typeof GEO_NEEDS)[number];

export interface GeoLlmQuestion {
  id: string;
  question: string;
  applies_to: string[];
  /** Code check that must pass first (for example faq_present). */
  requires?: string;
  /** Title of the finding when the answer is no (the id when absent). */
  title?: string;
  /** Severity of the finding; medium when absent. */
  severity?: "high" | "medium" | "low";
  /** Extra data the model gets for this question; by default only the text zones. */
  needs?: GeoNeed[];
  /** Ask a second time when the answer is no; the finding stands only if the second answer is no too. */
  confirm?: boolean;
}

export function loadGeoQuestions(): GeoLlmQuestion[] {
  return JSON.parse(readFileSync(path.join(ROOT, "prompts", "geo-questions.json"), "utf8")) as GeoLlmQuestion[];
}

/** Questions for one GEO type; questions with `requires` are kept only when that code check passed. */
export function geoQuestionsFor(geoType: string, passedCodeChecks: Set<string>): GeoLlmQuestion[] {
  return loadGeoQuestions().filter((q) => q.applies_to.includes(geoType) && (!q.requires || passedCodeChecks.has(q.requires)));
}

/** The instruction for the GEO call, with the given questions filled in. */
export function geoInstruction(reportLanguage: string, questions: GeoLlmQuestion[]): string {
  const block = questions.map((q) => `- ${q.id}: ${q.question}`).join("\n");
  const raw = readFileSync(path.join(ROOT, "prompts", "geo-llm.md"), "utf8");
  return raw.replace(/\{\{report_language\}\}/g, reportLanguage).replace(/\{\{questions\}\}/g, block);
}

/** Hash of the listed project files plus extra strings: the cache key part that covers prompts, config and sources of one layer. */
export function layerFingerprint(files: string[], extra: string[]): string {
  let acc = "";
  for (const f of files) acc += readFileSync(path.join(ROOT, f), "utf8");
  return sha256(acc + "|" + extra.join("|"));
}

