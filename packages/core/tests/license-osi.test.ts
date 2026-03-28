import { getProgramBySlug, checkEligibility } from "@ossperks/core";
import spdxLicenseList from "spdx-license-list";

import { makeCtx } from "./helpers/fixtures.js";

describe("isOsiApproved via spdx-license-list", () => {
  const sentry = getProgramBySlug("sentry");
  if (!sentry) {
    throw new Error("sentry test data missing");
  }

  it("spdx-license-list has at least 100 OSI-approved licenses", () => {
    const osiCount = Object.values(spdxLicenseList).filter(
      (entry) => entry.osiApproved,
    ).length;
    expect(osiCount).toBeGreaterThanOrEqual(100);
  });

  it("recognizes Unlicense as OSI-approved", () => {
    const result = checkEligibility(sentry, makeCtx({ license: "Unlicense" }));
    expect(result.status).toBe("eligible");
  });

  it("recognizes PostgreSQL license as OSI-approved", () => {
    const result = checkEligibility(sentry, makeCtx({ license: "PostgreSQL" }));
    expect(result.status).toBe("eligible");
  });

  it("recognizes OFL-1.1 as OSI-approved", () => {
    const result = checkEligibility(sentry, makeCtx({ license: "OFL-1.1" }));
    expect(result.status).toBe("eligible");
  });

  it("recognizes CAL-1.0 as OSI-approved", () => {
    const result = checkEligibility(
      sentry,
      makeCtx({ license: "CAL-1.0-Combined-Work-Exception" }),
    );
    expect(result.status).toBe("eligible");
  });

  it("rejects unknown/non-OSI license", () => {
    const result = checkEligibility(
      sentry,
      makeCtx({ license: "PROPRIETARY" }),
    );
    expect(result.status).toBe("ineligible");
  });
});
