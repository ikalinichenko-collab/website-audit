import fs from "node:fs";
import path from "node:path";
import { flattenJsonLd, parseJsonLdBlocks } from "./extract.js";
import { fingerprintJsonLdNode } from "./schema-fingerprint.js";
import type { PageReport, SiteReport } from "./report-types.js";
import { readJson } from "./paths.js";

/** Raw material behind the site-level findings, so the viewer can show where each one lives. */
export interface SiteSources {
  schema_nodes: {
    type: string;
    name: string;
    pages: number;
    pages_total: number;
    sample_url: string;
    json: Record<string, unknown>;
  }[];
  variants: { id: string; zone: string; label: string; text: string; pages: string[] }[];
}

function nodeType(node: Record<string, unknown>): string {
  const t = node["@type"];
  return Array.isArray(t) ? t.join(", ") : typeof t === "string" ? t : "Unknown";
}

/** Site-wide JSON-LD nodes (by saved fingerprint) and the text of each shared zone variant, taken from a run folder. */
export function buildSiteSources(runPath: string, site: SiteReport, loaded: { slug: string; report: PageReport }[]): SiteSources {
  const fps = new Set(readJson<{ fingerprints: string[] }>(path.join(runPath, "site-wide-fingerprints.json"))?.fingerprints ?? []);
  const found = new Map<string, { node: Record<string, unknown>; pages: Set<string>; sample: string }>();
  if (fps.size) {
    for (const { slug, report } of loaded) {
      const htmlPath = path.join(runPath, "pages", `${slug}.html`);
      if (!fs.existsSync(htmlPath)) continue;
      for (const node of flattenJsonLd(parseJsonLdBlocks(fs.readFileSync(htmlPath, "utf8")))) {
        const fp = fingerprintJsonLdNode(node);
        if (!fps.has(fp)) continue;
        const e = found.get(fp) ?? { node, pages: new Set<string>(), sample: report.final_url };
        e.pages.add(report.final_url);
        found.set(fp, e);
      }
    }
  }
  // flattenJsonLd also yields nested typed nodes (Offer inside Service); keep only nodes that are not inside another one
  const all = [...found.values()];
  const dumps = all.map((e) => JSON.stringify(e.node));
  const top = all.filter((_, i) => !dumps.some((d, j) => j !== i && d.length > dumps[i]!.length && d.includes(dumps[i]!)));
  const schema_nodes = top.map((e) => ({
    type: nodeType(e.node),
    name: typeof e.node.name === "string" ? e.node.name : "",
    pages: e.pages.size,
    pages_total: loaded.length,
    sample_url: e.sample,
    json: e.node,
  }));

  const variants: SiteSources["variants"] = [];
  for (const v of site.shared.variants) {
    const first = loaded.find((l) => l.report.final_url === v.pages[0] || l.report.url === v.pages[0]);
    const zones = first ? readJson<{ zones: { id: string; label: string; text: string }[] }>(path.join(runPath, "pages", `${first.slug}.zones.json`))?.zones : undefined;
    const z = zones?.find((x) => x.id === v.zone);
    variants.push({ id: v.id, zone: v.zone, label: z?.label ?? v.zone, text: z?.text ?? "", pages: v.pages });
  }
  return { schema_nodes, variants };
}
