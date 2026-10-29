import * as fs from "node:fs";
import path from "node:path";
import {
  auditConfigHash,
  checklistHash,
  loadAuditConfig,
  loadSources,
  projectRoot,
} from "./config.js";
import { LLM_CHECK_IDS, PAGE_CHECK_IDS } from "./checklist-meta.js";
import { runCodeChecks, runG2, runG4 } from "./checks/code-checks.js";
import {
  buildB3PersonEvidence,
  collectContextTermEvidence,
  titleH1ForG3,
} from "./checks/evidence.js";
import { makeResult } from "./checks/result-factory.js";
import { extractPageData, httpGet } from "./fetch-page.js";
import { checkUrl, clearLinkCache } from "./link-cache.js";
import {
  buildRecommendation,
  extractG1,
  runLlmChecks,
} from "./llm.js";
import { runSiteChecks } from "./site-checks.js";
import { collectSitemapUrls } from "./sitemap.js";
import type { CheckResult, PageData, PageResult } from "./types.js";
import { ensureDirSync, runIdNow, sleep, urlToSlug } from "./utils.js";
import { generateRunReports } from "./report/index.js";
import {
  buildD2Candidates,
  buildD3Candidates,
  c2CandidatesFromOccurrences,
} from "./checks/candidates.js";
import { naChecksForPageType, applyNotApplicable } from "./na-checks.js";
import { sampleUrlsRoundRobin } from "./url-sample.js";
import { logDetail, logLine } from "./log.js";
import {
  detectSiteWideSchema,
  type SiteWideSchemaManifest,
} from "./checks/schema-fingerprint.js";
import {
  excludeSiteWideFromLlmIds,
  filteredSchemaEvidence,
  pageLocalSchemaJson,
  siteWideSchemaNaResults,
} from "./checks/site-wide-schema-apply.js";
import { runS6SiteWideSchema } from "./s6-site-schema.js";

export interface ScanOptions {
  urls?: string[];
  limit?: number;
  all?: boolean;
  force?: boolean;
  runId?: string;
  skipLlm?: boolean;
  useCachedPage?: boolean;
}

export function loadAllPageResultsFromDir(pagesDir: string): PageResult[] {
  const pageResults: PageResult[] = [];
  if (!fs.existsSync(pagesDir)) return pageResults;
  for (const f of fs.readdirSync(pagesDir)) {
    if (!f.endsWith(".json")) continue;
    pageResults.push(
      JSON.parse(fs.readFileSync(path.join(pagesDir, f), "utf8")) as PageResult,
    );
  }
  return pageResults;
}

function dataPath(slug: string): string {
  const config = loadAuditConfig();
  return path.join(projectRoot(), config.paths.data_dir, `${slug}.json`);
}

function loadPreviousResult(slug: string): PageResult | null {
  const latest = path.join(projectRoot(), "results", "latest", "pages", `${slug}.json`);
  if (!fs.existsSync(latest)) return null;
  return JSON.parse(fs.readFileSync(latest, "utf8")) as PageResult;
}

function savePageData(slug: string, data: PageData): void {
  const config = loadAuditConfig();
  const dir = path.join(projectRoot(), config.paths.data_dir);
  ensureDirSync(fs, dir);
  fs.writeFileSync(path.join(dir, `${slug}.json`), JSON.stringify(data, null, 2));
}

function loadCachedPageData(slug: string): PageData | null {
  const p = dataPath(slug);
  if (!fs.existsSync(p)) return null;
  return JSON.parse(fs.readFileSync(p, "utf8")) as PageData;
}

function loadSiteWideFingerprintsFromLatest(): Set<string> {
  const p = path.join(projectRoot(), "results", "latest", "site-wide-schema.json");
  if (!fs.existsSync(p)) return new Set();
  const manifest = JSON.parse(fs.readFileSync(p, "utf8")) as SiteWideSchemaManifest;
  return new Set(manifest.fingerprints);
}

async function loadOrFetchPage(
  url: string,
  force: boolean,
  useCachedPage: boolean,
): Promise<PageData> {
  const config = loadAuditConfig();
  const slug = urlToSlug(url);
  let page: PageData;
  if (useCachedPage) {
    const cached = loadCachedPageData(slug);
    if (!cached) {
      const fetchResult = await httpGet(url, config);
      page = extractPageData(url, fetchResult, config);
      savePageData(slug, page);
    } else {
      page = cached;
    }
  } else if (force) {
    const fetchResult = await httpGet(url, config);
    page = extractPageData(url, fetchResult, config);
    savePageData(slug, page);
  } else {
    const cached = loadCachedPageData(slug);
    if (cached) page = cached;
    else {
      const fetchResult = await httpGet(url, config);
      page = extractPageData(url, fetchResult, config);
      savePageData(slug, page);
    }
  }
  if (!page.main_content_images) page.main_content_images = [];
  return page;
}

async function processOnePage(
  url: string,
  force: boolean,
  keywordByUrl: Map<string, string>,
  fullSiteRun: boolean,
  skipLlm: boolean,
  useCachedPage: boolean,
  siteWideFingerprints: Set<string> = new Set(),
  preloadedPage?: PageData,
): Promise<{ page: PageData; result: PageResult }> {
  const config = loadAuditConfig();
  const sources = loadSources();
  const slug = urlToSlug(url);
  const prev = loadPreviousResult(slug);

  const page =
    preloadedPage ?? (await loadOrFetchPage(url, force, useCachedPage));

  const linkChecker = (u: string) => checkUrl(u, config);
  const localSchemaJson = pageLocalSchemaJson(page, siteWideFingerprints);
  const codeResults = await runCodeChecks(page, config, linkChecker, {
    pageLocalSchemaJson: localSchemaJson,
  });

  const schemaEv = filteredSchemaEvidence(page, siteWideFingerprints);
  const contextTerms = collectContextTermEvidence(page, config);
  const b3PersonEvidence = buildB3PersonEvidence(schemaEv.persons);
  const c2Candidates = c2CandidatesFromOccurrences(contextTerms);
  const d2Candidates = buildD2Candidates(page, config);
  const d3Candidates = buildD3Candidates(page, config);
  const g3 = titleH1ForG3(page);
  const naList = new Set(naChecksForPageType(page.page_type, config));
  let activeLlmCheckIds = LLM_CHECK_IDS.filter((id) => !naList.has(id));
  activeLlmCheckIds = excludeSiteWideFromLlmIds(
    activeLlmCheckIds,
    page,
    siteWideFingerprints,
  ) as typeof LLM_CHECK_IDS[number][];

  const hashes = {
    content_hash: page.content_hash,
    sources_hash: sources.hash,
    checklist_hash: checklistHash(),
    audit_hash: auditConfigHash(),
  };

  let llmResults: Record<string, CheckResult>;
  const cacheHit =
    !force &&
    !skipLlm &&
    prev &&
    prev.content_hash === hashes.content_hash &&
    prev.sources_hash === hashes.sources_hash &&
    prev.checklist_hash === hashes.checklist_hash &&
    prev.audit_hash === hashes.audit_hash;

  if (skipLlm && prev) {
    llmResults = {};
    for (const id of LLM_CHECK_IDS) {
      const r = prev.results[id as keyof typeof prev.results];
      if (r) llmResults[id] = r;
    }
  } else if (cacheHit && prev) {
    llmResults = {};
    for (const id of LLM_CHECK_IDS) {
      const r = prev.results[id as keyof typeof prev.results];
      if (r) llmResults[id] = r;
    }
  } else if (skipLlm) {
    llmResults = {};
    for (const id of LLM_CHECK_IDS) {
      llmResults[id] = makeResult(id, "skip", {
        evidence: ["--skip-llm"],
        source_ref: "cli",
      });
    }
  } else {
    llmResults = await runLlmChecks(
      {
        page,
        codeResults,
        contextTerms,
        organizations: schemaEv.organizations,
        persons: schemaEv.persons,
        b3PersonEvidence,
        mainContentImages: page.main_content_images ?? [],
        c2Candidates,
        d2Candidates,
        d3Candidates,
        activeLlmCheckIds,
        g3Context: { ...g3, targetKeyword: null },
      },
      config,
    );
  }

  const g1Keyword = extractG1(llmResults) ?? llmResults.G1?.evidence.join(" ") ?? "none";
  keywordByUrl.set(page.url, g1Keyword);

  codeResults.G2 = runG2(page, g1Keyword === "none" ? null : g1Keyword);
  codeResults.G4 = runG4(page.url, g1Keyword === "none" ? null : g1Keyword, keywordByUrl, fullSiteRun);

  const results = {} as Record<string, CheckResult>;
  for (const id of PAGE_CHECK_IDS) {
    if (codeResults[id]) results[id] = codeResults[id];
    else if (llmResults[id]) results[id] = llmResults[id];
    else results[id] = makeResult(id, "skip", { evidence: ["Not computed"] });
  }

  applyNotApplicable(page.page_type, config, results);

  const schemaNa = siteWideSchemaNaResults(page, siteWideFingerprints, naList);
  for (const [id, r] of Object.entries(schemaNa)) {
    if (r) results[id as keyof typeof results] = r;
  }

  const recommendation = buildRecommendation(llmResults);

  const result: PageResult = {
    url: page.url,
    page_type: page.page_type,
    checked_at: new Date().toISOString(),
    ...hashes,
    first_paragraph: page.first_paragraph,
    results: results as PageResult["results"],
    recommendation,
  };

  return { page, result };
}

function mergeLatestPage(slug: string, result: PageResult): void {
  const dir = path.join(projectRoot(), "results", "latest", "pages");
  ensureDirSync(fs, dir);
  fs.writeFileSync(path.join(dir, `${slug}.json`), JSON.stringify(result, null, 2));
}

function copyRunToLatest(runId: string): void {
  const root = projectRoot();
  const src = path.join(root, "results", runId);
  const dest = path.join(root, "results", "latest");
  if (fs.existsSync(dest)) {
    fs.rmSync(dest, { recursive: true, force: true });
  }
  fs.cpSync(src, dest, { recursive: true });
}

function mergeSinglePagesIntoLatest(runId: string): void {
  const runPages = path.join(projectRoot(), "results", runId, "pages");
  const latestPages = path.join(projectRoot(), "results", "latest", "pages");
  ensureDirSync(fs, latestPages);
  if (!fs.existsSync(runPages)) return;
  for (const f of fs.readdirSync(runPages)) {
    fs.copyFileSync(path.join(runPages, f), path.join(latestPages, f));
  }
}

export async function runScan(options: ScanOptions): Promise<string> {
  clearLinkCache();
  const config = loadAuditConfig();
  const runId = options.runId ?? runIdNow();
  const runDir = path.join(projectRoot(), config.paths.results_dir, runId);
  const pagesDir = path.join(runDir, "pages");
  const reportDir = path.join(runDir, "report");
  ensureDirSync(fs, pagesDir);
  ensureDirSync(fs, reportDir);

  let urls: string[] = [];
  const fullSiteRun = Boolean(options.all || options.limit);

  if (options.urls?.length) {
    urls = options.urls;
  } else {
    urls = await collectSitemapUrls(config);
    if (options.limit) urls = sampleUrlsRoundRobin(urls, options.limit, config);
  }

  const keywordByUrl = new Map<string, string>();
  if (!fullSiteRun && options.urls?.length) {
    const latestDir = path.join(projectRoot(), "results", "latest", "pages");
    if (fs.existsSync(latestDir)) {
      for (const f of fs.readdirSync(latestDir)) {
        const pr = JSON.parse(
          fs.readFileSync(path.join(latestDir, f), "utf8"),
        ) as PageResult;
        const kw = pr.results.G1?.evidence?.[0];
        if (kw) keywordByUrl.set(pr.url, kw);
      }
    }
  }

  const pageResults: PageResult[] = [];
  const pageDataList: PageData[] = [];
  let siteWideFingerprints = new Set<string>();
  let siteWideManifest: SiteWideSchemaManifest | null = null;

  if (fullSiteRun) {
    for (let i = 0; i < urls.length; i++) {
      const url = urls[i]!;
      logLine(`Fetch ${i + 1}/${urls.length} ${url}`);
      if (i > 0) await sleep(config.fetch.delay_ms);
      pageDataList.push(
        await loadOrFetchPage(url, options.force ?? false, options.useCachedPage ?? false),
      );
    }
    const detected = detectSiteWideSchema(pageDataList);
    siteWideFingerprints = detected.fingerprints;
    siteWideManifest = detected.manifest;
    fs.writeFileSync(
      path.join(runDir, "site-wide-schema.json"),
      JSON.stringify(siteWideManifest, null, 2),
    );
    logDetail(
      `Site-wide schema: ${siteWideManifest.nodes.length} node(s), threshold ${siteWideManifest.min_pages_threshold} pages`,
    );

    for (let i = 0; i < pageDataList.length; i++) {
      const page = pageDataList[i]!;
      logLine(`Audit ${i + 1}/${pageDataList.length} ${page.url}`);
      const { result } = await processOnePage(
        page.url,
        options.force ?? false,
        keywordByUrl,
        fullSiteRun,
        options.skipLlm ?? false,
        options.useCachedPage ?? false,
        siteWideFingerprints,
        page,
      );
      pageResults.push(result);
      const slug = urlToSlug(page.url);
      fs.writeFileSync(path.join(pagesDir, `${slug}.json`), JSON.stringify(result, null, 2));
      logDetail(`  type=${page.page_type} action=${result.recommendation.action}`);
    }
  } else {
    siteWideFingerprints = loadSiteWideFingerprintsFromLatest();
    for (let i = 0; i < urls.length; i++) {
      const url = urls[i]!;
      logLine(`Scan ${i + 1}/${urls.length} ${url}`);
      if (i > 0) await sleep(config.fetch.delay_ms);
      const { page, result } = await processOnePage(
        url,
        options.force ?? false,
        keywordByUrl,
        fullSiteRun,
        options.skipLlm ?? false,
        options.useCachedPage ?? false,
        siteWideFingerprints,
      );
      pageDataList.push(page);
      pageResults.push(result);
      const slug = urlToSlug(url);
      fs.writeFileSync(path.join(pagesDir, `${slug}.json`), JSON.stringify(result, null, 2));
      logDetail(`  type=${page.page_type} action=${result.recommendation.action}`);
    }
  }

  // Refresh G4 after all keywords known (full run)
  if (fullSiteRun && pageResults.length > 1) {
    for (const result of pageResults) {
      const g1 = extractG1(result.results as Record<string, CheckResult>) ?? result.results.G1?.evidence[0];
      result.results.G4 = runG4(
        result.url,
        g1 && !/^none$/i.test(g1) ? g1 : null,
        keywordByUrl,
        true,
      );
      const slug = urlToSlug(result.url);
      fs.writeFileSync(path.join(pagesDir, `${slug}.json`), JSON.stringify(result, null, 2));
    }
  }

  let hasSiteJson = false;
  if (fullSiteRun) {
    const site = await runSiteChecks(config, pageDataList, keywordByUrl);
    site.results.S6 = await runS6SiteWideSchema(
      config,
      siteWideManifest?.nodes ?? [],
      options.skipLlm ?? false,
      (u) => checkUrl(u, config),
    );
    fs.writeFileSync(path.join(runDir, "site.json"), JSON.stringify(site, null, 2));
    hasSiteJson = true;
    generateRunReports(runId, pageResults, true);
    copyRunToLatest(runId);
  } else {
    for (const result of pageResults) {
      mergeLatestPage(urlToSlug(result.url), result);
    }
    mergeSinglePagesIntoLatest(runId);
    generateRunReports(runId, pageResults, false);
    const latestPages = loadAllPageResultsFromDir(
      path.join(projectRoot(), "results", "latest", "pages"),
    );
    generateRunReports(
      "latest",
      latestPages,
      fs.existsSync(path.join(projectRoot(), "results", "latest", "site.json")),
    );
  }

  return runId;
}

export function rebuildLatestReportsFromPagesPublic(): void {
  const pagesDir = path.join(projectRoot(), "results", "latest", "pages");
  const pageResults = loadAllPageResultsFromDir(pagesDir);
  generateRunReports(
    "latest",
    pageResults,
    fs.existsSync(path.join(projectRoot(), "results", "latest", "site.json")),
  );
}

export function rebuildReports(runId?: string): void {
  const root = projectRoot();
  const id =
    runId ??
    (fs.existsSync(path.join(root, "results", "latest"))
      ? "latest"
      : null);
  if (!id) throw new Error("No results to report");
  const pagesDir = path.join(root, "results", id, "pages");
  const pageResults = loadAllPageResultsFromDir(pagesDir);
  generateRunReports(
    id,
    pageResults,
    fs.existsSync(path.join(root, "results", id, "site.json")),
  );
}
