import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

import { LINK } from "@/constants/links";
import { ROUTES } from "@/constants/routes";
import { i18n } from "@/lib/i18n";

export const baseOptions = (_locale: string): BaseLayoutProps => ({
  githubUrl: LINK.GITHUB,
  i18n,
  links: [
    {
      text: "Programs",
      url: ROUTES.PROGRAMS,
    },
    {
      text: "People",
      url: ROUTES.PEOPLE,
    },
    {
      text: "CLI",
      url: ROUTES.CLI,
    },
    {
      text: "About",
      url: ROUTES.ABOUT,
    },
    // {
    //   text: "Sponsors",
    //   url: ROUTES.SPONSORS,
    // },
  ],
  nav: {
    title: "OSS Perks",
  },
});
