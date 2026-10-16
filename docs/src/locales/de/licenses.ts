const licenses = {
  nav: "Lizenzen",
  listing: {
    accepted: "{count} akzeptieren",
    breadcrumb: "Lizenzen",
    checkCta: "Repository prüfen",
    heading: "Open-Source-Perks nach Lizenz",
    includes: "Umfasst",
    intro:
      "Deine Lizenz ist die erste Hürde bei fast jedem Perk-Programm. Hier siehst du, was jede Lizenzfamilie in {count} Programmen freischaltet.",
    rejected: "{count} lehnen ab",
    unspecified: "{count} ohne Angabe",
  },
  detail: {
    acceptedHeading: "Von {count} Programmen akzeptiert",
    breadcrumb: "Lizenzen",
    checkCta: "Repository prüfen",
    checkCtaIntro:
      "Die Lizenz ist nur eine Hürde. Sterne, Aktivität und kommerzielle Nutzung sind weitere – prüfe dein Repository gegen alle {count} Programme.",
    rejectedOsiHeading:
      "Von {count} Programmen abgelehnt – OSI-Zulassung erforderlich",
    rejectedOsiIntro:
      "Diese Programme verlangen eine von der Open Source Initiative anerkannte Lizenz. Diese Familie erfüllt das nicht.",
    rejectedPermissiveHeading:
      "Von {count} Programmen abgelehnt – permissive Lizenz erforderlich",
    rejectedPermissiveIntro:
      "Diese Programme akzeptieren ausschließlich permissive Lizenzen wie MIT, Apache-2.0, BSD und ISC.",
    spdxHeading: "Lizenzen in dieser Familie",
    summary:
      "{accepted} akzeptieren · {rejected} lehnen ab · {unspecified} nennen keine Lizenzanforderung",
    unspecifiedHeading: "Keine genannte Lizenzanforderung: {count} Programme",
    unspecifiedIntro:
      "Diese Programme erwähnen in ihren Teilnahmebedingungen keine Lizenz. Eine Bewerbung lohnt sich trotzdem – die Zusage liegt im Ermessen des Anbieters.",
  },
  families: {
    copyleft: {
      advice:
        "Copyleft-Lizenzen sind OSI-anerkannt, deshalb akzeptiert sie nahezu jedes Programm. Nur Programme, die ausdrücklich eine permissive Lizenz verlangen, lehnen sie ab. AGPL-3.0 gehört zu dieser Gruppe: Sie besteht automatisierte OSI-Prüfungen, wird aber wegen der Netzwerk-Klausel von manchen Anbietern manuell geprüft.",
      heading: "Open-Source-Perks für GPL- und AGPL-Projekte",
      metaDescription:
        "{accepted} von {total} Open-Source-Perk-Programmen akzeptieren Copyleft-Lizenzen wie GPL-3.0, AGPL-3.0 und MPL-2.0. Sieh, welche Programme sie ablehnen – und warum.",
      metaTitle: "Copyleft-Lizenzen – welche Perks GPL & AGPL akzeptieren",
      name: "Copyleft",
      tagline:
        "GPL, AGPL, LGPL, MPL und EPL sind OSI-anerkannt, aber nicht permissiv.",
    },
    permissive: {
      advice:
        "Permissive Lizenzen bestehen jede Lizenzprüfung im Katalog. Wenn ein Programm dich trotzdem ablehnt, liegt es an Sternen, Aktivität oder kommerzieller Nutzung – nicht an deiner Lizenz.",
      heading: "Open-Source-Perks für Projekte unter MIT und Apache",
      metaDescription:
        "{accepted} von {total} Open-Source-Perk-Programmen akzeptieren permissive Lizenzen wie MIT, Apache-2.0 und BSD-3-Clause – mehr als bei jeder anderen Lizenzfamilie.",
      metaTitle: "Permissive Lizenzen – Open-Source-Perks für MIT & Apache",
      name: "Permissiv",
      tagline:
        "MIT, Apache-2.0, BSD und ISC stellen keine Bedingungen an die Weitergabe.",
    },
    "source-available": {
      advice:
        "BUSL, SSPL, Elastic und FSL sind source-available, nicht Open Source: Die Open Source Initiative hat sie nicht anerkannt. Sie scheitern an der Lizenzprüfung fast jedes Programms. Nur eine Umlizenzierung des Projekts – oder ein dual lizenzierter, OSI-anerkannter Kern – führt zum Ziel.",
      heading:
        "Open-Source-Perks für BUSL-, SSPL- und andere source-available Projekte",
      metaDescription:
        "Source-available-Lizenzen wie BUSL-1.1, SSPL-1.0 und Elastic-2.0 sind nicht OSI-anerkannt, deshalb lehnen sie {rejected} von {total} Perk-Programmen ab. Das bleibt übrig.",
      metaTitle: "Source-available – akzeptieren Perks BUSL & SSPL?",
      name: "Source-available",
      tagline:
        "BUSL, SSPL, Elastic und FSL veröffentlichen Quellcode, sind aber nicht OSI-anerkannt.",
    },
    unlicensed: {
      metaTitle: "Keine LICENSE-Datei — warum Programme dein Repo ablehnen",
      advice:
        "Ein Repository ohne LICENSE-Datei ist standardmäßig proprietär, deshalb scheitert jede Lizenzprüfung. Eine OSI-anerkannte LICENSE-Datei hinzuzufügen ist die wirkungsvollste Änderung vor einer Bewerbung.",
      heading: "Open-Source-Perks für Repositories ohne Lizenzdatei",
      metaDescription:
        "Ein Repository ohne LICENSE-Datei ist standardmäßig proprietär: {rejected} von {total} Perk-Programmen lehnen es direkt ab. Eine OSI-anerkannte Lizenz löst das mit einem Commit.",
      name: "Keine Lizenz",
      tagline:
        "Ein Repository ohne LICENSE-Datei räumt niemandem Rechte ein.",
    },
  },
} as const;

export type LicensesTranslations = typeof licenses;
export default licenses;
