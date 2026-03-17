import type { Metadata } from "next";

import { getT } from "@/lib/get-t";
import { i18n } from "@/lib/i18n";
import { createMetadata } from "@/seo/metadata";

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

export default async function CheckPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = await getT(lang);
  return <CheckPageClient lang={lang} translations={t.check} />;
}
