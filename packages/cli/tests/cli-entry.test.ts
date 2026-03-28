import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

describe("cli without args (non-TTY)", () => {
  it("prints help when run without args in non-TTY mode", () => {
    const cliPath = fileURLToPath(new URL("../dist/index.js", import.meta.url));
    const stdout = execFileSync(process.execPath, [cliPath], {
      encoding: "utf8",
      env: {
        ...process.env,
        DO_NOT_TRACK: "1",
      },
    });

    expect(stdout).toContain("Usage: ossperks [options] [command]");
    expect(stdout).toContain("Commands:");
  });
});
