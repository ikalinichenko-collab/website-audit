/**
 * Compliance layer check on a few cached pages (docs/zones.md, Compliance layer).
 * Usage: npx tsx scripts/compliance-run.ts <cache_dir> [--run] [url...]
 * Without --run it prints payload sizes and a token estimate; no API calls.
 */
import fs from "node:fs";
import path from "node:path";
import dotenv from "dotenv";
import { loadSettings, loadSourcesText, loadComplianceZonesInstruction } from "../src/config.js";
import { extractFromHtml } from "../src/extract.js";
import { buildZones } from "../src/zones.js";
import { classifyUrl } from "../src/scope.js";
import { compliancePayload, runComplianceLayer, sharedPayload } from "../src/compliance.js";
import { createOpenAiClient } from "../src/llm.js";
import { projectRoot, urlToSlug } from "../src/utils.js";

dotenv.config({ path: path.join(projectRoot(), ".env") });
const args = process.argv.slice(2);
const cacheDir = args[0];
if (!cacheDir) {
  console.error("usage: tsx scripts/compliance-run.ts <cache_dir> [--run] [url...]");
  process.exit(1);
}
const doRun = args.includes("--run");
const given = args.slice(1).filter((a) => a.startsWith("http"));
const PAGES = given.length
  ? given
  : [
      "https://gogloby.com/",
      "https://gogloby.com/services/hire-ai-engineers/",
      "https://gogloby.com/about/",
      "https://gogloby.com/insights/best-ai-recruiting-companies/",
      "https://gogloby.com/case-study/healthtech-company-applied-ai-engineers/",
      "https://gogloby.com/podcast/alice-barker/",
    ];
const settings = loadSettings();
const sourcesChars = loadSourcesText().length + loadComplianceZonesInstruction(settings.report_language).length;
const short = (u: string) => u.replace(settings.base_url, "") || "/";

const jobs = PAGES.map((url) => {
  const scope = classifyUrl(url, settings)!;
  const cache = JSON.parse(fs.readFileSync(path.join(cacheDir, "html", `${urlToSlug(url)}.json`), "utf8"));
  const page = extractFromHtml(cache.html, url, settings, cache, new Set());
  const zones = buildZones(cache.html, cache.finalUrl, settings, page.page_json_ld);
  return { name: short(url), payload: compliancePayload(url, scope.profile, zones), zones };
});
// shared zones come from the first page (home)
jobs.push({ name: "shared (banner, forms)", payload: sharedPayload(jobs[0]!.zones), zones: jobs[0]!.zones });

let est = 0;
for (const j of jobs) {
  const chars = JSON.stringify(j.payload).length;
  const tokens = Math.round((sourcesChars + chars) / 4);
  est += tokens;
  console.log(`${j.name.padEnd(70)} payload ${String(chars).padStart(6)} chars  ~${tokens} input tokens`);
}
console.log(`\n${jobs.length} calls, ~${est} input tokens (sources + prompt ${Math.round(sourcesChars / 4)} tokens per call, cached after the first)`);
if (!doRun) {
  console.log("dry run: no API calls (add --run)");
  process.exit(0);
}

const client = createOpenAiClient();
if (!client) {
  console.error("OPENAI_API_KEY not set");
  process.exit(1);
}
const out: Record<string, unknown> = {};
let locTotal = 0, locOk = 0, ruleTotal = 0, ruleOk = 0, tin = 0, tcached = 0, tout = 0;
for (const j of jobs) {
  const r = await runComplianceLayer(client, settings, j.payload, j.zones);
  out[j.name] = r;
  console.log(`\n=== ${j.name}${r.error ? `  ERROR ${r.error}` : `  action=${r.action}`}`);
  if (r.summary) console.log(`    ${r.summary}`);
  tin += r.usage.input; tcached += r.usage.cached_input; tout += r.usage.output;
  for (const p of r.problems) {
    ruleTotal++;
    if (p.rule_verified) ruleOk++;
    console.log(`  [${p.severity}] ${p.category} | ${p.title} (x${p.count})${p.rule_verified ? "" : "  RULE?"}${p.location_unverified ? "  TO REVIEW" : ""}`);
    console.log(`      rule: ${p.rule} | issue: ${p.issue}`);
    for (const l of p.locations.slice(0, 3)) {
      locTotal++;
      if (l.verified) locOk++;
      console.log(`      - ${l.zone_id}${l.part ? " " + l.part : ""} ${l.verified ? "" : "(NOT FOUND) "}"${l.quote}"`);
    }
    for (const l of p.locations.slice(3)) {
      locTotal++;
      if (l.verified) locOk++;
    }
  }
}
fs.writeFileSync(path.join(cacheDir, "compliance-run.json"), JSON.stringify(out, null, 1));
console.log(`\nlocations verified: ${locOk} of ${locTotal}; rules verified: ${ruleOk} of ${ruleTotal}`);
console.log(`tokens: input ${tin}, cached ${tcached}, output ${tout}`);
