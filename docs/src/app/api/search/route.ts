import { createTokenizer as createJapaneseTokenizer } from "@orama/tokenizers/japanese";
import { createTokenizer as createMandarinTokenizer } from "@orama/tokenizers/mandarin";
import { createI18nSearchAPI } from "fumadocs-core/search/server";

import { i18n } from "@/lib/i18n";
import { cliSource, programsSource } from "@/lib/source";

export const revalidate = false;

export const { GET } = createI18nSearchAPI("advanced", {
  i18n,
  indexes() {
    const entries = i18n.languages.flatMap((language) => {
      const cliPages = cliSource.getPages(language);
      const programPages = programsSource.getPages(language);

      return [
        ...cliPages.map((page) => ({
          description: page.data.description,
          id: page.url,
          locale: language,
          structuredData: page.data.structuredData,
          tag: "cli",
          title: page.data.title,
          url: page.url,
        })),
        ...programPages.map((page) => ({
          description: page.data.description,
          id: page.url,
          locale: language,
          structuredData: page.data.structuredData,
          tag: "programs",
          title: page.data.title,
          url: page.url,
        })),
      ];
    });

    return Promise.all(entries);
  },
  localeMap: {
    ja: {
      components: { tokenizer: createJapaneseTokenizer() },
    },
    ko: "english",
    "pt-BR": "portuguese",
    "zh-CN": {
      components: { tokenizer: createMandarinTokenizer() },
      search: { threshold: 0, tolerance: 0 },
    },
  },
});
