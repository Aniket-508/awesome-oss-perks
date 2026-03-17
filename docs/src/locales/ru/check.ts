const check = {
  checkAnother: "Проверить другой репозиторий",
  checkFailed: "Проверка не удалась",
  description:
    "Вставьте URL репозитория GitHub или GitLab, чтобы мгновенно узнать, на какие программы и бонусы для открытого ПО может претендовать ваш проект.",
  eligible: "Подходит",
  fetchError: "Не удалось получить результаты проверки. Попробуйте ещё раз.",
  fork: "Форк",
  heading: "Проверьте соответствие вашего проекта",
  ineligible: "Не подходит",
  lastPush: "Последний пуш",
  needsReview: "Требует проверки",
  perks: "бонусы",
  private: "Приватный",
  reasons: {
    codeOfConduct: "Кодекс поведения невозможно проверить автоматически",
    communitySize: "размер сообщества невозможно проверить автоматически",
    criteriaUnverifiable: "критерии невозможно проверить автоматически",
    hostingPlatform:
      "требование к платформе хостинга невозможно проверить автоматически",
    inactive:
      "последний коммит был {days} дней назад (проект может быть неактивен)",
    missionAlignment: "соответствие миссии невозможно проверить автоматически",
    noOsiLicense:
      "лицензия, одобренная OSI, не обнаружена (обнаружена: {license})",
    nonCommercial:
      "некоммерческое требование невозможно проверить автоматически",
    osiLicense: "требуется лицензия, одобренная OSI (обнаружена: {license})",
    permissiveLicense:
      "требуется пермиссивная лицензия (обнаружена: {license})",
    popularityThreshold: "порог популярности определяется провайдером",
    procedural: "процедурный шаг — подайте заявку вручную",
    projectTooNew:
      "проекту должно быть не менее {required} дней (вашему {current} дней)",
    repoFork: "репозиторий является форком",
    repoPrivate: "репозиторий приватный",
    requiresGithub: "требуется репозиторий GitHub",
    requiresGitlab: "требуется репозиторий GitLab",
    role: "требование к роли невозможно проверить автоматически",
    starsBelow: "требуется {threshold}+ звёзд (у вас {current})",
    starsMet: "{current} звёзд достигают порога {threshold}+",
    subjective: "субъективные критерии невозможно проверить автоматически",
    usageRestriction:
      "ограничение использования невозможно проверить автоматически",
  },
  stars: "звёзды",
  time: {
    daysAgo: "{days}д назад",
    monthsAgo: "{months}мес назад",
    today: "сегодня",
    yearsAgo: "{years}г назад",
    yesterday: "вчера",
  },
};

export default check;
export type { CheckTranslations } from "../en/check";
