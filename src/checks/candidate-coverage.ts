import type { CheckItem, CheckResult } from "../types.js";
import { finalizeCheckWithItems } from "./items.js";
import { makeResult } from "./result-factory.js";
import type { NamedCandidate } from "./candidates.js";

function itemMatchesCandidate(item: CheckItem, c: NamedCandidate): boolean {
  const n = item.name.toLowerCase();
  const id = c.candidate_id.toLowerCase();
  const name = c.name.toLowerCase();
  return (
    n === id ||
    n.includes(id) ||
    n.includes(name) ||
    id.includes(n) ||
    (c.source === "context_term" && n.includes(c.name.split(" @ ")[0]!.toLowerCase()))
  );
}

export function missingCandidates(
  result: CheckResult,
  candidates: NamedCandidate[],
): NamedCandidate[] {
  const items = result.items ?? [];
  return candidates.filter(
    (c) => !items.some((i) => itemMatchesCandidate(i, c)),
  );
}

export function appendSkipItemsForMissing(
  checkId: string,
  result: CheckResult,
  missing: NamedCandidate[],
): CheckResult {
  if (!missing.length) return result;
  const items = [...(result.items ?? [])];
  for (const c of missing) {
    items.push({
      name: c.candidate_id,
      status: "skip",
      evidence: ["not judged by LLM"],
      locations: c.locations,
      count: null,
      fix: "",
    });
  }
  const merged = makeResult(checkId, result.status, {
    ...result,
    items,
    severity: result.severity,
  });
  return finalizeCheckWithItems(merged);
}

export function mergeLlmItemsWithCoverage(
  checkId: string,
  result: CheckResult,
  candidates: NamedCandidate[],
): CheckResult {
  let r = result;
  const miss = missingCandidates(r, candidates);
  if (miss.length) {
    r = appendSkipItemsForMissing(checkId, r, miss);
  }
  return finalizeCheckWithItems(r);
}
