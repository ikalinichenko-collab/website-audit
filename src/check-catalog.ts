import type { FixWhere } from "./findings.js";
import { resourceText } from "./resource-store.js";

/** A group of the Site page's check table. A group with `apart` is kept out of the summary counts (writing style). */
export interface CheckGroupDef {
  key: string;
  title: string;
  blurb: string;
  apart?: boolean;
}

/** Plain-language text of one check. The logic of the check is in code; this is what the page says about it. */
export interface CatalogEntry {
  layer: "seo" | "geo";
  group: string;
  /** the rule in the positive form: what a healthy page does */
  title: string;
  /** why it matters */
  why: string;
  fix: string;
  where: FixWhere;
}

export interface ChecksConfig {
  groups: CheckGroupDef[];
  checks: Record<string, CatalogEntry>;
  /** a few plain sentences under each block of the Site page, by block key (snapshot, summary, fix_first, all_checks, template_text, coverage) */
  blocks?: Record<string, string>;
}

let cache: { text: string; value: ChecksConfig } | null = null;

/** `config/checks.json`: the groups and the texts of every check (editable in Settings). */
export function loadChecksConfig(): ChecksConfig {
  const text = resourceText("config/checks.json");
  if (cache?.text !== text) cache = { text, value: JSON.parse(text) as ChecksConfig };
  return cache.value;
}

/** The entry of a check id; a check the file does not describe still shows, named by its id, in the first group. */
export function catalogEntry(cfg: ChecksConfig, id: string, layer: "seo" | "geo"): CatalogEntry {
  return cfg.checks[id] ?? { layer, group: cfg.groups[0]?.key ?? "", title: id, why: "", fix: "", where: "page" };
}
