import type { AuditConfig } from "./types.js";
import type { CheckResult, PageData, SiteResult } from "./types.js";
import { makeResult } from "./checks/result-factory.js";
import { collectSitemapUrls, fetchText } from "./sitemap.js";
import { httpGet, extractPageData } from "./fetch-page.js";
import { checkUrl } from "./link-cache.js";

function parseRobots(txt: string): { allows: Map<string, string[]>; disallows: Map<string, string[]> } {
  const allows = new Map<string, string[]>();
  const disallows = new Map<string, string[]>();
  let agent = "*";
  for (const line of txt.split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const [key, ...rest] = t.split(":");
    const val = rest.join(":").trim();
    if (/user-agent/i.test(key)) agent = val.toLowerCase();
    if (/allow/i.test(key)) {
      if (!allows.has(agent)) allows.set(agent, []);
      allows.get(agent)!.push(val);
    }
    if (/disallow/i.test(key)) {
      if (!disallows.has(agent)) disallows.set(agent, []);
      disallows.get(agent)!.push(val);
    }
  }
  return { allows, disallows };
}

function botAllowed(robots: string, bot: string): boolean {
  const { allows, disallows } = parseRobots(robots);
  const rules = disallows.get(bot.toLowerCase()) ?? disallows.get("*") ?? [];
  const allowRules = allows.get(bot.toLowerCase()) ?? allows.get("*") ?? [];
  if (allowRules.some((r) => r === "/" || r === "")) return true;
  if (rules.some((r) => r === "/" || r === "")) return false;
  return true;
}

export async function runSiteChecks(
  config: AuditConfig,
  pages: PageData[],
  keywordByUrl: Map<string, string>,
): Promise<SiteResult> {
  const checked_at = new Date().toISOString();
  const results: Record<string, CheckResult> = {};

  // S1
  const robotsUrl = new URL("/robots.txt", config.site.base_url).href;
  try {
    const robots = await fetchText(robotsUrl, config.fetch.user_agent, config.fetch.timeout_ms);
    const blocked = config.site_checks.ai_bots.filter((b) => !botAllowed(robots, b));
    results.S1 = makeResult(
      "S1",
      blocked.length ? "fail" : "pass",
      {
        evidence: blocked.length
          ? [`Blocked: ${blocked.join(", ")}`]
          : ["All configured AI bots allowed"],
        source_ref: "audit.json: site_checks.ai_bots",
        fix: blocked.length ? "Allow AI bots in robots.txt." : "",
      },
    );
  } catch {
    results.S1 = makeResult("S1", "fail", {
      evidence: ["Could not fetch robots.txt"],
      fix: "Ensure robots.txt is reachable.",
      source_ref: "audit.json: site_checks.ai_bots",
    });
  }

  // S2
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), config.fetch.timeout_ms);
    const res = await fetch(config.site_checks.llms_txt_url, {
      headers: { "User-Agent": config.fetch.user_agent },
      signal: ctrl.signal,
    });
    clearTimeout(t);
    results.S2 = makeResult("S2", res.ok ? "pass" : "fail", {
      evidence: [res.ok ? "llms.txt present" : `HTTP ${res.status}`],
      source_ref: "audit.json: site_checks.llms_txt_url",
      fix: res.ok ? "" : "Publish llms.txt at the configured URL.",
    });
  } catch {
    results.S2 = makeResult("S2", "fail", {
      evidence: ["llms.txt not reachable"],
      fix: "Publish llms.txt.",
      source_ref: "audit.json: site_checks.llms_txt_url",
    });
  }

  // S3
  try {
    const urls = await collectSitemapUrls(config);
    const issues: string[] = [];
    for (const u of urls.slice(0, 100)) {
      const fr = await httpGet(u, config);
      const pd = extractPageData(u, fr, config);
      if (pd.status === 404) issues.push(`${u}: 404`);
      if (pd.status >= 300 && pd.status < 400) issues.push(`${u}: redirect`);
      if (/noindex/i.test(pd.meta_robots)) issues.push(`${u}: noindex`);
    }
    results.S3 = makeResult("S3", issues.length ? "warn" : "pass", {
      evidence: [
        `Sitemap URLs: ${urls.length}`,
        ...(issues.slice(0, 2).length ? issues.slice(0, 2) : ["No sampled issues"]),
      ],
      count: urls.length,
      fix: issues.length ? "Fix sitemap URLs that 404, redirect, or are noindex." : "",
      source_ref: "checklist: S3",
    });
  } catch (e) {
    results.S3 = makeResult("S3", "fail", {
      evidence: [String(e)],
      source_ref: "checklist: S3",
    });
  }

  // S4 — sample 5 page types
  const byType = new Map<string, PageData>();
  for (const p of pages) {
    if (!byType.has(p.page_type)) byType.set(p.page_type, p);
  }
  const sample = [...byType.values()].slice(0, 5);
  const emptyContent = sample.filter((p) => p.main_text.trim().length < 100);
  results.S4 = makeResult("S4", emptyContent.length ? "fail" : "pass", {
    evidence: emptyContent.length
      ? emptyContent.map((p) => `${p.url}: thin HTML content`)
      : [`Sampled ${sample.length} page types with main content in HTML`],
    fix: emptyContent.length ? "Ensure main content is in server-rendered HTML." : "",
    source_ref: "checklist: S4",
  });

  // S5
  const groups = new Map<string, string[]>();
  for (const [url, kw] of keywordByUrl) {
    if (!kw || kw.toLowerCase() === "none") continue;
    const k = kw.toLowerCase();
    if (!groups.has(k)) groups.set(k, []);
    groups.get(k)!.push(url);
  }
  const competing = [...groups.entries()].filter(([, urls]) => urls.length > 1);
  results.S5 = makeResult("S5", competing.length ? "warn" : "pass", {
    evidence: competing.length
      ? competing.slice(0, 2).map(([k, u]) => `${k}: ${u.length} URLs`)
      : ["No duplicate target keywords across site"],
    count: competing.length,
    fix: competing.length ? "Consolidate or differentiate competing keyword pages." : "",
    source_ref: "checklist: S5",
  });

  return { checked_at, results };
}

export function loadKeywordMapFromResults(
  pageResults: Array<{ url: string; results: Record<string, CheckResult> }>,
): Map<string, string> {
  const map = new Map<string, string>();
  for (const pr of pageResults) {
    const ev = pr.results.G1?.evidence?.[0];
    if (ev) map.set(pr.url, ev);
  }
  return map;
}
