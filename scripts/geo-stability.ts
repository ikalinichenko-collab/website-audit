/**
 * GEO LLM stability check (docs/zones.md): 3 runs of every question on 5 pages.
 * Usage: npx tsx scripts/geo-stability.ts <cache_dir> [--run] [--runs N]
 * Without --run it only prints the payload sizes and a token estimate; no API calls.
 */
import fs from "node:fs";
import path from "node:path";
import dotenv from "dotenv";
import { loadSettings, loadGeoCodeConfig, loadSourcesText, geoQuestionsFor, geoInstruction } from "../src/config.js";
import { extractFromHtml, flattenJsonLd } from "../src/extract.js";
import { buildZones } from "../src/zones.js";
import { classifyUrl } from "../src/scope.js";
import { geoTypeOf, runGeoCodeChecks } from "../src/geo-code.js";
import { geoPayload, runGeoLlm } from "../src/geo-llm.js";
import { createOpenAiClient } from "../src/llm.js";
import { projectRoot, urlToSlug } from "../src/utils.js";

dotenv.config({ path: path.join(projectRoot(), ".env") });
const args = process.argv.slice(2);
const cacheDir = args[0];
if (!cacheDir) {
  console.error("usage: tsx scripts/geo-stability.ts <cache_dir> [--run] [--runs N]");
  process.exit(1);
}
const doRun = args.includes("--run");
const runs = args.includes("--runs") ? Number(args[args.indexOf("--runs") + 1]) : 3;

const PAGES = [
  "https://gogloby.com/",
  "https://gogloby.com/services/ai-staff-augmentation/",
  "https://gogloby.com/insights/ai-adoption-statistics/",
  "https://gogloby.com/use-cases/ai-use-cases-in-finance/",
  "https://gogloby.com/case-study/healthtech-company-applied-ai-engineers/",
];
const settings = loadSettings();
const config = loadGeoCodeConfig();
const sourcesChars = loadSourcesText().length;

let estIn = 0;
const prepared = PAGES.map((url) => {
  const scope = classifyUrl(url, settings)!;
  const cache = JSON.parse(fs.readFileSync(path.join(cacheDir, "html", `${urlToSlug(url)}.json`), "utf8"));
  const page = extractFromHtml(cache.html, url, settings, cache, new Set());
  const zones = buildZones(cache.html, cache.finalUrl, settings, []);
  const types = new Set<string>();
  for (const n of flattenJsonLd(page.json_ld)) [n["@type"]].flat().forEach((t) => typeof t === "string" && types.add(t));
  const gt = geoTypeOf(scope.profile);
  const code = runGeoCodeChecks(zones, gt, config, types);
  const qs = geoQuestionsFor(gt, new Set(code.filter((c) => c.status === "pass").map((c) => c.id)));
  const pack = qs.length ? { questions: qs, instruction: geoInstruction(settings.report_language, qs) } : null;
  const payloadChars = JSON.stringify(geoPayload(url, gt, zones)).length;
  const tokens = Math.round((sourcesChars + (pack?.instruction.length ?? 0) + payloadChars) / 4);
  estIn += tokens * runs;
  console.log(`${url}  type=${gt}  questions=${pack?.questions.length ?? 0}  payload=${payloadChars} chars  ~${tokens} input tokens/call`);
  return { url, gt, zones, code };
});
console.log(`\n${PAGES.length} pages x ${runs} runs = ${PAGES.length * runs} calls, ~${estIn} input tokens (sources ${Math.round(sourcesChars / 4)} tokens per call, cached after the first)`);
if (!doRun) {
  console.log("dry run: no API calls (add --run)");
  process.exit(0);
}

const client = createOpenAiClient();
if (!client) {
  console.error("OPENAI_API_KEY not set");
  process.exit(1);
}
const all: Record<string, Record<string, { answer: string; value: string | null; zone: string | null; verified: boolean | null; note: string }[]>> = {};
const placements: Record<string, (string | null)[]> = {};
let tin = 0, tcached = 0, tout = 0;
for (const p of prepared) {
  all[p.url] = {};
  placements[p.url] = [];
  for (let r = 0; r < runs; r++) {
    // no earlier answers: every run asks every question
    const out = await runGeoLlm({ client, settings, url: p.url, geoType: p.gt, zones: p.zones, codeChecks: p.code, prev: null, fingerprint: "stability" });
    if (out.error) {
      console.error(p.url, "error:", out.error);
      continue;
    }
    tin += out.usage.input; tcached += out.usage.cached_input; tout += out.usage.output;
    for (const a of out.answers) {
      (all[p.url]![a.id] ??= []).push({ answer: a.answer, value: a.value, zone: a.zone_id, verified: a.evidence_verified, note: a.note });
    }
    placements[p.url]!.push(out.placement ? `${out.placement.value}: missing ${out.placement.missing?.join(",") || "none"}` : null);
  }
}
fs.writeFileSync(path.join(cacheDir, "geo-stability.json"), JSON.stringify({ all, placements }, null, 1));

let unstable = 0, total = 0, unverified = 0, evid = 0;
console.log("\nquestion x page: answers over runs (value of target_keyword in brackets)");
for (const [url, qs] of Object.entries(all)) {
  console.log(`\n${url.replace(settings.base_url, "") || "/"}`);
  for (const [id, rs] of Object.entries(qs)) {
    total++;
    const answers = rs.map((x) => x.answer);
    const same = new Set(answers).size === 1;
    if (!same) unstable++;
    for (const x of rs) {
      if (x.verified !== null) {
        evid++;
        if (!x.verified) unverified++;
      }
    }
    const vals = id === "target_keyword" || id === "buyer_ready" ? ` [${rs.map((x) => x.value).join(" | ")}]` : "";
    console.log(`  ${same ? "ok " : "DIFF"} ${id.padEnd(24)} ${answers.join(",")}${vals}`);
  }
}
console.log(`\nunstable question-page pairs: ${unstable} of ${total}`);
console.log(`evidence not found in its zone: ${unverified} of ${evid}`);
console.log(`tokens: input ${tin}, cached ${tcached}, output ${tout}`);
console.log("placements:", placements);
