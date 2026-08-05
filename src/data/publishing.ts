import { categories } from "./categories";
import { servers, type ServerIntegration } from "./servers";

export type PublicationStatus =
  | "candidate"
  | "draft"
  | "needs-evidence"
  | "needs-translation-review"
  | "editorial-review"
  | "rejected"
  | "archived"
  | "published";

export type VerificationState =
  | "seeded"
  | "evidence-backed"
  | "verified"
  | "unverified";

export interface SourceRecord {
  id: string;
  title: string;
  sourceType: "primary-documentation" | "internal-editorial-record" | "repository" | "vendor-documentation";
  url: string;
  publisher: string;
  capturedAt: string;
  freshnessDays: number;
  credibility: "primary" | "editorial-seed" | "vendor" | "community";
}

export interface EvidencePassage {
  id: string;
  sourceId: string;
  text: string;
  supports: string[];
  capturedAt: string;
  expiresAt?: string;
}

export interface ClaimRecord {
  id: string;
  subjectId: string;
  text: string;
  evidenceIds: string[];
  claimType: "directory-field" | "protocol-context" | "security-note" | "relationship";
  expiresAt?: string;
}

export interface RelationshipRecord {
  id: string;
  fromEntityId: string;
  toEntityId: string;
  relationshipType: "belongs_to_category" | "related_to_server";
  evidenceIds: string[];
}

export interface PageContract {
  id: string;
  route: string;
  canonical: string;
  pageType: "server-detail" | "category" | "candidate";
  status: PublicationStatus;
  requiredSections: string[];
  requiredSchemaTypes: string[];
  minEvidencePassages: number;
  minClaims: number;
  contentHash: string;
}

export interface QualityScore {
  total: number;
  components: {
    entityCompleteness: number;
    evidenceSufficiency: number;
    searchIntent: number;
    internalLinks: number;
    schemaReadiness: number;
    editorialSafety: number;
    freshness: number;
  };
  passed: boolean;
  threshold: number;
  notes: string[];
}

export interface ServerPublicationProfile {
  entityId: string;
  server: ServerIntegration;
  status: PublicationStatus;
  verificationState: VerificationState;
  contract: PageContract;
  quality: QualityScore;
  claims: ClaimRecord[];
  evidence: EvidencePassage[];
  relationships: RelationshipRecord[];
}

export interface RouteInventoryRecord {
  route: string;
  contentType: string;
  status: PublicationStatus;
  canonical: string;
  indexability: "indexable" | "not-indexable";
  sitemap: string | null;
  title: string;
  primaryIntentId: string;
  qualityScore: number;
  contentHash: string;
  evidenceCount: number;
  claimCount: number;
  updatedAt: string;
}

const baseUrl = "https://www.mcpserver.in";
const publicationDate = "2026-07-29";
const serverQualityThreshold = 80;

export const sourceRegistry: SourceRecord[] = [
  {
    id: "source:mcpserver-seed-registry",
    title: "MCPServer.in curated seed registry",
    sourceType: "internal-editorial-record",
    url: "internal:mcpserver-seed-registry",
    publisher: "MCPServer.in Editorial",
    capturedAt: publicationDate,
    freshnessDays: 365,
    credibility: "editorial-seed",
  },
  {
    id: "source:model-context-protocol-docs",
    title: "Model Context Protocol documentation",
    sourceType: "primary-documentation",
    url: "https://modelcontextprotocol.io",
    publisher: "Model Context Protocol",
    capturedAt: publicationDate,
    freshnessDays: 90,
    credibility: "primary",
  },
];

export const routeCandidateBacklog: PageContract[] = [
  buildCandidateContract("/tutorials/{slug}", "Tutorial route candidates"),
  buildCandidateContract("/database/{type}/{slug}", "Protocol database candidates"),
  buildCandidateContract("/marketplace/{type}/{slug}", "Marketplace candidates"),
  buildCandidateContract("/guides/{category}/{slug}", "Enterprise guide candidates"),
  buildCandidateContract("/security/{category}/{slug}", "Security guide candidates"),
  buildCandidateContract("/technology/{category}/{slug}", "Technology reference candidates"),
  buildCandidateContract("/knowledge/{type}/{slug}", "Knowledge hub candidates"),
  buildCandidateContract("/best/{category}", "Collection candidates"),
];

export function transitionVerificationState(
  current: VerificationState,
  evidenceCount: number,
  claimsCount: number,
  qualityPassed: boolean
): VerificationState {
  if (current === "seeded" && evidenceCount >= 2 && claimsCount >= 3) {
    return "evidence-backed";
  }
  if (current === "evidence-backed" && qualityPassed) {
    return "verified";
  }
  if ((current === "evidence-backed" || current === "verified") && (evidenceCount === 0 || claimsCount === 0)) {
    return "unverified";
  }
  return current;
}

export const publishedServers = servers.filter((server) => {
  const profile = getServerPublicationProfile(server.slug);
  return profile?.status === "published" && profile.quality.passed;
});

export function getServerPublicationProfile(slug: string): ServerPublicationProfile | null {
  const server = servers.find((item) => item.slug === slug);
  if (!server) return null;

  const entityId = `server:${server.slug}`;
  const evidence = buildServerEvidence(server);
  const claims = buildServerClaims(server, entityId, evidence);
  const relationships = buildServerRelationships(server, entityId, evidence);
  const quality = scoreServerProfile(server, evidence, claims, relationships);
  const status: PublicationStatus = quality.passed ? "published" : "needs-evidence";
  const contract = buildServerPageContract(server, status, evidence, claims);
  const verificationState = transitionVerificationState(
    "seeded",
    evidence.length,
    claims.length,
    quality.passed
  );

  return {
    entityId,
    server,
    status,
    verificationState,
    contract,
    quality,
    claims,
    evidence,
    relationships,
  };
}

export function getPublishedServerProfiles() {
  return servers
    .map((server) => getServerPublicationProfile(server.slug))
    .filter((profile): profile is ServerPublicationProfile => Boolean(profile && profile.status === "published" && profile.quality.passed));
}

export function getPublishedCategorySlugs() {
  const actualCategorySlugs = new Set(publishedServers.map((server) => getCategorySlugForServer(server)).filter(Boolean));
  return categories
    .filter((category) => actualCategorySlugs.has(category.slug))
    .map((category) => category.slug);
}

export function getCategorySlugForServer(server: ServerIntegration) {
  const direct = categories.find((item) => item.name.toLowerCase() === server.category.toLowerCase());
  if (direct) return direct.slug;

  const aliases: Record<string, string> = {
    "AI Models": "ai-ml",
    Observability: "monitoring",
    Cloud: "cloud",
  };

  return aliases[server.category] || null;
}

export function getEvidenceSources(evidence: EvidencePassage[]) {
  const sourceIds = new Set(evidence.map((item) => item.sourceId));
  return sourceRegistry.filter((source) => sourceIds.has(source.id));
}

export function buildPublishedRouteInventory(extraRoutes: Omit<RouteInventoryRecord, "status" | "indexability">[]): RouteInventoryRecord[] {
  const serverRoutes = getPublishedServerProfiles().map((profile) => ({
    route: profile.contract.route,
    contentType: "server",
    status: profile.status,
    canonical: profile.contract.canonical,
    indexability: "indexable" as const,
    sitemap: "sitemap-integrations.xml",
    title: `${profile.server.name} MCP Server`,
    primaryIntentId: "server-detail",
    qualityScore: profile.quality.total,
    contentHash: profile.contract.contentHash,
    evidenceCount: profile.evidence.length,
    claimCount: profile.claims.length,
    updatedAt: publicationDate,
  }));

  return [
    ...extraRoutes.map((route) => ({
      ...route,
      status: "published" as const,
      indexability: "indexable" as const,
    })),
    ...serverRoutes,
  ];
}

export function validatePublishingGraph() {
  const errors: string[] = [];
  const warnings: string[] = [];
  const sourceIds = new Set(sourceRegistry.map((source) => source.id));
  const serverEntityIds = new Set(servers.map((server) => `server:${server.slug}`));
  const categoryEntityIds = new Set(categories.map((category) => `category:${category.slug}`));

  getPublishedServerProfiles().forEach((profile) => {
    if (!profile.quality.passed) {
      errors.push(`${profile.server.slug} is published but failed quality gates.`);
    }

    profile.evidence.forEach((evidence) => {
      if (!sourceIds.has(evidence.sourceId)) {
        errors.push(`${profile.server.slug} references missing source ${evidence.sourceId}.`);
      }
    });

    profile.claims.forEach((claim) => {
      if (claim.evidenceIds.length === 0) {
        errors.push(`${claim.id} has no evidence.`);
      }
      claim.evidenceIds.forEach((evidenceId) => {
        if (!profile.evidence.some((evidence) => evidence.id === evidenceId)) {
          errors.push(`${claim.id} references missing evidence ${evidenceId}.`);
        }
      });
    });

    profile.relationships.forEach((relationship) => {
      const validTo =
        categoryEntityIds.has(relationship.toEntityId) ||
        serverEntityIds.has(relationship.toEntityId);
      if (!serverEntityIds.has(relationship.fromEntityId) || !validTo) {
        errors.push(`${relationship.id} points at an unknown entity.`);
      }
    });
  });

  if (routeCandidateBacklog.some((contract) => contract.status === "published")) {
    errors.push("Candidate route backlog contains a published contract.");
  }

  if (warnings.length === 0 && getPublishedServerProfiles().length < 25) {
    warnings.push("The MVP seed has fewer than 25 published server profiles.");
  }

  return {
    ok: errors.length === 0,
    errors,
    warnings,
    publishedServerCount: getPublishedServerProfiles().length,
    candidateRouteCount: routeCandidateBacklog.length,
  };
}

function buildServerEvidence(server: ServerIntegration): EvidencePassage[] {
  return [
    {
      id: `evidence:server:${server.slug}:seed-record`,
      sourceId: "source:mcpserver-seed-registry",
      text: `${server.name} has a curated MCPServer.in seed record with category "${server.category}", authentication model "${server.auth}", use cases, related servers, and feature notes.`,
      supports: [`claim:server:${server.slug}:directory-record`, `claim:server:${server.slug}:auth-model`],
      capturedAt: publicationDate,
      expiresAt: "2027-07-29",
    },
    {
      id: `evidence:server:${server.slug}:protocol-context`,
      sourceId: "source:model-context-protocol-docs",
      text: "The Model Context Protocol documentation defines the protocol context for exposing tools, resources, prompts, and capabilities to MCP clients.",
      supports: [`claim:server:${server.slug}:protocol-context`],
      capturedAt: publicationDate,
      expiresAt: "2026-10-27",
    },
  ];
}

function buildServerClaims(server: ServerIntegration, subjectId: string, evidence: EvidencePassage[]): ClaimRecord[] {
  const [seedEvidence, protocolEvidence] = evidence;

  return [
    {
      id: `claim:server:${server.slug}:directory-record`,
      subjectId,
      text: `${server.name} is listed as a ${server.category} MCP server profile in the MCPServer.in seed registry.`,
      evidenceIds: [seedEvidence.id],
      claimType: "directory-field",
      expiresAt: "2027-07-29",
    },
    {
      id: `claim:server:${server.slug}:auth-model`,
      subjectId,
      text: `${server.name} requires the credential model recorded as: ${server.auth}.`,
      evidenceIds: [seedEvidence.id],
      claimType: "security-note",
      expiresAt: "2027-07-29",
    },
    {
      id: `claim:server:${server.slug}:protocol-context`,
      subjectId,
      text: `${server.name} is described in the context of MCP tools, resources, prompts, and client capabilities.`,
      evidenceIds: [protocolEvidence.id],
      claimType: "protocol-context",
      expiresAt: "2026-10-27",
    },
  ];
}

function buildServerRelationships(server: ServerIntegration, entityId: string, evidence: EvidencePassage[]): RelationshipRecord[] {
  const categorySlug = getCategorySlugForServer(server);
  const category = categories.find((item) => item.slug === categorySlug);
  const seedEvidenceId = evidence[0].id;
  const relationships: RelationshipRecord[] = [];

  if (category) {
    relationships.push({
      id: `relationship:${server.slug}:category:${category.slug}`,
      fromEntityId: entityId,
      toEntityId: `category:${category.slug}`,
      relationshipType: "belongs_to_category",
      evidenceIds: [seedEvidenceId],
    });
  }

  server.related
    .filter((relatedSlug) => servers.some((item) => item.slug === relatedSlug))
    .slice(0, 4)
    .forEach((relatedSlug) => {
      relationships.push({
        id: `relationship:${server.slug}:related:${relatedSlug}`,
        fromEntityId: entityId,
        toEntityId: `server:${relatedSlug}`,
        relationshipType: "related_to_server",
        evidenceIds: [seedEvidenceId],
      });
    });

  return relationships;
}

function buildServerPageContract(
  server: ServerIntegration,
  status: PublicationStatus,
  evidence: EvidencePassage[],
  claims: ClaimRecord[],
): PageContract {
  const route = `/servers/${server.slug}/`;
  return {
    id: `contract:server:${server.slug}`,
    route,
    canonical: `${baseUrl}${route}`,
    pageType: "server-detail",
    status,
    requiredSections: [
      "summary",
      "evidence-state",
      "claims",
      "setup-overview",
      "security-considerations",
      "related-connectors",
    ],
    requiredSchemaTypes: ["WebPage", "SoftwareApplication", "BreadcrumbList"],
    minEvidencePassages: 2,
    minClaims: 3,
    contentHash: stableHash([
      server.name,
      server.slug,
      server.category,
      server.description,
      server.auth,
      server.useCases.join("|"),
      server.features.join("|"),
      evidence.map((item) => item.id).join("|"),
      claims.map((item) => item.id).join("|"),
    ].join("::")),
  };
}

function scoreServerProfile(
  server: ServerIntegration,
  evidence: EvidencePassage[],
  claims: ClaimRecord[],
  relationships: RelationshipRecord[],
): QualityScore {
  const components = {
    entityCompleteness: scoreCompleteness([
      server.name,
      server.slug,
      server.category,
      server.description,
      server.auth,
      server.useCases.length >= 3 ? "use-cases" : "",
      server.features.length >= 3 ? "features" : "",
    ]),
    evidenceSufficiency: Math.min(100, evidence.length * 40 + claims.length * 10),
    searchIntent: server.description.length >= 90 ? 90 : 70,
    internalLinks: Math.min(100, relationships.length * 25),
    schemaReadiness: 90,
    editorialSafety: 100,
    freshness: 85,
  };

  const total = Math.round(
    components.entityCompleteness * 0.22 +
      components.evidenceSufficiency * 0.2 +
      components.searchIntent * 0.16 +
      components.internalLinks * 0.14 +
      components.schemaReadiness * 0.12 +
      components.editorialSafety * 0.1 +
      components.freshness * 0.06,
  );

  const notes = [
    "Published as a seeded directory profile, not as a security-verified or official-vendor certification.",
    "Time-sensitive protocol claims must be refreshed against primary documentation.",
  ];

  return {
    total,
    components,
    passed: total >= serverQualityThreshold && evidence.length >= 2 && claims.every((claim) => claim.evidenceIds.length > 0),
    threshold: serverQualityThreshold,
    notes,
  };
}

function buildCandidateContract(route: string, title: string): PageContract {
  return {
    id: `contract:candidate:${stableHash(route)}`,
    route,
    canonical: `${baseUrl}${route}`,
    pageType: "candidate",
    status: "candidate",
    requiredSections: [title],
    requiredSchemaTypes: [],
    minEvidencePassages: 2,
    minClaims: 2,
    contentHash: stableHash(route),
  };
}

function scoreCompleteness(values: string[]) {
  const filled = values.filter(Boolean).length;
  return Math.round((filled / values.length) * 100);
}

function stableHash(input: string): string {
  let hash = 0;
  for (let index = 0; index < input.length; index += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(index);
    hash |= 0;
  }
  return `sha256:${Math.abs(hash).toString(16)}`;
}
