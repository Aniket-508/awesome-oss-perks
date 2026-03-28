import { extractDependencyNames } from "@ossperks/core";

describe(extractDependencyNames, () => {
  it("extracts from dependencies and devDependencies", () => {
    const names = extractDependencyNames({
      dependencies: { react: "^18.0.0", "react-dom": "^18.0.0" },
      devDependencies: { typescript: "^5.0.0" },
    });
    expect(names).toContain("react");
    expect(names).toContain("react-dom");
    expect(names).toContain("typescript");
  });

  it("extracts from peerDependencies and optionalDependencies", () => {
    const names = extractDependencyNames({
      optionalDependencies: { fsevents: "^2.0.0" },
      peerDependencies: { react: ">=17" },
    });
    expect(names).toContain("react");
    expect(names).toContain("fsevents");
  });

  it("deduplicates across fields", () => {
    const names = extractDependencyNames({
      dependencies: { react: "^18.0.0" },
      peerDependencies: { react: ">=17" },
    });
    expect(names.filter((n) => n === "react")).toHaveLength(1);
  });

  it("returns empty array for empty package.json", () => {
    expect(extractDependencyNames({})).toStrictEqual([]);
  });

  it("handles non-object dependency fields gracefully", () => {
    const names = extractDependencyNames({
      dependencies: "invalid",
      devDependencies: null,
    });
    expect(names).toStrictEqual([]);
  });
});
