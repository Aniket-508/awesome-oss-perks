import {
  getCategories,
  CATEGORY_LABELS,
  getProgramsByCategory,
} from "@ossperks/core";
import { Command } from "commander";
import pc from "picocolors";

import { header } from "../utils/format.js";
import { track } from "../utils/telemetry.js";

export const categoriesCommand = new Command("categories")
  .alias("cats")
  .description("List all available program categories")
  .option("--json", "output as JSON")
  .action((opts: { json?: boolean }) => {
    const categories = getCategories();

    track("cli:categories");

    if (opts.json) {
      console.log(
        JSON.stringify(
          categories.map((c) => ({
            count: getProgramsByCategory(c).length,
            id: c,
            label: CATEGORY_LABELS[c],
          })),
          null,
          2,
        ),
      );
      return;
    }

    header(`${categories.length} categories`);
    console.log();

    const counts = categories.map((c) => getProgramsByCategory(c).length);
    const padId = Math.max(...categories.map((c) => c.length), "ID".length) + 2;
    const padName =
      Math.max(
        ...categories.map((c) => CATEGORY_LABELS[c].length),
        "NAME".length,
      ) + 2;
    const padCount = Math.max(
      "COUNT".length,
      ...counts.map((n) => String(n).length),
    );

    console.log(
      `  ${pc.dim("ID".padEnd(padId))}  ${pc.dim("NAME".padEnd(padName))}  ${pc.dim("COUNT".padStart(padCount))}`,
    );

    for (const [index, category] of categories.entries()) {
      const count = counts[index] ?? 0;
      const label = CATEGORY_LABELS[category];
      console.log(
        `  ${pc.bold(category.padEnd(padId))}  ${label.padEnd(padName)}  ${pc.dim(String(count).padStart(padCount))}`,
      );
    }
    console.log();
  });
