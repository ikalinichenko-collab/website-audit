import * as cheerio from "cheerio";
import { db } from "./db.js";
import { getBrief } from "./briefs.js";
import { loadChecksConfig } from "./check-catalog.js";
import { loadSettings, settingsForModel, usageCost } from "./config.js";
import { locate } from "./compliance.js";
import { parseJsonLdBlocks } from "./extract.js";
import { createOpenAiClient, runBriefCheck, type BriefCheckRaw } from "./llm.js";
import { logCheck } from "./page-checks.js";
import { resourceText } from "./resource-store.js";
import { getSiteCheck } from "./store.js";
import type { PageZones, TokenUsage, Zone } from "./types.js";
import { shownName } from "./users.js";
import { sha256 } from "./utils.js";

/** The check of a page against its brief (table `brief_checks`, migration 012): one model call, a result for every row of the brief. */

export type BriefStatus = "done" | "partial" | "missing" | "not_applicable" | "covered";

export interface BriefEvidence {
  zone_id: string;
  /** found by code in the named zone, never by the model */
  part: string | null;
  quote: string;
  verified: boolean;
}

export interface BriefRowResult {
  /** CSV row number (1-based) */
  row: number;
  title: string;
  status: BriefStatus;
  explanation: string;
  fix: string | null;
  /** "seo:<check id>" or "geo:<check id>": the audit check that already covers this row */
  covered_by: string | null;
  points: { text: string; status: "done" | "partial" | "missing"; note: string }[];
  evidence: BriefEvidence[];
}

export interface BriefCheckResult {
  summary: string;
  rows: BriefRowResult[];
}

export interface BriefCheckRecord {
  slug: string;
  source: string;
  brief_id: number;
  model: string;
  checked_at: string;
  checked_by: string | null;
  cost_usd: number;
  usage: TokenUsage;
  /** the brief or the page changed since this check */
  stale: boolean;
  result: BriefCheckResult;
}

const PAGE_KINDS = new Set(["title", "meta_description", "og_title", "og_description", "json_ld", "h1", "block", "article_section", "author", "date", "unknown"]);
const words = (s: string): number => (s.match(/\S+/g) ?? []).length;

/** Page zones the check sees: the page's own, as in Compliance. */
function pageZones(zones: PageZones): Zone[] {
  return zones.zones.filter((z) => !z.skipped && z.scope === "page" && PAGE_KINDS.has(z.kind));
}

/** What code can count better than a model: words, headings, the first paragraph, FAQ answers, links. */
export function pageFacts(zones: Zone[]): Record<string, unknown> {
  const headings: { zone_id: string; level: number | null; text: string }[] = [];
  const links = new Map<string, { href: string; text: string; zone_id: string }>();
  const faq: { zone_id: string; question: string; answer_words: number }[] = [];
  let first: { zone_id: string; text: string; words: number } | null = null;
  for (const z of zones) {
    const isFaq = /faq|frequently asked/i.test(`${z.label} ${z.id}`);
    let open: { question: string; n: number } | null = null;
    for (const p of z.parts ?? []) {
      // in a FAQ zone a question is a heading, or a short paragraph ending with "?" (accordion templates have no heading per item)
      const question = isFaq && p.text.trim().endsWith("?") && (p.type === "heading" || (p.type === "paragraph" && words(p.text) <= 25));
      if (p.type === "heading") headings.push({ zone_id: z.id, level: p.level ?? null, text: p.text });
      if (question) {
        if (open) faq.push({ zone_id: z.id, question: open.question, answer_words: open.n });
        open = { question: p.text, n: 0 };
      } else if (p.type === "heading") {
        if (open) faq.push({ zone_id: z.id, question: open.question, answer_words: open.n });
        open = null;
      } else if (open && (p.type === "paragraph" || p.type === "list_item")) open.n += words(p.text);
      if (!first && p.type === "paragraph" && (z.kind === "block" || z.kind === "article_section") && words(p.text) >= 5) first = { zone_id: z.id, text: p.text, words: words(p.text) };
      for (const l of p.type === "link" ? [{ href: p.href ?? "", text: p.text }] : (p.links ?? [])) {
        if (l.href && !links.has(l.href + "|" + l.text)) links.set(l.href + "|" + l.text, { href: l.href, text: l.text, zone_id: z.id });
      }
    }
    if (open) faq.push({ zone_id: z.id, question: open.question, answer_words: open.n });
  }
  return {
    total_words: zones.filter((z) => z.kind === "block" || z.kind === "article_section").reduce((n, z) => n + words(z.text), 0),
    words_per_zone: zones.map((z) => ({ id: z.id, label: z.label, words: words(z.text) })),
    headings,
    first_paragraph: first,
    faq_questions: faq,
    links: [...links.values()].slice(0, 150),
  };
}

/** Facts from the page's HTML that the zones lose: the types of the JSON-LD nodes (the zone keeps only their text), dates, head tags. */
export function htmlFacts(html: string, zones: Zone[]): Record<string, unknown> {
  const $ = cheerio.load(html);
  // top-level nodes only (the nested ImageObject, PostalAddress and the like are properties of them)
  const nodes: Record<string, unknown>[] = parseJsonLdBlocks(html).flatMap((b) => {
    const list = Array.isArray(b) ? b : Array.isArray((b as { "@graph"?: unknown[] })?.["@graph"]) ? (b as { "@graph": unknown[] })["@graph"] : [b];
    return list.filter((n): n is Record<string, unknown> => !!n && typeof n === "object");
  });
  const structured_data = nodes.map((n) => {
    const t = n["@type"];
    const entity = n.mainEntity;
    return {
      type: Array.isArray(t) ? t.join(", ") : String(t ?? ""),
      properties: Object.keys(n).filter((k) => !k.startsWith("@")),
      ...(Array.isArray(entity) ? { main_entity_count: entity.length } : {}),
    };
  });
  const meta = (sel: string): string | null => $(sel).attr("content")?.trim() || null;
  const jsonDate = (k: string): string | null => {
    const n = nodes.find((x) => typeof x[k] === "string");
    return n ? String(n[k]) : null;
  };
  const visible_updated = zones
    .flatMap((z) => [...z.text.matchAll(/.{0,40}\bupdated\b.{0,40}/gi)].map((m) => `${z.id}: ${m[0].trim()}`))
    .slice(0, 3);
  return {
    structured_data,
    dates: {
      meta_modified: meta('meta[property="article:modified_time"]') ?? meta('meta[property="og:updated_time"]'),
      meta_published: meta('meta[property="article:published_time"]'),
      json_ld_date_modified: jsonDate("dateModified"),
      json_ld_date_published: jsonDate("datePublished"),
      visible_updated,
    },
    head: { canonical: $('link[rel="canonical"]').attr("href")?.trim() ?? null, robots: meta('meta[name="robots"]') },
  };
}

/** Blocks of a brief that are not about the page (the LinkedIn part), unless `brief.skip_from` in the settings says otherwise. */
const DEFAULT_SKIP_FROM = ["REPURPOSE INTO LINKEDIN"];

/** How many rows the model sees: the rows from the first one that starts a skipped block (its first cell begins with a listed heading) are cut off. */
export function briefRowCount(rows: string[][]): number {
  const skip = (loadSettings().brief?.skip_from ?? DEFAULT_SKIP_FROM).map((x) => x.trim().toLowerCase()).filter(Boolean);
  const i = rows.findIndex((r) => {
    const first = (r[0] ?? "").trim().toLowerCase();
    return first !== "" && skip.some((x) => first.startsWith(x));
  });
  return i < 0 ? rows.length : i;
}

/** The brief rows as text for the model: row number, then the cells in column order. Empty rows are left out, the numbers stay. */
export function briefText(rows: string[][]): string {
  const lines: string[] = ["# Brief (rows of the spreadsheet)"];
  rows.slice(0, briefRowCount(rows)).forEach((cells, i) => {
    if (!cells.some((c) => c.trim())) return;
    lines.push(`\n## Row ${i + 1}`);
    cells.forEach((c, j) => {
      if (c.trim()) lines.push(`[${String.fromCharCode(65 + j)}] ${c.trim()}`);
    });
  });
  return lines.join("\n");
}

/** The audit checks a row can be "covered" by, as lines the model reads: `seo:id: title`. */
function checkCatalog(): string {
  const cfg = loadChecksConfig();
  const lines = Object.entries(cfg.checks).map(([id, c]) => `- ${c.layer}:${id}: ${c.title}`);
  return `\n\n## Checks of this audit (for "covered")\n\n${lines.join("\n")}`;
}

interface Source {
  url: string;
  profile: string;
  zones: PageZones;
  html: string | null;
  seo_checks: { id: string; status: string; value?: unknown }[] | null;
}

async function loadSource(slug: string, runId: string | null): Promise<Source | null> {
  const cols = "url, report->>'profile' AS profile, zones, html, report->'seo'->'checks' AS seo_checks";
  const r =
    runId === null
      ? await db().query<Source>(`SELECT ${cols} FROM page_checks WHERE slug = $1`, [slug])
      : await db().query<Source>(`SELECT ${cols} FROM pages WHERE run_id = $1 AND slug = $2`, [runId, slug]);
  const x = r.rows[0];
  return x && Array.isArray(x.zones?.zones) && x.zones.zones.length ? x : null;
}

/** All the facts of a page for the model, worked out by code: from the zones, the HTML, the page's own audit checks and the site map. */
async function allFacts(slug: string, runId: string | null, src: Source, zones: Zone[]): Promise<Record<string, unknown>> {
  const site = await getSiteCheck(runId, slug).catch(() => null);
  return {
    ...pageFacts(zones),
    ...(src.html ? htmlFacts(src.html, zones) : {}),
    audit_results: (src.seo_checks ?? []).map((c) => ({ id: c.id, status: c.status, value: typeof c.value === "string" ? c.value.slice(0, 140) : c.value })),
    inbound_pages: site?.available ? { as_of: site.as_of, urls: site.inbound.map((i) => i.url).slice(0, 60) } : "not known: no site snapshot has this page",
  };
}

/** Everything the result depends on, hashed: the same brief version, page text, prompt, model and language give the same key. */
function keyOf(rows: string[][], zones: Zone[], facts: Record<string, unknown>, model: string, instruction: string): string {
  return sha256(JSON.stringify([briefText(rows), zones.map((z) => [z.id, z.text]), facts, model, instruction, Object.keys(loadChecksConfig().checks)]));
}

function verify(raw: BriefCheckRaw, rows: string[][], zones: PageZones): BriefCheckResult {
  const byRow = new Map(raw.rows.map((r) => [r.row, r]));
  const out: BriefRowResult[] = [];
  rows.slice(0, briefRowCount(rows)).forEach((cells, i) => {
    if (!cells.some((c) => c.trim())) return;
    const n = i + 1;
    const r = byRow.get(n);
    if (!r) {
      out.push({ row: n, title: cells.find((c) => c.trim())!.trim().slice(0, 60), status: "not_applicable", explanation: "The model gave no result for this row.", fix: null, covered_by: null, points: [], evidence: [] });
      return;
    }
    const evidence: BriefEvidence[] = (r.evidence ?? []).slice(0, 3).map((e) => {
      const { verified, part } = locate(zones.zones.find((z) => z.id === e.zone_id), e.quote);
      return { zone_id: e.zone_id, part, quote: e.quote, verified };
    });
    // a "covered" row names a check that exists, else it is judged like any other row (the model said so, code does not know better)
    const known = r.covered_by && loadChecksConfig().checks[r.covered_by.replace(/^(seo|geo):/, "")] ? r.covered_by : null;
    out.push({ row: n, title: r.title, status: r.status === "covered" && !known ? "partial" : r.status, explanation: r.explanation, fix: r.fix, covered_by: known, points: r.points ?? [], evidence });
  });
  return { summary: raw.summary, rows: out };
}

/** The stored check of a page and whether it is still current (the brief and the page text are the ones it was made from). */
export async function getBriefCheck(slug: string, runId: string | null): Promise<BriefCheckRecord | null> {
  const r = await db().query<{ brief_id: string; hash: string; model: string; result: BriefCheckResult; usage: TokenUsage; cost_usd: string; checked_at: Date; checked_by: string | null }>(
    `SELECT brief_id, hash, model, result, usage, cost_usd, checked_at, CASE WHEN checked_by IS NULL THEN NULL ELSE ${shownName("checked_by")} END AS checked_by FROM brief_checks WHERE slug = $1 AND source = $2`,
    [slug, runId ?? ""],
  );
  const x = r.rows[0];
  if (!x) return null;
  const brief = (await getBrief(slug)).current;
  const src = await loadSource(slug, runId);
  const zs = src ? pageZones(src.zones) : [];
  const stale = !brief || !src || keyOf(brief.rows, zs, await allFacts(slug, runId, src, zs), x.model, resourceText("prompts/brief-check.md")) !== x.hash;
  return { slug, source: runId ?? "", brief_id: Number(x.brief_id), model: x.model, checked_at: x.checked_at.toISOString(), checked_by: x.checked_by, cost_usd: Number(x.cost_usd), usage: x.usage, stale, result: x.result };
}

/** Checks the page against the latest version of its brief. The same inputs as the stored check give the stored result at no cost, unless `force`. */
export async function checkAgainstBrief(slug: string, runId: string | null, opts: { model?: string; force?: boolean; by: string | null }): Promise<BriefCheckRecord> {
  const brief = (await getBrief(slug)).current;
  if (!brief) throw new Error("No brief is loaded for this page");
  const src = await loadSource(slug, runId);
  if (!src) throw new Error("The text of this page is not stored (an old snapshot keeps only its reports). Check the page again, or use a newer snapshot.");
  const { settings, model } = settingsForModel(opts.model);
  const zones = pageZones(src.zones);
  const instruction = resourceText("prompts/brief-check.md").replace(/\{\{report_language\}\}/g, settings.report_language);
  const facts = await allFacts(slug, runId, src, zones);
  const hash = keyOf(brief.rows, zones, facts, model.id, resourceText("prompts/brief-check.md"));

  const stored = await db().query<{ hash: string }>("SELECT hash FROM brief_checks WHERE slug = $1 AND source = $2", [slug, runId ?? ""]);
  if (!opts.force && stored.rows[0]?.hash === hash) {
    const same = await getBriefCheck(slug, runId);
    if (same) return same;
  }

  const client = createOpenAiClient();
  if (!client) throw new Error("OPENAI_API_KEY is not set");
  const payload = {
    url: src.url,
    page_type: src.profile,
    zones: zones.map((z) => ({ id: z.id, label: z.label, text: z.text })),
    facts: { today: new Date().toISOString().slice(0, 10), ...facts },
  };
  const res = await runBriefCheck(client, settings, instruction + checkCatalog(), briefText(brief.rows), payload);
  if (res.error || !res.data) throw new Error(res.error ?? "Empty response from the model");
  const result = verify(res.data, brief.rows, src.zones);
  const cost = usageCost(res.usage, model);
  await db().query(
    `INSERT INTO brief_checks (slug, source, brief_id, hash, model, result, usage, cost_usd, checked_at, checked_by) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, now(), $9)
     ON CONFLICT (slug, source) DO UPDATE SET brief_id = $3, hash = $4, model = $5, result = $6, usage = $7, cost_usd = $8, checked_at = now(), checked_by = $9`,
    [slug, runId ?? "", brief.id, hash, model.id, JSON.stringify(result), JSON.stringify(res.usage), cost, opts.by],
  );
  await logCheck({ kind: "brief", by: opts.by, url: src.url, model: model.id, layers: null, tokens: res.usage, cost, calls: 1, fromSnapshot: runId !== null });
  return (await getBriefCheck(slug, runId))!;
}
