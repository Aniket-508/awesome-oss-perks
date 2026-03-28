import { note } from "@clack/prompts";
import {
  CATEGORY_LABELS,
  englishFormatter,
  formatRelativeTime,
  getCategories,
  getProgramsByCategory,
  programs,
} from "@ossperks/core";
import type { ProgramEligibility, RepoContext } from "@ossperks/core";

import {
  eligibilityRow,
  header,
  maxNameLength,
  success,
} from "../utils/format.js";
import { highlighter } from "../utils/highlighter.js";

export const printRepoSummary = (ctx: RepoContext): void => {
  const parts: string[] = [];
  if (ctx.license) {
    parts.push(ctx.license);
  }
  parts.push(`${ctx.stars.toLocaleString()} stars`);
  parts.push(`last push ${formatRelativeTime(ctx.pushedAt, englishFormatter)}`);
  if (ctx.isFork) {
    parts.push(highlighter.yellow("fork"));
  }
  if (ctx.isPrivate) {
    parts.push(highlighter.red("private"));
  }
  success(
    `${highlighter.bold(ctx.name)} ${highlighter.dim("—")} ${parts.join(highlighter.dim(" · "))}`,
  );
};

const printEligibilitySection = (
  items: ProgramEligibility[],
  padName: number,
): void => {
  for (const { program, result } of items) {
    console.log(eligibilityRow(program, result, padName));
    for (const reason of result.reasons.slice(1)) {
      console.log(
        `  ${" ".repeat(padName + 6)}${highlighter.dim(`• ${reason}`)}`,
      );
    }
  }
  console.log();
};

export const printCheckResults = (
  ctx: RepoContext,
  results: ProgramEligibility[],
): void => {
  printRepoSummary(ctx);
  console.log();

  const eligible = results.filter((r) => r.result.status === "eligible");
  const review = results.filter((r) => r.result.status === "needs-review");
  const ineligible = results.filter((r) => r.result.status === "ineligible");
  const padName = maxNameLength(programs);

  header(
    `Eligibility across ${results.length} programs — ${eligible.length} eligible, ${review.length} need review, ${ineligible.length} ineligible`,
  );
  console.log();

  if (eligible.length > 0) {
    for (const { program, result } of eligible) {
      console.log(eligibilityRow(program, result, padName));
    }
    console.log();
  }

  printEligibilitySection(review, padName);
  printEligibilitySection(ineligible, padName);

  if (review.length > 0) {
    note(
      'Programs marked "needs review" have requirements that\n' +
        "can't be auto-determined (e.g. non-commercial use).\n" +
        "Review them manually.",
      "Needs review",
    );
    console.log();
  }
};

export const buildGroupMultiselectOptions = (): Record<
  string,
  { label: string; value: string }[]
> => {
  const categories = getCategories();
  const options: Record<string, { label: string; value: string }[]> = {};
  for (const cat of categories) {
    const progs = getProgramsByCategory(cat);
    if (progs.length === 0) {
      continue;
    }
    options[CATEGORY_LABELS[cat]] = progs.map((p) => ({
      label: p.name,
      value: p.slug,
    }));
  }
  return options;
};
