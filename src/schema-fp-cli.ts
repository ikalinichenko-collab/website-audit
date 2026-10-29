/** Quick fingerprint test on cached page data (dev helper). */
import * as fs from "node:fs";
import path from "node:path";
import { loadAuditConfig, projectRoot } from "./config.js";
import type { PageData } from "./types.js";
import { detectSiteWideSchema } from "./checks/schema-fingerprint.js";
import { urlToSlug } from "./utils.js";

const latestPages = path.join(projectRoot(), "results", "latest", "pages");
const dataDir = path.join(projectRoot(), loadAuditConfig().paths.data_dir);

function loadPage(url: string): PageData | null {
  const slug = urlToSlug(url);
  const cached = path.join(dataDir, `${slug}.json`);
  if (fs.existsSync(cached)) {
    return JSON.parse(fs.readFileSync(cached, "utf8")) as PageData;
  }
  const resultFile = fs.readdirSync(latestPages).find((f) => f.startsWith(slug.slice(0, 20)));
  if (resultFile) {
    const pr = JSON.parse(fs.readFileSync(path.join(latestPages, resultFile), "utf8")) as {
      url: string;
    };
    const c2 = path.join(dataDir, `${urlToSlug(pr.url)}.json`);
    if (fs.existsSync(c2)) return JSON.parse(fs.readFileSync(c2, "utf8")) as PageData;
  }
  return null;
}

const pages: PageData[] = [];
if (fs.existsSync(latestPages)) {
  for (const f of fs.readdirSync(latestPages)) {
    if (!f.endsWith(".json")) continue;
    const pr = JSON.parse(fs.readFileSync(path.join(latestPages, f), "utf8")) as { url: string };
    const p = loadPage(pr.url);
    if (p) pages.push(p);
  }
}

const { manifest } = detectSiteWideSchema(pages);
console.log(`Pages: ${pages.length}, threshold: ${manifest.min_pages_threshold}`);
for (const n of manifest.nodes) {
  console.log(`  ${n.type} | ${n.name} | ${n.page_count} pages`);
}
