import { useEffect, useState } from "react";
import { api } from "../api.js";
import type { SiteTrends as Trends, TrendSnapshot } from "../types.js";
import { Help } from "./Help.js";
import { Loading } from "./Loading.js";
import { SeverityBadge } from "./Badges.js";
import { LAYER_TAG } from "./ReportParts.js";

const SEV_FILL = { high: "#dc2626", medium: "#f59e0b", low: "#94a3b8" } as const;

const dayLabel = (iso: string) => new Date(iso).toLocaleDateString([], { day: "2-digit", month: "2-digit" });
const timeLabel = (iso: string) => new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
const fullLabel = (iso: string) => `${new Date(iso).toLocaleDateString([], { day: "2-digit", month: "2-digit", year: "numeric" })} ${timeLabel(iso)}`;

/** The snapshots as columns: failing checks by severity, stacked. One chart per layer. */
function SeverityChart({ title, hint, snaps, pick }: { title: string; hint: string; snaps: TrendSnapshot[]; pick: (s: TrendSnapshot) => TrendSnapshot["seo"] }) {
  const left = 34;
  const bottom = 34;
  const top = 20;
  const step = Math.max(46, Math.min(90, 760 / snaps.length));
  const width = left + snaps.length * step + 8;
  const height = 190;
  const plot = height - bottom - top;
  const totals = snaps.map((s) => pick(s).high + pick(s).medium + pick(s).low);
  const max = Math.max(4, ...totals);
  const y = (v: number) => top + plot - (v / max) * plot;
  const ticks = [0, Math.round(max / 2), max];
  const multiDay = new Set(snaps.map((s) => dayLabel(s.started_at))).size > 1;
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900">
      <h3 className="font-semibold">{title}</h3>
      <p className="mb-1 text-xs text-slate-500">{hint}</p>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full" role="img" aria-label={title} style={{ maxHeight: 230 }}>
        {ticks.map((t) => (
          <g key={t}>
            <line x1={left} x2={width - 4} y1={y(t)} y2={y(t)} stroke="currentColor" className="text-slate-200 dark:text-slate-700" strokeWidth={1} />
            <text x={left - 6} y={y(t) + 4} textAnchor="end" fontSize={11} className="fill-slate-500">
              {t}
            </text>
          </g>
        ))}
        {snaps.map((s, i) => {
          const c = pick(s);
          const x = left + i * step + step * 0.2;
          const w = step * 0.6;
          let acc = 0;
          const segs = (["high", "medium", "low"] as const).map((k) => {
            const from = acc;
            acc += c[k];
            return { k, from, to: acc };
          });
          return (
            <g key={s.id}>
              <title>{`${fullLabel(s.started_at)}: ${c.high} high, ${c.medium} medium, ${c.low} low (${c.total} checks ran, ${s.pages} pages)`}</title>
              {segs.map((g) =>
                g.to > g.from ? <rect key={g.k} x={x} y={y(g.to)} width={w} height={y(g.from) - y(g.to)} fill={SEV_FILL[g.k]} rx={1.5} /> : null,
              )}
              <text x={x + w / 2} y={y(acc) - 4} textAnchor="middle" fontSize={11} fontWeight={600} className="fill-slate-700 dark:fill-slate-200">
                {acc}
              </text>
              <text x={x + w / 2} y={height - 17} textAnchor="middle" fontSize={10.5} className="fill-slate-500">
                {timeLabel(s.started_at)}
              </text>
              {multiDay && (
                <text x={x + w / 2} y={height - 5} textAnchor="middle" fontSize={10} className="fill-slate-400">
                  {dayLabel(s.started_at)}
                </text>
              )}
            </g>
          );
        })}
      </svg>
      <div className="mt-1 flex gap-3 text-xs text-slate-600 dark:text-slate-400">
        {(["high", "medium", "low"] as const).map((k) => (
          <span key={k} className="inline-flex items-center gap-1">
            <i className="inline-block h-2.5 w-2.5 rounded-sm" style={{ background: SEV_FILL[k] }} />
            {k}
          </span>
        ))}
      </div>
    </section>
  );
}

/** A small line of the share of pages failing a check, snapshot by snapshot. */
function Spark({ values, good }: { values: (number | null)[]; good: boolean | null }) {
  const w = 130;
  const h = 26;
  const pts = values.map((v, i) => (v === null ? null : { x: values.length === 1 ? w / 2 : (i / (values.length - 1)) * (w - 6) + 3, v }));
  const max = Math.max(0.0001, ...values.filter((v): v is number => v !== null));
  const path = pts
    .filter((p): p is { x: number; v: number } => p !== null)
    .map((p, i) => `${i ? "L" : "M"}${p.x.toFixed(1)},${(h - 3 - (p.v / max) * (h - 6)).toFixed(1)}`)
    .join(" ");
  const last = [...pts].reverse().find((p) => p !== null);
  const color = good === null ? "#64748b" : good ? "#16a34a" : "#dc2626";
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h} aria-hidden>
      <path d={path} fill="none" stroke={color} strokeWidth={1.8} strokeLinejoin="round" strokeLinecap="round" />
      {last && <circle cx={last.x} cy={h - 3 - (last.v / max) * (h - 6)} r={2.6} fill={color} />}
    </svg>
  );
}

const pct = (r: number) => `${r < 0.1 && r > 0 ? (r * 100).toFixed(1) : Math.round(r * 100)}%`;

/** Trends of the whole-site audit: do the fixes help? Worked out from the stored snapshots, nothing is fetched. */
export function SiteTrends() {
  const [data, setData] = useState<Trends | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    api
      .siteTrends()
      .then(setData)
      .catch((e) => setError(String(e instanceof Error ? e.message : e)));
  }, []);
  if (error) return <p className="text-red-600">{error}</p>;
  if (!data) return <Loading rows={5} />;
  const snaps = data.snapshots;
  if (snaps.length < 2) {
    return <p className="rounded-lg border border-dashed border-slate-300 p-6 text-sm text-slate-500 dark:border-slate-600">Trends need at least two snapshots of the site. Make another snapshot after you change something, and the lines appear here.</p>;
  }

  // the audit gets new checks over time: say where, because the bars grow when it does
  const grew = snaps
    .map((s, i) => (i === 0 ? null : { s, n: s.seo.total + s.geo.total - (snaps[i - 1]!.seo.total + snaps[i - 1]!.geo.total) }))
    .filter((x): x is { s: TrendSnapshot; n: number } => !!x && x.n > 0);

  type Row = { id: string; title: string; layer: "seo" | "geo"; severity: "high" | "medium" | "low"; values: (number | null)[]; first: number; last: number; firstOf: number; lastOf: number; delta: number; isNew: boolean };
  // a snapshot that read far fewer pages is a sample: its shares are not comparable with a full one, so the lines start at the first full snapshot
  const newest = snaps[snaps.length - 1]!;
  const full = snaps.filter((s) => s.pages >= newest.pages * 0.9);
  const sampled = snaps.length - full.length;
  const rows: Row[] = (full.length < 2 ? [] : Object.entries(data.checks))
    .map(([id, meta]) => {
      const series = full.map((s) => s.checks[id] ?? null);
      const values = series.map((c) => (c && c.total > 0 ? c.failing / c.total : null));
      const have = series.filter((c): c is { failing: number; total: number } => !!c && c.total > 0);
      if (!have.length) return null;
      const a = have[0]!;
      const b = have[have.length - 1]!;
      return { id, title: meta.title, layer: meta.layer, severity: meta.severity, values, first: a.failing / a.total, last: b.failing / b.total, firstOf: a.failing, lastOf: b.failing, delta: b.failing / b.total - a.failing / a.total, isNew: have.length === 1 };
    })
    .filter((r): r is Row => !!r);
  const worse = rows.filter((r) => !r.isNew && r.delta > 0.0005).sort((a, b) => b.delta - a.delta);
  const better = rows.filter((r) => !r.isNew && r.delta < -0.0005).sort((a, b) => a.delta - b.delta);
  const same = rows.filter((r) => !r.isNew && Math.abs(r.delta) <= 0.0005);
  const added = rows.filter((r) => r.isNew && r.last > 0);

  const table = (list: Row[], good: boolean | null) => (
    <ul className="divide-y divide-slate-100 rounded-lg border border-slate-200 bg-white text-sm dark:divide-slate-800 dark:border-slate-700 dark:bg-slate-900">
      {list.map((r) => (
        <li key={r.id} className="grid items-center gap-x-3 gap-y-1 px-3 py-2 sm:grid-cols-[minmax(0,1fr)_5rem_8.5rem_14rem]">
          <span className="min-w-0">
            <span className={`mr-1.5 rounded px-1.5 py-0.5 align-[1px] text-[11px] font-bold ${LAYER_TAG[r.layer]}`}>{r.layer.toUpperCase()}</span>
            {r.title}
          </span>
          <span>
            <SeverityBadge severity={r.severity} />
          </span>
          <Spark values={r.values} good={good} />
          <span className="tabular-nums text-slate-600 dark:text-slate-400">
            {pct(r.first)} → <b className="text-slate-900 dark:text-slate-100">{pct(r.last)}</b> of pages
            {good !== null && <span className={`ml-1 font-semibold ${good ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}>{r.delta > 0 ? "+" : "−"}{Math.abs(Math.round(r.delta * 1000) / 10)} pts</span>}
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Trends</h2>
        <Help id="site-trends" title="How to read the trends">
          <p>Each column is a snapshot of the whole site, oldest on the left. The height is how many checks fail on at least one page, split by how serious they are. The lines below show, for each check, the share of pages that fail it.</p>
          <p>A line going down usually means the fixes worked. When the audit gets a new check, or a check is changed, the numbers can move without the site changing: those snapshots are listed under the charts. Snapshots that read far fewer pages (a sample) show in the bars but not in the lines, because their shares are not comparable.</p>
        </Help>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <SeverityChart title="SEO: checks failing" hint="Technical checks of every page and of the site." snaps={snaps} pick={(s) => s.seo} />
        <SeverityChart title="GEO (code checks): checks failing" hint="Readiness for AI answers that code can check." snaps={snaps} pick={(s) => s.geo} />
      </div>
      {grew.length > 0 && (
        <p className="text-xs text-slate-500">
          The audit got new checks in: {grew.map((g) => `${fullLabel(g.s.started_at)} (+${g.n})`).join(", ")}. {snaps[0]!.pages !== snaps[snaps.length - 1]!.pages && `The first snapshot read ${snaps[0]!.pages} pages, the newest reads ${snaps[snaps.length - 1]!.pages}.`}
        </p>
      )}

      {full.length < 2 && <p className="rounded-lg border border-dashed border-slate-300 p-4 text-sm text-slate-500 dark:border-slate-600">There are fewer than two full snapshots yet, so the checks cannot be compared. Make another snapshot of the whole site.</p>}
      {sampled > 0 && full.length >= 2 && <p className="text-xs text-slate-500">{sampled === 1 ? "One snapshot is" : `${sampled} snapshots are`} left out of the lines below: read fewer pages than the newest ({newest.pages}).</p>}
      <section className="space-y-2">
        <h3 className="flex items-baseline gap-2 font-semibold">
          Got better <span className="text-sm font-normal text-slate-500">{better.length} {better.length === 1 ? "check" : "checks"}</span>
        </h3>
        {better.length ? table(better, true) : <p className="text-sm text-slate-500">No check has fewer failing pages than at the start.</p>}
      </section>
      <section className="space-y-2">
        <h3 className="flex items-baseline gap-2 font-semibold">
          Got worse <span className="text-sm font-normal text-slate-500">{worse.length} {worse.length === 1 ? "check" : "checks"}</span>
        </h3>
        {worse.length ? table(worse, false) : <p className="text-sm text-slate-500">No check has more failing pages than at the start.</p>}
      </section>
      {added.length > 0 && (
        <details className="text-sm">
          <summary className="cursor-pointer font-semibold">New checks with failing pages ({added.length})</summary>
          <div className="mt-2">{table(added, null)}</div>
        </details>
      )}
      {same.length > 0 && (
        <details className="text-sm">
          <summary className="cursor-pointer font-semibold">
            Unchanged <span className="font-normal text-slate-500">{same.length} checks, {same.filter((r) => r.last > 0).length} of them still failing</span>
          </summary>
          <div className="mt-2">{table(same.filter((r) => r.last > 0), null)}</div>
        </details>
      )}
    </div>
  );
}
