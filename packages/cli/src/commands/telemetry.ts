import { Command } from "commander";

import { header } from "../utils/format.js";
import { highlighter } from "../utils/highlighter.js";
import { getConfigPath, getStatus, setEnabled } from "../utils/telemetry.js";
import type { TelemetryStatus } from "../utils/telemetry.js";

const STATUS_LINE: Record<TelemetryStatus, string> = {
  "disabled-by-config": "disabled",
  "disabled-by-env": "disabled (DO_NOT_TRACK / DISABLE_TELEMETRY is set)",
  on: "enabled",
};

const printStatus = (): void => {
  const status = getStatus();
  header("Telemetry");
  console.log();
  console.log(`  Status  ${highlighter.bold(STATUS_LINE[status])}`);
  console.log(`  Config  ${highlighter.dim(getConfigPath())}`);
  console.log();
  console.log(
    highlighter.dim(
      "  Anonymous usage data: command name, CLI version, OS, arch, Node version,",
    ),
  );
  console.log(
    highlighter.dim(
      "  and whether the run is in CI. No repo names, paths, or tokens are sent.",
    ),
  );
  console.log();
};

export const telemetryCommand = new Command("telemetry")
  .description("Show or change anonymous usage data collection")
  .addCommand(
    new Command("status")
      .description("Show whether telemetry is enabled")
      .action(printStatus),
  )
  .addCommand(
    new Command("enable").description("Enable telemetry").action(() => {
      setEnabled(true);
      console.log(`\n  Telemetry ${highlighter.bold("enabled")}.\n`);
      if (getStatus() === "disabled-by-env") {
        console.log(
          highlighter.dim(
            "  Still disabled for this shell: unset DO_NOT_TRACK / DISABLE_TELEMETRY.\n",
          ),
        );
      }
    }),
  )
  .addCommand(
    new Command("disable").description("Disable telemetry").action(() => {
      setEnabled(false);
      console.log(`\n  Telemetry ${highlighter.bold("disabled")}.\n`);
    }),
  )
  .action(printStatus);
