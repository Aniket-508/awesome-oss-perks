import { getLicenseFamilyCounts, programs } from "@ossperks/core";
import { ChevronRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { ViewTransition } from "react";

import { PageBreadcrumb } from "@/components/shared/page-breadcrumb";
import { ROUTES } from "@/constants/routes";
import { generateLangParams } from "@/i18n/config";
import { getT } from "@/i18n/get-t";
import { withLocalePrefix } from "@/i18n/navigation";
import { BreadcrumbJsonLd, LicensesIndexItemListJsonLd } from "@/seo/json-ld";
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
    description: t.licenses.listing.intro.replace(
      "{count}",
      String(programs.length),
    ),
    lang,
    path: ROUTES.LICENSES,
    title: t.licenses.listing.heading,
  });
};

export default async function LicensesListingPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = await getT(lang);
  const counts = getLicenseFamilyCounts();

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
          { name: t.licenses.listing.breadcrumb, path: ROUTES.LICENSES },
        ]}
        lang={lang}
      />
      <LicensesIndexItemListJsonLd
        lang={lang}
        licenses={counts.map(({ family }) => ({
          label: t.licenses.families[family.family].name,
          slug: family.slug,
        }))}
        listName={t.licenses.listing.heading}
      />
      <div className="view-container flex flex-1 flex-col">
        <PageBreadcrumb
          homeHref={withLocalePrefix(lang, ROUTES.HOME)}
          homeLabel={t.common.breadcrumbHome}
          segments={[{ current: true, label: t.licenses.listing.breadcrumb }]}
        />
        <h1 className="mb-2 text-4xl font-bold">
          {t.licenses.listing.heading}
        </h1>
        <p className="text-fd-muted-foreground mb-10 max-w-2xl text-lg">
          {t.licenses.listing.intro.replace("{count}", String(programs.length))}
        </p>

        <div className="grid gap-3 md:grid-cols-2">
          {counts.map(({ accepted, family, rejected, unspecified }) => {
            const copy = t.licenses.families[family.family];
            return (
              <Link
                className="border-fd-border/60 hover:bg-fd-muted/40 flex items-start justify-between gap-3 rounded-lg border px-4 py-4 transition-colors"
                href={withLocalePrefix(
                  lang,
                  `${ROUTES.LICENSES}/${family.slug}` as `/${string}`,
                )}
                key={family.slug}
                transitionTypes={["nav-forward"]}
              >
                <div className="min-w-0">
                  <div className="font-medium">{copy.name}</div>
                  <p className="text-fd-muted-foreground mt-1 text-sm">
                    {copy.tagline}
                  </p>
                  <p className="text-fd-muted-foreground mt-2 text-sm font-medium">
                    {t.licenses.listing.accepted.replace(
                      "{count}",
                      String(accepted),
                    )}
                    {" · "}
                    {t.licenses.listing.rejected.replace(
                      "{count}",
                      String(rejected),
                    )}
                    {" · "}
                    {t.licenses.listing.unspecified.replace(
                      "{count}",
                      String(unspecified),
                    )}
                  </p>
                  {family.spdxIds.length > 0 && (
                    <p className="text-fd-muted-foreground mt-2 text-xs">
                      {t.licenses.listing.includes}:{" "}
                      {family.spdxIds.slice(0, 5).join(", ")}
                    </p>
                  )}
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
