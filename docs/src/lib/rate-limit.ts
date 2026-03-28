import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export const checkRateLimit = new Ratelimit({
  limiter: Ratelimit.slidingWindow(10, "60 s"),
  prefix: "ossperks:rl:check",
  redis,
});

export const checkDailyRateLimit = new Ratelimit({
  limiter: Ratelimit.slidingWindow(200, "86400 s"),
  prefix: "ossperks:rl:check:daily",
  redis,
});
