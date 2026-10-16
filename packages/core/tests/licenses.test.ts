import {
  getLicenseFamilyBreakdown,
  getLicenseFamilyByLicenseSlug,
  getLicenseFamilyBySlug,
  getProgramBySlug,
  isOsiApproved,
  isPermissive,
  LICENSE_FAMILIES,
  programs,
} from "@ossperks/core";

describe("license families", () => {
  it("keeps every SPDX id in a family on the same verdict as its representative", () => {
    for (const family of LICENSE_FAMILIES) {
      const osi = isOsiApproved(family.representative);
      const permissive = isPermissive(family.representative);
      for (const spdxId of family.spdxIds) {
        expect({
          id: spdxId,
          osi: isOsiApproved(spdxId),
          permissive: isPermissive(spdxId),
        }).toStrictEqual({ id: spdxId, osi, permissive });
      }
    }
  });

  it("resolves SPDX alias slugs to their family page", () => {
    expect(getLicenseFamilyByLicenseSlug("agpl-3-0")?.slug).toBe("copyleft");
    expect(getLicenseFamilyByLicenseSlug("apache-2-0")?.slug).toBe(
      "permissive",
    );
    expect(getLicenseFamilyByLicenseSlug("busl-1-1")?.slug).toBe(
      "source-available",
    );
    expect(getLicenseFamilyByLicenseSlug("not-a-license")).toBeUndefined();
  });

  it("accounts for every program exactly once per family", () => {
    for (const family of LICENSE_FAMILIES) {
      const breakdown = getLicenseFamilyBreakdown(family);
      const total =
        breakdown.accepted.length +
        breakdown.rejectedByOsi.length +
        breakdown.rejectedByPermissive.length +
        breakdown.unspecified.length;
      expect(total).toBe(programs.length);
    }
  });

  it("rejects non-OSI licenses from programs that require an OSI license", () => {
    const sourceAvailable = getLicenseFamilyBySlug("source-available");
    if (!sourceAvailable) {
      throw new Error("source-available family missing");
    }
    const breakdown = getLicenseFamilyBreakdown(sourceAvailable);

    expect(breakdown.accepted).toHaveLength(0);
    expect(breakdown.rejectedByOsi.map((p) => p.slug)).toContain("sentry");
  });

  it("rejects copyleft only from programs demanding a permissive license", () => {
    const copyleft = getLicenseFamilyBySlug("copyleft");
    const permissive = getLicenseFamilyBySlug("permissive");
    if (!(copyleft && permissive)) {
      throw new Error("license families missing");
    }

    const copyleftBreakdown = getLicenseFamilyBreakdown(copyleft);
    const permissiveBreakdown = getLicenseFamilyBreakdown(permissive);

    expect(copyleftBreakdown.rejectedByOsi).toHaveLength(0);
    expect(copyleftBreakdown.rejectedByPermissive.length).toBeGreaterThan(0);
    expect(permissiveBreakdown.rejectedByPermissive).toHaveLength(0);
    expect(permissiveBreakdown.accepted.length).toBeGreaterThan(
      copyleftBreakdown.accepted.length,
    );
  });

  it("treats a missing license file as failing every stated license rule", () => {
    const unlicensed = getLicenseFamilyBySlug("no-license");
    if (!unlicensed) {
      throw new Error("no-license family missing");
    }
    const breakdown = getLicenseFamilyBreakdown(unlicensed);

    expect(breakdown.accepted).toHaveLength(0);
    expect(breakdown.isOsiApproved).toBeFalsy();
  });

  it("marks programs without a license rule as unspecified everywhere", () => {
    const anthropic = getProgramBySlug("anthropic-claude");
    if (!anthropic) {
      throw new Error("anthropic-claude test data missing");
    }

    for (const family of LICENSE_FAMILIES) {
      const breakdown = getLicenseFamilyBreakdown(family);
      expect(breakdown.unspecified.map((p) => p.slug)).toContain(
        anthropic.slug,
      );
    }
  });
});
