import "server-only";
import {
  programs as corePrograms,
  programs as allPrograms,
  getProgramBySlug,
  getFeaturedPrograms as getFeaturedProgramsBase,
} from "@ossperks/core";
import type { Program } from "@ossperks/core";

import { i18n } from "@/i18n/config";
import { programsSource } from "@/lib/source";
import type { ProgramTranslationMap } from "@/types/check";

const parsePerks = (
  section: string,
): { title: string; description: string }[] =>
  section
    .split("\n")
    .filter((l) => /^[*-]\s+\*\*/.test(l.trim()))
    .map((line) => {
      const match = line.match(/\*\*(.+?)\*\*\s*[:：]\s*(.*)/);
      return match
        ? { description: match[2], title: match[1] }
        : { description: "", title: line };
    });

const parseUnorderedList = (section: string): string[] =>
  section
    .split("\n")
    .filter((l) => /^[*-]\s+/.test(l.trim()))
    .map((l) => l.replace(/^[*-]\s+/, "").trim());

const parseOrderedList = (section: string): string[] =>
  section
    .split("\n")
    .filter((l) => /^\d+\.\s+/.test(l.trim()))
    .map((l) => l.replace(/^\d+\.\s+/, "").trim());

const splitSections = (text: string): string[] =>
  text.split(/^.+\[#.+\]\s*$/m).slice(1);

const parseSections = (sections: string[], program: Program) => {
  let idx = 0;
  const perks = sections[idx] ? parsePerks(sections[idx]) : program.perks;
  idx += 1;
  const eligibility = sections[idx]
    ? parseUnorderedList(sections[idx])
    : program.eligibility;
  idx += 1;

  let requirements = program.requirements ?? [];
  if (program.requirements?.length && sections[idx]) {
    requirements = parseUnorderedList(sections[idx]);
    idx += 1;
  }

  let applicationProcess = program.applicationProcess ?? [];
  if (program.applicationProcess?.length && sections[idx]) {
    applicationProcess = parseOrderedList(sections[idx]);
  }

  return { applicationProcess, eligibility, perks, requirements };
};

const translateProgram = async (
  program: Program,
  lang: string,
): Promise<Program> => {
  if (lang === i18n.defaultLanguage) {
    return program;
  }

  const page = programsSource.getPage([program.slug], lang);
  if (!page) {
    return program;
  }

  const text = await page.data.getText("processed");
  const sections = splitSections(text);
  const parsed = parseSections(sections, program);

  return {
    ...program,
    applicationProcess: parsed.applicationProcess,
    description: page.data.description ?? program.description,
    eligibility: parsed.eligibility,
    name: page.data.title,
    perks: parsed.perks,
    requirements: parsed.requirements,
  };
};

export const getPrograms = async (lang: string) => {
  const results = await Promise.all(
    allPrograms.map((p) => translateProgram(p, lang)),
  );
  return results;
};

export const getProgram = async (
  slug: string,
  lang: string,
): Promise<Program | undefined> => {
  const program = getProgramBySlug(slug);
  if (!program) {
    return undefined;
  }
  return await translateProgram(program, lang);
};

export const getFeaturedPrograms = async (lang: string) => {
  const results = await Promise.all(
    getFeaturedProgramsBase().map((p) => translateProgram(p, lang)),
  );
  return results;
};

const formatProgramTranslation = (
  program: Program,
  lang: string,
  englishProgram?: Program,
): ProgramTranslationMap[string] => ({
  eligibility: program.eligibility,
  hasEligibilityParity:
    lang === i18n.defaultLanguage ||
    program.eligibility.length ===
      (englishProgram?.eligibility.length ?? program.eligibility.length),
  name: program.name,
});

export const getProgramTranslations = async (
  lang: string,
): Promise<ProgramTranslationMap> => {
  const translated = await getPrograms(lang);
  const englishPrograms = new Map(
    corePrograms.map((program) => [program.slug, program]),
  );
  const map: ProgramTranslationMap = {};
  for (const p of translated) {
    const en = englishPrograms.get(p.slug);
    map[p.slug] = formatProgramTranslation(p, lang, en);
  }
  return map;
};

export const getSingleProgramTranslation = async (
  slug: string,
  lang: string,
): Promise<ProgramTranslationMap> => {
  const program = await getProgram(slug, lang);
  if (!program) {
    return {};
  }
  const englishProgram = corePrograms.find((p) => p.slug === slug);
  return {
    [slug]: formatProgramTranslation(program, lang, englishProgram),
  };
};
