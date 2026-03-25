interface TimeTranslations {
  daysAgo: string;
  monthsAgo: string;
  today: string;
  yearsAgo: string;
  yesterday: string;
}

export const formatAge = (iso: string, t: TimeTranslations): string => {
  const days = Math.floor(
    (Date.now() - new Date(iso).getTime()) / (1000 * 60 * 60 * 24),
  );
  if (days === 0) {
    return t.today;
  }
  if (days === 1) {
    return t.yesterday;
  }
  if (days < 30) {
    return t.daysAgo.replace("{days}", String(days));
  }
  if (days < 365) {
    return t.monthsAgo.replace("{months}", String(Math.floor(days / 30)));
  }
  return t.yearsAgo.replace("{years}", String(Math.floor(days / 365)));
};
