import { aggregateDependencies } from "@ossperks/core";

describe(aggregateDependencies, () => {
  it("merges dependencies from multiple package.json objects", () => {
    const result = aggregateDependencies([
      { dependencies: { next: "^14.0.0", react: "^18.0.0" } },
      {
        dependencies: { convex: "^1.0.0" },
        devDependencies: { vitest: "^1.0.0" },
      },
    ]);
    expect(result).toContain("react");
    expect(result).toContain("next");
    expect(result).toContain("convex");
    expect(result).toContain("vitest");
  });

  it("deduplicates across multiple package.json objects", () => {
    const result = aggregateDependencies([
      { dependencies: { react: "^18.0.0", typescript: "^5.0.0" } },
      {
        dependencies: { react: "^18.2.0" },
        devDependencies: { typescript: "^5.1.0" },
      },
      { peerDependencies: { react: ">=17" } },
    ]);
    expect(result.filter((n) => n === "react")).toHaveLength(1);
    expect(result.filter((n) => n === "typescript")).toHaveLength(1);
  });

  it("returns empty array for empty input", () => {
    expect(aggregateDependencies([])).toStrictEqual([]);
  });

  it("handles a mix of valid and empty package objects", () => {
    const result = aggregateDependencies([
      {},
      { dependencies: { pg: "^8.0.0" } },
      { devDependencies: {} },
    ]);
    expect(result).toStrictEqual(["pg"]);
  });
});
