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
  | "retired"
  | "published";

export type VerificationState =
  | "seeded"
  | "evidence-backed"
  | "verified"
  | "unverified";

export type EvidenceStatus = "verified" | "unverified";

export interface SourceRecord {
  id: string;
  title: string;
  sourceType:
    | "primary-documentation"
    | "internal-editorial-record"
    | "repository"
    | "official-repository"
    | "vendor-documentation";
  url: string;
  publisher: string;
  capturedAt: string;
  freshnessDays: number;
  credibility: "primary" | "editorial-seed" | "vendor" | "community";
}

export interface EvidencePassage {
  id: string;
  sourceId: string;
  status: EvidenceStatus;
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
  repositoryUrl: string | null;
  documentationUrl: string | null;
  latestVerifiedVersion: string | null;
  capabilities: string[];
  provenance: {
    discoveredFrom: string;
    lastReviewed: string | null;
  };
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

interface VerifiedSeed {
  sourceId: string;
  server: Partial<ServerIntegration>;
  repositoryUrl: string | null;
  documentationUrl: string | null;
  latestVerifiedVersion: string | null;
  capabilities: string[];
  evidence: Array<{
    idSuffix: string;
    text: string;
    supports: string[];
  }>;
  claims: Array<{
    idSuffix: string;
    text: string;
    evidenceSuffixes: string[];
    claimType: ClaimRecord["claimType"];
  }>;
}

const baseUrl = "https://www.mcpserver.in";
const publicationDate = "2026-08-15";
const serverQualityThreshold = 80;

// This generic seed describes a class of vector databases rather than one resolvable
// MCP server entity with a publisher/source. Keep it out of the tracked entity count.
export const retiredInventorySlugs = new Set(["vector-database-mcp-server"]);

export const sourceRegistry: SourceRecord[] = [
  {
    id: "source:mcpserver-seed-registry",
    title: "MCPServer.in editorial seed registry",
    sourceType: "internal-editorial-record",
    url: "internal:mcpserver-seed-registry",
    publisher: "MCPServer.in Editorial",
    capturedAt: publicationDate,
    freshnessDays: 365,
    credibility: "editorial-seed",
  },
  {
    id: "source:github-official-mcp",
    title: "GitHub MCP Server",
    sourceType: "official-repository",
    url: "https://github.com/github/github-mcp-server",
    publisher: "GitHub",
    capturedAt: publicationDate,
    freshnessDays: 45,
    credibility: "primary",
  },
  {
    id: "source:stripe-ai-mcp",
    title: "Stripe AI — Model Context Protocol",
    sourceType: "official-repository",
    url: "https://github.com/stripe/ai",
    publisher: "Stripe",
    capturedAt: publicationDate,
    freshnessDays: 45,
    credibility: "primary",
  },
  {
    id: "source:mcp-reference-servers",
    title: "Model Context Protocol reference servers",
    sourceType: "official-repository",
    url: "https://github.com/modelcontextprotocol/servers",
    publisher: "Model Context Protocol",
    capturedAt: publicationDate,
    freshnessDays: 45,
    credibility: "primary",
  },
];

const verifiedSeeds: Record<string, VerifiedSeed> = {
  "github-mcp-server": {
    sourceId: "source:github-official-mcp",
    repositoryUrl: "https://github.com/github/github-mcp-server",
    documentationUrl: "https://github.com/github/github-mcp-server",
    latestVerifiedVersion: null,
    capabilities: ["repository access", "issues", "pull requests", "GitHub Actions workflows"],
    server: {
      description: "GitHub's official MCP server connects MCP-compatible AI tools to GitHub repositories, issues, pull requests, workflows, and other GitHub operations.",
      auth: "GitHub OAuth or GitHub Personal Access Token",
      useCases: [
        "Browse and query repositories and code",
        "Create and manage issues and pull requests",
        "Inspect GitHub Actions workflow activity",
      ],
      features: ["Repository tools", "Issue and pull-request tools", "Actions workflow tools", "Read-only mode"],
    },
    evidence: [
      {
        idSuffix: "identity",
        text: "GitHub publishes github/github-mcp-server and describes it as GitHub's official MCP Server.",
        supports: ["identity", "publisher", "repository"],
      },
      {
        idSuffix: "auth-capabilities",
        text: "The official repository documents OAuth and personal-access-token authentication, repository operations, issue and pull-request automation, Actions workflows, and read-only mode.",
        supports: ["authentication", "capabilities", "configuration"],
      },
    ],
    claims: [
      {
        idSuffix: "identity",
        text: "GitHub publishes an official GitHub MCP Server.",
        evidenceSuffixes: ["identity"],
        claimType: "directory-field",
      },
      {
        idSuffix: "auth",
        text: "The official server documents GitHub OAuth and personal access tokens as authentication options.",
        evidenceSuffixes: ["auth-capabilities"],
        claimType: "security-note",
      },
      {
        idSuffix: "capabilities",
        text: "The official server exposes GitHub-oriented toolsets including repositories, issues, pull requests, and Actions workflows.",
        evidenceSuffixes: ["auth-capabilities"],
        claimType: "directory-field",
      },
    ],
  },
  "stripe-mcp-server": {
    sourceId: "source:stripe-ai-mcp",
    repositoryUrl: "https://github.com/stripe/ai",
    documentationUrl: "https://github.com/stripe/ai",
    latestVerifiedVersion: null,
    capabilities: ["remote MCP endpoint", "customers", "products", "payments"],
    server: {
      description: "Stripe documents a remote MCP server at mcp.stripe.com and a local @stripe/mcp package for connecting MCP clients to supported Stripe operations.",
      auth: "OAuth for the remote server; Restricted API Key for local @stripe/mcp",
      useCases: [
        "Connect an MCP client to Stripe's remote MCP endpoint",
        "Run the local @stripe/mcp package",
        "Scope local tool permissions with a Restricted API Key",
      ],
      features: ["Remote MCP server", "OAuth", "Local @stripe/mcp package", "Restricted API Key permissions"],
    },
    evidence: [
      {
        idSuffix: "identity",
        text: "Stripe's official stripe/ai repository documents a remote MCP server at https://mcp.stripe.com and a local @stripe/mcp package.",
        supports: ["identity", "publisher", "repository", "endpoint"],
      },
      {
        idSuffix: "auth-capabilities",
        text: "Stripe documents OAuth for its remote MCP server and Restricted API Key permissions for local @stripe/mcp usage.",
        supports: ["authentication", "permissions", "configuration"],
      },
    ],
    claims: [
      {
        idSuffix: "identity",
        text: "Stripe provides an MCP server for supported Stripe operations.",
        evidenceSuffixes: ["identity"],
        claimType: "directory-field",
      },
      {
        idSuffix: "remote",
        text: "Stripe documents a remote MCP endpoint at https://mcp.stripe.com.",
        evidenceSuffixes: ["identity"],
        claimType: "directory-field",
      },
      {
        idSuffix: "auth",
        text: "Stripe documents OAuth for the remote server and Restricted API Keys for local @stripe/mcp permissions.",
        evidenceSuffixes: ["auth-capabilities"],
        claimType: "security-note",
      },
    ],
  },
  "postgres-mcp-server": {
    sourceId: "source:mcp-reference-servers",
    repositoryUrl: "https://github.com/modelcontextprotocol/servers",
    documentationUrl: "https://github.com/modelcontextprotocol/servers",
    latestVerifiedVersion: null,
    capabilities: [],
    server: {
      description: "The Model Context Protocol reference-servers repository documents a PostgreSQL reference server launched with @modelcontextprotocol/server-postgres and a PostgreSQL connection string.",
      auth: "PostgreSQL connection string",
      useCases: [
        "Connect an MCP-compatible client to the PostgreSQL reference server",
        "Provide a PostgreSQL connection string when launching the reference package",
      ],
      features: ["Reference server", "@modelcontextprotocol/server-postgres package", "PostgreSQL connection-string configuration"],
    },
    evidence: [
      {
        idSuffix: "identity",
        text: "The official Model Context Protocol reference-servers repository documents @modelcontextprotocol/server-postgres as a PostgreSQL MCP reference server.",
        supports: ["identity", "repository", "package"],
      },
      {
        idSuffix: "configuration",
        text: "The reference configuration launches @modelcontextprotocol/server-postgres with a PostgreSQL connection string argument.",
        supports: ["configuration", "authentication-boundary"],
      },
    ],
    claims: [
      {
        idSuffix: "identity",
        text: "The Model Context Protocol reference repository documents a PostgreSQL MCP reference server.",
        evidenceSuffixes: ["identity"],
        claimType: "directory-field",
      },
      {
        idSuffix: "package",
        text: "The documented npm package is @modelcontextprotocol/server-postgres.",
        evidenceSuffixes: ["identity"],
        claimType: "directory-field",
      },
      {
        idSuffix: "configuration",
        text: "The documented reference configuration supplies a PostgreSQL connection string when launching the server.",
        evidenceSuffixes: ["configuration"],
        claimType: "security-note",
      },
    ],
  },
};

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
  if (current === "seeded" && evidenceCount >= 2 && claimsCount >= 3) return "evidence-backed";
  if (current === "evidence-backed" && qualityPassed) return "verified";
  if ((current === "evidence-backed" || current === "verified") && (evidenceCount === 0 || claimsCount === 0)) return "unverified";
  return current;
}

export function getTrackedServers() {
  return servers.filter((server) => !retiredInventorySlugs.has(server.slug));
}

export function isServerIndexable(profile: ServerPublicationProfile | null | undefined): boolean {
  return Boolean(
    profile &&
      profile.status === "published" &&
      profile.verificationState === "verified" &&
      profile.evidence.some((evidence) => evidence.status === "verified")
  );
}

export const publishedServers = getTrackedServers()
  .map((server) => getServerPublicationProfile(server.slug))
  .filter((profile): profile is ServerPublicationProfile => isServerIndexable(profile))
  .map((profile) => profile.server);

export function getServerPublicationProfile(slug: string): ServerPublicationProfile | null {
  const rawServer = servers.find((item) => item.slug === slug);
  if (!rawServer) return null;

  const seed = verifiedSeeds[slug];
  const server: ServerIntegration = seed ? { ...rawServer, ...seed.server } : rawServer;
  const entityId = `server:${server.slug}`;
  const evidence = buildServerEvidence(server);
  const claims = buildServerClaims(server, entityId, evidence);
  const relationships = buildServerRelationships(server, entityId, evidence);
  const verificationState: VerificationState = seed && evidence.some((item) => item.status === "verified") ? "verified" : "unverified";
  const quality = scoreServerProfile(server, evidence, claims, relationships, verificationState);
  const status: PublicationStatus = retiredInventorySlugs.has(slug)
    ? "retired"
    : verificationState === "verified" && quality.passed
      ? "published"
      : "needs-evidence";
  const contract = buildServerPageContract(server, status, evidence, claims);

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
    repositoryUrl: seed?.repositoryUrl ?? null,
    documentationUrl: seed?.documentationUrl ?? null,
    latestVerifiedVersion: seed?.latestVerifiedVersion ?? null,
    capabilities: seed?.capabilities ?? [],
    provenance: {
      discoveredFrom: "MCPServer.in production seed inventory",
      lastReviewed: seed ? publicationDate : null,
    },
  };
}

export function getPublishedServerProfiles() {
  return getTrackedServers()
    .map((server) => getServerPublicationProfile(server.slug))
    .filter((profile): profile is ServerPublicationProfile => isServerIndexable(profile));
}

export function getEvidenceLedgerStats() {
  const trackedProfiles = getTrackedServers()
    .map((server) => getServerPublicationProfile(server.slug))
    .filter((profile): profile is ServerPublicationProfile => Boolean(profile));
  const published = trackedProfiles.filter(isServerIndexable).length;
  const needsEvidence = trackedProfiles.filter((profile) => profile.status === "needs-evidence" || profile.status === "editorial-review").length;

  return {
    totalEntities: trackedProfiles.length,
    publishedProfiles: published,
    needsEvidence,
    retiredSeeds: servers.length - trackedProfiles.length,
    syntheticProfilesPublished: 0,
  };
}

export function getPublicServerFeed() {
  return getPublishedServerProfiles().map((profile) => {
    const sources = getEvidenceSources(profile.evidence).filter((source) => source.url.startsWith("http"));
    return {
      slug: profile.server.slug,
      canonicalName: profile.server.name,
      description: profile.server.description,
      category: profile.server.category,
      repositoryUrl: profile.repositoryUrl,
      documentationUrl: profile.documentationUrl,
      sourceUrl: sources[0]?.url ?? null,
      latestVerifiedVersion: profile.latestVerifiedVersion,
      capabilities: profile.capabilities,
      authentication: profile.server.auth,
      publicationStatus: profile.status,
      verificationStatus: profile.verificationState,
      lastReviewed: profile.provenance.lastReviewed,
      evidence: profile.evidence
        .filter((item) => item.status === "verified")
        .map((item) => ({
          id: item.id,
          sourceUrl: sources.find((source) => source.id === item.sourceId)?.url ?? null,
          verifiedAt: item.capturedAt,
          supports: item.supports,
        })),
      measurements: [],
    };
  });
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
    if (!isServerIndexable(profile)) errors.push(`${profile.server.slug} is published without verified evidence.`);
    if (!profile.quality.passed) errors.push(`${profile.server.slug} is published but failed quality gates.`);

    profile.evidence.forEach((evidence) => {
      if (!sourceIds.has(evidence.sourceId)) errors.push(`${profile.server.slug} references missing source ${evidence.sourceId}.`);
      if (evidence.status !== "verified") errors.push(`${profile.server.slug} has non-verified publication evidence ${evidence.id}.`);
    });

    profile.claims.forEach((claim) => {
      if (claim.evidenceIds.length === 0) errors.push(`${claim.id} has no evidence.`);
      claim.evidenceIds.forEach((evidenceId) => {
        if (!profile.evidence.some((evidence) => evidence.id === evidenceId && evidence.status === "verified")) {
          errors.push(`${claim.id} references missing or unverified evidence ${evidenceId}.`);
        }
      });
    });

    profile.relationships.forEach((relationship) => {
      const validTo = categoryEntityIds.has(relationship.toEntityId) || serverEntityIds.has(relationship.toEntityId);
      if (!serverEntityIds.has(relationship.fromEntityId) || !validTo) errors.push(`${relationship.id} points at an unknown entity.`);
    });
  });

  if (routeCandidateBacklog.some((contract) => contract.status === "published")) {
    errors.push("Candidate route backlog contains a published contract.");
  }

  const stats = getEvidenceLedgerStats();
  if (stats.totalEntities !== 75) warnings.push(`Expected 75 tracked entities from the current production seed, found ${stats.totalEntities}.`);
  if (stats.publishedProfiles !== 3) warnings.push(`Initial evidence-reviewed cohort expected 3 profiles, found ${stats.publishedProfiles}.`);

  return {
    ok: errors.length === 0,
    errors,
    warnings,
    publishedServerCount: getPublishedServerProfiles().length,
    candidateRouteCount: routeCandidateBacklog.length,
  };
}

function buildServerEvidence(server: ServerIntegration): EvidencePassage[] {
  const seed = verifiedSeeds[server.slug];
  if (!seed) return [];

  return seed.evidence.map((entry) => ({
    id: `evidence:server:${server.slug}:${entry.idSuffix}`,
    sourceId: seed.sourceId,
    status: "verified" as const,
    text: entry.text,
    supports: entry.supports,
    capturedAt: publicationDate,
    expiresAt: "2026-09-29",
  }));
}

function buildServerClaims(server: ServerIntegration, subjectId: string, evidence: EvidencePassage[]): ClaimRecord[] {
  const seed = verifiedSeeds[server.slug];
  if (!seed) return [];

  return seed.claims.map((claim) => ({
    id: `claim:server:${server.slug}:${claim.idSuffix}`,
    subjectId,
    text: claim.text,
    evidenceIds: claim.evidenceSuffixes.map((suffix) => `evidence:server:${server.slug}:${suffix}`),
    claimType: claim.claimType,
    expiresAt: "2026-09-29",
  })).filter((claim) => claim.evidenceIds.every((id) => evidence.some((item) => item.id === id && item.status === "verified")));
}

function buildServerRelationships(server: ServerIntegration, entityId: string, evidence: EvidencePassage[]): RelationshipRecord[] {
  if (evidence.length === 0) return [];
  const categorySlug = getCategorySlugForServer(server);
  const category = categories.find((item) => item.slug === categorySlug);
  if (!category) return [];

  return [{
    id: `relationship:${server.slug}:category:${category.slug}`,
    fromEntityId: entityId,
    toEntityId: `category:${category.slug}`,
    relationshipType: "belongs_to_category",
    evidenceIds: [evidence[0].id],
  }];
}

function buildServerPageContract(server: ServerIntegration, status: PublicationStatus, evidence: EvidencePassage[], claims: ClaimRecord[]): PageContract {
  const route = `/servers/${server.slug}/`;
  return {
    id: `contract:server:${server.slug}`,
    route,
    canonical: `${baseUrl}${route}`,
    pageType: "server-detail",
    status,
    requiredSections: status === "published" ? ["summary", "evidence-state", "claims", "sources"] : ["verification-state"],
    requiredSchemaTypes: status === "published" ? ["WebPage", "BreadcrumbList"] : ["WebPage"],
    minEvidencePassages: status === "published" ? 1 : 0,
    minClaims: status === "published" ? 1 : 0,
    contentHash: stableHash([
      server.name,
      server.slug,
      server.category,
      status,
      evidence.map((item) => `${item.id}:${item.status}`).join("|"),
      claims.map((item) => item.id).join("|"),
    ].join("::")),
  };
}

function scoreServerProfile(
  server: ServerIntegration,
  evidence: EvidencePassage[],
  claims: ClaimRecord[],
  relationships: RelationshipRecord[],
  verificationState: VerificationState,
): QualityScore {
  const verifiedEvidence = evidence.filter((item) => item.status === "verified").length;
  const evidenceReady = verificationState === "verified" && verifiedEvidence > 0 && claims.length > 0;
  const components = {
    entityCompleteness: scoreCompleteness([server.name, server.slug, server.category, evidenceReady ? server.description : ""]),
    evidenceSufficiency: evidenceReady ? 100 : 0,
    searchIntent: evidenceReady ? 100 : 40,
    internalLinks: relationships.length > 0 ? 100 : 40,
    schemaReadiness: evidenceReady ? 100 : 40,
    editorialSafety: evidenceReady ? 100 : 40,
    freshness: evidenceReady ? 100 : 0,
  };
  const total = Math.round(Object.values(components).reduce((sum, value) => sum + value, 0) / Object.keys(components).length);

  return {
    total,
    components,
    passed: evidenceReady && total >= serverQualityThreshold,
    threshold: serverQualityThreshold,
    notes: evidenceReady ? [] : ["Profile remains inventory-only until server-specific primary evidence is attached."],
  };
}

function buildCandidateContract(route: string, title: string): PageContract {
  return {
    id: `contract:candidate:${route}`,
    route,
    canonical: `${baseUrl}${route}`,
    pageType: "candidate",
    status: "candidate",
    requiredSections: [],
    requiredSchemaTypes: [],
    minEvidencePassages: 0,
    minClaims: 0,
    contentHash: stableHash(`${route}:${title}`),
  };
}

function scoreCompleteness(values: string[]) {
  const populated = values.filter(Boolean).length;
  return Math.round((populated / values.length) * 100);
}

function stableHash(value: string) {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(index);
    hash |= 0;
  }
  return Math.abs(hash).toString(16);
}
