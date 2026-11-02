import type { Settings } from "./types.js";

export interface FetchResult {
  html: string;
  finalUrl: string;
  status: number;
}

export async function httpGet(url: string, settings: Settings): Promise<FetchResult> {
  let current = url;
  let status = 0;
  let html = "";
  for (let i = 0; i < 10; i++) {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), settings.fetch.timeout_ms);
    try {
      const res = await fetch(current, {
        headers: { "User-Agent": settings.fetch.user_agent },
        signal: ctrl.signal,
        redirect: "manual",
      });
      status = res.status;
      if (status >= 300 && status < 400) {
        const loc = res.headers.get("location");
        if (!loc) break;
        current = new URL(loc, current).href;
        continue;
      }
      html = await res.text();
      break;
    } finally {
      clearTimeout(t);
    }
  }
  return { html, finalUrl: current, status };
}

export async function headOrGetStatus(
  url: string,
  settings: Settings,
): Promise<{ status: number; finalUrl: string }> {
  let current = url;
  for (let i = 0; i < 10; i++) {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), settings.fetch.timeout_ms);
    try {
      let res = await fetch(current, {
        method: "HEAD",
        headers: { "User-Agent": settings.fetch.user_agent },
        signal: ctrl.signal,
        redirect: "manual",
      });
      if (res.status === 405 || res.status === 501) {
        res = await fetch(current, {
          method: "GET",
          headers: { "User-Agent": settings.fetch.user_agent },
          signal: ctrl.signal,
          redirect: "manual",
        });
      }
      if (res.status >= 300 && res.status < 400) {
        const loc = res.headers.get("location");
        if (!loc) return { status: res.status, finalUrl: current };
        current = new URL(loc, current).href;
        continue;
      }
      return { status: res.status, finalUrl: current };
    } finally {
      clearTimeout(t);
    }
  }
  return { status: 0, finalUrl: current };
}
