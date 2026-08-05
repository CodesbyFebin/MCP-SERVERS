import fs from "node:fs";
import { spawnSync } from "node:child_process";

const files = spawnSync("find", ["app", "src", "scripts", "-type", "f", "(", "-name", "*.ts", "-o", "-name", "*.tsx", "-o", "-name", "*.mjs", ")"], {
  cwd: process.cwd(),
  encoding: "utf8",
});

const errors = [];
for (const file of files.stdout.trim().split("\n").filter(Boolean)) {
  const text = fs.readFileSync(file, "utf8");
  if (text.includes("\r\n")) errors.push(`${file}: CRLF line endings`);
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log("Format check passed.");
