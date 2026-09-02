/**
 * @mcp/servers-registry — Publication Authority
 *
 * Single source of truth for server publication decisions.
 * This package exports the authoritative `isServerIndexable()` predicate
 * that determines whether a server entity is eligible for public indexing.
 *
 * Used by:
 * - apps/web (server registry adapter, route templates)
 * - evidence pipeline
 * - any consumer needing publication authority
 */

export type IndexableStatus = "published" | "draft" | "unverified" | "unknown";

export interface RegistryEntry {
  id: string;
  type: "server" | "tool" | "resource" | "prompt";
  name: string;
  description: string;
  slug: string;
  version: string;
  capabilities: string[];
  tags: string[];
  evidence: string[];
  verificationStatus: "verified" | "unverified" | "pending";
  publicationStatus: "draft" | "published" | "archived";
  creator: string;
  createdAt: string;
  updatedAt: string;
}

export interface RegistryEvent {
  eventId: string;
  aggregateId: string;
  eventType: "created" | "updated" | "verified" | "published" | "archived";
  payload: Record<string, unknown>;
  occurredAt: string;
}

export type BlueprintEntry = RegistryEntry;
export type GeneratorEntry = RegistryEntry;
export type SectionEntry = RegistryEntry & {
  sectionId: string;
};
export type EngineEntry = RegistryEntry & {
  engineId: string;
  engineVersion: string;
};

export interface RegistryIdentity {
  registryId: string | null;
  repositoryUrl: string | null;
  packageIdentity: string | null;
  canonicalHomepage: string | null;
  displayName: string | null;
}

export interface RegistrySource {
  sourceType: "official" | "registry" | "repository" | "documentation" | "package-registry" | "measurement" | "editorial";
  sourceUrl: string;
  retrievedAt: string;
  metadata?: Record<string, unknown>;
}

export interface RegistryVersion {
  version: string;
  committedAt: string;
  committedBy: string;
  changeSummary: string;
  previousVersion?: string;
}

export interface RegistryChange {
  changeId: string;
  aggregateId: string;
  changeType: "created" | "updated" | "verified" | "published" | "archived" | "deleted";
  changedBy: string;
  changedAt: string;
  previousState?: Record<string, unknown>;
  newState: Record<string, unknown>;
}

/**
 * Normalize a registry entry, returning its identity and cleaned data
 */
export class RegistryNormalizer {
  normalize(entry: RegistryEntry, source: RegistrySource): {
    identity: RegistryIdentity;
    normalized: RegistryEntry;
  } {
    // Simplified implementation
    return {
      identity: {
        registryId: entry.id,
        repositoryUrl: null,
        packageIdentity: entry.name,
        canonicalHomepage: null,
        displayName: entry.name,
      },
      normalized: entry,
    };
  }
}

/**
 * Deduplicate a list of registry entries by identity
 * Keeps the entry with the highest-priority identity and most recent timestamp
 */
export class RegistryDeduplicator {
  deduplicate(entries: RegistryEntry[], sources: RegistrySource[]): {
    unique: RegistryEntry[];
    duplicates: { entry: RegistryEntry; reason: string }[];
    resolutionLog: string[];
  } {
    // Simplified implementation
    return {
      unique: entries,
      duplicates: [],
      resolutionLog: [],
    };
  }
}

/**
 * Validate a registry entry's required fields and constraints
 */
export class RegistryValidator {
  validateEntry(entry: RegistryEntry): {
    valid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];
    if (!entry.id) errors.push("Missing id");
    if (!entry.name) errors.push("Missing name");
    if (!entry.slug) errors.push("Missing slug");
    return { valid: errors.length === 0, errors };
  }

  /**
   * Validate a publication decision using the centralized isServerIndexable() rule
   */
  validatePublicationDecision(
    published: boolean,
    evidenceCount: number,
    evidenceVerified: boolean,
    status: IndexableStatus
  ): {
    valid: boolean;
    decision: {
      serverId: string;
      published: boolean;
      indexable: boolean;
      reason: string;
      decidedAt: string;
    };
    reason: string;
  } {
    const decision = isServerIndexable(published, evidenceCount, evidenceVerified, status);
    return {
      valid: decision.indexable,
      decision: {
        serverId: "",
        published,
        indexable: decision.indexable,
        reason: decision.reason,
        decidedAt: decision.decidedAt,
      },
      reason: decision.reason,
    };
  }
}

/**
 * Determines if a server entity is indexable (publicly discoverable).
 *
 * A server is indexable if and only if ALL of the following are true:
 * 1. publicationStatus === "published" (intent to publish)
 * 2. evidenceCount > 0 (at least one evidence reference exists)
 * 3. evidenceVerified === true (evidence has been verified)
 * 4. status === "published" (current status confirms published state)
 *
 * This is the SINGLE authoritative publication predicate for servers.
 * No other function, route, or component may override this logic.
 *
 * @param published - Whether the server's publicationStatus is "published"
 * @param evidenceCount - Number of evidence references attached to the server
 * @param evidenceVerified - Whether the evidence has been verified (not just present)
 * @param status - Current editorial status of the server entry
 * @returns Object with indexable boolean and human-readable reason
 */
export function isServerIndexable(
  published: boolean,
  evidenceCount: number,
  evidenceVerified: boolean,
  status: IndexableStatus
): {
  indexable: boolean;
  reason: string;
  decidedAt: string;
} {
  const decidedAt = new Date().toISOString();

  if (!published) {
    return {
      indexable: false,
      reason: "Publication status is not 'published'",
      decidedAt,
    };
  }

  if (evidenceCount === 0) {
    return {
      indexable: false,
      reason: "No evidence references attached",
      decidedAt,
    };
  }

  if (!evidenceVerified) {
    return {
      indexable: false,
      reason: "Evidence exists but is not verified",
      decidedAt,
    };
  }

  if (status !== "published") {
    return {
      indexable: false,
      reason: `Status is '${status}', not 'published'`,
      decidedAt,
    };
  }

  return {
    indexable: true,
    reason: "Published with verified evidence",
    decidedAt,
  };
}

/**
 * Type guard for checking if a server entry passes publication authority.
 * Use this in route handlers for runtime protection.
 */
export function isServerIndexableEntry(entry: {
  publicationStatus: string;
  evidenceRefs?: string[];
  verificationStatus: string;
}): boolean {
  const published = entry.publicationStatus === "published";
  const evidenceCount = entry.evidenceRefs?.length ?? 0;
  const evidenceVerified = entry.verificationStatus === "verified" && evidenceCount > 0;
  const status: IndexableStatus = published
    ? "published"
    : entry.verificationStatus === "pending"
    ? "draft"
    : "unverified";

  return isServerIndexable(published, evidenceCount, evidenceVerified, status).indexable;
}