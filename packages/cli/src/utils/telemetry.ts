import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { homedir, hostname, userInfo } from "node:os";
import { join } from "node:path";
import { setTimeout as delay } from "node:timers/promises";

import { PostHog } from "posthog-node";

const POSTHOG_API_KEY = process.env["POSTHOG_API_KEY"] ?? "";
const POSTHOG_HOST = "https://us.i.posthog.com";
const CLI_VERSION = process.env["VERSION"] ?? "0.0.0";
const CONFIG_DIR = join(homedir(), ".ossperks");
const TELEMETRY_FILE = join(CONFIG_DIR, "telemetry.json");
/** Pre-0.3.4 builds wrote the config straight into the home directory. */
const LEGACY_TELEMETRY_FILE = join(homedir(), "telemetry.json");
const SHUTDOWN_TIMEOUT_MS = 300;
const REQUEST_TIMEOUT_MS = 2000;

export type TelemetryProperties = Record<
  string,
  string | number | boolean | undefined
>;

const isDisabledByEnv = (): boolean =>
  Boolean(process.env["DO_NOT_TRACK"]) ||
  Boolean(process.env["DISABLE_TELEMETRY"]);

const getAnonymousId = (): string => {
  const raw = `${hostname()}:${userInfo().username}`;
  return createHash("sha256").update(raw).digest("hex").slice(0, 16);
};

const isCI = (): boolean =>
  Boolean(process.env["CI"]) ||
  Boolean(process.env["GITHUB_ACTIONS"]) ||
  Boolean(process.env["GITLAB_CI"]) ||
  Boolean(process.env["CIRCLECI"]) ||
  Boolean(process.env["TRAVIS"]) ||
  Boolean(process.env["BUILDKITE"]);

let anonymousId: string | null = null;
let client: PostHog | null = null;

interface TelemetryConfig {
  enabled: boolean;
  notified: boolean;
}

const DEFAULT_CONFIG: TelemetryConfig = { enabled: true, notified: false };

const readConfigFile = (path: string): TelemetryConfig | null => {
  try {
    const parsed = JSON.parse(readFileSync(path, "utf8")) as
      | Partial<TelemetryConfig>
      | undefined;
    if (typeof parsed?.enabled !== "boolean") {
      return null;
    }
    return { enabled: parsed.enabled, notified: parsed.notified === true };
  } catch {
    return null;
  }
};

const readConfig = (): TelemetryConfig =>
  readConfigFile(TELEMETRY_FILE) ??
  readConfigFile(LEGACY_TELEMETRY_FILE) ??
  DEFAULT_CONFIG;

const writeConfig = (config: TelemetryConfig): void => {
  try {
    mkdirSync(CONFIG_DIR, { recursive: true });
    writeFileSync(TELEMETRY_FILE, JSON.stringify(config, null, 2));
  } catch {
    // A read-only or unwritable home directory must not break the command.
  }
};

const showFirstRunNotice = (): void => {
  const config = readConfig();
  if (config.notified) {
    return;
  }

  console.log(
    "\n  OSS Perks collects anonymous usage data to improve the CLI." +
      "\n  Run `ossperks telemetry disable` or set DO_NOT_TRACK=1 to opt out.\n",
  );

  writeConfig({ ...config, notified: true });
};

const getContext = (): Record<string, string> => ({
  arch: process.arch,
  nodeVersion: process.version,
  os: process.platform,
});

export type TelemetryStatus = "disabled-by-config" | "disabled-by-env" | "on";

export const getStatus = (): TelemetryStatus => {
  if (isDisabledByEnv()) {
    return "disabled-by-env";
  }
  return readConfig().enabled ? "on" : "disabled-by-config";
};

/**
 * PostHog reports transport failures by writing the error and its stack
 * straight to stderr (`logFlushError` in `@posthog/core`) and exposes no hook
 * to silence it. Telemetry must never add noise to a user's terminal, so an
 * unreachable endpoint is absorbed here and reported upstream as an empty
 * success — the event is simply dropped.
 */
const silentFetch = async (
  url: string,
  options: { headers: Record<string, string>; signal?: AbortSignal } & Record<
    string,
    unknown
  >,
) => {
  const timeout = AbortSignal.timeout(REQUEST_TIMEOUT_MS);
  const signal = options.signal
    ? AbortSignal.any([options.signal, timeout])
    : timeout;

  try {
    return await fetch(url, { ...options, signal } as RequestInit);
  } catch {
    return new Response("{}", {
      headers: { "content-type": "application/json" },
      status: 200,
    });
  }
};

const getClient = (): PostHog | null => {
  if (getStatus() !== "on" || !POSTHOG_API_KEY) {
    return null;
  }

  if (!client) {
    client = new PostHog(POSTHOG_API_KEY, {
      fetch: silentFetch,
      flushAt: 1,
      flushInterval: 0,
      host: POSTHOG_HOST,
    });
    anonymousId = getAnonymousId();
  }

  return client;
};

export const capture = (
  event: string,
  properties?: TelemetryProperties,
): void => {
  const c = getClient();
  if (!c || !anonymousId) {
    return;
  }

  showFirstRunNotice();

  c.capture({
    distinctId: anonymousId,
    event,
    properties: {
      ci: isCI(),
      cli_version: CLI_VERSION,
      ...getContext(),
      ...properties,
    },
  });
};

export const captureError = (command: string, error: unknown): void => {
  const message = error instanceof Error ? error.message : String(error);
  const stack = error instanceof Error ? error.stack : undefined;

  capture("cli_error", {
    command,
    error: message,
    stack,
  });
};

export const flush = async (): Promise<void> => {
  if (!client) {
    return;
  }

  try {
    await Promise.race([client.shutdown(), delay(SHUTDOWN_TIMEOUT_MS)]);
  } catch {
    // ignore
  }

  client = null;
};

export const setEnabled = (enabled: boolean): void => {
  const config = readConfig();
  writeConfig({ ...config, enabled, notified: true });
};

export const getConfigPath = (): string => TELEMETRY_FILE;
