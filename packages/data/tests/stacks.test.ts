import {
  getProgramBySlug,
  getStackBySlug,
  getStackPerkCount,
  getStackPrograms,
  getStacksByProgram,
  getStackSlugs,
  STACK_ROLES,
  STACKS,
} from "@ossperks/data";

describe("perk stacks", () => {
  it("references only programs that exist", () => {
    for (const stack of STACKS) {
      for (const entry of stack.entries) {
        expect({
          program: entry.program,
          resolved: Boolean(getProgramBySlug(entry.program)),
        }).toStrictEqual({ program: entry.program, resolved: true });
      }
    }
  });

  it("uses only declared roles", () => {
    const roles = new Set<string>(STACK_ROLES);
    for (const stack of STACKS) {
      for (const entry of stack.entries) {
        expect({
          known: roles.has(entry.role),
          role: entry.role,
        }).toStrictEqual({
          known: true,
          role: entry.role,
        });
      }
    }
  });

  it("never lists the same program twice in one stack", () => {
    for (const stack of STACKS) {
      const slugs = stack.entries.map((entry) => entry.program);
      expect(new Set(slugs).size).toBe(slugs.length);
    }
  });

  it("keeps every stack substantial enough to be worth a page", () => {
    for (const stack of STACKS) {
      expect(stack.entries.length).toBeGreaterThanOrEqual(5);
      expect(getStackPerkCount(stack)).toBeGreaterThan(stack.entries.length);
    }
  });

  it("has unique slugs", () => {
    const slugs = getStackSlugs();
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("resolves programs in declared setup order", () => {
    const nextjs = getStackBySlug("nextjs");
    if (!nextjs) {
      throw new Error("nextjs stack missing");
    }
    expect(
      getStackPrograms(nextjs).map(({ program }) => program.slug),
    ).toStrictEqual(nextjs.entries.map((entry) => entry.program));
  });

  it("finds every stack a program belongs to", () => {
    const sentryStacks = getStacksByProgram("sentry").map(
      (stack) => stack.slug,
    );
    expect(sentryStacks).toContain("nextjs");
    expect(getStacksByProgram("not-a-program")).toHaveLength(0);
  });
});
