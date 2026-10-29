import "dotenv/config";
import { rebuildReports } from "./pipeline.js";

const runId = process.argv.slice(2).filter((a) => a !== "--")[0];
rebuildReports(runId);
console.log(`Reports rebuilt for ${runId ?? "latest"}`);
