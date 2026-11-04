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
