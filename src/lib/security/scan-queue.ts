import type { SecurityScanResult } from "./scanner"

export interface SecurityScanQueueItem {
  id: string
  entityId: string
  repositoryUrl: string | null
  status: "pending" | "running" | "completed" | "failed"
  result: SecurityScanResult | null
  scheduledAt: string
  completedAt: string | null
}

export function createSecurityScanQueueItem(overrides: Partial<SecurityScanQueueItem> = {}): SecurityScanQueueItem {
  return {
    id: `scan-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    entityId: "",
    repositoryUrl: null,
    status: "pending",
    result: null,
    scheduledAt: new Date().toISOString(),
    completedAt: null,
    ...overrides,
  }
}
