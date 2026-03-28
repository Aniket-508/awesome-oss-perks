import { parseRepoUrl } from "@ossperks/core";

describe(parseRepoUrl, () => {
  it("parses HTTPS GitHub URL", () => {
    expect(parseRepoUrl("https://github.com/vercel/next.js")).toStrictEqual({
      owner: "vercel",
      path: "vercel/next.js",
      provider: "github",
      repo: "next.js",
    });
  });

  it("parses git+https GitHub URL with .git suffix", () => {
    expect(parseRepoUrl("git+https://github.com/owner/repo.git")).toStrictEqual(
      {
        owner: "owner",
        path: "owner/repo",
        provider: "github",
        repo: "repo",
      },
    );
  });

  it("parses SSH GitHub URL", () => {
    expect(parseRepoUrl("git@github.com:owner/repo.git")).toStrictEqual({
      owner: "owner",
      path: "owner/repo",
      provider: "github",
      repo: "repo",
    });
  });

  it("parses HTTPS GitLab URL", () => {
    expect(parseRepoUrl("https://gitlab.com/user/project.git")).toStrictEqual({
      owner: "user",
      path: "user/project",
      provider: "gitlab",
      repo: "project",
    });
  });

  it("parses GitLab subgroup URLs", () => {
    expect(
      parseRepoUrl("https://gitlab.com/group/subgroup/project/-/tree/main"),
    ).toStrictEqual({
      owner: "group",
      path: "group/subgroup/project",
      provider: "gitlab",
      repo: "project",
    });
  });

  it("rejects malformed hosts that contain github.com as a substring", () => {
    expect(parseRepoUrl("https://notgithub.com/vercel/next.js")).toBeNull();
    expect(
      parseRepoUrl("https://example.com/path/github.com/vercel/next.js"),
    ).toBeNull();
  });

  it("parses HTTPS Codeberg URL", () => {
    expect(parseRepoUrl("https://codeberg.org/user/project")).toStrictEqual({
      owner: "user",
      path: "user/project",
      provider: "codeberg",
      repo: "project",
    });
  });

  it("parses Codeberg URL with .git suffix", () => {
    expect(parseRepoUrl("https://codeberg.org/user/project.git")).toStrictEqual(
      {
        owner: "user",
        path: "user/project",
        provider: "codeberg",
        repo: "project",
      },
    );
  });

  it("parses SSH Codeberg URL", () => {
    expect(parseRepoUrl("git@codeberg.org:user/project.git")).toStrictEqual({
      owner: "user",
      path: "user/project",
      provider: "codeberg",
      repo: "project",
    });
  });

  it("parses HTTPS Gitea URL", () => {
    expect(parseRepoUrl("https://gitea.com/owner/repo")).toStrictEqual({
      owner: "owner",
      path: "owner/repo",
      provider: "gitea",
      repo: "repo",
    });
  });

  it("returns null for unknown hosts", () => {
    expect(parseRepoUrl("https://example.com/user/repo")).toBeNull();
  });

  it("returns null for empty string", () => {
    expect(parseRepoUrl("")).toBeNull();
  });
});
