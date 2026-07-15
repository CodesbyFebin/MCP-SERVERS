"use client";

import { useState } from "react";
import { Terminal, Shield, Cpu, RefreshCw, Layers } from "lucide-react";

type CodeLang = "curl" | "python" | "nodejs" | "claude";

export default function ProductDemo() {
  const [activeLang, setActiveLang] = useState<CodeLang>("curl");

  const codeBlocks: Record<CodeLang, { code: string; title: string }> = {
    curl: {
      title: "Query MCP server over SSE with cURL",
      code: `curl -X POST https://api.mcpserver.in/v1/mcp/github \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "jsonrpc": "2.0",
    "method": "tools/call",
    "params": {
      "name": "search_repositories",
      "arguments": {
        "query": "mcp-server language:typescript"
      }
    },
    "id": 1
  }'`
    },
    python: {
      title: "Connect Python MCP SDK client",
      code: `import asyncio
from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client

server_params = StdioServerParameters(
    command="npx",
    args=["-y", "@modelcontextprotocol/server-github"],
    env={"GITHUB_PERSONAL_ACCESS_TOKEN": "YOUR_TOKEN"}
)

async def main():
    async with stdio_client(server_params) as (read_stream, write_stream):
        async with ClientSession(read_stream, write_stream) as session:
            await session.initialize()
            
            # Retrieve active tools
            tools = await session.list_tools()
            print("Registered Tools:", tools)

asyncio.run(main())`
    },
    nodejs: {
      title: "TypeScript / Node.js standard client setup",
      code: `import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const transport = new StdioClientTransport({
  command: "npx",
  args: ["-y", "@modelcontextprotocol/server-postgres", "postgresql://localhost:5432/mydb"]
});

const client = new Client({
  name: "mcp-demo-client",
  version: "1.0.0"
});

await client.connect(transport);
const result = await client.callTool({
  name: "query",
  arguments: { sql: "SELECT name FROM users LIMIT 5" }
});
console.log("SQL Result:", result.content);`
    },
    claude: {
      title: "Configure local Claude Desktop integrations",
      code: `{
  "mcpServers": {
    "github-mcp": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "YOUR_PERSONAL_TOKEN"
      }
    },
    "postgres-mcp": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres", "postgresql://localhost:5432/mydb"]
    }
  }
}`
    }
  };

  const responseJson = `{
  "jsonrpc": "2.0",
  "result": {
    "content": [
      {
        "type": "text",
        "text": "### Repository Search Results\\n\\n1. **mcpserver-in/mcpserver** - Fully managed hosting standard for MCP servers\\n2. **modelcontextprotocol/typescript-sdk** - Official Anthropic SDK node..."
      }
    ]
  },
  "id": 1
}`;

  return (
    <div className="w-full max-w-5xl mx-auto rounded-2xl bg-[#09090e] border border-gray-800 overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.1)]">
      
      {/* Console bar */}
      <div className="px-5 py-3.5 bg-[#030305] border-b border-gray-900 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="text-xs font-mono text-gray-400 pl-3 border-l border-gray-800 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            mcpserver-v1.0.0-gateway
          </span>
        </div>
        <div className="flex items-center gap-4 text-[10px] text-gray-500 font-mono">
          <span className="flex items-center gap-1"><Shield className="w-3 h-3 text-emerald-500" /> TLS 1.3 SECURE</span>
          <span className="flex items-center gap-1"><RefreshCw className="w-3 h-3 text-cyan-500" /> SSE ROUTED</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        
        {/* Code tabs selector & Code block */}
        <div className="lg:col-span-7 p-6 border-r border-gray-900 flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap gap-2 mb-4">
              {(Object.keys(codeBlocks) as CodeLang[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setActiveLang(lang)}
                  className={`px-3 py-1.5 rounded text-xs font-mono transition-all ${
                    activeLang === lang
                      ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                      : "bg-gray-950 text-gray-400 border border-transparent hover:text-white"
                  }`}
                >
                  {lang === "curl" && "cURL (SSE API)"}
                  {lang === "python" && "Python SDK"}
                  {lang === "nodejs" && "Node.js (TS)"}
                  {lang === "claude" && "Claude Settings"}
                </button>
              ))}
            </div>

            <div className="text-xs text-gray-500 font-sans mb-3 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-gray-600" />
              {codeBlocks[activeLang].title}
            </div>

            <pre className="p-4 rounded-lg bg-black text-[11px] font-mono text-cyan-300 leading-relaxed overflow-x-auto border border-gray-950 max-h-[300px]">
              <code>{codeBlocks[activeLang].code}</code>
            </pre>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-950 flex items-center justify-between text-[10px] text-gray-500">
            <span>* Replace 'YOUR_API_KEY' with credentials from settings.</span>
            <span>UTF-8 ENCODED</span>
          </div>
        </div>

        {/* Live Response Panel */}
        <div className="lg:col-span-5 p-6 bg-[#030306]/60 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-950">
              <span className="text-xs font-semibold text-gray-200 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-purple-400" />
                Live Handshake Response
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950/40 text-emerald-400 border border-emerald-900/40 font-mono">200 OK</span>
            </div>

            <pre className="p-4 rounded-lg bg-black text-[11px] font-mono text-purple-300 leading-relaxed overflow-x-auto border border-gray-950 max-h-[300px]">
              <code>{responseJson}</code>
            </pre>
          </div>

          <div className="mt-4 text-[10px] text-gray-500 font-mono flex items-center justify-between">
            <span>Latency: <strong className="text-cyan-400">14ms</strong> (HSR Hub)</span>
            <span>Content-Type: application/json</span>
          </div>
        </div>

      </div>
    </div>
  );
}
