const stacks = {
  nav: "Stacks",
  listing: {
    breadcrumb: "Stacks",
    heading: "Perk-Stacks",
    intro:
      "Kuratierte Bündel von Open-Source-Perks, gruppiert nach der Art des Projekts, das du baust. Jeder Stack ist eine Einrichtungsreihenfolge, kein Suchfilter.",
    perksCount: "{count} Perks",
    programsCount: "{count} Programme",
  },
  detail: {
    breadcrumb: "Stacks",
    checkCta: "Prüfe, für welche davon du qualifiziert bist",
    checkCtaIntro:
      "Jedes Programm hat eigene Teilnahmebedingungen. Prüfe dein Repository in einem Durchlauf gegen alle.",
    heading: "Der Open-Source-Perk-Stack für {stack}",
    metaDescription:
      "{count} kostenlose Tools und Credit-Programme für {stack}: {examples}. Alle bieten einen Open-Source-Tarif — hier ist die Reihenfolge, in der du sie beantragst.",
    metaTitle: "Kostenlose Open-Source-Perks für {stack}",
    otherStacks: "Weitere Stacks",
    summary: "{programs} Programme · {perks} Perks",
    tableProgram: "Programm",
    tableRole: "Rolle",
    tableTopPerk: "Top-Perk",
  },
  roles: {
    "ai-assistant": "KI-Assistent",
    analytics: "Analytics",
    chat: "Team-Chat",
    ci: "CI/CD",
    cms: "CMS",
    "code-review": "Code-Review",
    "code-signing": "Code-Signierung",
    containers: "Container",
    coverage: "Testabdeckung",
    database: "Datenbank",
    docs: "Dokumentation",
    errors: "Fehler-Tracking",
    funding: "Finanzierung",
    hosting: "Hosting",
    ide: "IDE",
    localization: "Lokalisierung",
    monitoring: "Monitoring",
    scheduling: "Terminplanung",
    scraping: "Web-Scraping",
    sdk: "SDK-Generierung",
    search: "Suche",
    secrets: "Secrets",
    security: "Sicherheit",
    "status-page": "Status-Seite",
    support: "Support",
    testing: "Cross-Browser-Testing",
    "visual-testing": "Visuelles Testing",
  },
  items: {
    "ai-agent": {
      description:
        "Agenten verbrauchen Modell-Credits schneller als alles andere, deshalb zählen die Gutschriften mehr als das Tooling. Beginne mit den API-Credits, dann das Managed Backend und der SDK-Generator.",
      name: "einen KI-Agenten oder eine LLM-App",
      shortName: "KI-Agenten",
    },
    "community-project": {
      description:
        "Projekte, deren Engpass die Koordination ist und nicht die Infrastruktur: Chat, Terminplanung, Support und ein Finanzierungsweg für die Maintainer.",
      name: "ein großes Community-Projekt",
      shortName: "Community-Projekte",
    },
    "docs-site": {
      description:
        "Eine Dokumentations-Website braucht Hosting, Suche und Übersetzung mehr als Rechenleistung. Jedes Programm hier bietet einen kostenlosen Open-Source-Tarif.",
      name: "eine Dokumentations-Website",
      shortName: "Dokumentations-Websites",
    },
    "go-service": {
      description:
        "Ein Go-Service in Produktion braucht Container-Hosting, Observability und eine Status-Seite. Sonar und cubic decken die Review-Seite ohne Node-Toolchain ab.",
      name: "einen Go-Service",
      shortName: "Go-Services",
    },
    nextjs: {
      description:
        "Der Standard-Stack für ein Next.js-Projekt: zuerst Hosting und Fehler-Tracking, dann Suche, Docs und visuelle Regressionstests, sobald Contributors dazukommen.",
      name: "ein Next.js-Projekt",
      shortName: "Next.js-Projekte",
    },
    "node-cli": {
      description:
        "Ein veröffentlichtes CLI steht und fällt mit seiner Supply Chain. Testabdeckung, Dependency-Scanning und Review-Automatisierung kommen vor allem anderen.",
      name: "ein Node.js-CLI",
      shortName: "Node.js-CLIs",
    },
    "python-library": {
      description:
        "Eine Python-Bibliothek braucht Testabdeckung, statische Analyse und Dokumentation. JetBrains und Claude decken die Entwicklungsseite ab, Crowdin übernimmt übersetzte Docs.",
      name: "eine Python-Bibliothek",
      shortName: "Python-Bibliotheken",
    },
    "react-component-library": {
      description:
        "Komponentenbibliotheken brechen visuell, nicht funktional. Visuelle Regressionstests und Cross-Browser-Testing haben hier das größte Gewicht.",
      name: "eine React-Komponentenbibliothek",
      shortName: "React-Komponentenbibliotheken",
    },
    "rust-cli": {
      description:
        "Rust-CLIs liefern signierte Binaries für mehrere Plattformen aus, deshalb zählen schnelle Runner und Code-Signierung mehr als Hosting-Credits.",
      name: "ein Rust-CLI",
      shortName: "Rust-CLIs",
    },
    "self-hosted-saas": {
      description:
        "Open-Core-Produkte verursachen echte Infrastrukturkosten. Hosting-Credits, ein Managed Postgres, Monitoring und Secrets-Management decken das meiste davon ab.",
      name: "ein selbst gehostetes SaaS",
      shortName: "Selbst gehostetes SaaS",
    },
  },
} as const;

export type StacksTranslations = typeof stacks;
export default stacks;
