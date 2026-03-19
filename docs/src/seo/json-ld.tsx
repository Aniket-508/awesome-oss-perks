import { LINK } from "@/constants/links";
import { SITE } from "@/constants/site";
import { i18n } from "@/i18n/config";

const LOCALE_TO_BCP47: Record<string, string> = {
  en: "en-US",
  "pt-br": "pt-BR",
  zh: "zh-Hans",
};

const WebsiteJsonLd = () => {
  const inLanguage = i18n.languages.map(
    (locale: string) => LOCALE_TO_BCP47[locale] ?? locale,
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    description: SITE.DESCRIPTION.LONG,
    inLanguage,
    name: SITE.NAME,
    url: SITE.URL,
  };

  return (
    <script
      // oxlint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      type="application/ld+json"
    />
  );
};

const SoftwareSourceCodeJsonLd = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    author: {
      "@type": "Person",
      name: SITE.AUTHOR.NAME,
      url: LINK.TWITTER,
    },
    codeRepository: LINK.GITHUB,
    description: SITE.DESCRIPTION.LONG,
    isAccessibleForFree: true,
    keywords: SITE.KEYWORDS.join(", "),
    license: LINK.LICENSE,
    name: SITE.NAME,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      price: "0",
      priceCurrency: "USD",
    },
    programmingLanguage: ["TypeScript", "JavaScript"],
    runtimePlatform: "Node.js",
    url: SITE.URL,
  };

  return (
    <script
      // oxlint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      type="application/ld+json"
    />
  );
};

const OrganizationJsonLd = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    logo: `${SITE.URL}${SITE.OG_IMAGE}`,
    name: SITE.NAME,
    sameAs: [LINK.GITHUB, LINK.TWITTER],
    url: SITE.URL,
  };

  return (
    <script
      // oxlint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      type="application/ld+json"
    />
  );
};

const FAQJsonLd = () => {
  const faqs = [
    {
      answer: SITE.DESCRIPTION.LONG,
      question: `What is ${SITE.NAME}?`,
    },
    {
      answer:
        "OSS Perks provides a website that aggregates open-source perks and a CLI that checks whether your project qualifies for OSS programs based on their guidelines.",
      question: `How do I use ${SITE.NAME}?`,
    },
    {
      answer: `Yes, ${SITE.NAME} is completely free and open-source under the MIT license.`,
      question: `Is ${SITE.NAME} free?`,
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
      name: faq.question,
    })),
  };

  return (
    <script
      // oxlint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      type="application/ld+json"
    />
  );
};

const JsonLdScripts = () => (
  <>
    <WebsiteJsonLd />
    <SoftwareSourceCodeJsonLd />
    <OrganizationJsonLd />
    <FAQJsonLd />
  </>
);

export {
  JsonLdScripts,
  WebsiteJsonLd,
  SoftwareSourceCodeJsonLd,
  OrganizationJsonLd,
  FAQJsonLd,
};
