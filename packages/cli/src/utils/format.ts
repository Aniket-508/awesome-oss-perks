import type {
  EligibilityResult,
  EligibilityStatus,
  Program,
} from "@ossperks/core";

import { highlighter } from "./highlighter.js";

export const PROGRAMS_BASE_URL = "https://ossperks.com/programs";

export const programPageUrl = (program: Program): string =>
  `${PROGRAMS_BASE_URL}/${program.slug}`;

export const header = (text: string): void => {
  console.log();
  console.log(highlighter.heading(text));
  console.log(highlighter.dim("─".repeat(Math.min(text.length, 60))));
};

export const programTableHeader = (padName: number): void => {
  console.log(
    `  ${highlighter.dim("NAME".padEnd(padName))}  ${highlighter.dim("URL")}`,
  );
};

export const programRow = (program: Program, padName: number): string => {
  const url = programPageUrl(program);
  return `  ${highlighter.bold(program.name.padEnd(padName))}  ${highlighter.underline(highlighter.blue(url))}`;
};

export const maxNameLength = (programList: Program[]): number =>
  Math.max(...programList.map((p) => p.name.length)) + 2;

export const printProgramListTable = (
  results: Program[],
  title: string,
  emptyMessage = "No programs.",
): void => {
  header(title);
  console.log();

  if (results.length === 0) {
    console.log(`  ${highlighter.dim(emptyMessage)}`);
    console.log();
    return;
  }

  const padName = maxNameLength(results);
  programTableHeader(padName);
  for (const program of results) {
    console.log(programRow(program, padName));
  }
  console.log();
};

const printProgramMeta = (program: Program): void => {
  console.log(`  ${highlighter.dim("Provider:")}  ${program.provider}`);
  console.log(`  ${highlighter.dim("Category:")}  ${program.category}`);
  if (program.duration) {
    console.log(`  ${highlighter.dim("Duration:")}  ${program.duration}`);
  }
};

const printProgramDescription = (program: Program): void => {
  console.log();
  console.log(`  ${highlighter.dim("Description:")}`);
  console.log(`  ${program.description}`);
};

const printProgramPerks = (program: Program): void => {
  console.log();
  console.log(`  ${highlighter.dim("Perks:")}`);
  for (const perk of program.perks) {
    console.log(
      `    ${highlighter.green("•")} ${highlighter.bold(perk.title)}`,
    );
    console.log(`      ${highlighter.dim(perk.description)}`);
  }
};

const printProgramEligibility = (program: Program): void => {
  console.log();
  console.log(`  ${highlighter.dim("Eligibility:")}`);
  for (const rule of program.eligibility) {
    console.log(`    ${highlighter.yellow("•")} ${rule}`);
  }
};

const printProgramRequirements = (program: Program): void => {
  if (!program.requirements?.length) {
    return;
  }
  console.log();
  console.log(`  ${highlighter.dim("Requirements:")}`);
  for (const req of program.requirements) {
    console.log(`    ${highlighter.yellow("•")} ${req}`);
  }
};

const printProgramApplication = (program: Program): void => {
  if (!program.applicationProcess?.length) {
    return;
  }
  console.log();
  console.log(`  ${highlighter.dim("How to apply:")}`);
  for (const [i, step] of program.applicationProcess.entries()) {
    console.log(`    ${highlighter.dim(`${i + 1}.`)} ${step}`);
  }
};

const printProgramUrls = (program: Program): void => {
  console.log();
  console.log(
    `  ${highlighter.dim("URL:")} ${highlighter.underline(highlighter.blue(program.url))}`,
  );
  if (program.applicationUrl && program.applicationUrl !== program.url) {
    console.log(
      `  ${highlighter.dim("Apply:")} ${highlighter.underline(highlighter.blue(program.applicationUrl))}`,
    );
  }
  console.log();
};

export const programDetail = (program: Program): void => {
  console.log();
  console.log(highlighter.bold(highlighter.white(program.name)));
  console.log(highlighter.dim("─".repeat(Math.min(program.name.length, 60))));
  console.log();
  printProgramMeta(program);
  printProgramDescription(program);
  printProgramPerks(program);
  printProgramEligibility(program);
  printProgramRequirements(program);
  printProgramApplication(program);
  printProgramUrls(program);
};

const getStatusDisplay = (status: EligibilityStatus): [string, string] => {
  if (status === "eligible") {
    return [highlighter.green("✅"), highlighter.green("Likely eligible")];
  }
  if (status === "needs-review") {
    return [highlighter.yellow("⚠️ "), highlighter.yellow("Needs review")];
  }
  return [highlighter.red("❌"), highlighter.red("Likely ineligible")];
};

export const eligibilityRow = (
  program: Program,
  result: EligibilityResult,
  padName = 20,
): string => {
  const [icon, statusText] = getStatusDisplay(result.status);
  const name = program.name.padEnd(padName);
  const suffix =
    result.reasons.length > 0 ? highlighter.dim(` — ${result.reasons[0]}`) : "";
  return `  ${icon}  ${highlighter.bold(name)} ${statusText}${suffix}`;
};

export const error = (message: string): void => {
  console.error(`\n  ${highlighter.red("✖")} ${highlighter.error(message)}\n`);
};

export const warn = (message: string): void => {
  console.warn(`  ${highlighter.yellow("⚠")} ${highlighter.warn(message)}`);
};

export const success = (message: string): void => {
  console.log(`  ${highlighter.green("✔")} ${highlighter.success(message)}`);
};

export const info = (message: string): void => {
  console.log(`  ${highlighter.dim(message)}`);
};
