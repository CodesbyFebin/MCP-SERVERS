// In-memory rate limiter, keyed by an arbitrary string (e.g. a hashed IP).
// This is per-serverless-instance, not a global/distributed limiter - Vercel
// can route requests to different instances, so a determined abuser spread
// across instances could exceed this. It's a real, useful first line of
// defense against casual spam/bots, not a guarantee. For strict global
// limits, swap the Map below for a shared store (e.g. Upstash Redis).

const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS = 5;

const store = new Map<string, { count: number; resetAt: number }>();

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
}

export function checkRateLimit(key: string): RateLimitResult {
  const now = Date.now();
  const record = store.get(key);

  if (!record || now > record.resetAt) {
    const resetAt = now + WINDOW_MS;
    store.set(key, { count: 1, resetAt });
    return { allowed: true, remaining: MAX_REQUESTS - 1, resetAt };
  }

  if (record.count >= MAX_REQUESTS) {
    return { allowed: false, remaining: 0, resetAt: record.resetAt };
  }

  record.count += 1;
  return { allowed: true, remaining: MAX_REQUESTS - record.count, resetAt: record.resetAt };
}

// Prevents unbounded growth over a long-lived instance's lifetime.
setInterval(() => {
  const now = Date.now();
  for (const [key, record] of store.entries()) {
    if (now > record.resetAt) {
      store.delete(key);
    }
  }
}, WINDOW_MS * 2).unref?.();
