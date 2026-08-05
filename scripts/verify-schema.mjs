import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const audit = spawnSync("npx", ["tsx", "scripts/audit-schema.mjs"], {
  cwd: process.cwd(),
  stdio: "inherit",
});

if (audit.status !== 0) {
  process.exit(audit.status || 1);
}

const forbidden = [
  "AggregateRating",
  "aggregateRating",
  "reviewCount",
  "ratingValue",
  "bestRating",
  "worstRating",
];
const files = ["app", "src"].flatMap((dir) => {
  const output = spawnSync("find", [dir, "-type", "f", "(", "-name", "*.ts", "-o", "-name", "*.tsx", ")"], {
    cwd: process.cwd(),
    encoding: "utf8",
  });
  return output.stdout.trim().split("\n").filter(Boolean);
});

const errors = [];
for (const file of files) {
  const text = fs.readFileSync(path.join(process.cwd(), file), "utf8");
  for (const token of forbidden) {
    if (text.includes(token)) errors.push(`${file}: contains forbidden schema token ${token}`);
  }
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log("Structured data verification passed.");
