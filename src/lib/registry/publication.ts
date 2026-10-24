/**
 * Consolidated MCP publication policy.
 * Adapted from MCP-SERVER's evidence ledger and tightened to fail closed.
 */
export type VerificationStatus = "verified" | "evidence-reviewed" | "unverified" | "revoked" | "pending";
export type PublicationStatus = "published" | "needs-evidence" | "draft";

export interface SourceEvidence {
  source: string;
  capturedAt?: string;
  description?: string;
}

export interface RegistryCandidate {
  publicationStatus?: PublicationStatus;
  verificationStatus?: VerificationStatus | string;
  evidence?: SourceEvidence[];
}

export function isServerIndexable(record: RegistryCandidate | null | undefined): boolean {
  return Boolean(
    record?.publicationStatus === "published" &&
    (record.verificationStatus === "verified" || record.verificationStatus === "evidence-reviewed") &&
    Array.isArray(record.evidence) &&
    record.evidence.some((item) => typeof item.source === "string" && item.source.trim().length > 0),
  );
}

export function registryPublicationCounts(records: readonly RegistryCandidate[]) {
  return {
    tracked: records.length,
    indexable: records.filter(isServerIndexable).length,
    pending: records.filter((r) => !isServerIndexable(r)).length,
  };
}
