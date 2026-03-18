import type { Locale } from "./config";
import { i18n, isLocale } from "./config";

export const withLocalePrefix = (locale: string, path: `/${string}`): string =>
  locale === i18n.defaultLanguage ? path : `/${locale}${path}`;

export const parseLocaleSlugs = (
  slugs: string[] | undefined
): { locale: Locale; slugs: string[] } => {
  const normalized = slugs ?? [];
  const [first, ...rest] = normalized;

  if (first && isLocale(first)) {
    return { locale: first, slugs: rest };
  }

  return {
    locale: i18n.defaultLanguage,
    slugs: normalized,
  };
};

export const buildLocaleSlugs = (locale: string, slugs: string[]): string[] =>
  locale === i18n.defaultLanguage ? slugs : [locale, ...slugs];
