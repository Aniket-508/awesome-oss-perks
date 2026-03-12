import type { Metadata } from "next";

import { LINK } from "@/constants/links";
import { SITE } from "@/constants/site";

interface CreateMetadataOptions {
  canonical?: string;
  description?: string;
  noIndex?: boolean;
  ogDescription?: string;
  ogImage?: string;
  ogTitle?: string;
  title?: string;
}

export const createMetadata = (
  options: CreateMetadataOptions = {}
): Metadata => {
  const {
    canonical,
    description = SITE.DESCRIPTION.SHORT,
    noIndex = false,
    ogDescription,
    ogImage = SITE.OG_IMAGE,
    ogTitle,
    title,
  } = options;

  return {
    ...(title && { title }),
    description,
    ...(canonical && {
      alternates: {
        canonical,
      },
    }),
    openGraph: {
      description: ogDescription ?? description,
      images: [
        {
          alt: `${SITE.NAME} - open-source perks and eligibility checker`,
          height: 630,
          url: ogImage,
          width: 1200,
        },
      ],
      siteName: SITE.NAME,
      title: ogTitle ?? title ?? SITE.NAME,
      type: "website",
      url: canonical ? `${SITE.URL}${canonical}` : SITE.URL,
    },
    twitter: {
      card: "summary_large_image",
      creator: SITE.AUTHOR.TWITTER,
      description: ogDescription ?? description,
      images: [ogImage],
      site: SITE.AUTHOR.TWITTER,
      title: ogTitle ?? title ?? SITE.NAME,
    },
    ...(noIndex && {
      robots: {
        follow: false,
        index: false,
      },
    }),
  };
};

export const baseMetadata: Metadata = {
  alternates: {
    canonical: "/",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: SITE.NAME,
  },
  applicationName: SITE.NAME,
  authors: [{ name: SITE.AUTHOR.NAME, url: LINK.GITHUB }],
  category: "technology",
  creator: SITE.AUTHOR.NAME,
  description: SITE.DESCRIPTION.LONG,
  keywords: [...SITE.KEYWORDS],
  metadataBase: new URL(SITE.URL),
  openGraph: {
    description: SITE.DESCRIPTION.SHORT,
    images: [
      {
        alt: `${SITE.NAME} - open-source perks and eligibility checker`,
        height: 630,
        url: SITE.OG_IMAGE,
        width: 1200,
      },
    ],
    locale: "en_US",
    siteName: SITE.NAME,
    title: SITE.NAME,
    type: "website",
    url: SITE.URL,
  },
  publisher: SITE.AUTHOR.NAME,
  title: {
    default: `${SITE.NAME} | Open-source perks and eligibility checker`,
    template: `%s | ${SITE.NAME}`,
  },
  twitter: {
    card: "summary_large_image",
    creator: SITE.AUTHOR.TWITTER,
    description: SITE.DESCRIPTION.SHORT,
    images: [SITE.OG_IMAGE],
    site: SITE.AUTHOR.TWITTER,
    title: `${SITE.NAME} | Open-source perks and eligibility checker`,
  },
};
