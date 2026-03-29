import { i18n } from "@/i18n/config";

/** Fills `category.intro`; replaces `{programLabel}` with singular/plural only for English. */
export const formatProgramsCategoryIntro = (
  template: string,
  count: number,
  categoryLabel: string,
  lang: string,
): string => {
  let programLabel = "programs";
  if (lang === i18n.defaultLanguage && count === 1) {
    programLabel = "program";
  }

  return template
    .replace("{count}", String(count))
    .replace("{category}", categoryLabel.toLowerCase())
    .replace("{programLabel}", programLabel);
};
