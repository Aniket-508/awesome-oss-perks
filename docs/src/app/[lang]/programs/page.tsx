import { programs, getCategories, CATEGORY_LABELS } from "@ossperks/data";
import type { Metadata } from "next";
import Link from "next/link";

import { withLocalePrefix } from "@/lib/i18n";

export default async function ProgramsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const categories = getCategories();

  return (
    <main className="container max-w-6xl py-12 px-4 mx-auto">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">OSS Programs</h1>
        <p className="text-fd-muted-foreground text-lg max-w-2xl mx-auto">
          Free tools, credits, and services available to open-source projects.
          Browse by category and find programs your project qualifies for.
        </p>
      </div>

      {categories.map((category) => {
        const categoryPrograms = programs.filter(
          (p) => p.category === category
        );
        if (categoryPrograms.length === 0) {
          return null;
        }

        return (
          <section key={category} className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 border-b pb-2">
              {CATEGORY_LABELS[category]}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {categoryPrograms.map((program) => (
                <Link
                  key={program.slug}
                  href={withLocalePrefix(lang, `/programs/${program.slug}`)}
                  className="group block rounded-lg border bg-fd-card p-5 transition-colors hover:bg-fd-accent"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold group-hover:text-fd-primary">
                      {program.name}
                    </h3>
                  </div>
                  <p className="text-sm text-fd-muted-foreground mb-3 line-clamp-2">
                    {program.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {program.perks.slice(0, 2).map((perk) => (
                      <span
                        key={perk.title}
                        className="inline-block rounded-md bg-fd-primary/10 px-2 py-0.5 text-xs font-medium text-fd-primary"
                      >
                        {perk.title}
                      </span>
                    ))}
                    {program.perks.length > 2 && (
                      <span className="inline-block rounded-md bg-fd-muted px-2 py-0.5 text-xs text-fd-muted-foreground">
                        +{program.perks.length - 2} more
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </main>
  );
}

export const generateMetadata = (): Metadata => ({
  description:
    "Browse free tools, credits, and services available to open-source projects.",
  title: "OSS Programs",
});
