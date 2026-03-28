import { ansi } from "./highlighter.js";

const BANNER_LINES = [
  " ██████╗ ███████╗███████╗    ██████╗ ███████╗██████╗ ██╗  ██╗███████╗",
  "██╔═══██╗██╔════╝██╔════╝    ██╔══██╗██╔════╝██╔══██╗██║ ██╔╝██╔════╝",
  "██║   ██║███████╗███████╗    ██████╔╝█████╗  ██████╔╝█████╔╝ ███████╗",
  "██║   ██║╚════██║╚════██║    ██╔═══╝ ██╔══╝  ██╔══██╗██╔═██╗ ╚════██║",
  "╚██████╔╝███████║███████║    ██║     ███████╗██║  ██║██║  ██╗███████║ ",
  " ╚═════╝ ╚══════╝╚══════╝    ╚═╝     ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝",
];

const BANNER_WIDTH = Math.max(...BANNER_LINES.map((line) => line.length));

export const printBanner = (): void => {
  if (!process.stdout.isTTY) {
    return;
  }

  const columns = process.stdout.columns ?? 80;
  if (columns < BANNER_WIDTH) {
    console.log();
    console.log(`${ansi.bannerAccent}${ansi.bold}OSS Perks${ansi.reset}`);
    console.log(
      `${ansi.bannerMuted}Browse OSS perk programs & eligibility checks${ansi.reset}`,
    );
    console.log();
    return;
  }

  console.log();
  for (const [i, line] of BANNER_LINES.entries()) {
    const gray =
      ansi.bannerGradient[i] ??
      ansi.bannerGradient.at(-1) ??
      ansi.bannerGradient[0];
    console.log(`${gray}${line}${ansi.reset}`);
  }
  console.log();
  console.log(
    `${ansi.bannerMuted}Browse OSS perk programs & eligibility checks${ansi.reset}`,
  );
  console.log();
};

export const printUsage = (): void => {
  if (!process.stdout.isTTY) {
    return;
  }

  const dollar = `${ansi.bannerMuted}$${ansi.reset}`;
  const row = (cmd: string, desc: string): string =>
    `  ${dollar} ${ansi.bannerAccent}${cmd}${ansi.reset}  ${ansi.bannerMuted}${desc}${ansi.reset}`;

  console.log(row("ossperks list                ", "List all programs"));
  console.log(row("ossperks show [id]           ", "Show program details"));
  console.log(row("ossperks check --repo o/r   ", "Check eligibility"));
  console.log(row("ossperks search [query]      ", "Search programs"));
  console.log(row("ossperks categories          ", "List categories"));
  console.log(row("ossperks open                ", "Open ossperks.com"));
  console.log();
  console.log(
    `  ${ansi.bannerMuted}Run ${ansi.bannerAccent}ossperks --help${ansi.bannerMuted} for full options.${ansi.reset}`,
  );
  console.log();
};
