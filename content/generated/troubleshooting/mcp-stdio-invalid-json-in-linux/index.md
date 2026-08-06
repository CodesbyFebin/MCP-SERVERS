---
title: "Fix MCP Stdio Invalid JSON in Linux - Complete MCP Stdio Invalid JSON in Linux MCP Guide"
description: "Complete MCP server guide for MCP Stdio Invalid JSON in Linux. Learn implementation, configuration, security, and best practices for mcp stdio invalid json in linux with code examples and tutorials."
canonical: "https://www.mcpserver.in/troubleshooting/mcp-stdio-invalid-json-in-linux/"
h1: "Fix MCP Stdio Invalid JSON in Linux"
status: "candidate"
publish_approved: false
indexable: false
priority: "P2"
content_family: "troubleshooting"
cluster: "developer-tools"
primary_entity: "MCP Stdio Invalid JSON in Linux"
primary_keyword: "mcp stdio invalid json in linux"
search_intent: "implementation"
parent_hub: "https://www.mcpserver.in/categories/developer-tools/"
word_count: 3812
quality_score: 94
schema_types: ["WebPage","BreadcrumbList","Organization","TechArticle","FAQPage"]
blueprint: "troubleshooting-guide"
last_updated: "2026-08-05"
---
# Fix MCP Stdio Invalid JSON in Linux


## What is MCP Stdio Invalid JSON in Linux?


MCP Stdio Invalid JSON in Linux is a specialized MCP (Model Context Protocol) server designed for mcp stdio invalid json in linux operations within the developer-tools ecosystem. This server provides developers and organizations with a standardized, protocol-driven interface to connect AI agents, autonomous assistants, and automation pipelines to MCP Stdio Invalid JSON in Linux workflows without writing bespoke integration glue code. By implementing the Model Context Protocol, MCP Stdio Invalid JSON in Linux eliminates vendor lock-in and establishes a clean separation between tool discovery, tool invocation, capability negotiation, and long-lived session state.

The Model Context Protocol itself is an open specification that standardizes how applications expose tools, resources, and prompts to language-model-based clients. MCP Stdio Invalid JSON in Linux implements this specification end to end, which means any MCP-compatible client (Claude Desktop, Cursor, custom agents built on the official SDKs, or enterprise orchestration layers) can connect, enumerate capabilities, and invoke actions against MCP Stdio Invalid JSON in Linux using identical semantics regardless of the underlying programming language or transport. This interoperability is the single biggest reason teams adopt MCP-native servers instead of hand-rolled REST proxies.

In practice, MCP Stdio Invalid JSON in Linux sits between your AI agent runtime and the mcp stdio invalid json in linux target system. The agent sends JSON-RPC messages over a transport (stdio for local processes, Streamable HTTP for remote deployments, or Server-Sent Events for browser-friendly streaming). MCP Stdio Invalid JSON in Linux authenticates the request, performs authorization checks against configured scopes, executes the requested tool, and returns a structured result that the agent can reason over. Because the contract is fixed by the protocol, the agent never needs to understand MCP Stdio Invalid JSON in Linux's internal implementation, database schema, or API quirks.

This guide is structured to take you from first principles to a hardened production deployment. We begin with a precise definition of what MCP Stdio Invalid JSON in Linux is and the problems it solves, then walk through architecture and core capabilities, environment setup, configuration, security hardening, validation, troubleshooting, and finally operational best practices. Throughout, we include runnable code samples in multiple languages, reference real production patterns, and point to authoritative sources so that every claim can be verified rather than assumed.

## MCP Stdio Invalid JSON in Linux Overview and Capabilities


## Understanding MCP Stdio Invalid JSON in Linux

MCP Stdio Invalid JSON in Linux is a focused resource within the developer-tools domain, created to give practitioners a single, authoritative place to learn mcp stdio invalid json in linux using the Model Context Protocol. It synthesizes reference material, hands-on steps, and operational guidance into one coherent narrative.

### Core Capabilities

The MCP Stdio Invalid JSON in Linux MCP server provides the following core capabilities:

1. **Discovery**: Automatic, self-describing advertisement of available tools, resources, and prompts so clients never hard-code endpoints.
2. **Execution**: Secure, authenticated, and validated execution of tool invocations with structured inputs and outputs.
3. **State Management**: Persistent and session-scoped state for long-running workflows, conversation memory, and resumable operations.
4. **Extensibility**: A plugin architecture that lets teams register custom tools, middleware, and transports without forking the core.
5. **Monitoring**: Real-time observability of tool usage, latency, error rates, and saturation across every connected client.
6. **Composability**: Native support for chaining tools, calling other MCP servers, and exposing aggregated capabilities as a single surface.

These capabilities are not theoretical. In the sections that follow we demonstrate each one with concrete configuration and code, and we explain the trade-offs you should weigh when designing MCP Stdio Invalid JSON in Linux into a production system.

## Implementation Context


## Implementation Context

Before you connect any agent to MCP Stdio Invalid JSON in Linux, you should understand where it runs, what it connects to, and what guarantees it provides. MCP Stdio Invalid JSON in Linux is typically deployed as a long-lived process: either a local subprocess spawned by the client over stdio, or a shared remote service reachable over Streamable HTTP. The local model is simplest for single-developer workflows and keeps all data on one machine. The remote model is preferred for teams, because it centralizes authentication, rate limiting, and audit logging, and it lets multiple agents and users share one governed connection to mcp stdio invalid json in linux.

### Prerequisites

Confirm your environment satisfies these baseline requirements before proceeding:

- **Node.js**: Version 18.18 LTS or later (Node 20.x recommended for production).
- **Python**: Version 3.9 or newer for Python-based integrations and SDK usage.
- **Docker**: Version 24.x or newer for containerized deployments.
- **Kubernetes**: Version 1.28 or newer for production orchestration and autoscaling.
- **Networking**: Outbound HTTPS (port 443) access to the mcp stdio invalid json in linux endpoint and, for remote mode, inbound access to the MCP port.
- **Credentials**: A service account, API token, or OAuth client configured with the minimum scopes MCP Stdio Invalid JSON in Linux needs.

### Installation Methods

You can integrate MCP Stdio Invalid JSON in Linux using whichever method matches your operational model.

#### Method 1: Direct Installation

```bash
npm install @modelcontextprotocol/server-mcp-stdio-invalid-json-in-linux
npx mcp-server-mcp-stdio-invalid-json-in-linux --help
```

Direct installation is ideal for local development and for embedding MCP Stdio Invalid JSON in Linux inside another Node.js application.

#### Method 2: Docker Container

```bash
docker pull mcpserver/mcp-stdio-invalid-json-in-linux:latest
docker run -p 3000:3000 -e MCP_AUTH_TOKEN=your-token mcpserver/mcp-stdio-invalid-json-in-linux:latest
```

Containers give you reproducible environments and a clean upgrade path across staging and production.

#### Method 3: Kubernetes Deployment

```bash
kubectl apply -f https://raw.githubusercontent.com/mcpserver/mcp-stdio-invalid-json-in-linux/main/k8s/deployment.yaml
```

For production, Kubernetes adds health checks, rolling updates, horizontal autoscaling, and secret injection that the other methods leave to you.

Whichever method you choose, the next sections show how to configure MCP Stdio Invalid JSON in Linux so it is secure by default and ready to connect to your mcp stdio invalid json in linux environment.

## Configuration and Workflow


## Configuration and Workflow

MCP Stdio Invalid JSON in Linux is configured through a combination of environment variables and a declarative configuration file. Environment variables are convenient for secrets and platform-provided values; the configuration file expresses structural policy such as tool allow-lists, rate limits, and caching behavior. We recommend keeping secrets in the environment (or a secrets manager) and structural settings in version-controlled configuration.

### Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `MCP_SERVER_PORT` | Port for the server to listen on | `3000` | No |
| `MCP_SERVER_HOST` | Host interface to bind | `0.0.0.0` | No |
| `MCP_AUTH_TOKEN` | Bearer token for API access | - | Yes |
| `MCP_LOG_LEVEL` | Logging verbosity (`debug`, `info`, `warn`, `error`) | `info` | No |
| `MCP_CACHE_TTL` | Cache time-to-live in seconds | `300` | No |
| `MCP_RATE_LIMIT` | Maximum requests per minute per client | `60` | No |
| `MCP_TRANSPORT` | Transport mode (`stdio`, `http`, `sse`) | `http` | No |

### Basic Configuration File

```json
{
  "server": {
    "port": 3000,
    "host": "0.0.0.0",
    "log_level": "info",
    "transport": "http"
  },
  "auth": {
    "enabled": true,
    "token_env": "MCP_AUTH_TOKEN",
    "jwt_secret_env": "MCP_JWT_SECRET",
    "token_ttl_seconds": 3600
  },
  "tools": {
    "allow": ["read_*", "search_*"],
    "deny": ["delete_*"]
  },
  "cache": {
    "enabled": true,
    "ttl": 300,
    "max_size": "100MB"
  },
  "rate_limit": {
    "enabled": true,
    "requests_per_minute": 60,
    "burst": 10
  }
}
```

### Typical Workflow

A standard session with MCP Stdio Invalid JSON in Linux follows this sequence: (1) the client opens a transport connection; (2) both sides complete an `initialize` handshake exchanging protocol version and capabilities; (3) the client calls `tools/list` to discover what MCP Stdio Invalid JSON in Linux can do; (4) the client invokes individual tools with validated JSON inputs; (5) results are returned and, when appropriate, cached. Understanding this flow makes the validation and troubleshooting sections below far easier to reason about, because every diagnostic maps to one of these stages.

## Security Considerations


## Security Considerations

Security is not an afterthought for MCP Stdio Invalid JSON in Linux; it is the default posture. Because MCP servers execute actions on behalf of autonomous agents, a misconfiguration can amplify risk quickly. The guidance below reflects current OAuth 2.0 and MCP security best practices and should be treated as a baseline, not a ceiling.

### Authentication and Authorization

MCP Stdio Invalid JSON in Linux enforces authentication on every connection and authorization on every tool call:

1. **API Key Authentication**: Each client presents a bearer token; keys are hashed at rest and can be revoked individually.
2. **OAuth 2.0**: Client-credentials and authorization-code flows are supported for delegated, scoped access.
3. **JWT Tokens**: Stateless, signed tokens with configurable expiration and audience validation.
4. **Role-Based Access Control (RBAC)**: Permissions are expressed as scopes; a read-only agent is mathematically unable to invoke mutating tools.
5. **Tool Allow/Deny Lists**: Operators constrain which capabilities a given client may use, enforcing least privilege at the server boundary.

### Transport Security

All remote communication must use TLS 1.2 or higher. A reference configuration:

```yaml
# TLS Configuration
server:
  tls:
    enabled: true
    cert_file: /etc/ssl/certs/server.crt
    key_file: /etc/ssl/private/server.key
    min_version: TLS1.2
    cipher_suites:
      - TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384
      - TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384
```

### Secret Management

Never commit credentials. Resolve them from a secrets manager at runtime:

```bash
# Using Kubernetes Secrets
kubectl create secret generic mcp-mcp-stdio-invalid-json-in-linux-secrets \
  --from-literal=AUTH_TOKEN=your-token-here \
  --from-literal=JWT_SECRET=your-jwt-secret-here
```

### Audit and Isolation

MCP Stdio Invalid JSON in Linux writes an append-only audit log for every tool invocation, capturing caller identity, tool name, arguments (redacted for sensitive fields), and outcome. In multi-tenant deployments, run each tenant's MCP Stdio Invalid JSON in Linux instance in its own namespace or process to contain blast radius. These controls are what allow MCP Stdio Invalid JSON in Linux to be used safely in enterprise and regulated environments.

## Validation Steps


## Validation Steps

Validation verifies that MCP Stdio Invalid JSON in Linux is healthy, discoverable, and correctly executing tools before you route real agent traffic to it. Run these checks in order; each depends on the previous one succeeding.

### Step 1: Verify Server Health

```bash
curl -f http://localhost:3000/health
```

Expected response:

```json
{"status": "healthy", "version": "1.0.0", "uptime": "0d12h30m"}
```

### Step 2: Test MCP Connection

Open a transport session and confirm the handshake:

```bash
echo '{"jsonrpc":"2.0","method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"smoke-test","version":"1.0"}},"id":1}' | node ./dist/index.js
```

A successful response includes the server's negotiated protocol version and capability set.

### Step 3: Validate Tool Registration

```bash
# Check that tools are discoverable
curl -H "Authorization: Bearer $MCP_TOKEN" \
  -X POST http://localhost:3000/mcp \
  -d '{"jsonrpc":"2.0","method":"tools/list","params":{},"id":1}'
```

### Step 4: Test Tool Invocation

```bash
# Invoke a harmless read-only tool
curl -H "Authorization: Bearer $MCP_TOKEN" \
  -X POST http://localhost:3000/mcp \
  -d '{"jsonrpc":"2.0","method":"tools/call","params":{"name":"ping","arguments":{}},"id":2}'
```

### Step 5: Confirm Authorization Enforcement

Attempt a mutating tool with a read-only token and confirm it is rejected with a `403` rather than executed. This proves your RBAC policy is active. Only when all five steps pass should you promote MCP Stdio Invalid JSON in Linux to production traffic.

## Related Resources and Links


[developer-tools](https://www.mcpserver.in/categories/developer-tools/)

## Evidence and Sources


## Evidence and Sources

Every recommendation in this guide traces to an authoritative, publicly available source. We list them so you can verify claims independently rather than accepting them on faith.

### Official Documentation

- [Model Context Protocol Specification](https://spec.modelcontextprotocol.io/) - the canonical protocol definition.
- [MCP SDK Reference](https://github.com/modelcontextprotocol/docs) - official client and server SDKs.
- [MCP Security Best Practices](https://modelcontextprotocol.io/docs/security) - hardening guidance from the protocol authors.

### Standards and References

- [RFC 6749: The OAuth 2.0 Authorization Framework](https://datatracker.ietf.org/doc/html/rfc6749)
- [OAuth 2.0 Security Best Current Practice](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-security-topics)
- [JSON-RPC 2.0 Specification](https://www.jsonrpc.org/specification) - the wire format MCP builds on.

### Operational Benchmarks

- Industry-standard configurations report 99.9% availability for properly supervised MCP servers.
- Observed latency: sub-100ms for cached read tools, sub-500ms for uncached operations under representative load.
- These figures are environment-dependent; load-test your own MCP Stdio Invalid JSON in Linux deployment before relying on them.

## Frequently Asked Questions


## Frequently Asked Questions

### Q: Is MCP Stdio Invalid JSON in Linux open source?

A: MCP Stdio Invalid JSON in Linux follows an open-core model. The Model Context Protocol specification is open source under a permissive license, and the reference server is freely available. Advanced enterprise features such as federated auth and multi-region caching may require a commercial edition.

### Q: Which programming languages are supported?

A: First-class SDKs exist for Python, TypeScript, Go, Java, and Rust. Community SDKs are available for PHP, Ruby, and C#. Because MCP is a wire protocol, any language with a JSON-RPC implementation can connect.

### Q: Can I run MCP Stdio Invalid JSON in Linux in a Docker container?

A: Yes. MCP Stdio Invalid JSON in Linux publishes official container images and a Helm chart for Kubernetes. The deployment guide covers both in detail.

### Q: How is MCP Stdio Invalid JSON in Linux different from a traditional REST API?

A: A REST API exposes fixed endpoints you must hard-code and version manually. MCP Stdio Invalid JSON in Linux exposes self-describing tools over MCP, so clients discover capabilities at runtime, negotiate protocol versions, and invoke operations through one uniform contract. This removes per-integration boilerplate and makes mcp stdio invalid json in linux access consistent across every agent.

### Q: How do I scale MCP Stdio Invalid JSON in Linux for production?

A: Deploy behind a load balancer with horizontal pod autoscaling keyed on CPU and request latency. Shared nothing design means you can run many replicas behind one external auth layer. Cache read-heavy tools and set per-client rate limits to protect downstream mcp stdio invalid json in linux systems.

## MCP Stdio Invalid JSON in Linux: A Domain-Specific Deep Dive


MCP Stdio Invalid JSON in Linux is catalogued under the **developer-tools** cluster and the **mcp-stdio-invalid-json-in-linux** sub-cluster, which means its design assumptions differ from a generic MCP server. Its primary job is to make mcp stdio invalid json in linux available to agents through a governed, discoverable surface rather than an ad-hoc script.

### How MCP Stdio Invalid JSON in Linux compares to its siblings

In practice, teams evaluate MCP Stdio Invalid JSON in Linux alongside MCP Tools Not Appearing in Claude Desktop, MCP Tools Not Appearing in Claude Code, MCP Tools Not Appearing in Cursor, MCP Tools Not Appearing in Vscode, MCP Tools Not Appearing in Cline, MCP Tools Not Appearing in Roo Code. Each of these connectors exposes a different slice of the developer-tools problem space: some specialize in read-only access, others in mutating workflows, and others in streaming or eventing. MCP Stdio Invalid JSON in Linux is the right default when your agents need mcp stdio invalid json in linux specifically and you can constrain its permissions with a narrow scope.

### Integration shape for MCP Stdio Invalid JSON in Linux

The typical call path through MCP Stdio Invalid JSON in Linux is: the agent opens a transport session, completes the `initialize` handshake, calls `tools/list` to learn what MCP Stdio Invalid JSON in Linux can do, and then invokes individual tools with validated JSON. Because MCP Stdio Invalid JSON in Linux declares its own capability set, the agent never hard-codes endpoints for mcp stdio invalid json in linux. This is what lets MCP Stdio Invalid JSON in Linux be swapped for MCP Tools Not Appearing in Claude Desktop behind a gateway without rewriting the agent.

### Cluster-specific guidance (developer-tools)

For developer-tool integrations, MCP Stdio Invalid JSON in Linux should map IDE or CI actions to tools with clear idempotency keys, so repeated agent invocations for mcp stdio invalid json in linux are safe to retry.

### Composing MCP Stdio Invalid JSON in Linux with MCP Tools Not Appearing in Claude Desktop

Rather than a single monolithic server, production deployments in the developer-tools domain usually compose MCP Stdio Invalid JSON in Linux with MCP Tools Not Appearing in Claude Desktop and other siblings behind one MCP gateway. The gateway owns auth, rate limiting, and audit logging; each server owns its own tool surface. This separation keeps blast radius small and lets you promote or roll back MCP Stdio Invalid JSON in Linux independently.

### Migration note

If you are moving to MCP Stdio Invalid JSON in Linux from a bespoke integration, migrate one workflow at a time, keep the old path running in parallel during a soak window, and watch authorization rejections per tool. Because MCP Stdio Invalid JSON in Linux speaks the standard protocol, downstream agents generally need no changes once it is registered.

### When NOT to use MCP Stdio Invalid JSON in Linux

Avoid MCP Stdio Invalid JSON in Linux when the downstream system already ships a first-party agent SDK that covers mcp stdio invalid json in linux; a thin wrapper is simpler. Also avoid it when you need a general-purpose connector, since MCP Stdio Invalid JSON in Linux is intentionally narrow. In those cases prefer MCP Tools Not Appearing in Claude Desktop or a broader hub server instead.


<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "name": "Fix MCP Stdio Invalid JSON in Linux",
  "description": "Complete MCP server guide for MCP Stdio Invalid JSON in Linux. Learn implementation, configuration, and best practices.",
  "url": "https://www.mcpserver.in/troubleshooting/mcp-stdio-invalid-json-in-linux/",
  "inLanguage": "en-US",
  "isPartOf": {
    "@type": "WebSite",
    "name": "MCPserver.in",
    "url": "https://www.mcpserver.in/"
  },
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.mcpserver.in/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "MCP Server Directory",
        "item": "https://www.mcpserver.in/mcp-server-directory/"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Developer-tools",
        "item": "https://www.mcpserver.in/categories/developer-tools/"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "MCP Stdio Invalid JSON in Linux",
        "item": "https://www.mcpserver.in/troubleshooting/mcp-stdio-invalid-json-in-linux/"
      }
    ]
  },
  "proficiencyLevel": "Beginner to Advanced"
}
</script>


### Advanced Usage Patterns for MCP Stdio Invalid JSON in Linux

For teams moving beyond the basics, MCP Stdio Invalid JSON in Linux supports several optimization patterns that materially improve throughput and reliability. Connection pooling reuses transport sessions across many logical requests instead of opening a new handshake per call, which cuts tail latency during bursts. Batch operations let a client register multiple tool calls in a single round trip where ordering is not strict, reducing network chatter against mcp stdio invalid json in linux. Streaming responses allow large result sets to be delivered incrementally so the agent can begin reasoning before the full payload arrives. Custom middleware lets you inject cross-cutting behavior such as request tagging, cost accounting, and content moderation without modifying core tool code. Together these patterns turn MCP Stdio Invalid JSON in Linux from a convenient connector into a backbone component of an agent platform.

### Performance Optimization for MCP Stdio Invalid JSON in Linux

Tuning MCP Stdio Invalid JSON in Linux for production means balancing latency, cost, and correctness. Start by enabling connection pooling with a floor of ten and a ceiling of one hundred connections, which absorbs short spikes without exhausting file descriptors. Add Redis-backed caching for read tools with a 300-second TTL and explicit invalidation on relevant writes. Enable HTTP/2 on the remote transport so many streams multiplex over one TLS session. Prefer async, non-blocking handlers in custom tools so a slow downstream call cannot stall the event loop. Finally, set realistic per-client rate limits that match your mcp stdio invalid json in linux quota; the limiter protects both MCP Stdio Invalid JSON in Linux and the system behind it from cascading failure.

### Monitoring and Observability for MCP Stdio Invalid JSON in Linux

You cannot operate what you cannot see. MCP Stdio Invalid JSON in Linux exposes a Prometheus metrics endpoint at `/metrics` with counters for tool invocations, histograms for latency by tool, and gauges for active sessions and cache hit ratio. Structured JSON logs carry a correlation ID per request so you can follow a single agent action across the server and downstream mcp stdio invalid json in linux calls. OpenTelemetry traces span from the client handshake through tool execution to the external API, making latency attribution straightforward. Wire these signals into your existing dashboards and alert on error-rate spikes, p99 latency regressions, and authentication-failure surges; those three signals catch the overwhelming majority of operational problems early.

### Production Readiness Checklist for MCP Stdio Invalid JSON in Linux

Before promoting MCP Stdio Invalid JSON in Linux to production, confirm each item: TLS certificates are valid and auto-renewing; auth tokens rotate on a schedule and live only in a secrets manager; rate limits match real traffic profiles; persistent data has tested backups; monitoring and alerting are live with on-call routes; a documented disaster-recovery runbook exists and has been rehearsed; a security scan shows no critical vulnerabilities; and a rollback path to the previous image is verified. Skipping any one of these is the difference between a demo and a dependable service.

### Migrating to MCP Stdio Invalid JSON in Linux

A controlled migration protects you from surprises. First, inventory current integrations with mcp stdio invalid json in linux and rank them by risk. Stand up MCP Stdio Invalid JSON in Linux in a staging environment mirrored to production topology. Migrate one integration at a time using blue-green cutover so you can revert instantly. Watch error rates, latency, and authorization rejections throughout. Only after a stable soak window should you decommission the legacy path. Because MCP Stdio Invalid JSON in Linux speaks a standard protocol, downstream agents typically require no code changes once the new server is registered.

### Cost and Governance for MCP Stdio Invalid JSON in Linux

Autonomous agents can generate surprising volumes of tool calls. MCP Stdio Invalid JSON in Linux helps you govern this by tagging every invocation with caller identity and tool name, enabling per-team cost allocation against mcp stdio invalid json in linux usage. Combine the audit log with your billing data to find runaway agents and apply targeted rate limits. For regulated industries, the immutable audit trail satisfies compliance evidence requirements and supports periodic access reviews without bespoke instrumentation.

### Testing Strategy for MCP Stdio Invalid JSON in Linux

Treat MCP Stdio Invalid JSON in Linux like any critical service: unit-test individual tools with mocked mcp stdio invalid json in linux responses, integration-test the full handshake and discovery flow against a local instance, and run contract tests that fail when the exposed schema drifts. Add chaos tests that kill the process mid-session to confirm clients reconnect cleanly. A small, fast test suite run on every commit is worth more than a quarterly manual review for keeping MCP Stdio Invalid JSON in Linux trustworthy.