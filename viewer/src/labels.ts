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

/** Where to edit site-wide JSON-LD, by schema type. A hint for the editor, not checked against the site. */
export const SCHEMA_EDIT_HINTS: Record<string, string> = {
  Organization:
    "Yoast SEO → Settings → General → Site representation (organization name, logo, social profiles) and Site basics (tagline). Fields Yoast does not have (slogan, offer catalog, ratings, awards) come from theme code or a snippet plugin.",
  WebSite: "Yoast SEO → Settings → General → Site basics (site name and tagline). The description is the WordPress tagline.",
  Person: "WordPress → Users → the author's profile (name, bio) and the Yoast fields on that profile.",
  Service: "Not a Yoast node. Search the theme code or the snippets plugin for the text (a wpseo_schema_graph_pieces filter or a hand-written JSON-LD block).",
};
export const SCHEMA_EDIT_DEFAULT =
  "Not a standard Yoast node. Search the theme code or the snippets plugin for this text.";

/** Where to edit a shared zone, by zone name. */
export const SHARED_EDIT_HINTS: Record<string, string> = {
  modals: "Site template: the form and modal markup in the theme or the form plugin. One edit changes every page.",
  banner_cta: "Site template: the banner block in the theme. One edit changes every page that uses this variant.",
};

/** What an action means for the auditor. Mirrors `deriveAction` in src/compliance.ts. */
export const ACTION_HELP: Record<string, string> = {
  rewrite: "The main message of the page contradicts the company documents. Rewrite the page.",
  needs_decision: "The page promotes something the documents no longer support. Decide first: retire it or rebuild it.",
  fix: "The page can stay. Fix the problems below.",
  keep: "No problems that need a change.",
  not_checked: "The Compliance layer did not run, so there is no verdict.",
};

/** GEO check titles. Mirrors `GEO_LABELS` in src/findings.ts. */
export const GEO_LABELS: Record<string, string> = {
  answer_first: "Opening answers the H1",
  buyer_problem: "Opens with a buyer problem",
  lead_with_hire: "Leads with the hire",
  recruiting_firm_early: "Says early that GoGloby is a recruiting firm",
  faq_quality: "FAQ answers are direct",
  buyer_ready: "Written for buyers ready to hire",
  target_keyword: "Has a matching search term",
  uses_data: "Has quotable data",
  proof_background: "Uses founders' background as proof",
  sell_against_open_role: "Compares with an open full-time role",
  home_title_exact: "Home title is the approved one",
  trap_terms: "No trap term in title, H1, meta or og",
  nearshore_not_first: "No nearshore or LatAm in the hero",
  faq_present: "Has an FAQ",
  target_keyword_placement: "Target term placement",
  em_dash: "Em dash",
  ampersand: "\"&\" instead of \"and\"",
  uk_spelling: "UK spelling",
};

/** GEO checks about style only: shown apart from the questions. */
export const GEO_STYLE_KINDS = ["em_dash", "ampersand", "uk_spelling"];

/** GEO code checks and site checks: their quote is the text that broke the rule. */
const GEO_CODE_KINDS = ["home_title_exact", "trap_terms", "nearshore_not_first", "faq_present", "target_keyword_placement", "robots_ai_bots", "llms_txt", ...GEO_STYLE_KINDS];

/** Questions whose "no" is about the text the model quotes (the opening, the FAQ answers). */
const GEO_QUOTE_IS_PROBLEM = ["answer_first", "buyer_problem", "lead_with_hire", "faq_quality"];

/**
 * A "no" to a question about something the page lacks (founders' background, a comparison): the model's quote is only the
 * nearest text, not the problem, so the finding shows where the model looked instead.
 */
export function isGeoAbsence(layer: string, kind: string): boolean {
  return layer === "geo" && !GEO_CODE_KINDS.includes(kind) && !GEO_QUOTE_IS_PROBLEM.includes(kind);
}

/** Company document ids (see src/resources.ts) by how a rule names them. */
export function ruleDocId(part: string): string | null {
  if (/^fact sheet/i.test(part)) return "fact-sheet";
  if (/^glossary/i.test(part)) return "glossary";
  if (/^decisions/i.test(part)) return "decisions";
  return null;
}

export function variantLabel(id: string): string {
  const m = id.match(/^(banner_cta|modals)@(\d+)$/);
  return m ? `${m[1] === "banner_cta" ? "Banner CTA" : "Forms"} (variant ${m[2]})` : id;
}
