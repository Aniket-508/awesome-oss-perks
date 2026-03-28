import { isNewerVersion } from "../src/utils/check-updates.js";

describe(isNewerVersion, () => {
  it("returns true for newer stable versions", () => {
    expect(isNewerVersion("0.3.3", "0.4.0")).toBeTruthy();
  });

  it("returns false for older or equal versions", () => {
    expect(isNewerVersion("0.4.0", "0.3.3")).toBeFalsy();
    expect(isNewerVersion("0.4.0", "0.4.0")).toBeFalsy();
  });

  it("treats stable releases as newer than matching prereleases", () => {
    expect(isNewerVersion("1.0.0-beta.1", "1.0.0")).toBeTruthy();
    expect(isNewerVersion("1.0.0", "1.0.0-beta.1")).toBeFalsy();
  });

  it("fails closed for unparsable version strings", () => {
    expect(isNewerVersion("main", "0.4.0")).toBeFalsy();
    expect(isNewerVersion("0.4.0", "latest")).toBeFalsy();
  });
});
