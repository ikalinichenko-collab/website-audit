import type { CheckResult, CheckStatus, Location } from "../types.js";
import { SEVERITIES } from "../checklist-meta.js";
import { finalizeCheckWithItems } from "./items.js";

export function makeResult(
  checkId: string,
  status: CheckStatus,
  opts: Partial<Omit<CheckResult, "status" | "severity">> & {
    severity?: CheckResult["severity"];
  } = {},
): CheckResult {
  const base: CheckResult = {
    status,
    severity: opts.severity ?? SEVERITIES[checkId] ?? "medium",
    evidence: opts.evidence ?? [],
    locations: opts.locations ?? [],
    count: opts.count ?? null,
    fix: opts.fix ?? "",
    source_ref: opts.source_ref ?? "",
    items: opts.items,
    value: opts.value,
  };
  return opts.items?.length ? finalizeCheckWithItems(base) : base;
}
