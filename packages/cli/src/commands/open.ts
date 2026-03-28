import { execSync } from "node:child_process";

import { Command } from "commander";

import { track } from "../utils/telemetry.js";

const SITE_URL = "https://www.ossperks.com";

export const openCommand = new Command("open")
  .description("Open ossperks.com in your default browser")
  .action(() => {
    track("cli:open");

    try {
      let cmd: string;
      if (process.platform === "win32") {
        cmd = `start ${SITE_URL}`;
      } else if (process.platform === "darwin") {
        cmd = `open ${SITE_URL}`;
      } else {
        cmd = `xdg-open ${SITE_URL}`;
      }
      execSync(cmd, { stdio: "ignore" });
    } catch {
      console.log(SITE_URL);
    }
  });
