const licenses = {
  nav: "Licencias",
  listing: {
    accepted: "{count} aceptan",
    breadcrumb: "Licencias",
    checkCta: "Analiza tu repositorio",
    heading: "Ventajas open source por licencia",
    includes: "Incluye",
    intro:
      "Tu licencia es el primer filtro de casi todos los programas de ventajas. Esto es lo que desbloquea cada familia de licencias en {count} programas.",
    rejected: "{count} rechazan",
    unspecified: "{count} sin especificar",
  },
  detail: {
    acceptedHeading: "Aceptada por {count} programas",
    breadcrumb: "Licencias",
    checkCta: "Analiza tu repositorio",
    checkCtaIntro:
      "La licencia es solo un filtro. Las estrellas, la actividad y el uso comercial son otros: compara tu repositorio con los {count} programas.",
    rejectedOsiHeading: "Rechazada por {count} programas — se exige aprobación de OSI",
    rejectedOsiIntro:
      "Estos programas exigen una licencia aprobada por la Open Source Initiative. Esta familia no cumple el requisito.",
    rejectedPermissiveHeading:
      "Rechazada por {count} programas — se exige licencia permisiva",
    rejectedPermissiveIntro:
      "Estos programas solo aceptan licencias permisivas como MIT, Apache-2.0, BSD e ISC.",
    spdxHeading: "Licencias de esta familia",
    summary:
      "{accepted} aceptan · {rejected} rechazan · {unspecified} no exigen ninguna licencia",
    unspecifiedHeading: "Sin requisito de licencia declarado: {count} programas",
    unspecifiedIntro:
      "Estos programas no mencionan ninguna licencia en sus criterios de elegibilidad. Aun así vale la pena solicitarlo: la aprobación queda a criterio del proveedor.",
  },
  families: {
    copyleft: {
      advice:
        "Las licencias copyleft están aprobadas por la OSI, así que casi todos los programas las aceptan. Solo las rechazan los programas que exigen explícitamente una licencia permisiva. AGPL-3.0 entra en este grupo: supera las comprobaciones automáticas de OSI, pero algunos proveedores la revisan a mano por su cláusula de uso en red.",
      heading: "Ventajas open source para proyectos GPL y AGPL",
      metaDescription:
        "{accepted} de {total} programas de ventajas para open source aceptan licencias copyleft como GPL-3.0, AGPL-3.0 y MPL-2.0. Descubre qué programas las rechazan y por qué.",
      metaTitle: "Licencias copyleft: qué ventajas aceptan GPL y AGPL",
      name: "Copyleft",
      tagline:
        "GPL, AGPL, LGPL, MPL y EPL están aprobadas por la OSI, pero no son permisivas.",
    },
    permissive: {
      advice:
        "Las licencias permisivas superan todos los filtros de licencia del catálogo. Si un programa te rechaza, el motivo serán las estrellas, la actividad o el uso comercial, no tu licencia.",
      heading: "Ventajas open source para proyectos con licencia MIT y Apache",
      metaDescription:
        "{accepted} de {total} programas de ventajas para open source aceptan licencias permisivas como MIT, Apache-2.0 y BSD-3-Clause: más que cualquier otra familia.",
      metaTitle: "Licencias permisivas: ventajas para proyectos MIT y Apache",
      name: "Permisivas",
      tagline:
        "MIT, Apache-2.0, BSD e ISC no imponen condiciones a la redistribución.",
    },
    "source-available": {
      advice:
        "BUSL, SSPL, Elastic y FSL son de código disponible, no open source: la Open Source Initiative no las ha aprobado. No superan el filtro de licencia de casi ningún programa. Relicenciar el proyecto —o publicar un núcleo con licencia doble aprobada por la OSI— es la única vía de entrada.",
      heading: "Ventajas open source para proyectos BUSL, SSPL y de código disponible",
      metaDescription:
        "Las licencias de código disponible como BUSL-1.1, SSPL-1.0 y Elastic-2.0 no están aprobadas por la OSI, así que {rejected} de {total} programas las rechazan. Esto es lo que queda.",
      metaTitle: "Código disponible: ¿se aceptan BUSL y SSPL?",
      name: "Código disponible",
      tagline:
        "BUSL, SSPL, Elastic y FSL publican el código, pero no están aprobadas por la OSI.",
    },
    unlicensed: {
      metaTitle: "Sin archivo LICENSE: por qué los programas rechazan tu repo",
      advice:
        "Un repositorio sin archivo LICENSE es propietario por defecto, así que falla todos los filtros de licencia. Añadir un archivo LICENSE aprobado por la OSI es el cambio más valioso que puedes hacer antes de solicitar nada.",
      heading: "Ventajas open source para repositorios sin archivo de licencia",
      metaDescription:
        "Un repositorio sin archivo LICENSE es propietario por defecto: {rejected} de {total} programas lo rechazan de plano. Añadir una licencia aprobada por la OSI lo soluciona en un commit.",
      name: "Sin licencia",
      tagline: "Un repositorio sin archivo LICENSE no concede ningún derecho a nadie.",
    },
  },
} as const;

export type LicensesTranslations = typeof licenses;
export default licenses;
