import { readFileSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

import { fetchLatestVersion } from "./telemetry.js";

const RESET = "\u001B[0m";
const DIM = "\u001B[38;5;102m";
const TEXT = "\u001B[38;5;145m";
const GRAYS = [
  "\u001B[38;5;250m",
  "\u001B[38;5;248m",
  "\u001B[38;5;245m",
  "\u001B[38;5;243m",
  "\u001B[38;5;240m",
  "\u001B[38;5;238m",
] as const;

const BANNER_LINES = [
  " ██████╗ ███████╗███████╗    ██████╗ ███████╗██████╗ ██╗  ██╗███████╗",
  "██╔═══██╗██╔════╝██╔════╝    ██╔══██╗██╔════╝██╔══██╗██║ ██╔╝██╔════╝",
  "██║   ██║███████╗███████╗    ██████╔╝█████╗  ██████╔╝█████╔╝ ███████╗",
  "██║   ██║╚════██║╚════██║    ██╔═══╝ ██╔══╝  ██╔══██╗██╔═██╗ ╚════██║",
  "╚██████╔╝███████║███████║    ██║     ███████╗██║  ██║██║  ██╗███████║ ",
  " ╚═════╝ ╚══════╝╚══════╝    ╚═╝     ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝",
];

const BANNER_WIDTH = Math.max(...BANNER_LINES.map((line) => line.length));

const REPO_URL = "https://github.com/Aniket-508/awesome-oss-perks";
const SPONSOR_URL = "https://github.com/sponsors/Aniket-508";

export const printBanner = (): void => {
  if (!process.stdout.isTTY) {
    return;
  }

  const columns = process.stdout.columns ?? 80;
  if (columns < BANNER_WIDTH) {
    console.log();
    console.log(`${TEXT}\u001B[1mOSS Perks${RESET}`);
    console.log(`${DIM}Browse OSS perk programs & eligibility checks${RESET}`);
    console.log();
    return;
  }

  console.log();
  for (const [i, line] of BANNER_LINES.entries()) {
    const gray = GRAYS[i] ?? GRAYS.at(-1) ?? GRAYS[0];
    console.log(`${gray}${line}${RESET}`);
  }
  console.log();
  console.log(`${DIM}Browse OSS perk programs & eligibility checks${RESET}`);
  console.log();
};

export const printUsage = (): void => {
  if (!process.stdout.isTTY) {
    return;
  }

  const dollar = `${DIM}$${RESET}`;
  const row = (cmd: string, desc: string): string =>
    `  ${dollar} ${TEXT}${cmd}${RESET}  ${DIM}${desc}${RESET}`;

  console.log(row("ossperks list                ", "List all programs"));
  console.log(row("ossperks show <slug>         ", "Show program details"));
  console.log(row("ossperks check --repo o/r   ", "Check eligibility"));
  console.log(row("ossperks search <query>      ", "Search programs"));
  console.log(row("ossperks categories          ", "List categories"));
  console.log(row("ossperks open                ", "Open ossperks.com"));
  console.log();
  console.log(
    `  ${DIM}Run ${TEXT}ossperks --help${DIM} for full options.${RESET}`,
  );
  console.log();
};

export const printCta = (): void => {
  if (!process.stdout.isTTY) {
    return;
  }

  console.log();
  console.log(
    `${DIM}  If you find this useful, consider giving us a star \u2B50${RESET}`,
  );
  console.log(`  ${TEXT}${REPO_URL}${RESET}`);
  console.log();
  console.log(
    `${DIM}  Donate / Sponsor:${RESET} ${TEXT}${SPONSOR_URL}${RESET}`,
  );
  console.log();
};

const UPDATE_CACHE_PATH = join(homedir(), ".ossperks-update-check");
const UPDATE_CACHE_TTL_MS = 60 * 60 * 1000;

interface UpdateCache {
  checkedAt: number;
  latestVersion: string | null;
}

interface ParsedVersion {
  numbers: number[];
  prerelease: string | null;
}

const parseVersion = (version: string): ParsedVersion | null => {
  const normalized = version.trim().replace(/^v/i, "");
  const match = normalized.match(/^(\d+)\.(\d+)\.(\d+)(?:-([0-9A-Za-z.-]+))?$/);
  if (!match) {
    return null;
  }

  return {
    numbers: [Number(match[1]), Number(match[2]), Number(match[3])],
    prerelease: match[4] ?? null,
  };
};

export const isNewerVersion = (
  currentVersion: string,
  latestVersion: string,
): boolean => {
  const current = parseVersion(currentVersion);
  const latest = parseVersion(latestVersion);
  if (!current || !latest) {
    return false;
  }

  for (const [index, latestPart] of latest.numbers.entries()) {
    const currentPart = current.numbers[index] ?? 0;
    if (latestPart > currentPart) {
      return true;
    }
    if (latestPart < currentPart) {
      return false;
    }
  }

  if (current.prerelease === latest.prerelease) {
    return false;
  }

  if (current.prerelease !== null && latest.prerelease === null) {
    return true;
  }

  return false;
};

const printUpdateNotice = (current: string, latest: string): void => {
  console.log(
    `${DIM}  Update available:${RESET} ${TEXT}${current} \u2192 ${latest}${RESET}`,
  );
  console.log(`${DIM}  Run:${RESET} ${TEXT}npm i -g ossperks${RESET}`);
  console.log();
};

const refreshUpdateCache = async (): Promise<void> => {
  const latestVersion = await fetchLatestVersion();
  try {
    writeFileSync(
      UPDATE_CACHE_PATH,
      JSON.stringify({ checkedAt: Date.now(), latestVersion }),
    );
  } catch {
    // ignore
  }
};

export const checkForUpdates = (): void => {
  if (!process.stdout.isTTY) {
    return;
  }

  const currentVersion = process.env["VERSION"] ?? "0.0.0";

  let cachedData: UpdateCache | null = null;
  try {
    const raw = readFileSync(UPDATE_CACHE_PATH, "utf8");
    cachedData = JSON.parse(raw) as UpdateCache;
  } catch {
    // ignore
  }

  const cacheIsStale =
    !cachedData || Date.now() - cachedData.checkedAt >= UPDATE_CACHE_TTL_MS;

  if (
    cachedData?.latestVersion &&
    isNewerVersion(currentVersion, cachedData.latestVersion)
  ) {
    printUpdateNotice(currentVersion, cachedData.latestVersion);
  }

  if (cacheIsStale) {
    // eslint-disable-next-line no-void -- background refresh
    void refreshUpdateCache();
  }
};
