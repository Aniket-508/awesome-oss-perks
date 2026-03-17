import type { EligibilityReason } from "@ossperks/core";

import type { CheckTranslations } from "@/locales/en/check";

type ReasonTemplates = CheckTranslations["reasons"];

interface TranslateReasonOptions {
  canTranslateRuleReasons?: boolean;
  formatNumber?: (value: number) => string;
}

const interpolate = (
  template: string,
  params: Record<string, number | string>,
  formatNumber?: (value: number) => string
) => {
  let result = template;
  for (const [k, v] of Object.entries(params)) {
    let value: string;
    if (typeof v === "number") {
      value = formatNumber ? formatNumber(v) : String(v);
    } else {
      value = v;
    }
    result = result.replaceAll(`{${k}}`, value);
  }
  return result;
};

const translateReason = (
  reason: EligibilityReason,
  translatedEligibility: string[],
  templates: ReasonTemplates,
  { canTranslateRuleReasons = true, formatNumber }: TranslateReasonOptions = {}
) => {
  if (reason.code === "rule") {
    if (
      canTranslateRuleReasons &&
      typeof reason.ruleIndex === "number" &&
      reason.ruleIndex >= 0 &&
      reason.ruleIndex < translatedEligibility.length
    ) {
      return translatedEligibility[reason.ruleIndex];
    }
    return reason.message;
  }

  const template = templates[reason.code];
  return reason.params
    ? interpolate(template, reason.params, formatNumber)
    : template;
};

export const translateReasons = (
  reasons: EligibilityReason[],
  translatedEligibility: string[],
  templates: ReasonTemplates,
  options?: TranslateReasonOptions
): string[] =>
  reasons.map((reason) =>
    translateReason(reason, translatedEligibility, templates, options)
  );
