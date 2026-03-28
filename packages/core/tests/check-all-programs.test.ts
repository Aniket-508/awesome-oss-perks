import { programs, checkAllPrograms } from "@ossperks/core";

import { makeCtx } from "./helpers/fixtures.js";

describe("checkAllPrograms: full results", () => {
  it("returns a result for every program", () => {
    const ctx = makeCtx();
    const results = checkAllPrograms(programs, ctx);
    expect(results).toHaveLength(programs.length);
  });

  it("places eligible programs before ineligible ones", () => {
    const ctx = makeCtx();
    const results = checkAllPrograms(programs, ctx);
    const statuses = results.map((r) => r.result.status);
    const eligibleCount = statuses.filter((s) => s === "eligible").length;
    for (let i = 0; i < eligibleCount; i += 1) {
      expect(statuses[i]).toBe("eligible");
    }
    for (let i = eligibleCount; i < statuses.length; i += 1) {
      expect(statuses[i]).not.toBe("eligible");
    }
  });

  it("detects ineligibility for private repo", () => {
    const ctx = makeCtx({ isPrivate: true, license: null });
    const results = checkAllPrograms(programs, ctx);
    const ineligible = results.filter((r) => r.result.status === "ineligible");
    expect(ineligible.length).toBeGreaterThan(0);
  });
});
