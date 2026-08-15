import sitemap from "../app/sitemap";
import { SITE_ORIGIN } from "../src/lib/canonical-urls";

const EXPECTED_ORIGIN = SITE_ORIGIN.replace(/\/$/, "");
const FORBIDDEN_PREFIXES = [
  "/admin/",
  "/api/",
  "/login/",
  "/register/",
  "/search/",
  "/candidate/",
  "/generated/",
  "/mcp-server-directory/",
];
const LEGACY_PATHS = new Set([
  "/mcp-server-directory/",
  "/mcp-hosting/",
  "/mcp-tutorial/",
  "/blog/how-to-build-mcp-server-from-scratch/",
  "/complete-mcp-guide/",
  "/build-an-mcp-server/",
  "/host-mcp-server/",
]);

const entries = sitemap();
const errors: string[] = [];
const seen = new Set<string>();

for (const entry of entries) {
  const url = new URL(entry.url);
  const normalizedPath = url.pathname === "/" ? "/" : `${url.pathname.replace(/\/{2,}/g, "/").replace(/\/$/, "")}/`;
  const normalized = `${EXPECTED_ORIGIN}${normalizedPath}`;

  if (url.origin !== EXPECTED_ORIGIN) errors.push(`Non-canonical origin: ${entry.url}`);
  if (entry.url !== normalized) errors.push(`Non-canonical URL shape: ${entry.url}`);
  if (seen.has(normalized)) errors.push(`Duplicate URL: ${normalized}`);
  if (LEGACY_PATHS.has(normalizedPath)) errors.push(`Legacy redirect URL in sitemap: ${normalized}`);
  if (FORBIDDEN_PREFIXES.some((prefix) => normalizedPath.startsWith(prefix))) {
    errors.push(`Non-indexable route in sitemap: ${normalized}`);
  }

  seen.add(normalized);
}

if (entries.length === 0) errors.push("Sitemap is empty.");
if (!entries.some((entry) => entry.url === `${EXPECTED_ORIGIN}/`)) errors.push("Homepage is missing from sitemap.");
if (!entries.some((entry) => entry.url === `${EXPECTED_ORIGIN}/servers/`)) errors.push("Canonical server registry is missing from sitemap.");

if (errors.length) {
  console.error(`Sitemap quality gate failed with ${errors.length} error(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Sitemap quality gate passed: ${entries.length} unique canonical URLs.`);
