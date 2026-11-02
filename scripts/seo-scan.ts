/**
 * Step 3 check: run the SEO layer over pages cached by zones-scan.ts (no LLM).
 *
 * Usage: npx tsx scripts/seo-scan.ts <urls.txt> <cache_dir>
 * Reads <cache_dir>/html/<slug>.json, writes <cache_dir>/seo/<slug>.json and prints totals.
 */
import fs from "node:fs";
import path from "node:path";
import { loadSettings, loadSeoConfig } from "../src/config.js";
import { headOrGetStatus } from "../src/fetch.js";
import { extractFromHtml } from "../src/extract.js";
import { buildZones } from "../src/zones.js";
import { classifyUrl } from "../src/scope.js";
import { runSeoChecks, type SeoCheck, type SeoResult } from "../src/seo.js";
import { urlToSlug } from "../src/utils.js";

const [urlsFile, cacheDir] = process.argv.slice(2);
if (!urlsFile || !cacheDir) {
  console.error("usage: tsx scripts/seo-scan.ts <urls.txt> <cache_dir>");
  process.exit(1);
}
const settings = loadSettings();
const config = loadSeoConfig();
const urls = fs.readFileSync(urlsFile, "utf8").split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
fs.mkdirSync(path.join(cacheDir, "seo"), { recursive: true });

const linkCachePath = path.join(cacheDir, "links.json");
const linkCache = new Map<string, Promise<{ status: number; finalUrl: string }>>(
  Object.entries(fs.existsSync(linkCachePath) ? JSON.parse(fs.readFileSync(linkCachePath, "utf8")) : {}).map(
    ([k, v]) => [k, Promise.resolve(v as { status: number; finalUrl: string })],
  ),
);
const linkChecker = (u: string) => {
  if (!linkCache.has(u)) {
    linkCache.set(
      u,
      headOrGetStatus(u, settings).catch(() => ({ status: 0, finalUrl: u })),
    );
  }
  return linkCache.get(u)!;
};

interface Row {
  url: string;
  subsection: string;
  profile: string;
  title: string;
  meta: string;
  h1: string;
  result: SeoResult;
}
const rows: Row[] = [];

let next = 0;
async function worker(): Promise<void> {
  for (;;) {
    const i = next++;
    if (i >= urls.length) return;
    const url = urls[i]!;
    const scope = classifyUrl(url, settings);
    if (!scope) continue;
    const cache = JSON.parse(fs.readFileSync(path.join(cacheDir, "html", `${urlToSlug(url)}.json`), "utf8")) as {
      html: string;
      finalUrl: string;
      status: number;
    };
    const page = extractFromHtml(cache.html, url, settings, cache, new Set());
    const zones = buildZones(cache.html, cache.finalUrl, settings, []);
    const result = await runSeoChecks({
      html: cache.html,
      requestedUrl: url,
      baseUrl: settings.base_url,
      page,
      zones,
      profile: scope.profile,
      config,
      linkChecker,
    });
    fs.writeFileSync(path.join(cacheDir, "seo", `${urlToSlug(url)}.json`), JSON.stringify({ url, ...scope, ...result }, null, 1));
    rows.push({ url, subsection: scope.subsection, profile: scope.profile, title: page.title, meta: page.meta_description, h1: page.h1[0] ?? "", result });
  }
}
await Promise.all(Array.from({ length: 6 }, worker));

const cacheObj: Record<string, { status: number; finalUrl: string }> = {};
for (const [k, v] of linkCache) cacheObj[k] = await v;
fs.writeFileSync(linkCachePath, JSON.stringify(cacheObj));

const short = (u: string) => u.replace(settings.base_url, "") || "/";
console.log("pages:", rows.length, "| unique links checked:", linkCache.size);

// per check: fails by severity and by subsection
const failsBy: Record<string, { n: number; sev: string; subs: Record<string, number>; ex: string[] }> = {};
const naBy: Record<string, number> = {};
for (const r of rows) {
  for (const c of r.result.checks as SeoCheck[]) {
    if (c.status === "na") naBy[c.id] = (naBy[c.id] ?? 0) + 1;
    if (c.status !== "fail") continue;
    const f = (failsBy[c.id] ??= { n: 0, sev: c.severity, subs: {}, ex: [] });
    f.n++;
    f.subs[r.subsection] = (f.subs[r.subsection] ?? 0) + 1;
    if (f.ex.length < 3) f.ex.push(`${short(r.url)}: ${c.value}${c.places?.[0] ? ` [${c.places[0].zone_id} ${c.places[0].part ?? ""} ${c.places[0].value}]` : ""}`);
  }
}
console.log("\nfailing checks (pages failing / severity / by subsection):");
for (const [id, f] of Object.entries(failsBy).sort((a, b) => b[1].n - a[1].n)) {
  console.log(`- ${id} [${f.sev}] ${f.n}`, JSON.stringify(f.subs));
  f.ex.forEach((e) => console.log("    ", e));
}
console.log("\nn/a:", naBy);

const passAll = new Set(rows.flatMap((r) => r.result.checks.map((c) => c.id)));
console.log("\nchecks that never failed:", [...passAll].filter((id) => !failsBy[id]));

// site checks: duplicates
for (const key of ["title", "meta", "h1"] as const) {
  const m = new Map<string, string[]>();
  for (const r of rows) {
    const v = r[key].trim();
    if (!v) continue;
    m.set(v, [...(m.get(v) ?? []), short(r.url)]);
  }
  const dup = [...m.entries()].filter(([, u]) => u.length > 1);
  console.log(`\nduplicate ${key}: ${dup.length} groups`);
  dup.slice(0, 6).forEach(([v, u]) => console.log(`  ${u.length}x "${v.slice(0, 70)}" ${u.slice(0, 3).join(", ")}`));
}
