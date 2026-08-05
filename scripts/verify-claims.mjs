import fs from "node:fs";
import path from "node:path";

// Claim integrity gate.
//
// This scanner is intentionally implemented in pure Node with no external
// binary dependency. It previously shelled out to `rg` (ripgrep), which made
// the gate crash with spawnSync ENOENT on any machine or CI runner that did
// not happen to have ripgrep installed. A compliance gate that throws an
// infrastructure error is indistinguishable from a gate that found a real
// violation, and it invites someone to "fix" it with `|| true`. It must run
// deterministically everywhere.

const root = process.cwd();
const reportsDir = path.join(root, "reports");
fs.mkdirSync(reportsDir, { recursive: true });

const SCAN_DIRS = ["app", "src", "content", "public", "docs"];

// Directories that never contain publishable claims.
const SKIP_DIRS = new Set([
  "node_modules",
  ".git",
  ".next",
  "dist",
  "build",
  "coverage",
]);

// Only scan human-readable, publishable text.
const SCAN_EXTENSIONS = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".mjs",
  ".cjs",
  ".md",
  ".mdx",
  ".json",
  ".txt",
  ".html",
  ".yml",
  ".yaml",
]);

const MAX_FILE_BYTES = 8 * 1024 * 1024;

// Unsupported / high-risk claims. These assert compliance, certification,
// uptime, or latency guarantees that require primary evidence to publish.
const patterns = [
  "DPDP compliant",
  "RBI compliant",
  "all data stored in India",
  "data residency guaranteed",
  "SOC 2 certified",
  "ISO certified",
  "99.99% uptime",
  "99.99%",
  "sub-15ms",
  "sub-50ms",
  "quarterly vendor review",
  "phishing-resistant",
  "automatic breach notification",
  "automated breach notification",
];

const claimRegex = new RegExp(
  patterns.map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|"),
  "i",
);

// A match is acceptable when it is not asserting a current capability:
// either it is keyword/research metadata, or it is explicitly negated or
// qualified in the surrounding sentence.
const KEYWORD_CONTEXT = /targetKeywords|keyword|research|question/i;
const NEGATIVE_CONTEXT = /not automatically|No\. Compliance|depends on|not a blanket/i;

function* walk(dir) {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      yield* walk(full);
    } else if (entry.isFile()) {
      if (entry.name.endsWith(".map")) continue;
      if (!SCAN_EXTENSIONS.has(path.extname(entry.name))) continue;
      yield full;
    }
  }
}

const matches = [];
let filesScanned = 0;

for (const dir of SCAN_DIRS) {
  const abs = path.join(root, dir);
  if (!fs.existsSync(abs)) continue;

  for (const file of walk(abs)) {
    let stat;
    try {
      stat = fs.statSync(file);
    } catch {
      continue;
    }
    if (stat.size > MAX_FILE_BYTES) continue;

    let content;
    try {
      content = fs.readFileSync(file, "utf8");
    } catch {
      continue;
    }
    filesScanned += 1;

    // Cheap pre-filter before doing per-line work.
    if (!claimRegex.test(content)) continue;

    const lines = content.split("\n");
    for (let i = 0; i < lines.length; i += 1) {
      const text = lines[i];
      if (!claimRegex.test(text)) continue;

      const trimmed = text.trim();
      const keywordContext = KEYWORD_CONTEXT.test(trimmed);
      const negativeContext = NEGATIVE_CONTEXT.test(trimmed);
      const status = keywordContext || negativeContext ? "QUALIFIED" : "REMOVED_REQUIRED";

      matches.push({
        file: path.relative(root, file),
        line: i + 1,
        text: trimmed.slice(0, 500),
        status,
        source: keywordContext
          ? "keyword/research context"
          : negativeContext
            ? "negative/qualification context"
            : null,
        scope: keywordContext || negativeContext ? "non-current-capability claim" : null,
        verificationDate: new Date().toISOString().slice(0, 10),
        owner: "MCPserver.in Engineering",
      });
    }
  }
}

const failures = matches.filter((match) => match.status === "REMOVED_REQUIRED");

fs.writeFileSync(
  path.join(reportsDir, "claim-integrity.json"),
  `${JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      scanner: "node-native",
      filesScanned,
      totalMatches: matches.length,
      qualified: matches.length - failures.length,
      failures: failures.length,
      matches,
    },
    null,
    2,
  )}\n`,
);

if (failures.length > 0) {
  for (const failure of failures) {
    console.error(`Unsupported claim: ${failure.file}:${failure.line} ${failure.text}`);
  }
  console.error(`\nClaim integrity FAILED: ${failures.length} unsupported claim(s).`);
  process.exit(1);
}

console.log(
  `Claim integrity verification passed (${filesScanned} files scanned, ${matches.length} qualified references).`,
);
