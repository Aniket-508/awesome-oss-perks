import { getCategories, getAllPerkTypes } from "@ossperks/core";
import { createSearchParamsCache, parseAsStringLiteral } from "nuqs/server";

const categories = getCategories();
const perkTypes = getAllPerkTypes();

export const programsSearchParams = {
  category: parseAsStringLiteral(categories),
  type: parseAsStringLiteral(perkTypes),
};

export const programsParamsCache =
  createSearchParamsCache(programsSearchParams);
