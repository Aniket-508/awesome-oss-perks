import { programs, getProgramBySlug, CATEGORY_LABELS } from "@ossperks/data";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { withLocalePrefix } from "@/lib/i18n";

export default async function ProgramPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const program = getProgramBySlug(slug);
  if (!program) {
    notFound();
  }

  return (
    <main className="container max-w-4xl py-12 px-4 mx-auto">
      <Link
        href={withLocalePrefix(lang, "/programs")}
        className="text-sm text-fd-muted-foreground hover:text-fd-primary mb-6 inline-block"
      >
        &larr; All Programs
      </Link>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="inline-block rounded-full bg-fd-primary/10 px-3 py-1 text-xs font-medium text-fd-primary">
            {CATEGORY_LABELS[program.category]}
          </span>
          {program.duration && (
            <span className="inline-block rounded-full bg-fd-muted px-3 py-1 text-xs text-fd-muted-foreground">
              {program.duration}
            </span>
          )}
        </div>
        <h1 className="text-3xl font-bold mb-2">{program.name}</h1>
        <p className="text-fd-muted-foreground text-lg">
          by {program.provider}
        </p>
        <p className="mt-4 text-fd-foreground">{program.description}</p>
        <div className="mt-6 flex gap-3">
          <a
            href={program.applicationUrl ?? program.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-md bg-fd-primary px-4 py-2 text-sm font-medium text-fd-primary-foreground hover:bg-fd-primary/90 transition-colors"
          >
            Apply Now &rarr;
          </a>
          <a
            href={program.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-fd-accent transition-colors"
          >
            View {program.provider} program details
          </a>
        </div>
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Perks</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {program.perks.map((perk) => (
            <div key={perk.title} className="rounded-lg border bg-fd-card p-4">
              <h3 className="font-semibold mb-1">{perk.title}</h3>
              <p className="text-sm text-fd-muted-foreground">
                {perk.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Eligibility</h2>
        <ul className="list-disc list-inside space-y-2 text-fd-foreground">
          {program.eligibility.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      {program.requirements && program.requirements.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Requirements</h2>
          <ul className="list-disc list-inside space-y-2 text-fd-foreground">
            {program.requirements.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      {program.applicationProcess && program.applicationProcess.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">How to Apply</h2>
          <ol className="list-decimal list-inside space-y-2 text-fd-foreground">
            {program.applicationProcess.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>
      )}

      {program.tags && program.tags.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-4">Tags</h2>
          <div className="flex flex-wrap gap-2">
            {program.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block rounded-full bg-fd-muted px-3 py-1 text-xs text-fd-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

export const generateStaticParams = () =>
  programs.map((p) => ({ slug: p.slug }));

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> => {
  const { slug } = await params;
  const program = getProgramBySlug(slug);
  if (!program) {
    notFound();
  }

  return {
    description: program.description,
    title: `${program.name} | OSS Programs`,
  };
};
