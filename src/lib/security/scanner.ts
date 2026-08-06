export interface SecurityScanResult {
  repositoryUrl: string | null
  scannedAt: string
  overallScore: number
  components: {
    repositoryProvenance: number
    maintainerIdentity: number
    dependencyHealth: number
    secretsExposure: number
    permissionScope: number
    networkAccess: number
    commandExecution: number
    authentication: number
    transportEncryption: number
    updateCadence: number
    documentation: number
    securityPolicy: number
    knownAdvisories: number
  }
  findings: Array<{
    severity: "low" | "medium" | "high" | "critical"
    category: string
    description: string
    recommendation: string
  }>
  status: "clean" | "issues-found" | "scan-failed"
}

export interface SecurityAdvisory {
  id: string
  entityId: string
  severity: "low" | "medium" | "high" | "critical"
  title: string
  description: string
  affectedVersions: string[]
  patchedVersions: string[]
  publishedAt: string
  sourceUrl: string | null
}

export function createEmptySecurityScanResult(): SecurityScanResult {
  return {
    repositoryUrl: null,
    scannedAt: new Date().toISOString(),
    overallScore: 0,
    components: {
      repositoryProvenance: 0,
      maintainerIdentity: 0,
      dependencyHealth: 0,
      secretsExposure: 0,
      permissionScope: 0,
      networkAccess: 0,
      commandExecution: 0,
      authentication: 0,
      transportEncryption: 0,
      updateCadence: 0,
      documentation: 0,
      securityPolicy: 0,
      knownAdvisories: 0,
    },
    findings: [],
    status: "scan-failed",
  }
}

export function computeSecurityScore(components: SecurityScanResult["components"]): number {
  const values = Object.values(components)
  const sum = values.reduce((acc, value) => acc + value, 0)
  return Math.round(sum / values.length)
}
