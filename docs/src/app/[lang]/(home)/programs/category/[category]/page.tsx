import {
  CATEGORY_LABELS,
  getCategories,
  getProgramsByCategory,
} from "@ossperks/core";
import type { Category } from "@ossperks/core";
import { ArrowLeftIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProgramCard } from "@/components/programs/program-card";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { i18n } from "@/i18n/config";
import { formatProgramsCategoryIntro } from "@/i18n/format-programs-category-intro";
import { getT } from "@/i18n/get-t";
import { withLocalePrefix } from "@/i18n/navigation";
import { getProgram } from "@/lib/programs";
import { BreadcrumbJsonLd, CategoryProgramListJsonLd } from "@/seo/json-ld";
import { createMetadata } from "@/seo/metadata";

const VALID_CATEGORIES = new Set<string>(Object.keys(CATEGORY_LABELS));

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ lang: string; category: string }>;
}) {
  const { lang, category } = await params;
  if (!VALID_CATEGORIES.has(category)) {
    notFound();
  }

  const corePrograms = getProgramsByCategory(category as Category);
  const [t, translatedPrograms] = await Promise.all([
    getT(lang),
    Promise.all(corePrograms.map((p) => getProgram(p.slug, lang))),
  ]);

  const programs = translatedPrograms.filter(
    (p): p is NonNullable<typeof p> => p !== undefined,
  );

  const categoryLabel =
    t.common.categories[category as keyof typeof t.common.categories] ??
    category;
  const pageHeading = t.programs.category.heading.replace(
    "{category}",
    categoryLabel,
  );

  return (
    <>
      <BreadcrumbJsonLd
        lang={lang}
        items={[
          { name: "Home", path: "/" },
          { name: t.programs.listing.heading, path: "/programs" },
          {
            name: categoryLabel,
            path: `${ROUTES.PROGRAMS_CATEGORY}/${category}` as `/${string}`,
          },
        ]}
      />
      <CategoryProgramListJsonLd
        lang={lang}
        categoryLabel={categoryLabel}
        pageName={pageHeading}
        programs={programs.map((p) => ({ name: p.name, slug: p.slug }))}
      />
      <div className="container mx-auto flex w-full flex-1 flex-col px-4 py-12">
        <div className="mb-6">
          <Button
            variant="link"
            size="sm"
            nativeButton={false}
            render={
              <Link href={withLocalePrefix(lang, ROUTES.PROGRAMS)}>
                <ArrowLeftIcon />
                {t.programs.backToAll}
              </Link>
            }
          />
        </div>

        <div className="mb-10">
          <h1 className="mb-2 text-4xl font-bold">{pageHeading}</h1>
          <p className="text-fd-muted-foreground max-w-2xl text-lg">
            {formatProgramsCategoryIntro(
              t.programs.category.intro,
              programs.length,
              categoryLabel,
              lang,
            )}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {programs.map((program) => {
            const programCategoryLabel =
              t.common.categories[
                program.category as keyof typeof t.common.categories
              ] ?? program.category;
            const programHref = withLocalePrefix(
              lang,
              `${ROUTES.PROGRAMS}/${program.slug}` as `/${string}`,
            );
            return (
              <ProgramCard
                key={program.slug}
                program={program}
                programHref={programHref}
                categoryLabel={programCategoryLabel}
                learnMore={t.programs.learnMore}
                more={t.programs.more}
              />
            );
          })}
        </div>

        {programs.length === 0 && (
          <div className="bg-fd-muted/30 rounded-lg border border-dashed p-12 text-center">
            <p className="text-fd-muted-foreground">
              {t.programs.category.empty}
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export const generateStaticParams = (): {
  lang: string;
  category: string;
}[] =>
  i18n.languages.flatMap((lang) =>
    getCategories().map((category) => ({ category, lang })),
  );

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ lang: string; category: string }>;
}): Promise<Metadata> => {
  const { lang, category } = await params;
  if (!VALID_CATEGORIES.has(category)) {
    notFound();
  }

  const t = await getT(lang);
  const categoryLabel =
    t.common.categories[category as keyof typeof t.common.categories] ??
    category;
  const programCount = getProgramsByCategory(category as Category).length;

  const title = t.programs.category.heading.replace(
    "{category}",
    categoryLabel,
  );
  const description = formatProgramsCategoryIntro(
    t.programs.category.intro,
    programCount,
    categoryLabel,
    lang,
  );

  return createMetadata({
    description,
    lang,
    path: `${ROUTES.PROGRAMS_CATEGORY}/${category}` as `/${string}`,
    title,
  });
};
