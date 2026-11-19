import OpenAI from "openai";
import type { Settings, TokenUsage } from "./types.js";
import { loadSourcesText } from "./config.js";

export type LlmLayer = "compliance" | "geo" | "brief";

export const geoZoneSchema = {
  type: "object",
  properties: {
    answers: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string" },
          answer: { type: "string", enum: ["yes", "no", "na"] },
          value: { type: ["string", "null"] },
          zone_id: { type: ["string", "null"] },
          evidence: { type: ["string", "null"] },
          note: { type: "string" },
          fix: { type: ["string", "null"] },
        },
        required: ["id", "answer", "value", "zone_id", "evidence", "note", "fix"],
        additionalProperties: false,
      },
    },
  },
  required: ["answers"],
  additionalProperties: false,
} as const;

export const complianceZoneSchema = {
  type: "object",
  properties: {
    action: { type: "string", enum: ["keep", "fix", "rewrite", "needs_decision"] },
    summary: { type: "string" },
    problems: {
      type: "array",
      items: {
        type: "object",
        properties: {
          title: { type: "string" },
          category: {
            type: "string",
            enum: [
              "positioning",
              "old_terms",
              "discontinued_offer",
              "company_facts",
              "unknown_client",
              "client_figures",
              "cta",
              "contacts",
              "wrong_audience",
              "other",
            ],
          },
          basis: { type: "string", enum: ["contradicts", "not_in_sources"] },
          rule: { type: "string" },
          issue: { type: "string" },
          fix: { type: "string" },
          subject: { type: ["string", "null"] },
          page_value: { type: ["string", "null"] },
          source_value: { type: ["string", "null"] },
          locations: {
            type: "array",
            items: {
              type: "object",
              properties: { zone_id: { type: "string" }, quote: { type: "string" }, reason: { type: "string" } },
              required: ["zone_id", "quote", "reason"],
              additionalProperties: false,
            },
          },
        },
        required: [
          "title",
          "category",
          "basis",
          "rule",
          "issue",
          "fix",
          "subject",
          "page_value",
          "source_value",
          "locations",
        ],
        additionalProperties: false,
      },
    },
  },
  required: ["action", "summary", "problems"],
  additionalProperties: false,
} as const;

export interface ComplianceZoneRaw {
  action: "keep" | "fix" | "rewrite" | "needs_decision";
  summary: string;
  problems: {
    title: string;
    category: string;
    basis: "contradicts" | "not_in_sources";
    rule: string;
    issue: string;
    fix: string;
    subject: string | null;
    page_value: string | null;
    source_value: string | null;
    locations: { zone_id: string; quote: string; reason: string }[];
  }[];
}

export async function runComplianceZones(
  client: OpenAI,
  settings: Settings,
  instruction: string,
  payload: Record<string, unknown>,
): Promise<{ data: ComplianceZoneRaw | null; usage: TokenUsage; error: string | null }> {
  const sources = loadSourcesText();
  try {
    const { data, usage } = await withRetry(() =>
      callStructured<ComplianceZoneRaw>(client, settings, "compliance", instruction, payload, sources, {
        name: "audit_compliance_zones",
        schema: complianceZoneSchema as unknown as Record<string, unknown>,
      }),
    );
    return { data, usage, error: null };
  } catch (e) {
    return {
      data: null,
      usage: { input: 0, cached_input: 0, output: 0 },
      error: e instanceof Error ? e.message : String(e),
    };
  }
}

function reasoningForLayer(settings: Settings, layer: LlmLayer): string | undefined {
  const re = settings.llm.reasoning_effort;
  if (!re) return undefined;
  if (typeof re === "string") return re;
  // the brief check has no setting of its own unless one is added: it reads like Compliance does
  return re[layer] ?? (layer === "brief" ? re.compliance : undefined);
}

function parseUsage(completion: OpenAI.Chat.ChatCompletion): TokenUsage {
  const u = completion.usage;
  const cached = u?.prompt_tokens_details?.cached_tokens ?? 0;
  return {
    input: (u?.prompt_tokens ?? 0) - cached,
    cached_input: cached,
    output: u?.completion_tokens ?? 0,
  };
}

/**
 * Stable text first as a system message (company sources, then the instruction), the page as the user
 * message. Measured: with everything in one user message the provider cached nothing across different
 * pages; with this split about 85% of the input was cached from the second page on.
 */
export function buildMessages(
  sources: string,
  instruction: string,
  pageJson: Record<string, unknown>,
): { role: "system" | "user"; content: string }[] {
  return [
    { role: "system", content: `${sources}

${instruction}` },
    { role: "user", content: JSON.stringify(pageJson) },
  ];
}

async function callStructured<T>(
  client: OpenAI,
  settings: Settings,
  layer: LlmLayer,
  instruction: string,
  pageJson: Record<string, unknown>,
  sources: string,
  schemaSpec: { name: string; schema: Record<string, unknown> },
): Promise<{ data: T; usage: TokenUsage }> {
  const schema = schemaSpec.schema;
  const effort = reasoningForLayer(settings, layer);
  const params: OpenAI.Chat.ChatCompletionCreateParamsNonStreaming = {
    model: settings.llm.model,
    max_completion_tokens: settings.llm.max_output_tokens,
    messages: buildMessages(sources, instruction, pageJson),
    response_format: {
      type: "json_schema",
      json_schema: { name: schemaSpec.name, strict: true, schema },
    },
    ...(effort ? { reasoning_effort: effort as OpenAI.Chat.ChatCompletionCreateParams["reasoning_effort"] } : {}),
  };
  const completion = await client.chat.completions.create(params);
  const text = completion.choices[0]?.message?.content;
  if (!text?.trim()) throw new Error("Empty LLM response");
  return { data: JSON.parse(text) as T, usage: parseUsage(completion) };
}

async function withRetry<T>(fn: () => Promise<T>): Promise<T> {
  try {
    return await fn();
  } catch (e1) {
    try {
      return await fn();
    } catch (e2) {
      throw e2 instanceof Error ? e2 : new Error(String(e2));
    }
  }
}

export interface GeoLlmAnswer {
  id: string;
  answer: "yes" | "no" | "na";
  value: string | null;
  zone_id: string | null;
  evidence: string | null;
  /** why the answer is what it is */
  note: string;
  /** what to change, only for a "no" answer */
  fix: string | null;
}

/** Zone-based GEO call: payload is `{url, geo_type, answer_first, zones}`. */
export async function runGeoZones(
  client: OpenAI,
  settings: Settings,
  instruction: string,
  payload: Record<string, unknown>,
): Promise<{ answers: GeoLlmAnswer[]; usage: TokenUsage; error: string | null }> {
  const sources = loadSourcesText();
  try {
    const { data, usage } = await withRetry(() =>
      callStructured<{ answers: GeoLlmAnswer[] }>(client, settings, "geo", instruction, payload, sources, {
        name: "audit_geo_zones",
        schema: geoZoneSchema as unknown as Record<string, unknown>,
      }),
    );
    return { answers: data.answers ?? [], usage, error: null };
  } catch (e) {
    return {
      answers: [],
      usage: { input: 0, cached_input: 0, output: 0 },
      error: e instanceof Error ? e.message : String(e),
    };
  }
}

export function createOpenAiClient(): OpenAI | null {
  const key = process.env.OPENAI_API_KEY;
  if (!key) return null;
  return new OpenAI({ apiKey: key });
}

export const briefCheckSchema = {
  type: "object",
  properties: {
    summary: { type: "string" },
    rows: {
      type: "array",
      items: {
        type: "object",
        properties: {
          row: { type: "integer" },
          title: { type: "string" },
          status: { type: "string", enum: ["done", "partial", "missing", "not_applicable", "covered"] },
          explanation: { type: "string" },
          fix: { type: ["string", "null"] },
          covered_by: { type: ["string", "null"] },
          points: {
            type: "array",
            items: {
              type: "object",
              properties: {
                text: { type: "string" },
                status: { type: "string", enum: ["done", "partial", "missing"] },
                note: { type: "string" },
              },
              required: ["text", "status", "note"],
              additionalProperties: false,
            },
          },
          evidence: {
            type: "array",
            items: {
              type: "object",
              properties: { zone_id: { type: "string" }, quote: { type: "string" } },
              required: ["zone_id", "quote"],
              additionalProperties: false,
            },
          },
        },
        required: ["row", "title", "status", "explanation", "fix", "covered_by", "points", "evidence"],
        additionalProperties: false,
      },
    },
  },
  required: ["summary", "rows"],
  additionalProperties: false,
} as const;

export interface BriefCheckRaw {
  summary: string;
  rows: {
    row: number;
    title: string;
    status: "done" | "partial" | "missing" | "not_applicable" | "covered";
    explanation: string;
    fix: string | null;
    covered_by: string | null;
    points: { text: string; status: "done" | "partial" | "missing"; note: string }[];
    evidence: { zone_id: string; quote: string }[];
  }[];
}

/**
 * The check of a page against its brief: one call. The brief goes in the stable system part (with the instruction),
 * the page in the user message, so a repeat check of the same brief is cached by the provider.
 */
export async function runBriefCheck(
  client: OpenAI,
  settings: Settings,
  instruction: string,
  briefText: string,
  payload: Record<string, unknown>,
): Promise<{ data: BriefCheckRaw | null; usage: TokenUsage; error: string | null }> {
  try {
    const { data, usage } = await withRetry(() =>
      callStructured<BriefCheckRaw>(client, settings, "brief", instruction, payload, briefText, {
        name: "audit_brief_check",
        schema: briefCheckSchema as unknown as Record<string, unknown>,
      }),
    );
    return { data, usage, error: null };
  } catch (e) {
    return { data: null, usage: { input: 0, cached_input: 0, output: 0 }, error: e instanceof Error ? e.message : String(e) };
  }
}
