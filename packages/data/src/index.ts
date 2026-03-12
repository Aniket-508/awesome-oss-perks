import _1password from "./programs/1password.json" with { type: "json" };
import anthropicClaude from "./programs/anthropic-claude.json" with { type: "json" };
import browserstack from "./programs/browserstack.json" with { type: "json" };
import circleci from "./programs/circleci.json" with { type: "json" };
import cloudflare from "./programs/cloudflare.json" with { type: "json" };
import githubCopilot from "./programs/github-copilot.json" with { type: "json" };
import gitlab from "./programs/gitlab.json" with { type: "json" };
import jetbrains from "./programs/jetbrains.json" with { type: "json" };
import netlify from "./programs/netlify.json" with { type: "json" };
import openaiCodex from "./programs/openai-codex.json" with { type: "json" };
import openpanel from "./programs/openpanel.json" with { type: "json" };
import sentry from "./programs/sentry.json" with { type: "json" };
import snyk from "./programs/snyk.json" with { type: "json" };
import vercel from "./programs/vercel.json" with { type: "json" };
import zulip from "./programs/zulip.json" with { type: "json" };
import { programSchema } from "./schema.js";
import type { Program, Category } from "./schema.js";

const raw = [
  _1password,
  anthropicClaude,
  browserstack,
  circleci,
  cloudflare,
  githubCopilot,
  gitlab,
  jetbrains,
  netlify,
  openaiCodex,
  openpanel,
  sentry,
  snyk,
  vercel,
  zulip,
];

export const programs: Program[] = raw.map((p) => programSchema.parse(p));

export const getProgramBySlug = (slug: string): Program | undefined =>
  programs.find((p) => p.slug === slug);

export const getProgramsByCategory = (category: Category): Program[] =>
  programs.filter((p) => p.category === category);

export const getCategories = (): Category[] =>
  [...new Set(programs.map((p) => p.category))].toSorted();

export { programSchema, type Program, type Category } from "./schema.js";
export { CATEGORY_LABELS } from "./schema.js";
