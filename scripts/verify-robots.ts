import robots from "../app/robots";

/**
 * robots.txt policy gate.
 *
 * Enforces three rules that have previously regressed in production:
 *
 *  1. No `Host:` directive. It is not a directive Google supports and it
 *     surfaces as an "unsupported directive" warning in Search Console.
 *     Host consolidation belongs in redirects + rel=canonical.
 *
 *  2. No permissive crawler group that silently escapes the private-route
 *     disallows. Google selects the single most-specific matching group and
 *     does NOT merge it with the wildcard group. A group such as
 *     `User-Agent: Googlebot / Allow: /` therefore grants Googlebot access to
 *     /admin/, /dashboard/, /api/ and friends, even though the wildcard group
 *     disallows them.
 *
 *  3. The sitemap reference is an absolute URL on the canonical https://www
 *     origin.
 */

const CANONICAL_ORIGIN = "https://www.mcpserver.in";

// Routes that must never be crawlable by any crawler that is otherwise allowed.
const REQUIRED_DISALLOW = [
  "/api/",
  "/drafts/",
  "/internal/",
  "/login/",
  "/register/",
  "/profile/",
  "/dashboard/",
  "/admin/",
  "/search/",
];

const errors: string[] = [];
const result = robots();

function toArray(value: string | string[] | undefined): string[] {
  if (value === undefined) return [];
  return Array.isArray(value) ? value : [value];
}

// ── Rule 1: no unsupported Host directive ────────────────────────────────────
if ("host" in result && (result as Record<string, unknown>).host) {
  errors.push(
    "robots.txt declares an unsupported `Host:` directive. Remove it; use redirects and rel=canonical for host consolidation.",
  );
}

// ── Rule 3: sitemap must be absolute and canonical ───────────────────────────
const sitemaps = toArray(result.sitemap as string | string[] | undefined);
if (sitemaps.length === 0) {
  errors.push("robots.txt declares no Sitemap directive.");
}
for (const sitemap of sitemaps) {
  if (!sitemap.startsWith(`${CANONICAL_ORIGIN}/`)) {
    errors.push(
      `Sitemap must be an absolute URL on ${CANONICAL_ORIGIN}: found "${sitemap}".`,
    );
  }
}

// ── Rule 2: every allowed group must inherit the private-route disallows ─────
const rules = Array.isArray(result.rules) ? result.rules : [result.rules];

let sawWildcard = false;

for (const rule of rules) {
  if (!rule) continue;

  const agents = toArray(rule.userAgent);
  const allow = toArray(rule.allow);
  const disallow = toArray(rule.disallow);
  const label = agents.join(", ") || "(unnamed group)";

  if (agents.includes("*")) sawWildcard = true;

  // A group that blocks the whole site needs no private-route rules.
  const blocksEverything = disallow.includes("/") && allow.length === 0;
  if (blocksEverything) continue;

  // Any group granting crawl access must carry the full disallow list,
  // because it will be used INSTEAD OF the wildcard group, not merged with it.
  if (allow.length > 0) {
    const missing = REQUIRED_DISALLOW.filter((path) => !disallow.includes(path));
    if (missing.length > 0) {
      errors.push(
        `Crawler group [${label}] grants access but does not repeat the private-route disallows: ${missing.join(", ")}. ` +
          "Google uses the most-specific group only and will not inherit the wildcard disallows. " +
          "Either delete this group so the crawler falls back to `*`, or repeat every disallow rule inside it.",
      );
    }
  }
}

if (!sawWildcard) {
  errors.push("robots.txt has no `User-agent: *` group.");
}

if (errors.length > 0) {
  console.error("robots.txt validation FAILED:\n");
  for (const error of errors) console.error(`  - ${error}`);
  process.exit(1);
}

console.log(
  `robots.txt validation passed (${rules.length} group(s), ${sitemaps.length} sitemap reference(s), no Host directive).`,
);
