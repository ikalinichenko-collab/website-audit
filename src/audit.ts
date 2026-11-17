import path from "node:path";
import dotenv from "dotenv";
import { ALL_LAYERS, type ExtractedPage, type Layers, type PageZones, type RunMeta, type TokenUsage, type Zone } from "./types.js";
import type { PageReport, SiteReport, ComplianceLayerResult, GeoLayerResult, SeoLayerResult, SharedVariant, SitemapRow } from "./report-types.js";
import {
  reasoningEffort as reasoning,
  settingsForModel,
  SOURCE_FILES,
  usageCost,
  layerFingerprint,
  loadGeoCodeConfig,
  loadSeoConfig,
} from "./config.js";
import { extractFromHtml, flattenJsonLd, parseJsonLdBlocks } from "./extract.js";
import { httpGet, headOrGetStatus, type FetchResult } from "./fetch.js";
import { collectSitemapEntries, collectSitemapUrls, shouldExcludeUrl } from "./sitemap.js";
import { classifyUrl, filterBySubsections, filterInScope, OUT_OF_SCOPE, sampleAcrossSubsections, type UrlScope } from "./scope.js";
import { buildZones } from "./zones.js";
import { runSeoChecks } from "./seo.js";
import { seoSiteChecks } from "./seo-site.js";
import { graphUrl, listingLinks, mainContentLinks, nextListingPage, orphanPages } from "./links.js";
import { geoTypeOf, runGeoCodeChecks, withSeverity } from "./geo-code.js";
import { runGeoLlm } from "./geo-llm.js";
import { compliancePayload, deriveAction, finalizeCompliance, runComplianceLayer } from "./compliance.js";
import { createOpenAiClient } from "./llm.js";
import { detectSiteWideFingerprints, fingerprintJsonLdNode } from "./schema-fingerprint.js";
import { runSiteBasics } from "./site.js";
import { runSiteTech } from "./site-tech.js";
import { runSiteLlm } from "./site-llm.js";
import { createRun, finishRun, latestSnapshot, loadSavedFingerprints, type Snapshot, addSiteLinks, loadSiteLinks, loadSiteMapExcept, loadSiteMapTimes, previousReport, saveRunFingerprints, savePage, saveSitePage, loadSnapshotPage, layerRan } from "./store.js";
import { contentHash, projectRoot, runIdNow, sha256, sleep, urlToSlug } from "./utils.js";
import { logCheck, previousCheck, savePageCheck } from "./page-checks.js";

dotenv.config({ path: path.join(projectRoot(), ".env") });

export interface AuditOptions {
  urls: string[];
  limit?: number;
  /** The whole scope. Such a run is a snapshot of the site: it makes the site pass that runs of pages and the Site page read. */
  all?: boolean;
  /** "Category/Subsection" keys: audit the in-scope URLs of these subsections (with `limit`, a sample of them). */
  subsections?: string[];
  /** Layers to run (default all three). A layer that is off is recorded as not checked. */
  layers?: Layers;
  /** Model id from `llm.models` in settings (default `llm.model`). */
  model?: string;
  force?: boolean;
  /** Email of the person who started the run (null for the command line). */
  startedBy?: string | null;
  /** Skip both LLM layers (smoke tests, SEO and GEO code checks only). */
  noLlm?: boolean;
  /** A run of pages reads each page from the copy kept in the latest snapshot (the text the audit saw, no request to the site); a page without a copy is fetched live. */
  fromSnapshot?: boolean;
  /** Progress lines (also printed to the console). */
  onLog?: (line: string) => void;
  /** Checked between pages: when true, no new page is started and the finished ones are saved. */
  isCancelled?: () => boolean;
}

const SHARED_IDS = ["banner_cta", "modals"];
/** A shared-zone text carried by fewer pages than this is page-specific (many article banners are written per article) and is audited with its page. */
const SHARED_MIN_PAGES = 2;
/** Safety limit for the pages of one listing read for their links. */
const MAX_LISTING_PAGES = 80;
/** Seconds, one decimal, for the timings in the log. */
const secs = (ms: number): string => `${(ms / 1000).toFixed(1)}s`;

const LAYER_OFF = "Layer turned off for this run";
const ZERO: TokenUsage = { input: 0, cached_input: 0, output: 0 };

function add(a: TokenUsage, b: TokenUsage | null | undefined): TokenUsage {
  if (!b) return a;
  return { input: a.input + b.input, cached_input: a.cached_input + b.cached_input, output: a.output + b.output };
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

/** Starts a run (a row in the database, readable from the first page on) and audits. Returns the run id. */
export async function runAudit(options: AuditOptions): Promise<string> {
  const { model } = settingsForModel(options.model);
  const layers = options.layers ?? ALL_LAYERS;
  if (!layers.compliance && !layers.geo && !layers.seo) throw new Error("Turn on at least one layer");
  // a page check has no run: each page's result goes to its own row (page_checks), read against the latest snapshot
  if (!options.all) return executeRun(options, "", new Date().toISOString(), await latestSnapshot());
  const runId = runIdNow();
  const startedAt = new Date().toISOString();
  const { onLog: _onLog, isCancelled: _isCancelled, startedBy, ...saved } = options;
  // the whole scope makes a snapshot of the site
  const snapshot: Snapshot | null = null;
  await createRun({ id: runId, startedAt, model: model.id, layers, options: saved, startedBy, kind: "site", siteRunId: null });
  try {
    return await executeRun(options, runId, startedAt, snapshot);
  } catch (e) {
    await finishRun(runId, "error", null, null).catch(() => undefined);
    throw e;
  }
}

async function executeRun(options: AuditOptions, runId: string, startedAt: string, snapshot: Snapshot | null): Promise<string> {
  const { settings, model } = settingsForModel(options.model);
  const layers = options.layers ?? ALL_LAYERS;
  const seoCfg = loadSeoConfig();
  const geoCfg = loadGeoCodeConfig();
  const client = options.noLlm || !(layers.compliance || layers.geo) ? null : createOpenAiClient();
  const concurrency = settings.llm.concurrency ?? 4;
  const log = (line: string): void => {
    console.log(line);
    options.onLog?.(line);
  };
  const cancelled = (): boolean => options.isCancelled?.() ?? false;

  // ---- 1. which URLs --------------------------------------------------------
  let urls = options.urls;
  const subsections = options.subsections?.length ? options.subsections : undefined;
  if (options.all || options.limit || subsections) {
    let inScope = filterInScope(await collectSitemapUrls(settings), settings);
    if (subsections) inScope = filterBySubsections(inScope, subsections, settings);
    urls = options.limit && !options.all ? sampleAcrossSubsections(inScope, options.limit, settings) : inScope;
  }
  const isSnapshot = !!options.all;
  const layerNames = (["compliance", "geo", "seo"] as const).filter((l) => layers[l]).join(", ");
  log(runId ? `Auditing ${urls.length} URL(s), run ${runId}, model ${model.id}, layers: ${layerNames}` : `Checking ${urls.length} page(s), model ${model.id}, layers: ${layerNames}`);

  // ---- 2. fetch ---------------------------------------------------------------
  const fetchedAll: { url: string; fetched: FetchResult }[] = [];
  let fromCopy = 0;
  const copied = new Set<string>();
  const useCopy = !!options.fromSnapshot && !options.all;
  if (useCopy && !snapshot) log("No site snapshot yet: the pages are fetched from the live site");
  for (const url of urls) {
    if (cancelled()) break;
    const short = url.replace(settings.base_url, "") || "/";
    // the copy of the page kept in the latest snapshot: the text the audit saw, and no request to the site
    const copy = useCopy && snapshot ? await loadSnapshotPage(snapshot.id, url) : null;
    if (copy) {
      fetchedAll.push({ url, fetched: copy });
      fromCopy++;
      copied.add(url);
      log(`Read ${fetchedAll.length}/${urls.length} from the snapshot copy: ${short}`);
      continue;
    }
    await sleep(settings.fetch.delay_ms);
    fetchedAll.push({ url, fetched: await httpGet(url, settings) });
    log(`Fetched ${fetchedAll.length}/${urls.length}${useCopy && snapshot ? " (no copy in the snapshot)" : ""}: ${short}`);
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
  // such a URL is fetched and has no links of its own: recorded as known, so the link graph does not wait for it
  for (const { url, fetched } of fetchedAll) {
    // the site map is written by snapshots only, so a page check never changes what Site Checks and the page's own site block read
    if (isSnapshot && redirectOnly.some((r) => r.url === url)) {
      await saveSitePage(runId, { url, final_url: fetched.finalUrl, title: "", meta: "", h1: "", links_out: [], checked_at: new Date().toISOString() });
    }
  }
  if (redirectOnly.length) {
    log(`${redirectOnly.length} URL(s) redirect to another URL of the list and are not audited as pages (see Site, sitemap hygiene)`);
  }

  // ---- 3. site-wide schema fingerprints ----------------------------------------
  // a snapshot finds the site-wide nodes; a run of pages takes those of the latest snapshot
  let siteWide = isSnapshot ? new Set<string>() : snapshot ? new Set(snapshot.fingerprints) : await loadSavedFingerprints();
  if (isSnapshot) {
    const counts = new Map<string, Set<string>>();
    for (const { url, fetched } of fetchedPages) {
      for (const node of flattenJsonLd(parseJsonLdBlocks(fetched.html))) {
        const fp = fingerprintJsonLdNode(node);
        if (!counts.has(fp)) counts.set(fp, new Set());
        counts.get(fp)!.add(url);
      }
    }
    siteWide = detectSiteWideFingerprints(counts, fetchedPages.length, settings.site_wide_schema_share);
    await saveRunFingerprints(runId, [...siteWide]);
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
  // a run of pages does not look for variants: a shared text of one of its pages is the snapshot's variant with the same text
  // (audited once on the Site page); any other is audited with the page
  for (const id of isSnapshot ? [] : SHARED_IDS) {
    for (const p of preps) {
      const z = p.zones.zones.find((x) => x.id === id && x.scope === "shared");
      if (!z || !z.text) continue;
      const h = zoneHash(z);
      const known = snapshot?.site.shared.variants.find((v) => v.zone === id && v.text_hash === h);
      if (known) variantsByPage.set(p, [...(variantsByPage.get(p) ?? []), known.id]);
      else z.scope = "page";
    }
  }
  for (const id of isSnapshot ? SHARED_IDS : []) {
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
    ["prompts/geo-llm.md", ...SOURCE_FILES],
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
    const finalUrl = fetched.finalUrl;
    // a checked page is the page at its final address: the same page whichever way its link was typed
    const identity = isSnapshot ? url : finalUrl;
    // the latest earlier report in which the layer ran, so a run with a layer off does not erase the cache of the others
    const prevCompliance = options.force || !layers.compliance ? null : await previousReport(identity, "compliance");
    const prevGeo = options.force || !layers.geo ? null : await previousReport(identity, "geo");
    // a page check overwrites the check before; that one also tells which layer results to keep when this check does not run a layer
    const prevCheck = isSnapshot ? null : await previousCheck(finalUrl);
    let pageTokens: TokenUsage = ZERO;
    let pageCalls = 0;

    const tStart = Date.now();
    const seo = layers.seo
      ? await runSeoChecks({
          html: fetched.html,
          requestedUrl: url,
          baseUrl: settings.base_url,
          page,
          zones,
          profile: scope.profile,
          config: seoCfg,
          linkChecker,
        })
      : { checks: [] };
    const tSeo = Date.now() - tStart;

    const geoType = geoTypeOf(scope.profile);
    const types = new Set<string>();
    for (const n of flattenJsonLd(page.json_ld)) {
      [n["@type"]].flat().forEach((t) => typeof t === "string" && types.add(t));
    }
    const geoCode = layers.geo ? runGeoCodeChecks(zones, geoType, geoCfg, types) : [];

    // compliance (LLM, cached by layer hash)
    const cPayload = compliancePayload(finalUrl, scope.profile, zones);
    const cHash = sha256(complianceFp + JSON.stringify(cPayload));
    // The term list and the severity table are applied on every run (finalizeCompliance), so editing them
    // does not ask the model again; only the prompt, the documents, the model and the page text do.
    let compliance: ComplianceLayerResult;
    if (!layers.compliance) {
      compliance = { hash: cHash, cached: false, skipped: true, action: null, summary: null, llm_problems: [], problems: [], usage: null, error: LAYER_OFF };
    } else if (prevCompliance && prevCompliance.compliance.hash === cHash && !prevCompliance.compliance.error && prevCompliance.compliance.llm_problems) {
      const problems = finalizeCompliance(prevCompliance.compliance.llm_problems, zones);
      const modelAction = prevCompliance.compliance.model_action ?? prevCompliance.compliance.action;
      compliance = {
        ...prevCompliance.compliance,
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
      pageTokens = add(pageTokens, r.usage);
      pageCalls++;
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

    const tCompliance = Date.now() - tStart - tSeo;
    // geo (code checks always live; LLM answers cached one by one, see runGeoLlm)
    let geo: GeoLayerResult;
    if (!layers.geo) {
      geo = { hash: geoFp, cached: false, skipped: true, code: [], llm: [], placement: null, usage: null, error: LAYER_OFF };
    } else if (client) {
      const out = await runGeoLlm({ client, settings, url: finalUrl, geoType, zones, codeChecks: geoCode, prev: prevGeo?.geo.llm ?? null, fingerprint: geoFp });
      llmCalls += out.calls;
      if (out.error) llmErrors++;
      tokens = add(tokens, out.usage);
      pageTokens = add(pageTokens, out.usage);
      pageCalls += out.calls;
      const answered = out.answers.length > 0;
      if (answered && out.calls === 0 && !out.error) cachedLayers++;
      geo = {
        hash: geoFp,
        cached: answered && out.calls === 0 && !out.error,
        code: geoCode,
        llm: out.answers,
        placement: out.placement ? withSeverity(out.placement, geoCfg) : null,
        usage: out.calls ? out.usage : (prevGeo?.geo.usage ?? null),
        error: out.error,
      };
    } else {
      geo = { hash: geoFp, cached: false, code: geoCode, llm: [], placement: null, usage: null, error: options.noLlm ? "LLM skipped for this run" : "OPENAI_API_KEY not set" };
    }

    const tGeo = Date.now() - tStart - tSeo - tCompliance;
    // A layer this check did not run (turned off, or the model skipped) keeps its result from the check before, marked with that date.
    // The model's problems are checked again against the text read now, and the term list is applied to it.
    let seoLayer: SeoLayerResult = { checks: seo.checks, ...(layers.seo ? {} : { skipped: true }) };
    if (prevCheck) {
      const pr = prevCheck.report;
      const asOf = prevCheck.checked_at.toISOString();
      const llmSkipped = (e: string | null): boolean => !!e && e.startsWith("LLM skipped");
      if ((!layers.compliance || llmSkipped(compliance.error)) && layerRan(pr, "compliance")) {
        const problems = finalizeCompliance(pr.compliance.llm_problems, zones);
        const modelAction = pr.compliance.model_action ?? pr.compliance.action;
        compliance = { ...pr.compliance, problems, model_action: modelAction, action: deriveAction(modelAction, problems, zones), as_of: pr.compliance.as_of ?? asOf };
      }
      if (!layers.geo && layerRan(pr, "geo")) geo = { ...pr.geo, as_of: pr.geo.as_of ?? asOf };
      else if (llmSkipped(geo.error) && layerRan(pr, "geo")) geo = { ...geo, llm: pr.geo.llm, placement: pr.geo.placement, usage: pr.geo.usage, error: null, as_of: pr.geo.as_of ?? asOf };
      if (!layers.seo && layerRan(pr, "seo")) seoLayer = { checks: pr.seo.checks, as_of: pr.seo.as_of ?? asOf };
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
      content_hash: contentHash(zones.zones),
      compliance,
      geo,
      seo: seoLayer,
    };
    if (isSnapshot) {
      await savePage(runId, urlToSlug(url), report, fetched.html, zones, settings);
    } else {
      const cost = usageCost(pageTokens, model);
      await savePageCheck({
        slug: urlToSlug(finalUrl),
        report,
        html: fetched.html,
        zones,
        settings,
        checkedBy: options.startedBy ?? null,
        model: model.id,
        layers,
        snapshot: snapshot ? { id: snapshot.id, site: snapshot.site } : null,
        prev: prevCheck,
        cost,
      });
      await logCheck({ kind: "page", by: options.startedBy ?? null, url: finalUrl, model: model.id, layers, tokens: pageTokens, cost, calls: pageCalls, fromSnapshot: copied.has(url) });
    }
    if (isSnapshot) {
      await saveSitePage(runId, {
        url,
        final_url: finalUrl,
        title: page.title,
        meta: page.meta_description,
        h1: page.h1[0] ?? "",
        links_out: mainContentLinks(zones, finalUrl, settings.base_url, seoCfg.skip_link_patterns),
        checked_at: report.checked_at,
      });
    }
    reports.push(report);
    done++;
    const high = compliance.problems.filter((p) => p.severity === "high").length;
    log(
      `[${done}/${preps.length}] ${finalUrl.replace(settings.base_url, "") || "/"}  compliance ${compliance.problems.length} (${high} high)${compliance.cached ? " cached" : ""}  geo ${geo.llm.length}${geo.cached ? " cached" : ""}  seo ${seoLayer.checks.filter((c) => c.status === "fail").length} fail${compliance.as_of || geo.as_of || seoLayer.as_of ? "  (kept from the check before: " + [compliance.as_of && "compliance", geo.as_of && "geo", seoLayer.as_of && "seo"].filter(Boolean).join(", ") + ")" : ""}  (took: seo ${secs(tSeo)}, compliance ${secs(tCompliance)}, geo ${secs(tGeo)})`,
    );
  });

  // ---- 6. site pass -------------------------------------------------------------------
  // A listing (its page links to <listing>/page/2/) shows its items over several pages that the scope leaves out.
  // They are fetched only for their links, which count as links of the listing, so the link graph sees every item.
  const listings = new Set<string>();
  if (layers.seo && isSnapshot) {
    for (const prep of preps) {
      const listing = prep.fetched.finalUrl;
      let next = nextListingPage(prep.fetched.html, listing, listing, 2);
      // a hub is a listing even when all its items fit on one page
      if (!next && classifyUrl(prep.url, settings)?.profile !== "hub") continue;
      listings.add(graphUrl(prep.url));
      const extra = new Set(listingLinks(prep.fetched.html, listing, settings.base_url, seoCfg.skip_link_patterns));
      let n = 2;
      for (; next && n <= MAX_LISTING_PAGES && !cancelled(); n++) {
        await sleep(settings.fetch.delay_ms);
        const f = await httpGet(next, settings);
        if (f.status < 200 || f.status >= 300) break;
        for (const l of listingLinks(f.html, f.finalUrl, settings.base_url, seoCfg.skip_link_patterns)) extra.add(l);
        next = nextListingPage(f.html, f.finalUrl, listing, n + 1);
      }
      await addSiteLinks(prep.url, [...extra]);
      log(`Listing ${listing.replace(settings.base_url, "") || "/"}: read ${n - 2} more page(s) for links, ${extra.size} link(s)`);
    }
  }

  // a run of pages has no site pass of its own: its pages are counted against the latest snapshot
  if (!isSnapshot) {
    log(
      `${cancelled() ? "Stopped" : "Done"}. ${reports.length} page(s) checked${useCopy && snapshot ? `, ${fromCopy} read from the snapshot copy` : ""}, ${llmCalls} LLM calls (${llmErrors} errors), ${cachedLayers} cached layers. Tokens in ${tokens.input}, cached ${tokens.cached_input}, out ${tokens.output}. Cost ${usageCost(tokens, model).toFixed(4)} (${model.id})${snapshot ? "" : ". No site snapshot yet: make one on Site Checks"}`,
    );
    return "";
  }

  const basics = await runSiteBasics(settings, geoCfg);
  if (!layers.geo) {
    basics.robots = { value: "not checked (GEO off)", ok: true };
    basics.llms_txt = { value: "not checked (GEO off)", ok: true };
  }

  // a run of some pages also compares them with the site map (pages it did not fetch); a run of the whole scope has all of them
  const runSlots = preps.map((p) => ({ url: p.fetched.finalUrl, title: p.page.title, meta: p.page.meta_description, h1: p.page.h1[0] ?? "" }));
  const mapSlots = layers.seo && !options.all ? (await loadSiteMapExcept(runSlots.map((s) => s.url))).map((m) => ({ ...m, map_checked_at: m.checked_at })) : [];
  const seoSite: SiteReport["seo"] = layers.seo
    ? seoSiteChecks(reports, [...runSlots, ...mapSlots.map(({ checked_at: _c, ...m }) => m)])
    : { duplicates: [], collapsed: [], sitemap_hygiene: [] };
  if (layers.seo) seoSite.sitemap_hygiene.push(...redirectOnly);

  const scopeCounts: Record<string, number> = {};
  for (const r of reports) {
    const k = `${r.category}/${r.subsection}`;
    scopeCounts[k] = (scopeCounts[k] ?? 0) + 1;
  }

  // every sitemap URL: in scope or not, fetched in this run or not, and when it was last fetched
  const norm = (u: string): string => u.replace(/\/$/, "");
  const fetchedNow = new Map(reports.map((r) => [norm(r.url), r]));
  const times = await loadSiteMapTimes();
  const sitemap: SitemapRow[] = await collectSitemapEntries(settings)
    .then((entries) =>
      entries.map((e) => {
        const scope = classifyUrl(e.url, settings);
        const r = fetchedNow.get(norm(e.url));
        return {
          url: e.url,
          sitemap: e.sitemap.replace(/^https?:\/\/[^/]+/, ""),
          scope: scope ? `${scope.category}/${scope.subsection}` : null,
          excluded: shouldExcludeUrl(e.url, settings.exclude_url_patterns),
          in_run: !!r,
          status: r?.status ?? null,
          last_fetched: times.get(e.url) ?? null,
        };
      }),
    )
    .catch(() => []);

  // link graph: inbound pages per URL and the pages nobody links to (only worked out when every in-scope page has stored links)
  const redirected = new Set(redirectOnly.map((r) => graphUrl(r.url)));
  const rowOf = new Map(sitemap.map((r) => [graphUrl(r.url), r]));
  const graph =
    layers.seo && sitemap.length
      ? orphanPages(
          sitemap
            .filter((r) => r.scope && !r.excluded)
            .map((r) => ({ url: graphUrl(r.url), profile: classifyUrl(r.url, settings)!.profile, inRun: r.in_run, skip: redirected.has(graphUrl(r.url)), exempt: listings.has(graphUrl(r.url)) })),
          await loadSiteLinks(),
          seoCfg.orphan_profiles ?? ["article", "case_study", "podcast"],
          !options.all,
        )
      : null;
  if (graph) {
    for (const r of sitemap) r.inbound = graph.inbound?.get(graphUrl(r.url)) ?? null;
    seoSite.orphans = graph.orphans.map((u) => rowOf.get(u)?.url ?? u);
    if (graph.note) seoSite.orphans_note = graph.note;
  }

  // checks that exist only for the whole site: robots.txt rules on real section paths, llms.txt, addresses, sitemap files, freshness
  const probe = new Map<string, string>();
  for (const r of sitemap) if (r.scope && !r.excluded && !probe.has(r.scope)) probe.set(r.scope, r.url);
  const modifiedOf = new Map(preps.map((p) => [p.fetched.finalUrl, p.page.date_modified ?? p.page.date_published]));
  const tech = await runSiteTech(
    settings,
    geoCfg,
    { probeUrls: [...probe.values()], pages: reports.map((r) => ({ url: r.final_url, profile: r.profile, modified: modifiedOf.get(r.final_url) ?? null })) },
    layers,
    log,
  );

  const site: SiteReport = {
    schema_version: 2,
    run_id: runId,
    basics,
    tech,
    scope_counts: scopeCounts,
    sitemap,
    shared: { variants, compliance: null },
    site_schema: null,
    seo: seoSite,
  };

  const meta: RunMeta = {
    run_id: runId,
    started_at: startedAt,
    ended_at: new Date().toISOString(),
    pages_checked: reports.length,
    pages_skipped: cachedLayers,
    llm_calls: llmCalls,
    llm_errors: llmErrors,
    tokens,
    cost_usd: usageCost(tokens, model),
    model: model.id,
    layers,
    ...(subsections ? { subsections } : {}),
  };
  await finishRun(runId, cancelled() ? "stopped" : "done", meta, site);
  // the banner and form variants and the site-wide JSON-LD are asked once on the stored snapshot (the same call as the Site page button)
  if (client && layers.compliance && !cancelled()) {
    const r = await runSiteLlm(runId, { model: model.id, by: options.startedBy ?? null, onLog: log, isCancelled: cancelled });
    tokens = add(tokens, r.usage);
    llmCalls += r.calls;
    llmErrors += r.errors;
  }
  const cost = usageCost(tokens, model);
  log(
    `${cancelled() ? "Stopped" : "Done"}. ${reports.length} pages, ${llmCalls} LLM calls (${llmErrors} errors), ${cachedLayers} cached layers. Tokens in ${tokens.input}, cached ${tokens.cached_input}, out ${tokens.output}. Cost $${cost.toFixed(4)} (${model.id})`,
  );
  return runId;
}
