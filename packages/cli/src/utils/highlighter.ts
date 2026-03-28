import pc from "picocolors";

export const ansi = {
  bannerAccent: "\u001B[38;5;145m",
  bannerGradient: [
    "\u001B[38;5;250m",
    "\u001B[38;5;248m",
    "\u001B[38;5;245m",
    "\u001B[38;5;243m",
    "\u001B[38;5;240m",
    "\u001B[38;5;238m",
  ] as const,
  bannerMuted: "\u001B[38;5;102m",
  bold: "\u001B[1m",
  reset: "\u001B[0m",
} as const;

export const highlighter = {
  blue: pc.blue,
  bold: pc.bold,
  cyan: pc.cyan,
  dim: pc.dim,
  error: pc.red,
  green: pc.green,
  heading: (text: string): string => pc.bold(pc.cyan(text)),
  info: pc.cyan,
  red: pc.red,
  success: pc.green,
  underline: pc.underline,
  warn: pc.yellow,
  white: pc.white,
  yellow: pc.yellow,
} as const;
