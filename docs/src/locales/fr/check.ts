const check = {
  checkAnother: "Vérifier un autre dépôt",
  checkFailed: "Vérification échouée",
  description:
    "Collez l'URL d'un dépôt GitHub ou GitLab pour voir instantanément à quels programmes et avantages open source votre projet est éligible.",
  eligible: "Éligible",
  fetchError:
    "Impossible de récupérer les résultats d'éligibilité. Veuillez réessayer.",
  fork: "Fork",
  heading: "Vérifiez l'éligibilité de votre projet",
  ineligible: "Non éligible",
  lastPush: "Dernier push",
  needsReview: "À vérifier",
  perks: "avantages",
  private: "Privé",
  reasons: {
    codeOfConduct:
      "le Code de Conduite ne peut pas être vérifié automatiquement",
    communitySize:
      "la taille de la communauté ne peut pas être vérifiée automatiquement",
    criteriaUnverifiable:
      "les critères ne peuvent pas être vérifiés automatiquement",
    hostingPlatform:
      "l'exigence de plateforme d'hébergement ne peut pas être vérifiée automatiquement",
    inactive:
      "le dernier commit date de {days} jours (le projet est peut-être inactif)",
    missionAlignment:
      "l'alignement avec la mission ne peut pas être vérifié automatiquement",
    noOsiLicense:
      "aucune licence approuvée par l'OSI détectée (détectée : {license})",
    nonCommercial:
      "l'exigence non commerciale ne peut pas être vérifiée automatiquement",
    osiLicense:
      "nécessite une licence approuvée par l'OSI (détectée : {license})",
    permissiveLicense:
      "nécessite une licence permissive (détectée : {license})",
    popularityThreshold:
      "le seuil de popularité est déterminé par le fournisseur",
    procedural: "étape procédurale — postuler manuellement",
    projectTooNew:
      "le projet doit avoir au moins {required} jours (le vôtre a {current} jours)",
    repoFork: "le dépôt est un fork",
    repoPrivate: "le dépôt est privé",
    requiresGithub: "nécessite un dépôt GitHub",
    requiresGitlab: "nécessite un dépôt GitLab",
    role: "l'exigence de rôle ne peut pas être vérifiée automatiquement",
    starsBelow: "nécessite {threshold}+ étoiles (vous en avez {current})",
    starsMet: "{current} étoiles atteignent le seuil de {threshold}+",
    subjective:
      "les critères subjectifs ne peuvent pas être vérifiés automatiquement",
    usageRestriction:
      "la restriction d'utilisation ne peut pas être vérifiée automatiquement",
  },
  stars: "étoiles",
  time: {
    daysAgo: "il y a {days}j",
    monthsAgo: "il y a {months}m",
    today: "aujourd'hui",
    yearsAgo: "il y a {years}a",
    yesterday: "hier",
  },
};

export default check;
export type { CheckTranslations } from "../en/check";
