/**
 * Slugs that end in a numeric suffix (e.g. mcp-auto-scaling-0) are
 * auto-generated variants that should not be indexed independently —
 * they will be redirected to a clean canonical slug.
 *
 * Exceptions: a small allowlist of slugs where the trailing number
 * is part of the official name, not a generation counter.
 */
const NUMERIC_SUFFIX_ALLOWLIST = new Set([
  "mcp-soc-2",     // SOC 2 — the 2 is the standard version number
  "mcp-iso-27001", // ISO 27001 — the number is part of the standard name
  "mcp-p95-latency", // p95 — the number is part of the metric name
  "mcp-p99-latency", // p99
  "mcp-p90-latency", // p90
]);

const GENERIC_GLOSSARY_SLUGS = new Set([
  "asr",
  "cve-management",
  "model-serving",
]);

export function isLowValueGlossarySlug(slug: string): boolean {
  if (NUMERIC_SUFFIX_ALLOWLIST.has(slug)) return false;
  return /-\d+$/.test(slug) || GENERIC_GLOSSARY_SLUGS.has(slug);
}

/**
 * True when a trailing number is an auto-generation counter
 * (e.g. mcp-auto-scaling-0) rather than part of an official name
 * (e.g. mcp-iso-27001, mcp-p95-latency).
 *
 * Exported so verification scripts assert against this single source of
 * truth instead of re-implementing the `/-\d+$/` rule and producing false
 * positives on allowlisted standard names.
 */
export function hasGenerationCounterSuffix(slug: string): boolean {
  if (NUMERIC_SUFFIX_ALLOWLIST.has(slug)) return false;
  return /-\d+$/.test(slug);
}

/**
 * Given a numeric-suffix slug, return the clean canonical slug it should
 * redirect to. Returns null when no redirect is needed (allowlisted).
 */
export function getCleanSlug(slug: string): string | null {
  if (NUMERIC_SUFFIX_ALLOWLIST.has(slug)) return null;
  if (!/-\d+$/.test(slug)) return null;
  return slug.replace(/-\d+$/, "");
}
