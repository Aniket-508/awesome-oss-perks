import { programs as corePrograms } from "@ossperks/core";
import type { Metadata } from "next";

import { getT } from "@/lib/get-t";
import { i18n } from "@/lib/i18n";
import { getPrograms } from "@/lib/programs";
import { createMetadata } from "@/seo/metadata";

import type { ProgramTranslationMap } from "./check-page-client";
import { CheckPageClient } from "./check-page-client";

export const generateStaticParams = () =>
  i18n.languages.map((lang) => ({ lang }));

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> => {
  const { lang } = await params;
  const t = await getT(lang);
  return createMetadata({
    description: t.check.description,
    lang,
    path: "/check",
    title: t.check.heading,
  });
};

const buildProgramTranslations = async (
  lang: string
): Promise<ProgramTranslationMap> => {
  const translated = await getPrograms(lang);
  const map: ProgramTranslationMap = {};
  for (const p of translated) {
    const en = corePrograms.find((c) => c.slug === p.slug);
    map[p.slug] = {
      eligibility: p.eligibility,
      englishEligibility: en?.eligibility ?? p.eligibility,
      name: p.name,
    };
  }
  return map;
};

export default async function CheckPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const [t, programTranslations] = await Promise.all([
    getT(lang),
    buildProgramTranslations(lang),
  ]);
  return (
    <CheckPageClient
      lang={lang}
      translations={t.check}
      programTranslations={programTranslations}
    />
  );
}
