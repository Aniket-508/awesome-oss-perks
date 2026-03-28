import type { RepoContext } from "@ossperks/core";

export const makeCtx = (overrides: Partial<RepoContext> = {}): RepoContext => ({
  createdAt: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
  dependencies: [],
  description: "A test library",
  isFork: false,
  isOrgOwned: false,
  isPrivate: false,
  license: "MIT",
  name: "my-lib",
  owner: "test",
  path: "test/my-lib",
  provider: "github",
  pushedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  repo: "my-lib",
  stars: 2000,
  topics: ["library", "typescript"],
  ...overrides,
});
