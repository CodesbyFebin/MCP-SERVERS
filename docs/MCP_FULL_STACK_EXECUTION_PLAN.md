# MCPserver.in Full Stack Execution and Scaling Plan

## PHASE 1: IMMEDIATE RESCUE (Weeks 1-4)

Goal: fix broken discovery routes, publish trust signals, and turn latency claims into public evidence.

### Database Schema

```sql
create extension if not exists pgcrypto;
create extension if not exists vector;

create table categories (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  description text not null,
  icon_name text not null default 'Server',
  sort_order int not null default 100,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table users (
  id uuid primary key default gen_random_uuid(),
  email citext unique not null,
  display_name text,
  plan text not null default 'free',
  org_id uuid,
  roles text[] not null default array['developer'],
  created_at timestamptz not null default now(),
  last_login_at timestamptz
);

create table servers (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  category_id uuid not null references categories(id),
  package_name text,
  repo_url text,
  description text not null,
  auth_type text not null,
  transports text[] not null default array['stdio'],
  security_score numeric(3,1) not null default 0,
  verified_at timestamptz,
  owner_user_id uuid references users(id),
  metadata jsonb not null default '{}',
  embedding vector(1536),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table audit_logs (
  id uuid primary key default gen_random_uuid(),
  org_id uuid,
  user_id uuid references users(id),
  server_id uuid references servers(id),
  event_type text not null,
  actor_ip inet,
  region text not null default 'in-mumbai',
  request_id text not null,
  risk_level text not null default 'low',
  redacted_payload jsonb not null default '{}',
  hash_sha256 text not null,
  created_at timestamptz not null default now()
);

create index servers_category_idx on servers(category_id);
create index servers_search_idx on servers using gin (to_tsvector('english', name || ' ' || description));
create index audit_logs_created_idx on audit_logs(created_at desc);
```

### API Endpoints

```ts
// Express route skeleton
import express from "express";
import { z } from "zod";
import { db } from "./db";
import { requireAuth, requireScope } from "./middleware/zeroTrust";

const router = express.Router();

const createServerSchema = z.object({
  name: z.string().min(2),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  categorySlug: z.string(),
  packageName: z.string().optional(),
  repoUrl: z.string().url().optional(),
  description: z.string().min(20),
  authType: z.string(),
  transports: z.array(z.enum(["stdio", "sse", "streamable-http"])).default(["stdio"]),
});

router.get("/api/v1/servers", async (req, res) => {
  const { q = "", category, limit = "50" } = req.query;
  const rows = await db.server.search({ q: String(q), category: String(category || ""), limit: Number(limit) });
  res.json({ data: rows, nextCursor: null });
});

router.post("/api/v1/servers", requireAuth, requireScope("servers:write"), async (req, res) => {
  const input = createServerSchema.parse(req.body);
  const server = await db.server.create(input);
  await db.audit.write(req, "server.created", { serverId: server.id });
  res.status(201).json({ data: server });
});

router.get("/api/v1/categories", async (_req, res) => {
  const rows = await db.category.listWithCounts();
  res.json({ data: rows });
});

router.get("/api/v1/stats/p99", async (req, res) => {
  const region = String(req.query.region || "all");
  const frame = await db.latency.percentiles({ region, window: "15m" });
  res.json({ data: frame, targetMs: 50, generatedAt: new Date().toISOString() });
});

export default router;
```

### Frontend Components

```tsx
export function ServerDirectory({ servers, categories }) {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <section className="grid gap-4 md:grid-cols-[280px_1fr]">
        <aside className="rounded-lg border p-4">
          <input aria-label="Search MCP servers" placeholder="Search servers" />
          {categories.map((category) => (
            <a key={category.slug} href={`/directory/${category.slug}`}>
              {category.name} ({category.count})
            </a>
          ))}
        </aside>
        <div className="grid gap-4 md:grid-cols-3">
          {servers.map((server) => (
            <article key={server.slug} className="rounded-lg border p-4">
              <h2>{server.name}</h2>
              <p>{server.description}</p>
              <a href={`/servers/${server.slug}`}>Setup guide</a>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
```

### P99 Dashboard

```ts
// WebSocket publisher backed by RedisTimeSeries
import { WebSocketServer } from "ws";
import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL!);
const wss = new WebSocketServer({ port: 8787 });

async function percentile(region: string, percentile: number) {
  const rows = await redis.call("TS.RANGE", `latency:${region}:tool_execution`, "-", "+", "AGGREGATION", "avg", 15000);
  const values = rows.map(([, value]) => Number(value)).sort((a, b) => a - b);
  return values[Math.floor((values.length - 1) * percentile)] ?? 0;
}

setInterval(async () => {
  const regions = ["in-mumbai", "in-bengaluru"];
  const frame = await Promise.all(regions.map(async (region) => ({
    region,
    p50: await percentile(region, 0.5),
    p90: await percentile(region, 0.9),
    p99: await percentile(region, 0.99),
    at: Date.now(),
  })));
  const payload = JSON.stringify({ type: "latency.frame", data: frame });
  wss.clients.forEach((client) => client.send(payload));
}, 15000);
```

### Security Patch

```ts
import { z } from "zod";
import crypto from "crypto";

const executionSchema = z.object({
  serverId: z.string().uuid(),
  tool: z.string().min(1).max(128),
  arguments: z.record(z.unknown()).default({}),
});

export function zeroTrustExecution(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth?.startsWith("Bearer ")) return res.status(401).json({ error: "missing_token" });
  const parsed = executionSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "invalid_payload", issues: parsed.error.issues });
  req.execution = parsed.data;
  req.requestHash = crypto.createHash("sha256").update(JSON.stringify(parsed.data)).digest("hex");
  return next();
}
```

```py
# NVD CVE scanner skeleton
import os, requests, sys

NVD = "https://services.nvd.nist.gov/rest/json/cves/2.0"

def scan_package(package_name: str):
    resp = requests.get(NVD, params={"keywordSearch": package_name}, headers={"apiKey": os.getenv("NVD_API_KEY", "")}, timeout=30)
    resp.raise_for_status()
    vulns = resp.json().get("vulnerabilities", [])
    critical = [v for v in vulns if "CRITICAL" in str(v)]
    return {"package": package_name, "count": len(vulns), "critical": len(critical)}

if __name__ == "__main__":
    for pkg in sys.argv[1:]:
        print(scan_package(pkg))
```

## PHASE 2: DEVELOPER ECOSYSTEM (Weeks 5-12)

Goal: win CLI-driven developers and make MCP server selection agent-native.

### CLI Tool

```ts
#!/usr/bin/env node
import { Command } from "commander";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

const program = new Command();

function claudeConfigPath() {
  if (process.platform === "darwin") return path.join(os.homedir(), "Library/Application Support/Claude/claude_desktop_config.json");
  if (process.platform === "win32") return path.join(os.homedir(), "AppData/Roaming/Claude/claude_desktop_config.json");
  return path.join(os.homedir(), ".config/Claude/claude_desktop_config.json");
}

async function install(server: string, opts: { oauth?: boolean }) {
  const response = await fetch(`https://mcpserver.in/api/v1/servers?q=${encodeURIComponent(server)}`);
  const listing = (await response.json()).data[0];
  if (!listing) throw new Error(`No MCP server found for ${server}`);

  const configPath = claudeConfigPath();
  const raw = await fs.readFile(configPath, "utf8").catch(() => "{}");
  const config = JSON.parse(raw);
  config.mcpServers ??= {};
  config.mcpServers[listing.slug] = {
    command: "npx",
    args: ["-y", listing.packageName],
    env: opts.oauth ? { MCP_OAUTH_TOKEN: "${MCP_OAUTH_TOKEN}" } : {},
  };
  await fs.mkdir(path.dirname(configPath), { recursive: true });
  await fs.writeFile(configPath, JSON.stringify(config, null, 2));
  console.log(`Installed ${listing.name} into ${configPath}`);
}

program.command("install <server>").option("--oauth", "start OAuth device flow").action(install);
program.parse();
```

### Agent Discovery

```py
from fastapi import FastAPI
from pydantic import BaseModel
from openai import OpenAI

app = FastAPI()
client = OpenAI()

class Query(BaseModel):
    text: str
    region: str = "in"
    max_results: int = 5

@app.post("/discover")
def discover(query: Query):
    embedding = client.embeddings.create(model="text-embedding-3-small", input=query.text).data[0].embedding
    # Replace with Pinecone or Weaviate vector search.
    matches = vector_index.search(embedding=embedding, filters={"verified": True}, limit=query.max_results)
    return {"query": query.text, "matches": matches}
```

### Local Emulator

```dockerfile
FROM node:22-slim
RUN apt-get update && apt-get install -y python3 python3-pip ca-certificates && rm -rf /var/lib/apt/lists/*
WORKDIR /workspace
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
ENV MCP_EMULATOR=true
EXPOSE 8788
CMD ["node", "dist/emulator.js"]
```

```bash
#!/usr/bin/env bash
set -euo pipefail
docker build -t mcpserver-local-emulator .
docker run --rm -it -p 8788:8788 --env-file .env.local mcpserver-local-emulator
```

### Interactive API Explorer

```ts
app.get("/openapi.json", (_req, res) => {
  res.json({
    openapi: "3.1.0",
    info: { title: "MCPserver API", version: "1.0.0" },
    paths: {
      "/api/v1/servers": { get: { summary: "List MCP servers" } },
      "/api/v1/stats/p99": { get: { summary: "Read latency percentiles" } },
    },
  });
});
```

## PHASE 3: INDIA-FIRST SUPREMACY (Weeks 13-24)

Goal: build a moat around Indian payments, SaaS, compliance, and data-localized AI.

### Payments

```ts
import Razorpay from "razorpay";

const razorpay = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID!, key_secret: process.env.RAZORPAY_KEY_SECRET! });

export async function create_payment_link({ amountInPaise, customer, purpose }) {
  return razorpay.paymentLink.create({
    amount: amountInPaise,
    currency: "INR",
    description: purpose,
    customer,
    notify: { sms: true, email: true },
  });
}
```

### Aadhaar Bridge

Use UIDAI offline XML verification only, never raw Aadhaar storage. Store salted verification fingerprints, consent receipts, and expiry timestamps.

```py
def verify_offline_xml(xml_bytes: bytes, share_code: str) -> dict:
    parsed = parse_uidai_xml(xml_bytes, share_code)
    assert validate_uidai_signature(parsed)
    return {
        "verified": True,
        "reference_id": parsed.reference_id,
        "name_hash": sha256(parsed.name.encode()).hexdigest(),
        "expires_at": parsed.generated_at + timedelta(days=30),
    }
```

### SaaS Connectors

Build REST-to-MCP adapters for Zoho CRM, Freshdesk, and Zerodha Kite with shared primitives: auth refresh, schema registry, input validation, and audit logging.

```ts
export const zohoTools = [
  {
    name: "zoho_search_leads",
    inputSchema: z.object({ query: z.string(), limit: z.number().max(25).default(10) }),
    handler: async ({ query, limit }, ctx) => ctx.zoho.get("/crm/v6/Leads/search", { params: { criteria: query, per_page: limit } }),
  },
];
```

### DPDP Suite

```py
from reportlab.platypus import SimpleDocTemplate, Paragraph

def build_data_fiduciary_report(path, evidence):
    doc = SimpleDocTemplate(path)
    story = [
      Paragraph("MCPserver.in Data Fiduciary Report", styles["Title"]),
      Paragraph(f"Encryption: {evidence['encryption']}", styles["BodyText"]),
      Paragraph(f"Consent coverage: {evidence['consent_coverage']}%", styles["BodyText"]),
      Paragraph(f"Retention policy: {evidence['retention_years']} years", styles["BodyText"]),
    ]
    doc.build(story)
```

## PHASE 4: ENTERPRISE GAUNTLET (Weeks 25-40)

Goal: justify Business and Enterprise pricing with governance, private networking, and SLA evidence.

### RBAC v2

```ts
type Policy = {
  effect: "allow" | "deny";
  action: string;
  resource: string;
  conditions?: Record<string, string>;
};

export function can(user, action: string, resource: string, context: Record<string, string>) {
  return user.policies.some((policy: Policy) =>
    policy.effect === "allow" &&
    policy.action === action &&
    policy.resource === resource &&
    Object.entries(policy.conditions ?? {}).every(([key, value]) => context[key] === value)
  );
}
```

### SAML/SSO

Use SAML 2.0 with Okta and Azure AD metadata ingestion, signed assertions, enforced audience validation, replay protection, and SCIM-ready deprovisioning.

### VPC Peering

```hcl
module "mcpserver_privatelink" {
  source = "./modules/privatelink"
  name = "mcpserver-enterprise"
  vpc_id = var.customer_vpc_id
  subnet_ids = var.private_subnet_ids
  allowed_principals = [var.mcpserver_aws_account_arn]
}
```

### SLA Monetization

```ts
export async function evaluateSlaCredit(orgId: string, window: string) {
  const breach = await metrics.p99BreachRate(orgId, window, { thresholdMs: 50 });
  if (breach <= 0.001) return null;
  const credit = await billing.credit(orgId, { reason: "P99_SLA_BREACH", amount: "10%" });
  await audit.writeSystem("sla.credit_issued", { orgId, breach, credit });
  return credit;
}
```

## PHASE 5: EXPLODING AI & AUTOMATION (Weeks 41-52)

Goal: self-improving infrastructure with optimization, prediction, and immutable compliance.

### Autonomous Optimizer

```py
class ToolDescriptionOptimizer:
    def observe(self, execution_log):
        return {
            "tool": execution_log["tool"],
            "success": execution_log["status"] == "ok",
            "latency": execution_log["latency_ms"],
            "retry_count": execution_log["retry_count"],
        }

    def propose(self, tool_schema, history):
        prompt = f"Rewrite this MCP tool description for precision: {tool_schema}"
        return llm.generate(prompt, constraints={"no_new_capabilities": True})
```

### Predictive Scaling

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: mcp-execution-workers
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: mcp-execution-workers
  minReplicas: 6
  maxReplicas: 200
  metrics:
    - type: Pods
      pods:
        metric:
          name: predicted_execution_rps
        target:
          type: AverageValue
          averageValue: "120"
```

### Blockchain Audit

```go
func SealExecution(hash string, chain Ledger) error {
  tx := LedgerTx{Hash: hash, Timestamp: time.Now().UTC(), Kind: "mcp.tool_execution"}
  return chain.Submit(tx)
}
```

## MARKETING & CONTENT GTM (Concurrent Execution)

### Community Hackathons

Run MCP Dev Summit Bengaluru as a hybrid event with a Rs 10 Lakhs prize pool, tracks for fintech, devtools, compliance, and Indic AI, plus partner credits from cloud and SaaS sponsors.

### Certification Program

MCP Architect, 40 hours: MCP fundamentals, server design, secure tool schemas, deployment, observability, DPDP/RBI compliance, VPC patterns, incident response, and capstone deployment.

### Blog Drafts

1. MCP p99 latency India: Mumbai vs Bengaluru edge routing.
2. DPDP compliant LLM tools for Indian enterprises.
3. AI agent infrastructure cost model for 50M daily executions.
4. MCP vs REST for SaaS teams.
5. How to scan MCP servers for CVEs.
6. Razorpay and PayU as MCP tools.
7. Building a private MCP directory for enterprises.
8. SAML and RBAC for AI agent tools.
9. Kubernetes isolation with gVisor and Kata.
10. Why MCP marketplaces need security scores.

## RISK MITIGATION & ARCHITECTURE CONSTRAINTS

Security: run untrusted tools in gVisor or Kata Containers, block instance metadata by default, restrict egress, enforce DNS allowlists, validate JSON schemas, redact secrets, and require human approval for high-risk write tools.

Cost: for 50M daily executions, start with 30-60 regional worker nodes, Redis cluster, Postgres primary plus read replicas, object storage for logs, and ClickHouse/OpenSearch for analytics. Use spot instances for stateless workers with on-demand baseline capacity. Keep gateway and audit ingestion on reserved/on-demand nodes.

Compliance: retain audit logs for 7 years, encrypt all event archives, store India-regulated data in Indian regions, support legal hold, and hash-chain execution evidence for tamper detection.

## Fibonacci Priority Matrix

| Feature | Impact | Effort | Score | Decision |
|---|---:|---:|---:|---|
| Public server directory | 13 | 3 | 4.33 | Accelerate |
| Categories | 8 | 2 | 4.00 | Accelerate |
| P99 dashboard | 13 | 5 | 2.60 | Accelerate |
| API docs | 8 | 3 | 2.67 | Accelerate |
| CLI install | 13 | 8 | 1.63 | Accelerate |
| Security score | 13 | 8 | 1.63 | Accelerate |
| CVE scanning | 13 | 8 | 1.63 | Accelerate |
| DPDP reports | 8 | 5 | 1.60 | Accelerate |
| Razorpay/PayU tools | 8 | 5 | 1.60 | Accelerate |
| SSO/SAML | 8 | 8 | 1.00 | Sequence after RBAC |
| VPC peering | 8 | 13 | 0.62 | Enterprise-only |
| Blockchain audit | 3 | 13 | 0.23 | Defer until demanded |
| Mobile app | 3 | 8 | 0.38 | Kill for now |
| Referral program | 2 | 3 | 0.67 | Defer |
| Hackathon platform | 5 | 5 | 1.00 | Run manually first |

## Execution Owners

Platform: API, DB, runtime isolation, latency ingestion.

Frontend: discovery pages, p99 dashboard, API explorer, enterprise pages.

Security: zero-trust middleware, CVE scanner, redaction, audit retention, container sandboxing.

Growth: blog, certification, hackathon, case studies, comparison pages.

Enterprise: RBAC, SAML, VPC modules, SLA credits, compliance reporting.
