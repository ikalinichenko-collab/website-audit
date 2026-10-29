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
  collectSchemaEvidence,
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
import { writePageReport, writeRunReports } from "./report/index.js";
import {
  buildD2Candidates,
  buildD3Candidates,
  c2CandidatesFromOccurrences,
} from "./checks/candidates.js";
import { naChecksForPageType, applyNotApplicable } from "./na-checks.js";
import { sampleUrlsRoundRobin } from "./url-sample.js";
import { logDetail, logLine } from "./log.js";

export interface ScanOptions {
  urls?: string[];
  limit?: number;
  all?: boolean;
  force?: boolean;
  runId?: string;
  skipLlm?: boolean;
  useCachedPage?: boolean;
}

function rebuildLatestReportsFromPages(): void {
  const root = projectRoot();
  const pagesDir = path.join(root, "results", "latest", "pages");
  const reportDir = path.join(root, "results", "latest", "report");
  if (!fs.existsSync(pagesDir)) return;
  ensureDirSync(fs, reportDir);
  for (const f of fs.readdirSync(pagesDir)) {
    if (!f.endsWith(".json")) continue;
    const result = JSON.parse(
      fs.readFileSync(path.join(pagesDir, f), "utf8"),
    ) as PageResult;
    writePageReport(result, path.join(reportDir, f.replace(/\.json$/, ".md")));
  }
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

async function processOnePage(
  url: string,
  force: boolean,
  keywordByUrl: Map<string, string>,
  fullSiteRun: boolean,
  skipLlm: boolean,
  useCachedPage: boolean,
): Promise<{ page: PageData; result: PageResult }> {
  const config = loadAuditConfig();
  const sources = loadSources();
  const slug = urlToSlug(url);
  const prev = loadPreviousResult(slug);

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
  } else {
    const fetchResult = await httpGet(url, config);
    page = extractPageData(url, fetchResult, config);
    savePageData(slug, page);
  }
  if (!page.main_content_images) {
    page.main_content_images = [];
  }

  const linkChecker = (u: string) => checkUrl(u, config);
  const codeResults = await runCodeChecks(page, config, linkChecker);

  const schemaEv = collectSchemaEvidence(page);
  const contextTerms = collectContextTermEvidence(page, config);
  const b3PersonEvidence = buildB3PersonEvidence(schemaEv.persons);
  const c2Candidates = c2CandidatesFromOccurrences(contextTerms);
  const d2Candidates = buildD2Candidates(page, config);
  const d3Candidates = buildD3Candidates(page, config);
  const g3 = titleH1ForG3(page);
  const naList = new Set(naChecksForPageType(page.page_type, config));
  const activeLlmCheckIds = LLM_CHECK_IDS.filter((id) => !naList.has(id));

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
    );
    pageDataList.push(page);
    pageResults.push(result);
    const slug = urlToSlug(url);
    fs.writeFileSync(path.join(pagesDir, `${slug}.json`), JSON.stringify(result, null, 2));
    writePageReport(result, path.join(reportDir, `${slug}.md`));
    logDetail(`  type=${page.page_type} action=${result.recommendation.action}`);
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
      writePageReport(result, path.join(reportDir, `${slug}.md`));
    }
  }

  if (fullSiteRun) {
    const site = await runSiteChecks(config, pageDataList, keywordByUrl);
    fs.writeFileSync(path.join(runDir, "site.json"), JSON.stringify(site, null, 2));
    copyRunToLatest(runId);
  } else {
    for (const result of pageResults) {
      mergeLatestPage(urlToSlug(result.url), result);
    }
    mergeSinglePagesIntoLatest(runId);
  }

  writeRunReports(runId, pageResults, fullSiteRun);
  rebuildLatestReportsFromPages();
  return runId;
}

export function rebuildLatestReportsFromPagesPublic(): void {
  rebuildLatestReportsFromPages();
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
  const pageResults: PageResult[] = [];
  for (const f of fs.readdirSync(pagesDir)) {
    if (!f.endsWith(".json")) continue;
    pageResults.push(JSON.parse(fs.readFileSync(path.join(pagesDir, f), "utf8")));
  }
  writeRunReports(id, pageResults, fs.existsSync(path.join(root, "results", id, "site.json")));
}
