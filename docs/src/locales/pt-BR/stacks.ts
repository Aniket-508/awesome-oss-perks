const stacks = {
  nav: "Stacks",
  listing: {
    breadcrumb: "Stacks",
    heading: "Stacks de perks",
    intro:
      "Pacotes selecionados de perks open source, agrupados pelo tipo de projeto que você está construindo. Cada stack é uma ordem de configuração, não um filtro de busca.",
    perksCount: "{count} perks",
    programsCount: "{count} programas",
  },
  detail: {
    breadcrumb: "Stacks",
    checkCta: "Veja para quais deles você se qualifica",
    checkCtaIntro:
      "Cada programa tem suas próprias regras de elegibilidade. Avalie seu repositório em todos eles de uma só vez.",
    heading: "A stack de perks open source para {stack}",
    metaDescription:
      "{count} ferramentas gratuitas e programas de créditos para {stack}: {examples}. Todos eles têm um plano open source — veja aqui a ordem para solicitá-los.",
    metaTitle: "Perks open source gratuitos para {stack}",
    otherStacks: "Outras stacks",
    summary: "{programs} programas · {perks} perks",
    tableProgram: "Programa",
    tableRole: "Função",
    tableTopPerk: "Melhor perk",
  },
  roles: {
    "ai-assistant": "Assistente de IA",
    analytics: "Analytics",
    chat: "Chat de equipe",
    ci: "CI/CD",
    cms: "CMS",
    "code-review": "Revisão de código",
    "code-signing": "Assinatura de código",
    containers: "Contêineres",
    coverage: "Cobertura de testes",
    database: "Banco de dados",
    docs: "Documentação",
    errors: "Rastreamento de erros",
    funding: "Financiamento",
    hosting: "Hospedagem",
    ide: "IDE",
    localization: "Localização",
    monitoring: "Monitoramento",
    scheduling: "Agendamento",
    scraping: "Web scraping",
    sdk: "Geração de SDK",
    search: "Busca",
    secrets: "Segredos",
    security: "Segurança",
    "status-page": "Página de status",
    support: "Suporte",
    testing: "Testes cross-browser",
    "visual-testing": "Testes visuais",
  },
  items: {
    "ai-agent": {
      description:
        "Agentes consomem créditos de modelo mais rápido do que qualquer outra coisa, então os créditos importam mais do que o ferramental. Comece pelos créditos de API, depois pelo backend gerenciado e pelo gerador de SDK.",
      name: "um agente de IA ou app com LLM",
      shortName: "Agentes de IA",
    },
    "community-project": {
      description:
        "Projetos cujo gargalo é a coordenação, e não a infraestrutura: chat, agendamento, suporte e uma rota de financiamento para os mantenedores.",
      name: "um grande projeto comunitário",
      shortName: "Projetos comunitários",
    },
    "docs-site": {
      description:
        "Um site de documentação precisa mais de hospedagem, busca e tradução do que de poder computacional. Todos os programas aqui têm um plano open source sem custo.",
      name: "um site de documentação",
      shortName: "Sites de documentação",
    },
    "go-service": {
      description:
        "Um serviço em Go em produção precisa de hospedagem de contêineres, observabilidade e uma página de status. Sonar e cubic cobrem a parte de revisão sem depender de um toolchain Node.",
      name: "um serviço em Go",
      shortName: "Serviços em Go",
    },
    nextjs: {
      description:
        "A stack padrão para um projeto Next.js: primeiro hospedagem e rastreamento de erros, depois busca, documentação e regressão visual quando os contribuidores chegarem.",
      name: "um projeto Next.js",
      shortName: "Projetos Next.js",
    },
    "node-cli": {
      description:
        "Uma CLI publicada vive ou morre pela sua cadeia de suprimentos. Cobertura de testes, análise de dependências e automação de revisão vêm antes de tudo.",
      name: "uma CLI em Node.js",
      shortName: "CLIs em Node.js",
    },
    "python-library": {
      description:
        "Uma biblioteca Python precisa de cobertura de testes, análise estática e documentação. JetBrains e Claude cobrem a parte de escrita; o Crowdin cuida da documentação traduzida.",
      name: "uma biblioteca Python",
      shortName: "Bibliotecas Python",
    },
    "react-component-library": {
      description:
        "Bibliotecas de componentes quebram visualmente, não funcionalmente. Regressão visual e testes cross-browser são o que mais pesa aqui.",
      name: "uma biblioteca de componentes React",
      shortName: "Bibliotecas de componentes React",
    },
    "rust-cli": {
      description:
        "CLIs em Rust distribuem binários assinados para várias plataformas, então runners rápidos e assinatura de código importam mais do que créditos de hospedagem.",
      name: "uma CLI em Rust",
      shortName: "CLIs em Rust",
    },
    "self-hosted-saas": {
      description:
        "Produtos open core têm custo real de infraestrutura. Créditos de hospedagem, um Postgres gerenciado, monitoramento e gestão de segredos cobrem a maior parte disso.",
      name: "um SaaS self-hosted",
      shortName: "SaaS self-hosted",
    },
  },
} as const;

export type StacksTranslations = typeof stacks;
export default stacks;
