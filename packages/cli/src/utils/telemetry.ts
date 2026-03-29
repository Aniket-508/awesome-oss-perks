import { randomUUID } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import { setTimeout as delay } from "node:timers/promises";

import { PostHog } from "posthog-node";

const POSTHOG_API_KEY = process.env["POSTHOG_API_KEY"] ?? "";
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
  Boolean(process.env["DISABLE_TELEMETRY"]);

const isCI = (): boolean =>
  Boolean(process.env["CI"]) ||
  Boolean(process.env["GITHUB_ACTIONS"]) ||
  Boolean(process.env["GITLAB_CI"]) ||
  Boolean(process.env["CIRCLECI"]) ||
  Boolean(process.env["TRAVIS"]) ||
  Boolean(process.env["BUILDKITE"]);

let resolvedId: string | null = null;
let client: PostHog | null = null;
let shutdownCalled = false;

const resolveDistinctId = (): string => {
  if (resolvedId) {
    return resolvedId;
  }

  try {
    const raw = readFileSync(TELEMETRY_STATE_PATH, "utf8");
    const saved = JSON.parse(raw) as { distinctId?: string };
    if (saved.distinctId) {
      resolvedId = saved.distinctId;
      return resolvedId;
    }
  } catch {
    // ignore
  }

  resolvedId = randomUUID();

  try {
    writeFileSync(
      TELEMETRY_STATE_PATH,
      JSON.stringify({ distinctId: resolvedId }, null, 2),
      "utf8",
    );
  } catch {
    // ignore
  }

  return resolvedId;
};

const getClient = (): PostHog | null => {
  if (shutdownCalled || isDisabled() || !POSTHOG_API_KEY) {
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
    distinctId: resolveDistinctId(),
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
  shutdownCalled = true;
  if (!client) {
    return;
  }

  try {
    await Promise.race([client.shutdown(), delay(SHUTDOWN_TIMEOUT_MS)]);
  } catch {
    // ignore
  }
};
