# How I Validate Every MCP Server Config Before It Touches Production

**Cross-posted from [MCPserver.in](https://mcpserver.in) — the India-first MCP knowledge hub.**

I spent three weeks debugging an MCP server that worked perfectly in tests and quietly violated DPDP in production. The server was a Slack integration that pulled customer support tickets, summarized them with Claude, and wrote the summary back to a Notion database. Nothing in the config said "store PII in plaintext." Nothing in the tests said "audit this." But the logs were full of phone numbers and order IDs, and the storage bucket was in `us-east-1`.

That is the class of problem `@mcpserver/in-validator` is built to catch before the first request hits production.

---

## The config gap

MCP configs are deceptively simple. A typical `mcp.json` is just a map of server names to `command`, `args`, and `env`. The simplicity is the danger: there is no schema enforcement, no required metadata, and no indication of which servers touch regulated data.

```json
{
  "mcpServers": {
    "slack": {
      "command": "node",
      "args": ["dist/slack-server.js"],
      "env": {
        "SLACK_TOKEN": "xoxb-..."
      }
    }
  }
}
```

That config is valid JSON. It is also invisible to compliance review unless someone reads it. In a team with five MCP servers, three environments, and rotating contributors, manual review fails.

## What the 2026 spec expects

The MCP ecosystem is converging on config conventions that make compliance review possible. The convention I enforce in the validator:

| Key | Required | Purpose |
|-----|----------|---------|
| `mcpServers` | Yes | Top-level server registry |
| `command` | Per-server | Executable path |
| `args` | Recommended | CLI arguments array |
| `env` | Recommended | Environment variable map |
| `dpdpCompliant` | India deployments | Declares DPDP readiness |
| `dataLocalization` | India deployments | Forces `ap-south-1` / `ap-south-2` |
| `auditLogging` | Recommended | Enables append-only audit trail |
| `consentManagement` | Recommended | Requires consent records per tool |

None of these keys exist in the original 2024 MCP spec. They are community conventions that have emerged because production MCP servers need to answer three questions auditors ask:

1. Where is user data stored?
2. Who consented to this access?
3. What did the server actually do with it?

## How the validator works

`@mcpserver/in-validator` is a thin CLI around three checks:

1. **Structure check** — required keys exist, `args` is an array, `env` is an object.
2. **Spec version awareness** — warns on unknown keys that suggest an outdated config shape.
3. **DPDP flag scan** — reports which India-specific flags are present and which are missing.

It does not rewrite your config. It does not enforce a specific cloud provider. It just tells you, before deploy, which compliance knobs are turned on and which are not.

```bash
npx @mcpserver/in-validator ./mcp.json
```

Sample output:

```
@mcpserver/in-validator — MCP Config Validator
Spec: 2026.1 | File: ./mcp.json

Servers found: 3
  fintech-postgres: DPDP flags detected: dataLocalization, auditLogging
  slack: No DPDP flags detected
  notion: India region detected: ap-south-1

Warnings:
  - No MCP servers defined in mcpServers

✅ Config valid.
```

## The audit log pattern I use

After the validator catches config issues, the runtime problem is still logging. Here is the pattern that worked for the fintech deployment:

```typescript
interface AuditEntry {
  ts: string;
  userId: string;
  tool: string;
  argsHash: string;
  status: 'ok' | 'error';
  latencyMs: number;
}

async function logAudit(entry: AuditEntry) {
  const line = JSON.stringify(entry) + '\n';
  await fs.appendFile(process.env.DPDP_AUDIT_LOG, line);
}
```

Key design choices:

- **Hash the args, do not store them raw.** If an argument contains a phone number, you want proof that it was passed, not a copy of it.
- **Append-only file first, cloud second.** Write to local disk, rotate to `ap-south-1` object storage asynchronously. If the cloud write fails, you still have the local JSONL.
- **Correlation ID per tool call.** The MCP `id` field in JSON-RPC is your correlation ID. Store it in the audit entry and you can replay any call from the log alone.

## Consent without UX friction

The hardest part of DPDP is not the engineering. It is the UX. If a user has to click "consent" before every MCP tool call, they will stop using the product.

The pattern I landed on:

- **First call per session per tool** — prompt for consent, cache the grant in Redis with a 24-hour TTL.
- **High-risk tools** — always prompt. Anything that writes, deletes, or accesses financial data.
- **Low-risk tools** — prompt once per session. Read-only database queries, schema introspection.

In the MCP server, this looks like:

```typescript
const consent = await getConsent(userId, toolName);
if (!consent && isHighRisk(toolName)) {
  throw new Error('Consent required for this tool');
}
```

The validator cannot enforce this pattern, but it can enforce that `consentManagement` is declared in the config so reviewers know to check it.

## Where to read more

The validator is the first line of defense. The second line is architecture. I wrote the full India-specific routing and compliance playbook at [mcpserver.in/learn/india-services](https://mcpserver.in/learn/india-services), and the DPDP deep dive at [mcpserver.in/learn/dpdp-compliance-guide](https://mcpserver.in/learn/dpdp-compliance-guide).

If you want the curated directory of production-ready MCP servers with India-specific deployment notes, the [mcpserver.in/mcp-server-directory](https://mcpserver.in/mcp-server-directory) has 105+ entries with schema validation and compliance flags where available.

---

*Originally published on MCP Server India. Corrections welcome.*
