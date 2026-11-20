import * as fs from "node:fs";
import path from "node:path";
import dotenv from "dotenv";
import pg from "pg";
import { projectRoot } from "./utils.js";

dotenv.config({ path: path.join(projectRoot(), ".env") });

let pool: pg.Pool | null = null;

/** The shared connection pool. `DATABASE_URL` is set by the host (Replit) or in `.env` for local work. */
export function db(): pg.Pool {
  if (!pool) {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error("DATABASE_URL is not set. Start the local database (docker compose up -d) and add DATABASE_URL to .env");
    // a hosted Postgres may close connections (restart, scale to zero): drop idle ones early and keep the rest alive
    pool = new pg.Pool({ connectionString: url, max: 8, keepAlive: true, idleTimeoutMillis: 30_000 });
    // an idle client that the server closed emits "error" on the pool: unhandled, it would stop the process
    pool.on("error", (e) => console.error("database connection error (idle client):", e.message));
    withRetry(pool);
  }
  return pool;
}

/** The server closed the connection (restart, scale to zero, admin shutdown): the same statement on a fresh connection will work. */
function isConnectionLost(e: unknown): boolean {
  const err = e as { code?: string; message?: string };
  if (err.code && (err.code.startsWith("08") || err.code === "57P01" || err.code === "57P02" || err.code === "57P03")) return true;
  if (err.code === "ECONNRESET" || err.code === "EPIPE" || err.code === "ETIMEDOUT") return true;
  return /terminating connection|connection terminated|connection error|connection closed/i.test(err.message ?? "");
}

/** Single statements run through `pool.query` are tried again (3 times, growing pause) when the connection is lost; transactions on a checked-out client are not. */
function withRetry(p: pg.Pool): void {
  const original = p.query.bind(p) as (...args: unknown[]) => unknown;
  (p as unknown as { query: (...args: unknown[]) => unknown }).query = (...args: unknown[]) => {
    // callback and query-config-with-callback forms are not used in this code base
    if (typeof args[args.length - 1] === "function") return original(...args);
    return (async () => {
      for (let attempt = 1; ; attempt++) {
        try {
          return await (original(...args) as Promise<unknown>);
        } catch (e) {
          if (attempt >= 4 || !isConnectionLost(e)) throw e;
          console.error(`database connection lost, retry ${attempt}:`, e instanceof Error ? e.message : String(e));
          await new Promise((r) => setTimeout(r, 500 * attempt * attempt));
        }
      }
    })();
  };
}

export async function closeDb(): Promise<void> {
  await pool?.end();
  pool = null;
}

/** Applies `migrations/*.sql` that have not run yet, in file order, each in one transaction. */
export async function migrate(): Promise<string[]> {
  const dir = path.join(projectRoot(), "migrations");
  const client = await db().connect();
  const applied: string[] = [];
  try {
    // one process migrates at a time, even if the app is started twice
    await client.query("SELECT pg_advisory_lock(727001)");
    await client.query("CREATE TABLE IF NOT EXISTS schema_migrations (name text PRIMARY KEY, applied_at timestamptz NOT NULL DEFAULT now())");
    const done = new Set((await client.query<{ name: string }>("SELECT name FROM schema_migrations")).rows.map((r) => r.name));
    for (const file of fs.readdirSync(dir).filter((f) => f.endsWith(".sql")).sort()) {
      if (done.has(file)) continue;
      await client.query("BEGIN");
      try {
        await client.query(fs.readFileSync(path.join(dir, file), "utf8"));
        await client.query("INSERT INTO schema_migrations (name) VALUES ($1)", [file]);
        await client.query("COMMIT");
        applied.push(file);
      } catch (e) {
        await client.query("ROLLBACK");
        throw new Error(`Migration ${file} failed: ${e instanceof Error ? e.message : String(e)}`);
      }
    }
  } finally {
    await client.query("SELECT pg_advisory_unlock(727001)").catch(() => undefined);
    client.release();
  }
  return applied;
}
