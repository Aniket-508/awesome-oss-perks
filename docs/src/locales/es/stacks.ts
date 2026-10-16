const stacks = {
  nav: "Stacks",
  listing: {
    breadcrumb: "Stacks",
    heading: "Stacks de ventajas",
    intro:
      "Paquetes seleccionados de ventajas para proyectos open source, agrupados según el tipo de proyecto que estés creando. Cada stack es un orden de configuración, no un filtro de búsqueda.",
    perksCount: "{count} ventajas",
    programsCount: "{count} programas",
  },
  detail: {
    breadcrumb: "Stacks",
    checkCta: "Comprueba para cuáles cumples los requisitos",
    checkCtaIntro:
      "Cada programa tiene sus propias reglas de elegibilidad. Analiza tu repositorio con todos ellos de una sola pasada.",
    heading: "El stack de ventajas open source para {stack}",
    metaDescription:
      "{count} herramientas gratuitas y programas de créditos para {stack}: {examples}. Todos ellos tienen un plan open source: este es el orden en el que conviene solicitarlos.",
    metaTitle: "Ventajas open source gratuitas para {stack}",
    otherStacks: "Otros stacks",
    summary: "{programs} programas · {perks} ventajas",
    tableProgram: "Programa",
    tableRole: "Función",
    tableTopPerk: "Ventaja principal",
  },
  roles: {
    "ai-assistant": "Asistente de IA",
    analytics: "Analítica",
    chat: "Chat de equipo",
    ci: "CI/CD",
    cms: "CMS",
    "code-review": "Revisión de código",
    "code-signing": "Firma de código",
    containers: "Contenedores",
    coverage: "Cobertura",
    database: "Base de datos",
    docs: "Documentación",
    errors: "Seguimiento de errores",
    funding: "Financiación",
    hosting: "Alojamiento",
    ide: "IDE",
    localization: "Localización",
    monitoring: "Monitorización",
    scheduling: "Agendas y reuniones",
    scraping: "Web scraping",
    sdk: "Generación de SDK",
    search: "Búsqueda",
    secrets: "Secretos",
    security: "Seguridad",
    "status-page": "Página de estado",
    support: "Soporte",
    testing: "Pruebas multinavegador",
    "visual-testing": "Pruebas visuales",
  },
  items: {
    "ai-agent": {
      description:
        "Los agentes consumen créditos de modelos más rápido que cualquier otra cosa, así que las ayudas importan más que las herramientas. Empieza por los créditos de API, luego el backend gestionado y el generador de SDK.",
      name: "un agente de IA o una app con LLM",
      shortName: "Agentes de IA",
    },
    "community-project": {
      description:
        "Proyectos cuyo cuello de botella es la coordinación más que la infraestructura: chat, agendas, soporte y una vía de financiación para quienes lo mantienen.",
      name: "un gran proyecto comunitario",
      shortName: "Proyectos comunitarios",
    },
    "docs-site": {
      description:
        "Un sitio de documentación necesita alojamiento, búsqueda y traducción más que capacidad de cómputo. Todos los programas de aquí tienen un plan open source sin coste.",
      name: "un sitio de documentación",
      shortName: "Sitios de documentación",
    },
    "go-service": {
      description:
        "Un servicio en Go en producción necesita alojamiento de contenedores, observabilidad y una página de estado. Sonar y cubic cubren la parte de revisión sin necesidad de un toolchain de Node.",
      name: "un servicio en Go",
      shortName: "Servicios en Go",
    },
    nextjs: {
      description:
        "El stack por defecto para un proyecto Next.js: primero alojamiento y seguimiento de errores, luego búsqueda, documentación y regresión visual cuando lleguen los colaboradores.",
      name: "un proyecto Next.js",
      shortName: "Proyectos Next.js",
    },
    "node-cli": {
      description:
        "Una CLI publicada vive o muere por su cadena de suministro. La cobertura, el análisis de dependencias y la automatización de revisiones van antes que nada.",
      name: "una CLI en Node.js",
      shortName: "CLIs en Node.js",
    },
    "python-library": {
      description:
        "Una biblioteca de Python necesita cobertura, análisis estático y documentación. JetBrains y Claude cubren la parte de escritura; Crowdin se encarga de la documentación traducida.",
      name: "una biblioteca de Python",
      shortName: "Bibliotecas de Python",
    },
    "react-component-library": {
      description:
        "Las bibliotecas de componentes fallan visualmente, no funcionalmente. Aquí pesan más la regresión visual y las pruebas multinavegador.",
      name: "una biblioteca de componentes React",
      shortName: "Bibliotecas de componentes React",
    },
    "rust-cli": {
      description:
        "Las CLIs en Rust distribuyen binarios firmados para varias plataformas, así que los runners rápidos y la firma de código importan más que los créditos de alojamiento.",
      name: "una CLI en Rust",
      shortName: "CLIs en Rust",
    },
    "self-hosted-saas": {
      description:
        "Los productos open core tienen un coste real de infraestructura. Los créditos de alojamiento, un Postgres gestionado, la monitorización y la gestión de secretos cubren la mayor parte.",
      name: "un SaaS autoalojado",
      shortName: "SaaS autoalojado",
    },
  },
} as const;

export type StacksTranslations = typeof stacks;
export default stacks;
