import { Link, Outlet, useLocation, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api, type Me } from "../api.js";
import { runLabel } from "../utils.js";
import { useRunContext } from "../context/RunContext.js";

/** The two kinds of audit are separate: Site Checks is the snapshot of the whole site, Page Checks is a run of chosen pages. */
const NAV = [
  { to: "/site", label: "Site Checks", under: ["/site"] },
  { to: "/run", label: "Page Checks", under: ["/run", "/overview", "/pages"] },
  { to: "/sources", label: "Documents", under: ["/sources"] },
  { to: "/settings", label: "Settings", under: ["/settings"] },
];

const PAGE_CHECKS_TABS = [
  { to: "/run", label: "Run" },
  { to: "/overview", label: "Overview" },
  { to: "/pages", label: "Pages" },
];

const link = (active: boolean) =>
  `rounded px-2.5 py-1 ${
    active
      ? "bg-slate-100 font-semibold text-slate-900 dark:bg-slate-800 dark:text-white"
      : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
  }`;

export function Layout() {
  const { pageRuns, snapshots, runId, setRunId, loading, error } = useRunContext();
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

  const inPageChecks = PAGE_CHECKS_TABS.some((t) => pathname === t.to || pathname.startsWith(`${t.to}/`));
  // a page of a snapshot opened from Site Checks (?run=<snapshot>) is not part of Page Checks
  const fromSnapshot = snapshots.some((s) => s.id === params.get("run"));
  const isResults = (pathname === "/overview" || pathname.startsWith("/pages")) && !fromSnapshot;
  const noPageChecks = isResults && !loading && pageRuns.length === 0;

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-4 px-4 py-3">
          <span className="text-lg font-semibold tracking-tight">Site Audit</span>
          <nav className="flex gap-1 text-sm">
            {NAV.map((n) => (
              <Link key={n.to} to={n.to} className={link(fromSnapshot ? n.to === "/site" : n.under.some((u) => pathname === u || pathname.startsWith(`${u}/`)))}>
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2">
            {isResults && pageRuns.length > 0 && (
              <>
                <label htmlFor="run-select" className="text-xs text-slate-500">
                  Page check
                </label>
                <select
                  id="run-select"
                  className="rounded border border-slate-300 bg-white px-2 py-1 text-sm dark:border-slate-600 dark:bg-slate-900"
                  value={runId}
                  disabled={loading || !pageRuns.length}
                  onChange={(e) => setRunId(e.target.value)}
                >
                  {pageRuns.length === 0 && <option value="">no page checks yet</option>}
                  {pageRuns.map((r) => (
                    <option key={r.id} value={r.id}>
                      {runLabel(r)} ({r.pages_checked} pages)
                    </option>
                  ))}
                </select>
              </>
            )}
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
          <div className="mx-auto flex max-w-7xl gap-1 border-t border-slate-100 px-4 py-1.5 text-sm dark:border-slate-800">
            {PAGE_CHECKS_TABS.map((t) => (
              <Link key={t.to} to={t.to} className={link(pathname === t.to || pathname.startsWith(`${t.to}/`))}>
                {t.label}
              </Link>
            ))}
            <span className="ml-3 self-center text-xs text-slate-500">Checks of chosen pages, with the model. They read the latest site snapshot.</span>
          </div>
        )}
        {error && (
          <p className="bg-red-50 px-4 py-2 text-sm text-red-700 dark:bg-red-950 dark:text-red-200">{error}</p>
        )}
      </header>
      <main className="mx-auto max-w-7xl px-4 py-6">
        {noPageChecks ? (
          <div className="space-y-2 rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
            <h1 className="text-lg font-semibold">No page checks yet</h1>
            <p className="max-w-2xl text-sm text-slate-600 dark:text-slate-400">
              This is where the results of checks of chosen pages appear: wording against the company documents, GEO answers and the technical checks of each page.
              The whole-site picture is on Site Checks.
            </p>
            <p className="text-sm">
              <Link to="/run" className="text-blue-600 hover:underline dark:text-blue-400">
                Start a page check
              </Link>
              {" · "}
              <Link to="/site" className="text-blue-600 hover:underline dark:text-blue-400">
                Open Site Checks
              </Link>
            </p>
          </div>
        ) : (
          <Outlet />
        )}
      </main>
    </div>
  );
}
