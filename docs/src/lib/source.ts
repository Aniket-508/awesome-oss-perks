import { docs } from "collections/server";
import { loader } from "fumadocs-core/source";
import type { InferPageType } from "fumadocs-core/source";
import { lucideIconsPlugin } from "fumadocs-core/source/lucide-icons";

import { buildLocaleSlugs, i18n } from "@/lib/i18n";

// See https://fumadocs.dev/docs/headless/source-api for more info
export const source = loader({
  baseUrl: "/docs",
  i18n,
  plugins: [lucideIconsPlugin()],
  source: docs.toFumadocsSource(),
});

export const getPageImage = (page: InferPageType<typeof source>) => {
  const segments = [
    ...buildLocaleSlugs(page.locale ?? i18n.defaultLanguage, page.slugs),
    "image.webp",
  ];

  return {
    segments,
    url: `/og/docs/${segments.join("/")}`,
  };
};

export const getLLMText = async (page: InferPageType<typeof source>) => {
  const processed = await page.data.getText("processed");

  return `# ${page.data.title}

${processed}`;
};
