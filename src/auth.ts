import * as crypto from "node:crypto";
import type * as http from "node:http";
import { OAuth2Client } from "google-auth-library";

/**
 * Sign-in with Google, limited to one Workspace domain. The server checks the ID token itself (signature, audience,
 * expiry, nonce, `email_verified`, `hd`); the `hd` URL parameter only steers the Google account picker.
 * The session is a signed httpOnly cookie. All accounts of the domain have the same rights.
 *
 * Environment: GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, SESSION_SECRET (32+ characters), PUBLIC_URL (https://host, or
 * http://127.0.0.1:8787 locally), ALLOWED_DOMAIN (default gogloby.com). Without GOOGLE_CLIENT_ID sign-in is off, which
 * is allowed only on a loopback address.
 */

export interface User {
  /** null when sign-in is off (local work) */
  email: string | null;
  name: string;
}

const SESSION_COOKIE = "audit_session";
const LOGIN_COOKIE = "audit_login";
const SESSION_MS = 7 * 24 * 3600 * 1000;
const LOGIN_MS = 10 * 60 * 1000;
const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";

const LOCAL_USER: User = { email: null, name: "Local" };

const env = (k: string): string => (process.env[k] ?? "").trim();
const domain = (): string => (env("ALLOWED_DOMAIN") || "gogloby.com").toLowerCase();
const publicUrl = (): string => env("PUBLIC_URL").replace(/\/+$/, "");
const secure = (): boolean => publicUrl().startsWith("https://");

export function authRequired(): boolean {
  return env("GOOGLE_CLIENT_ID") !== "";
}

const LOOPBACK = new Set(["127.0.0.1", "::1", "localhost"]);

/** Throws when the settings are unsafe or incomplete; called at start of the server. */
export function checkAuthConfig(host: string): void {
  if (!authRequired()) {
    if (!LOOPBACK.has(host)) throw new Error(`Refusing to listen on ${host} without sign-in: set GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, SESSION_SECRET and PUBLIC_URL`);
    console.warn("Sign-in is off (GOOGLE_CLIENT_ID is not set): fine on this machine, never on a shared server");
    return;
  }
  for (const k of ["GOOGLE_CLIENT_SECRET", "SESSION_SECRET", "PUBLIC_URL"]) if (!env(k)) throw new Error(`${k} is required when GOOGLE_CLIENT_ID is set`);
  if (env("SESSION_SECRET").length < 32) throw new Error("SESSION_SECRET must be at least 32 characters");
  if (!/^https?:\/\/[^/]+$/.test(publicUrl())) throw new Error("PUBLIC_URL must look like https://host (no path)");
  if (!LOOPBACK.has(host) && !secure()) throw new Error("PUBLIC_URL must be https when the server is reachable from outside");
}

// ---- signed values ---------------------------------------------------------------------

function sign(payload: object): string {
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const mac = crypto.createHmac("sha256", env("SESSION_SECRET")).update(body).digest("base64url");
  return `${body}.${mac}`;
}

function unsign<T extends { x: number }>(value: string | undefined): T | null {
  if (!value) return null;
  const [body, mac] = value.split(".");
  if (!body || !mac) return null;
  const want = crypto.createHmac("sha256", env("SESSION_SECRET")).update(body).digest("base64url");
  const a = Buffer.from(mac);
  const b = Buffer.from(want);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  try {
    const data = JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as T;
    return typeof data.x === "number" && data.x > Date.now() ? data : null;
  } catch {
    return null;
  }
}

function cookies(req: http.IncomingMessage): Record<string, string> {
  const out: Record<string, string> = {};
  for (const part of (req.headers.cookie ?? "").split(";")) {
    const i = part.indexOf("=");
    if (i > 0) out[part.slice(0, i).trim()] = decodeURIComponent(part.slice(i + 1).trim());
  }
  return out;
}

function setCookie(res: http.ServerResponse, name: string, value: string, maxAgeMs: number, path: string): void {
  const attrs = [`${name}=${encodeURIComponent(value)}`, `Path=${path}`, "HttpOnly", "SameSite=Lax", `Max-Age=${Math.floor(maxAgeMs / 1000)}`];
  if (secure()) attrs.push("Secure");
  const prev = res.getHeader("Set-Cookie");
  const list = Array.isArray(prev) ? prev : prev ? [String(prev)] : [];
  res.setHeader("Set-Cookie", [...list, attrs.join("; ")]);
}

// ---- who is asking -----------------------------------------------------------------------

interface SessionData {
  e: string;
  n: string;
  x: number;
}

/** The signed-in user, or null. With sign-in off, a local user. */
export function currentUser(req: http.IncomingMessage): User | null {
  if (!authRequired()) return LOCAL_USER;
  const s = unsign<SessionData>(cookies(req)[SESSION_COOKIE]);
  return s ? { email: s.e, name: s.n } : null;
}

/** A browser form from another site must not be able to change data with the user's cookie. */
export function sameOrigin(req: http.IncomingMessage): boolean {
  const origin = req.headers.origin;
  if (!origin) return true;
  try {
    const want = publicUrl() ? new URL(publicUrl()).host : (req.headers.host ?? "");
    return new URL(origin).host === want;
  } catch {
    return false;
  }
}

// ---- routes under /auth ---------------------------------------------------------------------

function redirect(res: http.ServerResponse, to: string): void {
  res.writeHead(302, { Location: to, "Cache-Control": "no-store" });
  res.end();
}

function page(res: http.ServerResponse, status: number, title: string, html: string): void {
  res.writeHead(status, { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" });
  res.end(
    `<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title>` +
      `<body style="font-family:system-ui,sans-serif;max-width:32rem;margin:15vh auto;padding:0 1rem;color:#0f172a"><h1 style="font-size:1.25rem">${title}</h1>${html}`,
  );
}

function client(): OAuth2Client {
  return new OAuth2Client({ clientId: env("GOOGLE_CLIENT_ID"), clientSecret: env("GOOGLE_CLIENT_SECRET"), redirectUri: `${publicUrl()}/auth/callback` });
}

const safeNext = (n: string | null): string => (n && n.startsWith("/") && !n.startsWith("//") && !n.startsWith("/auth/") ? n : "/");

/** Handles /auth/login, /auth/callback, /auth/logout, /auth/logged-out. Returns false for any other path. */
export async function handleAuth(req: http.IncomingMessage, res: http.ServerResponse, url: URL): Promise<boolean> {
  if (!url.pathname.startsWith("/auth/")) return false;
  if (!authRequired()) {
    redirect(res, "/");
    return true;
  }
  const method = req.method ?? "GET";

  if (url.pathname === "/auth/login" && method === "GET") {
    const state = crypto.randomBytes(16).toString("base64url");
    const nonce = crypto.randomBytes(16).toString("base64url");
    const verifier = crypto.randomBytes(32).toString("base64url");
    const next = safeNext(url.searchParams.get("next"));
    setCookie(res, LOGIN_COOKIE, sign({ s: state, n: nonce, v: verifier, next, x: Date.now() + LOGIN_MS }), LOGIN_MS, "/auth");
    const q = new URLSearchParams({
      client_id: env("GOOGLE_CLIENT_ID"),
      redirect_uri: `${publicUrl()}/auth/callback`,
      response_type: "code",
      scope: "openid email profile",
      state,
      nonce,
      code_challenge: crypto.createHash("sha256").update(verifier).digest("base64url"),
      code_challenge_method: "S256",
      hd: domain(),
      prompt: "select_account",
    });
    redirect(res, `${GOOGLE_AUTH_URL}?${q}`);
    return true;
  }

  if (url.pathname === "/auth/callback" && method === "GET") {
    const login = unsign<{ s: string; n: string; v: string; next: string; x: number }>(cookies(req)[LOGIN_COOKIE]);
    setCookie(res, LOGIN_COOKIE, "", 0, "/auth");
    const code = url.searchParams.get("code");
    if (url.searchParams.get("error")) {
      page(res, 403, "Sign-in cancelled", `<p>Google did not sign you in (${escapeHtml(url.searchParams.get("error")!)}).</p><p><a href="/auth/login">Try again</a></p>`);
      return true;
    }
    if (!login || !code || url.searchParams.get("state") !== login.s) {
      page(res, 400, "Sign-in expired", `<p>The sign-in attempt is not valid any more.</p><p><a href="/auth/login">Try again</a></p>`);
      return true;
    }
    try {
      const c = client();
      const { tokens } = await c.getToken({ code, codeVerifier: login.v });
      if (!tokens.id_token) throw new Error("no id_token");
      const ticket = await c.verifyIdToken({ idToken: tokens.id_token, audience: env("GOOGLE_CLIENT_ID") });
      const p = ticket.getPayload();
      const email = (p?.email ?? "").toLowerCase();
      if (!p || p.nonce !== login.n) throw new Error("nonce mismatch");
      if (!p.email_verified || p.hd?.toLowerCase() !== domain() || !email.endsWith(`@${domain()}`)) {
        page(res, 403, "Not allowed", `<p>Only <b>@${escapeHtml(domain())}</b> accounts can open this app.</p><p><a href="/auth/login">Use another account</a></p>`);
        return true;
      }
      setCookie(res, SESSION_COOKIE, sign({ e: email, n: p.name ?? email, x: Date.now() + SESSION_MS }), SESSION_MS, "/");
      redirect(res, safeNext(login.next));
    } catch (e) {
      console.error("sign-in failed:", e instanceof Error ? e.message : e);
      page(res, 400, "Sign-in failed", `<p>Could not verify the Google sign-in.</p><p><a href="/auth/login">Try again</a></p>`);
    }
    return true;
  }

  if (url.pathname === "/auth/logout" && method === "POST") {
    if (!sameOrigin(req)) {
      res.writeHead(403).end();
      return true;
    }
    setCookie(res, SESSION_COOKIE, "", 0, "/");
    redirect(res, "/auth/logged-out");
    return true;
  }

  if (url.pathname === "/auth/logged-out" && method === "GET") {
    page(res, 200, "Signed out", `<p><a href="/auth/login">Sign in again</a></p>`);
    return true;
  }

  res.writeHead(404).end();
  return true;
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}
