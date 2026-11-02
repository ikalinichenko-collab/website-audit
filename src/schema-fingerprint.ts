import { createHash } from "node:crypto";
import { flattenJsonLd } from "./extract.js";

const STRIP_KEYS = new Set([
  "url",
  "@id",
  "datepublished",
  "datemodified",
  "breadcrumb",
  "mainentityofpage",
]);

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

export function fingerprintJsonLdNode(node: Record<string, unknown>): string {
  const normalized = stableValue(stripPageSpecific(node));
  return createHash("sha256").update(JSON.stringify(normalized)).digest("hex");
}

export function detectSiteWideFingerprints(
  pageNodeCounts: Map<string, Set<string>>,
  pageCount: number,
  share: number,
): Set<string> {
  const minPages = Math.max(1, Math.ceil(pageCount * share));
  const fps = new Set<string>();
  for (const [fp, urls] of pageNodeCounts) {
    if (urls.size >= minPages) fps.add(fp);
  }
  return fps;
}

export function filterOutSiteWideNodes(
  nodes: Record<string, unknown>[],
  siteWideFingerprints: Set<string>,
): Record<string, unknown>[] {
  if (!siteWideFingerprints.size) return nodes;
  return nodes.filter((n) => !siteWideFingerprints.has(fingerprintJsonLdNode(n)));
}

export function stripPageSpecificForHash(node: Record<string, unknown>): unknown {
  return stripPageSpecific(node);
}

export function collectFingerprintsFromNodes(nodes: Record<string, unknown>[]): string[] {
  return nodes.map((n) => fingerprintJsonLdNode(n));
}
