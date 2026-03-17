const check = {
  checkAnother: "Verificar outro repositório",
  checkFailed: "Verificação falhou",
  description:
    "Cole a URL de um repositório do GitHub ou GitLab para ver instantaneamente quais programas e benefícios de código aberto seu projeto pode receber.",
  eligible: "Elegível",
  fetchError:
    "Não foi possível obter os resultados de elegibilidade. Tente novamente.",
  fork: "Fork",
  heading: "Verifique a elegibilidade do seu projeto",
  ineligible: "Não elegível",
  lastPush: "Último push",
  needsReview: "Precisa de revisão",
  perks: "benefícios",
  private: "Privado",
  reasons: {
    codeOfConduct:
      "o Código de Conduta não pode ser verificado automaticamente",
    communitySize:
      "o tamanho da comunidade não pode ser verificado automaticamente",
    criteriaUnverifiable:
      "os critérios não podem ser verificados automaticamente",
    hostingPlatform:
      "o requisito de plataforma de hospedagem não pode ser verificado automaticamente",
    inactive:
      "o último commit foi há {days} dias (o projeto pode estar inativo)",
    missionAlignment:
      "o alinhamento com a missão não pode ser verificado automaticamente",
    noOsiLicense:
      "nenhuma licença aprovada pela OSI detectada (detectada: {license})",
    nonCommercial:
      "o requisito não comercial não pode ser verificado automaticamente",
    osiLicense: "requer uma licença aprovada pela OSI (detectada: {license})",
    permissiveLicense: "requer uma licença permissiva (detectada: {license})",
    popularityThreshold: "o limite de popularidade é determinado pelo provedor",
    procedural: "etapa processual — solicitar manualmente",
    projectTooNew:
      "o projeto deve ter pelo menos {required} dias (o seu tem {current} dias)",
    repoFork: "o repositório é um fork",
    repoPrivate: "o repositório é privado",
    requiresGithub: "requer um repositório GitHub",
    requiresGitlab: "requer um repositório GitLab",
    role: "o requisito de função não pode ser verificado automaticamente",
    starsBelow: "requer {threshold}+ estrelas (você tem {current})",
    starsMet: "{current} estrelas atingem o limite de {threshold}+",
    subjective:
      "critérios subjetivos não podem ser verificados automaticamente",
    usageRestriction:
      "a restrição de uso não pode ser verificada automaticamente",
  },
  stars: "estrelas",
  time: {
    daysAgo: "há {days}d",
    monthsAgo: "há {months}m",
    today: "hoje",
    yearsAgo: "há {years}a",
    yesterday: "ontem",
  },
};

export default check;
export type { CheckTranslations } from "../en/check";
