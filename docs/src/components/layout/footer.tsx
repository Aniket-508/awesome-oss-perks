import { XIcon, LlmsIcon } from "@/components/icons";
import { LINK } from "@/constants/links";
import { ROUTES } from "@/constants/routes";
import { SITE } from "@/constants/site";
import type { FooterTranslations } from "@/locales/en/footer";

interface FooterProps {
  translation: FooterTranslations;
}

export const Footer = ({ translation }: FooterProps) => (
  <footer className="border-fd-border mt-auto border-t">
    <div className="text-fd-muted-foreground mx-auto flex w-full max-w-(--fd-layout-width) flex-col items-center justify-between gap-4 p-4 text-sm sm:flex-row">
      <p className="text-center sm:text-left">
        {translation.builtBy}{" "}
        <a
          href={LINK.PORTFOLIO}
          target="_blank"
          rel="noopener noreferrer"
          className="text-fd-foreground font-medium underline underline-offset-4"
        >
          {SITE.AUTHOR.NAME}
        </a>
        . {translation.hostedOn}{" "}
        <a
          href={LINK.VERCEL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-fd-foreground font-medium underline underline-offset-4"
        >
          Vercel
        </a>
        . {translation.translationsBy}{" "}
        <a
          href={LINK.LINGO}
          target="_blank"
          rel="noopener noreferrer"
          className="text-fd-foreground font-medium underline underline-offset-4"
        >
          Lingo.dev
        </a>
        .
      </p>

      <div className="flex items-center gap-4">
        <a
          href={LINK.TWITTER}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-fd-foreground transition-colors"
          aria-label={translation.twitter}
        >
          <XIcon className="size-4" />
        </a>
        <a
          href={ROUTES.LLMS_FULL}
          className="hover:text-fd-foreground transition-colors"
          aria-label={translation.llms}
        >
          <LlmsIcon className="size-4" />
        </a>
      </div>
    </div>
  </footer>
);
