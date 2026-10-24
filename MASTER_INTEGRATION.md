# MCPServer.in — Master Integration

The public MCP-SERVERS repository is the authoritative discovery and documentation website for MCPServer.in.

The five-repository source bundle contains:
- CodesbyFebin/MCP-SERVERS — public Next.js knowledge website
- CodesbyFebin/MCP-SERVER — static publication gates and ingestion
- CodesbyFebin/mcp-servers-master — editorial registry and shared contracts
- CodesbyFebin/mcp-server-app — operational control plane
- CodesbyFebin/Indian-MCP-Server — India-focused integrations

The combined source archive is available separately as MCP-SERVER-MASTER-combined-source.zip. This document records integration ownership; merely bundling source trees does not make them one buildable application.

## Architecture

Public website: discovery, documentation, evidence, comparisons and editorial publishing.

Separate control plane: authentication, approval, gateway policy, runtime isolation, deployment, audit and recovery. These capabilities must pass live security qualification before being offered publicly.

## Integration gates

1. Reconcile registry and evidence contracts, requiring explicit verified states.
2. Preserve canonical URL mappings and redirects.
3. Run typecheck, security, SEO, tests and production build.
4. Verify database tenancy and privileged MCP execution separately.
5. Publish a release only after a green CI run and preview smoke test.

Do not report unverified servers, control-plane deployments or India compliance as certified capabilities.
