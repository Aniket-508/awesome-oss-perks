import type { Program } from "@ossperks/data";
import { programs } from "@ossperks/data";

import {
  getLicenseRequirement,
  isOsiApproved,
  isPermissive,
} from "./eligibility";

/**
 * License families that produce a *different* eligibility answer across the
 * catalog. Programs gate on two things only — "OSI-approved" and "permissive" —
 * so anything finer than these four groups would render identical program lists.
 */
export type LicenseFamily =
  | "copyleft"
  | "permissive"
  | "source-available"
  | "unlicensed";

export interface LicenseFamilyInfo {
  /** SPDX ids that belong to this family; all share the family's verdict. */
  readonly spdxIds: readonly string[];
  /** `null` for repositories that ship no license file at all. */
  readonly representative: string | null;
  readonly family: LicenseFamily;
  readonly slug: string;
}

export const LICENSE_FAMILIES: readonly LicenseFamilyInfo[] = [
  {
    family: "permissive",
    representative: "MIT",
    slug: "permissive",
    spdxIds: [
      "MIT",
      "Apache-2.0",
      "BSD-3-Clause",
      "BSD-2-Clause",
      "ISC",
      "0BSD",
      "MIT-0",
      "Zlib",
      "Unlicense",
      "BSL-1.0",
      "UPL-1.0",
      "Artistic-2.0",
      "BlueOak-1.0.0",
      "PostgreSQL",
      "NCSA",
    ],
  },
  {
    family: "copyleft",
    representative: "GPL-3.0",
    slug: "copyleft",
    spdxIds: [
      "GPL-3.0",
      "GPL-2.0",
      "AGPL-3.0",
      "LGPL-3.0",
      "LGPL-2.1",
      "MPL-2.0",
      "EPL-2.0",
      "EUPL-1.2",
      "CDDL-1.0",
      "OSL-3.0",
    ],
  },
  {
    family: "source-available",
    representative: "BUSL-1.1",
    slug: "source-available",
    spdxIds: [
      "BUSL-1.1",
      "SSPL-1.0",
      "Elastic-2.0",
      "FSL-1.1-MIT",
      "FSL-1.1-ALv2",
      "CC-BY-NC-4.0",
    ],
  },
  {
    family: "unlicensed",
    representative: null,
    slug: "no-license",
    spdxIds: [],
  },
] as const;

/** URL segment for an SPDX id: `Apache-2.0` -> `apache-2-0`. */
export const toLicenseSlug = (spdxId: string): string =>
  spdxId.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-");

const familyBySlug: Record<string, LicenseFamilyInfo> = {};
const familyByLicenseSlug: Record<string, LicenseFamilyInfo> = {};
for (const info of LICENSE_FAMILIES) {
  familyBySlug[info.slug] = info;
  for (const spdxId of info.spdxIds) {
    familyByLicenseSlug[toLicenseSlug(spdxId)] = info;
  }
}

export const getLicenseFamilyBySlug = (
  slug: string,
): LicenseFamilyInfo | undefined => familyBySlug[slug];

/** Resolves an SPDX alias slug (`agpl-3-0`) to the family page it belongs to. */
export const getLicenseFamilyByLicenseSlug = (
  slug: string,
): LicenseFamilyInfo | undefined => familyByLicenseSlug[slug];

export const getLicenseFamilySlugs = (): string[] =>
  LICENSE_FAMILIES.map((info) => info.slug);

export const getLicenseAliasSlugs = (): string[] =>
  Object.keys(familyByLicenseSlug);

export interface LicenseFamilyBreakdown {
  /** Programs whose stated license rule this family satisfies. */
  accepted: Program[];
  family: LicenseFamilyInfo;
  isOsiApproved: boolean;
  isPermissive: boolean;
  /** Programs that require a permissive license this family cannot meet. */
  rejectedByPermissive: Program[];
  /** Programs that require an OSI-approved license this family cannot meet. */
  rejectedByOsi: Program[];
  /** Programs that never state a license requirement. */
  unspecified: Program[];
}

export const getLicenseFamilyBreakdown = (
  family: LicenseFamilyInfo,
  catalog: Program[] = programs,
): LicenseFamilyBreakdown => {
  const osiApproved = isOsiApproved(family.representative);
  const permissive = isPermissive(family.representative);

  const breakdown: LicenseFamilyBreakdown = {
    accepted: [],
    family,
    isOsiApproved: osiApproved,
    isPermissive: permissive,
    rejectedByOsi: [],
    rejectedByPermissive: [],
    unspecified: [],
  };

  for (const program of catalog) {
    const requirement = getLicenseRequirement(program);
    if (requirement === null) {
      breakdown.unspecified.push(program);
    } else if (requirement === "permissive") {
      (permissive ? breakdown.accepted : breakdown.rejectedByPermissive).push(
        program,
      );
    } else {
      (osiApproved ? breakdown.accepted : breakdown.rejectedByOsi).push(
        program,
      );
    }
  }

  return breakdown;
};

export interface LicenseFamilyCount {
  accepted: number;
  family: LicenseFamilyInfo;
  rejected: number;
  unspecified: number;
}

export const getLicenseFamilyCounts = (
  catalog: Program[] = programs,
): LicenseFamilyCount[] =>
  LICENSE_FAMILIES.map((family) => {
    const breakdown = getLicenseFamilyBreakdown(family, catalog);
    return {
      accepted: breakdown.accepted.length,
      family,
      rejected:
        breakdown.rejectedByOsi.length + breakdown.rejectedByPermissive.length,
      unspecified: breakdown.unspecified.length,
    };
  });
