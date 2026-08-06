import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const root = process.cwd();
const reportsDir = path.join(root, "reports");
fs.mkdirSync(reportsDir, { recursive: true });

function exists(file) {
  return fs.existsSync(path.join(root, file));
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(path.join(root, file), "utf8"));
}

function findLockfiles() {
  const output = execFileSync(
    "find",
    [
      ".",
      "-maxdepth",
      "3",
      "(",
      "-name",
      "package-lock.json",
      "-o",
      "-name",
      "pnpm-lock.yaml",
      "-o",
      "-name",
      "yarn.lock",
      "-o",
      "-name",
      "bun.lockb",
      ")",
      "-not",
      "-path",
      "./node_modules/*",
      "-not",
      "-path",
      "./.next/*",
      "-print",
    ],
    { cwd: root, encoding: "utf8" },
  );
  const local = output.trim().split("\n").filter(Boolean);
  const parent = fs.existsSync(path.join(root, "..", "..", "package-lock.json"))
    ? [path.resolve(root, "..", "..", "package-lock.json")]
    : [];
  return [...local, ...parent];
}

const pkg = readJson("package.json");
const vercel = exists("vercel.json") ? readJson("vercel.json") : {};
const nextConfig = fs.readFileSync(path.join(root, "next.config.js"), "utf8");
const proxyExists = exists("proxy.ts");
const middlewareExists = exists("middleware.ts");
const srcProxyExists = exists("src/proxy.ts");
const lockfiles = findLockfiles();

const audit = {
  generatedAt: new Date().toISOString(),
  repositoryRoot: root,
  framework: {
    name: "Next.js",
    version: pkg.dependencies?.next || pkg.devDependencies?.next || null,
    appRouter: exists("app"),
  },
  packageManager: {
    decision: "npm",
    authoritativeLockfile: "package-lock.json",
    installCommand: "npm ci",
    localCommand: "npm run dev",
    lockfilesFound: lockfiles,
    nestedLockfilesIntentional: false,
  },
  workspace: {
    root,
    nextConfigPinsRoot: nextConfig.includes("outputFileTracingRoot") && nextConfig.includes("turbopack"),
    vercelRootDirectory: vercel.rootDirectory || ".",
  },
  routing: {
    middlewareTsExists: middlewareExists,
    rootProxyTsExists: proxyExists,
    srcProxyTsExists: srcProxyExists,
    redirectSources: {
      proxy: proxyExists ? ["host normalization", "protocol normalization", "slash normalization", "query cleanup", "legacy intent consolidation"] : [],
      nextConfig: nextConfig.includes("async redirects") ? ["none currently returned; hook retained for future deterministic mappings"] : [],
      vercelJson: Array.isArray(vercel.redirects) ? vercel.redirects.map((r) => r.source) : [],
    },
    rewriteSources: {
      nextConfig: nextConfig.includes("async rewrites"),
    },
    canonicalSources: ["proxy.ts", "app/sitemap.ts", "app/robots.ts", "page metadata"],
  },
  risks: [
    ...(middlewareExists ? ["Deprecated middleware.ts still exists."] : []),
    ...(srcProxyExists ? ["src/proxy.ts can confuse proxy ownership."] : []),
    ...(lockfiles.some((f) => f.includes(".kilo") || f.includes(".kilocode")) ? ["Local tool lockfiles exist under .kilo/.kilocode."] : []),
    ...(fs.existsSync(path.join(root, "..", "..", "package-lock.json")) ? ["Parent home-directory package-lock.json exists; Next root must be pinned."] : []),
  ],
  filesRequiringModification: [
    "proxy.ts",
    "next.config.js",
    "vercel.json",
    "package.json",
    "docs/adr/lockfile-and-package-manager.md",
  ],
};

fs.writeFileSync(path.join(reportsDir, "framework-audit.json"), `${JSON.stringify(audit, null, 2)}\n`);

const md = `# Framework Audit

Generated: ${audit.generatedAt}

## Framework

- Framework: ${audit.framework.name}
- Version: ${audit.framework.version}
- App Router: ${audit.framework.appRouter ? "yes" : "no"}

## Package Manager

- Decision: npm
- Authoritative lockfile: package-lock.json
- Install command: npm ci
- Lockfiles found:
${lockfiles.map((file) => `  - ${file}`).join("\n")}

## Routing Ownership

- Root proxy.ts exists: ${proxyExists}
- Deprecated middleware.ts exists: ${middlewareExists}
- src/proxy.ts exists: ${srcProxyExists}
- Proxy owns host/protocol/slash/query canonicalization and composite legacy intent consolidation.
- next.config.js owns rewrites and currently returns no duplicate permanent redirects.
- vercel.json owns deterministic historical blog/glossary redirects only.

## Risks

${audit.risks.length ? audit.risks.map((risk) => `- ${risk}`).join("\n") : "- No active framework ownership risks detected."}

## Files Requiring Modification

${audit.filesRequiringModification.map((file) => `- ${file}`).join("\n")}
`;

fs.writeFileSync(path.join(reportsDir, "framework-audit.md"), md);
console.log("Wrote reports/framework-audit.json and reports/framework-audit.md");
