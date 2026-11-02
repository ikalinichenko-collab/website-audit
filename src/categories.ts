export const PROBLEM_CATEGORIES = [
  "positioning",
  "old_terms",
  "discontinued_offer",
  "company_facts",
  "unknown_client",
  "client_figures",
  "cta",
  "contacts",
  "wrong_audience",
  "other",
] as const;

export type ProblemCategory = (typeof PROBLEM_CATEGORIES)[number];

export const CATEGORY_LABELS: Record<ProblemCategory | "uncategorized", string> = {
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
  uncategorized: "Uncategorized",
};

export function problemCategoryKey(raw: string | undefined): ProblemCategory | "uncategorized" {
  if (!raw) return "uncategorized";
  if ((PROBLEM_CATEGORIES as readonly string[]).includes(raw)) return raw as ProblemCategory;
  return "uncategorized";
}

export function categoryLabel(raw: string | undefined): string {
  return CATEGORY_LABELS[problemCategoryKey(raw)];
}

export function urlSection(url: string | null, source: "url" | "file"): string {
  if (source === "file") return "draft";
  if (!url) return "unknown";
  try {
    const pathname = new URL(url).pathname.replace(/\/$/, "") || "/";
    if (pathname === "/") return "home";
    const seg = pathname.replace(/^\//, "").split("/")[0];
    return seg || "home";
  } catch {
    return "unknown";
  }
}

export function stripGoGlobySuffix(title: string): string {
  return title.replace(/\s*\|\s*GoGloby\s*$/i, "").trim();
}
