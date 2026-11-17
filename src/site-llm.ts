import type { PageZones, TokenUsage, Zone } from "./types.js";
import type { ComplianceLayerResult, SharedVariant, SiteReport } from "./report-types.js";
import { layerFingerprint, reasoningEffort, settingsForModel, SOURCE_FILES, usageCost } from "./config.js";
import { db } from "./db.js";
import { finalizeCompliance, runComplianceLayer, sharedPayload } from "./compliance.js";
import { createOpenAiClient } from "./llm.js";
import { jsonLdZone } from "./zones.js";
import type { SiteSources } from "./site-sources.js";
import { sha256 } from "./utils.js";

export interface SiteLlmOptions {
  model?: string;
  onLog?: (line: string) => void;
  isCancelled?: () => boolean;
}

export interface SiteLlmResult {
  calls: number;
  cached: number;
  errors: number;
  usage: TokenUsage;
  cost_usd: number;
}

const add = (a: TokenUsage, b: TokenUsage | null | undefined): TokenUsage =>
  b ? { input: a.input + b.input, cached_input: a.cached_input + b.cached_input, output: a.output + b.output } : a;

/** The same check made earlier (any snapshot): the stored answer is reused when the payload, prompt, documents and model are the same. */
async function cachedResult(where: "shared" | "schema", hash: string): Promise<ComplianceLayerResult | null> {
  const col = where === "shared" ? "site->'shared'->'compliance'" : "site->'site_schema'";
  const r = await db().query<{ c: ComplianceLayerResult }>(
    `SELECT ${col} AS c FROM runs WHERE kind = 'site' AND ${col}->>'hash' = $1 AND COALESCE(${col}->>'error', '') = '' ORDER BY started_at DESC LIMIT 1`,
    [hash],
  );
  return r.rows[0]?.c ?? null;
}

/** The zone of a shared variant as the snapshot stored it (with its parts), under the variant's id. */
async function variantZone(runId: string, v: SharedVariant): Promise<Zone | null> {
  const r = await db().query<{ zones: { zones: Zone[] } }>(
    "SELECT zones FROM pages WHERE run_id = $1 AND (report->>'final_url' = $2 OR url = $2) LIMIT 1",
    [runId, v.pages[0]],
  );
  const z = r.rows[0]?.zones.zones.find((x) => x.id === v.zone);
  return z ? { ...z, id: v.id } : null;
}

/**
 * Checks the texts shared by many pages (banner CTA and form variants, site-wide JSON-LD) against the company documents,
 * one model call for each group, and stores the answer in the snapshot. The answer is reused while nothing it depends on changed.
 */
export async function runSiteLlm(runId: string, options: SiteLlmOptions = {}): Promise<SiteLlmResult> {
  const { settings, model } = settingsForModel(options.model);
  const log = (line: string): void => {
    console.log(line);
    options.onLog?.(line);
  };
  const row = (
    await db().query<{ kind: string; status: string; site: SiteReport | null; site_sources: SiteSources | null; meta: Record<string, unknown> | null }>(
      "SELECT kind, status, site, site_sources, meta FROM runs WHERE id = $1",
      [runId],
    )
  ).rows[0];
  if (!row) throw new Error(`No run ${runId}`);
  if (row.kind !== "site" || !row.site) throw new Error("This run is not a site snapshot");
  if (row.meta?.pruned_at) throw new Error("The stored pages of this snapshot were removed to save space. Ask the model on a newer snapshot.");
  const client = createOpenAiClient();
  if (!client) throw new Error("OPENAI_API_KEY not set");

  const site = row.site;
  const fingerprint = layerFingerprint(["prompts/compliance-zones.md", ...SOURCE_FILES], [settings.llm.model, reasoningEffort(settings, "compliance"), settings.report_language]);
  const out: SiteLlmResult = { calls: 0, cached: 0, errors: 0, usage: { input: 0, cached_input: 0, output: 0 }, cost_usd: 0 };

  const check = async (where: "shared" | "schema", payload: Record<string, unknown>, zones: PageZones, only: Zone[]): Promise<ComplianceLayerResult> => {
    const hash = sha256(fingerprint + JSON.stringify(payload));
    const own = where === "shared" ? site.shared.compliance : site.site_schema;
    const earlier = own && own.hash === hash && !own.error ? own : await cachedResult(where, hash);
    if (earlier?.llm_problems) {
      out.cached++;
      return { ...earlier, hash, cached: true, problems: finalizeCompliance(earlier.llm_problems, zones, only) };
    }
    out.calls++;
    const r = await runComplianceLayer(client, settings, payload, zones);
    if (r.error) out.errors++;
    out.usage = add(out.usage, r.usage);
    return { hash, cached: false, action: r.action, summary: r.summary, llm_problems: r.problems, problems: finalizeCompliance(r.problems, zones, only), usage: r.usage, error: r.error };
  };

  const variantZones: Zone[] = [];
  for (const v of site.shared.variants) {
    const z = await variantZone(runId, v);
    if (z) variantZones.push(z);
  }
  if (variantZones.length && !options.isCancelled?.()) {
    const zones: PageZones = { template: "unknown", zones: variantZones, warnings: [] };
    site.shared.compliance = await check("shared", sharedPayload(zones), zones, variantZones);
    log(`Shared zones (${variantZones.length} variants): ${site.shared.compliance.cached ? "answer reused" : "asked the model"}${site.shared.compliance.error ? `, error: ${site.shared.compliance.error}` : ""}`);
  } else if (!variantZones.length) {
    log("No shared zone variants in this snapshot");
  }

  const schemaZone = jsonLdZone((row.site_sources?.schema_nodes ?? []).map((n) => n.json));
  if (schemaZone && !options.isCancelled?.()) {
    const zones: PageZones = { template: "unknown", zones: [schemaZone], warnings: [] };
    const payload = { url: "site-wide", page_type: "site_schema", zones: [{ id: schemaZone.id, label: schemaZone.label, text: schemaZone.text }] };
    site.site_schema = await check("schema", payload, zones, [schemaZone]);
    log(`Site-wide JSON-LD: ${site.site_schema.cached ? "answer reused" : "asked the model"}${site.site_schema.error ? `, error: ${site.site_schema.error}` : ""}`);
  } else if (!schemaZone) {
    log("No site-wide JSON-LD nodes in this snapshot");
  }

  out.cost_usd = usageCost(out.usage, model);
  const meta = row.meta as Record<string, unknown> | null;
  const tokens = (meta?.tokens as TokenUsage | undefined) ?? { input: 0, cached_input: 0, output: 0 };
  const newMeta = meta
    ? {
        ...meta,
        tokens: add(tokens, out.usage),
        llm_calls: Number(meta.llm_calls ?? 0) + out.calls,
        llm_errors: Number(meta.llm_errors ?? 0) + out.errors,
        cost_usd: Number(meta.cost_usd ?? 0) + out.cost_usd,
        site_llm: { model: model.id, at: new Date().toISOString() },
      }
    : null;
  await db().query("UPDATE runs SET site = $2, meta = COALESCE($3::jsonb, meta) WHERE id = $1", [runId, JSON.stringify(site), newMeta ? JSON.stringify(newMeta) : null]);
  log(`Done. ${out.calls} model calls (${out.errors} errors), ${out.cached} answers reused. Tokens in ${out.usage.input}, cached ${out.usage.cached_input}, out ${out.usage.output}. Cost $${out.cost_usd.toFixed(4)} (${model.id})`);
  return out;
}
