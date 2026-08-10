---
title: "MCP Architecture: Client, Host, Server, Transports and JSON-RPC | MCPserver.in"
description: "A production guide to Model Context Protocol architecture, including hosts, clients, servers, tools, resources, prompts, JSON-RPC 2.0, stdio, and Streamable HTTP."
keywords: ["MCP architecture", "Model Context Protocol architecture", "MCP client host server", "JSON-RPC 2.0", "MCP transport", "stdio", "Streamable HTTP"]
schemaType: "TechArticle"
wordCount: 1500
category: "guide"
canonical: "https://mcpserver.in/mcp-architecture/"
---

# MCP Architecture: How Model Context Protocol Works

## Direct answer

Model Context Protocol (MCP) uses a **host–client–server architecture**. A host application such as an AI assistant creates an MCP client connection; the client communicates with an MCP server that exposes **tools, resources, and prompts**. Messages use **JSON-RPC 2.0**, while the transport determines how those messages move between the client and server.

For local applications, **stdio transport** is the simplest option. For remote production deployments, use the current MCP remote transport model, including **Streamable HTTP** where supported by the client and server. Treat transport, authentication, authorization, validation, observability, and data residency as separate production concerns.

## The MCP architecture in five entities

### 1. Host

The host is the application that provides the AI experience and coordinates one or more MCP clients. It owns the user interaction, model context window, permissions, and high-level orchestration policy.

### 2. Client

An MCP client is the protocol component inside the host that maintains a connection to an MCP server. It handles capability negotiation, protocol lifecycle messages, and requests such as listing or invoking tools.

### 3. Server

An MCP server exposes capabilities to the client. Those capabilities commonly include **tools** for actions, **resources** for contextual data, and **prompts** for reusable instruction templates. A server should enforce its own authorization and input validation rather than trusting the host.

### 4. Tools, resources and prompts

These are the core MCP primitives:

- **Tools** perform actions such as querying a database, creating a ticket, or calling an internal API.
- **Resources** expose addressable context that a client can read.
- **Prompts** provide reusable, structured instructions that help a client construct a workflow.

The distinction matters for security: a read-only resource is not equivalent to an action-capable tool, and every tool should have explicit authorization boundaries.

### 5. Transport

The transport carries JSON-RPC messages. **stdio** is appropriate when the client launches a local server process. Remote deployments should use the MCP-supported HTTP transport appropriate to the client/server implementation; avoid describing WebSocket as an MCP requirement.

## JSON-RPC 2.0 is the message layer

MCP messages follow JSON-RPC 2.0 semantics. Requests have an identifier and method, responses return a result or error, and notifications do not require a response. Keeping protocol semantics separate from business logic makes MCP servers easier to test and integrate across languages.

A simplified request looks like this:

```json
{
  "jsonrpc": "2.0",
  "id": 42,
  "method": "tools/list",
  "params": {}
}
```

A tool invocation then follows the negotiated capabilities and tool schema exposed by the server. Validate arguments server-side, enforce authorization before execution, and redact secrets and personal data from logs.

## Stdio vs Streamable HTTP

| Concern | Stdio | Streamable HTTP |
|---|---|---|
| Typical environment | Local desktop or CLI | Remote/shared production service |
| Process ownership | Client launches server | Server is independently hosted |
| Authentication | Local process boundary | HTTP authentication and authorization |
| Scaling | Usually one local process | Horizontal infrastructure is possible |
| Observability | Local process logs | Centralized logs, metrics and traces |
| India data residency | Depends on local machine | Depends on deployment region and data path |

Do not select a transport based only on latency. Evaluate the trust boundary, lifecycle, authentication model, network topology, failure behavior, and operational requirements.

## Production security model

A production MCP server should treat every tool invocation as an authorized operation, not merely as a protocol message. Recommended controls include:

1. Authenticate the MCP client.
2. Authorize each sensitive tool independently.
3. Validate every tool argument against its schema.
4. Apply rate limits and abuse controls.
5. Redact credentials, tokens, payment data, and other sensitive fields from logs.
6. Record auditable tool-call events without storing unnecessary personal data.
7. Keep secrets outside source control and outside client-visible resources.
8. Define timeouts, retries, idempotency, and failure behavior for downstream APIs.

For Indian deployments, map the data flow against your actual compliance obligations rather than assuming that “India hosting” alone establishes compliance.

## MCP and the context window

The model's **context window** is the model-side limit for the information available during an interaction. MCP does not replace the context window. Instead, MCP gives the host and model a standardized way to discover and retrieve relevant capabilities and context. Good server design therefore favors narrow tools, precise schemas, bounded resource responses, and predictable output sizes.

## Recommended production architecture

```text
User
  ↓
AI Host / Agent
  ↓
MCP Client
  ↓ JSON-RPC 2.0
stdio or Streamable HTTP
  ↓
MCP Server
  ├── Tools → APIs / databases / SaaS
  ├── Resources → approved context
  └── Prompts → reusable workflows
```

Put authentication, authorization, validation, rate limiting, observability, and secret management at the server boundary. Keep downstream credentials private to the server.

## Sources and standards

- [Model Context Protocol specification](https://modelcontextprotocol.io/specification/)
- [Model Context Protocol documentation](https://modelcontextprotocol.io/)
- [JSON-RPC 2.0 specification](https://www.jsonrpc.org/specification)
- [Server-Sent Events standard](https://html.spec.whatwg.org/multipage/server-sent-events.html)

## Related guides

- [/what-is-mcp/](/what-is-mcp/)
- [/docs/protocol/tools/](/docs/protocol/tools/)
- [/docs/protocol/resources/](/docs/protocol/resources/)
- [/docs/protocol/prompts/](/docs/protocol/prompts/)
- [/docs/protocol/json-rpc/](/docs/protocol/json-rpc/)
- [/docs/protocol/transports/](/docs/protocol/transports/)
- [/docs/compliance/security-best-practices/](/docs/compliance/security-best-practices/)
