import type { CheckItem, CheckResult, CheckStatus } from "../types.js";

export const ITEMS_CHECK_IDS = new Set([
  "B2",
  "B3",
  "C1",
  "C2",
  "D1",
  "D2",
  "D3",
  "D4",
]);

const STATUS_RANK: Record<CheckStatus, number> = {
  fail: 4,
  warn: 3,
  skip: 2,
  pass: 1,
  na: 0,
  info: 0,
};

export function worstStatus(statuses: CheckStatus[]): CheckStatus {
  if (!statuses.length) return "pass";
  return statuses.reduce((a, b) =>
    STATUS_RANK[a] >= STATUS_RANK[b] ? a : b,
  );
}

export function finalizeCheckWithItems(result: CheckResult): CheckResult {
  if (!result.items?.length) return result;
  const worst = worstStatus(result.items.map((i) => i.status));
  const failItems = result.items.filter((i) => i.status === "fail" || i.status === "warn");
  const evidence =
    result.evidence.length > 0
      ? result.evidence.slice(0, 2)
      : failItems
          .flatMap((i) => i.evidence)
          .slice(0, 2);
  const locations = [
    ...new Set(result.items.flatMap((i) => i.locations)),
  ] as CheckResult["locations"];
  const count = result.items.reduce((s, i) => s + (i.count ?? 0), 0) || null;
  return {
    ...result,
    status: worst,
    evidence,
    locations,
    count: count ?? result.count,
  };
}

export function allItemEvidenceText(result: CheckResult): string[] {
  const lines: string[] = [...result.evidence];
  if (result.items) {
    for (const item of result.items) {
      lines.push(item.name, ...item.evidence);
    }
  }
  return lines;
}
