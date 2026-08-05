import { describe, it, expect } from "vitest"
import {
  GitHubAdapter,
  NpmAdapter,
  OfficialDocsAdapter,
  CommunityAdapter,
  MarketplaceAdapter,
  createSourceProvider,
} from "../../src/lib/providers/provider-model"

describe("provider-model", () => {
  it("should create source provider", () => {
    const provider = createSourceProvider({
      name: "GitHub",
      type: "github",
    })
    expect(provider.id).toBeDefined()
    expect(provider.name).toBe("GitHub")
    expect(provider.type).toBe("github")
    expect(provider.enabled).toBe(true)
  })

  it("should create GitHub adapter", () => {
    const adapter = new GitHubAdapter({ name: "GitHub Main" })
    expect(adapter.id).toBeDefined()
    expect(adapter.name).toBe("GitHub Main")
    expect(adapter.type).toBe("github")
    expect(adapter.enabled).toBe(true)
  })

  it("should ingest from GitHub adapter", async () => {
    const adapter = new GitHubAdapter()
    const result = await adapter.ingest()
    expect(result.providerId).toBe(adapter.id)
    expect(result.ingestedAt).toBeDefined()
    expect(result.errors).toContain("GitHub adapter not implemented")
  })

  it("should create NPM adapter", () => {
    const adapter = new NpmAdapter({ name: "NPM Registry" })
    expect(adapter.type).toBe("npm")
    expect(adapter.config.package).toBe("")
  })

  it("should create Official Docs adapter", () => {
    const adapter = new OfficialDocsAdapter({ name: "Official Docs" })
    expect(adapter.type).toBe("official-docs")
    expect(adapter.config.baseUrl).toBe("")
  })

  it("should create Community adapter", () => {
    const adapter = new CommunityAdapter({ name: "Community" })
    expect(adapter.type).toBe("community")
  })

  it("should create Marketplace adapter", () => {
    const adapter = new MarketplaceAdapter({ name: "Marketplace" })
    expect(adapter.type).toBe("marketplace")
  })
})
