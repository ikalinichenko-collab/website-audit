import "dotenv/config";
import { runScan } from "./pipeline.js";
import { setVerbose } from "./log.js";

function parseArgs(argv: string[]): {
  urls: string[];
  all: boolean;
  limit?: number;
  force: boolean;
  skipLlm: boolean;
  useCachedPage: boolean;
  verbose: boolean;
} {
  const filtered = argv.filter((a) => a !== "--");
  let all = false;
  let limit: number | undefined;
  let force = false;
  let skipLlm = false;
  let useCachedPage = false;
  let verbose = false;
  const urls: string[] = [];

  for (let i = 0; i < filtered.length; i++) {
    const a = filtered[i]!;
    if (a === "--all") all = true;
    else if (a === "--force") force = true;
    else if (a === "--skip-llm") skipLlm = true;
    else if (a === "--use-cached") useCachedPage = true;
    else if (a === "--verbose") verbose = true;
    else if (a === "--limit") {
      limit = parseInt(filtered[i + 1] ?? "", 10);
      i++;
    } else if (a.startsWith("http://") || a.startsWith("https://")) {
      urls.push(a);
    }
  }

  return { urls, all, limit, force, skipLlm, useCachedPage, verbose };
}

async function main(): Promise<void> {
  const { urls, all, limit, force, skipLlm, useCachedPage, verbose } = parseArgs(
    process.argv.slice(2),
  );
  setVerbose(verbose);

  if (!all && !limit && urls.length === 0) {
    console.error("Usage: pnpm scan --all | pnpm scan --limit N | pnpm scan <url> [...]");
    process.exit(1);
  }

  const runId = await runScan({
    urls: urls.length ? urls : undefined,
    all: all || Boolean(limit),
    limit,
    force,
    skipLlm,
    useCachedPage,
  });

  console.log(`Run complete: results/${runId}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
