#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  getEvidenceLedgerStats,
  getEvidenceSources,
  getPublishedServerProfiles,
} from "../src/data/publishing.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.join(__dirname, "..", "public");
const BASE_URL = "https://www.mcpserver.in";

function serverLines() {
  return getPublishedServerProfiles().map((profile) => {
    const source = getEvidenceSources(profile.evidence).find((item) => item.url.startsWith("http"));
    const sourceLabel = source ? ` Primary source: ${source.url}` : "";
    return `- [${profile.server.name} MCP Server](${BASE_URL}/servers/${profile.server.slug}/): ${profile.server.description}${sourceLabel}`;
  });
}

function buildShort() {
  const stats = getEvidenceLedgerStats();
  const servers = serverLines();
  return `# MCPserver.in — Evidence-backed MCP discovery\n\nMCPserver.in separates tracked inventory from publication-qualified server profiles. Public server profiles require server-specific evidence and review; unknown fields remain unknown.\n\n## Evidence Ledger\n- Known entities tracked: ${stats.totalEntities}\n- Evidence-reviewed profiles published: ${stats.publishedProfiles}\n- Awaiting evidence: ${stats.needsEvidence}\n- Synthetic profiles published: ${stats.syntheticProfilesPublished}\n\n## Published MCP Server Profiles\n${servers.join("\n")}\n\n## Core Resources\n- [MCP Server Registry](${BASE_URL}/servers/)\n- [Integrations](${BASE_URL}/integrations/)\n- [Clients](${BASE_URL}/clients/)\n- [Documentation](${BASE_URL}/docs/)\n- [Learn MCP](${BASE_URL}/learn/)\n- [State of MCP](${BASE_URL}/state-of-mcp/)\n- [Editorial Policy](${BASE_URL}/editorial-policy/)\n- [Security](${BASE_URL}/security/)\n\n## Machine-readable\n- [Public server feed](${BASE_URL}/api/servers.json)\n- [Evidence-led registry](${BASE_URL}/mcp-registry.json)\n- [Sitemap](${BASE_URL}/sitemap.xml)\n- [Expanded LLM index](${BASE_URL}/llms-full.txt)\n`;
}

function buildFull() {
  const stats = getEvidenceLedgerStats();
  const profiles = getPublishedServerProfiles();
  const blocks = profiles.map((profile) => {
    const sources = getEvidenceSources(profile.evidence).filter((item) => item.url.startsWith("http"));
    return `### ${profile.server.name}\nCanonical: ${BASE_URL}/servers/${profile.server.slug}/\nCategory: ${profile.server.category}\nVerification: ${profile.verificationState}\nLast reviewed: ${profile.provenance.lastReviewed || "unknown"}\nDescription: ${profile.server.description}\nAuthentication: ${profile.server.auth || "unknown"}\nCapabilities: ${profile.capabilities.length ? profile.capabilities.join(", ") : "unknown"}\nSources:\n${sources.map((source) => `- ${source.title}: ${source.url}`).join("\n") || "- none"}`;
  });

  return `${buildShort()}\n## Publication Methodology\nA tracked entity is not automatically public. The current server publication policy requires a published status, a verified review state, and at least one verified evidence passage. Pending profiles are excluded from this LLM index, the public JSON server feeds, and server-page sitemap entries.\n\nInventory-only descriptions, authentication assumptions, generated install commands, performance claims, security claims, and version guesses are not treated as evidence.\n\n## Published Profile Details\n${blocks.join("\n\n")}\n\n## Data Notes\n- Counts above are generated from the production dataset at build time.\n- A missing value is reported as unknown rather than inferred.\n- Illustrative research or planning data is not treated as production telemetry.\n`;
}

function main() {
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  const short = buildShort();
  const full = buildFull();
  fs.writeFileSync(path.join(PUBLIC_DIR, "llms.txt"), short, "utf-8");
  fs.writeFileSync(path.join(PUBLIC_DIR, "llms-full.txt"), full, "utf-8");
  const stats = getEvidenceLedgerStats();
  console.log(`Generated llms.txt and llms-full.txt: ${stats.publishedProfiles}/${stats.totalEntities} server profiles publication-qualified.`);
}

main();
