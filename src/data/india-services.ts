export interface IndiaServiceIntegration {
  slug: string;
  name: string;
  category: string;
  summary: string;
  authPattern: string;
  serverCode: string;
  communityPackage?: {
    name: string;
    npmUrl: string;
    note: string;
  };
  disclaimer: string;
}

export const indiaServices: IndiaServiceIntegration[] = [
  {
    slug: "razorpay",
    name: "Razorpay",
    category: "Payments",
    summary:
      "Razorpay is one of the most widely used payment gateways for Indian businesses, supporting UPI, cards, netbanking, and wallets. A minimal MCP server exposes order creation and payment lookup as tools an AI agent can call.",
    authPattern: "HTTP Basic Auth using your Razorpay key_id and key_secret. Always start with test-mode keys (prefixed rzp_test_).",
    serverCode: `import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

const server = new McpServer({ name: "razorpay-mcp", version: "1.0.0" });

server.tool(
  "create_order",
  "Create a Razorpay payment order",
  {
    amountInPaise: z.number().describe("Amount in paise (e.g. 50000 = INR 500)"),
    currency: z.string().default("INR"),
    receipt: z.string(),
  },
  async ({ amountInPaise, currency, receipt }) => {
    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency,
      receipt,
    });
    return { content: [{ type: "text", text: JSON.stringify(order) }] };
  }
);

server.tool(
  "get_payment",
  "Fetch a Razorpay payment by ID",
  { paymentId: z.string() },
  async ({ paymentId }) => {
    const payment = await razorpay.payments.fetch(paymentId);
    return { content: [{ type: "text", text: JSON.stringify(payment) }] };
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);`,
    communityPackage: {
      name: "razorpay-mcp",
      npmUrl: "https://www.npmjs.com/package/razorpay-mcp",
      note: "A community-maintained package also exists on npm. Review its source before pointing it at live payment credentials — the custom server above uses only the official Razorpay Node SDK.",
    },
    disclaimer: "Test-mode keys only in any example configuration. Never commit live key_secret values to version control.",
  },
  {
    slug: "zoho-crm",
    name: "Zoho CRM",
    category: "SaaS / CRM",
    summary:
      "Zoho CRM is a widely used CRM platform among Indian SMBs and enterprises. It authenticates via OAuth 2.0 with a refresh token, and its REST API is region-specific — accounts created in the India data center use zohoapis.in, not .com.",
    authPattern: "OAuth 2.0 refresh-token flow. Exchange your refresh token for a short-lived access token before each session, then send it as an Authorization: Zoho-oauthtoken header.",
    serverCode: `import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const ZOHO_ACCOUNTS_URL = process.env.ZOHO_ACCOUNTS_URL ?? "https://accounts.zoho.in";
const ZOHO_API_URL = process.env.ZOHO_API_URL ?? "https://www.zohoapis.in";

async function getAccessToken(): Promise<string> {
  const params = new URLSearchParams({
    refresh_token: process.env.ZOHO_REFRESH_TOKEN!,
    client_id: process.env.ZOHO_CLIENT_ID!,
    client_secret: process.env.ZOHO_CLIENT_SECRET!,
    grant_type: "refresh_token",
  });
  const res = await fetch(\`\${ZOHO_ACCOUNTS_URL}/oauth/v2/token?\${params}\`, { method: "POST" });
  const data = await res.json();
  return data.access_token;
}

const server = new McpServer({ name: "zoho-crm-mcp", version: "1.0.0" });

server.tool(
  "list_leads",
  "List recent leads from Zoho CRM",
  { perPage: z.number().max(50).default(10) },
  async ({ perPage }) => {
    const token = await getAccessToken();
    const res = await fetch(\`\${ZOHO_API_URL}/crm/v2/Leads?per_page=\${perPage}\`, {
      headers: { Authorization: \`Zoho-oauthtoken \${token}\` },
    });
    const data = await res.json();
    return { content: [{ type: "text", text: JSON.stringify(data) }] };
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);`,
    communityPackage: {
      name: "@macnishio/zoho-mcp-server",
      npmUrl: "https://www.npmjs.com/package/@macnishio/zoho-mcp-server",
      note: "A community-maintained package exists on npm. As with any third-party package handling CRM credentials, review the source before use in production.",
    },
    disclaimer: "The India data center uses zohoapis.in / accounts.zoho.in. Using the .com endpoints against an India-region account will fail authentication.",
  },
];
