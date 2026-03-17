import type { EligibilityStatus } from "@ossperks/core";
import { CircleAlert, CircleCheck, CircleX } from "lucide-react";

export const CHECK_PAGE_CONTAINER =
  "container max-w-4xl flex-1 flex flex-col w-full py-12 px-4 mx-auto";

export const DEFAULT_PROVIDER = "github" as const;

export const STATUS_CONFIG: Record<
  EligibilityStatus,
  {
    color: string;
    icon: typeof CircleCheck;
    ring: string;
  }
> = {
  eligible: {
    color: "text-emerald-500",
    icon: CircleCheck,
    ring: "ring-emerald-500/20",
  },
  ineligible: {
    color: "text-red-500",
    icon: CircleX,
    ring: "ring-red-500/20",
  },
  "needs-review": {
    color: "text-amber-500",
    icon: CircleAlert,
    ring: "ring-amber-500/20",
  },
};
