import * as fs from "node:fs";
import path from "node:path";
import { projectRoot } from "./utils.js";
import { listVersions, loadResourceSnapshot, readVersion, resourceMeta, resourceText, saveVersion, type VersionInfo } from "./resource-store.js";
import { GEO_NEEDS, resetSourcesCache } from "./config.js";
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

const MAX_BYTES = 2 * 1024 * 1024;

const GEO_TYPES = ["home", "service", "article", "company", "legal", "podcast"];
const SEVERITIES = ["high", "medium", "low"];
const CODE_CHECKS = ["faq_present", "trap_terms", "nearshore_not_first", "home_title_exact"];

export function findResource(id: string): Resource | undefined {
  return RESOURCES.find((r) => r.id === id);
}

export function listResources(): (Resource & { size: number; modified: string | null })[] {
  return RESOURCES.map((r) => ({ ...r, ...resourceMeta(r.file) }));
}

export function readResource(r: Resource): string {
  return resourceText(r.file);
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
    const seo = JSON.parse(resourceText("config/seo.json")) as { profiles?: Record<string, unknown> };
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
        if (q.title !== undefined && (typeof q.title !== "string" || q.title.length > 120)) fail(`Question "${id}": title must be text up to 120 characters`);
        if (q.severity !== undefined && !SEVERITIES.includes(String(q.severity))) fail(`Question "${id}": severity must be high, medium or low`);
        if (q.needs !== undefined) for (const n of strArray(q.needs, `Question "${id}": needs`)) if (!GEO_NEEDS.includes(n as never)) fail(`Question "${id}": unknown data "${n}"`);
        if (q.confirm !== undefined && typeof q.confirm !== "boolean") fail(`Question "${id}": confirm must be true or false`);
      }
      checkLockedQuestions(r, data as Record<string, unknown>[]);
      return;
    }
    case "seo": {
      if (!isObj(data)) fail("Expected an object");
      severityMap(data.severity, "severity");
      for (const k of ["title", "meta"] as const) {
        const t = data[k];
        if (!isObj(t) || typeof t.min !== "number" || typeof t.max !== "number" || t.min >= t.max || t.min < 0) fail(`${k}: min and max must be numbers, min below max`);
      }
      if (data.title_h1 !== undefined) {
        const t = data.title_h1;
        if (!isObj(t) || typeof t.min_overlap !== "number" || t.min_overlap < 0 || t.min_overlap > 1) fail("title_h1.min_overlap must be a number from 0 to 1");
        strArray(t.skip_profiles, "title_h1.skip_profiles");
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
      if (data.severity !== undefined) severityMap(data.severity, "severity");
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
      const llm = data.llm as Record<string, unknown>;
      const models = llm.models;
      if (!Array.isArray(models) || !models.length) fail("llm.models must list at least one model");
      for (const [i, m] of (models as unknown[]).entries()) {
        const p = isObj(m) && isObj(m.price_per_million_tokens) ? m.price_per_million_tokens : null;
        if (!isObj(m) || typeof m.id !== "string" || !m.id.trim() || typeof m.label !== "string") fail(`model ${i + 1} needs id and label`);
        if (!p || !["input", "cached_input", "output"].every((k) => typeof p[k] === "number" && (p[k] as number) >= 0)) fail(`model ${i + 1}: price_per_million_tokens needs numeric input, cached_input and output`);
      }
      if (!(models as { id: string }[]).some((m) => m.id === llm.model)) fail("llm.model must be one of llm.models");
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

export function listHistory(r: Resource): Promise<VersionInfo[]> {
  return listVersions(r);
}

export function readHistory(r: Resource, ts: string): Promise<string | null> {
  return readVersion(r, ts);
}

/** Key order does not matter when comparing a locked question with the saved one. */
function stable(v: unknown): string {
  if (Array.isArray(v)) return `[${v.map(stable).join(",")}]`;
  if (isObj(v)) return `{${Object.keys(v).sort().map((k) => `${JSON.stringify(k)}:${stable(v[k])}`).join(",")}}`;
  return JSON.stringify(v);
}

/**
 * Questions marked `locked` in the file (the ones code depends on) cannot be changed, removed or added through the app:
 * the saved file is the definition. Editing the file by hand is the way to change them.
 */
function checkLockedQuestions(r: Resource, questions: Record<string, unknown>[]): void {
  const saved = JSON.parse(resourceText(r.file)) as Record<string, unknown>[];
  const lockedOld = new Map(saved.filter((q) => q.locked === true).map((q) => [String(q.id), q]));
  const lockedNew = new Map(questions.filter((q) => q.locked === true).map((q) => [String(q.id), q]));
  for (const [id, old] of lockedOld) {
    const now = lockedNew.get(id);
    if (!now) fail(`Question "${id}" is built in and cannot be removed or unlocked`);
    if (stable(now) !== stable(old)) fail(`Question "${id}" is built in and cannot be changed`);
  }
  for (const id of lockedNew.keys()) if (!lockedOld.has(id)) fail(`Question "${id}" cannot be marked built in from the app`);
}

/** Validates, stores the text as a new version (the earlier ones stay in history) and updates the snapshot. */
export async function writeResource(r: Resource, content: string, author: string | null = null): Promise<{ changed: boolean }> {
  validateResource(r, content);
  const normalized = content.replace(/\r\n/g, "\n");
  if (resourceText(r.file).replace(/\r\n/g, "\n") === normalized) return { changed: false };
  await saveVersion(r, normalized, author);
  if (r.group === "sources") {
    resetSourcesCache();
    resetHeadingCache();
  }
  return { changed: true };
}

/**
 * Loads the snapshot of all editable files from the database (seeding the ones it does not have), then lets the
 * repo file define the built-in GEO questions: the app cannot change them, so the file stays their source.
 */
export async function loadResources(): Promise<void> {
  const seeded = await loadResourceSnapshot(RESOURCES);
  if (seeded.length) console.log(`Editable files copied into the database: ${seeded.join(", ")}`);
  await syncLockedQuestions();
}

async function syncLockedQuestions(): Promise<void> {
  const r = findResource("geo-questions")!;
  let fromFile: Record<string, unknown>[];
  try {
    fromFile = JSON.parse(fs.readFileSync(path.join(projectRoot(), r.file), "utf8")) as Record<string, unknown>[];
  } catch {
    return;
  }
  const stored = JSON.parse(resourceText(r.file)) as Record<string, unknown>[];
  const locked = fromFile.filter((q) => q.locked === true);
  const same = stable(stored.filter((q) => q.locked === true)) === stable(locked);
  if (same) return;
  // locked questions come from the file and keep their place; new ones go first, removed ones go away, others stay as edited
  const lockedById = new Map(locked.map((q) => [String(q.id), q]));
  const kept = stored.filter((q) => q.locked !== true || lockedById.has(String(q.id))).map((q) => (q.locked === true ? lockedById.get(String(q.id))! : q));
  const have = new Set(kept.map((q) => String(q.id)));
  const merged = [...locked.filter((q) => !have.has(String(q.id))), ...kept];
  await saveVersion(r, JSON.stringify(merged, null, 2) + "\n", "seed");
  console.log("Built-in GEO questions updated from prompts/geo-questions.json");
}
