export interface ProviderAdapter {
  id: string
  name: string
  type: "github" | "npm" | "official-docs" | "community" | "marketplace"
  enabled: boolean
  config: Record<string, string | boolean | number>
  ingest: () => Promise<IngestionResult>
}

export interface IngestionResult {
  providerId: string
  ingestedAt: string
  entitiesCreated: number
  sourcesCreated: number
  passagesExtracted: number
  errors: string[]
}

export interface SourceProvider {
  id: string
  name: string
  type: "github" | "npm" | "official-docs" | "community" | "marketplace"
  enabled: boolean
  config: Record<string, unknown>
}

export interface IngestionResult {
  providerId: string
  ingestedAt: string
  entitiesCreated: number
  sourcesCreated: number
  passagesExtracted: number
  errors: string[]
}

export function createSourceProvider(overrides: Partial<SourceProvider> = {}): SourceProvider {
  return {
    id: `provider-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    name: "",
    type: "community",
    enabled: true,
    config: {},
    ...overrides,
  }
}

export class GitHubAdapter implements ProviderAdapter {
  id: string
  name: string
  type: "github" = "github"
  enabled = true
  config: Record<string, string | boolean | number>

  constructor(overrides: Partial<ProviderAdapter> = {}) {
    this.id = overrides.id || `github-${Date.now()}`
    this.name = overrides.name || "GitHub"
    this.config = overrides.config || { org: "", repo: "" }
  }

  async ingest(): Promise<IngestionResult> {
    return {
      providerId: this.id,
      ingestedAt: new Date().toISOString(),
      entitiesCreated: 0,
      sourcesCreated: 0,
      passagesExtracted: 0,
      errors: ["GitHub adapter not implemented"],
    }
  }
}

export class NpmAdapter implements ProviderAdapter {
  id: string
  name: string
  type: "npm" = "npm"
  enabled = true
  config: Record<string, string | boolean | number>

  constructor(overrides: Partial<ProviderAdapter> = {}) {
    this.id = overrides.id || `npm-${Date.now()}`
    this.name = overrides.name || "NPM"
    this.config = overrides.config || { package: "" }
  }

  async ingest(): Promise<IngestionResult> {
    return {
      providerId: this.id,
      ingestedAt: new Date().toISOString(),
      entitiesCreated: 0,
      sourcesCreated: 0,
      passagesExtracted: 0,
      errors: ["NPM adapter not implemented"],
    }
  }
}

export class OfficialDocsAdapter implements ProviderAdapter {
  id: string
  name: string
  type: "official-docs" = "official-docs"
  enabled = true
  config: Record<string, string | boolean | number>

  constructor(overrides: Partial<ProviderAdapter> = {}) {
    this.id = overrides.id || `official-docs-${Date.now()}`
    this.name = overrides.name || "Official Docs"
    this.config = overrides.config || { baseUrl: "", sitemapUrl: "" }
  }

  async ingest(): Promise<IngestionResult> {
    return {
      providerId: this.id,
      ingestedAt: new Date().toISOString(),
      entitiesCreated: 0,
      sourcesCreated: 0,
      passagesExtracted: 0,
      errors: ["Official docs adapter not implemented"],
    }
  }
}

export class CommunityAdapter implements ProviderAdapter {
  id: string
  name: string
  type: "community" = "community"
  enabled = true
  config: Record<string, string | boolean | number>

  constructor(overrides: Partial<ProviderAdapter> = {}) {
    this.id = overrides.id || `community-${Date.now()}`
    this.name = overrides.name || "Community"
    this.config = overrides.config || { source: "" }
  }

  async ingest(): Promise<IngestionResult> {
    return {
      providerId: this.id,
      ingestedAt: new Date().toISOString(),
      entitiesCreated: 0,
      sourcesCreated: 0,
      passagesExtracted: 0,
      errors: ["Community adapter not implemented"],
    }
  }
}

export class MarketplaceAdapter implements ProviderAdapter {
  id: string
  name: string
  type: "marketplace" = "marketplace"
  enabled = true
  config: Record<string, string | boolean | number>

  constructor(overrides: Partial<ProviderAdapter> = {}) {
    this.id = overrides.id || `marketplace-${Date.now()}`
    this.name = overrides.name || "Marketplace"
    this.config = overrides.config || { marketplace: "" }
  }

  async ingest(): Promise<IngestionResult> {
    return {
      providerId: this.id,
      ingestedAt: new Date().toISOString(),
      entitiesCreated: 0,
      sourcesCreated: 0,
      passagesExtracted: 0,
      errors: ["Marketplace adapter not implemented"],
    }
  }
}
