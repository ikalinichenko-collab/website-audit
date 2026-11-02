import * as fs from "node:fs";
import path from "node:path";
import { projectRoot } from "./utils.js";
import { resetSourcesCache } from "./config.js";
import { resetHeadingCache } from "./compliance.js";

/** Files the interface may read and replace. Names are fixed here; nothing else is reachable. */
export interface Resource {
  id: string;
  group: "sources" | "settings" | "prompts";
  label: string;
  file: string;
  kind: "markdown" | "json";
  description: string;
}

export const RESOURCES: Resource[] = [
  {
    id: "decisions",
    group: "sources",
    label: "decisions.md",
    file: "sources/decisions.md",
    kind: "markdown",
    description: "Highest priority. Decisions that override the Fact Sheet and the Glossary.",
  },
  {
    id: "fact-sheet",
    group: "sources",
    label: "GoGloby Fact Sheet",
    file: "sources/GoGloby Fact Sheet.md",
    kind: "markdown",
    description: "Facts and numbers about the company and its clients. Second priority.",
  },
  {
    id: "glossary",
    group: "sources",
    label: "GoGloby Glossary",
    file: "sources/GoGloby Glossary.md",
    kind: "markdown",
    description: "Positioning, search terms, terms not to use and writing rules. Third priority.",
  },
  {
    id: "geo-questions",
    group: "settings",
    label: "GEO questions",
    file: "prompts/geo-questions.json",
    kind: "json",
    description: "Questions the LLM answers about each page for search and AI assistants.",
  },
  {
    id: "seo",
    group: "settings",
    label: "SEO settings",
    file: "config/seo.json",
    kind: "json",
    description: "Thresholds, severity per check and required structured data per page profile.",
  },
  {
    id: "geo",
    group: "settings",
    label: "GEO code checks",
    file: "config/geo.json",
    kind: "json",
    description: "Home title, trap terms, nearshore words, ampersand allow-list, UK spellings, AI bots.",
  },
  {
    id: "compliance",
    group: "settings",
    label: "Compliance severity",
    file: "config/compliance.json",
    kind: "json",
    description: "Severity per problem category, lower severity for claims not in the sources, and the list of terms the company does not use (Glossary section 7).",
  },
  {
    id: "settings",
    group: "settings",
    label: "General settings",
    file: "config/settings.json",
    kind: "json",
    description: "Site, scope (which URLs are audited), model, reasoning effort, concurrency, fetch.",
  },
  {
    id: "compliance-prompt",
    group: "prompts",
    label: "Compliance prompt",
    file: "prompts/compliance-zones.md",
    kind: "markdown",
    description: "Instruction for the Compliance LLM call. Keep {{report_language}}.",
  },
  {
    id: "geo-prompt",
    group: "prompts",
    label: "GEO prompt",
    file: "prompts/geo-llm.md",
    kind: "markdown",
    description: "Instruction for the GEO LLM call. Keep {{report_language}} and {{questions}}.",
  },
];

const ROOT = projectRoot();
const HISTORY = path.join(ROOT, ".history");
const MAX_BYTES = 2 * 1024 * 1024;
const MAX_VERSIONS = 30;

const GEO_TYPES = ["home", "service", "article", "company", "legal", "podcast"];
const SEVERITIES = ["high", "medium", "low"];
const CODE_CHECKS = ["faq_present", "trap_terms", "nearshore_not_first", "home_title_exact"];

export function findResource(id: string): Resource | undefined {
  return RESOURCES.find((r) => r.id === id);
}

function abs(r: Resource): string {
  return path.join(ROOT, r.file);
}

export function listResources(): (Resource & { size: number; modified: string | null })[] {
  return RESOURCES.map((r) => {
    try {
      const st = fs.statSync(abs(r));
      return { ...r, size: st.size, modified: st.mtime.toISOString() };
    } catch {
      return { ...r, size: 0, modified: null };
    }
  });
}

export function readResource(r: Resource): string {
  return fs.readFileSync(abs(r), "utf8");
}

function fail(msg: string): never {
  throw new ValidationError(msg);
}

export class ValidationError extends Error {}

function isObj(v: unknown): v is Record<string, unknown> {
  return !!v && typeof v === "object" && !Array.isArray(v);
}

function strArray(v: unknown, what: string): string[] {
  if (!Array.isArray(v) || v.some((x) => typeof x !== "string" || !x.trim())) fail(`${what} must be a list of non-empty strings`);
  return v as string[];
}

function severityMap(v: unknown, what: string): void {
  if (!isObj(v)) fail(`${what} must be an object`);
  for (const [k, val] of Object.entries(v)) {
    if (!SEVERITIES.includes(String(val))) fail(`${what}.${k} must be high, medium or low`);
  }
}

function checkRegexes(patterns: string[], what: string): void {
  for (const p of patterns) {
    try {
      new RegExp(p, "i");
    } catch (e) {
      fail(`${what}: pattern "${p}" is not a valid regular expression (${e instanceof Error ? e.message : String(e)})`);
    }
  }
}

function seoProfiles(): string[] {
  try {
    const seo = JSON.parse(fs.readFileSync(path.join(ROOT, "config/seo.json"), "utf8")) as { profiles?: Record<string, unknown> };
    return Object.keys(seo.profiles ?? {});
  } catch {
    return [];
  }
}

/** Checks the content before it is saved. Throws ValidationError with a message the user can act on. */
export function validateResource(r: Resource, content: string): void {
  if (Buffer.byteLength(content, "utf8") > MAX_BYTES) fail("File is larger than 2 MB");
  if (!content.trim()) fail("File is empty");
  if (r.kind === "markdown") {
    if (r.id === "compliance-prompt" && !content.includes("{{report_language}}")) fail("The prompt must keep the {{report_language}} placeholder");
    if (r.id === "geo-prompt") {
      if (!content.includes("{{report_language}}")) fail("The prompt must keep the {{report_language}} placeholder");
      if (!content.includes("{{questions}}")) fail("The prompt must keep the {{questions}} placeholder");
    }
    return;
  }
  let data: unknown;
  try {
    data = JSON.parse(content);
  } catch (e) {
    fail(`Not valid JSON: ${e instanceof Error ? e.message : String(e)}`);
  }

  switch (r.id) {
    case "geo-questions": {
      if (!Array.isArray(data) || !data.length) fail("Expected a non-empty list of questions");
      const ids = new Set<string>();
      for (const [i, q] of (data as unknown[]).entries()) {
        if (!isObj(q)) fail(`Question ${i + 1} must be an object`);
        const id = String(q.id ?? "");
        if (!/^[a-z][a-z0-9_]*$/.test(id)) fail(`Question ${i + 1}: id must be lower case letters, digits and underscores`);
        if (ids.has(id)) fail(`Question id "${id}" is used twice`);
        ids.add(id);
        if (typeof q.question !== "string" || q.question.trim().length < 10) fail(`Question "${id}" needs a question text`);
        const types = strArray(q.applies_to, `Question "${id}": applies_to`);
        if (!types.length) fail(`Question "${id}" must apply to at least one page type`);
        for (const t of types) if (!GEO_TYPES.includes(t)) fail(`Question "${id}": unknown page type "${t}"`);
        if (q.requires !== undefined && !CODE_CHECKS.includes(String(q.requires))) fail(`Question "${id}": unknown code check "${String(q.requires)}"`);
      }
      return;
    }
    case "seo": {
      if (!isObj(data)) fail("Expected an object");
      severityMap(data.severity, "severity");
      for (const k of ["title", "meta"] as const) {
        const t = data[k];
        if (!isObj(t) || typeof t.min !== "number" || typeof t.max !== "number" || t.min >= t.max || t.min < 0) fail(`${k}: min and max must be numbers, min below max`);
      }
      if (typeof data.service_path_prefix !== "string" || !data.service_path_prefix.startsWith("/")) fail("service_path_prefix must start with /");
      strArray(data.article_schema_fields, "article_schema_fields");
      strArray(data.skip_link_patterns, "skip_link_patterns");
      if (!isObj(data.profiles) || !Object.keys(data.profiles).length) fail("profiles must have at least one profile");
      for (const [name, p] of Object.entries(data.profiles)) {
        if (!isObj(p)) fail(`profile ${name} must be an object`);
        strArray(p.schema_required, `profile ${name}.schema_required`).length;
        strArray(p.schema_recommended, `profile ${name}.schema_recommended`).length;
        for (const f of ["author", "dates", "link_to_services"]) if (typeof p[f] !== "boolean") fail(`profile ${name}.${f} must be true or false`);
      }
      return;
    }
    case "geo": {
      if (!isObj(data)) fail("Expected an object");
      if (typeof data.home_title !== "string" || !data.home_title.trim()) fail("home_title is required");
      if (typeof data.llms_txt_url !== "string" || !/^https?:\/\//.test(data.llms_txt_url)) fail("llms_txt_url must be a URL");
      strArray(data.ai_bots, "ai_bots");
      strArray(data.nearshore_words, "nearshore_words");
      strArray(data.ampersand_allowlist, "ampersand_allowlist");
      strArray(data.uk_spelling_words, "uk_spelling_words");
      strArray(data.uk_spelling_stems, "uk_spelling_stems");
      strArray(data.uk_spelling_endings, "uk_spelling_endings");
      if (typeof data.faq_min_question_headings !== "number") fail("faq_min_question_headings must be a number");
      if (!Array.isArray(data.trap_terms)) fail("trap_terms must be a list");
      const patterns: string[] = [];
      for (const [i, t] of (data.trap_terms as unknown[]).entries()) {
        if (!isObj(t) || typeof t.term !== "string" || typeof t.pattern !== "string") fail(`trap_terms ${i + 1} needs term and pattern`);
        patterns.push(t.pattern as string);
      }
      checkRegexes(patterns, "trap_terms");
      checkRegexes((data.uk_spelling_stems as string[]).map((s) => `${s}(?:e)`), "uk_spelling_stems");
      return;
    }
    case "compliance": {
      if (!isObj(data)) fail("Expected an object");
      severityMap(data.severity, "severity");
      strArray(data.old_terms_high_kinds, "old_terms_high_kinds");
      strArray(data.old_terms_high_zone_prefixes, "old_terms_high_zone_prefixes");
      if (typeof data.max_locations !== "number" || data.max_locations < 1) fail("max_locations must be a number of at least 1");
      severityMap(data.unverified_severity, "unverified_severity");
      if (!Array.isArray(data.banned_terms)) fail("banned_terms must be a list");
      const ids = new Set<string>();
      for (const [i, t] of (data.banned_terms as unknown[]).entries()) {
        if (!isObj(t) || typeof t.id !== "string" || typeof t.term !== "string" || typeof t.pattern !== "string" || typeof t.category !== "string" || typeof t.rule !== "string") {
          fail(`banned_terms ${i + 1} needs id, term, pattern, category and rule`);
        }
        const id = t.id as string;
        if (ids.has(id)) fail(`banned_terms: id "${id}" is used twice`);
        ids.add(id);
        if (!Object.keys(data.severity as Record<string, unknown>).includes(t.category as string)) fail(`banned_terms "${id}": unknown category "${String(t.category)}"`);
        checkRegexes([t.pattern as string], `banned_terms "${id}"`);
      }
      return;
    }
    case "settings": {
      if (!isObj(data)) fail("Expected an object");
      if (typeof data.base_url !== "string" || !/^https?:\/\//.test(data.base_url)) fail("base_url must be a URL");
      if (typeof data.sitemap !== "string") fail("sitemap is required");
      if (!isObj(data.llm) || typeof data.llm.model !== "string" || !data.llm.model.trim()) fail("llm.model is required");
      if (!isObj(data.fetch) || typeof data.fetch.delay_ms !== "number") fail("fetch.delay_ms is required");
      if (!Array.isArray(data.scope) || !data.scope.length) fail("scope must be a non-empty list");
      const profiles = seoProfiles();
      for (const [i, s] of (data.scope as unknown[]).entries()) {
        if (!isObj(s) || typeof s.category !== "string" || typeof s.subsection !== "string" || typeof s.profile !== "string") fail(`scope ${i + 1} needs category, subsection and profile`);
        if (profiles.length && !profiles.includes(s.profile as string)) fail(`scope ${i + 1}: profile "${String(s.profile)}" is not in SEO settings (${profiles.join(", ")})`);
        if (s.path_equals === undefined && s.path_starts_with === undefined) fail(`scope ${i + 1} needs path_equals or path_starts_with`);
      }
      return;
    }
    default:
      return;
  }
}

function historyDir(r: Resource): string {
  return path.join(HISTORY, r.id);
}

export function listHistory(r: Resource): { ts: string; size: number }[] {
  const dir = historyDir(r);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .map((f) => ({ ts: f, size: fs.statSync(path.join(dir, f)).size }))
    .sort((a, b) => b.ts.localeCompare(a.ts));
}

export function readHistory(r: Resource, ts: string): string | null {
  if (!/^[0-9T-]+Z$/.test(ts)) return null;
  const p = path.join(historyDir(r), ts);
  return fs.existsSync(p) ? fs.readFileSync(p, "utf8") : null;
}

/** Validates, keeps the previous version in .history and replaces the file. */
export function writeResource(r: Resource, content: string): { changed: boolean } {
  validateResource(r, content);
  const normalized = content.replace(/\r\n/g, "\n");
  const file = abs(r);
  const prev = fs.existsSync(file) ? fs.readFileSync(file, "utf8") : null;
  if (prev !== null && prev.replace(/\r\n/g, "\n") === normalized) return { changed: false };
  if (prev !== null) {
    fs.mkdirSync(historyDir(r), { recursive: true });
    fs.writeFileSync(path.join(historyDir(r), new Date().toISOString().replace(/[:.]/g, "-")), prev);
    for (const old of listHistory(r).slice(MAX_VERSIONS)) fs.rmSync(path.join(historyDir(r), old.ts));
  }
  fs.writeFileSync(file, normalized);
  if (r.group === "sources") {
    resetSourcesCache();
    resetHeadingCache();
  }
  return { changed: true };
}
