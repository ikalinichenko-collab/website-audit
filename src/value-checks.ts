import type { CheckResult, CheckStatus } from "./types.js";
import { makeResult } from "./checks/result-factory.js";
import { SEVERITIES } from "./checklist-meta.js";

export const VALUE_CHECK_IDS = new Set(["E1", "F6", "G1", "H1", "H2", "H3"]);

export function deriveStatusFromValue(
  checkId: string,
  value: string,
  pageType: string,
): CheckStatus {
  const v = value.trim().toLowerCase();
  switch (checkId) {
    case "E1": {
      if (v === "contradicts") return "fail";
      if (v === "none") {
        if (["homepage", "service", "post"].includes(pageType)) return "warn";
        return "pass";
      }
      return "pass";
    }
    case "F6": {
      if (v === "buyer_ready") return "pass";
      if (v === "informational") return "warn";
      if (v === "not_targeted") return "fail";
      return "warn";
    }
    case "G1": {
      if (v === "none" || !v) return "warn";
      return "pass";
    }
    case "H1":
    case "H2":
    case "H3":
      return "info";
    default:
      return "pass";
  }
}

export function applyValueCheckResult(
  checkId: string,
  pageType: string,
  raw: Partial<CheckResult> & { value?: string },
): CheckResult {
  const value = (raw.value ?? raw.evidence?.[0] ?? "").trim();
  const status = deriveStatusFromValue(checkId, value, pageType);
  return makeResult(checkId, status, {
    evidence: raw.evidence?.length ? raw.evidence : value ? [value] : [],
    locations: raw.locations ?? [],
    count: raw.count ?? null,
    fix: raw.fix ?? "",
    source_ref: raw.source_ref ?? "checklist.md",
    items: raw.items,
    severity: SEVERITIES[checkId],
    value,
  });
}

export function expectedStatusForValue(
  checkId: string,
  value: string,
  pageType: string,
): CheckStatus {
  return deriveStatusFromValue(checkId, value, pageType);
}
