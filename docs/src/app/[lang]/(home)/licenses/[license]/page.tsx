import {
  getLicenseAliasSlugs,
  getLicenseFamilyBreakdown,
  getLicenseFamilyByLicenseSlug,
  getLicenseFamilyBySlug,
  getLicenseFamilySlugs,
  programs as allPrograms,
} from "@ossperks/core";
import type {
  LicenseFamilyBreakdown,
  LicenseFamilyInfo,
  Program,
} from "@ossperks/core";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ViewTransition } from "react";

import { ProgramCard } from "@/components/programs/program-card";
import { PageBreadcrumb } from "@/components/shared/page-breadcrumb";
import { Badge } from "@/components/ui/badge";
import { ROUTES } from "@/constants/routes";
import { i18n } from "@/i18n/config";
import { getT } from "@/i18n/get-t";
import { withLocalePrefix } from "@/i18n/navigation";
import { getProgram } from "@/lib/programs";
import { BreadcrumbJsonLd, CategoryProgramListJsonLd } from "@/seo/json-ld";
import { createMetadata } from "@/seo/metadata";

const familyPath = (slug: string): `/${string}` =>
  `${ROUTES.LICENSES}/${slug}` as `/${string}`;

/**
 * Family slugs render a page; SPDX alias slugs (`agpl-3-0`) exist only so that
 * license-specific URLs resolve, and redirect onto their family page.
 */
const resolveLicenseParam = (
  license: string,
): { family: LicenseFamilyInfo; isAlias: boolean } => {
  const family = getLicenseFamilyBySlug(license);
  if (family) {
    return { family, isAlias: false };
  }
  const aliased = getLicenseFamilyByLicenseSlug(license);
  if (!aliased) {
    notFound();
  }
  return { family: aliased, isAlias: true };
};

export const generateStaticParams = (): { lang: string; license: string }[] => {
  const slugs = [...getLicenseFamilySlugs(), ...getLicenseAliasSlugs()];
  return i18n.languages.flatMap((lang) =>
    slugs.map((license) => ({ lang, license })),
  );
};

/** Fills the `{accepted}` / `{rejected}` / `{unspecified}` / `{total}` counts used in family copy. */
const withCounts = (
  template: string,
  breakdown: LicenseFamilyBreakdown,
): string =>
  template
    .replace("{accepted}", String(breakdown.accepted.length))
    .replace(
      "{rejected}",
      String(
        breakdown.rejectedByOsi.length + breakdown.rejectedByPermissive.length,
      ),
    )
    .replace("{unspecified}", String(breakdown.unspecified.length))
    .replace("{total}", String(allPrograms.length));

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ lang: string; license: string }>;
}): Promise<Metadata> => {
  const { lang, license } = await params;
  const { family } = resolveLicenseParam(license);
  const t = await getT(lang);
  const copy = t.licenses.families[family.family];
  const breakdown = getLicenseFamilyBreakdown(family);

  return createMetadata({
    description: withCounts(copy.metaDescription, breakdown),
    lang,
    path: familyPath(family.slug),
    title: copy.metaTitle,
  });
};

const translatePrograms = async (
  programs: Program[],
  lang: string,
): Promise<Program[]> => {
  const translated = await Promise.all(
    programs.map((program) => getProgram(program.slug, lang)),
  );
  return translated.filter(
    (program): program is Program => program !== undefined,
  );
};

export default async function LicenseDetailPage({
  params,
}: {
  params: Promise<{ lang: string; license: string }>;
}) {
  const { lang, license } = await params;
  const { family, isAlias } = resolveLicenseParam(license);
  if (isAlias) {
    redirect(withLocalePrefix(lang, familyPath(family.slug)));
  }

  const t = await getT(lang);
  const copy = t.licenses.families[family.family];
  const breakdown = getLicenseFamilyBreakdown(family);

  const [accepted, rejectedByOsi, rejectedByPermissive, unspecified] =
    await Promise.all([
      translatePrograms(breakdown.accepted, lang),
      translatePrograms(breakdown.rejectedByOsi, lang),
      translatePrograms(breakdown.rejectedByPermissive, lang),
      translatePrograms(breakdown.unspecified, lang),
    ]);

  const programHrefPrefix = withLocalePrefix(lang, ROUTES.PROGRAMS);

  const sections = [
    {
      intro: copy.advice,
      key: "accepted",
      programs: accepted,
      title: t.licenses.detail.acceptedHeading.replace(
        "{count}",
        String(accepted.length),
      ),
    },
    {
      intro: t.licenses.detail.rejectedPermissiveIntro,
      key: "rejected-permissive",
      programs: rejectedByPermissive,
      title: t.licenses.detail.rejectedPermissiveHeading.replace(
        "{count}",
        String(rejectedByPermissive.length),
      ),
    },
    {
      intro: t.licenses.detail.rejectedOsiIntro,
      key: "rejected-osi",
      programs: rejectedByOsi,
      title: t.licenses.detail.rejectedOsiHeading.replace(
        "{count}",
        String(rejectedByOsi.length),
      ),
    },
    {
      intro: t.licenses.detail.unspecifiedIntro,
      key: "unspecified",
      programs: unspecified,
      title: t.licenses.detail.unspecifiedHeading.replace(
        "{count}",
        String(unspecified.length),
      ),
    },
  ].filter((section) => section.programs.length > 0);

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
          { name: t.licenses.detail.breadcrumb, path: ROUTES.LICENSES },
          { name: copy.name, path: familyPath(family.slug) },
        ]}
        lang={lang}
      />
      <CategoryProgramListJsonLd
        categoryLabel={copy.name}
        lang={lang}
        pageName={copy.heading}
        programs={accepted.map((program) => ({
          name: program.name,
          slug: program.slug,
        }))}
      />
      <div className="view-container flex flex-1 flex-col">
        <PageBreadcrumb
          homeHref={withLocalePrefix(lang, ROUTES.HOME)}
          homeLabel={t.common.breadcrumbHome}
          segments={[
            {
              href: withLocalePrefix(lang, ROUTES.LICENSES),
              label: t.licenses.detail.breadcrumb,
            },
            { current: true, label: copy.name },
          ]}
        />

        <h1 className="mb-2 text-4xl font-bold">{copy.heading}</h1>
        <p className="text-fd-muted-foreground mb-4 max-w-2xl text-lg text-balance">
          {copy.tagline}
        </p>
        <p className="mb-10 font-medium">
          {withCounts(t.licenses.detail.summary, breakdown)}
        </p>

        {family.spdxIds.length > 0 && (
          <section className="mb-10">
            <h2 className="mb-3 text-lg font-semibold">
              {t.licenses.detail.spdxHeading}
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {family.spdxIds.map((spdxId) => (
                <Badge key={spdxId} variant="outline">
                  {spdxId}
                </Badge>
              ))}
            </div>
          </section>
        )}

        {sections.map((section) => (
          <section className="mb-12" key={section.key}>
            <h2 className="mb-2 text-2xl font-semibold">{section.title}</h2>
            <p className="text-fd-muted-foreground mb-6 max-w-3xl">
              {section.intro}
            </p>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {section.programs.map((program) => (
                <ProgramCard
                  categoryLabel={
                    t.common.categories[
                      program.category as keyof typeof t.common.categories
                    ] ?? program.category
                  }
                  key={program.slug}
                  learnMore={t.programs.learnMore}
                  more={t.programs.more}
                  program={program}
                  programHref={`${programHrefPrefix}/${program.slug}`}
                />
              ))}
            </div>
          </section>
        ))}

        <Link
          className="border-fd-border/60 hover:bg-fd-muted/40 flex items-center justify-between gap-3 rounded-lg border px-4 py-4 transition-colors"
          href={withLocalePrefix(lang, ROUTES.CHECK)}
          transitionTypes={["nav-forward"]}
        >
          <div>
            <div className="font-medium">{t.licenses.detail.checkCta}</div>
            <p className="text-fd-muted-foreground mt-1 text-sm">
              {t.licenses.detail.checkCtaIntro.replace(
                "{count}",
                String(allPrograms.length),
              )}
            </p>
          </div>
          <ArrowRight className="text-fd-muted-foreground size-4 shrink-0" />
        </Link>
      </div>
    </ViewTransition>
  );
}
