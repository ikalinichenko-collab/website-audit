import * as fs from "node:fs";
import path from "node:path";
import dotenv from "dotenv";
import type { ExtractedPage, PageZones, RunMeta, Settings, TokenUsage, Zone } from "./types.js";
import type { PageReport, SiteReport, ComplianceLayerResult, GeoLayerResult, SharedVariant } from "./report-types.js";
import {
  layerFingerprint,
  loadGeoCodeConfig,
  loadSeoConfig,
  loadSettings,
} from "./config.js";
import { extractFromHtml, flattenJsonLd, parseJsonLdBlocks } from "./extract.js";
import { httpGet, headOrGetStatus, type FetchResult } from "./fetch.js";
import { collectSitemapUrls } from "./sitemap.js";
import { classifyUrl, filterInScope, OUT_OF_SCOPE, sampleAcrossSubsections, type UrlScope } from "./scope.js";
import { buildZones, jsonLdZone } from "./zones.js";
import { draftZones } from "./draft.js";
import { runSeoChecks } from "./seo.js";
import { seoSiteChecks } from "./seo-site.js";
import { checkTargetKeywordPlacement, geoTypeOf, runGeoCodeChecks } from "./geo-code.js";
import { geoPayload, runGeoLlm } from "./geo-llm.js";
import { compliancePayload, deriveAction, finalizeCompliance, runComplianceLayer, sharedPayload } from "./compliance.js";
import { createOpenAiClient } from "./llm.js";
import { detectSiteWideFingerprints, fingerprintJsonLdNode } from "./schema-fingerprint.js";
import { runSiteBasics } from "./site.js";
import { latestPointerPath, readJson, resolveLatestRunId, runDir, setLatestRun } from "./paths.js";
import { writeRunOutputs } from "./run-output.js";
import { projectRoot, runIdNow, sha256, sleep, urlToSlug } from "./utils.js";

dotenv.config({ path: path.join(projectRoot(), ".env") });

export interface AuditOptions {
  urls: string[];
  limit?: number;
  all?: boolean;
  force?: boolean;
  /** Skip both LLM layers (smoke tests, SEO and GEO code checks only). */
  noLlm?: boolean;
  /** Progress lines (also printed to the console). */
  onLog?: (line: string) => void;
  /** Checked between pages: when true, no new page is started and the finished ones are saved. */
  isCancelled?: () => boolean;
}

const SOURCE_FILES = ["sources/decisions.md", "sources/GoGloby Fact Sheet.md", "sources/GoGloby Glossary.md"];
const SHARED_IDS = ["banner_cta", "modals"];
/** A shared-zone text carried by fewer pages than this is page-specific (many article banners are written per article) and is audited with its page. */
const SHARED_MIN_PAGES = 2;
const ZERO: TokenUsage = { input: 0, cached_input: 0, output: 0 };

function add(a: TokenUsage, b: TokenUsage | null | undefined): TokenUsage {
  if (!b) return a;
  return { input: a.input + b.input, cached_input: a.cached_input + b.cached_input, output: a.output + b.output };
}

function reasoning(settings: Settings, layer: "compliance" | "geo"): string {
  const r = settings.llm.reasoning_effort;
  return typeof r === "string" ? r : (r?.[layer] ?? "");
}

async function pool<T>(items: T[], n: number, fn: (item: T, i: number) => Promise<void>): Promise<void> {
  let next = 0;
  const worker = async (): Promise<void> => {
    for (;;) {
      const i = next++;
      if (i >= items.length) return;
      await fn(items[i]!, i);
    }
  };
  await Promise.all(Array.from({ length: Math.max(1, n) }, worker));
}

function loadSavedSiteWideFingerprints(): Set<string> {
  const latest = latestPointerPath();
  let fpPath = path.join(latest, "site-wide-fingerprints.json");
  if (!fs.existsSync(fpPath)) {
    const id = resolveLatestRunId();
    if (id) fpPath = path.join(runDir(id), "site-wide-fingerprints.json");
  }
  const data = readJson<{ fingerprints: string[] }>(fpPath);
  return new Set(data?.fingerprints ?? []);
}

function previousReport(url: string): PageReport | null {
  const id = resolveLatestRunId();
  if (!id) return null;
  const r = readJson<PageReport>(path.join(runDir(id), "pages", `${urlToSlug(url)}.json`));
  return r?.schema_version === 2 ? r : null;
}

interface Prep {
  url: string;
  fetched: FetchResult;
  page: ExtractedPage;
  zones: PageZones;
  scope: UrlScope;
}

function zoneHash(z: Zone): string {
  return sha256(z.text.replace(/\s+/g, " ").trim());
}

export async function runAudit(options: AuditOptions): Promise<string> {
  const settings = loadSettings();
  const seoCfg = loadSeoConfig();
  const geoCfg = loadGeoCodeConfig();
  const runId = runIdNow();
  const startedAt = new Date().toISOString();
  const outRoot = runDir(runId);
  fs.mkdirSync(path.join(outRoot, "pages"), { recursive: true });
  const client = options.noLlm ? null : createOpenAiClient();
  const concurrency = settings.llm.concurrency ?? 4;
  const log = (line: string): void => {
    console.log(line);
    options.onLog?.(line);
  };
  const cancelled = (): boolean => options.isCancelled?.() ?? false;

  // ---- 1. which URLs --------------------------------------------------------
  let urls = options.urls;
  if (options.all || options.limit) {
    const inScope = filterInScope(await collectSitemapUrls(settings), settings);
    urls = options.all ? inScope : sampleAcrossSubsections(inScope, options.limit ?? 10, settings);
  }
  const multi = urls.length > 1;
  log(`Auditing ${urls.length} URL(s), run ${runId}`);

  // ---- 2. fetch ---------------------------------------------------------------
  const fetchedAll: { url: string; fetched: FetchResult }[] = [];
  for (const url of urls) {
    if (cancelled()) break;
    await sleep(settings.fetch.delay_ms);
    fetchedAll.push({ url, fetched: await httpGet(url, settings) });
    log(`Fetched ${fetchedAll.length}/${urls.length}: ${url.replace(settings.base_url, "") || "/"}`);
  }
  // a sitemap URL that redirects to another URL of the list is a sitemap problem, not a second page
  const requested = new Set(urls.map((u) => u.replace(/\/$/, "")));
  const redirectOnly: { url: string; problem: string }[] = [];
  const fetchedPages = fetchedAll.filter(({ url, fetched }) => {
    const finalNorm = fetched.finalUrl.replace(/\/$/, "");
    if (finalNorm !== url.replace(/\/$/, "") && requested.has(finalNorm)) {
      redirectOnly.push({ url, problem: `redirects to ${fetched.finalUrl}` });
      return false;
    }
    return true;
  });

  // ---- 3. site-wide schema fingerprints ----------------------------------------
  let siteWide = multi ? new Set<string>() : loadSavedSiteWideFingerprints();
  if (multi) {
    const counts = new Map<string, Set<string>>();
    for (const { url, fetched } of fetchedPages) {
      for (const node of flattenJsonLd(parseJsonLdBlocks(fetched.html))) {
        const fp = fingerprintJsonLdNode(node);
        if (!counts.has(fp)) counts.set(fp, new Set());
        counts.get(fp)!.add(url);
      }
    }
    siteWide = detectSiteWideFingerprints(counts, fetchedPages.length, settings.site_wide_schema_share);
    fs.writeFileSync(
      path.join(outRoot, "site-wide-fingerprints.json"),
      JSON.stringify({ fingerprints: [...siteWide] }, null, 2),
    );
  }

  // ---- 4. extract and build zones -------------------------------------------------
  const preps: Prep[] = fetchedPages.map(({ url, fetched }) => {
    const page = extractFromHtml(fetched.html, url, settings, fetched, siteWide);
    const zones = buildZones(fetched.html, fetched.finalUrl, settings, page.page_json_ld);
    const scope = classifyUrl(fetched.finalUrl, settings) ?? classifyUrl(url, settings) ?? OUT_OF_SCOPE;
    return { url, fetched, page, zones, scope };
  });

  // shared zones differ by template (banner CTA) or by page set (forms): each distinct text is one
  // variant, audited once in the site pass and listed with the pages that carry it
  const variants: SharedVariant[] = [];
  const variantZones: Zone[] = [];
  const variantsByPage = new Map<Prep, string[]>();
  for (const id of SHARED_IDS) {
    const groups = new Map<string, { zone: Zone; preps: Prep[] }>();
    for (const p of preps) {
      const z = p.zones.zones.find((x) => x.id === id && x.scope === "shared");
      if (!z || !z.text) continue;
      const h = zoneHash(z);
      const g = groups.get(h) ?? { zone: z, preps: [] };
      g.preps.push(p);
      groups.set(h, g);
    }
    let n = 0;
    for (const [hash, g] of [...groups].sort((x, y) => y[1].preps.length - x[1].preps.length)) {
      if (g.preps.length < SHARED_MIN_PAGES) {
        for (const p of g.preps) {
          const own = p.zones.zones.find((x) => x.id === id && x.scope === "shared");
          if (own) own.scope = "page";
        }
        continue;
      }
      n++;
      const vid = `${id}@${n}`;
      variants.push({ id: vid, zone: id, text_hash: hash, pages: g.preps.map((p) => p.fetched.finalUrl) });
      variantZones.push({ ...g.zone, id: vid });
      for (const p of g.preps) variantsByPage.set(p, [...(variantsByPage.get(p) ?? []), vid]);
    }
  }

  // ---- 5. per-page layers ----------------------------------------------------------
  const linkCache = new Map<string, Promise<{ status: number; finalUrl: string }>>();
  const linkChecker = (u: string): Promise<{ status: number; finalUrl: string }> => {
    if (!linkCache.has(u)) {
      linkCache.set(u, headOrGetStatus(u, settings).catch(() => ({ status: 0, finalUrl: u })));
    }
    return linkCache.get(u)!;
  };
  const complianceFp = layerFingerprint(
    ["prompts/compliance-zones.md", ...SOURCE_FILES],
    [settings.llm.model, reasoning(settings, "compliance"), settings.report_language],
  );
  const geoFp = layerFingerprint(
    ["prompts/geo-llm.md", "prompts/geo-questions.json", ...SOURCE_FILES],
    [settings.llm.model, reasoning(settings, "geo"), settings.report_language],
  );

  const reports: PageReport[] = [];
  let tokens: TokenUsage = ZERO;
  let llmCalls = 0;
  let llmErrors = 0;
  let cachedLayers = 0;
  let done = 0;

  await pool(preps, concurrency, async (prep) => {
    if (cancelled()) return;
    const { page, zones, scope, fetched, url } = prep;
    const prev = options.force ? null : previousReport(url);
    const finalUrl = fetched.finalUrl;

    const seo = await runSeoChecks({
      html: fetched.html,
      requestedUrl: url,
      baseUrl: settings.base_url,
      page,
      zones,
      profile: scope.profile,
      config: seoCfg,
      linkChecker,
    });

    const geoType = geoTypeOf(scope.profile);
    const types = new Set<string>();
    for (const n of flattenJsonLd(page.json_ld)) {
      [n["@type"]].flat().forEach((t) => typeof t === "string" && types.add(t));
    }
    const geoCode = runGeoCodeChecks(zones, geoType, geoCfg, types);

    // compliance (LLM, cached by layer hash)
    const cPayload = compliancePayload(finalUrl, scope.profile, zones);
    const cHash = sha256(complianceFp + JSON.stringify(cPayload));
    // The term list and the severity table are applied on every run (finalizeCompliance), so editing them
    // does not ask the model again; only the prompt, the documents, the model and the page text do.
    let compliance: ComplianceLayerResult;
    if (prev && prev.compliance.hash === cHash && !prev.compliance.error && prev.compliance.llm_problems) {
      const problems = finalizeCompliance(prev.compliance.llm_problems, zones);
      const modelAction = prev.compliance.model_action ?? prev.compliance.action;
      compliance = {
        ...prev.compliance,
        problems,
        model_action: modelAction,
        action: deriveAction(modelAction, problems, zones),
        cached: true,
      };
      cachedLayers++;
    } else if (client) {
      llmCalls++;
      const r = await runComplianceLayer(client, settings, cPayload, zones);
      if (r.error) llmErrors++;
      tokens = add(tokens, r.usage);
      const problems = finalizeCompliance(r.problems, zones);
      compliance = {
        hash: cHash,
        cached: false,
        action: r.error ? null : deriveAction(r.action, problems, zones),
        model_action: r.action,
        summary: r.summary,
        llm_problems: r.problems,
        problems,
        usage: r.usage,
        error: r.error,
      };
    } else {
      compliance = {
        hash: cHash,
        cached: false,
        action: null,
        summary: null,
        llm_problems: [],
        problems: finalizeCompliance([], zones),
        usage: null,
        error: options.noLlm ? "LLM skipped for this run; only the term list was checked" : "OPENAI_API_KEY not set",
      };
    }

    // geo (code checks always live, LLM answers cached)
    const passed = geoCode.filter((c) => c.status === "pass").map((c) => c.id).sort();
    const gHash = sha256(geoFp + geoType + passed.join(",") + JSON.stringify(geoPayload(finalUrl, geoType, zones)));
    let geo: GeoLayerResult;
    if (prev && prev.geo.hash === gHash && !prev.geo.error) {
      const kw = prev.geo.llm.find((a) => a.id === "target_keyword");
      geo = {
        hash: gHash,
        cached: true,
        code: geoCode,
        llm: prev.geo.llm,
        placement: kw && kw.answer === "yes" ? checkTargetKeywordPlacement(zones, kw.value) : null,
        usage: prev.geo.usage,
        error: null,
      };
      cachedLayers++;
    } else if (client) {
      const out = await runGeoLlm(client, settings, finalUrl, geoType, zones, geoCode);
      if (out.usage.input + out.usage.cached_input + out.usage.output > 0) llmCalls++;
      if (out.error) llmErrors++;
      tokens = add(tokens, out.usage);
      geo = { hash: gHash, cached: false, code: geoCode, llm: out.answers, placement: out.placement, usage: out.usage, error: out.error };
    } else {
      geo = { hash: gHash, cached: false, code: geoCode, llm: [], placement: null, usage: null, error: options.noLlm ? "LLM skipped for this run" : "OPENAI_API_KEY not set" };
    }

    const report: PageReport = {
      schema_version: 2,
      url,
      final_url: finalUrl,
      status: fetched.status,
      title: page.title,
      category: scope.category,
      subsection: scope.subsection,
      profile: scope.profile,
      geo_type: geoType,
      template: zones.template,
      checked_at: new Date().toISOString(),
      zones: zones.zones.filter((z) => !z.skipped && z.scope === "page").map((z) => ({ id: z.id, label: z.label, kind: z.kind })),
      zone_warnings: zones.warnings,
      shared_variants: variantsByPage.get(prep) ?? [],
      compliance,
      geo,
      seo: { checks: seo.checks },
    };
    const slug = urlToSlug(url);
    fs.writeFileSync(path.join(outRoot, "pages", `${slug}.json`), JSON.stringify(report, null, 2));
    fs.writeFileSync(path.join(outRoot, "pages", `${slug}.html`), fetched.html);
    fs.writeFileSync(path.join(outRoot, "pages", `${slug}.zones.json`), JSON.stringify(zones, null, 1));
    reports.push(report);
    done++;
    const high = compliance.problems.filter((p) => p.severity === "high").length;
    log(
      `[${done}/${preps.length}] ${finalUrl.replace(settings.base_url, "") || "/"}  compliance ${compliance.problems.length} (${high} high)${compliance.cached ? " cached" : ""}  geo ${geo.llm.length}${geo.cached ? " cached" : ""}  seo ${seo.checks.filter((c) => c.status === "fail").length} fail`,
    );
  });

  // ---- 6. site pass -------------------------------------------------------------------
  const basics = await runSiteBasics(settings, geoCfg);

  let sharedCompliance: ComplianceLayerResult | null = null;
  if (variantZones.length && client) {
    const zonesObj: PageZones = { template: "unknown", zones: variantZones, warnings: [] };
    llmCalls++;
    const r = await runComplianceLayer(client, settings, sharedPayload(zonesObj), zonesObj);
    if (r.error) llmErrors++;
    tokens = add(tokens, r.usage);
    sharedCompliance = { hash: "", cached: false, action: r.action, summary: r.summary, llm_problems: r.problems, problems: finalizeCompliance(r.problems, zonesObj, variantZones), usage: r.usage, error: r.error };
  }

  let siteSchema: ComplianceLayerResult | null = null;
  if (multi && siteWide.size && client) {
    const nodes: Record<string, unknown>[] = [];
    const seen = new Set<string>();
    for (const p of preps) {
      for (const node of flattenJsonLd(p.page.json_ld)) {
        const fp = fingerprintJsonLdNode(node);
        if (siteWide.has(fp) && !seen.has(fp)) {
          seen.add(fp);
          nodes.push(node);
        }
      }
    }
    const z = jsonLdZone(nodes);
    if (z) {
      const zonesObj: PageZones = { template: "unknown", zones: [z], warnings: [] };
      llmCalls++;
      const r = await runComplianceLayer(
        client,
        settings,
        { url: "site-wide", page_type: "site_schema", zones: [{ id: z.id, label: z.label, text: z.text }] },
        zonesObj,
      );
      if (r.error) llmErrors++;
      tokens = add(tokens, r.usage);
      siteSchema = { hash: "", cached: false, action: r.action, summary: r.summary, llm_problems: r.problems, problems: finalizeCompliance(r.problems, zonesObj, [z]), usage: r.usage, error: r.error };
    }
  }

  const seoSite = seoSiteChecks(
    reports,
    preps.map((p) => ({ url: p.fetched.finalUrl, title: p.page.title, meta: p.page.meta_description, h1: p.page.h1[0] ?? "" })),
  );
  seoSite.sitemap_hygiene.push(...redirectOnly);

  const scopeCounts: Record<string, number> = {};
  for (const r of reports) {
    const k = `${r.category}/${r.subsection}`;
    scopeCounts[k] = (scopeCounts[k] ?? 0) + 1;
  }

  const site: SiteReport = {
    schema_version: 2,
    run_id: runId,
    basics,
    scope_counts: scopeCounts,
    shared: { variants, compliance: sharedCompliance },
    site_schema: siteSchema,
    seo: seoSite,
  };
  fs.writeFileSync(path.join(outRoot, "site.json"), JSON.stringify(site, null, 2));

  const p = settings.llm.price_per_million_tokens;
  const cost =
    p.input == null && p.cached_input == null && p.output == null
      ? null
      : (tokens.input * (p.input ?? 0) + tokens.cached_input * (p.cached_input ?? 0) + tokens.output * (p.output ?? 0)) / 1_000_000;
  const meta: RunMeta = {
    run_id: runId,
    started_at: startedAt,
    ended_at: new Date().toISOString(),
    pages_checked: reports.length,
    pages_skipped: cachedLayers,
    llm_calls: llmCalls,
    llm_errors: llmErrors,
    tokens,
    cost_usd: cost,
  };
  fs.writeFileSync(path.join(outRoot, "run.json"), JSON.stringify(meta, null, 2));
  writeRunOutputs(outRoot, settings);
  setLatestRun(runId);
  log(
    `${cancelled() ? "Stopped" : "Done"}. ${reports.length} pages, ${llmCalls} LLM calls (${llmErrors} errors), ${cachedLayers} cached layers. Tokens in ${tokens.input}, cached ${tokens.cached_input}, out ${tokens.output}`,
  );
  return runId;
}

const DRAFT_GEO_TYPE: Record<string, string> = {
  homepage: "home",
  home: "home",
  service: "service",
  podcast: "podcast",
  legal: "legal",
  company: "company",
};

/** Audit a local draft (markdown, text or HTML): Compliance and GEO only, no SEO and no site pass. */
export async function runAuditDraft(file: string, type = "post"): Promise<string> {
  const settings = loadSettings();
  const geoCfg = loadGeoCodeConfig();
  const runId = runIdNow();
  const startedAt = new Date().toISOString();
  const outRoot = runDir(runId);
  fs.mkdirSync(path.join(outRoot, "pages"), { recursive: true });
  const client = createOpenAiClient();

  const abs = path.resolve(file);
  const name = path.basename(abs);
  const zones = draftZones(fs.readFileSync(abs, "utf8"), path.extname(abs).toLowerCase(), settings);
  const geoType = geoTypeOf(DRAFT_GEO_TYPE[type] ?? "article");
  const url = `draft://${name}`;
  const title = zones.zones.find((z) => z.kind === "h1")?.text || name;

  const geoCode = runGeoCodeChecks(zones, geoType, geoCfg, new Set());
  let tokens: TokenUsage = ZERO;
  let calls = 0;
  let errors = 0;

  let compliance: ComplianceLayerResult = { hash: "", cached: false, action: null, summary: null, llm_problems: [], problems: finalizeCompliance([], zones), usage: null, error: "OPENAI_API_KEY not set" };
  let geo: GeoLayerResult = { hash: "", cached: false, code: geoCode, llm: [], placement: null, usage: null, error: "OPENAI_API_KEY not set" };
  if (client) {
    calls++;
    const r = await runComplianceLayer(client, settings, compliancePayload(url, type, zones), zones);
    if (r.error) errors++;
    tokens = add(tokens, r.usage);
    const dProblems = finalizeCompliance(r.problems, zones);
    compliance = { hash: "", cached: false, action: r.error ? null : deriveAction(r.action, dProblems, zones), model_action: r.action, summary: r.summary, llm_problems: r.problems, problems: dProblems, usage: r.usage, error: r.error };
    const g = await runGeoLlm(client, settings, url, geoType, zones, geoCode);
    if (g.usage.input + g.usage.cached_input + g.usage.output > 0) calls++;
    if (g.error) errors++;
    tokens = add(tokens, g.usage);
    geo = { hash: "", cached: false, code: geoCode, llm: g.answers, placement: g.placement, usage: g.usage, error: g.error };
  }

  const report: PageReport = {
    schema_version: 2,
    url,
    final_url: url,
    status: null,
    title,
    category: "Drafts",
    subsection: "Drafts",
    profile: type,
    geo_type: geoType,
    template: "draft",
    checked_at: new Date().toISOString(),
    zones: zones.zones.map((z) => ({ id: z.id, label: z.label, kind: z.kind })),
    zone_warnings: zones.warnings,
    shared_variants: [],
    compliance,
    geo,
    seo: { checks: [] },
  };
  fs.writeFileSync(path.join(outRoot, "pages", `draft_${name.replace(/[^a-z0-9.-]+/gi, "_")}.json`), JSON.stringify(report, null, 2));
  const meta: RunMeta = {
    run_id: runId,
    started_at: startedAt,
    ended_at: new Date().toISOString(),
    pages_checked: 1,
    pages_skipped: 0,
    llm_calls: calls,
    llm_errors: errors,
    tokens,
    cost_usd: null,
  };
  fs.writeFileSync(path.join(outRoot, "run.json"), JSON.stringify(meta, null, 2));
  writeRunOutputs(outRoot, settings);
  setLatestRun(runId);
  return runId;
}
