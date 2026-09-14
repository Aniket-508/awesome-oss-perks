/* oxlint-disable vitest/prefer-called-once, vitest/prefer-import-in-mock */
import { createHash } from "node:crypto";

import type * as PostHogModule from "posthog-node";

const readFileSyncMock = vi.fn();
const writeFileSyncMock = vi.fn();
const mkdirSyncMock = vi.fn();
const captureMock = vi.fn();
const shutdownMock = vi.fn();
const postHogConstructorMock = vi.fn();

/** Matches `getAnonymousId()` in telemetry.ts for mocked hostname / userInfo. */
const expectedDistinctId = createHash("sha256")
  .update("test-host:test-user")
  .digest("hex")
  .slice(0, 16);

vi.mock("node:fs", () => ({
  mkdirSync: mkdirSyncMock,
  readFileSync: readFileSyncMock,
  writeFileSync: writeFileSyncMock,
}));

vi.mock("node:os", () => ({
  homedir: () => "/home/test",
  hostname: () => "test-host",
  userInfo: () => ({
    gid: 1000,
    homedir: "/home/test",
    shell: "/bin/bash",
    uid: 1000,
    username: "test-user",
  }),
}));

vi.mock(import("posthog-node"), () => {
  class MockPostHog {
    capture = captureMock;
    shutdown = shutdownMock;

    constructor(apiKey: string, options: unknown) {
      postHogConstructorMock(apiKey, options);
    }
  }

  return {
    PostHog: MockPostHog,
  } as unknown as typeof PostHogModule;
});

const originalEnv = { ...process.env };

const importTelemetry = () => import("../src/utils/telemetry.js");
const expectedCi =
  Boolean(process.env["CI"]) ||
  Boolean(process.env["GITHUB_ACTIONS"]) ||
  Boolean(process.env["GITLAB_CI"]) ||
  Boolean(process.env["CIRCLECI"]) ||
  Boolean(process.env["TRAVIS"]) ||
  Boolean(process.env["BUILDKITE"]);

describe("telemetry", () => {
  beforeEach(() => {
    vi.resetModules();

    readFileSyncMock.mockReset();
    writeFileSyncMock.mockReset();
    mkdirSyncMock.mockReset();
    captureMock.mockReset();
    shutdownMock.mockReset();
    shutdownMock.mockResolvedValue(undefined as never);
    postHogConstructorMock.mockReset();

    process.env = {
      ...originalEnv,
      POSTHOG_API_KEY: "test-posthog-key",
      VERSION: "0.3.3",
    };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("writes first-run notice config on first capture when no telemetry file exists", async () => {
    readFileSyncMock.mockImplementation(() => {
      throw new Error("ENOENT");
    });

    const { capture } = await importTelemetry();

    capture("cli:list");

    expect(mkdirSyncMock).toHaveBeenCalledWith(
      "/home/test/.ossperks",
      expect.objectContaining({ recursive: true }),
    );
    expect(writeFileSyncMock).toHaveBeenCalledWith(
      "/home/test/.ossperks/telemetry.json",
      JSON.stringify({ enabled: true, notified: true }, null, 2),
    );
    expect(captureMock).toHaveBeenCalledWith(
      expect.objectContaining({
        distinctId: expectedDistinctId,
        event: "cli:list",
        properties: expect.objectContaining({
          ci: expectedCi,
          cli_version: "0.3.3",
        }),
      }),
    );
  });

  it("uses hash-based distinct id when config already exists (not read from disk)", async () => {
    readFileSyncMock.mockReturnValue(
      JSON.stringify({ enabled: true, notified: true }),
    );

    const { capture } = await importTelemetry();

    capture("cli:search");

    expect(writeFileSyncMock).not.toHaveBeenCalled();
    expect(captureMock).toHaveBeenCalledWith(
      expect.objectContaining({
        distinctId: expectedDistinctId,
        event: "cli:search",
      }),
    );
  });

  it("recovers from a corrupt telemetry file and still records events", async () => {
    readFileSyncMock.mockReturnValue("{not-json");

    const { capture } = await importTelemetry();

    capture("cli:show");

    expect(mkdirSyncMock).toHaveBeenCalledWith(
      "/home/test/.ossperks",
      expect.objectContaining({ recursive: true }),
    );
    expect(writeFileSyncMock).toHaveBeenCalledWith(
      "/home/test/.ossperks/telemetry.json",
      JSON.stringify({ enabled: true, notified: true }, null, 2),
    );
    expect(captureMock).toHaveBeenCalledWith(
      expect.objectContaining({
        distinctId: expectedDistinctId,
        event: "cli:show",
      }),
    );
  });

  it("creates a new PostHog client after flush when capture is called again", async () => {
    readFileSyncMock.mockReturnValue(
      JSON.stringify({ enabled: true, notified: true }),
    );

    const { flush, capture } = await importTelemetry();

    capture("first");

    expect(postHogConstructorMock).toHaveBeenCalledTimes(1);
    expect(captureMock).toHaveBeenCalledTimes(1);

    await flush();

    expect(shutdownMock).toHaveBeenCalledTimes(1);

    capture("second");

    expect(postHogConstructorMock).toHaveBeenCalledTimes(2);
    expect(captureMock).toHaveBeenCalledTimes(2);
  });

  it("reports status from config and environment", async () => {
    readFileSyncMock.mockReturnValue(
      JSON.stringify({ enabled: true, notified: true }),
    );

    const { getStatus } = await importTelemetry();
    expect(getStatus()).toBe("on");

    process.env["DO_NOT_TRACK"] = "1";
    expect(getStatus()).toBe("disabled-by-env");
  });

  it("stops sending events once telemetry is disabled", async () => {
    readFileSyncMock.mockReturnValue(
      JSON.stringify({ enabled: false, notified: true }),
    );

    const { capture } = await importTelemetry();

    capture("cli:list");

    expect(postHogConstructorMock).not.toHaveBeenCalled();
    expect(captureMock).not.toHaveBeenCalled();
  });

  it("persists the opt-out to the config file", async () => {
    readFileSyncMock.mockReturnValue(
      JSON.stringify({ enabled: true, notified: true }),
    );

    const { setEnabled } = await importTelemetry();

    setEnabled(false);

    expect(writeFileSyncMock).toHaveBeenCalledWith(
      "/home/test/.ossperks/telemetry.json",
      JSON.stringify({ enabled: false, notified: true }, null, 2),
    );
  });

  it("reads an opt-out left behind in the legacy home-directory config", async () => {
    readFileSyncMock.mockImplementation((path: string) => {
      if (path === "/home/test/telemetry.json") {
        return JSON.stringify({ enabled: false, notified: true });
      }
      throw new Error("ENOENT");
    });

    const { getStatus } = await importTelemetry();

    expect(getStatus()).toBe("disabled-by-config");
  });

  it("swallows unreachable-endpoint failures instead of printing them", async () => {
    readFileSyncMock.mockReturnValue(
      JSON.stringify({ enabled: true, notified: true }),
    );
    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockRejectedValue(new Error("ETIMEDOUT"));
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {
      // silence
    });

    const { capture } = await importTelemetry();
    capture("cli:check");

    const options = postHogConstructorMock.mock.calls[0]?.[1] as {
      fetch: (
        url: string,
        init: { headers: Record<string, string> },
      ) => Promise<{
        status: number;
        text: () => Promise<string>;
      }>;
    };
    const response = await options.fetch("https://us.i.posthog.com/batch", {
      headers: {},
    });

    expect(response.status).toBe(200);
    await expect(response.text()).resolves.toBe("{}");
    expect(errorSpy).not.toHaveBeenCalled();

    fetchMock.mockRestore();
    errorSpy.mockRestore();
  });
});
