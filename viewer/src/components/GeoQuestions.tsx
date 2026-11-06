import type { Finding, GeoAnswerView } from "../types.js";
import { SeverityBadge } from "./Badges.js";
import { PlaceList } from "./FindingList.js";
import { GEO_LABELS } from "../labels.js";

type State = "no" | "unconfirmed" | "none" | "yes" | "na";

const STATE_ORDER: Record<State, number> = { no: 0, unconfirmed: 1, none: 2, yes: 3, na: 4 };
const SEV_ORDER: Record<string, number> = { high: 0, medium: 1, low: 2 };

const STATE_LABEL: Record<State, string> = {
  no: "No",
  unconfirmed: "No, not confirmed",
  none: "Not answered",
  yes: "Yes",
  na: "Not applicable",
};

const STATE_CLASS: Record<State, string> = {
  no: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
  unconfirmed: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  none: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  yes: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  na: "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400",
};

const STATE_HELP: Partial<Record<State, string>> = {
  unconfirmed: "The model said no, but a second look gave a different answer, so this is not counted as a problem.",
  none: "The model gave no answer to this question, even after a second try. Run the page again.",
  na: "The question does not apply to this page.",
};

function stateOf(a: GeoAnswerView): State {
  return a.answer === "no" && a.needs_confirm && a.confirmed === false ? "unconfirmed" : a.answer;
}

function Card({ a, state, places }: { a: GeoAnswerView; state: State; places: Finding[] }) {
  const title = a.title || GEO_LABELS[a.id] || a.id;
  const isNo = state === "no";
  return (
    <div
      className={`rounded-lg border bg-white p-3 dark:bg-slate-900 ${
        isNo ? "border-red-200 dark:border-red-900" : "border-slate-200 dark:border-slate-700"
      }`}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className={`rounded px-2 py-0.5 text-xs font-bold uppercase tracking-wide ${STATE_CLASS[state]}`}>{STATE_LABEL[state]}</span>
        {isNo && a.severity && <SeverityBadge severity={a.severity} />}
        <span className="font-semibold">{title}</span>
      </div>

      <div className="mt-2">
        <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Question</div>
        <p className="text-sm">{a.question || title}</p>
      </div>

      {STATE_HELP[state] && <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{STATE_HELP[state]}</p>}

      {(a.note || (a.value && a.value !== a.id)) && state !== "na" && state !== "none" && (
        <div className="mt-2">
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">{isNo ? "Why" : "Answer"}</div>
          <p className="text-sm">{[a.value && a.value !== a.id ? `(${a.value})` : "", a.note].filter(Boolean).join(" ")}</p>
        </div>
      )}

      {isNo && a.fix && (
        <div className="mt-2 rounded bg-blue-50/70 px-2 py-1.5 dark:bg-blue-950/40">
          <div className="text-xs font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">What to do</div>
          <p className="text-sm">{a.fix}</p>
        </div>
      )}

      {isNo && places.length > 0 && (
        <div className="mt-3">
          <PlaceList group={places} />
        </div>
      )}
    </div>
  );
}

/** One card per question from Settings, "no" answers first. `findings` are the page's GEO findings of these questions. */
export function GeoQuestions({ answers, findings }: { answers: GeoAnswerView[]; findings: Finding[] }) {
  if (!answers.length) return null;
  const rows = answers
    .map((a) => ({ a, state: stateOf(a) }))
    .sort(
      (x, y) =>
        STATE_ORDER[x.state] - STATE_ORDER[y.state] ||
        (x.state === "no" ? (SEV_ORDER[x.a.severity ?? "medium"]! - SEV_ORDER[y.a.severity ?? "medium"]!) : 0),
    );
  const count = (s: State) => rows.filter((r) => r.state === s).length;
  const summary = (["no", "unconfirmed", "none", "yes", "na"] as State[])
    .filter((s) => count(s) > 0)
    .map((s) => `${STATE_LABEL[s]}: ${count(s)}`)
    .join(" · ");
  return (
    <section className="space-y-3">
      <div>
        <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">Questions from Settings</h3>
        <p className="max-w-3xl text-sm text-slate-600 dark:text-slate-400">
          The questions you wrote in Settings, answered by the model for this page. A <b>No</b> is a problem: it says why and what to change.
        </p>
        <p className="mt-1 text-xs text-slate-500">{summary}</p>
      </div>
      <div className="space-y-3">
        {rows.map(({ a, state }) => (
          <Card key={a.id} a={a} state={state} places={findings.filter((f) => f.kind === a.id)} />
        ))}
      </div>
    </section>
  );
}
