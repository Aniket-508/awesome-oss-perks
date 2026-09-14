import { getProgramBySlug } from "./catalog";
import type { Program } from "./schema";

/**
 * Role a program plays inside a curated stack. Labels are translated in the
 * docs app; this enum only fixes the vocabulary.
 */
export const STACK_ROLES = [
  "ai-assistant",
  "analytics",
  "chat",
  "ci",
  "cms",
  "code-review",
  "code-signing",
  "containers",
  "coverage",
  "database",
  "docs",
  "errors",
  "funding",
  "hosting",
  "ide",
  "localization",
  "monitoring",
  "scheduling",
  "scraping",
  "sdk",
  "search",
  "secrets",
  "security",
  "status-page",
  "support",
  "testing",
  "visual-testing",
] as const;

export type StackRole = (typeof STACK_ROLES)[number];

export interface StackEntry {
  program: string;
  role: StackRole;
}

export interface Stack {
  entries: StackEntry[];
  slug: string;
}

/**
 * Curated perk bundles: what a project of a given shape should actually claim,
 * in the order a maintainer would set them up. Hand-picked rather than derived
 * from tags — only 5 of 54 programs declare `techPackages`, so a mechanical
 * tech filter produces near-empty pages.
 */
export const STACKS: Stack[] = [
  {
    entries: [
      { program: "vercel", role: "hosting" },
      { program: "sentry", role: "errors" },
      { program: "posthog-for-open-source", role: "analytics" },
      { program: "algolia", role: "search" },
      { program: "mintlify", role: "docs" },
      { program: "crowdin", role: "localization" },
      { program: "chromatic", role: "visual-testing" },
      { program: "blacksmith", role: "ci" },
      { program: "coderabbit", role: "code-review" },
    ],
    slug: "nextjs",
  },
  {
    entries: [
      { program: "blacksmith", role: "ci" },
      { program: "codecov", role: "coverage" },
      { program: "signpath", role: "code-signing" },
      { program: "socket-for-open-source", role: "security" },
      { program: "gitbook", role: "docs" },
      { program: "jetbrains", role: "ide" },
      { program: "github-copilot", role: "ai-assistant" },
      { program: "greptile", role: "code-review" },
    ],
    slug: "rust-cli",
  },
  {
    entries: [
      { program: "semaphore", role: "ci" },
      { program: "coveralls", role: "coverage" },
      { program: "snyk", role: "security" },
      { program: "deepsource", role: "code-review" },
      { program: "mintlify", role: "docs" },
      { program: "jetbrains", role: "ide" },
      { program: "anthropic-claude", role: "ai-assistant" },
      { program: "crowdin", role: "localization" },
    ],
    slug: "python-library",
  },
  {
    entries: [
      { program: "docker", role: "containers" },
      { program: "datadog", role: "monitoring" },
      { program: "sentry", role: "errors" },
      { program: "blacksmith", role: "ci" },
      { program: "sonarcloud", role: "security" },
      { program: "unstatus-oss-program", role: "status-page" },
      { program: "jetbrains", role: "ide" },
      { program: "cubic---open-source", role: "code-review" },
    ],
    slug: "go-service",
  },
  {
    entries: [
      { program: "circleci", role: "ci" },
      { program: "codecov", role: "coverage" },
      { program: "socket-for-open-source", role: "security" },
      { program: "github-copilot", role: "ai-assistant" },
      { program: "gitbook", role: "docs" },
      { program: "coderabbit", role: "code-review" },
      { program: "openpanel", role: "analytics" },
    ],
    slug: "node-cli",
  },
  {
    entries: [
      { program: "netlify", role: "hosting" },
      { program: "mintlify", role: "docs" },
      { program: "algolia", role: "search" },
      { program: "crowdin", role: "localization" },
      { program: "openpanel", role: "analytics" },
      { program: "argos", role: "visual-testing" },
      { program: "sanity", role: "cms" },
    ],
    slug: "docs-site",
  },
  {
    entries: [
      { program: "digitalocean", role: "hosting" },
      { program: "neon", role: "database" },
      { program: "upstash", role: "database" },
      { program: "sentry", role: "errors" },
      { program: "datadog", role: "monitoring" },
      { program: "unstatus-oss-program", role: "status-page" },
      { program: "1password", role: "secrets" },
      { program: "snyk", role: "security" },
      { program: "cossistant", role: "support" },
    ],
    slug: "self-hosted-saas",
  },
  {
    entries: [
      { program: "openai-codex-fund", role: "ai-assistant" },
      { program: "convex", role: "database" },
      { program: "sentry", role: "errors" },
      { program: "webclaw-oss-program", role: "scraping" },
      { program: "stainless-open-source-program", role: "sdk" },
      { program: "pullfrog-for-oss", role: "code-review" },
      { program: "posthog-for-open-source", role: "analytics" },
    ],
    slug: "ai-agent",
  },
  {
    entries: [
      { program: "chromatic", role: "visual-testing" },
      { program: "browserstack", role: "testing" },
      { program: "codecov", role: "coverage" },
      { program: "gitbook", role: "docs" },
      { program: "blacksmith", role: "ci" },
      { program: "cubic---open-source", role: "code-review" },
      { program: "algolia", role: "search" },
    ],
    slug: "react-component-library",
  },
  {
    entries: [
      { program: "zulip", role: "chat" },
      { program: "cal", role: "scheduling" },
      { program: "cossistant", role: "support" },
      { program: "microsoft-foss-fund", role: "funding" },
      { program: "atlassian", role: "docs" },
      { program: "gitlab", role: "ci" },
      { program: "1password", role: "secrets" },
      { program: "crowdin", role: "localization" },
    ],
    slug: "community-project",
  },
];

const stackBySlug: Record<string, Stack> = {};
for (const stack of STACKS) {
  for (const entry of stack.entries) {
    if (!getProgramBySlug(entry.program)) {
      throw new Error(
        `Stack "${stack.slug}" references unknown program "${entry.program}"`,
      );
    }
  }
  stackBySlug[stack.slug] = stack;
}

export const getStackBySlug = (slug: string): Stack | undefined =>
  stackBySlug[slug];

export const getStackSlugs = (): string[] => STACKS.map((stack) => stack.slug);

export interface StackProgram {
  program: Program;
  role: StackRole;
}

/** Resolves a stack's entries to full program records, preserving setup order. */
export const getStackPrograms = (stack: Stack): StackProgram[] =>
  stack.entries.flatMap((entry) => {
    const program = getProgramBySlug(entry.program);
    return program ? [{ program, role: entry.role }] : [];
  });

/** Total number of individual perks a stack unlocks. */
export const getStackPerkCount = (stack: Stack): number =>
  getStackPrograms(stack).reduce(
    (total, { program }) => total + program.perks.length,
    0,
  );

/** Stacks that include a given program, for cross-linking from program pages. */
export const getStacksByProgram = (programSlug: string): Stack[] =>
  STACKS.filter((stack) =>
    stack.entries.some((entry) => entry.program === programSlug),
  );
