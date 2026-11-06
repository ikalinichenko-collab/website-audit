import { loadSettings } from "./config.js";
import { closeDb, migrate } from "./db.js";
import { loadResources } from "./resources.js";
import { latestRunId, rebuildRun } from "./store.js";

/** Recomputes text-fragment links, page rows and counts of a stored run (after a change in the locator or the findings). */
async function main(): Promise<void> {
  await migrate();
  await loadResources();
  const runId = process.argv[2] || (await latestRunId());
  if (!runId) throw new Error("No run found");
  const pages = await rebuildRun(runId, loadSettings());
  console.log(`Rebuilt ${pages} pages of run ${runId}`);
}

main()
  .catch((e) => {
    console.error(e instanceof Error ? e.message : e);
    process.exitCode = 1;
  })
  .finally(() => closeDb());
