import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import path from "node:path";
import type { AuditConfig } from "./types.js";

const ROOT = path.resolve(import.meta.dirname, "..");

export function projectRoot(): string {
  return ROOT;
}

export function loadAuditConfig(): AuditConfig {
  const raw = readFileSync(path.join(ROOT, "config", "audit.json"), "utf8");
  return JSON.parse(raw) as AuditConfig;
}

export function fileSha256(filePath: string): string {
  const content = readFileSync(filePath);
  return createHash("sha256").update(content).digest("hex");
}

export function loadSources(): { text: string; hash: string; parts: string[] } {
  const config = loadAuditConfig();
  const parts: string[] = [];
  for (const rel of config.sources.files) {
    const full = path.join(ROOT, rel);
    parts.push(readFileSync(full, "utf8"));
  }
  const combined = parts.join("\n");
  return {
    text: combined,
    hash: createHash("sha256").update(combined).digest("hex"),
    parts,
  };
}

export function sourcesPrefixForLlm(): string {
  const config = loadAuditConfig();
  const headings = ["# decisions.md", "# GoGloby Fact Sheet.md", "# GoGloby Glossary.md"];
  const { parts } = loadSources();
  return headings.map((h, i) => `${h}\n\n${parts[i]}`).join("\n\n---\n\n");
}

export function checklistHash(): string {
  return fileSha256(path.join(ROOT, "docs", "checklist.md"));
}

export function auditConfigHash(): string {
  return fileSha256(path.join(ROOT, "config", "audit.json"));
}
