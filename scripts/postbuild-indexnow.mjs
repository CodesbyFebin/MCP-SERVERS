#!/usr/bin/env node

if (!process.env.VERCEL && !process.env.CI) {
  console.log(
    "Skipping IndexNow submission (not a CI/Vercel build). Run `npm run submit-indexnow` to trigger manually."
  );
  process.exit(0);
}

await import("./submit-indexnow.mjs");
