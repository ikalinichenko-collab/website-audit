import { createHash } from "node:crypto";
import { flattenJsonLd } from "../fetch-page.js";
import type { PageData } from "../types.js";

const STRIP_KEYS = new Set([
  "url",
  "@id",
  "datepublished",
  "datemodified",
  "breadcrumb",
  "mainentityofpage",
]);

export interface SiteWideSchemaEntry {
  fingerprint: string;
  type: string;
  name: string;
  page_count: number;
  pages: string[];
  sample: Record<string, unknown>;
}

export interface SiteWideSchemaManifest {
  run_page_count: number;
  min_pages_threshold: number;
  fingerprints: string[];
  nodes: SiteWideSchemaEntry[];
}

function stableValue(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(stableValue);
  if (value && typeof value === "object") {
    const o = value as Record<string, unknown>;
    const out: Record<string, unknown> = {};
    for (const key of Object.keys(o).sort()) {
      out[key] = stableValue(o[key]);
    }
    return out;
  }
  return value;
}

function stripPageSpecific(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(stripPageSpecific);
  if (value && typeof value === "object") {
    const o = value as Record<string, unknown>;
    const out: Record<string, unknown> = {};
    for (const [key, val] of Object.entries(o)) {
      if (STRIP_KEYS.has(key.toLowerCase())) continue;
      out[key] = stripPageSpecific(val);
    }
    return out;
  }
  return value;
}

export function nodeTypeLabel(node: Record<string, unknown>): string {
  const t = node["@type"];
  if (typeof t === "string") return t;
  if (Array.isArray(t)) return t.map(String).join("+");
  return "Unknown";
}

export function nodeDisplayName(node: Record<string, unknown>): string {
  if (typeof node.name === "string" && node.name.trim()) return node.name.trim();
  if (typeof node.legalName === "string" && node.legalName.trim()) return node.legalName.trim();
  return nodeTypeLabel(node);
}

export function fingerprintJsonLdNode(node: Record<string, unknown>): string {
  const normalized = stableValue(stripPageSpecific(node));
  const json = JSON.stringify(normalized);
  return createHash("sha256").update(json).digest("hex");
}

export function collectTypedNodesFromPage(page: PageData): Record<string, unknown>[] {
  return flattenJsonLd(page.json_ld);
}

export function detectSiteWideSchema(pages: PageData[]): {
  fingerprints: Set<string>;
  manifest: SiteWideSchemaManifest;
} {
  const n = pages.length;
  const minPages = Math.max(3, Math.ceil(n * 0.8));
  const byFp = new Map<
    string,
    { pages: Set<string>; sample: Record<string, unknown> }
  >();

  for (const page of pages) {
    for (const node of collectTypedNodesFromPage(page)) {
      const fp = fingerprintJsonLdNode(node);
      let row = byFp.get(fp);
      if (!row) {
        row = { pages: new Set(), sample: node };
        byFp.set(fp, row);
      }
      row.pages.add(page.url);
    }
  }

  const nodes: SiteWideSchemaEntry[] = [];
  const fingerprints = new Set<string>();
  for (const [fp, row] of byFp) {
    if (row.pages.size < minPages) continue;
    fingerprints.add(fp);
    nodes.push({
      fingerprint: fp,
      type: nodeTypeLabel(row.sample),
      name: nodeDisplayName(row.sample),
      page_count: row.pages.size,
      pages: [...row.pages].sort(),
      sample: row.sample,
    });
  }

  nodes.sort(
    (a, b) =>
      b.page_count - a.page_count ||
      a.type.localeCompare(b.type) ||
      a.name.localeCompare(b.name),
  );

  return {
    fingerprints,
    manifest: {
      run_page_count: n,
      min_pages_threshold: minPages,
      fingerprints: [...fingerprints],
      nodes,
    },
  };
}

export function filterOutSiteWideNodes(
  nodes: Record<string, unknown>[],
  siteWideFingerprints: Set<string>,
): Record<string, unknown>[] {
  if (!siteWideFingerprints.size) return nodes;
  return nodes.filter((n) => !siteWideFingerprints.has(fingerprintJsonLdNode(n)));
}

export function pageLocalTypedNodes(
  page: PageData,
  siteWideFingerprints: Set<string>,
): Record<string, unknown>[] {
  return filterOutSiteWideNodes(collectTypedNodesFromPage(page), siteWideFingerprints);
}
