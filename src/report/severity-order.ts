import { PAGE_CHECK_IDS, SEVERITIES } from "../checklist-meta.js";
import type { CheckResult, PageResult } from "../types.js";
import { isSiteWideFinding } from "./site-wide.js";

const SEV_RANK: Record<string, number> = { high: 0, medium: 1, low: 2 };

export function compareChecksBySeverity(a: string, b: string): number {
  const sa = SEV_RANK[SEVERITIES[a] ?? "medium"] ?? 1;
  const sb = SEV_RANK[SEVERITIES[b] ?? "medium"] ?? 1;
  if (sa !== sb) return sa - sb;
  return a.localeCompare(b);
}

function isActionableStatus(status: string): boolean {
  return status === "fail" || status === "warn";
}

/** Page-level failing check IDs (excludes site-wide findings), worst status per check. */
export function pageLevelFailingCheckIds(
  result: PageResult,
  siteWideKeys: Set<string>,
): string[] {
  const failing = new Set<string>();
  for (const id of PAGE_CHECK_IDS) {
    const r = result.results[id as keyof typeof result.results];
    if (!r) continue;
    if (r.items?.length) {
      const hasLocal = r.items.some(
        (item) =>
          isActionableStatus(item.status) &&
          !isSiteWideFinding(id, r, item, siteWideKeys),
      );
      if (hasLocal) failing.add(id);
    } else if (
      isActionableStatus(r.status) &&
      !isSiteWideFinding(id, r, undefined, siteWideKeys)
    ) {
      failing.add(id);
    }
  }
  return [...failing].sort(compareChecksBySeverity);
}

export function topFailingChecks(
  result: PageResult,
  siteWideKeys: Set<string>,
  n: number,
): string[] {
  return pageLevelFailingCheckIds(result, siteWideKeys).slice(0, n);
}

export function countFailsWarnsPageLevel(
  result: PageResult,
  siteWideKeys: Set<string>,
): Record<string, { fail: number; warn: number }> {
  const out: Record<string, { fail: number; warn: number }> = {};
  for (const letter of "ABCDEFGH") {
    out[letter] = { fail: 0, warn: 0 };
  }
  for (const id of PAGE_CHECK_IDS) {
    const letter = id[0]!;
    const r = result.results[id as keyof typeof result.results];
    if (!r) continue;
    if (r.items?.length) {
      for (const item of r.items) {
        if (isSiteWideFinding(id, r, item, siteWideKeys)) continue;
        if (item.status === "fail") out[letter]!.fail++;
        if (item.status === "warn") out[letter]!.warn++;
      }
    } else if (!isSiteWideFinding(id, r, undefined, siteWideKeys)) {
      if (r.status === "fail") out[letter]!.fail++;
      if (r.status === "warn") out[letter]!.warn++;
    }
  }
  return out;
}

export function checkSeverity(id: string, r: CheckResult): "high" | "medium" | "low" {
  return r.severity ?? SEVERITIES[id] ?? "medium";
}
