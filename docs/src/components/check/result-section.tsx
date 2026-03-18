"use client";

import type { EligibilityStatus } from "@ossperks/core";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ROUTES } from "@/constants/routes";
import { withLocalePrefix } from "@/i18n/navigation";
import { STATUS_CONFIG } from "@/lib/check";
import type { CheckTranslations } from "@/locales/en/check";
import type { TranslatedCheckResult } from "@/types/check";

const STATUS_LABELS: Record<
  EligibilityStatus,
  keyof Pick<CheckTranslations, "eligible" | "ineligible" | "needsReview">
> = {
  eligible: "eligible",
  ineligible: "ineligible",
  "needs-review": "needsReview",
};

export const ResultSection = ({
  items,
  lang,
  status,
  translations,
}: {
  items: TranslatedCheckResult[];
  lang: string;
  status: EligibilityStatus;
  translations: CheckTranslations;
}) => {
  const config = STATUS_CONFIG[status];
  const Icon = config.icon;
  const label = translations[STATUS_LABELS[status]];

  return (
    <section className="mb-8">
      <h2
        className={`text-lg font-semibold mb-4 flex items-center gap-2 ${config.color}`}
      >
        <Icon className="size-5" />
        {label} ({items.length})
      </h2>
      <div className="grid gap-3">
        {items.map((result) => (
          <Card key={result.slug} className={config.ring}>
            <CardHeader>
              <CardTitle className="text-base min-w-0 truncate">
                {result.name}
              </CardTitle>
              <CardAction>
                <Badge
                  variant="action"
                  className="text-sm"
                  render={
                    <Link
                      href={withLocalePrefix(
                        lang,
                        `${ROUTES.PROGRAMS}/${result.slug}`
                      )}
                    >
                      {result.perksCount} {translations.perks}
                      <ArrowRight />
                    </Link>
                  }
                />
              </CardAction>
            </CardHeader>
            {result.reasons.length > 0 && (
              <CardContent className="pt-0">
                <ul className="space-y-1">
                  {[...new Set(result.reasons)].map((reason) => (
                    <li
                      key={`${result.slug}-${reason}`}
                      className="flex items-center text-sm text-fd-muted-foreground gap-2"
                    >
                      <span className="size-1 rounded-full bg-fd-muted-foreground/50 shrink-0" />
                      {reason}
                    </li>
                  ))}
                </ul>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </section>
  );
};
