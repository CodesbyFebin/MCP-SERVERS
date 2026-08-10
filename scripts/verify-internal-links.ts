import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const ignored = new Set([".git", ".next", "dist", "build", "coverage", "node_modules", ".vercel"]);
const extensions = new Set([".ts", ".tsx", ".js", ".mjs", ".md", ".json"]);
const broken: Array<{ file: string; target: string }> = [];

const routeRoots = ["app", "content"];
const knownStatic = new Set<string>(["/"]);

function normalize(value: string): string {
  const clean = value.split(/[?#]/)[0] || "/";
  if (clean === "/") return "/";
  return `/${clean.replace(/^\/+|\/+$/g, "")}/`;
}

function addKnownRoute(route: string): void {
  knownStatic.add(normalize(route));
}

function walk(dir: string): void {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ignored.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
      continue;
    }
    if (!extensions.has(path.extname(entry.name).toLowerCase())) continue;

    const relative = path.relative(ROOT, full).replaceAll(path.sep, "/");
    const content = fs.readFileSync(full, "utf8");

    if (relative.startsWith("app/")) {
      const route = routeFromAppFile(relative);
      if (route) addKnownRoute(route);
    }
    if (relative.startsWith("content/pages/") && entry.name.endsWith(".md")) {
      // Candidate pages are intentionally not considered valid unless their
      // route has an explicit publication gate; the page route enforces this.
      continue;
    }

    const markdownLinks = [...content.matchAll(/\[[^\]]+\]\((\/[^)\s]+)(?:\s+[^)]*)?\)/g)].map((m) => m[1]);
    const jsxLinks = [...content.matchAll(/(?:href|to)=["'](\/[^"']+)["']/g)].map((m) => m[1]);
    for (const target of [...markdownLinks, ...jsxLinks]) {
      const normalized = normalize(target);
      if (normalized.includes("[") || normalized.includes("]") || normalized.includes("$")) continue;
      if (!knownStatic.has(normalized) && !looksLikeDynamicRoute(normalized)) {
        broken.push({ file: relative, target });
      }
    }
  }
}

function routeFromAppFile(relative: string): string | null {
  if (!relative.endsWith("page.tsx") && !relative.endsWith("page.ts") && !relative.endsWith("route.ts")) return null;
  const parts = relative.split("/");
  parts.pop();
  const routeParts: string[] = [];
  for (const part of parts) {
    if (part.startsWith("(") && part.endsWith(")")) continue;
    if (part.startsWith("[...") || part.startsWith("[[...")) return null;
    if (part.startsWith("[")) return null;
    routeParts.push(part);
  }
  return `/${routeParts.join("/")}/`.replace(/\/+/g, "/");
}

function looksLikeDynamicRoute(route: string): boolean {
  return ["/servers/", "/topics/", "/glossary/", "/compare/", "/clients/", "/integrations/", "/databases/", "/deployment/", "/security/", "/tools/", "/blog/", "/docs/", "/frameworks/", "/best/", "/pages/"].some((prefix) => route.startsWith(prefix));
}

for (const root of routeRoots) walk(path.join(ROOT, root));

const unique = new Map<string, string>();
for (const item of broken) unique.set(`${item.file}\0${item.target}`, item.file);

if (unique.size > 0) {
  console.error(`Internal-link audit found ${unique.size} unresolved static targets.`);
  for (const key of unique.keys()) {
    const [file, target] = key.split("\0");
    console.error(` - ${file}: ${target}`);
  }
  process.exit(1);
}

console.log("Internal-link audit passed: no unresolved static targets detected.");
