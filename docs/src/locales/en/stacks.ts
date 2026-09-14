const stacks = {
  nav: "Stacks",
  listing: {
    breadcrumb: "Stacks",
    heading: "Perk stacks",
    intro:
      "Curated bundles of open-source perks, grouped by the kind of project you are building. Each stack is a setup order, not a search filter.",
    perksCount: "{count} perks",
    programsCount: "{count} programs",
  },
  detail: {
    breadcrumb: "Stacks",
    checkCta: "Check which of these you qualify for",
    checkCtaIntro:
      "Every program has its own eligibility rules. Run your repository against all of them in one pass.",
    heading: "The open source perk stack for {stack}",
    metaDescription:
      "{count} free tools and credit programs for {stack}: {examples}. Every one of them has an open-source tier — here is the order to claim them in.",
    metaTitle: "Free open source perks for {stack}",
    otherStacks: "Other stacks",
    summary: "{programs} programs · {perks} perks",
    tableProgram: "Program",
    tableRole: "Role",
    tableTopPerk: "Top perk",
  },
  roles: {
    "ai-assistant": "AI assistant",
    analytics: "Analytics",
    chat: "Team chat",
    ci: "CI/CD",
    cms: "CMS",
    "code-review": "Code review",
    "code-signing": "Code signing",
    containers: "Containers",
    coverage: "Coverage",
    database: "Database",
    docs: "Documentation",
    errors: "Error tracking",
    funding: "Funding",
    hosting: "Hosting",
    ide: "IDE",
    localization: "Localization",
    monitoring: "Monitoring",
    scheduling: "Scheduling",
    scraping: "Web scraping",
    sdk: "SDK generation",
    search: "Search",
    secrets: "Secrets",
    security: "Security",
    "status-page": "Status page",
    support: "Support",
    testing: "Cross-browser testing",
    "visual-testing": "Visual testing",
  },
  items: {
    "ai-agent": {
      description:
        "Agents burn model credits faster than anything else, so the grants matter more than the tooling. Start with the API credits, then the managed backend and the SDK generator.",
      name: "an AI agent or LLM app",
      shortName: "AI agents",
    },
    "community-project": {
      description:
        "Projects whose bottleneck is coordination rather than infrastructure: chat, scheduling, support, and a funding route for the maintainers.",
      name: "a large community project",
      shortName: "Community projects",
    },
    "docs-site": {
      description:
        "A documentation site needs hosting, search, and translation more than it needs compute. Every program here has a no-cost open-source tier.",
      name: "a documentation site",
      shortName: "Documentation sites",
    },
    "go-service": {
      description:
        "A Go service in production wants container hosting, observability, and a status page. Sonar and cubic cover the review side without a Node toolchain.",
      name: "a Go service",
      shortName: "Go services",
    },
    nextjs: {
      description:
        "The default stack for a Next.js project: hosting and error tracking first, then search, docs, and visual regression once contributors arrive.",
      name: "a Next.js project",
      shortName: "Next.js projects",
    },
    "node-cli": {
      description:
        "A published CLI lives and dies by its supply chain. Coverage, dependency scanning, and review automation come before anything else.",
      name: "a Node.js CLI",
      shortName: "Node.js CLIs",
    },
    "python-library": {
      description:
        "A Python library needs coverage, static analysis, and docs. JetBrains and Claude cover the authoring side; Crowdin handles translated docs.",
      name: "a Python library",
      shortName: "Python libraries",
    },
    "react-component-library": {
      description:
        "Component libraries break visually, not functionally. Visual regression and cross-browser testing carry the most weight here.",
      name: "a React component library",
      shortName: "React component libraries",
    },
    "rust-cli": {
      description:
        "Rust CLIs ship signed binaries across platforms, so fast runners and code signing matter more than hosting credits.",
      name: "a Rust CLI",
      shortName: "Rust CLIs",
    },
    "self-hosted-saas": {
      description:
        "Open-core products carry real infrastructure cost. Hosting credits, a managed Postgres, monitoring, and secrets management cover most of it.",
      name: "a self-hosted SaaS",
      shortName: "Self-hosted SaaS",
    },
  },
} as const;

export type StacksTranslations = typeof stacks;
export default stacks;
