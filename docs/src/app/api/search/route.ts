import { createFromSource } from "fumadocs-core/search/server";

import { cliSource, programsSource } from "@/lib/source";

const getSearchPages = (language?: string) => {
  const cliPages = cliSource.getPages(language);
  const programPages = programsSource.getPages(language);

  return [
    ...cliPages.map((page) => ({
      description: page.data.description,
      id: `cli-${page.url}`,
      structuredData: page.data.structuredData,
      tag: "cli",
      title: page.data.title,
      url: page.url,
    })),
    ...programPages.map((page) => ({
      description: page.data.description,
      id: `programs-${page.url}`,
      structuredData: page.data.structuredData,
      tag: "programs",
      title: page.data.title,
      url: page.url,
    })),
  ];
};

export const { GET } = createFromSource(getSearchPages as never, {
  // https://docs.orama.com/docs/orama-js/supported-languages
  localeMap: {
    ja: "english",
    ko: "english",
    "pt-BR": "portuguese",
    "zh-CN": "english",
  },
});
