import {
  getProgramBySlug,
  checkEligibilityDetailed,
  aggregateDependencies,
} from "@ossperks/core";

import { makeCtx } from "./helpers/fixtures.js";

describe("checkEligibility: tech stack detection", () => {
  describe("convex (requires convex package)", () => {
    const convex = getProgramBySlug("convex");
    if (!convex) {
      throw new Error("convex test data missing");
    }

    it("passes tech check when convex is in dependencies", () => {
      const result = checkEligibilityDetailed(
        convex,
        makeCtx({ dependencies: ["convex", "react"] }),
      );
      const techReasons = result.reasons.filter(
        (r) => r.code === "techStackMissing" || r.code === "techStackUnknown",
      );
      expect(techReasons).toHaveLength(0);
    });

    it("fails tech check when no matching dependency is found", () => {
      const result = checkEligibilityDetailed(
        convex,
        makeCtx({ dependencies: ["react", "next"] }),
      );
      expect(result.status).toBe("ineligible");
      const techReason = result.reasons.find(
        (r) => r.code === "techStackMissing",
      );
      expect(techReason).toBeDefined();
    });

    it("returns unknown when dependencies list is empty", () => {
      const result = checkEligibilityDetailed(
        convex,
        makeCtx({ dependencies: [] }),
      );
      const techReason = result.reasons.find(
        (r) => r.code === "techStackUnknown",
      );
      expect(techReason).toBeDefined();
      expect(result.status).toBe("needs-review");
    });

    it("detects convex from a workspace sub-package via aggregateDependencies", () => {
      const deps = aggregateDependencies([
        { devDependencies: { turbo: "^2.0.0" } },
        { dependencies: { convex: "^1.0.0", next: "^14.0.0" } },
      ]);
      const result = checkEligibilityDetailed(
        convex,
        makeCtx({ dependencies: deps }),
      );
      const techReasons = result.reasons.filter(
        (r) => r.code === "techStackMissing" || r.code === "techStackUnknown",
      );
      expect(techReasons).toHaveLength(0);
    });
  });

  describe("neon (requires postgres-related package)", () => {
    const neon = getProgramBySlug("neon");
    if (!neon) {
      throw new Error("neon test data missing");
    }

    it("passes when pg is in dependencies", () => {
      const result = checkEligibilityDetailed(
        neon,
        makeCtx({ dependencies: ["pg", "express"] }),
      );
      const techReasons = result.reasons.filter(
        (r) => r.code === "techStackMissing" || r.code === "techStackUnknown",
      );
      expect(techReasons).toHaveLength(0);
    });

    it("passes when drizzle-orm is in dependencies", () => {
      const result = checkEligibilityDetailed(
        neon,
        makeCtx({ dependencies: ["drizzle-orm", "next"] }),
      );
      const techReasons = result.reasons.filter(
        (r) => r.code === "techStackMissing" || r.code === "techStackUnknown",
      );
      expect(techReasons).toHaveLength(0);
    });

    it("fails when no postgres-related dependency found", () => {
      const result = checkEligibilityDetailed(
        neon,
        makeCtx({ dependencies: ["mongoose", "express"] }),
      );
      expect(result.status).toBe("ineligible");
    });
  });

  describe("programs without techPackages", () => {
    const sentry = getProgramBySlug("sentry");
    if (!sentry) {
      throw new Error("sentry test data missing");
    }

    it("does not produce tech stack reasons for programs without techPackages", () => {
      const result = checkEligibilityDetailed(
        sentry,
        makeCtx({ dependencies: ["react"] }),
      );
      const techReasons = result.reasons.filter(
        (r) =>
          r.code === "techStackMet" ||
          r.code === "techStackMissing" ||
          r.code === "techStackUnknown",
      );
      expect(techReasons).toHaveLength(0);
    });
  });
});

describe("config-file detection", () => {
  const vercel = getProgramBySlug("vercel");
  if (!vercel) {
    throw new Error("vercel test data missing");
  }

  it("passes hosting check when vercel.json is in filePaths", () => {
    const result = checkEligibilityDetailed(
      vercel,
      makeCtx({
        filePaths: ["package.json", "vercel.json", "src/index.ts"],
      }),
    );
    const configReasons = result.reasons.filter(
      (r) => r.code === "configFileUnknown" || r.code === "hostingPlatform",
    );
    expect(configReasons).toHaveLength(0);
  });

  it("returns unknown when no config file is found but filePaths are available", () => {
    const result = checkEligibilityDetailed(
      vercel,
      makeCtx({
        filePaths: ["package.json", "src/index.ts"],
      }),
    );
    const configReason = result.reasons.find(
      (r) => r.code === "configFileUnknown",
    );
    expect(configReason).toBeDefined();
  });

  it("passes with .vercel/project.json in filePaths", () => {
    const result = checkEligibilityDetailed(
      vercel,
      makeCtx({
        filePaths: ["package.json", ".vercel/project.json"],
      }),
    );
    const configReasons = result.reasons.filter(
      (r) => r.code === "configFileUnknown" || r.code === "hostingPlatform",
    );
    expect(configReasons).toHaveLength(0);
  });
});
