import {
  checkAllProgramsDetailed,
  checkEligibilityDetailed,
  fetchRepoContext,
  getProgramBySlug,
  programs,
  VALID_PROVIDERS,
} from "@ossperks/core";
import type { Program, RepoProvider, RepoRef } from "@ossperks/core";
import { headers } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { DEFAULT_PROVIDER } from "@/lib/check";
import { checkDailyRateLimit, checkRateLimit } from "@/lib/rate-limit";
import { CheckApiErrorCode } from "@/types/check";

const CACHE_TTL_MS = 5 * 60 * 1000;
const CACHE_MAX_AGE_S = Math.floor(CACHE_TTL_MS / 1000);

interface CacheEntry {
  body: Record<string, unknown>;
  cachedAt: number;
}

const responseCache = new Map<string, CacheEntry>();

const getCached = (key: string): Record<string, unknown> | null => {
  const entry = responseCache.get(key);
  if (!entry) {
    return null;
  }
  if (Date.now() - entry.cachedAt > CACHE_TTL_MS) {
    responseCache.delete(key);
    return null;
  }
  return entry.body;
};

const setCache = (key: string, body: Record<string, unknown>) => {
  responseCache.set(key, { body, cachedAt: Date.now() });
};

const CORS_HEADERS = {
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Max-Age": "86400",
} as const;

const jsonResponse = (
  body: unknown,
  init: { headers?: Record<string, string>; status?: number } = {},
) =>
  NextResponse.json(body, {
    ...init,
    headers: { ...CORS_HEADERS, ...init.headers },
  });

const validateParams = (searchParams: URLSearchParams) => {
  const owner = searchParams.get("owner");
  const path = searchParams.get("path");
  const repo = searchParams.get("repo");
  const provider =
    (searchParams.get("provider") as RepoProvider) ?? DEFAULT_PROVIDER;
  const programSlug = searchParams.get("program");

  if (!owner || !repo) {
    return {
      error: jsonResponse(
        {
          error: "Missing required query parameters: owner, repo",
          errorCode: CheckApiErrorCode.MissingParams,
        },
        { status: 400 },
      ),
    };
  }

  if (!VALID_PROVIDERS.has(provider)) {
    return {
      error: jsonResponse(
        {
          error:
            'Invalid provider. Must be "github", "gitlab", "codeberg", or "gitea".',
          errorCode: CheckApiErrorCode.InvalidProvider,
        },
        { status: 400 },
      ),
    };
  }

  let program: Program | null = null;
  if (programSlug) {
    const resolved = getProgramBySlug(programSlug);
    if (!resolved) {
      return {
        error: jsonResponse(
          {
            error: `Unknown program slug "${programSlug}".`,
            errorCode: CheckApiErrorCode.InvalidProgram,
          },
          { status: 400 },
        ),
      };
    }
    program = resolved;
  }

  return {
    owner,
    path: path ?? `${owner}/${repo}`,
    program,
    provider,
    repo,
  };
};

const getClientIp = async () => {
  const headersList = await headers();
  return (
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anonymous"
  );
};

const applyRateLimit = async () => {
  const ip = await getClientIp();

  const minute = await checkRateLimit.limit(ip);
  if (!minute.success) {
    return minute;
  }

  const daily = await checkDailyRateLimit.limit(ip);
  if (!daily.success) {
    return daily;
  }

  return minute;
};

const rateLimitHeaders = (rl: {
  limit: number;
  remaining: number;
  reset: number;
}) => ({
  "RateLimit-Limit": String(rl.limit),
  "RateLimit-Remaining": String(rl.remaining),
  "RateLimit-Reset": String(rl.reset),
});

const cacheHeaders = (hit: boolean) => ({
  "Cache-Control": `public, max-age=${CACHE_MAX_AGE_S}, s-maxage=${CACHE_MAX_AGE_S}`,
  "X-Cache": hit ? "HIT" : "MISS",
});

const formatResult = (
  program: Program,
  result: ReturnType<typeof checkEligibilityDetailed>,
) => ({
  name: program.name,
  perksCount: program.perks.length,
  reasons: result.reasons,
  slug: program.slug,
  status: result.status,
});

const fetchAndCheck = async (ref: RepoRef, program: Program | null) => {
  const ctx = await fetchRepoContext(ref);

  const results = program
    ? [formatResult(program, checkEligibilityDetailed(program, ctx))]
    : checkAllProgramsDetailed(programs, ctx).map(({ program: p, result }) =>
        formatResult(p, result),
      );

  return {
    repo: {
      description: ctx.description,
      isFork: ctx.isFork,
      isPrivate: ctx.isPrivate,
      license: ctx.license,
      name: ctx.name,
      owner: ctx.owner,
      path: ctx.path,
      provider: ctx.provider,
      pushedAt: ctx.pushedAt.toISOString(),
      repo: ctx.repo,
      stars: ctx.stars,
    },
    results,
  };
};

export const OPTIONS = () =>
  new Response(null, { headers: CORS_HEADERS, status: 204 });

export const GET = async (req: NextRequest) => {
  const params = validateParams(req.nextUrl.searchParams);
  if ("error" in params) {
    return params.error;
  }

  const rl = await applyRateLimit();
  const rlHeaders = rateLimitHeaders(rl);

  if (!rl.success) {
    return jsonResponse(
      {
        error: "Rate limit exceeded. Try again later.",
        errorCode: CheckApiErrorCode.RateLimit,
      },
      { headers: rlHeaders, status: 429 },
    );
  }

  const ref: RepoRef = {
    owner: params.owner,
    path: params.path,
    provider: params.provider,
    repo: params.repo,
  };
  const programSuffix = params.program ? `:${params.program.slug}` : "";
  const cacheKey = `${ref.provider}/${ref.path.toLowerCase()}${programSuffix}`;

  const cached = getCached(cacheKey);
  if (cached) {
    return jsonResponse(cached, {
      headers: { ...cacheHeaders(true), ...rlHeaders },
    });
  }

  try {
    const body = await fetchAndCheck(ref, params.program);
    setCache(cacheKey, body);
    return jsonResponse(body, {
      headers: { ...cacheHeaders(false), ...rlHeaders },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);

    if (/not found/i.test(message)) {
      return jsonResponse(
        { error: message, errorCode: CheckApiErrorCode.NotFound },
        { headers: rlHeaders, status: 404 },
      );
    }

    return jsonResponse(
      {
        error: `Upstream API error: ${message}`,
        errorCode: CheckApiErrorCode.Upstream,
      },
      { headers: rlHeaders, status: 502 },
    );
  }
};
