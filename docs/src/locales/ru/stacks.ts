const stacks = {
  nav: "Стеки",
  listing: {
    breadcrumb: "Стеки",
    heading: "Стеки перков",
    intro:
      "Подобранные наборы open source перков, сгруппированные по типу проекта, который вы создаёте. Каждый стек — это порядок подключения, а не фильтр поиска.",
    perksCount: "{count} перков",
    programsCount: "{count} программ",
  },
  detail: {
    breadcrumb: "Стеки",
    checkCta: "Проверьте, под какие из них вы подходите",
    checkCtaIntro:
      "У каждой программы свои правила участия. Проверьте свой репозиторий сразу по всем за один проход.",
    heading: "Стек open source перков для {stack}",
    metaDescription:
      "{count} бесплатных инструментов и программ с грантами для {stack}: {examples}. У каждого есть тариф для open source — вот в каком порядке их получать.",
    metaTitle: "Бесплатные open source перки для {stack}",
    otherStacks: "Другие стеки",
    summary: "{programs} программ · {perks} перков",
    tableProgram: "Программа",
    tableRole: "Роль",
    tableTopPerk: "Главный перк",
  },
  roles: {
    "ai-assistant": "AI-ассистент",
    analytics: "Аналитика",
    chat: "Командный чат",
    ci: "CI/CD",
    cms: "CMS",
    "code-review": "Код-ревью",
    "code-signing": "Подпись кода",
    containers: "Контейнеры",
    coverage: "Покрытие тестами",
    database: "База данных",
    docs: "Документация",
    errors: "Отслеживание ошибок",
    funding: "Финансирование",
    hosting: "Хостинг",
    ide: "IDE",
    localization: "Локализация",
    monitoring: "Мониторинг",
    scheduling: "Планирование встреч",
    scraping: "Веб-скрейпинг",
    sdk: "Генерация SDK",
    search: "Поиск",
    secrets: "Секреты",
    security: "Безопасность",
    "status-page": "Страница статуса",
    support: "Поддержка",
    testing: "Кроссбраузерное тестирование",
    "visual-testing": "Визуальное тестирование",
  },
  items: {
    "ai-agent": {
      description:
        "Агенты расходуют кредиты на модели быстрее всего остального, поэтому гранты важнее инструментов. Начните с кредитов на API, затем подключите управляемый бэкенд и генератор SDK.",
      name: "AI-агента или LLM-приложения",
      shortName: "AI-агенты",
    },
    "community-project": {
      description:
        "Проекты, узкое место которых — координация, а не инфраструктура: чат, планирование встреч, поддержка и способ финансирования мейнтейнеров.",
      name: "большого community-проекта",
      shortName: "Community-проекты",
    },
    "docs-site": {
      description:
        "Сайту документации нужнее хостинг, поиск и переводы, чем вычислительные мощности. У каждой программы здесь есть бесплатный тариф для open source.",
      name: "сайта документации",
      shortName: "Сайты документации",
    },
    "go-service": {
      description:
        "Go-сервису в продакшене нужны хостинг контейнеров, наблюдаемость и страница статуса. Sonar и cubic закрывают ревью без тулчейна на Node.",
      name: "Go-сервиса",
      shortName: "Go-сервисы",
    },
    nextjs: {
      description:
        "Базовый стек для проекта на Next.js: сначала хостинг и отслеживание ошибок, затем поиск, документация и визуальные регрессии, когда появятся контрибьюторы.",
      name: "проекта на Next.js",
      shortName: "Проекты на Next.js",
    },
    "node-cli": {
      description:
        "Опубликованный CLI держится на своей цепочке поставок. Покрытие тестами, сканирование зависимостей и автоматизация ревью — прежде всего остального.",
      name: "CLI на Node.js",
      shortName: "CLI на Node.js",
    },
    "python-library": {
      description:
        "Библиотеке на Python нужны покрытие тестами, статический анализ и документация. JetBrains и Claude закрывают написание кода, Crowdin — переводы документации.",
      name: "библиотеки на Python",
      shortName: "Библиотеки на Python",
    },
    "react-component-library": {
      description:
        "Библиотеки компонентов ломаются визуально, а не функционально. Больше всего здесь весят визуальные регрессии и кроссбраузерное тестирование.",
      name: "библиотеки компонентов React",
      shortName: "Библиотеки компонентов React",
    },
    "rust-cli": {
      description:
        "CLI на Rust поставляются как подписанные бинарники под разные платформы, поэтому быстрые раннеры и подпись кода важнее кредитов на хостинг.",
      name: "CLI на Rust",
      shortName: "CLI на Rust",
    },
    "self-hosted-saas": {
      description:
        "Open-core продукты несут реальные расходы на инфраструктуру. Кредиты на хостинг, управляемый Postgres, мониторинг и управление секретами покрывают большую их часть.",
      name: "self-hosted SaaS",
      shortName: "Self-hosted SaaS",
    },
  },
} as const;

export type StacksTranslations = typeof stacks;
export default stacks;
