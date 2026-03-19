import { i18n } from "./config";

export const withLocalePrefix = (locale: string, path: `/${string}`): string =>
  locale === i18n.defaultLanguage ? path : `/${locale}${path}`;
