import { NextResponse } from "next/server";
import {
  getEvidenceLedgerStats,
  getEvidenceSources,
  getPublishedServerProfiles,
} from "../../src/data/publishing";
import { SITE_ORIGIN } from "../../src/lib/canonical-urls";

export const dynamic = "force-static";

export async function GET() {
  const stats = getEvidenceLedgerStats();
  const profiles = getPublishedServerProfiles();

  const profileSections = profiles.map((profile) => {
    const sources = getEvidenceSources(profile.evidence).filter((source) => source.url.startsWith("http"));
    const evidence = profile.evidence
      .filter((item) => item.status === "verified")
      .map((item) => {
        const source = sources.find((candidate) => candidate.id === item.sourceId);
        return `  - ${item.id}: ${item.text}\n    Supports: ${item.supports.join(", ") || "unspecified"}\n    Source: ${source?.url ?? "source unavailable"}\n    Checked: ${item.capturedAt}`;
      })
      .join("\n");

    const claims = profile.claims
      .map((claim) => `  - ${claim.text} [evidence: ${claim.evidenceIds.join(", ")}]`)
      .join("\n");

    return `## ${profile.server.name} MCP Server
- Canonical URL: ${SITE_ORIGIN}/servers/${profile.server.slug}/
- Category: ${profile.server.category}
- Publication status: ${profile.status}
- Verification state: ${profile.verificationState}
- Repository: ${profile.repositoryUrl ?? "Unknown"}
- Documentation: ${profile.documentationUrl ?? "Unknown"}
- Latest verified version: ${profile.latestVerifiedVersion ?? "Unknown"}
- Last reviewed: ${profile.provenance.lastReviewed ?? "Unknown"}
- Capabilities with record-level support: ${profile.capabilities.length ? profile.capabilities.join(", ") : "Unknown / not asserted"}

### Verified claims
${claims || "  - No claims published."}

### Evidence
${evidence || "  - No evidence published."}`;
  });

  const content = `# MCPserver.in — Full Evidence-Ledger Index

This document is a machine-readable editorial index of MCPserver.in's publication-qualified server corpus. It intentionally excludes server inventory that has not passed the shared evidence and verification gate.

## Site identity
- Canonical origin: ${SITE_ORIGIN}
- Server registry: ${SITE_ORIGIN}/servers/
- Editorial policy: ${SITE_ORIGIN}/editorial-policy/
- Machine registry: ${SITE_ORIGIN}/mcp-registry.json
- Published server JSON: ${SITE_ORIGIN}/api/servers.json
- Sitemap: ${SITE_ORIGIN}/sitemap.xml

## Evidence Ledger summary
- Known entities: ${stats.totalEntities}
- Evidence-reviewed public profiles: ${stats.publishedProfiles}
- Awaiting evidence: ${stats.needsEvidence}
- Synthetic profiles published: ${stats.syntheticProfilesPublished}

## Publication semantics
A public server profile must satisfy the centralized publication predicate. Evidence entries identify the claims or fields they support; an official source for identity does not automatically verify authentication, transport, compatibility, security, performance, or version data.

${profileSections.join("\n\n---\n\n") || "## Published server profiles\nNo server profiles currently meet the publication gate."}

## Other canonical public surfaces
- Integrations: ${SITE_ORIGIN}/integrations/
- Clients: ${SITE_ORIGIN}/clients/
- Documentation: ${SITE_ORIGIN}/docs/
- Learn: ${SITE_ORIGIN}/learn/
- Glossary: ${SITE_ORIGIN}/glossary/
- State of MCP: ${SITE_ORIGIN}/state-of-mcp/
- Security: ${SITE_ORIGIN}/security/
- Privacy: ${SITE_ORIGIN}/privacy/
- Terms: ${SITE_ORIGIN}/terms/
`;

  return new NextResponse(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=1800",
    },
  });
}
