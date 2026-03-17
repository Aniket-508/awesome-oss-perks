const check = {
  checkAnother: "Weiteres Repository prüfen",
  checkFailed: "Prüfung fehlgeschlagen",
  description:
    "Füge die URL eines GitHub- oder GitLab-Repositorys ein, um sofort zu sehen, für welche Open-Source-Programme und Vorteile dein Projekt in Frage kommt.",
  eligible: "Berechtigt",
  fetchError:
    "Die Berechtigungsergebnisse konnten nicht abgerufen werden. Bitte versuche es erneut.",
  fork: "Fork",
  heading: "Prüfe die Berechtigung deines Projekts",
  ineligible: "Nicht berechtigt",
  lastPush: "Letzter Push",
  needsReview: "Überprüfung nötig",
  perks: "Vorteile",
  private: "Privat",
  reasons: {
    codeOfConduct: "Verhaltenskodex kann nicht automatisch überprüft werden",
    communitySize: "Communitygröße kann nicht automatisch überprüft werden",
    criteriaUnverifiable: "Kriterien können nicht automatisch überprüft werden",
    hostingPlatform:
      "Hosting-Plattform-Anforderung kann nicht automatisch überprüft werden",
    inactive:
      "letzter Commit vor {days} Tagen (Projekt ist möglicherweise inaktiv)",
    missionAlignment:
      "Missionsausrichtung kann nicht automatisch überprüft werden",
    noOsiLicense: "keine OSI-genehmigte Lizenz erkannt (erkannt: {license})",
    nonCommercial:
      "nicht-kommerzielle Anforderung kann nicht automatisch überprüft werden",
    osiLicense: "erfordert eine OSI-genehmigte Lizenz (erkannt: {license})",
    permissiveLicense: "erfordert eine permissive Lizenz (erkannt: {license})",
    popularityThreshold: "Popularitätsschwelle wird vom Anbieter bestimmt",
    procedural: "Verfahrensschritt — manuell bewerben",
    projectTooNew:
      "Projekt muss mindestens {required} Tage alt sein (deines ist {current} Tage alt)",
    repoFork: "Repository ist ein Fork",
    repoPrivate: "Repository ist privat",
    requiresGithub: "erfordert ein GitHub-Repository",
    requiresGitlab: "erfordert ein GitLab-Repository",
    role: "Rollenanforderung kann nicht automatisch überprüft werden",
    starsBelow: "erfordert {threshold}+ Sterne (du hast {current})",
    starsMet: "{current} Sterne erreichen die Schwelle von {threshold}+",
    subjective:
      "subjektive Kriterien können nicht automatisch überprüft werden",
    usageRestriction:
      "Nutzungsbeschränkung kann nicht automatisch überprüft werden",
  },
  stars: "Sterne",
  time: {
    daysAgo: "vor {days}T",
    monthsAgo: "vor {months}M",
    today: "heute",
    yearsAgo: "vor {years}J",
    yesterday: "gestern",
  },
};

export default check;
export type { CheckTranslations } from "../en/check";
