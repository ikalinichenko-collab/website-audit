import path from "node:path";
import { projectRoot } from "./utils.js";
import { resolveLatestRunId, runDir } from "./paths.js";
import { loadSettings } from "./config.js";
import { writeRunOutputs } from "./run-output.js";

function runPathFromArg(): string {
  const arg = process.argv[2];
  if (arg) return path.isAbsolute(arg) ? arg : path.join(projectRoot(), "results", arg);
  const latest = resolveLatestRunId();
  if (!latest) throw new Error("No results run found");
  return runDir(latest);
}

const runPath = runPathFromArg();
const { pages } = writeRunOutputs(runPath, loadSettings());
console.log(`Reports rebuilt for ${pages} pages in ${runPath}`);
