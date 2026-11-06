import { NavLink, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { api, type Me } from "../api.js";
import { runLabel } from "../utils.js";
import { useRunContext } from "../context/RunContext.js";

const NAV = [
  { to: "/run", label: "Run" },
  { to: "/", label: "Overview", end: true },
  { to: "/pages", label: "Pages" },
  { to: "/site", label: "Site" },
  { to: "/sources", label: "Documents" },
  { to: "/settings", label: "Settings" },
];

export function Layout() {
  const { runs, runId, setRunId, loading, error } = useRunContext();
  const [me, setMe] = useState<Me | null>(null);

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

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-4 px-4 py-3">
          <span className="text-lg font-semibold tracking-tight">Site Audit</span>
          <nav className="flex gap-1 text-sm">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.end}
                className={({ isActive }) =>
                  `rounded px-2.5 py-1 ${
                    isActive
                      ? "bg-slate-100 font-semibold text-slate-900 dark:bg-slate-800 dark:text-white"
                      : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                  }`
                }
              >
                {n.label}
              </NavLink>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <label htmlFor="run-select" className="text-xs text-slate-500">
              Results of
            </label>
            <select
              id="run-select"
              className="rounded border border-slate-300 bg-white px-2 py-1 text-sm dark:border-slate-600 dark:bg-slate-900"
              value={runId}
              disabled={loading || !runs.length}
              onChange={(e) => setRunId(e.target.value)}
            >
              {runs.length === 0 && <option value="">no runs yet</option>}
              {runs.map((r) => (
                <option key={r.id} value={r.id}>
                  {runLabel(r)} ({r.pages_checked} pages)
                </option>
              ))}
            </select>
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
        {error && (
          <p className="bg-red-50 px-4 py-2 text-sm text-red-700 dark:bg-red-950 dark:text-red-200">{error}</p>
        )}
      </header>
      <main className="mx-auto max-w-7xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
