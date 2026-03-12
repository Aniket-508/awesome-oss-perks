import { defineI18nUI } from "fumadocs-ui/i18n";

import { i18n } from "@/lib/i18n";

export const { provider } = defineI18nUI(i18n, {
  translations: {
    en: {
      displayName: "English",
    },
    es: {
      displayName: "Espanol",
      search: "Buscar en la documentacion",
    },
  },
});
