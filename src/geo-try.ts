import type { Settings, TokenUsage } from "./types.js";
import { GEO_NEEDS, loadSettings, resolveModel, usageCost, type GeoLlmQuestion, type GeoNeed } from "./config.js";
import { extractFromHtml } from "./extract.js";
import { httpGet } from "./fetch.js";
import { classifyUrl } from "./scope.js";
import { buildZones } from "./zones.js";
import { createOpenAiClient } from "./llm.js";
import { geoTypeOf, type GeoType } from "./geo-code.js";
import { askGeoQuestions, verifyEvidence, type GeoLlmResult } from "./geo-llm.js";
import { loadSavedSiteWideFingerprints } from "./audit.js";

export interface GeoTryInput {
  url: string;
  question: string;
  /** shown in the answer; "try" when empty */
  id?: string;
  title?: string;
  severity?: GeoLlmQuestion["severity"];
  needs?: string[];
  model?: string;
}

export interface GeoTryResult {
  url: string;
  geo_type: GeoType;
  model: string;
  answer: Pick<GeoLlmResult, "answer" | "value" | "zone_id" | "evidence" | "evidence_verified" | "note" | "fix">;
  usage: TokenUsage;
  cost_usd: number;
}

/** One question on one live page, nothing saved: lets the author see how the model reads a new question before a run. */
export async function tryGeoQuestion(input: GeoTryInput): Promise<GeoTryResult> {
  const base = loadSettings();
  const model = resolveModel(base, input.model);
  const settings: Settings = { ...base, llm: { ...base.llm, model: model.id } };
  const client = createOpenAiClient();
  if (!client) throw new Error("OPENAI_API_KEY is not set");
  const text = input.question.trim();
  if (text.length < 10) throw new Error("Write the question first (at least 10 characters)");
  const needs = (input.needs ?? []).filter((n): n is GeoNeed => (GEO_NEEDS as readonly string[]).includes(n));

  const fetched = await httpGet(input.url, settings);
  if (fetched.status < 200 || fetched.status >= 300 || !fetched.html) throw new Error(`The page answered with status ${fetched.status}`);
  const page = extractFromHtml(fetched.html, input.url, settings, fetched, loadSavedSiteWideFingerprints());
  const zones = buildZones(fetched.html, fetched.finalUrl, settings, page.page_json_ld);
  const scope = classifyUrl(fetched.finalUrl, settings);
  const geoType: GeoType = scope ? geoTypeOf(scope.profile) : "article";

  const id = input.id?.trim() || "try";
  const q: GeoLlmQuestion = { id, question: text, applies_to: [geoType], needs };
  const res = await askGeoQuestions(client, settings, fetched.finalUrl, geoType, zones, [q]);
  if (res.error) throw new Error(res.error);
  const a = res.answers.find((x) => x.id === id);
  if (!a) throw new Error("The model gave no answer to this question");
  // the same check the audit does: the quote must stand in the zone the model names
  return {
    url: fetched.finalUrl,
    geo_type: geoType,
    model: model.id,
    answer: { answer: a.answer, value: a.value, zone_id: a.zone_id, evidence: a.evidence, evidence_verified: verifyEvidence(a, zones, null), note: a.note, fix: a.fix },
    usage: res.usage,
    cost_usd: usageCost(res.usage, model),
  };
}
