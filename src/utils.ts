import { createHash } from "node:crypto";
import path from "node:path";

export function urlToSlug(url: string): string {
  try {
    const u = new URL(url);
    let p = u.pathname.replace(/\/$/, "") || "home";
    p = p.replace(/^\//, "").replace(/\//g, "_");
    if (!p) p = "home";
    const hash = createHash("sha256").update(url).digest("hex").slice(0, 8);
    return `${p}_${hash}`;
  } catch {
    return createHash("sha256").update(url).digest("hex").slice(0, 16);
  }
}

export function sha256(text: string): string {
  return createHash("sha256").update(text).digest("hex");
}

export function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

export function runIdNow(): string {
  return new Date().toISOString().replace(/[:.]/g, "-");
}

export function truncateWords(text: string, max: number): string {
  const words = text.trim().split(/\s+/).filter(Boolean);
  if (words.length <= max) return words.join(" ");
  return words.slice(0, max).join(" ");
}

export function urlsMatch(a: string, b: string): boolean {
  const na = a.replace(/\/$/, "");
  const nb = b.replace(/\/$/, "");
  return na === nb || `${na}/` === b || `${nb}/` === a;
}

export function isInternal(href: string, baseUrl: string): boolean {
  try {
    const u = new URL(href, baseUrl);
    const base = new URL(baseUrl);
    return u.hostname === base.hostname;
  } catch {
    return false;
  }
}

export function collapseWhitespace(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

export function projectRoot(): string {
  return path.resolve(import.meta.dirname, "..");
}
