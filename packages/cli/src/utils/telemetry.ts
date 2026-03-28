import { randomUUID } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import { setTimeout as delay } from "node:timers/promises";

import { PostHog } from "posthog-node";

// Opt out: DO_NOT_TRACK=1 or OSSPERKS_NO_TELEMETRY=1

const POSTHOG_API_KEY = "phc_O4ZIP5TjUMDjagCuh4AC0rEJXrLLQUCtcFhUaa6w03C";
const POSTHOG_HOST = "https://us.i.posthog.com";
const CLI_VERSION = process.env["VERSION"] ?? "0.0.0";
const TELEMETRY_STATE_PATH = join(homedir(), ".ossperks-telemetry.json");
const SHUTDOWN_TIMEOUT_MS = 300;

export type TelemetryProperties = Record<
  string,
  string | number | boolean | undefined
>;

const isDisabled = (): boolean =>
  Boolean(process.env["DO_NOT_TRACK"]) ||
  Boolean(process.env["OSSPERKS_NO_TELEMETRY"]);

const isCI = (): boolean =>
  Boolean(process.env["CI"]) ||
  Boolean(process.env["GITHUB_ACTIONS"]) ||
  Boolean(process.env["GITLAB_CI"]) ||
  Boolean(process.env["CIRCLECI"]) ||
  Boolean(process.env["TRAVIS"]) ||
  Boolean(process.env["BUILDKITE"]);

let client: PostHog | null = null;
let distinctId: string | null = null;

const getDistinctId = (): string => {
  if (distinctId) {
    return distinctId;
  }

  if (isCI()) {
    distinctId = `ci-${randomUUID()}`;
    return distinctId;
  }

  try {
    const raw = readFileSync(TELEMETRY_STATE_PATH, "utf8");
    const saved = JSON.parse(raw) as { distinctId?: string };
    const persisted = saved.distinctId;
    if (persisted) {
      distinctId = persisted;
      return persisted;
    }
  } catch {
    // ignore
  }

  distinctId = randomUUID();

  try {
    writeFileSync(
      TELEMETRY_STATE_PATH,
      JSON.stringify({ distinctId }, null, 2),
      "utf8",
    );
  } catch {
    // ignore
  }

  return distinctId;
};

const getClient = (): PostHog | null => {
  if (isDisabled()) {
    return null;
  }
  if (!client) {
    client = new PostHog(POSTHOG_API_KEY, {
      flushAt: 1,
      flushInterval: 0,
      host: POSTHOG_HOST,
    });
  }
  return client;
};

export const track = (
  event: string,
  properties?: TelemetryProperties,
): void => {
  const c = getClient();
  if (!c) {
    return;
  }
  c.capture({
    distinctId: getDistinctId(),
    event,
    properties: {
      ci: isCI(),
      cli_version: CLI_VERSION,
      node: process.version,
      os: process.platform,
      ...properties,
    },
  });
};

export const shutdownTelemetry = async (): Promise<void> => {
  const activeClient = client;
  client = null;
  if (!activeClient) {
    return;
  }

  try {
    await Promise.race([activeClient.shutdown(), delay(SHUTDOWN_TIMEOUT_MS)]);
  } catch {
    // ignore
  }
};

const NPM_REGISTRY_URL = "https://registry.npmjs.org/ossperks/latest";

export const fetchLatestVersion = async (): Promise<string | null> => {
  try {
    const res = await fetch(NPM_REGISTRY_URL, {
      signal: AbortSignal.timeout(3000),
    });
    if (!res.ok) {
      return null;
    }
    const data = (await res.json()) as { version?: string };
    return data.version ?? null;
  } catch {
    return null;
  }
};
