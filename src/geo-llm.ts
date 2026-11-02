import type OpenAI from "openai";
import type { PageZones, Settings, TokenUsage, Zone } from "./types.js";
import { loadGeoLlmInstruction } from "./config.js";
import { runGeoZones, type GeoLlmAnswer } from "./llm.js";
import { checkTargetKeywordPlacement, firstParagraph, type GeoCodeCheck, type GeoType } from "./geo-code.js";

export interface GeoLlmResult extends GeoLlmAnswer {
  /** evidence found as a substring of the zone named in zone_id (after whitespace normalisation) */
  evidence_verified: boolean | null;
  /** text-fragment value for a link to the live page, set when reports are built */
  fragment?: string | null;
}

export interface GeoLlmOutput {
  answers: GeoLlmResult[];
  placement: GeoCodeCheck | null;
  usage: TokenUsage;
  error: string | null;
}

/** Zones the GEO questions need; the TOC repeats article headings, JSON-LD and og belong to other layers. */
const PAYLOAD_KINDS = new Set(["title", "meta_description", "h1", "block", "article_section", "unknown"]);

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

export function geoPayload(url: string, geoType: GeoType, zones: PageZones): Record<string, unknown> {
  const pageZones: Zone[] = zones.zones.filter((z) => !z.skipped && z.scope === "page" && PAYLOAD_KINDS.has(z.kind));
  return {
    url,
    geo_type: geoType,
    answer_first: answerFirstText(zones),
    zones: pageZones.map((z) => ({ id: z.id, label: z.label, text: z.text })),
  };
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

export async function runGeoLlm(
  client: OpenAI,
  settings: Settings,
  url: string,
  geoType: GeoType,
  zones: PageZones,
  codeChecks: GeoCodeCheck[],
): Promise<GeoLlmOutput> {
  const passed = new Set(codeChecks.filter((c) => c.status === "pass").map((c) => c.id));
  const pack = loadGeoLlmInstruction(settings.report_language, geoType, passed);
  const none: GeoLlmOutput = { answers: [], placement: null, usage: { input: 0, cached_input: 0, output: 0 }, error: null };
  if (!pack) return none;

  const payload = geoPayload(url, geoType, zones);
  const firstText = (payload.answer_first as { text: string } | null)?.text ?? null;
  const res = await runGeoZones(client, settings, pack.instruction, payload);
  if (res.error) return { ...none, usage: res.usage, error: res.error };

  const asked = new Set(pack.questions.map((q) => q.id));
  const answers: GeoLlmResult[] = res.answers
    .filter((a) => asked.has(a.id))
    .map((a) => ({ ...a, evidence_verified: verifyEvidence(a, zones, firstText) }))
    // buyer_ready: the model's value decides, so answer and value cannot contradict each other
    .map((a) =>
      a.id === "buyer_ready" && a.value && ["buyer_ready", "informational", "not_targeted"].includes(a.value)
        ? { ...a, answer: a.value === "buyer_ready" ? ("yes" as const) : ("no" as const) }
        : a,
    );

  const kw = answers.find((a) => a.id === "target_keyword");
  const placement = kw && kw.answer === "yes" ? checkTargetKeywordPlacement(zones, kw.value) : null;
  return { answers, placement, usage: res.usage, error: null };
}
