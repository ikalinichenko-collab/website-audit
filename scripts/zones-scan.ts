/**
 * Step 2 check for docs/zones.md: build zones for a list of URLs (no LLM) and report
 * template detection, coverage, warnings and unnamed blocks.
 *
 * Usage: npx tsx scripts/zones-scan.ts <urls.txt> <out_dir> [--refresh]
 * HTML is cached in <out_dir>/html so reruns do not hit the site.
 */
import fs from "node:fs";
import path from "node:path";
import * as cheerio from "cheerio";
import { loadSettings } from "../src/config.js";
import { httpGet } from "../src/fetch.js";
import { buildZones } from "../src/zones.js";
import { decodeCloudflareEmailsInHtml } from "../src/extract.js";
import { collapseWhitespace, sleep, urlToSlug } from "../src/utils.js";

const [urlsFile, outDir, ...flags] = process.argv.slice(2);
if (!urlsFile || !outDir) {
  console.error("usage: tsx scripts/zones-scan.ts <urls.txt> <out_dir> [--refresh]");
  process.exit(1);
}
const refresh = flags.includes("--refresh");
const settings = loadSettings();
const urls = fs.readFileSync(urlsFile, "utf8").split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
fs.mkdirSync(path.join(outDir, "html"), { recursive: true });
fs.mkdirSync(path.join(outDir, "zones"), { recursive: true });

const SKIP_TEXT_SELECTORS =
  "header.site-header, body > header, footer.site-footer, body > footer, section.news-slider, .positions-related, .job-positions__related, .latest-guides, section.banner-cta, .banner-cta, #modal-contact-form, #modal-job-form, form.contact-form";

function mainWords(html: string): number {
  const $ = cheerio.load(decodeCloudflareEmailsInHtml(html));
  $("script, style, noscript, template, iframe, svg").remove();
  for (const sel of settings.fetch.hidden_selectors ?? []) {
    try {
      $(sel).remove();
    } catch {
      /* ignore */
    }
  }
  $(SKIP_TEXT_SELECTORS).remove();
  const t = collapseWhitespace(($("main").length ? $("main") : $("body")).text());
  return t ? t.split(" ").length : 0;
}

interface Row {
  url: string;
  status: number;
  template: string;
  zones: string[];
  warnings: string[];
  words_main: number;
  words_zones: number;
  ratio: number;
  empty_zones: string[];
  images: number;
  alt_missing: number;
  alt_empty: number;
}

const rows: Row[] = [];
for (const url of urls) {
  const slug = urlToSlug(url);
  const cache = path.join(outDir, "html", `${slug}.json`);
  let res: { html: string; finalUrl: string; status: number };
  if (!refresh && fs.existsSync(cache)) {
    res = JSON.parse(fs.readFileSync(cache, "utf8"));
  } else {
    let attempt = 0;
    for (;;) {
      try {
        res = await httpGet(url, settings);
        break;
      } catch (e) {
        if (++attempt >= 4) throw e;
        await sleep(2000 * attempt);
      }
    }
    fs.writeFileSync(cache, JSON.stringify(res));
    await sleep(Math.min(settings.fetch.delay_ms, 400));
  }
  const pz = buildZones(res.html, res.finalUrl, settings, []);
  fs.writeFileSync(path.join(outDir, "zones", `${slug}.json`), JSON.stringify({ url, ...pz }, null, 1));

  const body = pz.zones.filter((z) => !z.skipped && z.scope === "page" && !["title", "meta_description", "og_title", "og_description", "json_ld"].includes(z.kind));
  const wordsZones = body.reduce((a, z) => a + (z.text ? z.text.split(/\s+/).length : 0), 0);
  const wordsMain = mainWords(res.html);
  const imgs = pz.zones.filter((z) => !z.skipped).flatMap((z) => z.parts.filter((p) => p.type === "image"));
  rows.push({
    url,
    status: res.status,
    template: pz.template,
    zones: pz.zones.filter((z) => !z.skipped).map((z) => z.id),
    warnings: pz.warnings,
    words_main: wordsMain,
    words_zones: wordsZones,
    ratio: wordsMain ? Math.round((wordsZones / wordsMain) * 100) / 100 : 0,
    empty_zones: pz.zones.filter((z) => !z.skipped && z.scope === "page" && !z.text && !["og_title", "og_description"].includes(z.kind)).map((z) => z.id),
    images: imgs.length,
    alt_missing: imgs.filter((p) => p.alt_state === "missing").length,
    alt_empty: imgs.filter((p) => p.alt_state === "empty").length,
  });
}
fs.writeFileSync(path.join(outDir, "rows.json"), JSON.stringify(rows, null, 1));

const short = (u: string) => u.replace(settings.base_url, "") || "/";
const group = (k: (r: Row) => string) => {
  const m: Record<string, number> = {};
  rows.forEach((r) => (m[k(r)] = (m[k(r)] ?? 0) + 1));
  return m;
};
const section = (u: string) => short(u).split("/")[1] || "home";
console.log("pages:", rows.length, "| status:", group((r) => String(r.status)));
console.log("template by section:");
const bySec: Record<string, Record<string, number>> = {};
rows.forEach((r) => {
  const s = section(r.url);
  bySec[s] = bySec[s] ?? {};
  bySec[s]![r.template] = (bySec[s]![r.template] ?? 0) + 1;
});
console.log(bySec);
const withWarn = rows.filter((r) => r.warnings.length);
console.log("pages with warnings:", withWarn.length);
withWarn.slice(0, 15).forEach((r) => console.log(" ", short(r.url), r.warnings.slice(0, 3)));
const badRatio = rows.filter((r) => r.ratio < 0.9 || r.ratio > 1.15);
console.log("coverage ratio outside 0.9-1.15:", badRatio.length);
badRatio.slice(0, 25).forEach((r) => console.log(" ", short(r.url), r.template, `main=${r.words_main} zones=${r.words_zones} ratio=${r.ratio}`));
const emptyZ = rows.filter((r) => r.empty_zones.length);
console.log("pages with empty page-zones:", emptyZ.length);
emptyZ.slice(0, 15).forEach((r) => console.log(" ", short(r.url), r.empty_zones));
const zoneFreq: Record<string, number> = {};
rows.forEach((r) => r.zones.forEach((z) => {
  const k = z.replace(/#\d+$/, "").replace(/^article:(?!intro).*/, "article:<h2>");
  zoneFreq[k] = (zoneFreq[k] ?? 0) + 1;
}));
console.log("zone frequency:", Object.entries(zoneFreq).sort((a, b) => b[1] - a[1]).slice(0, 40));
console.log("images:", rows.reduce((a, r) => a + r.images, 0), "alt_missing:", rows.reduce((a, r) => a + r.alt_missing, 0), "alt_empty:", rows.reduce((a, r) => a + r.alt_empty, 0));
