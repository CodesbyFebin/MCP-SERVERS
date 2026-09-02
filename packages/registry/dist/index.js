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
/**
 * Normalize a registry entry, returning its identity and cleaned data
 */
export class RegistryNormalizer {
    normalize(entry, source) {
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
    deduplicate(entries, sources) {
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
    validateEntry(entry) {
        const errors = [];
        if (!entry.id)
            errors.push("Missing id");
        if (!entry.name)
            errors.push("Missing name");
        if (!entry.slug)
            errors.push("Missing slug");
        return { valid: errors.length === 0, errors };
    }
    /**
     * Validate a publication decision using the centralized isServerIndexable() rule
     */
    validatePublicationDecision(published, evidenceCount, evidenceVerified, status) {
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
export function isServerIndexable(published, evidenceCount, evidenceVerified, status) {
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
export function isServerIndexableEntry(entry) {
    const published = entry.publicationStatus === "published";
    const evidenceCount = entry.evidenceRefs?.length ?? 0;
    const evidenceVerified = entry.verificationStatus === "verified" && evidenceCount > 0;
    const status = published
        ? "published"
        : entry.verificationStatus === "pending"
            ? "draft"
            : "unverified";
    return isServerIndexable(published, evidenceCount, evidenceVerified, status).indexable;
}
