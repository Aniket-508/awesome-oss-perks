import { notFound } from "next/navigation";

import { i18n } from "@/i18n/config";
import { buildLocaleSlugs, parseLocaleSlugs } from "@/i18n/navigation";
import { getLLMText, programsSource } from "@/lib/source";

export const revalidate = false;

export const GET = async (
  _req: Request,
  { params }: RouteContext<"/llms.mdx/programs/[[...slug]]">
) => {
  const { slug } = await params;
  const localized = parseLocaleSlugs(slug);
  const page = programsSource.getPage(localized.slugs, localized.locale);
  if (!page) {
    notFound();
  }

  return new Response(await getLLMText(page), {
    headers: {
      "Content-Type": "text/markdown",
    },
  });
};

export const generateStaticParams = () =>
  programsSource.getPages().map((page) => ({
    slug: buildLocaleSlugs(page.locale ?? i18n.defaultLanguage, page.slugs),
  }));
