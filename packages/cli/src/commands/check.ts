import { Command } from "commander";

import { runCheckCommand } from "./check-action.js";
import type { CheckOpts } from "./check-action.js";

export const checkCommand = new Command("check")
  .alias("ck")
  .description(
    "Check your project's eligibility for OSS perk programs by fetching live repo data",
  )
  .option(
    "--repo <owner/repo>",
    "explicitly specify a repo (e.g. vercel/next.js)",
  )
  .option(
    "--provider <provider>",
    'git provider to use with --repo: "github", "gitlab", "codeberg", or "gitea"',
    "github",
  )
  .option(
    "-p, --program <id>",
    "check eligibility for a specific program only (e.g. vercel, sentry)",
  )
  .option(
    "-i, --interactive",
    "interactively pick which programs to check against (TTY only)",
  )
  .option("--json", "output results as JSON")
  .action(async (opts: CheckOpts) => {
    await runCheckCommand(opts);
  });
