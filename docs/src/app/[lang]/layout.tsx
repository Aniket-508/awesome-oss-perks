import { RootProvider } from "fumadocs-ui/provider/next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { i18n, isLocale } from "@/lib/i18n";
import { provider } from "@/lib/i18n-ui";

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) {
    notFound();
  }

  return <RootProvider i18n={provider(lang)}>{children}</RootProvider>;
}

export const generateStaticParams = () =>
  i18n.languages.map((lang) => ({ lang }));
