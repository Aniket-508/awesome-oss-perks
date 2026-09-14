const stacks = {
  nav: "Stacks",
  listing: {
    breadcrumb: "Stacks",
    heading: "Stacks de perks",
    intro:
      "Des ensembles d'avantages open source sélectionnés et regroupés selon le type de projet que vous construisez. Chaque stack est un ordre de mise en place, pas un filtre de recherche.",
    perksCount: "{count} perks",
    programsCount: "{count} programmes",
  },
  detail: {
    breadcrumb: "Stacks",
    checkCta: "Vérifiez ceux auxquels vous êtes éligible",
    checkCtaIntro:
      "Chaque programme a ses propres règles d'éligibilité. Testez votre dépôt face à tous en une seule passe.",
    heading: "La stack de perks open source pour {stack}",
    metaDescription:
      "{count} outils gratuits et programmes de crédits pour {stack} : {examples}. Chacun propose une offre open source — voici dans quel ordre les réclamer.",
    metaTitle: "Perks open source gratuits pour {stack}",
    otherStacks: "Autres stacks",
    summary: "{programs} programmes · {perks} perks",
    tableProgram: "Programme",
    tableRole: "Rôle",
    tableTopPerk: "Perk principal",
  },
  roles: {
    "ai-assistant": "Assistant IA",
    analytics: "Analytique",
    chat: "Chat d'équipe",
    ci: "CI/CD",
    cms: "CMS",
    "code-review": "Revue de code",
    "code-signing": "Signature de code",
    containers: "Conteneurs",
    coverage: "Couverture de tests",
    database: "Base de données",
    docs: "Documentation",
    errors: "Suivi des erreurs",
    funding: "Financement",
    hosting: "Hébergement",
    ide: "IDE",
    localization: "Localisation",
    monitoring: "Supervision",
    scheduling: "Planification",
    scraping: "Scraping web",
    sdk: "Génération de SDK",
    search: "Recherche",
    secrets: "Secrets",
    security: "Sécurité",
    "status-page": "Page de statut",
    support: "Support",
    testing: "Tests multi-navigateurs",
    "visual-testing": "Tests visuels",
  },
  items: {
    "ai-agent": {
      description:
        "Les agents consomment des crédits de modèle plus vite que tout le reste : les dotations comptent donc davantage que l'outillage. Commencez par les crédits d'API, puis le backend managé et le générateur de SDK.",
      name: "un agent IA ou une app LLM",
      shortName: "Agents IA",
    },
    "community-project": {
      description:
        "Des projets dont le goulot d'étranglement est la coordination plutôt que l'infrastructure : chat, planification, support et une voie de financement pour les mainteneurs.",
      name: "un grand projet communautaire",
      shortName: "Projets communautaires",
    },
    "docs-site": {
      description:
        "Un site de documentation a davantage besoin d'hébergement, de recherche et de traduction que de puissance de calcul. Chaque programme ici propose une offre open source gratuite.",
      name: "un site de documentation",
      shortName: "Sites de documentation",
    },
    "go-service": {
      description:
        "Un service Go en production réclame de l'hébergement de conteneurs, de l'observabilité et une page de statut. Sonar et cubic couvrent la revue de code sans chaîne d'outils Node.",
      name: "un service Go",
      shortName: "Services Go",
    },
    nextjs: {
      description:
        "La stack par défaut d'un projet Next.js : hébergement et suivi des erreurs d'abord, puis recherche, documentation et régression visuelle dès l'arrivée des contributeurs.",
      name: "un projet Next.js",
      shortName: "Projets Next.js",
    },
    "node-cli": {
      description:
        "Une CLI publiée vit et meurt par sa chaîne d'approvisionnement. Couverture, analyse des dépendances et automatisation de la revue passent avant tout le reste.",
      name: "une CLI Node.js",
      shortName: "CLI Node.js",
    },
    "python-library": {
      description:
        "Une bibliothèque Python a besoin de couverture, d'analyse statique et de documentation. JetBrains et Claude couvrent l'écriture ; Crowdin gère la documentation traduite.",
      name: "une bibliothèque Python",
      shortName: "Bibliothèques Python",
    },
    "react-component-library": {
      description:
        "Les bibliothèques de composants cassent visuellement, pas fonctionnellement. La régression visuelle et les tests multi-navigateurs pèsent le plus ici.",
      name: "une bibliothèque de composants React",
      shortName: "Bibliothèques de composants React",
    },
    "rust-cli": {
      description:
        "Les CLI Rust livrent des binaires signés sur plusieurs plateformes : des runners rapides et la signature de code comptent plus que des crédits d'hébergement.",
      name: "une CLI Rust",
      shortName: "CLI Rust",
    },
    "self-hosted-saas": {
      description:
        "Les produits open core supportent un vrai coût d'infrastructure. Crédits d'hébergement, Postgres managé, supervision et gestion des secrets en couvrent l'essentiel.",
      name: "un SaaS auto-hébergé",
      shortName: "SaaS auto-hébergés",
    },
  },
} as const;

export type StacksTranslations = typeof stacks;
export default stacks;
