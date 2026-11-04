import { runAudit, runAuditDraft } from "./audit.js";
import { loadSettings } from "./config.js";
import { scopeGroups } from "./scope.js";
import { ALL_LAYERS, type Layers } from "./types.js";

function parseArgs(argv: string[]): {
  urls: string[];
  draftFile?: string;
  draftType?: string;
  limit?: number;
  all?: boolean;
  force?: boolean;
  noLlm?: boolean;
  layers: Layers;
  model?: string;
  subsections?: string[];
} {
  const urls: string[] = [];
  let draftFile: string | undefined;
  let draftType: string | undefined;
  let limit: number | undefined;
  let all = false;
  let force = false;
  let noLlm = false;
  let model: string | undefined;
  const layers: Layers = { ...ALL_LAYERS };
  const subsections: string[] = [];
  const groups = scopeGroups(loadSettings());
  const fail = (msg: string): never => {
    console.error(msg);
    process.exit(1);
  };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]!;
    if (a === "--file") {
      draftFile = argv[++i];
    } else if (a === "--type") {
      draftType = argv[++i];
    } else if (a === "--limit") {
      limit = Number(argv[++i]);
    } else if (a === "--all") {
      all = true;
    } else if (a === "--force") {
      force = true;
    } else if (a === "--no-llm") {
      noLlm = true;
    } else if (a === "--no-compliance") {
      layers.compliance = false;
    } else if (a === "--no-geo") {
      layers.geo = false;
    } else if (a === "--no-seo") {
      layers.seo = false;
    } else if (a === "--model") {
      model = argv[++i];
    } else if (a === "--category") {
      const name = argv[++i] ?? "";
      const g = groups.find((x) => x.category.toLowerCase() === name.toLowerCase());
      if (!g) fail(`Unknown category "${name}". Known: ${groups.map((x) => x.category).join(", ")}`);
      subsections.push(...g!.subsections.map((s) => s.key));
    } else if (a === "--subsection") {
      const name = argv[++i] ?? "";
      const all = groups.flatMap((x) => x.subsections);
      const s = all.find((x) => x.key.toLowerCase() === name.toLowerCase() || x.name.toLowerCase() === name.toLowerCase());
      if (!s) fail(`Unknown subsection "${name}". Known: ${all.map((x) => x.key).join(", ")}`);
      subsections.push(s!.key);
    } else if (a.startsWith("http")) {
      urls.push(a);
    } else if (a.startsWith("-")) {
      fail(`Unknown option: ${a}`);
    }
  }
  return { urls, draftFile, draftType, limit, all, force, noLlm, layers, model, subsections: subsections.length ? [...new Set(subsections)] : undefined };
}

const opts = parseArgs(process.argv.slice(2));
if (!opts.draftFile && !opts.all && !opts.limit && !opts.urls.length && !opts.subsections) {
  console.error(
    "Usage: pnpm scan <url>... | --file <path> | --limit N | --all | --category <name>... | --subsection <name>...\n" +
      "       [--force] [--no-llm] [--no-compliance] [--no-geo] [--no-seo] [--model <id>]",
  );
  process.exit(1);
}

(opts.draftFile ? runAuditDraft(opts.draftFile, opts.draftType, { layers: opts.layers, model: opts.model }) : runAudit(opts))
  .then((runId) => console.log(`Run: results/${runId}`))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
