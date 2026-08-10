# Security Policy

## Reporting a vulnerability

Please report security issues privately to `security@mcpserver.in`. Do not disclose credentials, tokens, or exploit details in public issues.

## Credential handling

- Secrets must live in deployment environment variables or a managed secret store.
- Credentials must never be committed to `public/`, source code, documentation, or generated content.
- The repository security verifier runs during production builds and rejects common credential patterns.
- Any credential that has appeared in Git history must be treated as compromised and rotated, even after the file is deleted.

## MCP security expectations

MCP server assessments describe observed capabilities and configuration signals; they are not guarantees of safety. Production deployments should independently review:

- repository provenance and maintainer identity
- dependency and advisory status
- filesystem and network access
- command execution capabilities
- authentication and authorization
- secret handling
- transport encryption
- audit logging
- update and incident-response procedures

## Production baseline

The platform enables security response headers, disables caching for API routes, uses explicit publication gates for generated content, and rejects unapproved candidate/UGC pages from production routing.
