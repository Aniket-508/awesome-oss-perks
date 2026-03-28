import type {
  EligibilityResult,
  EligibilityStatus,
  Program,
} from "@ossperks/core";
import pc from "picocolors";

export const PROGRAMS_BASE_URL = "https://ossperks.com/programs";

export const programPageUrl = (program: Program): string =>
  `${PROGRAMS_BASE_URL}/${program.slug}`;

export const header = (text: string): void => {
  console.log();
  console.log(pc.bold(pc.cyan(text)));
  console.log(pc.dim("─".repeat(Math.min(text.length, 60))));
};

export const programTableHeader = (padId: number, padName: number): void => {
  console.log(
    `  ${pc.dim("ID".padEnd(padId))}  ${pc.dim("NAME".padEnd(padName))}  ${pc.dim("URL")}`,
  );
};

export const programRow = (
  program: Program,
  padId: number,
  padName: number,
): string => {
  const url = programPageUrl(program);
  return `  ${pc.bold(program.slug.padEnd(padId))}  ${program.name.padEnd(padName)}  ${pc.underline(pc.blue(url))}`;
};

const printProgramMeta = (program: Program): void => {
  console.log(`  ${pc.dim("Provider:")}  ${program.provider}`);
  console.log(`  ${pc.dim("Category:")}  ${program.category}`);
  if (program.duration) {
    console.log(`  ${pc.dim("Duration:")}  ${program.duration}`);
  }
};

const printProgramDescription = (program: Program): void => {
  console.log();
  console.log(`  ${pc.dim("Description:")}`);
  console.log(`  ${program.description}`);
};

const printProgramPerks = (program: Program): void => {
  console.log();
  console.log(`  ${pc.dim("Perks:")}`);
  for (const perk of program.perks) {
    console.log(`    ${pc.green("•")} ${pc.bold(perk.title)}`);
    console.log(`      ${pc.dim(perk.description)}`);
  }
};

const printProgramEligibility = (program: Program): void => {
  console.log();
  console.log(`  ${pc.dim("Eligibility:")}`);
  for (const rule of program.eligibility) {
    console.log(`    ${pc.yellow("•")} ${rule}`);
  }
};

const printProgramRequirements = (program: Program): void => {
  if (!program.requirements?.length) {
    return;
  }
  console.log();
  console.log(`  ${pc.dim("Requirements:")}`);
  for (const req of program.requirements) {
    console.log(`    ${pc.yellow("•")} ${req}`);
  }
};

const printProgramApplication = (program: Program): void => {
  if (!program.applicationProcess?.length) {
    return;
  }
  console.log();
  console.log(`  ${pc.dim("How to apply:")}`);
  for (const [i, step] of program.applicationProcess.entries()) {
    console.log(`    ${pc.dim(`${i + 1}.`)} ${step}`);
  }
};

const printProgramUrls = (program: Program): void => {
  console.log();
  console.log(`  ${pc.dim("URL:")} ${pc.underline(pc.blue(program.url))}`);
  if (program.applicationUrl && program.applicationUrl !== program.url) {
    console.log(
      `  ${pc.dim("Apply:")} ${pc.underline(pc.blue(program.applicationUrl))}`,
    );
  }
  console.log();
};

export const programDetail = (program: Program): void => {
  console.log();
  console.log(pc.bold(pc.white(program.name)));
  console.log(pc.dim("─".repeat(Math.min(program.name.length, 60))));
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
    return [pc.green("✅"), pc.green("Likely eligible")];
  }
  if (status === "needs-review") {
    return [pc.yellow("⚠️ "), pc.yellow("Needs review")];
  }
  return [pc.red("❌"), pc.red("Likely ineligible")];
};

export const eligibilityRow = (
  program: Program,
  result: EligibilityResult,
  padName = 20,
): string => {
  const [icon, statusText] = getStatusDisplay(result.status);
  const name = program.name.padEnd(padName);
  const suffix =
    result.reasons.length > 0 ? pc.dim(` — ${result.reasons[0]}`) : "";
  return `  ${icon}  ${pc.bold(name)} ${statusText}${suffix}`;
};

export const error = (message: string): void => {
  console.error(`\n  ${pc.red("✖")} ${pc.red(message)}\n`);
};

export const warn = (message: string): void => {
  console.warn(`  ${pc.yellow("⚠")} ${pc.yellow(message)}`);
};

export const success = (message: string): void => {
  console.log(`  ${pc.green("✔")} ${pc.green(message)}`);
};

export const info = (message: string): void => {
  console.log(`  ${pc.dim(message)}`);
};

export const maxIdLength = (programList: Program[]): number =>
  Math.max(...programList.map((p) => p.slug.length)) + 2;

export const maxNameLength = (programList: Program[]): number =>
  Math.max(...programList.map((p) => p.name.length)) + 2;
