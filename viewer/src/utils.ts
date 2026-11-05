import type { PageIndexEntry } from "./types.js";
import { ACTION_ORDER } from "./labels.js";

export function actionKey(e: PageIndexEntry): string {
  return e.compliance.error ? "not_checked" : (e.action ?? "keep");
}

export function countCellClass(value: number, kind: "high" | "medium" | "default"): string {
  if (value === 0) return "text-slate-400 dark:text-slate-500";
  if (kind === "high") return "font-medium text-red-600 dark:text-red-400";
  if (kind === "medium") return "font-medium text-amber-600 dark:text-amber-400";
  return "tabular-nums";
}

export function formatTokens(n: number): string {
  return n.toLocaleString();
}

export function formatDuration(start: string, end: string): string {
  const sec = Math.round((new Date(end).getTime() - new Date(start).getTime()) / 1000);
  if (sec < 0) return "-";
  const m = Math.floor(sec / 60);
  return m > 0 ? `${m}m ${sec % 60}s` : `${sec}s`;
}

export function defaultSort(a: PageIndexEntry, b: PageIndexEntry): number {
  const ao = ACTION_ORDER[actionKey(a)] ?? 99;
  const bo = ACTION_ORDER[actionKey(b)] ?? 99;
  if (ao !== bo) return ao - bo;
  return b.compliance.high - a.compliance.high;
}

export function encodeTextFragment(text: string): string {
  return encodeURIComponent(text).replace(/-/g, "%2D").replace(/,/g, "%2C").replace(/&/g, "%26");
}

export function showOnPageUrl(pageUrl: string, fragment: string | null): string | null {
  return fragment ? `${pageUrl}#:~:text=${encodeTextFragment(fragment)}` : null;
}

/** Same rule as `fragmentAllowed` in src/findings.ts: these zones are not visible text, so a text fragment cannot find them. */
export function fragmentAllowed(zoneId: string): boolean {
  return !/^(title|meta_description|og_title|og_description|json_ld|banner_cta@|modals@)/.test(zoneId);
}
