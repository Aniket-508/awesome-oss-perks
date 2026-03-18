import { notFound } from "next/navigation";

import { i18n } from "@/i18n/config";
import { buildLocaleSlugs, parseLocaleSlugs } from "@/i18n/navigation";
import { cliSource, getLLMText } from "@/lib/source";

export const revalidate = false;

export const GET = async (
  _req: Request,
  { params }: RouteContext<"/llms.mdx/cli/[[...slug]]">
) => {
  const { slug } = await params;
  const localized = parseLocaleSlugs(slug);
  const page = cliSource.getPage(localized.slugs, localized.locale);
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
  cliSource.getPages().map((page) => ({
    slug: buildLocaleSlugs(page.locale ?? i18n.defaultLanguage, page.slugs),
  }));
