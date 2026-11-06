import * as fs from "node:fs";
import path from "node:path";
import { db } from "./db.js";
import { shownName } from "./users.js";
import { projectRoot } from "./utils.js";

/**
 * Text of the editable files (sources, prompts, config) as an in-memory snapshot of the database,
 * so the config loaders stay synchronous. Until `loadResourceSnapshot` has run (diagnostic scripts without
 * a database) they read the files in the repo instead.
 */

const ROOT = projectRoot();
const MAX_VERSIONS = 31; // the current text plus 30 earlier ones

interface Entry {
  content: string;
  ts: string;
  modified: string;
}

const byFile = new Map<string, Entry>();
let loaded = false;

export interface ResourceRef {
  id: string;
  file: string;
}

export interface VersionInfo {
  ts: string;
  size: number;
  author: string | null;
}

export const tsNow = (): string => new Date().toISOString().replace(/[:.]/g, "-");

const lf = (s: string): string => s.replace(/\r\n/g, "\n");

/** Current text of a file by its repo-relative path (for example `config/seo.json`). */
export function resourceText(file: string): string {
  const e = byFile.get(file);
  if (e) return e.content;
  if (loaded) throw new Error(`Resource ${file} is not in the database`);
  return fs.readFileSync(path.join(ROOT, file), "utf8");
}

export function resourceMeta(file: string): { size: number; modified: string | null } {
  const e = byFile.get(file);
  return e ? { size: Buffer.byteLength(e.content, "utf8"), modified: e.modified } : { size: 0, modified: null };
}

/** First copy of a resource: the repo file (and the old `.history` files of it, if any). */
async function seed(r: ResourceRef): Promise<void> {
  const file = path.join(ROOT, r.file);
  if (!fs.existsSync(file)) throw new Error(`Cannot seed ${r.id}: ${r.file} is missing`);
  const old = path.join(ROOT, ".history", r.id);
  if (fs.existsSync(old)) {
    for (const ts of fs.readdirSync(old).filter((f) => /^[0-9T-]+Z$/.test(f))) {
      await db().query("INSERT INTO resource_versions (resource_id, ts, content, author) VALUES ($1, $2, $3, 'history') ON CONFLICT DO NOTHING", [
        r.id,
        ts,
        lf(fs.readFileSync(path.join(old, ts), "utf8")),
      ]);
    }
  }
  await db().query("INSERT INTO resource_versions (resource_id, ts, content, author) VALUES ($1, $2, $3, 'seed') ON CONFLICT DO NOTHING", [
    r.id,
    tsNow(),
    lf(fs.readFileSync(file, "utf8")),
  ]);
}

/** Reads the newest version of every resource from the database; seeds the ones it does not have yet. */
export async function loadResourceSnapshot(list: ResourceRef[]): Promise<string[]> {
  const seeded: string[] = [];
  const have = new Set((await db().query<{ resource_id: string }>("SELECT DISTINCT resource_id FROM resource_versions")).rows.map((x) => x.resource_id));
  for (const r of list) {
    if (!have.has(r.id)) {
      await seed(r);
      seeded.push(r.id);
    }
  }
  const rows = (
    await db().query<{ resource_id: string; ts: string; content: string; created_at: Date }>(
      "SELECT DISTINCT ON (resource_id) resource_id, ts, content, created_at FROM resource_versions ORDER BY resource_id, ts DESC",
    )
  ).rows;
  for (const r of list) {
    const row = rows.find((x) => x.resource_id === r.id);
    if (!row) throw new Error(`Resource ${r.id} has no version in the database`);
    byFile.set(r.file, { content: row.content, ts: row.ts, modified: row.created_at.toISOString() });
  }
  loaded = true;
  return seeded;
}

/** Earlier versions of a resource, newest first (the current one is not listed). */
export async function listVersions(r: ResourceRef): Promise<VersionInfo[]> {
  const rows = (
    await db().query<{ ts: string; size: number; author: string | null }>(`SELECT ts, octet_length(content) AS size, CASE WHEN author IS NULL OR author IN ('seed', 'history') THEN NULL ELSE ${shownName("author")} END AS author FROM resource_versions WHERE resource_id = $1 ORDER BY ts DESC OFFSET 1`, [r.id])
  ).rows;
  return rows.map((x) => ({ ts: x.ts, size: Number(x.size), author: x.author }));
}

export async function readVersion(r: ResourceRef, ts: string): Promise<string | null> {
  if (!/^[0-9T-]+Z$/.test(ts)) return null;
  const rows = (await db().query<{ content: string }>("SELECT content FROM resource_versions WHERE resource_id = $1 AND ts = $2", [r.id, ts])).rows;
  return rows[0]?.content ?? null;
}

/** Stores a new current version, drops the oldest beyond the limit and updates the snapshot. */
export async function saveVersion(r: ResourceRef, content: string, author: string | null): Promise<void> {
  const ts = tsNow();
  await db().query("INSERT INTO resource_versions (resource_id, ts, content, author) VALUES ($1, $2, $3, $4)", [r.id, ts, content, author]);
  await db().query(
    "DELETE FROM resource_versions WHERE resource_id = $1 AND ts NOT IN (SELECT ts FROM resource_versions WHERE resource_id = $1 ORDER BY ts DESC LIMIT $2)",
    [r.id, MAX_VERSIONS],
  );
  byFile.set(r.file, { content, ts, modified: new Date().toISOString() });
}
