"use client";

import { useState } from "react";
import { Copy, Check, Play, ChevronDown, Terminal } from "lucide-react";

type Language = "TypeScript" | "Python" | "Node.js";
type Version = "latest" | "1.0.0" | "0.9.0";

const LANGUAGES: Language[] = ["TypeScript", "Python", "Node.js"];
const VERSIONS: Version[] = ["latest", "1.0.0", "0.9.0"];

const SNIPPETS: Record<Language, Record<Version, string>> = {
  TypeScript: {
    latest: `import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({ name: "docs-demo", version: "1.0.0" });

server.tool(
  "search",
  "Search docs for a query",
  { query: z.string() },
  async ({ query }) => ({
    content: [{ type: "text", text: \`Results for: \${query}\` }]
  })
);

await server.connect(new StdioServerTransport());`,
    "1.0.0": `import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new McpServer({ name: "docs-demo", version: "1.0.0" });

server.tool(
  "search",
  "Search docs for a query",
  { query: { type: "string" } },
  async ({ query }) => ({ content: [{ type: "text", text: \`Results for: \${query}\` }] })
);

await server.connect(new StdioServerTransport());`,
    "0.9.0": `import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new Server(
  { name: "docs-demo", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

server.setRequestHandler("tools/list", async () => ({ tools: [] }));
server.setRequestHandler("tools/call", async (req) => ({
  content: [{ type: "text", text: "Result" }]
}));

await server.connect(new StdioServerTransport());`,
  },
  Python: {
    latest: `from mcp.server import Server
from mcp.server.stdio import stdio_server

app = Server("docs-demo")

@app.tool()
async def search(query: str) -> str:
    return f"Results for: {query}"

async def main():
    async with stdio_server() as (read_stream, write_stream):
        await app.run(read_stream, write_stream)`,
    "1.0.0": `from mcp.server import Server
from mcp.server.stdio import stdio_server

app = Server("docs-demo")

@app.tool()
async def search(query: str) -> str:
    return f"Results for: {query}"

async def main():
    async with stdio_server() as (read_stream, write_stream):
        await app.run(read_stream, write_stream)`,
    "0.9.0": `import asyncio
from mcp.server import Server
from mcp.server.stdio import stdio_server

server = Server("docs-demo")

@server.tool()
async def search(query: str) -> str:
    return f"Results for: {query}"

async def main():
    async with stdio_server() as streams:
        await server.run(*streams)`,
  },
  "Node.js": {
    latest: `import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new McpServer({ name: "docs-demo", version: "1.0.0" });

server.tool(
  "search",
  "Search docs for a query",
  { query: z.string() },
  async ({ query }) => ({ content: [{ type: "text", text: \`Results for: \${query}\` }] })
);

await server.connect(new StdioServerTransport());`,
    "1.0.0": `import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new McpServer({ name: "docs-demo", version: "1.0.0" });

server.tool(
  "search",
  "Search docs for a query",
  { query: { type: "string" } },
  async ({ query }) => ({ content: [{ type: "text", text: \`Results for: \${query}\` }] })
);

await server.connect(new StdioServerTransport());`,
    "0.9.0": `const { Server } = require("@modelcontextprotocol/sdk/server/index.js");
const { StdioServerTransport } = require("@modelcontextprotocol/sdk/server/stdio.js");

const server = new Server(
  { name: "docs-demo", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

server.setRequestHandler("tools/list", async () => ({ tools: [] }));
server.setRequestHandler("tools/call", async (req) => ({
  content: [{ type: "text", text: "Result" }]
}));

await server.connect(new StdioServerTransport());`,
  },
};

const CONFIG_SNIPPETS: Record<Version, string> = {
  latest: `{
  "mcpServers": {
    "docs-demo": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-docs-demo"],
      "env": {
        "DOCS_API_KEY": "${"<your-api-key>"}"
      }
    }
  }
}`,
  "1.0.0": `{
  "mcpServers": {
    "docs-demo": {
      "command": "npx",
      "args": ["@modelcontextprotocol/sdk@1.0.0", "server-docs-demo"]
    }
  }
}`,
  "0.9.0": `{
  "mcpServers": {
    "docs-demo": {
      "command": "node",
      "args": ["./dist/docs-demo-server.js"]
    }
  }
}`,
};

export default function SdkWorkbenchClient() {
  const [language, setLanguage] = useState<Language>("TypeScript");
  const [version, setVersion] = useState<Version>("latest");
  const [copied, setCopied] = useState(false);
  const [copiedConfig, setCopiedConfig] = useState(false);
  const [runOutput, setRunOutput] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const code = SNIPPETS[language]?.[version] ?? "";
  const config = CONFIG_SNIPPETS[version] ?? "";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  };

  const handleCopyConfig = async () => {
    try {
      await navigator.clipboard.writeText(config);
      setCopiedConfig(true);
      setTimeout(() => setCopiedConfig(false), 1500);
    } catch {
      // ignore
    }
  };

  const handleRun = async () => {
    setIsRunning(true);
    setRunOutput(null);
    await new Promise((resolve) => setTimeout(resolve, 900));
    setRunOutput("Tool registered successfully. Server is ready for JSON-RPC calls.");
    setIsRunning(false);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex items-center gap-2 mb-6">
        <Terminal className="w-5 h-5 text-cyan-400" />
        <h1 className="text-2xl font-bold text-white">MCP SDK Workbench</h1>
      </div>
      <p className="text-sm text-slate-400 mb-6">
        Browse runnable SDK snippets for Python, TypeScript, and Node.js. Copy code, switch versions, and preview config without leaving the docs.
      </p>

      <div className="rounded-xl border border-white/10 bg-black/40 overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/5 px-4 py-3">
          <div className="flex flex-wrap items-center gap-2">
            {LANGUAGES.map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${
                  language === lang
                    ? "bg-cyan-500 text-black"
                    : "text-white/70 hover:text-white border border-white/10"
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          <div className="relative">
            <select
              value={version}
              onChange={(e) => setVersion(e.target.value as Version)}
              className="appearance-none bg-black/40 border border-white/10 text-white text-xs rounded-md pl-3 pr-8 py-1.5"
            >
              {VERSIONS.map((v) => (
                <option key={v} value={v}>
                  v{v}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/60 pointer-events-none" />
          </div>
        </div>

        <div className="relative">
          <pre className="overflow-x-auto p-4 text-xs leading-6 text-cyan-100">
            <code>{code}</code>
          </pre>
          <button
            type="button"
            onClick={handleCopy}
            className="absolute top-3 right-3 flex items-center gap-1.5 rounded-md border border-white/10 bg-black/60 px-2 py-1 text-[11px] font-semibold text-slate-300 transition hover:border-cyan-400/40 hover:text-cyan-200"
          >
            {copied ? <Check className="h-3 w-3 text-emerald-300" /> : <Copy className="h-3 w-3" />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>

        <div className="border-t border-white/5 p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Claude Desktop config</div>
              <pre className="mt-2 overflow-x-auto rounded-lg border border-white/5 bg-black/60 p-3 text-[11px] leading-6 text-cyan-100">
                <code>{config}</code>
              </pre>
            </div>
            <button
              type="button"
              onClick={handleCopyConfig}
              className="flex items-center gap-1.5 rounded-md border border-white/10 bg-black/60 px-2 py-1 text-[11px] font-semibold text-slate-300 transition hover:border-cyan-400/40 hover:text-cyan-200"
            >
              {copiedConfig ? <Check className="h-3 w-3 text-emerald-300" /> : <Copy className="h-3 w-3" />}
              {copiedConfig ? "Copied" : "Copy"}
            </button>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleRun}
              disabled={isRunning}
              className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-xs font-semibold transition ${
                isRunning
                  ? "border-white/10 text-white/40"
                  : "border-cyan-400/30 text-cyan-200 hover:bg-cyan-400/10"
              }`}
            >
              <Play className="h-3.5 w-3.5" />
              {isRunning ? "Running..." : "Simulate tool call"}
            </button>
            {runOutput && (
              <div className="rounded-lg border border-emerald-400/20 bg-emerald-400/5 px-3 py-2 text-xs text-emerald-200">
                {runOutput}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
