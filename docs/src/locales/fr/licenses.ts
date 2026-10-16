const licenses = {
  nav: "Licences",
  listing: {
    accepted: "{count} acceptent",
    breadcrumb: "Licences",
    checkCta: "Analysez votre dépôt",
    heading: "Avantages open source par licence",
    includes: "Comprend",
    intro:
      "Votre licence est le premier filtre de presque tous les programmes d'avantages. Voici ce que chaque famille de licences débloque parmi {count} programmes.",
    rejected: "{count} refusent",
    unspecified: "{count} sans précision",
  },
  detail: {
    acceptedHeading: "Acceptée par {count} programmes",
    breadcrumb: "Licences",
    checkCta: "Analysez votre dépôt",
    checkCtaIntro:
      "La licence n'est qu'un filtre parmi d'autres. Les étoiles, l'activité et l'usage commercial en sont d'autres — comparez votre dépôt aux {count} programmes.",
    rejectedOsiHeading: "Refusée par {count} programmes — licence approuvée par l'OSI exigée",
    rejectedOsiIntro:
      "Ces programmes exigent une licence approuvée par l'Open Source Initiative. Cette famille ne remplit pas ce critère.",
    rejectedPermissiveHeading:
      "Refusée par {count} programmes — licence permissive exigée",
    rejectedPermissiveIntro:
      "Ces programmes n'acceptent que les licences permissives comme MIT, Apache-2.0, BSD et ISC.",
    spdxHeading: "Licences de cette famille",
    summary:
      "{accepted} acceptent · {rejected} refusent · {unspecified} n'imposent aucune exigence de licence",
    unspecifiedHeading: "Aucune exigence de licence indiquée : {count} programmes",
    unspecifiedIntro:
      "Ces programmes ne mentionnent jamais de licence dans leurs critères d'éligibilité. Postuler reste utile — l'acceptation relève du fournisseur.",
  },
  families: {
    copyleft: {
      advice:
        "Les licences copyleft sont approuvées par l'OSI, donc presque tous les programmes les acceptent. Seuls ceux qui exigent explicitement une licence permissive les refusent. AGPL-3.0 fait partie de ce groupe : elle passe les vérifications OSI automatisées, mais certains fournisseurs l'examinent manuellement à cause de la clause d'usage en réseau.",
      heading: "Avantages open source pour les projets GPL et AGPL",
      metaDescription:
        "{accepted} des {total} programmes d'avantages open source acceptent les licences copyleft comme GPL-3.0, AGPL-3.0 et MPL-2.0. Découvrez lesquels les refusent, et pourquoi.",
      metaTitle: "Licences copyleft — quels avantages acceptent GPL et AGPL",
      name: "Copyleft",
      tagline:
        "GPL, AGPL, LGPL, MPL et EPL sont approuvées par l'OSI mais pas permissives.",
    },
    permissive: {
      advice:
        "Les licences permissives franchissent tous les filtres de licence du catalogue. Si un programme vous refuse malgré tout, la cause est les étoiles, l'activité ou l'usage commercial — pas votre licence.",
      heading: "Avantages open source pour les projets sous licence MIT et Apache",
      metaDescription:
        "{accepted} des {total} programmes d'avantages open source acceptent les licences permissives comme MIT, Apache-2.0 et BSD-3-Clause — plus que toute autre famille.",
      metaTitle: "Licences permissives — avantages pour projets MIT et Apache",
      name: "Permissive",
      tagline:
        "MIT, Apache-2.0, BSD et ISC n'imposent aucune condition à la redistribution.",
    },
    "source-available": {
      advice:
        "BUSL, SSPL, Elastic et FSL sont à source visible, pas open source : l'Open Source Initiative ne les a pas approuvées. Elles échouent au filtre de licence de presque tous les programmes. Changer la licence du projet — ou proposer un double licenciement avec un cœur approuvé par l'OSI — est la seule voie d'accès.",
      heading: "Avantages open source pour les projets BUSL, SSPL et autres à source visible",
      metaDescription:
        "Les licences à source visible comme BUSL-1.1, SSPL-1.0 et Elastic-2.0 ne sont pas approuvées par l'OSI : {rejected} des {total} programmes les refusent. Voici ce qui reste.",
      metaTitle: "Licences à source visible — BUSL et SSPL sont-elles acceptées ?",
      name: "Source visible",
      tagline:
        "BUSL, SSPL, Elastic et FSL publient leur code source mais ne sont pas approuvées par l'OSI.",
    },
    unlicensed: {
      metaTitle: "Aucun fichier LICENSE — pourquoi les programmes refusent votre dépôt",
      advice:
        "Un dépôt sans fichier LICENSE est propriétaire par défaut : tous les filtres de licence échouent. Ajouter un fichier LICENSE approuvé par l'OSI est le changement le plus rentable à faire avant de postuler.",
      heading: "Avantages open source pour les dépôts sans fichier de licence",
      metaDescription:
        "Un dépôt sans fichier LICENSE est propriétaire par défaut : {rejected} des {total} programmes le refusent d'emblée. Ajouter une licence approuvée par l'OSI règle tout en un commit.",
      name: "Aucune licence",
      tagline: "Un dépôt sans fichier LICENSE n'accorde aucun droit à personne.",
    },
  },
} as const;

export type LicensesTranslations = typeof licenses;
export default licenses;
