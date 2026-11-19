import { useState, type ReactNode } from "react";

const KEY = "audit-viewer-help-seen";

function seen(): string[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]") as string[];
  } catch {
    return [];
  }
}

/**
 * The explanation of a screen. It is open the first time a person sees the screen, so nobody has to guess what it is for;
 * "Got it" folds it under a "?" button, which opens it again. What is folded is remembered in the browser.
 */
export function Help({ id, title = "What is this?", children }: { id: string; title?: string; children: ReactNode }) {
  const [open, setOpen] = useState(() => !seen().includes(id));

  function fold() {
    setOpen(false);
    try {
      localStorage.setItem(KEY, JSON.stringify([...new Set([...seen(), id])]));
    } catch {
      /* storage can be off: the help is then open on every visit */
    }
  }

  return (
    <div className="max-w-3xl text-sm">
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={false}
          className="inline-flex items-center gap-1.5 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
        >
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-slate-400 text-xs font-semibold">?</span>
          {title}
        </button>
      )}
      {open && (
        <div className="space-y-2 rounded-md border border-blue-200 bg-blue-50/60 p-3 text-slate-700 dark:border-blue-900 dark:bg-blue-950/30 dark:text-slate-300">
          <div className="space-y-2">{children}</div>
          <button type="button" onClick={fold} className="text-xs font-medium text-blue-700 hover:underline dark:text-blue-300">
            Got it, fold this
          </button>
        </div>
      )}
    </div>
  );
}
