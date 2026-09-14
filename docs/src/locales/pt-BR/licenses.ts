const licenses = {
  nav: "Licenças",
  listing: {
    accepted: "{count} aceitam",
    breadcrumb: "Licenças",
    checkCta: "Verifique seu repositório",
    heading: "Benefícios open source por licença",
    includes: "Inclui",
    intro:
      "Sua licença é o primeiro filtro em quase todo programa de benefícios. Veja o que cada família de licenças libera entre {count} programas.",
    rejected: "{count} rejeitam",
    unspecified: "{count} não especificam",
  },
  detail: {
    acceptedHeading: "Aceita por {count} programas",
    breadcrumb: "Licenças",
    checkCta: "Verifique seu repositório",
    checkCtaIntro:
      "A licença é apenas um filtro. Estrelas, atividade e uso comercial são outros — verifique seu repositório em todos os {count} programas.",
    rejectedOsiHeading: "Rejeitada por {count} programas — exigem aprovação da OSI",
    rejectedOsiIntro:
      "Esses programas exigem uma licença aprovada pela Open Source Initiative. Esta família não se qualifica.",
    rejectedPermissiveHeading:
      "Rejeitada por {count} programas — exigem licença permissiva",
    rejectedPermissiveIntro:
      "Esses programas aceitam apenas licenças permissivas como MIT, Apache-2.0, BSD e ISC.",
    spdxHeading: "Licenças desta família",
    summary:
      "{accepted} aceitam · {rejected} rejeitam · {unspecified} não exigem licença específica",
    unspecifiedHeading: "Sem exigência de licença declarada: {count} programas",
    unspecifiedIntro:
      "Esses programas não mencionam licença nas regras de elegibilidade. Ainda vale a pena se candidatar — a aprovação fica a critério do provedor.",
  },
  families: {
    copyleft: {
      advice:
        "Licenças copyleft são aprovadas pela OSI, então quase todos os programas as aceitam. Só recusam aqueles que exigem explicitamente uma licença permissiva. A AGPL-3.0 está neste grupo: passa nas verificações automáticas da OSI, mas alguns provedores a analisam manualmente por causa da cláusula de uso em rede.",
      heading: "Benefícios open source para projetos GPL e AGPL",
      metaDescription:
        "{accepted} de {total} programas de benefícios open source aceitam licenças copyleft como GPL-3.0, AGPL-3.0 e MPL-2.0. Veja quais programas as rejeitam e por quê.",
      metaTitle: "Licenças copyleft — quais benefícios aceitam GPL e AGPL",
      name: "Copyleft",
      tagline:
        "GPL, AGPL, LGPL, MPL e EPL são aprovadas pela OSI, mas não são permissivas.",
    },
    permissive: {
      advice:
        "Licenças permissivas passam por todos os filtros de licença do catálogo. Se um programa ainda assim recusar, o motivo são estrelas, atividade ou uso comercial — não a sua licença.",
      heading: "Benefícios open source para projetos com licença MIT e Apache",
      metaDescription:
        "{accepted} de {total} programas de benefícios open source aceitam licenças permissivas como MIT, Apache-2.0 e BSD-3-Clause — mais que qualquer outra família.",
      metaTitle: "Licenças permissivas — benefícios para projetos MIT e Apache",
      name: "Permissivas",
      tagline:
        "MIT, Apache-2.0, BSD e ISC não impõem condições à redistribuição.",
    },
    "source-available": {
      advice:
        "BUSL, SSPL, Elastic e FSL são source-available, não open source: a Open Source Initiative não as aprovou. Elas falham no filtro de licença de quase todos os programas. Relicenciar o projeto — ou adotar licença dupla com um núcleo aprovado pela OSI — é o único caminho.",
      heading: "Benefícios open source para projetos BUSL, SSPL e outros source-available",
      metaDescription:
        "Licenças source-available como BUSL-1.1, SSPL-1.0 e Elastic-2.0 não são aprovadas pela OSI, então {rejected} de {total} programas as rejeitam. Veja o que resta.",
      metaTitle: "Licenças source-available — benefícios aceitam BUSL e SSPL?",
      name: "Source-available",
      tagline:
        "BUSL, SSPL, Elastic e FSL publicam o código-fonte, mas não são aprovadas pela OSI.",
    },
    unlicensed: {
      metaTitle: "Sem arquivo LICENSE — por que os programas recusam seu repo",
      advice:
        "Um repositório sem arquivo LICENSE é proprietário por padrão, então falha em todos os filtros de licença. Adicionar um arquivo LICENSE aprovado pela OSI é a mudança de maior impacto antes de se candidatar.",
      heading: "Benefícios open source para repositórios sem arquivo de licença",
      metaDescription:
        "Um repositório sem arquivo LICENSE é proprietário por padrão: {rejected} de {total} programas o rejeitam de imediato. Adicionar uma licença aprovada pela OSI resolve em um commit.",
      name: "Sem licença",
      tagline: "Um repositório sem arquivo LICENSE não concede direito algum a ninguém.",
    },
  },
} as const;

export type LicensesTranslations = typeof licenses;
export default licenses;
