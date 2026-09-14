const licenses = {
  nav: "Licenses",
  listing: {
    accepted: "{count} accept",
    breadcrumb: "Licenses",
    checkCta: "Check your repository",
    heading: "Open source perks by license",
    includes: "Includes",
    intro:
      "Your license is the first gate on almost every perk program. Here is what each license family unlocks across {count} programs.",
    rejected: "{count} reject",
    unspecified: "{count} unspecified",
  },
  detail: {
    acceptedHeading: "Accepted by {count} programs",
    breadcrumb: "Licenses",
    checkCta: "Check your repository",
    checkCtaIntro:
      "A license is one gate. Stars, activity, and commercial use are others — check your repository against all {count} programs.",
    rejectedOsiHeading: "Rejected by {count} programs — OSI-approved required",
    rejectedOsiIntro:
      "These programs require a license approved by the Open Source Initiative. This family does not qualify.",
    rejectedPermissiveHeading:
      "Rejected by {count} programs — permissive license required",
    rejectedPermissiveIntro:
      "These programs accept only permissive licenses such as MIT, Apache-2.0, BSD, and ISC.",
    spdxHeading: "Licenses in this family",
    summary:
      "{accepted} accept · {rejected} reject · {unspecified} state no license requirement",
    unspecifiedHeading: "No stated license requirement: {count} programs",
    unspecifiedIntro:
      "These programs never mention a license in their eligibility rules. Applying is still worthwhile — approval is at the provider's discretion.",
  },
  families: {
    copyleft: {
      advice:
        "Copyleft licenses are OSI-approved, so nearly every program accepts them. Only programs that explicitly demand a permissive license turn them down. AGPL-3.0 sits in this group: it clears automated OSI checks, but some providers review it by hand because of the network-use clause.",
      heading: "Open source perks for GPL and AGPL projects",
      metaDescription:
        "{accepted} of {total} open-source perk programs accept copyleft licenses such as GPL-3.0, AGPL-3.0 and MPL-2.0. See which programs reject them, and why.",
      metaTitle: "Copyleft licenses — which open source perks accept GPL & AGPL",
      name: "Copyleft",
      tagline:
        "GPL, AGPL, LGPL, MPL and EPL are OSI-approved but not permissive.",
    },
    permissive: {
      advice:
        "Permissive licenses clear every license gate in the catalog. If a program still turns you down, the reason is stars, activity, or commercial use — not your license.",
      heading: "Open source perks for MIT and Apache licensed projects",
      metaDescription:
        "{accepted} of {total} open-source perk programs accept permissive licenses such as MIT, Apache-2.0 and BSD-3-Clause — more than any other license family.",
      metaTitle: "Permissive licenses — open source perks for MIT & Apache projects",
      name: "Permissive",
      tagline:
        "MIT, Apache-2.0, BSD and ISC place no conditions on redistribution.",
    },
    "source-available": {
      advice:
        "BUSL, SSPL, Elastic and FSL are source-available, not open source: the Open Source Initiative has not approved them. They fail almost every program's license gate. Relicensing the project — or dual-licensing an OSI-approved core — is the only route in.",
      heading: "Open source perks for BUSL, SSPL and other source-available projects",
      metaDescription:
        "Source-available licenses such as BUSL-1.1, SSPL-1.0 and Elastic-2.0 are not OSI-approved, so {rejected} of {total} perk programs reject them. Here is what is left.",
      metaTitle: "Source-available licenses — do open source perks accept BUSL & SSPL?",
      name: "Source-available",
      tagline:
        "BUSL, SSPL, Elastic and FSL publish source code but are not OSI-approved.",
    },
    unlicensed: {
      advice:
        "A repository with no LICENSE file is proprietary by default, so every license gate fails. Adding an OSI-approved LICENSE file is the single highest-value change you can make before applying.",
      heading: "Open source perks for repositories with no license file",
      metaDescription:
        "A repository without a LICENSE file is proprietary by default: {rejected} of {total} perk programs reject it outright. Adding an OSI-approved license fixes it in one commit.",
      metaTitle: "No license file — why perk programs reject your repo",
      name: "No license",
      tagline: "A repository with no LICENSE file grants no rights to anyone.",
    },
  },
} as const;

export type LicensesTranslations = typeof licenses;
export default licenses;
