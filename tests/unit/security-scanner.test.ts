import { describe, it, expect } from "vitest"
import { createEmptySecurityScanResult, computeSecurityScore } from "../../src/lib/security/scanner"

describe("security-scanner", () => {
  it("should create empty security scan result", () => {
    const result = createEmptySecurityScanResult()
    expect(result.status).toBe("scan-failed")
    expect(result.overallScore).toBe(0)
  })

  it("should compute security score", () => {
    const score = computeSecurityScore({
      repositoryProvenance: 80,
      maintainerIdentity: 70,
      dependencyHealth: 60,
      secretsExposure: 100,
      permissionScope: 90,
      networkAccess: 80,
      commandExecution: 70,
      authentication: 90,
      transportEncryption: 100,
      updateCadence: 75,
      documentation: 60,
      securityPolicy: 50,
      knownAdvisories: 100,
    })
    expect(score).toBeGreaterThan(0)
    expect(score).toBeLessThanOrEqual(100)
  })
})
