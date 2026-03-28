import { getProgramBySlug } from "@ossperks/core";
import { Command } from "commander";

import { programDetail, error } from "../utils/format.js";
import { closestId } from "../utils/id.js";
import { track } from "../utils/telemetry.js";

export const showCommand = new Command("show")
  .alias("info")
  .description("Show details for a specific OSS perk program")
  .argument("<id>", "program id (e.g. vercel, sentry, github-copilot)")
  .option("--json", "output as JSON")
  .action((id: string, opts: { json?: boolean }) => {
    const program = getProgramBySlug(id);

    if (!program) {
      const suggestion = closestId(id);
      const hint = suggestion === null ? "" : ` Did you mean "${suggestion}"?`;
      error(`Unknown program id "${id}".${hint}`);
      process.exit(1);
    }

    track("cli:show");

    if (opts.json) {
      console.log(JSON.stringify(program, null, 2));
      return;
    }

    programDetail(program);
  });
