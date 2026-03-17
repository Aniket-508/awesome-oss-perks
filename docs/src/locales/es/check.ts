const check = {
  checkAnother: "Verificar otro repositorio",
  checkFailed: "Verificación fallida",
  description:
    "Pega la URL de un repositorio de GitHub o GitLab para ver al instante a qué programas y beneficios de código abierto califica tu proyecto.",
  eligible: "Elegible",
  fetchError:
    "No se pudieron obtener los resultados de elegibilidad. Inténtalo de nuevo.",
  fork: "Fork",
  heading: "Verifica la elegibilidad de tu proyecto",
  ineligible: "No elegible",
  lastPush: "Último push",
  needsReview: "Necesita revisión",
  perks: "beneficios",
  private: "Privado",
  reasons: {
    codeOfConduct:
      "El Código de Conducta no se puede verificar automáticamente",
    communitySize:
      "el tamaño de la comunidad no se puede verificar automáticamente",
    criteriaUnverifiable:
      "los criterios no se pueden verificar automáticamente",
    hostingPlatform:
      "el requisito de plataforma de alojamiento no se puede verificar automáticamente",
    inactive:
      "el último commit fue hace {days} días (el proyecto puede estar inactivo)",
    missionAlignment:
      "la alineación con la misión no se puede verificar automáticamente",
    noOsiLicense:
      "no se detectó una licencia aprobada por la OSI (detectada: {license})",
    nonCommercial:
      "el requisito no comercial no se puede verificar automáticamente",
    osiLicense:
      "requiere una licencia aprobada por la OSI (detectada: {license})",
    permissiveLicense: "requiere una licencia permisiva (detectada: {license})",
    popularityThreshold: "el umbral de popularidad lo determina el proveedor",
    procedural: "paso procedimental — solicitar manualmente",
    projectTooNew:
      "el proyecto debe tener al menos {required} días (el tuyo tiene {current} días)",
    repoFork: "el repositorio es un fork",
    repoPrivate: "el repositorio es privado",
    requiresGithub: "requiere un repositorio de GitHub",
    requiresGitlab: "requiere un repositorio de GitLab",
    role: "el requisito de rol no se puede verificar automáticamente",
    starsBelow: "requiere {threshold}+ estrellas (tienes {current})",
    starsMet: "{current} estrellas alcanzan el umbral de {threshold}+",
    subjective:
      "los criterios subjetivos no se pueden verificar automáticamente",
    usageRestriction:
      "la restricción de uso no se puede verificar automáticamente",
  },
  stars: "estrellas",
  time: {
    daysAgo: "hace {days}d",
    monthsAgo: "hace {months}m",
    today: "hoy",
    yearsAgo: "hace {years}a",
    yesterday: "ayer",
  },
};

export default check;
export type { CheckTranslations } from "../en/check";
