import { Link, Outlet, useLocation, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api, type Me } from "../api.js";
import { useRunContext } from "../context/RunContext.js";

/** The two kinds of audit are separate: Site Checks is the snapshot of the whole site, Page Checks is the pages you checked in depth. */
const PAGE_CHECKS_TABS = [
  { to: "/pages", label: "Checked pages" },
  { to: "/add", label: "Add pages" },
  { to: "/tasks", label: "Tasks" },
  { to: "/overview", label: "Overview" },
];

/** The title of the browser tab for each screen (a page report sets its own). */
const TITLES: Record<string, string> = {
  "/site": "Site Checks",
  "/pages": "Checked pages",
  "/add": "Add pages",
  "/tasks": "Tasks",
  "/overview": "Overview",
  "/sources": "Documents",
  "/settings": "Settings",
};

const link = (active: boolean) =>
  `rounded px-2.5 py-1 ${
    active
      ? "bg-slate-100 font-semibold text-slate-900 dark:bg-slate-800 dark:text-white"
      : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
  }`;

export function Layout() {
  const { snapshots, checks, error } = useRunContext();
  const [me, setMe] = useState<Me | null>(null);
  const { pathname } = useLocation();
  const [params] = useSearchParams();

  useEffect(() => {
    api.me().then(setMe).catch(() => setMe(null));
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("audit-viewer-theme");
    if (stored === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, []);

  function toggleTheme() {
    const next = document.documentElement.classList.toggle("dark");
    localStorage.setItem("audit-viewer-theme", next ? "dark" : "light");
  }

  useEffect(() => {
    // a page report names the tab after the page: its own effect runs first, so leave /pages/<slug> alone
    if (pathname.startsWith("/pages/")) return;
    document.title = `${TITLES[pathname] ?? "Audit"} · Site Audit`;
  }, [pathname]);

  const on = (to: string) => pathname === to || pathname.startsWith(`${to}/`);
  // a page of a snapshot opened from Site Checks (?run=<snapshot>) is not part of Page Checks
  const fromSnapshot = snapshots.some((s) => s.id === params.get("run"));
  const inPageChecks = PAGE_CHECKS_TABS.some((t) => on(t.to)) || on("/run");
  // Page Checks opens on the checked pages, or on adding pages while there are none
  const pageChecksTo = (checks?.length ?? 0) > 0 ? "/pages" : "/add";

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95">
        <div className="mx-auto flex max-w-screen-2xl flex-wrap items-center gap-4 px-4 py-3">
          <span className="text-lg font-semibold tracking-tight">Site Audit</span>
          <nav className="flex gap-1 text-sm">
            <Link to="/site" className={link(on("/site") || fromSnapshot)}>
              Site Checks
            </Link>
            <Link to={pageChecksTo} className={link(inPageChecks && !fromSnapshot)}>
              Page Checks
            </Link>
            <Link to="/sources" className={link(on("/sources"))}>
              Documents
            </Link>
            <Link to="/settings" className={link(on("/settings"))}>
              Settings
            </Link>
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              className="rounded border border-slate-300 px-2 py-1 text-xs dark:border-slate-600"
              onClick={toggleTheme}
            >
              Theme
            </button>
            {me?.sign_in && (
              <form method="post" action="/auth/logout" className="flex items-center gap-2 text-xs text-slate-500">
                <span title={me.email ?? undefined}>{me.name}</span>
                <button type="submit" className="rounded border border-slate-300 px-2 py-1 dark:border-slate-600">
                  Sign out
                </button>
              </form>
            )}
          </div>
        </div>
        {inPageChecks && !fromSnapshot && (
          <div className="mx-auto flex max-w-screen-2xl gap-1 border-t border-slate-100 px-4 py-1.5 text-sm dark:border-slate-800">
            {PAGE_CHECKS_TABS.map((t) => (
              <Link key={t.to} to={t.to} className={link(on(t.to))}>
                {t.label}
              </Link>
            ))}
          </div>
        )}
        {error && (
          <p className="bg-red-50 px-4 py-2 text-sm text-red-700 dark:bg-red-950 dark:text-red-200">{error}</p>
        )}
      </header>
      <main className="mx-auto max-w-screen-2xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
