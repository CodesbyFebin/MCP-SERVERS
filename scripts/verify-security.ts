import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const ignoredDirectories = new Set([".git", ".next", "node_modules", "dist", "build", "coverage", ".vercel"]);
const textExtensions = new Set([".ts", ".tsx", ".js", ".mjs", ".cjs", ".json", ".md", ".txt", ".yml", ".yaml", ".env", ".sql", ".css", ".html"]);

const patterns: Array<{ name: string; regex: RegExp }> = [
  { name: "private key", regex: /-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----/ },
  { name: "JWT", regex: /\beyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\b/ },
  { name: "Google API key", regex: /\bAIza[0-9A-Za-z_-]{30,}\b/ },
  { name: "GitHub token", regex: /\b(?:ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{30,}\b/ },
  { name: "generic secret assignment", regex: /\b(?:api[_-]?key|secret[_-]?key|access[_-]?token|client[_-]?secret|private[_-]?key)\b\s*[:=]\s*["'][^"']{16,}["']/i },
];

const findings: string[] = [];

function walk(dir: string): void {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ignoredDirectories.has(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
      continue;
    }

    const ext = path.extname(entry.name).toLowerCase();
    if (!textExtensions.has(ext) && entry.name !== ".gitignore") continue;
    if (entry.name === "package-lock.json" || entry.name === "pnpm-lock.yaml" || entry.name === "yarn.lock") continue;

    const content = fs.readFileSync(fullPath, "utf8");
    for (const pattern of patterns) {
      if (pattern.regex.test(content)) {
        findings.push(`${path.relative(ROOT, fullPath)}: ${pattern.name}`);
      }
    }
  }
}

walk(ROOT);

if (findings.length > 0) {
  console.error("Security verification failed. Potential credentials or secret material were found:");
  for (const finding of findings) console.error(` - ${finding}`);
  process.exit(1);
}

console.log("Security verification passed: no known credential patterns found in tracked text assets.");
