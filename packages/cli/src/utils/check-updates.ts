import { readFileSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

import { note } from "@clack/prompts";

import { getLatestCLIVersion } from "./get-latest-cli-version.js";

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
  note(
    `${current} \u2192 ${latest}\nRun: npm i -g ossperks`,
    "Update available",
  );
};

const refreshUpdateCache = async (): Promise<void> => {
  const latestVersion = await getLatestCLIVersion();
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
