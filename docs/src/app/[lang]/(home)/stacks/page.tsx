import { getStackPerkCount, STACKS } from "@ossperks/core";
import { ChevronRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { ViewTransition } from "react";

import { PageBreadcrumb } from "@/components/shared/page-breadcrumb";
import { ROUTES } from "@/constants/routes";
import { generateLangParams } from "@/i18n/config";
import { getT } from "@/i18n/get-t";
import { withLocalePrefix } from "@/i18n/navigation";
import { BreadcrumbJsonLd, StacksIndexItemListJsonLd } from "@/seo/json-ld";
import { createMetadata } from "@/seo/metadata";

export const generateStaticParams = generateLangParams;

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> => {
  const { lang } = await params;
  const t = await getT(lang);

  return createMetadata({
    description: t.stacks.listing.intro,
    lang,
    path: ROUTES.STACKS,
    title: t.stacks.listing.heading,
  });
};

export default async function StacksListingPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = await getT(lang);

  return (
    <ViewTransition
      enter={{
        default: "none",
        "nav-back": "nav-back",
        "nav-forward": "nav-forward",
      }}
      exit={{
        default: "none",
        "nav-back": "nav-back",
        "nav-forward": "nav-forward",
      }}
      default="none"
    >
      <BreadcrumbJsonLd
        items={[
          { name: t.common.breadcrumbHome, path: "/" },
          { name: t.stacks.listing.breadcrumb, path: ROUTES.STACKS },
        ]}
        lang={lang}
      />
      <StacksIndexItemListJsonLd
        lang={lang}
        listName={t.stacks.listing.heading}
        stacks={STACKS.map((stack) => ({
          label:
            t.stacks.items[stack.slug as keyof typeof t.stacks.items].shortName,
          slug: stack.slug,
        }))}
      />
      <div className="view-container flex flex-1 flex-col">
        <PageBreadcrumb
          homeHref={withLocalePrefix(lang, ROUTES.HOME)}
          homeLabel={t.common.breadcrumbHome}
          segments={[{ current: true, label: t.stacks.listing.breadcrumb }]}
        />
        <h1 className="mb-2 text-4xl font-bold">{t.stacks.listing.heading}</h1>
        <p className="text-fd-muted-foreground mb-10 max-w-2xl text-lg">
          {t.stacks.listing.intro}
        </p>

        <div className="grid gap-3 md:grid-cols-2">
          {STACKS.map((stack) => {
            const copy =
              t.stacks.items[stack.slug as keyof typeof t.stacks.items];
            return (
              <Link
                className="border-fd-border/60 hover:bg-fd-muted/40 flex items-start justify-between gap-3 rounded-lg border px-4 py-4 transition-colors"
                href={withLocalePrefix(
                  lang,
                  `${ROUTES.STACKS}/${stack.slug}` as `/${string}`,
                )}
                key={stack.slug}
                transitionTypes={["nav-forward"]}
              >
                <div className="min-w-0">
                  <div className="font-medium">{copy.shortName}</div>
                  <p className="text-fd-muted-foreground mt-1 text-sm">
                    {copy.description}
                  </p>
                  <p className="text-fd-muted-foreground mt-2 text-sm font-medium">
                    {t.stacks.listing.programsCount.replace(
                      "{count}",
                      String(stack.entries.length),
                    )}
                    {" · "}
                    {t.stacks.listing.perksCount.replace(
                      "{count}",
                      String(getStackPerkCount(stack)),
                    )}
                  </p>
                </div>
                <ChevronRight className="text-fd-muted-foreground mt-1 size-4 shrink-0" />
              </Link>
            );
          })}
        </div>
      </div>
    </ViewTransition>
  );
}
