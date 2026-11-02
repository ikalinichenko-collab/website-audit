/**
 * Step 4 check: run the GEO code checks over pages cached by zones-scan.ts (no LLM).
 * Usage: npx tsx scripts/geo-scan.ts <urls.txt> <cache_dir>
 */
import fs from "node:fs";
import path from "node:path";
import { loadSettings, loadGeoCodeConfig } from "../src/config.js";
import { extractFromHtml, flattenJsonLd } from "../src/extract.js";
import { buildZones } from "../src/zones.js";
import { classifyUrl } from "../src/scope.js";
import { geoTypeOf, runGeoCodeChecks } from "../src/geo-code.js";
import { urlToSlug } from "../src/utils.js";

const [urlsFile, cacheDir] = process.argv.slice(2);
if (!urlsFile || !cacheDir) {
  console.error("usage: tsx scripts/geo-scan.ts <urls.txt> <cache_dir>");
  process.exit(1);
}
const settings = loadSettings();
const config = loadGeoCodeConfig();
const urls = fs.readFileSync(urlsFile, "utf8").split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
fs.mkdirSync(path.join(cacheDir, "geo"), { recursive: true });
const short = (u: string) => u.replace(settings.base_url, "") || "/";

const fails: Record<string, { pages: number; places: number; byType: Record<string, number>; ex: string[] }> = {};
const pass: Record<string, number> = {};
const terms: Record<string, number> = {};
for (const url of urls) {
  const scope = classifyUrl(url, settings);
  if (!scope) continue;
  const cache = JSON.parse(fs.readFileSync(path.join(cacheDir, "html", `${urlToSlug(url)}.json`), "utf8"));
  const page = extractFromHtml(cache.html, url, settings, cache, new Set());
  const zones = buildZones(cache.html, cache.finalUrl, settings, []);
  const types = new Set<string>();
  for (const n of flattenJsonLd(page.json_ld)) [n["@type"]].flat().forEach((t) => typeof t === "string" && types.add(t));
  const gt = geoTypeOf(scope.profile);
  const checks = runGeoCodeChecks(zones, gt, config, types);
  fs.writeFileSync(path.join(cacheDir, "geo", `${urlToSlug(url)}.json`), JSON.stringify({ url, geo_type: gt, checks }, null, 1));
  for (const c of checks) {
    if (c.status !== "fail") {
      pass[c.id] = (pass[c.id] ?? 0) + 1;
      continue;
    }
    const f = (fails[c.id] ??= { pages: 0, places: 0, byType: {}, ex: [] });
    f.pages++;
    f.places += c.places?.length ?? 1;
    f.byType[gt] = (f.byType[gt] ?? 0) + 1;
    if (f.ex.length < 5) f.ex.push(`${short(url)}: ${c.value}${c.places?.[0] ? ` [${c.places[0].zone_id}${c.places[0].part ? " " + c.places[0].part : ""}] ${c.places[0].value}` : ""}`);
    for (const p of c.places ?? []) {
      if (c.id === "ampersand" || c.id === "uk_spelling" || c.id === "trap_terms" || c.id === "nearshore_not_first") {
        const k = `${c.id}: ${p.value.split(" | ")[0]}`;
        terms[k] = (terms[k] ?? 0) + 1;
      }
    }
  }
}
console.log("GEO code checks: pages failing / places / by type");
for (const [id, f] of Object.entries(fails).sort((a, b) => b[1].pages - a[1].pages)) {
  console.log(`- ${id}: ${f.pages} pages, ${f.places} places`, JSON.stringify(f.byType));
  f.ex.forEach((e) => console.log("    ", e));
}
console.log("\npassing counts:", pass);
console.log("\ntop matched strings:");
Object.entries(terms).sort((a, b) => b[1] - a[1]).slice(0, 40).forEach(([k, n]) => console.log(`  ${n}  ${k}`));
