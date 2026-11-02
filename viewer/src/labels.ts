export const CATEGORY_LABELS: Record<string, string> = {
  positioning: "Positioning",
  old_terms: "Old terms",
  discontinued_offer: "Discontinued offer",
  company_facts: "Company facts",
  unknown_client: "Client not in Fact Sheet",
  client_figures: "Client figures",
  cta: "CTA",
  contacts: "Contacts",
  wrong_audience: "Wrong audience",
  other: "Other",
};

export const GROUP_ORDER = ["Services", "Company", "Resources", "Solutions", "Site", "Other"];

export const ACTION_COLUMNS = [
  { key: "rewrite", label: "Rewrite" },
  { key: "needs_decision", label: "Needs decision" },
  { key: "fix", label: "Fix" },
  { key: "keep", label: "Keep" },
  { key: "not_checked", label: "Not checked" },
] as const;

export const ACTION_ORDER: Record<string, number> = {
  rewrite: 0,
  needs_decision: 1,
  fix: 2,
  keep: 3,
  not_checked: 4,
};

export const LAYER_LABELS = { compliance: "Compliance", geo: "GEO", seo: "SEO" } as const;

export function categoryLabel(key: string): string {
  return CATEGORY_LABELS[key] ?? key;
}
