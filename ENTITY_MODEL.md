# Entity Model

## Entity Types

All entities use stable, namespaced IDs.

### Core Types

- `server` - MCP server implementations
- `client` - MCP client applications
- `sdk` - Software development kits
- `tool` - MCP tools
- `resource` - MCP resources
- `prompt` - MCP prompts
- `schema` - JSON schemas
- `transport` - Transport methods
- `authentication_method` - Authentication methods
- `company` - Companies/organizations
- `maintainer` - Maintainers
- `repository` - Code repositories
- `package` - Packages
- `release` - Software releases
- `language` - Programming languages
- `framework` - Frameworks
- `database` - Database systems
- `cloud_platform` - Cloud platforms
- `integration` - Integrations
- `category` - Categories
- `subcategory` - Subcategories
- `tutorial` - Tutorials
- `guide` - Guides
- `comparison` - Comparisons
- `collection` - Collections
- `benchmark` - Benchmarks
- `security_advisory` - Security advisories
- `vulnerability` - Vulnerabilities
- `compliance_framework` - Compliance frameworks
- `deployment_pattern` - Deployment patterns
- `architecture_pattern` - Architecture patterns
- `glossary_term` - Glossary terms
- `author` - Authors
- `source` - Sources
- `claim` - Claims
- `evidence_passage` - Evidence passages
- `locale` - Locales
- `marketplace_listing` - Marketplace listings
- `hosting_provider` - Hosting providers

## Entity Schema

See `src/data/content-registry/types.ts` for the complete TypeScript type definition.

## Relationship Types

Valid relationship types:
- `belongs_to`
- `maintained_by`
- `developed_by`
- `implemented_in`
- `supports`
- `requires`
- `compatible_with`
- `integrates_with`
- `alternative_to`
- `compared_with`
- `uses`
- `deployed_on`
- `secured_by`
- `authenticated_by`
- `documented_by`
- `explained_by`
- `referenced_by`
- `has_release`
- `has_vulnerability`
- `has_benchmark`
- `listed_in`
- `recommended_for`
- `related_to`
- `deprecated_by`
- `replaced_by`

## ID Format

Entity IDs follow the pattern: `{type}.{slug}`

Examples:
- `server.postgres`
- `server.github`
- `client.claude-desktop`
- `category.database`
- `tutorial.build-mcp-server-python`
