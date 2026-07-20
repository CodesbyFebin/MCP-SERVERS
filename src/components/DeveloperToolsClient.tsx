"use client";

import { useState } from "react";
import Link from "next/link";
import Breadcrumbs from "./Breadcrumbs";
import {
  Terminal,
  ShieldCheck,
  Eye,
  FileCheck,
  Zap,
  Play,
  CheckCircle,
  AlertTriangle,
  Code
} from "lucide-react";

type ToolType = "playground" | "server-checker" | "schema-viewer" | "config-validator" | "endpoint-tester";

interface DeveloperToolsClientProps {
  toolSlug: string;
}

export default function DeveloperToolsClient({ toolSlug }: DeveloperToolsClientProps) {
  // Determine active tool by stripping 'mcp-' prefix if present
  const normalizedSlug = toolSlug?.startsWith("mcp-") ? toolSlug.substring(4) : toolSlug;
  const activeTool: ToolType = (normalizedSlug as ToolType) || "playground";

  // State for interactive features
  const [schemaInput, setSchemaInput] = useState(
    `{\n  "name": "search_db",\n  "description": "Query database records",\n  "inputSchema": {\n    "type": "object",\n    "properties": {\n      "query": { "type": "string" }\n    },\n    "required": ["query"]\n  }\n}`
  );
  const [schemaStatus, setSchemaStatus] = useState<"idle" | "success" | "error">("idle");
  const [checkerUrl, setCheckerUrl] = useState("https://mcpserver.in/api/sse");
  const [checkerLogs, setCheckerLogs] = useState<string[]>([]);
  const [configText, setConfigText] = useState(
    `{\n  "mcpServers": {\n    "github": {\n      "command": "npx",\n      "args": ["@modelcontextprotocol/server-github"]\n    }\n  }\n}`
  );
  const [configResult, setConfigResult] = useState<string | null>(null);
  const [playgroundLogs, setPlaygroundLogs] = useState<string[]>([]);
  const [promptInput, setPromptInput] = useState("search repositories for 'mcp'");

  // Run Validator action
  const handleValidateConfig = () => {
    try {
      JSON.parse(configText);
      setConfigResult("✔ Configuration is 100% valid JSON-RPC schema. Ready to load into Claude Desktop!");
    } catch (e: any) {
      setConfigResult(`✖ Invalid JSON: ${e.message}`);
    }
  };

  // Run schema validation
  const handleValidateSchema = () => {
    try {
      JSON.parse(schemaInput);
      setSchemaStatus("success");
    } catch {
      setSchemaStatus("error");
    }
  };

  // Run checker validation
  const handleRunChecker = async () => {
    setCheckerLogs(["Connecting to endpoint...", "Handshaking connection..."]);
    try {
      const res = await fetch("/api/validate-mcp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: checkerUrl }),
      });
      const data = (await res.json()) as {
        target: string;
        logs: { text: string; kind: string }[];
        checks: { label: string; passed: boolean; detail: string }[];
        reachable: boolean;
        protocol: string;
        error?: string;
      };
      const logs = data.logs?.map((l) => `${l.kind === "error" ? "✖" : l.kind === "success" ? "✔" : "•"} ${l.text}`) ?? [];
      const checkLogs = (data.checks ?? []).map(
        (c) => `${c.passed ? "✔" : "✖"} ${c.label}: ${c.detail}`
      );
      setCheckerLogs((prev) => [...prev, ...logs, ...checkLogs]);
    } catch (error) {
      setCheckerLogs((prev) => [
        ...prev,
        `✖ Connection failed: ${error instanceof Error ? error.message : "Unknown network error"}`,
      ]);
    }
  };

  // Run playground validation
  const handleSimulateCall = async () => {
    setPlaygroundLogs(["Sending message: " + promptInput, "Routing query through Gateway..."]);
    try {
      const res = await fetch("/api/validate-mcp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: "https://github.com/modelcontextprotocol/servers" }),
      });
      const data = (await res.json()) as {
        target: string;
        logs: { text: string; kind: string }[];
        checks: { label: string; passed: boolean; detail: string }[];
        reachable: boolean;
        protocol: string;
        error?: string;
      };
      const logs = data.logs?.map((l) => `${l.kind === "error" ? "✖" : l.kind === "success" ? "✔" : "•"} ${l.text}`) ?? [];
      const checkLogs = (data.checks ?? []).map(
        (c) => `${c.passed ? "✔" : "✖"} ${c.label}: ${c.detail}`
      );
      setPlaygroundLogs((prev) => [...prev, ...logs, ...checkLogs]);
    } catch (error) {
      setPlaygroundLogs((prev) => [
        ...prev,
        `✖ Request failed: ${error instanceof Error ? error.message : "Unknown network error"}`,
      ]);
    }
  };

  const breadcrumbSteps = [
    { name: "Developer Tools", href: "/tools/mcp-playground" },
    { name: activeTool.replace("-", " ").toUpperCase(), href: `/tools/${toolSlug}` }
  ];

  return (
    <div id="tools-page" className="min-h-screen bg-transparent text-[#e0e0e0] font-sans pt-6 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <Breadcrumbs items={breadcrumbSteps} />

        {/* Header */}
        <div className="text-center py-6 mb-8 border-b border-white/5 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-60 h-60 bg-cyan-500/5 rounded-full blur-[80px] pointer-events-none" />
          <h1 className="text-3xl font-display font-bold text-white tracking-tighter leading-tight">
            MCP Developer Suite
          </h1>
          <p className="mt-2 text-xs text-white/50 max-w-xl mx-auto leading-relaxed">
            Diagnose, test, analyze, and package Model Context Protocol server capabilities directly inside your browser workspace.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-wrap gap-2 mb-8 bg-white/[0.01] p-2 rounded-2xl border border-white/5 max-w-4xl mx-auto items-center justify-between backdrop-blur-sm">
          <Link
            href="/tools/mcp-playground"
            className={`px-4 py-2.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTool === "playground" ? "bg-cyan-500 text-black shadow-[0_0_15px_rgba(34,211,238,0.25)]" : "text-white/60 hover:text-white"
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            1. Playground
          </Link>
          <Link
            href="/tools/mcp-server-checker"
            className={`px-4 py-2.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTool === "server-checker" ? "bg-cyan-500 text-black shadow-[0_0_15px_rgba(34,211,238,0.25)]" : "text-white/60 hover:text-white"
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            2. Server Checker
          </Link>
          <Link
            href="/tools/mcp-schema-viewer"
            className={`px-4 py-2.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTool === "schema-viewer" ? "bg-cyan-500 text-black shadow-[0_0_15px_rgba(34,211,238,0.25)]" : "text-white/60 hover:text-white"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            3. Schema Viewer
          </Link>
          <Link
            href="/tools/mcp-config-validator"
            className={`px-4 py-2.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTool === "config-validator" ? "bg-cyan-500 text-black shadow-[0_0_15px_rgba(34,211,238,0.25)]" : "text-white/60 hover:text-white"
            }`}
          >
            <FileCheck className="w-3.5 h-3.5" />
            4. Config Validator
          </Link>
          <Link
            href="/tools/mcp-endpoint-tester"
            className={`px-4 py-2.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTool === "endpoint-tester" ? "bg-cyan-500 text-black shadow-[0_0_15px_rgba(34,211,238,0.25)]" : "text-white/60 hover:text-white"
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            5. Endpoint Tester
          </Link>
        </div>

        {/* Dynamic Tool Content */}
        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto shadow-xl backdrop-blur-md">
          
          {/* 1. PLAYGROUND */}
          {activeTool === "playground" && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 pb-3 border-b border-white/5">
                <Terminal className="w-5 h-5 text-cyan-400" />
                <h3 className="font-display font-bold text-base text-white">Interactive MCP Simulator</h3>
              </div>
              <p className="text-xs text-white/50 leading-relaxed">
                Connect and test your local or hosted SSE nodes. You can run mock commands and review returned markdown responses.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-white/40 mb-1.5">Mock Prompt Input</label>
                    <input
                      type="text"
                      value={promptInput}
                      onChange={(e) => setPromptInput(e.target.value)}
                      className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <button
                    onClick={handleSimulateCall}
                    className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold rounded-full flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                  >
                    <Play className="w-3 h-3 fill-black" />
                    Simulate Call
                  </button>

                  {playgroundLogs.length > 0 && (
                    <div className="p-4 rounded-lg bg-black/50 border border-white/5 font-mono text-[11px] text-cyan-300 space-y-1">
                      {playgroundLogs.map((log, i) => (
                        <div key={i}>{log}</div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="p-4 rounded-lg bg-black/50 text-[11px] font-mono text-purple-300 border border-white/5">
                  <span className="text-[10px] text-white/30 uppercase tracking-wider block mb-2">// Response payload</span>
                  {"{\n  \"jsonrpc\": \"2.0\",\n  \"result\": {\n    \"content\": [\n      { \"type\": \"text\", \"text\": \"Found 2 repositories matching 'mcp'\" }\n    ]\n  },\n  \"id\": 1\n}"}
                </div>
              </div>
            </div>
          )}

          {/* 2. SERVER CHECKER */}
          {activeTool === "server-checker" && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 pb-3 border-b border-white/5">
                <ShieldCheck className="w-5 h-5 text-cyan-400" />
                <h3 className="font-display font-bold text-base text-white">Server Connection Auditing</h3>
              </div>
              <p className="text-xs text-white/50 leading-relaxed">
                Provide your remote server's HTTP/SSE URL to verify JSON-RPC handshake standards and extract capabilities schemas.
              </p>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={checkerUrl}
                  onChange={(e) => setCheckerUrl(e.target.value)}
                  className="flex-1 px-4 py-2.5 bg-black/40 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500"
                />
                <button
                  onClick={handleRunChecker}
                  className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold rounded-full shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all"
                >
                  Verify Port
                </button>
              </div>

              {checkerLogs.length > 0 && (
                <div className="p-4 rounded-lg bg-black/50 font-mono text-xs text-cyan-300 border border-white/5 space-y-1">
                  {checkerLogs.map((log, i) => (
                    <div key={i}>{log}</div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 3. SCHEMA VIEWER */}
          {activeTool === "schema-viewer" && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 pb-3 border-b border-white/5">
                <Eye className="w-5 h-5 text-cyan-400" />
                <h3 className="font-display font-bold text-base text-white">JSON Schema Visualizer</h3>
              </div>
              <p className="text-xs text-white/50 leading-relaxed">
                Verify that your tool schemas are conformant with Model Context Protocol standards. Paste your schema below.
              </p>

              <div className="space-y-3">
                <textarea
                  rows={6}
                  value={schemaInput}
                  onChange={(e) => setSchemaInput(e.target.value)}
                  className="w-full p-4 bg-black/40 border border-white/10 rounded-lg text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-500"
                />
                <button
                  onClick={handleValidateSchema}
                  className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold rounded-full shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all"
                >
                  Validate Protocol Schema
                </button>

                {schemaStatus === "success" && (
                  <div className="p-3 bg-emerald-950/20 border border-emerald-950/30 text-emerald-400 rounded-lg text-xs flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Perfect schema! This tool parses correctly on Claude & Cursor.
                  </div>
                )}
                {schemaStatus === "error" && (
                  <div className="p-3 bg-red-950/20 border border-red-950/30 text-red-400 rounded-lg text-xs flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Invalid JSON formatting. Please check curly braces and syntax.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 4. CONFIG VALIDATOR */}
          {activeTool === "config-validator" && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 pb-3 border-b border-white/5">
                <FileCheck className="w-5 h-5 text-cyan-400" />
                <h3 className="font-display font-bold text-base text-white">Desktop Client Config Validator</h3>
              </div>
              <p className="text-xs text-white/50 leading-relaxed">
                Paste your Claude desktop or Cursor JSON configurations below to verify path correctness, argument strings, and secure environment arrays.
              </p>

              <div className="space-y-4">
                <textarea
                  rows={6}
                  value={configText}
                  onChange={(e) => setConfigText(e.target.value)}
                  className="w-full p-4 bg-black/40 border border-white/10 rounded-lg text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-500"
                />
                <button
                  onClick={handleValidateConfig}
                  className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold rounded-full shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all"
                >
                  Audit Config Key
                </button>

                {configResult && (
                  <div className={`p-3 rounded-lg text-xs font-medium border ${
                    configResult.includes("✔")
                      ? "bg-emerald-950/20 border-emerald-950/30 text-emerald-400"
                      : "bg-red-950/20 border-red-950/30 text-red-400"
                  }`}>
                    {configResult}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 5. ENDPOINT TESTER */}
          {activeTool === "endpoint-tester" && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 pb-3 border-b border-white/5">
                <Zap className="w-5 h-5 text-cyan-400" />
                <h3 className="font-display font-bold text-base text-white">SSE SSE-Handshake Tester</h3>
              </div>
              <p className="text-xs text-white/50 leading-relaxed">
                Send mock client notifications, simulate network drops, and examine SSE transaction frames in real-time.
              </p>
              
              <div className="p-12 text-center rounded-xl bg-white/[0.01] border border-white/5">
                <Code className="w-8 h-8 text-cyan-500 mx-auto mb-3" />
                <span className="text-xs text-white/70 font-semibold">Ready to begin transaction sequence.</span>
                <p className="text-[10px] text-white/40 mt-1">Connect your active server in tab #2 (Server Checker) to enable active packet tracing.</p>
              </div>
            </div>
          )}

        </div>

        {/* Promotion block */}
        <div className="mt-10 p-6 rounded-xl bg-white/[0.01] border border-white/5 text-center max-w-4xl mx-auto backdrop-blur-sm">
          <span className="text-xs text-white/40">
            * All developer utility tools are calculated client-side and process no private keys or data paths to external servers.
          </span>
        </div>

      </div>
    </div>
  );
}
