import "server-only";
import aboutEn from "@/locales/en/about";
import type { AboutTranslations } from "@/locales/en/about";
import commonEn from "@/locales/en/common";
import type { CommonTranslations } from "@/locales/en/common";
import homeEn from "@/locales/en/home";
import type { HomeTranslations } from "@/locales/en/home";
import peopleEn from "@/locales/en/people";
import type { PeopleTranslations } from "@/locales/en/people";
import programsEn from "@/locales/en/programs";
import type { ProgramsTranslations } from "@/locales/en/programs";

export interface Translations {
  about: AboutTranslations;
  common: CommonTranslations;
  home: HomeTranslations;
  people: PeopleTranslations;
  programs: ProgramsTranslations;
}

const loaders = {
  de: {
    about: () => import("@/locales/de/about"),
    common: () => import("@/locales/de/common"),
    home: () => import("@/locales/de/home"),
    people: () => import("@/locales/de/people"),
    programs: () => import("@/locales/de/programs"),
  },
  en: {
    about: () => import("@/locales/en/about"),
    common: () => import("@/locales/en/common"),
    home: () => import("@/locales/en/home"),
    people: () => import("@/locales/en/people"),
    programs: () => import("@/locales/en/programs"),
  },
  es: {
    about: () => import("@/locales/es/about"),
    common: () => import("@/locales/es/common"),
    home: () => import("@/locales/es/home"),
    people: () => import("@/locales/es/people"),
    programs: () => import("@/locales/es/programs"),
  },
  fr: {
    about: () => import("@/locales/fr/about"),
    common: () => import("@/locales/fr/common"),
    home: () => import("@/locales/fr/home"),
    people: () => import("@/locales/fr/people"),
    programs: () => import("@/locales/fr/programs"),
  },
  ja: {
    about: () => import("@/locales/ja/about"),
    common: () => import("@/locales/ja/common"),
    home: () => import("@/locales/ja/home"),
    people: () => import("@/locales/ja/people"),
    programs: () => import("@/locales/ja/programs"),
  },
  ko: {
    about: () => import("@/locales/ko/about"),
    common: () => import("@/locales/ko/common"),
    home: () => import("@/locales/ko/home"),
    people: () => import("@/locales/ko/people"),
    programs: () => import("@/locales/ko/programs"),
  },
  "pt-BR": {
    about: () => import("@/locales/pt-BR/about"),
    common: () => import("@/locales/pt-BR/common"),
    home: () => import("@/locales/pt-BR/home"),
    people: () => import("@/locales/pt-BR/people"),
    programs: () => import("@/locales/pt-BR/programs"),
  },
  ru: {
    about: () => import("@/locales/ru/about"),
    common: () => import("@/locales/ru/common"),
    home: () => import("@/locales/ru/home"),
    people: () => import("@/locales/ru/people"),
    programs: () => import("@/locales/ru/programs"),
  },
  "zh-CN": {
    about: () => import("@/locales/zh-CN/about"),
    common: () => import("@/locales/zh-CN/common"),
    home: () => import("@/locales/zh-CN/home"),
    people: () => import("@/locales/zh-CN/people"),
    programs: () => import("@/locales/zh-CN/programs"),
  },
};

export type SupportedLocale = keyof typeof loaders;

export const getT = async (locale: string): Promise<Translations> => {
  const localeLoaders = loaders[locale as SupportedLocale] ?? loaders.en;

  const [about, common, home, people, programs] = await Promise.all([
    localeLoaders
      .about()
      .then((m) => m.default as AboutTranslations)
      .catch(() => aboutEn),
    localeLoaders
      .common()
      .then((m) => m.default as CommonTranslations)
      .catch(() => commonEn),
    localeLoaders
      .home()
      .then((m) => m.default as HomeTranslations)
      .catch(() => homeEn),
    localeLoaders
      .people()
      .then((m) => m.default as PeopleTranslations)
      .catch(() => peopleEn),
    localeLoaders
      .programs()
      .then((m) => m.default as ProgramsTranslations)
      .catch(() => programsEn),
  ]);

  return { about, common, home, people, programs };
};
