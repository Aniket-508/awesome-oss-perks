import { Command } from "commander";

import { openUrl } from "../utils/open-url.js";
import { track } from "../utils/telemetry.js";

const SITE_URL = "https://www.ossperks.com";

export const openCommand = new Command("open")
  .description("Open ossperks.com in your default browser")
  .action(async () => {
    track("cli:open");

    try {
      await openUrl(SITE_URL);
    } catch {
      console.log(SITE_URL);
    }
  });
