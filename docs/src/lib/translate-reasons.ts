import type { CheckTranslations } from "@/locales/en/check";

type ReasonTemplates = CheckTranslations["reasons"];

interface PatternMapping {
  key: keyof ReasonTemplates;
  params: (match: RegExpMatchArray) => Record<string, string>;
  pattern: RegExp;
}

const FIXED_REASON_MAP: Record<string, keyof ReasonTemplates> = {
  "Code of Conduct cannot be auto-verified": "codeOfConduct",
  "community size cannot be auto-verified": "communitySize",
  "criteria cannot be auto-verified": "criteriaUnverifiable",
  "hosting platform requirement cannot be auto-verified": "hostingPlatform",
  "mission alignment cannot be auto-verified": "missionAlignment",
  "non-commercial requirement cannot be auto-verified": "nonCommercial",
  "popularity threshold is determined by the provider": "popularityThreshold",
  "procedural step — apply manually": "procedural",
  "repository is a fork": "repoFork",
  "repository is private": "repoPrivate",
  "requires a GitHub repository": "requiresGithub",
  "requires a GitLab repository": "requiresGitlab",
  "role requirement cannot be auto-verified": "role",
  "subjective criteria cannot be auto-verified": "subjective",
  "usage restriction cannot be auto-verified": "usageRestriction",
};

const PATTERN_MAPPINGS: PatternMapping[] = [
  {
    key: "starsBelow",
    params: (m) => ({ current: m[2], threshold: m[1] }),
    pattern: /^requires ([\d,]+)\+ stars \(you have ([\d,]+)\)$/,
  },
  {
    key: "starsMet",
    params: (m) => ({ current: m[1], threshold: m[2] }),
    pattern: /^([\d,]+) stars meets the ([\d,]+)\+ threshold$/,
  },
  {
    key: "projectTooNew",
    params: (m) => ({ current: m[2], required: m[1] }),
    pattern:
      /^project must be at least (\d+) days old \(yours is (\d+) days old\)$/,
  },
  {
    key: "inactive",
    params: (m) => ({ days: m[1] }),
    pattern: /^last commit was (\d+) days ago \(project may be inactive\)$/,
  },
  {
    key: "permissiveLicense",
    params: (m) => ({ license: m[1] }),
    pattern: /^requires a permissive license \(detected: (.+)\)$/,
  },
  {
    key: "osiLicense",
    params: (m) => ({ license: m[1] }),
    pattern: /^requires an OSI-approved license \(detected: (.+)\)$/,
  },
  {
    key: "noOsiLicense",
    params: (m) => ({ license: m[1] }),
    pattern: /^no OSI-approved license detected \(detected: (.+)\)$/,
  },
];

const interpolate = (template: string, params: Record<string, string>) => {
  let result = template;
  for (const [k, v] of Object.entries(params)) {
    result = result.replaceAll(`{${k}}`, v);
  }
  return result;
};

/**
 * Translates a single checker-generated English reason string
 * using the locale's reason templates. Returns null if no match.
 */
const translateCheckerReason = (
  reason: string,
  templates: ReasonTemplates
): string | null => {
  const fixedKey = FIXED_REASON_MAP[reason];
  if (fixedKey) {
    return templates[fixedKey];
  }

  for (const { key, params, pattern } of PATTERN_MAPPINGS) {
    const match = reason.match(pattern);
    if (match) {
      return interpolate(templates[key], params(match));
    }
  }

  return null;
};

/**
 * Translates an array of reason strings for a single program.
 *
 * Strategy:
 * 1. Try to match against known checker-generated patterns → use locale template
 * 2. Try to find the reason in the English eligibility array → use translated
 *    eligibility at the same index
 * 3. Fall back to the original English reason
 */
export const translateReasons = (
  reasons: string[],
  englishEligibility: string[],
  translatedEligibility: string[],
  templates: ReasonTemplates
): string[] =>
  reasons.map((reason) => {
    const checkerTranslation = translateCheckerReason(reason, templates);
    if (checkerTranslation) {
      return checkerTranslation;
    }

    const idx = englishEligibility.indexOf(reason);
    if (idx !== -1 && idx < translatedEligibility.length) {
      return translatedEligibility[idx];
    }

    return reason;
  });
