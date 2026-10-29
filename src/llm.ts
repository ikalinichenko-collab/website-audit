import OpenAI from "openai";
import type { AuditConfig } from "./types.js";
import type { CheckItem, CheckResult, PageData } from "./types.js";
import { ITEMS_CHECK_IDS, finalizeCheckWithItems } from "./checks/items.js";
import { SEVERITIES } from "./checklist-meta.js";
import { sourcesPrefixForLlm } from "./config.js";
import { makeResult } from "./checks/result-factory.js";
import type { B3PersonEvidence, TermOccurrence } from "./checks/evidence.js";
import type { NamedCandidate } from "./checks/candidates.js";
import {
  mergeLlmItemsWithCoverage,
  missingCandidates,
} from "./checks/candidate-coverage.js";
import { logDetail } from "./log.js";
import type { MainContentImage } from "./types.js";
import { formatChecksForPrompt } from "./checklist-rules.js";
import { LLM_GROUPS } from "./llm-groups.js";
import { VALUE_CHECK_IDS, applyValueCheckResult } from "./value-checks.js";

const locationEnum = [
  "title",
  "meta",
  "h1",
  "h2",
  "first_paragraph",
  "body",
  "schema",
  "link_text",
  "image_alt",
] as const;

const itemSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    status: { type: "string", enum: ["pass", "fail", "warn", "na", "skip"] },
    evidence: { type: "array", items: { type: "string" } },
    locations: { type: "array", items: { type: "string", enum: [...locationEnum] } },
    count: { type: ["integer", "null"] },
    fix: { type: "string" },
  },
  required: ["name", "status", "evidence", "locations", "count", "fix"],
  additionalProperties: false,
};

const findingBase = {
  type: "object",
  properties: {
    status: { type: "string", enum: ["pass", "fail", "warn", "na", "skip"] },
    evidence: { type: "array", items: { type: "string" } },
    locations: {
      type: "array",
      items: { type: "string", enum: [...locationEnum] },
    },
    count: { type: ["integer", "null"] },
    fix: { type: "string" },
    source_ref: { type: "string" },
  },
  required: ["status", "evidence", "locations", "count", "fix", "source_ref"],
  additionalProperties: false,
};

const findingWithItems = {
  type: "object",
  properties: {
    ...findingBase.properties,
    items: { type: "array", items: itemSchema },
  },
  required: [...findingBase.required, "items"],
  additionalProperties: false,
};

const findingWithValue = {
  type: "object",
  properties: {
    value: { type: "string" },
    evidence: { type: "array", items: { type: "string" } },
    locations: {
      type: "array",
      items: { type: "string", enum: [...locationEnum] },
    },
    count: { type: ["integer", "null"] },
    fix: { type: "string" },
    source_ref: { type: "string" },
  },
  required: ["value", "evidence", "locations", "count", "fix", "source_ref"],
  additionalProperties: false,
};

function schemaForCheck(id: string): Record<string, unknown> {
  if (VALUE_CHECK_IDS.has(id)) return findingWithValue;
  if (ITEMS_CHECK_IDS.has(id)) return findingWithItems;
  return findingBase;
}

function buildResponseSchema(activeIds: readonly string[]): Record<string, unknown> {
  const checkProps: Record<string, unknown> = {};
  for (const id of activeIds) {
    checkProps[id] = schemaForCheck(id);
  }
  return {
    type: "object",
    properties: checkProps,
    required: [...activeIds],
    additionalProperties: false,
  };
}

const SYSTEM_PROMPT = `You are a GoGloby website content auditor.

Source priority (earlier overrides later):
1. decisions.md
2. GoGloby Fact Sheet
3. GoGloby Glossary

Rules:
- Cite a short quote from the page in evidence for every judgement.
- Cite the source section in source_ref.
- Never write replacement marketing copy; only describe what to change in fix.
- Fill every check in the output schema for this call only.
- A finding belongs to the check whose rule it breaks; do not repeat the same problem under other checks in this or other calls.
- For checks B2, B3, C2, D1, D2, D3, D4: output a complete items array (never truncate). One item per object as defined in the checklist. Each item: up to 2 evidence quotes. Set the check status to the worst item status.
- For code+llm checks, use the supplied code evidence; do not invent occurrences.
- B3: never use status na when b3_person_evidence is non-empty; one item per Person. Use jobTitle_matches_approved_source from code; do not fail an item solely because of jobTitle when matches is true. Fail for description, knowsAbout, sameAs, or banned terms in Person fields.
- D2: one item per Fact Sheet client company shown on the page with any metric (revenue, employees, etc.); report conflicts and unverified figures. Include the client name in each item name and evidence.
- D3: for EVERY d3_candidates entry, return exactly one item named with candidate_id. Put verdict in evidence[0]: fact_sheet_client, not_in_fact_sheet (item status fail), or not_a_client (item status pass). Use in_fact_sheet hint from code only as a hint; you decide the verdict. Logo-wall companies not in the Fact Sheet and not under External recognition are not_in_fact_sheet.
- D2: for EVERY d2_candidates entry, one item named with candidate_id; judge figures vs Fact Sheet (conflict=fail, unverified=warn, ok=pass).
- C2: for EVERY c2_candidates entry, one item named with candidate_id; fail only if the use breaks Glossary §7.
- B2: one item per Organization node and per field mismatch; include slogan, description, legalName, name in item names and evidence.
- Value checks (E1, F6, G1, H1, H2, H3): set "value" to the label from the rule table; use evidence for supporting quotes. Do not set status on value checks — code derives status.
- E1 value: recruiting, staffing, both, none, or contradicts.
- F6 value: buyer_ready, informational, or not_targeted.
- G1 value: a Glossary §6 term or none.
- H1 value: action token (keep, fix, rewrite, noindex, needs_decision, merge_into:…, redirect_to:…).
- H2 value: high, medium, or low.
- H3 value: semicolon-separated reason bullets in the value field; evidence may repeat key points.`;

let cachedPrefix: string | null = null;

function getCachedPrefix(): string {
  if (!cachedPrefix) cachedPrefix = sourcesPrefixForLlm();
  return cachedPrefix;
}

export interface LlmInput {
  page: PageData;
  codeResults: Record<string, CheckResult>;
  contextTerms: TermOccurrence[];
  organizations: Record<string, unknown>[];
  persons: Record<string, unknown>[];
  b3PersonEvidence: B3PersonEvidence[];
  mainContentImages: MainContentImage[];
  c2Candidates: NamedCandidate[];
  d2Candidates: NamedCandidate[];
  d3Candidates: NamedCandidate[];
  activeLlmCheckIds: string[];
  g3Context: { title: string; h1: string[]; targetKeyword: string | null };
}

const COVERAGE: Partial<Record<string, keyof LlmInput>> = {
  C2: "c2Candidates",
  D2: "d2Candidates",
  D3: "d3Candidates",
};

function isIncompleteResponse(text: string | null | undefined, finishReason?: string): boolean {
  if (!text?.trim()) return true;
  if (finishReason === "length") return true;
  return false;
}

function slimResultsForPrior(results: Record<string, CheckResult>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [id, r] of Object.entries(results)) {
    out[id] = {
      status: r.status,
      value: r.value,
      evidence: r.evidence?.slice(0, 2),
      items: r.items?.map((i) => ({
        name: i.name,
        status: i.status,
        evidence: i.evidence?.slice(0, 2),
      })),
    };
  }
  return out;
}

async function callLlm(
  client: OpenAI,
  config: AuditConfig,
  messages: OpenAI.Chat.ChatCompletionMessageParam[],
  activeIds: string[],
): Promise<{ parsed: Record<string, Partial<CheckResult> & { items?: CheckItem[]; value?: string }>; incomplete: boolean; error?: string }> {
  if (!activeIds.length) return { parsed: {}, incomplete: false };
  try {
    const completion = await client.chat.completions.create({
      model: config.llm.model,
      max_completion_tokens: config.llm.max_output_tokens,
      messages,
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "page_audit_checks",
          strict: true,
          schema: buildResponseSchema(activeIds),
        },
      },
      ...(config.llm.reasoning_effort
        ? { reasoning_effort: config.llm.reasoning_effort as "low" }
        : {}),
    } as OpenAI.Chat.ChatCompletionCreateParamsNonStreaming);

    const text = completion.choices[0]?.message?.content;
    const finishReason = completion.choices[0]?.finish_reason ?? undefined;
    if (isIncompleteResponse(text, finishReason ?? undefined)) {
      return { parsed: {}, incomplete: true, error: "Empty or truncated LLM response" };
    }
    const parsed = JSON.parse(text!) as Record<
      string,
      Partial<CheckResult> & { items?: CheckItem[]; value?: string }
    >;
    return { parsed, incomplete: false };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return { parsed: {}, incomplete: true, error: msg };
  }
}

function toCheckResult(
  checkId: string,
  pageType: string,
  raw: Partial<CheckResult> & { items?: CheckItem[]; value?: string },
): CheckResult {
  if (VALUE_CHECK_IDS.has(checkId)) {
    return applyValueCheckResult(checkId, pageType, raw);
  }
  const base = makeResult(checkId, raw.status ?? "warn", {
    evidence: raw.evidence ?? [],
    locations: (raw.locations ?? []) as CheckResult["locations"],
    count: raw.count ?? null,
    fix: raw.fix ?? "",
    source_ref: raw.source_ref ?? "",
    severity: SEVERITIES[checkId],
    items: raw.items,
  });
  return ITEMS_CHECK_IDS.has(checkId) && base.items?.length
    ? finalizeCheckWithItems(base)
    : base;
}

function buildPagePayload(input: LlmInput, prior?: Record<string, CheckResult>) {
  return {
    page: {
      url: input.page.url,
      page_type: input.page.page_type,
      title: input.page.title,
      meta_description: input.page.meta_description,
      h1: input.page.h1,
      body: input.page.body,
      first_paragraph: input.page.first_paragraph,
      main_content_images: input.mainContentImages,
    },
    code_check_results: input.codeResults,
    context_term_occurrences: input.contextTerms,
    c2_candidates: input.c2Candidates,
    d2_candidates: input.d2Candidates,
    d3_candidates: input.d3Candidates,
    organization_nodes: input.organizations,
    person_nodes: input.persons,
    b3_person_evidence: input.b3PersonEvidence,
    trap_term_context: input.g3Context,
    ...(prior ? { prior_llm_check_results: slimResultsForPrior(prior) } : {}),
  };
}

function messagesForGroup(
  groupIndex: number,
  groupActiveIds: string[],
  input: LlmInput,
  prior?: Record<string, CheckResult>,
): OpenAI.Chat.ChatCompletionMessageParam[] {
  const checksBlock = formatChecksForPrompt(groupActiveIds);
  const msgs: OpenAI.Chat.ChatCompletionMessageParam[] = [
    { role: "system", content: SYSTEM_PROMPT },
    { role: "user", content: getCachedPrefix() },
    {
      role: "user",
      content: `# Checks for LLM call ${groupIndex + 1}\n\n${checksBlock}`,
    },
    {
      role: "user",
      content: `# Page audit data\n\n${JSON.stringify(buildPagePayload(input, prior))}`,
    },
  ];
  return msgs;
}

async function runOneGroup(
  client: OpenAI,
  config: AuditConfig,
  groupIndex: number,
  groupActiveIds: string[],
  input: LlmInput,
  prior: Record<string, CheckResult> | undefined,
  out: Record<string, CheckResult>,
): Promise<string | null> {
  if (!groupActiveIds.length) return null;

  let messages = messagesForGroup(groupIndex, groupActiveIds, input, prior);
  const maxRetries = config.llm.retry_on_incomplete ?? 1;
  let lastError: string | null = null;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    logDetail(
      `LLM call ${groupIndex + 1} attempt ${attempt + 1}/${maxRetries + 1} (${groupActiveIds.length} checks)`,
    );
    const res = await callLlm(client, config, messages, groupActiveIds);
    if (!res.incomplete) {
      for (const id of groupActiveIds) {
        out[id] = toCheckResult(id, input.page.page_type, res.parsed[id] ?? {});
      }
      lastError = null;
      break;
    }
    lastError = res.error ?? "Incomplete LLM response";
    if (attempt < maxRetries) {
      messages = [
        ...messages,
        {
          role: "user",
          content: `Previous response was incomplete (${lastError}). Return valid JSON for all checks: ${groupActiveIds.join(", ")}.`,
        },
      ];
    }
  }

  if (lastError) {
    for (const id of groupActiveIds) {
      out[id] = makeResult(id, "skip", {
        evidence: [lastError.slice(0, 120)],
        source_ref: "llm",
      });
    }
    return lastError;
  }

  const coverageRetries = 1;
  for (let cr = 0; cr <= coverageRetries; cr++) {
    const missingByCheck: { id: string; candidates: NamedCandidate[] }[] = [];
    for (const checkId of ["C2", "D2", "D3"] as const) {
      if (!groupActiveIds.includes(checkId)) continue;
      const key = COVERAGE[checkId]!;
      const candidates = input[key] as NamedCandidate[];
      if (!candidates?.length) continue;
      const miss = missingCandidates(out[checkId]!, candidates);
      if (miss.length) missingByCheck.push({ id: checkId, candidates: miss });
    }
    if (!missingByCheck.length) break;
    if (cr < coverageRetries) {
      const note = missingByCheck
        .map(
          (m) =>
            `${m.id}: missing items for ${m.candidates.map((c) => c.candidate_id).join(", ")}`,
        )
        .join("; ");
      messages = [
        ...messages,
        {
          role: "user",
          content: `# Missing candidate items\n\n${note}\n\nReturn ONLY these checks with complete items arrays.`,
        },
      ];
      const subset = missingByCheck.map((m) => m.id);
      const res = await callLlm(client, config, messages, subset);
      if (!res.incomplete) {
        for (const id of subset) {
          if (res.parsed[id]) {
            out[id] = toCheckResult(id, input.page.page_type, res.parsed[id]!);
          }
        }
      }
    }
  }

  for (const checkId of ["C2", "D2", "D3"] as const) {
    if (!groupActiveIds.includes(checkId)) continue;
    const key = COVERAGE[checkId]!;
    const candidates = input[key] as NamedCandidate[];
    if (candidates?.length && out[checkId]) {
      out[checkId] = mergeLlmItemsWithCoverage(checkId, out[checkId]!, candidates);
    }
  }

  return null;
}

export async function runLlmChecks(
  input: LlmInput,
  config: AuditConfig,
): Promise<Record<string, CheckResult>> {
  const activeSet = new Set(input.activeLlmCheckIds);
  const skipAll = (reason: string): Record<string, CheckResult> => {
    const out: Record<string, CheckResult> = {};
    for (const id of input.activeLlmCheckIds) {
      out[id] = makeResult(id, "skip", {
        evidence: [reason.slice(0, 120)],
        source_ref: "llm",
      });
    }
    return out;
  };

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return skipAll("OPENAI_API_KEY not set");
  if (!input.activeLlmCheckIds.length) return {};

  const client = new OpenAI({ apiKey });
  const out: Record<string, CheckResult> = {};
  let prior: Record<string, CheckResult> = {};

  for (let gi = 0; gi < LLM_GROUPS.length; gi++) {
    const group = LLM_GROUPS[gi]!;
    const groupActiveIds = group.filter((id) => activeSet.has(id));
    const priorForCall = gi === 2 ? prior : undefined;
    const err = await runOneGroup(
      client,
      config,
      gi,
      groupActiveIds,
      input,
      priorForCall,
      out,
    );
    prior = { ...prior, ...Object.fromEntries(groupActiveIds.map((id) => [id, out[id]!])) };
    if (err && groupActiveIds.length) {
      logDetail(`LLM call ${gi + 1} failed: ${err}`);
    }
  }

  return out;
}

const s6ItemSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    status: { type: "string", enum: ["pass", "fail", "warn", "na", "skip"] },
    evidence: { type: "array", items: { type: "string" } },
    locations: { type: "array", items: { type: "string", enum: [...locationEnum] } },
    count: { type: ["integer", "null"] },
    fix: { type: "string" },
  },
  required: ["name", "status", "evidence", "locations", "count", "fix"],
  additionalProperties: false,
};

export async function runS6SchemaJudgement(
  config: AuditConfig,
  input: {
    nodes: Array<{ type: string; name: string; page_count: number; node: Record<string, unknown> }>;
    b3PersonEvidence: B3PersonEvidence[];
    codeProblemNames: string[];
  },
): Promise<CheckItem[]> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return [];

  const client = new OpenAI({ apiKey });
  const rules = formatChecksForPrompt(["S6", "B2", "B3"]);
  const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
    { role: "system", content: `${SYSTEM_PROMPT}\n\nFor S6 return only problems as items. Do not repeat problems already reported by code (same node, field, and issue). Item name format: "{type}: {name} — {field}". evidence[0] = current value; evidence[1] = expected value or rule.` },
    { role: "user", content: getCachedPrefix() },
    { role: "user", content: `# Check rules\n\n${rules}` },
    {
      role: "user",
      content: `# Site-wide JSON-LD nodes\n\n${JSON.stringify({
        site_wide_nodes: input.nodes,
        b3_person_evidence: input.b3PersonEvidence,
        code_problems_already_reported: input.codeProblemNames,
      })}`,
    },
  ];

  try {
    const completion = await client.chat.completions.create({
      model: config.llm.model,
      max_completion_tokens: config.llm.max_output_tokens,
      messages,
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "s6_site_wide_schema",
          strict: true,
          schema: {
            type: "object",
            properties: { items: { type: "array", items: s6ItemSchema } },
            required: ["items"],
            additionalProperties: false,
          },
        },
      },
      ...(config.llm.reasoning_effort
        ? { reasoning_effort: config.llm.reasoning_effort as "low" }
        : {}),
    } as OpenAI.Chat.ChatCompletionCreateParamsNonStreaming);

    const text = completion.choices[0]?.message?.content;
    if (!text?.trim()) return [];
    const parsed = JSON.parse(text) as { items?: CheckItem[] };
    return (parsed.items ?? []).filter((i) => i.status !== "pass");
  } catch {
    return [];
  }
}

export function extractG1(llmResults: Record<string, CheckResult>): string | null {
  const v = llmResults.G1?.value?.trim();
  if (v && !/^none$/i.test(v)) return v.replace(/^target:\s*/i, "").trim();
  const ev = llmResults.G1?.evidence ?? [];
  if (!ev.length) return null;
  const first = ev[0]!.trim();
  if (/^none$/i.test(first)) return null;
  return first.replace(/^target:\s*/i, "").trim();
}

const ACTION_RE =
  /^(keep|fix|rewrite|noindex|needs_decision|merge_into:.+|redirect_to:.+)$/i;

function pickAction(h1: CheckResult | undefined): string {
  const fromValue = h1?.value?.trim();
  if (fromValue && ACTION_RE.test(fromValue)) return fromValue.toLowerCase().startsWith("merge") || fromValue.toLowerCase().startsWith("redirect") ? fromValue : fromValue.toLowerCase();
  const candidates = [h1?.evidence[0], h1?.fix, ...(h1?.evidence ?? [])].filter(
    Boolean,
  ) as string[];
  for (const c of candidates) {
    const t = c.trim().split(/\s/)[0]!;
    const full = c.trim();
    if (ACTION_RE.test(full)) return full.toLowerCase().startsWith("merge") || full.toLowerCase().startsWith("redirect") ? full : full.toLowerCase();
    if (ACTION_RE.test(t)) return t.toLowerCase();
    if (c.includes("rewrite")) return "rewrite";
    if (c.includes("needs_decision")) return "needs_decision";
  }
  return "needs_decision";
}

function pickPriority(h2: CheckResult | undefined): string {
  const fromValue = h2?.value?.trim().toLowerCase();
  if (fromValue && /^(high|medium|low)$/.test(fromValue)) return fromValue;
  for (const c of [h2?.evidence[0], h2?.fix, h2?.value, ...(h2?.evidence ?? [])]) {
    if (!c) continue;
    const m = c.match(/\b(high|medium|low)\b/i);
    if (m) return m[1]!.toLowerCase();
  }
  return "medium";
}

export function buildRecommendation(
  llmResults: Record<string, CheckResult>,
): { action: string; priority: string; reasons: string[] } {
  const h3 = llmResults.H3;
  let reasons = h3?.evidence?.slice(0, 5) ?? [];
  if (h3?.value) {
    reasons = h3.value
      .split(/[;\n]/)
      .map((s) => s.trim())
      .filter(Boolean)
      .slice(0, 5);
  }
  return {
    action: pickAction(llmResults.H1),
    priority: pickPriority(llmResults.H2),
    reasons,
  };
}
