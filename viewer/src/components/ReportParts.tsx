import type { ReactNode } from "react";

/** One colour per layer, the same on the report tiles and everywhere else; red, amber and grey are left to severity. */
export type TileKind = "compliance" | "geo" | "seo" | "brief";

const STYLE: Record<TileKind, { top: string; name: string; selected: string; tag: string }> = {
  compliance: {
    top: "border-t-blue-600",
    name: "text-blue-700 dark:text-blue-300",
    selected: "bg-blue-50 ring-2 ring-blue-600 dark:bg-blue-950/40",
    tag: "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200",
  },
  geo: {
    top: "border-t-teal-600",
    name: "text-teal-700 dark:text-teal-300",
    selected: "bg-teal-50 ring-2 ring-teal-600 dark:bg-teal-950/40",
    tag: "bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-200",
  },
  seo: {
    top: "border-t-slate-600",
    name: "text-slate-700 dark:text-slate-300",
    selected: "bg-slate-100 ring-2 ring-slate-600 dark:bg-slate-800/60",
    tag: "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  },
  brief: {
    top: "border-t-violet-600",
    name: "text-violet-700 dark:text-violet-300",
    selected: "bg-violet-50 ring-2 ring-violet-600 dark:bg-violet-950/40",
    tag: "bg-violet-100 text-violet-800 dark:bg-violet-950 dark:text-violet-200",
  },
};

/** The colour of a layer in table headers: an inner edge on top (a border would merge with its neighbours in a table) and the name in the layer's colour. */
export const LAYER_HEAD: Record<TileKind, string> = {
  compliance: "shadow-[inset_0_3px_0_0_#2563eb] text-blue-700 dark:text-blue-300",
  geo: "shadow-[inset_0_3px_0_0_#0d9488] text-teal-700 dark:text-teal-300",
  seo: "shadow-[inset_0_3px_0_0_#475569] text-slate-700 dark:text-slate-300",
  brief: "shadow-[inset_0_3px_0_0_#7c3aed] text-violet-700 dark:text-violet-300",
};

/** The same for a card: a coloured edge on top. */
export const LAYER_CARD: Record<TileKind, string> = {
  compliance: "border-t-4 border-t-blue-600 text-blue-700 dark:text-blue-300",
  geo: "border-t-4 border-t-teal-600 text-teal-700 dark:text-teal-300",
  seo: "border-t-4 border-t-slate-600 text-slate-700 dark:text-slate-300",
  brief: "border-t-4 border-t-violet-600 text-violet-700 dark:text-violet-300",
};

const SEV: Record<string, string> = {
  high: "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200",
  medium: "bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200",
  low: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  partly: "bg-violet-100 text-violet-800 dark:bg-violet-950 dark:text-violet-200",
};

/** A small count chip: "2 medium". Zero counts are left out by the caller. */
export function SevChip({ kind, n, label }: { kind: keyof typeof SEV; n: number; label?: string }) {
  return (
    <span className={`rounded px-1.5 py-0.5 text-xs font-semibold ${SEV[kind]}`}>
      {n} {label ?? kind}
    </span>
  );
}

/**
 * A layer of the report. The tiles are the tabs: the chosen one is outlined in the layer's colour.
 * `count` null means the layer was off; `sev` lists the severity chips under the number.
 */
export function LayerTile({
  kind,
  name,
  tag,
  hint,
  count,
  countLabel = "to fix",
  sev,
  extra,
  selected,
  onClick,
  title,
}: {
  kind: TileKind;
  name: string;
  tag: string;
  hint: string;
  count: number | string | null;
  countLabel?: string;
  sev?: ReactNode;
  extra?: ReactNode;
  selected: boolean;
  onClick: () => void;
  title?: string;
}) {
  const s = STYLE[kind];
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      aria-pressed={selected}
      className={`rounded-lg border border-t-4 border-slate-200 bg-white p-3 text-left transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800 ${s.top} ${selected ? s.selected : ""}`}
    >
      <div className="flex items-baseline justify-between gap-2">
        <span className={`font-bold ${s.name}`}>{name}</span>
        <span className={`rounded px-1.5 text-[11px] font-semibold ${s.tag}`}>{tag}</span>
      </div>
      <div className="mt-1 text-3xl font-bold leading-tight tracking-tight">
        {count === null ? <span className="text-xl font-semibold text-slate-400">off</span> : typeof count === "string" ? <span className="text-xl font-semibold text-slate-400">{count}</span> : count === 0 ? <span className="text-xl font-semibold text-emerald-600 dark:text-emerald-400">no problems</span> : count}
        {count !== null && count !== 0 && typeof count !== "string" && <small className="ml-1 text-sm font-medium tracking-normal text-slate-500">{countLabel}</small>}
      </div>
      <div className="mt-0.5 text-xs text-slate-500">
        {hint}
        {extra}
      </div>
      {sev && <div className="mt-2 flex flex-wrap gap-1.5">{sev}</div>}
    </button>
  );
}

/** A status chip under the title: a neutral fact, or a good or warning one. A chip with `onClick` opens its detail. */
export function Chip({ tone = "neutral", onClick, active, title, children }: { tone?: "neutral" | "good" | "warn"; onClick?: () => void; active?: boolean; title?: string; children: ReactNode }) {
  const dot = tone === "good" ? "bg-emerald-500" : tone === "warn" ? "bg-amber-500" : "bg-slate-400";
  const cls = `inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs text-slate-700 dark:text-slate-300 ${
    active ? "border-slate-500 bg-slate-100 dark:bg-slate-800" : "border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900"
  }`;
  const inner = (
    <>
      <i className={`inline-block h-2 w-2 rounded-full ${dot}`} />
      {children}
    </>
  );
  return onClick ? (
    <button type="button" onClick={onClick} title={title} aria-expanded={active} className={`${cls} hover:border-slate-400`}>
      {inner}
    </button>
  ) : (
    <span title={title} className={cls}>
      {inner}
    </span>
  );
}

/** A box of the side column. */
export function SidePanel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-3 text-sm dark:border-slate-700 dark:bg-slate-900">
      <h3 className="mb-1.5 text-xs font-bold uppercase tracking-wide text-slate-500">{title}</h3>
      {children}
    </section>
  );
}
