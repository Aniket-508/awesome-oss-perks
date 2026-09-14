import {
  getStackBySlug,
  getStackPerkCount,
  getStackPrograms,
  getStackSlugs,
  STACKS,
} from "@ossperks/core";
import type { Program, StackRole } from "@ossperks/core";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";

import { PageBreadcrumb } from "@/components/shared/page-breadcrumb";
import { Badge } from "@/components/ui/badge";
import { ROUTES } from "@/constants/routes";
import { i18n } from "@/i18n/config";
import { getT } from "@/i18n/get-t";
import { withLocalePrefix } from "@/i18n/navigation";
import { getProgram } from "@/lib/programs";
import type { StacksTranslations } from "@/locales/en/stacks";
import { BreadcrumbJsonLd, StackItemListJsonLd } from "@/seo/json-ld";
import { createMetadata } from "@/seo/metadata";

type StackCopyKey = keyof StacksTranslations["items"];

const stackPath = (slug: string): `/${string}` =>
  `${ROUTES.STACKS}/${slug}` as `/${string}`;

export const generateStaticParams = (): { lang: string; stack: string }[] =>
  i18n.languages.flatMap((lang) =>
    getStackSlugs().map((stack) => ({ lang, stack })),
  );

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ lang: string; stack: string }>;
}): Promise<Metadata> => {
  const { lang, stack: stackSlug } = await params;
  const stack = getStackBySlug(stackSlug);
  if (!stack) {
    notFound();
  }

  const t = await getT(lang);
  const copy = t.stacks.items[stack.slug as StackCopyKey];
  const examples = getStackPrograms(stack)
    .slice(0, 3)
    .map(({ program }) => program.provider)
    .join(", ");

  return createMetadata({
    description: t.stacks.detail.metaDescription
      .replace("{count}", String(stack.entries.length))
      .replace("{stack}", copy.name)
      .replace("{examples}", examples),
    lang,
    path: stackPath(stack.slug),
    title: t.stacks.detail.metaTitle.replace("{stack}", copy.name),
  });
};

export default async function StackDetailPage({
  params,
}: {
  params: Promise<{ lang: string; stack: string }>;
}) {
  const { lang, stack: stackSlug } = await params;
  const stack = getStackBySlug(stackSlug);
  if (!stack) {
    notFound();
  }

  const t = await getT(lang);
  const copy = t.stacks.items[stack.slug as StackCopyKey];
  const entries = getStackPrograms(stack);

  const rows = await Promise.all(
    entries.map(async ({ program, role }) => ({
      program: (await getProgram(program.slug, lang)) ?? program,
      role,
    })),
  );

  const heading = t.stacks.detail.heading.replace("{stack}", copy.name);
  const programHrefPrefix = withLocalePrefix(lang, ROUTES.PROGRAMS);
  const otherStacks = STACKS.filter((other) => other.slug !== stack.slug);

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
          { name: t.stacks.detail.breadcrumb, path: ROUTES.STACKS },
          { name: copy.shortName, path: stackPath(stack.slug) },
        ]}
        lang={lang}
      />
      <StackItemListJsonLd
        description={copy.description}
        lang={lang}
        listName={heading}
        programs={rows.map(({ program }: { program: Program }) => ({
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
              href: withLocalePrefix(lang, ROUTES.STACKS),
              label: t.stacks.detail.breadcrumb,
            },
            { current: true, label: copy.shortName },
          ]}
        />

        <h1 className="mb-2 text-4xl font-bold">{heading}</h1>
        <p className="text-fd-muted-foreground mb-4 max-w-3xl text-lg text-balance">
          {copy.description}
        </p>
        <p className="mb-10 font-medium">
          {t.stacks.detail.summary
            .replace("{programs}", String(stack.entries.length))
            .replace("{perks}", String(getStackPerkCount(stack)))}
        </p>

        <ol className="mb-12 flex flex-col gap-3">
          {rows.map(({ program, role }, index) => (
            <li key={program.slug}>
              <Link
                className="border-fd-border/60 hover:bg-fd-muted/40 flex items-start gap-4 rounded-lg border px-4 py-4 transition-colors"
                href={`${programHrefPrefix}/${program.slug}`}
                transitionTypes={["nav-forward"]}
              >
                <span className="text-fd-muted-foreground w-6 shrink-0 text-sm tabular-nums">
                  {index + 1}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-2">
                    <Badge variant="default" className="text-xs">
                      {t.stacks.roles[role as StackRole]}
                    </Badge>
                    <span className="font-medium">{program.name}</span>
                  </span>
                  <span className="text-fd-muted-foreground mt-1 block text-sm">
                    {program.description}
                  </span>
                  <span className="mt-2 flex flex-wrap gap-1.5">
                    {program.perks.slice(0, 3).map((perk) => (
                      <Badge key={perk.title} variant="outline">
                        {perk.title}
                      </Badge>
                    ))}
                  </span>
                </span>
                <ArrowRight className="text-fd-muted-foreground mt-1 size-4 shrink-0" />
              </Link>
            </li>
          ))}
        </ol>

        <Link
          className="border-fd-border/60 hover:bg-fd-muted/40 mb-12 flex items-center justify-between gap-3 rounded-lg border px-4 py-4 transition-colors"
          href={withLocalePrefix(lang, ROUTES.CHECK)}
          transitionTypes={["nav-forward"]}
        >
          <span>
            <span className="block font-medium">
              {t.stacks.detail.checkCta}
            </span>
            <span className="text-fd-muted-foreground mt-1 block text-sm">
              {t.stacks.detail.checkCtaIntro}
            </span>
          </span>
          <ArrowRight className="text-fd-muted-foreground size-4 shrink-0" />
        </Link>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">
            {t.stacks.detail.otherStacks}
          </h2>
          <div className="flex flex-wrap gap-2">
            {otherStacks.map((other) => (
              <Link
                className="border-fd-border/60 hover:bg-fd-muted/40 rounded-md border px-3 py-1.5 text-sm transition-colors"
                href={withLocalePrefix(lang, stackPath(other.slug))}
                key={other.slug}
                transitionTypes={["nav-forward"]}
              >
                {t.stacks.items[other.slug as StackCopyKey].shortName}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </ViewTransition>
  );
}
