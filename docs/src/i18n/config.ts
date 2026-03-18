import { defineI18n } from "fumadocs-core/i18n";

export const i18n = defineI18n({
  defaultLanguage: "en",
  hideLocale: "default-locale",
  languages: ["en", "es", "zh-CN", "fr", "de", "pt-BR", "ja", "ko", "ru"],
  parser: "dir",
});

export type Locale = (typeof i18n.languages)[number];

export const isLocale = (value: string): value is Locale =>
  i18n.languages.includes(value as Locale);
