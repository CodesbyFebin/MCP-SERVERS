#!/usr/bin/env node

// Keep a single LLM-index generator. This wrapper exists for the historical
// `npm run generate:llms` command and delegates to the evidence-led generator
// used by prebuild, preventing the two outputs from drifting.
await import("./generate-llms-txt.mjs");
