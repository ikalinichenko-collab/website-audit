import type { CheckItem, CheckResult, PageResult } from "../types.js";

export interface SiteWideIssue {
  key: string;
  checkId: string;
  kind: "item" | "check";
  itemName?: string;
  evidence: string;
  pageCount: number;
  totalPages: number;
  exampleUrl: string;
}

function normalizeText(s: string): string {
  return s.replace(/\s+/g, " ").trim().toLowerCase();
}

function itemKey(checkId: string, item: CheckItem): string {
  const ev = normalizeText(item.evidence[0] ?? item.evidence.join(" "));
  return `${checkId}|item|${normalizeText(item.name)}|${ev}`;
}

function checkKey(checkId: string, result: CheckResult): string {
  const ev = normalizeText(result.evidence[0] ?? result.evidence.join(" "));
  return `${checkId}|check|${ev}`;
}

function isActionableStatus(status: string): boolean {
  return status === "fail" || status === "warn";
}

/** Collect fingerprint keys for fail/warn findings on one page. */
export function collectFindingKeys(result: PageResult): Map<string, { checkId: string; kind: "item" | "check"; itemName?: string; evidence: string }> {
  const keys = new Map<string, { checkId: string; kind: "item" | "check"; itemName?: string; evidence: string }>();
  for (const [checkId, r] of Object.entries(result.results)) {
    if (!r) continue;
    if (r.items?.length) {
      for (const item of r.items) {
        if (!isActionableStatus(item.status)) continue;
        const key = itemKey(checkId, item);
        keys.set(key, {
          checkId,
          kind: "item",
          itemName: item.name,
          evidence: item.evidence[0] ?? item.name,
        });
      }
    } else if (isActionableStatus(r.status)) {
      const key = checkKey(checkId, r);
      keys.set(key, {
        checkId,
        kind: "check",
        evidence: r.evidence[0] ?? checkId,
      });
    }
  }
  return keys;
}

export function detectSiteWideIssues(pageResults: PageResult[]): SiteWideIssue[] {
  const n = pageResults.length;
  if (n < 3) return [];

  const minPages = Math.max(3, Math.ceil(n * 0.8));
  const counts = new Map<
    string,
    { meta: { checkId: string; kind: "item" | "check"; itemName?: string; evidence: string }; urls: string[] }
  >();

  for (const pr of pageResults) {
    const pageKeys = collectFindingKeys(pr);
    for (const [key, meta] of pageKeys) {
      let row = counts.get(key);
      if (!row) {
        row = { meta, urls: [] };
        counts.set(key, row);
      }
      row.urls.push(pr.url);
    }
  }

  const issues: SiteWideIssue[] = [];
  for (const [key, row] of counts) {
    if (row.urls.length < minPages) continue;
    issues.push({
      key,
      checkId: row.meta.checkId,
      kind: row.meta.kind,
      itemName: row.meta.itemName,
      evidence: row.meta.evidence,
      pageCount: row.urls.length,
      totalPages: n,
      exampleUrl: row.urls[0]!,
    });
  }

  issues.sort(
    (a, b) =>
      a.checkId.localeCompare(b.checkId) ||
      (a.itemName ?? "").localeCompare(b.itemName ?? ""),
  );
  return issues;
}

export function siteWideKeySet(issues: SiteWideIssue[]): Set<string> {
  return new Set(issues.map((i) => i.key));
}

export function isSiteWideFinding(
  checkId: string,
  result: CheckResult,
  item: CheckItem | undefined,
  siteWideKeys: Set<string>,
): boolean {
  if (item) return siteWideKeys.has(itemKey(checkId, item));
  return siteWideKeys.has(checkKey(checkId, result));
}
