import { programs } from "@ossperks/core";
import { Command } from "commander";
import pc from "picocolors";

import {
  header,
  maxIdLength,
  maxNameLength,
  programRow,
  programTableHeader,
} from "../utils/format.js";
import { track } from "../utils/telemetry.js";

export const searchCommand = new Command("search")
  .alias("find")
  .alias("s")
  .description("Search programs by name, description, tags, or perks")
  .argument("<query>", "search query")
  .option("--json", "output as JSON")
  .action((query: string, opts: { json?: boolean }) => {
    const q = query.toLowerCase();

    const results = programs.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.slug.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.provider.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.tags ?? []).some((t) => t.toLowerCase().includes(q)) ||
        p.perks.some(
          (k) =>
            k.title.toLowerCase().includes(q) ||
            k.description.toLowerCase().includes(q),
        ),
    );

    track("cli:search", {
      queryLength: query.length,
      resultCount: results.length,
    });

    if (opts.json) {
      console.log(JSON.stringify(results, null, 2));
      return;
    }

    header(
      `Search results for "${query}" — ${results.length} program${results.length === 1 ? "" : "s"}`,
    );
    console.log();

    if (results.length === 0) {
      console.log(`  ${pc.dim("No programs matched your query.")}`);
    } else {
      const padId = maxIdLength(results);
      const padName = maxNameLength(results);
      programTableHeader(padId, padName);
      for (const program of results) {
        console.log(programRow(program, padId, padName));
      }
    }
    console.log();
  });
