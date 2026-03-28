import { getProgramBySlug, checkEligibility } from "@ossperks/core";

import { makeCtx } from "./helpers/fixtures.js";

describe("keyword-set intent classification", () => {
  it('"The project must be open source." passes for MIT-licensed repo', () => {
    const program = {
      ...getProgramBySlug("sentry"),
      eligibility: ["The project must be open source."],
    } as ReturnType<typeof getProgramBySlug> & { eligibility: string[] };
    const result = checkEligibility(program, makeCtx({ license: "MIT" }));
    expect(result.status).not.toBe("ineligible");
  });

  it('"approved license from an open-source initiative" passes for MIT', () => {
    const program = {
      ...getProgramBySlug("sentry"),
      eligibility: [
        "The project is licensed under an approved license from an open-source initiative.",
      ],
    } as ReturnType<typeof getProgramBySlug> & { eligibility: string[] };
    const result = checkEligibility(program, makeCtx({ license: "MIT" }));
    expect(result.status).not.toBe("ineligible");
  });

  it('"Fully open source (FOSS)." passes for OSI-licensed repo', () => {
    const program = {
      ...getProgramBySlug("sentry"),
      eligibility: ["Fully open source (FOSS)."],
    } as ReturnType<typeof getProgramBySlug> & { eligibility: string[] };
    const result = checkEligibility(
      program,
      makeCtx({ license: "Apache-2.0" }),
    );
    expect(result.status).not.toBe("ineligible");
  });

  it("multi-intent rule checks BOTH open-source AND public repo", () => {
    const program = {
      ...getProgramBySlug("sentry"),
      eligibility: ["Must be an open source project with a public repository."],
    } as ReturnType<typeof getProgramBySlug> & { eligibility: string[] };

    const publicResult = checkEligibility(
      program,
      makeCtx({ isPrivate: false, license: "MIT" }),
    );
    expect(publicResult.status).not.toBe("ineligible");

    const privateResult = checkEligibility(
      program,
      makeCtx({ isPrivate: true, license: "MIT" }),
    );
    expect(privateResult.status).toBe("ineligible");
    expect(privateResult.reasons[0]).toMatch(/private/i);
  });

  it("non-commercial rule is detected as needs-review", () => {
    const program = {
      ...getProgramBySlug("sentry"),
      eligibility: ["Must operate solely on a non-profit basis."],
    } as ReturnType<typeof getProgramBySlug> & { eligibility: string[] };
    const result = checkEligibility(program, makeCtx());
    expect(result.status).toBe("needs-review");
  });
});
