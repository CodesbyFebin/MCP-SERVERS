# The Complete Guide to Building Production-Grade MCP Servers (India-First)

The Model Context Protocol (MCP) has moved from "interesting experiment" to "core infrastructure" for teams shipping AI agents. But most tutorials stop at "hello world" — they never cover the parts that actually break in production: auth, audit logging, data minimization, and Indian regulatory compliance.

This is the guide I wish existed when we started deploying MCP servers for Indian fintech and SaaS teams.

## What MCP Actually Solves

Before MCP, every AI integration was a custom pipeline. You wrote bespoke code to connect Claude to your Postgres DB, then more bespoke code to connect Cursor to your Slack, then more for each new tool. MCP replaces that with one standard: a JSON-RPC 2.0 interface where servers announce their capabilities (tools, resources, prompts) and clients consume them.

The key insight: **the tool schema IS the documentation.** A model reads the schema on every session and decides whether to call it. There's no separate "docs site" to read — the interface and the documentation are the same artifact. This means your schema descriptions need to be clear enough that a model calls the tool correctly without ever seeing a usage example.

For the protocol fundamentals, see the [What is MCP? guide](https://mcpserver.in/what-is-mcp).

## The Production Checklist (The 80% Nobody Talks About)

### 1. Authentication Is Not Optional for Remote Servers

A stdio server runs as a local child process — it implicitly trusts whoever runs the client. A remote server over SSE or Streamable HTTP is reachable by anyone who can hit the endpoint. **The moment you deploy remotely, you need real auth.**

For enterprise deployments, OAuth per-user beats a static API key. Why? Because the server acts on behalf of a specific signed-in user, not a shared service account. Validate a bearer token per request and scope every tool call to what that token is actually authorized for — not what the server's own credentials could do.

### 2. Audit Logging for DPDP & RBI

If you touch Indian user PII or payment data, the DPDP Act (2023) and RBI data localization rules attach. Every AI access to personal data must be logged with timestamp, agent identity, and purpose. Store logs in an append-only location (S3 Object Lock, or a compliant DB with write-once semantics).

The [DPDP Compliance Guide for MCP Servers](https://mcpserver.in/learn/dpdp-compliance-guide) breaks down exactly which articles apply and how to map them to server architecture.

### 3. Data Minimization by Default

Your server should sanitize outputs. If an AI asks for "all users," return aggregated counts or anonymized IDs — never raw PII. Build the sanitization into the tool handler, not as an afterthought.

### 4. Deploy in India for Indian Data

Payment system operators must store transaction data on servers in India. Deploy to AWS Mumbai, Azure Pune, or GCP Delhi. The [MCP Server India Directory](https://mcpserver.in/servers) lists pre-built, verified connectors with Indian hosting in mind.

## A Minimal Compliant Server Skeleton

```typescript
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";

const server = new Server({
  name: "india-compliant-server",
  version: "1.0.0",
}, { capabilities: { tools: {} } });

const SafeQuerySchema = z.object({
  metric: z.string().describe("The aggregated metric to fetch, never raw row IDs"),
  scope: z.string().describe("e.g. 'last_30_days'")
});

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [{
    name: "get_aggregated_metric",
    description: "Returns aggregated, anonymized metrics. Complies with DPDP data minimization.",
    inputSchema: {
      type: "object",
      properties: {
        metric: { type: "string" },
        scope: { type: "string" }
      },
      required: ["metric", "scope"]
    }
  }]
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, params } = request;
  if (name === "get_aggregated_metric") {
    const parsed = SafeQuerySchema.parse(params.arguments);
    await logAuditEvent({ action: "read_metric", metric: parsed.metric, ts: new Date().toISOString() });
    const result = await fetchAggregate(parsed.metric, parsed.scope); // sanitized output only
    return { content: [{ type: "text", text: JSON.stringify(result) }] };
  }
  throw new Error("Tool not found");
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}
main();
```

## Where to Go Next

- Read the [MCP Server pillar](https://mcpserver.in/mcp-server) for architecture deep-dives.
- Browse the [MCP Hosting guide](https://mcpserver.in/mcp-hosting) for stdio-vs-remote decisions.
- Check the [Security pillar](https://mcpserver.in/mcp-security) for the failure modes that actually show up in production.

Building compliant AI infrastructure is hard. MCP makes it tractable — but only if you treat the compliance layer as part of the server, not a wrapper around it.