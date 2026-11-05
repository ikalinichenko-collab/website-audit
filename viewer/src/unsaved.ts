import { useEffect, useId } from "react";

/** Editors that hold changes not saved yet, by a key of their own. */
const dirty = new Set<string>();

const MESSAGE = "You have unsaved changes. Leave without saving them?";

export function hasUnsaved(): boolean {
  return dirty.size > 0;
}

/** True when there is nothing unsaved or the person agreed to lose it. */
export function confirmLeave(): boolean {
  return !hasUnsaved() || window.confirm(MESSAGE);
}

/** An editor reports whether it holds unsaved changes; the report ends when the editor goes away. */
export function useUnsaved(isDirty: boolean): void {
  const key = useId();
  useEffect(() => {
    if (isDirty) dirty.add(key);
    else dirty.delete(key);
    return () => {
      dirty.delete(key);
    };
  }, [isDirty, key]);
}

/**
 * Warns before the page is left with unsaved changes: closing or reloading the tab, and following any link of the app
 * (the router has no hook to stop a link, so the click is caught first).
 */
export function installLeaveGuard(): () => void {
  const onBeforeUnload = (e: BeforeUnloadEvent) => {
    if (!hasUnsaved()) return;
    e.preventDefault();
    e.returnValue = MESSAGE;
  };
  const onClick = (e: MouseEvent) => {
    if (!hasUnsaved() || e.defaultPrevented) return;
    const a = (e.target as Element | null)?.closest?.("a[href]");
    const href = a?.getAttribute("href") ?? "";
    // links to another place of the app, not the ones that open in a new tab
    if (!a || !href.startsWith("#/") || a.getAttribute("target") === "_blank") return;
    if (!window.confirm(MESSAGE)) {
      e.preventDefault();
      e.stopPropagation();
    }
  };
  window.addEventListener("beforeunload", onBeforeUnload);
  document.addEventListener("click", onClick, true);
  return () => {
    window.removeEventListener("beforeunload", onBeforeUnload);
    document.removeEventListener("click", onClick, true);
  };
}
