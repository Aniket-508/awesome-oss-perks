"use client";

import type { Category, PerkType, Program } from "@ossperks/core";
import { useQueryStates } from "nuqs";
import { useCallback, useMemo } from "react";

import { ProgramCard } from "@/components/programs/program-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { withLocalePrefix } from "@/i18n/navigation";
import { programsSearchParams } from "@/lib/search-params";

interface ProgramWithPerkTypes extends Program {
  perkTypes: PerkType[];
}

interface ProgramsFilterProps {
  programs: ProgramWithPerkTypes[];
  categories: Category[];
  perkTypes: PerkType[];
  lang: string;
  translations: {
    filters: {
      allCategories: string;
      allTypes: string;
      noMatches: string;
    };
    learnMore: string;
    more: string;
  };
  categoryLabels: Record<string, string>;
  perkTypeLabels: Record<string, string>;
}

const ALL = "__all__";

export const ProgramsFilter = ({
  programs,
  categories,
  perkTypes,
  lang,
  translations,
  categoryLabels,
  perkTypeLabels,
}: ProgramsFilterProps) => {
  const [{ category, type }, setFilters] = useQueryStates(
    programsSearchParams,
    { shallow: false },
  );

  const filtered = useMemo(
    () =>
      programs.filter((p) => {
        if (category && p.category !== category) {
          return false;
        }
        if (type && !p.perkTypes.includes(type)) {
          return false;
        }
        return true;
      }),
    [programs, category, type],
  );

  const handleCategoryChange = useCallback(
    async (v: string | number | null) => {
      const value = v as string;
      await setFilters({
        category: value === ALL ? null : (value as Category),
      });
    },
    [setFilters],
  );

  const handlePerkTypeChange = useCallback(
    async (v: string | number | null) => {
      const value = v as string;
      await setFilters({
        type: value === ALL ? null : (value as PerkType),
      });
    },
    [setFilters],
  );

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-3">
        <Select value={category ?? ALL} onValueChange={handleCategoryChange}>
          <SelectTrigger>
            <SelectValue>
              {category
                ? (categoryLabels[category] ?? category)
                : translations.filters.allCategories}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>
              {translations.filters.allCategories}
            </SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {categoryLabels[cat] ?? cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={type ?? ALL} onValueChange={handlePerkTypeChange}>
          <SelectTrigger>
            <SelectValue>
              {type
                ? (perkTypeLabels[type] ?? type)
                : translations.filters.allTypes}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>{translations.filters.allTypes}</SelectItem>
            {perkTypes.map((perkType) => (
              <SelectItem key={perkType} value={perkType}>
                {perkTypeLabels[perkType] ?? perkType}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {filtered.map((program) => {
          const categoryLabel =
            categoryLabels[program.category] ?? program.category;
          const programHref = withLocalePrefix(
            lang,
            `/programs/${program.slug}` as `/${string}`,
          );
          return (
            <ProgramCard
              key={program.slug}
              program={program}
              programHref={programHref}
              categoryLabel={categoryLabel}
              learnMore={translations.learnMore}
              more={translations.more}
            />
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="bg-fd-muted/30 rounded-lg border border-dashed p-12 text-center">
          <p className="text-fd-muted-foreground">
            {translations.filters.noMatches}
          </p>
        </div>
      )}
    </>
  );
};
