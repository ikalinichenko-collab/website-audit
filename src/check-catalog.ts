import type { FixWhere } from "./findings.js";

/** Groups of the Site page's check table, in display order. `style` is kept apart: it never counts in the summary. */
export type CheckGroup = "indexing" | "meta" | "schema" | "links" | "images" | "ai" | "positioning" | "style";

export const CHECK_GROUPS: { key: CheckGroup; title: string; blurb: string }[] = [
  { key: "indexing", title: "Crawling, indexing and page basics", blurb: "Can search engines reach, read and index every page?" },
  { key: "meta", title: "Titles, descriptions and headings", blurb: "What search results and link previews show for each page." },
  { key: "schema", title: "Structured data", blurb: "Machine-readable markup that search engines and AI answers rely on." },
  { key: "links", title: "Links and site structure", blurb: "Whether pages are connected and the links work." },
  { key: "images", title: "Images", blurb: "Alt text and sizes." },
  { key: "ai", title: "AI access (GEO)", blurb: "Can AI crawlers read the site?" },
  { key: "positioning", title: "Positioning in the markup (GEO)", blurb: "Approved wording where AI answers and search results read it first." },
  { key: "style", title: "Writing style (GEO)", blurb: "House style rules. Many small findings: kept apart so they do not hide the important ones." },
];

export interface CatalogEntry {
  layer: "seo" | "geo";
  group: CheckGroup;
  /** the rule in the positive form: what a healthy page does */
  title: string;
  /** why it matters */
  why: string;
  fix: string;
  where: FixWhere;
}

const seo = (group: CheckGroup, title: string, why: string, fix: string, where: FixWhere): CatalogEntry => ({ layer: "seo", group, title, why, fix, where });
const geo = (group: CheckGroup, title: string, why: string, fix: string, where: FixWhere): CatalogEntry => ({ layer: "geo", group, title, why, fix, where });

/** Plain-language text per check id: page checks (config/seo.json, config/geo.json) and the site-only checks. */
export const CHECK_CATALOG: Record<string, CatalogEntry> = {
  // ---- crawling, indexing and page basics ----
  http_status: seo("indexing", "Page answers 200", "A page that redirects or errors cannot rank and wastes crawl budget.", "Fix the URL, or put the final URL in the sitemap and links.", "page"),
  canonical: seo("indexing", "Canonical points to the page itself", "A wrong canonical tells search engines to index a different URL.", "Set a self-referencing canonical in the SEO plugin.", "template"),
  indexable: seo("indexing", "Page can be indexed (no noindex)", "A noindex page drops out of search and AI answers.", "Remove noindex in the page's SEO settings.", "page"),
  html_lang: seo("indexing", "Page language is declared", "Search engines and AI use it to pick the language of the answer.", "Set the lang attribute of <html> in the theme.", "template"),
  viewport: seo("indexing", "Mobile viewport is set", "Without it the page is treated as not mobile-friendly.", "Add the viewport meta tag to the theme.", "template"),
  sitemap_hygiene: seo("indexing", "Sitemap lists only clean pages", "A sitemap should list pages that answer 200, are indexable and are their own canonical.", "Remove the URL from the sitemap or fix the page it points to.", "template"),
  // ---- titles, descriptions and headings ----
  title_length: seo("meta", "Title is 30 to 60 characters", "Longer titles are cut in search results; very short ones say too little.", "Rewrite the title. For a templated section (glossary, hire) change the title pattern once.", "page"),
  meta_present: seo("meta", "Meta description is present", "Search engines show their own random excerpt when it is missing.", "Write a meta description in the page's SEO settings.", "page"),
  meta_length: seo("meta", "Meta description is 120 to 158 characters", "Outside this range it is cut or looks thin in results.", "Rewrite the meta description. For a templated section change the pattern once.", "page"),
  h1_count: seo("meta", "Exactly one H1", "The H1 tells search engines and AI what the page is about.", "Make the main heading the only H1.", "page"),
  title_h1_match: seo("meta", "Title and H1 say the same thing", "A title and H1 about different things confuse search engines.", "Align the title and the H1.", "page"),
  heading_order: seo("meta", "No heading level is skipped", "Skipped levels (H2 to H4) blur the page outline for search engines and screen readers.", "Fix the heading levels in the content.", "page"),
  thin_content: seo("meta", "Page has enough text", "Very short pages rarely rank and give AI little to quote.", "Add real content, or merge or remove the page.", "page"),
  og_present: seo("meta", "Open Graph tags are present", "They control the title, text and image of a shared link.", "Set og:title, og:description and og:image in the SEO plugin.", "template"),
  og_url_canonical: seo("meta", "og:url equals the canonical", "A different og:url splits shares between two URLs.", "Fix og:url in the SEO plugin.", "template"),
  twitter_card: seo("meta", "twitter:card is present", "Without it shared links on X look plain.", "Set twitter:card in the SEO plugin.", "template"),
  duplicate_title: seo("meta", "Titles are unique", "The same title on several pages makes them compete with each other.", "Give each page its own title.", "page"),
  duplicate_meta: seo("meta", "Meta descriptions are unique", "The same description on several pages makes them look alike in results.", "Give each page its own description.", "page"),
  duplicate_h1: seo("meta", "H1 headings are unique", "The same H1 on several pages makes them compete with each other.", "Give each page its own H1.", "page"),
  // ---- structured data ----
  jsonld_valid: seo("schema", "JSON-LD parses", "Broken JSON-LD is ignored by search engines.", "Fix the markup in the theme or the SEO plugin.", "template"),
  schema_required: seo("schema", "Required structured data is present", "The page type needs this markup (for example Article or Service) to be understood and shown properly.", "Add the missing type in the SEO plugin or the theme.", "template"),
  schema_recommended: seo("schema", "Recommended structured data is present", "Markup such as BreadcrumbList helps search engines show the page's place on the site.", "Turn it on in the SEO plugin; usually one change for the whole page type.", "template"),
  article_fields: seo("schema", "Article markup has all its fields", "Headline, dates, author, image and publisher are what Article results need.", "Fill the missing fields in the page or the SEO plugin.", "page"),
  author: seo("schema", "Author is named", "A named author is a trust signal for search engines and AI answers.", "Set the post author.", "author"),
  dates: seo("schema", "Publication and modified dates are in the markup", "Fresh, dated content is preferred by search engines and AI answers.", "Make the template output datePublished and dateModified.", "template"),
  date_mismatch: seo("schema", "Visible date matches dateModified", "A visible date that differs from the markup looks careless and can mislead.", "Make the visible date and dateModified come from the same field.", "template"),
  faq_schema_matches_dom: seo("schema", "FAQ markup matches the page", "FAQ markup without a visible FAQ (or the reverse) is ignored or penalised.", "Show the FAQ on the page, or remove the FAQPage markup.", "page"),
  // ---- links and site structure ----
  broken_internal_links: seo("links", "Internal links work", "Broken links waste crawl budget and frustrate visitors.", "Update or remove the link.", "page"),
  redirecting_internal_links: seo("links", "Internal links go straight to the page", "A link through a redirect is slower and loses a little ranking signal.", "Link to the final URL.", "page"),
  link_to_services: seo("links", "Page links to a service page", "Content pages should lead readers and search engines to what the company sells.", "Add a link to the most relevant /services/ page.", "page"),
  anchors_resolve: seo("links", "Anchor links have a target", "A #link with no matching id does nothing.", "Fix the anchor or the id.", "page"),
  orphan_page: seo("links", "Every page is linked from another page", "A page nothing links to is hard for search engines to find and looks unimportant.", "Link to it from a relevant page or a listing, or remove it if obsolete.", "page"),
  // ---- images ----
  alt_missing: seo("images", "Images have an alt attribute", "Alt text is how search engines and screen readers understand an image.", "Add alt text.", "page"),
  alt_empty: seo("images", "Images have non-empty alt text", "An empty alt tells search engines the image is decoration.", "Describe meaningful images; leave it empty only for decoration.", "page"),
  image_dimensions: seo("images", "Images have width and height", "Without sizes the page jumps while loading (a layout shift).", "Output width and height attributes in the theme.", "template"),
  // ---- AI access (GEO) ----
  robots_ai_bots: geo("ai", "robots.txt lets AI bots in", "A blocked bot cannot read the site and cannot cite it.", "Remove the Disallow rule for the bot in robots.txt.", "template"),
  llms_txt: geo("ai", "llms.txt is present", "A file that tells AI assistants what the site is and which pages matter.", "Publish /llms.txt.", "template"),
  // ---- positioning in the markup (GEO) ----
  home_title_exact: geo("positioning", "Home title is the approved one", "The home title is the first thing search results and AI answers say about the company.", "Set the approved title in the SEO plugin.", "page"),
  trap_terms: geo("positioning", "No trap term in title, H1, meta or og", "These terms position the company wrongly (Glossary §8).", "Rewrite the title, H1 or description without the term.", "page"),
  nearshore_not_first: geo("positioning", "No nearshore or LatAm in the hero", "The hero must not lead with nearshore wording (Glossary §9).", "Rewrite the hero.", "page"),
  faq_present: geo("positioning", "Home and service pages have an FAQ", "FAQ answers are what AI assistants quote most.", "Add a FAQ section.", "page"),
  // ---- writing style (GEO) ----
  em_dash: geo("style", "No em dash", "House style (Glossary §9).", "Replace the dash with a comma, a colon or a new sentence.", "page"),
  ampersand: geo("style", "\"and\" instead of \"&\"", "House style (Glossary §9); \"Data & AI\" and brand names are allowed.", "Write \"and\", or add the name to the allow-list in GEO settings.", "page"),
  uk_spelling: geo("style", "US spelling", "House style (Glossary §9).", "Use the US spelling.", "page"),
};
