import { name } from "#core";

describe("@ossperks/cli", () => {
  it("exports package name", () => {
    expect(name).toBe("@ossperks/cli");
  });
});
