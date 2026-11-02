import { runAudit, runAuditDraft } from "./audit.js";

function parseArgs(argv: string[]): {
  urls: string[];
  draftFile?: string;
  draftType?: string;
  limit?: number;
  all?: boolean;
  force?: boolean;
  noLlm?: boolean;
} {
  const urls: string[] = [];
  let draftFile: string | undefined;
  let draftType: string | undefined;
  let limit: number | undefined;
  let all = false;
  let force = false;
  let noLlm = false;
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
    } else if (a.startsWith("http")) {
      urls.push(a);
    } else if (a.startsWith("-")) {
      console.error(`Unknown option: ${a}`);
      process.exit(1);
    }
  }
  return { urls, draftFile, draftType, limit, all, force, noLlm };
}

const opts = parseArgs(process.argv.slice(2));
if (!opts.draftFile && !opts.all && !opts.limit && !opts.urls.length) {
  console.error("Usage: pnpm scan <url>... | --file <path> | --limit N | --all [--force] [--no-llm]");
  process.exit(1);
}

(opts.draftFile ? runAuditDraft(opts.draftFile, opts.draftType) : runAudit(opts))
  .then((runId) => console.log(`Run: results/${runId}`))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
