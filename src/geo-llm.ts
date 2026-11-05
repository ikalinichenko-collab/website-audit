import type OpenAI from "openai";
import type { PageZones, Settings, TokenUsage, Zone } from "./types.js";
import { GEO_NEEDS, geoInstruction, geoQuestionsFor, type GeoLlmQuestion, type GeoNeed } from "./config.js";
import { runGeoZones, type GeoLlmAnswer } from "./llm.js";
import { checkTargetKeywordPlacement, firstParagraph, type GeoCodeCheck, type GeoType } from "./geo-code.js";
import { sha256 } from "./utils.js";

export interface GeoLlmResult extends Omit<GeoLlmAnswer, "answer"> {
  /** "none": the model did not answer this question even after a second try */
  answer: "yes" | "no" | "na" | "none";
  /** evidence found as a substring of the zone named in zone_id (after whitespace normalisation) */
  evidence_verified: boolean | null;
  /** text-fragment value for a link to the live page, set when reports are built */
  fragment?: string | null;
  /** finding title and severity, taken from the question settings on every run */
  title: string;
  severity: "high" | "medium" | "low";
  /** the question asks for a second answer when the first is no */
  needs_confirm: boolean;
  /** the second answer was no too (true), differed (false), or was not asked (absent) */
  confirmed?: boolean;
  /** hash of the question, its data and the page: the answer is reused while it is unchanged */
  qhash?: string;
}

export interface GeoLlmOutput {
  answers: GeoLlmResult[];
  placement: GeoCodeCheck | null;
  usage: TokenUsage;
  /** model calls made: 0 when every answer came from the earlier run */
  calls: number;
  error: string | null;
}

const ZERO: TokenUsage = { input: 0, cached_input: 0, output: 0 };

function addUsage(a: TokenUsage, b: TokenUsage): TokenUsage {
  return { input: a.input + b.input, cached_input: a.cached_input + b.cached_input, output: a.output + b.output };
}

/** Zones the GEO questions need; the TOC repeats article headings, JSON-LD and og belong to other layers. */
const PAYLOAD_KINDS = new Set(["title", "meta_description", "h1", "block", "article_section", "unknown"]);

const EXTRA_TEXT_LIMIT = 8000;
const EXTRA_LINKS_LIMIT = 80;

function norm(s: string): string {
  return s.replace(/\s+/g, " ").trim();
}

function sentences(text: string): string[] {
  return text.split(/(?<=[.!?])\s+(?=[A-Z0-9"“(])/).map((s) => s.trim()).filter(Boolean);
}

/** The first two sentences of the first content zone; the LLM never has to search the page for them. */
export function answerFirstText(zones: PageZones): { zone_id: string; text: string } | null {
  const first = firstParagraph(zones);
  if (!first) return null;
  const paragraphs = first.zone.parts.filter((p) => p.type === "paragraph" && p.text.length >= 20).map((p) => p.text);
  const out = sentences(paragraphs.join(" ")).slice(0, 2);
  return out.length ? { zone_id: first.zone.id, text: out.join(" ") } : null;
}

/** Page data beyond the text zones, for the questions that ask for it. */
export function geoExtras(zones: PageZones): Record<GeoNeed, unknown> {
  const page = zones.zones.filter((z) => !z.skipped && z.scope === "page");
  const texts = (kinds: string[]) =>
    page.filter((z) => kinds.includes(z.kind)).map((z) => ({ id: z.id, label: z.label, text: z.text.slice(0, EXTRA_TEXT_LIMIT) }));
  const seen = new Set<string>();
  const links: { text: string; href: string }[] = [];
  for (const z of page) {
    for (const p of z.parts) {
      if ((p.type !== "link" && p.type !== "button") || !p.href) continue;
      const key = `${p.text}|${p.href}`;
      if (seen.has(key) || links.length >= EXTRA_LINKS_LIMIT) continue;
      seen.add(key);
      links.push({ text: p.text, href: p.href });
    }
  }
  return {
    json_ld: texts(["json_ld"]),
    og: texts(["og_title", "og_description"]),
    author: texts(["author", "date"]),
    links,
  };
}

/** The part of the payload every question sees. */
export function geoCorePayload(url: string, geoType: GeoType, zones: PageZones): Record<string, unknown> {
  const pageZones: Zone[] = zones.zones.filter((z) => !z.skipped && z.scope === "page" && PAYLOAD_KINDS.has(z.kind));
  return {
    url,
    geo_type: geoType,
    answer_first: answerFirstText(zones),
    zones: pageZones.map((z) => ({ id: z.id, label: z.label, text: z.text })),
  };
}

export function geoPayload(url: string, geoType: GeoType, zones: PageZones, needs: Iterable<GeoNeed> = []): Record<string, unknown> {
  const core = geoCorePayload(url, geoType, zones);
  const wanted = new Set(needs);
  if (!wanted.size) return core;
  const extras = geoExtras(zones);
  for (const n of GEO_NEEDS) if (wanted.has(n)) core[n] = extras[n];
  return core;
}

export function verifyEvidence(answer: GeoLlmAnswer, zones: PageZones, firstText: string | null): boolean | null {
  if (!answer.evidence) return null;
  const ev = norm(answer.evidence).toLowerCase();
  if (answer.zone_id === "page") {
    return zones.zones.some((z) => !z.skipped && norm(z.text).toLowerCase().includes(ev));
  }
  if (answer.id === "answer_first" && firstText && norm(firstText).toLowerCase().includes(ev)) return true;
  const zone = zones.zones.find((z) => z.id === answer.zone_id);
  return zone ? norm(zone.text).toLowerCase().includes(ev) : false;
}

/** Answer plus what the question settings say about it; applied on every run, so editing a title or severity asks nothing. */
function stamp(a: GeoLlmAnswer | GeoLlmResult, q: GeoLlmQuestion, zones: PageZones, firstText: string | null, qhash?: string): GeoLlmResult {
  const prior = a as Partial<GeoLlmResult>;
  let answer = a.answer;
  // buyer_ready: the model's value decides, so answer and value cannot contradict each other
  if (a.id === "buyer_ready" && a.value && ["buyer_ready", "informational", "not_targeted"].includes(a.value)) {
    answer = a.value === "buyer_ready" ? "yes" : "no";
  }
  return {
    id: a.id,
    answer,
    value: a.value,
    zone_id: a.zone_id,
    evidence: a.evidence,
    note: a.note,
    fix: a.fix ?? null,
    evidence_verified: prior.evidence_verified !== undefined ? prior.evidence_verified : verifyEvidence(a as GeoLlmAnswer, zones, firstText),
    ...(prior.fragment !== undefined ? { fragment: prior.fragment } : {}),
    title: q.title?.trim() || q.id,
    severity: q.severity ?? "medium",
    needs_confirm: Boolean(q.confirm),
    ...(prior.confirmed !== undefined ? { confirmed: prior.confirmed } : {}),
    ...(qhash ?? prior.qhash ? { qhash: qhash ?? prior.qhash } : {}),
  };
}

function noAnswer(q: GeoLlmQuestion): GeoLlmResult {
  return {
    id: q.id,
    answer: "none",
    value: null,
    zone_id: null,
    evidence: null,
    note: "The model gave no answer to this question.",
    fix: null,
    evidence_verified: null,
    title: q.title?.trim() || q.id,
    severity: q.severity ?? "medium",
    needs_confirm: Boolean(q.confirm),
  };
}

export interface GeoAsk {
  answers: GeoLlmAnswer[];
  usage: TokenUsage;
  error: string | null;
}

/** One model call for the given questions; the payload carries the union of the data they ask for. */
export async function askGeoQuestions(
  client: OpenAI,
  settings: Settings,
  url: string,
  geoType: GeoType,
  zones: PageZones,
  questions: GeoLlmQuestion[],
): Promise<GeoAsk> {
  const needs = new Set<GeoNeed>(questions.flatMap((q) => q.needs ?? []));
  const res = await runGeoZones(client, settings, geoInstruction(settings.report_language, questions), geoPayload(url, geoType, zones, needs));
  const asked = new Set(questions.map((q) => q.id));
  return { answers: res.answers.filter((a) => asked.has(a.id)), usage: res.usage, error: res.error };
}

export interface GeoRunInput {
  client: OpenAI;
  settings: Settings;
  url: string;
  geoType: GeoType;
  zones: PageZones;
  codeChecks: GeoCodeCheck[];
  /** answers of the earlier report of this page: reused where the question, its data and the page are unchanged */
  prev: GeoLlmResult[] | null;
  /** hash of the prompt, documents, model and reasoning: a change asks every question again */
  fingerprint: string;
}

export async function runGeoLlm(input: GeoRunInput): Promise<GeoLlmOutput> {
  const { client, settings, url, geoType, zones, codeChecks, prev, fingerprint } = input;
  const passed = new Set(codeChecks.filter((c) => c.status === "pass").map((c) => c.id));
  const questions = geoQuestionsFor(geoType, passed);
  const none: GeoLlmOutput = { answers: [], placement: null, usage: ZERO, calls: 0, error: null };
  if (!questions.length) return none;

  const core = JSON.stringify(geoCorePayload(url, geoType, zones));
  const extras = geoExtras(zones);
  const firstText = (answerFirstText(zones)?.text) ?? null;
  const keyOf = (q: GeoLlmQuestion): string => {
    const needs = [...(q.needs ?? [])].sort();
    return sha256([fingerprint, q.id, q.question, needs.join(","), core, JSON.stringify(needs.map((n) => extras[n]))].join("\u0001"));
  };

  const prevById = new Map((prev ?? []).map((a) => [a.id, a]));
  const done = new Map<string, GeoLlmResult>();
  const todo: GeoLlmQuestion[] = [];
  for (const q of questions) {
    const old = prevById.get(q.id);
    if (old && old.answer !== "none" && old.qhash === keyOf(q)) done.set(q.id, stamp(old, q, zones, firstText));
    else todo.push(q);
  }

  let usage = ZERO;
  let calls = 0;
  let error: string | null = null;

  if (todo.length) {
    calls++;
    const first = await askGeoQuestions(client, settings, url, geoType, zones, todo);
    usage = addUsage(usage, first.usage);
    if (first.error) {
      error = first.error;
    } else {
      let answers = first.answers;
      // a question the model skipped is asked once more, alone
      const missing = todo.filter((q) => !answers.some((a) => a.id === q.id));
      if (missing.length) {
        calls++;
        const retry = await askGeoQuestions(client, settings, url, geoType, zones, missing);
        usage = addUsage(usage, retry.usage);
        answers = [...answers, ...retry.answers];
      }
      for (const q of todo) {
        const a = answers.find((x) => x.id === q.id);
        done.set(q.id, a ? stamp(a, q, zones, firstText, keyOf(q)) : noAnswer(q));
      }
    }
  }

  // a "no" the question wants confirmed is asked a second time; the finding stands only if the second answer is no too
  const toConfirm = questions.filter((q) => q.confirm && done.get(q.id)?.answer === "no" && done.get(q.id)?.confirmed === undefined);
  if (toConfirm.length) {
    calls++;
    const second = await askGeoQuestions(client, settings, url, geoType, zones, toConfirm);
    usage = addUsage(usage, second.usage);
    if (second.error) {
      error = error ?? `Second answer failed: ${second.error}`;
    } else {
      for (const q of toConfirm) {
        const a = second.answers.find((x) => x.id === q.id);
        if (a) done.set(q.id, { ...done.get(q.id)!, confirmed: stamp(a, q, zones, firstText).answer === "no" });
      }
    }
  }

  const answers = questions.map((q) => done.get(q.id)).filter((a): a is GeoLlmResult => Boolean(a));
  const kw = answers.find((a) => a.id === "target_keyword");
  const placement = kw && kw.answer === "yes" ? checkTargetKeywordPlacement(zones, kw.value) : null;
  return { answers, placement, usage, calls, error };
}
