import type { AuditConfig } from "./types.js";
import type { CheckItem } from "./types.js";
import type { SiteWideSchemaEntry } from "./checks/schema-fingerprint.js";
import { nodeDisplayName, nodeTypeLabel } from "./checks/schema-fingerprint.js";

const CLUTCH_RATING = "4.9";
const CLUTCH_REVIEW_COUNT = 10;

function nodeLabel(entry: SiteWideSchemaEntry): string {
  return `${entry.type}: ${entry.name}`;
}

function problemItem(
  entry: SiteWideSchemaEntry,
  field: string,
  current: string,
  expected: string,
  fix: string,
  status: CheckItem["status"] = "fail",
): CheckItem {
  return {
    name: `${nodeLabel(entry)} — ${field}`,
    status,
    evidence: [`current: ${current.slice(0, 200)}`, `expected: ${expected}`],
    locations: ["schema"],
    count: 1,
    fix,
  };
}

export function codeProblemsC1C3(
  catalog: SiteWideSchemaEntry[],
  config: AuditConfig,
): CheckItem[] {
  const items: CheckItem[] = [];
  for (const entry of catalog) {
    const text = JSON.stringify(entry.sample);
    for (const rule of config.exact_phrases.items) {
      const cs = rule.case_sensitive ?? false;
      const idx = cs
        ? text.indexOf(rule.phrase)
        : text.toLowerCase().indexOf(rule.phrase.toLowerCase());
      if (idx < 0) continue;
      items.push(
        problemItem(
          entry,
          "text (C1)",
          rule.phrase,
          "must not appear (audit.json exact_phrases)",
          rule.replace_with
            ? `Replace "${rule.phrase}" with ${rule.replace_with} in site-wide schema.`
            : `Remove or rephrase "${rule.phrase}" in site-wide schema.`,
        ),
      );
    }
    for (const w of config.brand_spelling.wrong_spellings) {
      const re = new RegExp(`\\b${w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "g");
      if (re.test(text)) {
        const allowed = config.brand_spelling.allowed_phrases.some((a) => text.includes(a));
        if (!allowed) {
          items.push(
            problemItem(
              entry,
              "text (C3)",
              w,
              `correct brand spelling (${config.code_facts.brand_name})`,
              `Fix brand spelling "${w}" in site-wide schema.`,
            ),
          );
        }
      }
    }
  }
  return items;
}

export function codeProblemsAggregateRating(catalog: SiteWideSchemaEntry[]): CheckItem[] {
  const items: CheckItem[] = [];
  for (const entry of catalog) {
    if (!entry.type.includes("AggregateRating") && entry.sample["@type"] !== "AggregateRating") {
      continue;
    }
    const node = entry.sample;
    const rating = node.ratingValue;
    const ratingStr = rating == null ? "" : String(rating);
    if (ratingStr !== CLUTCH_RATING) {
      items.push(
        problemItem(
          entry,
          "ratingValue",
          ratingStr || "(missing)",
          `Clutch ${CLUTCH_RATING} (Fact Sheet)`,
          `Set ratingValue to ${CLUTCH_RATING}.`,
        ),
      );
    }
    const rc = node.reviewCount;
    if (rc == null) {
      items.push(
        problemItem(
          entry,
          "reviewCount",
          "(missing)",
          `integer ${CLUTCH_REVIEW_COUNT} (Fact Sheet: 10 reviews)`,
          `Set reviewCount to ${CLUTCH_REVIEW_COUNT}.`,
        ),
      );
    } else if (typeof rc !== "number" || !Number.isInteger(rc)) {
      items.push(
        problemItem(
          entry,
          "reviewCount",
          String(rc),
          `integer ${CLUTCH_REVIEW_COUNT} (Fact Sheet: 10 reviews)`,
          `reviewCount must be an integer (${CLUTCH_REVIEW_COUNT}).`,
        ),
      );
    } else if (rc !== CLUTCH_REVIEW_COUNT) {
      items.push(
        problemItem(
          entry,
          "reviewCount",
          String(rc),
          `${CLUTCH_REVIEW_COUNT} (Fact Sheet)`,
          `Set reviewCount to ${CLUTCH_REVIEW_COUNT}.`,
          "warn",
        ),
      );
    }
  }
  return items;
}

function collectUrlStrings(value: unknown, out: string[]): void {
  if (typeof value === "string") {
    if (/^https?:\/\//i.test(value)) out.push(value);
    return;
  }
  if (Array.isArray(value)) {
    for (const v of value) collectUrlStrings(v, out);
    return;
  }
  if (value && typeof value === "object") {
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      if (/url|sameas|@id/i.test(k)) collectUrlStrings(v, out);
      else if (typeof v === "string" && /^https?:\/\//i.test(v)) out.push(v);
      else collectUrlStrings(v, out);
    }
  }
}

export async function codeProblemsSchemaUrls(
  catalog: SiteWideSchemaEntry[],
  config: AuditConfig,
  linkChecker: (url: string) => Promise<{ status: number; finalUrl: string }>,
): Promise<CheckItem[]> {
  const items: CheckItem[] = [];
  const allowedService = new Set(
    Object.values(config.site.service_pages).map((u) => u.replace(/\/$/, "")),
  );

  for (const entry of catalog) {
    const urls: string[] = [];
    collectUrlStrings(entry.sample, urls);
    const seen = new Set<string>();
    for (const raw of urls) {
      let abs = raw;
      try {
        abs = new URL(raw, config.site.base_url).href;
      } catch {
        continue;
      }
      if (seen.has(abs)) continue;
      seen.add(abs);
      if (!abs.includes(new URL(config.site.base_url).hostname)) continue;

      const res = await linkChecker(abs);
      if (res.status !== 200) {
        items.push(
          problemItem(
            entry,
            "url",
            abs,
            "HTTP 200",
            `Fix or remove URL in site-wide schema (got HTTP ${res.status}).`,
          ),
        );
        continue;
      }

      const norm = abs.replace(/\/$/, "");
      const isServicePath = norm.includes("/services/") || norm.includes("/solutions/");
      if (isServicePath && allowedService.size > 0 && ![...allowedService].some((s) => norm === s || norm.startsWith(s))) {
        items.push(
          problemItem(
            entry,
            "url",
            abs,
            `service page from decisions.md (${[...allowedService].join(" or ")})`,
            "Point schema URL to an approved service page.",
            "warn",
          ),
        );
      }
    }
  }
  return items;
}

export function catalogNodeSummaries(catalog: SiteWideSchemaEntry[]) {
  return catalog.map((c) => ({
    type: c.type || nodeTypeLabel(c.sample),
    name: c.name || nodeDisplayName(c.sample),
    page_count: c.page_count,
    node: c.sample,
  }));
}
