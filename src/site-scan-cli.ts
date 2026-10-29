import "dotenv/config";
import * as fs from "node:fs";
import path from "node:path";
import { loadAuditConfig, projectRoot } from "./config.js";
import type { PageData } from "./types.js";
import type { SiteWideSchemaManifest } from "./checks/schema-fingerprint.js";
import { checkUrl } from "./link-cache.js";
import { runSiteChecks, loadKeywordMapFromResults } from "./site-checks.js";
import { runS6SiteWideSchema } from "./s6-site-schema.js";
import { rebuildSiteMd } from "./report/index.js";
import { loadAllPageResultsFromDir } from "./pipeline.js";
import { urlToSlug } from "./utils.js";

function loadCachedPageData(slug: string): PageData | null {
  const config = loadAuditConfig();
  const p = path.join(projectRoot(), config.paths.data_dir, `${slug}.json`);
  if (!fs.existsSync(p)) return null;
  return JSON.parse(fs.readFileSync(p, "utf8")) as PageData;
}

async function main(): Promise<void> {
  const root = projectRoot();
  const latest = path.join(root, "results", "latest");
  const pagesDir = path.join(latest, "pages");
  const manifestPath = path.join(latest, "site-wide-schema.json");

  if (!fs.existsSync(pagesDir)) {
    throw new Error("No results/latest/pages — run a full or --limit scan first.");
  }
  if (!fs.existsSync(manifestPath)) {
    throw new Error("No site-wide-schema.json — run a full or --limit scan first.");
  }

  const config = loadAuditConfig();
  const pageResults = loadAllPageResultsFromDir(pagesDir);
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8")) as SiteWideSchemaManifest;

  const pageDataList: PageData[] = [];
  for (const pr of pageResults) {
    const page = loadCachedPageData(urlToSlug(pr.url));
    if (page) pageDataList.push(page);
  }

  const keywordByUrl = loadKeywordMapFromResults(pageResults);
  const site = await runSiteChecks(config, pageDataList, keywordByUrl);
  site.results.S6 = await runS6SiteWideSchema(
    config,
    manifest.nodes ?? [],
    false,
    (u) => checkUrl(u, config),
  );

  fs.writeFileSync(path.join(latest, "site.json"), JSON.stringify(site, null, 2));
  rebuildSiteMd(latest, pageResults, site);
  console.log(`Site checks S1–S6 updated in results/latest (S6: ${site.results.S6.status})`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
