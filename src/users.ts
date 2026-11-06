import { db } from "./db.js";

/** "Igor Kalinichenko" becomes "Igor K."; a single word stays as it is; without a name the part before the @ is used. */
export function displayName(fullName: string | null | undefined, email: string): string {
  const words = (fullName ?? "").trim().split(/\s+/).filter(Boolean);
  if (words.length >= 2) return `${words[0]} ${[...words[words.length - 1]!][0]!.toUpperCase()}.`;
  return words[0] ?? email.split("@")[0]!;
}

/** SQL for a column holding an email: the short name if the person has signed in, else the part before the @. */
export const shownName = (col: string): string => `COALESCE((SELECT display FROM users WHERE users.email = ${col}), split_part(${col}, '@', 1))`;

const seen = new Map<string, string>();

/** Saves the name of a signed-in person (once per process unless it changed). */
export async function rememberUser(email: string, fullName: string): Promise<string> {
  const display = displayName(fullName, email);
  if (seen.get(email) === display) return display;
  await db().query(
    "INSERT INTO users (email, display) VALUES ($1, $2) ON CONFLICT (email) DO UPDATE SET display = $2, last_seen = now()",
    [email, display],
  );
  seen.set(email, display);
  return display;
}
