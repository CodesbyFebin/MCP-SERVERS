import type { Metadata } from "next";
import Breadcrumbs from "../../src/components/Breadcrumbs";
import { Terminal, BookOpen, Key, ShieldCheck } from "lucide-react";
import { injectGlossaryLinks } from "../../src/lib/glossaryHelper";

export const metadata: Metadata = {
  title: "Model Context Protocol (MCP) Documentation - MCPserver.in",
  description: "Examine deployment, config, security, and hosting guides for the Model Context Protocol (MCP). Integrate Claude, Cursor, and custom agents.",
};

export default function Docs() {
  const breadcrumbSteps = [{ name: "Documentation", href: "/docs" }];

  // Wrap document paragraphs with the glossary contextual linking engine
  const mcpIntroHtml = injectGlossaryLinks(`
    <p>
      Model Context Protocol (MCP) is an open-source standard created by Anthropic that allows AI clients (like Claude Desktop, Cursor, and custom agents) to securely communicate with external databases, filesystems, and APIs through a unified protocol.
    </p>
    <p>
      Instead of writing custom API integration scripts for each separate tool, you build or deploy an MCP server once. It describes its capabilities dynamically to any compliant model using strict JSON-RPC schemas.
    </p>
  `);

  const localInstallHtml = injectGlossaryLinks(`
    <p>
      Most MCP servers can run locally over Stdio pipes using standard package managers. Below is the configuration syntax for launching a Postgres database tool interface.
    </p>
  `);

  const authHtml = injectGlossaryLinks(`
    <p>
      When connecting servers that interact with third-party web apps (like GitHub, Slack, or Notion), you must supply authorization tokens safely using environment arrays inside your config files.
    </p>
    <p className="text-xs text-gray-500">
      Tip: Never hardcode private API keys in client-side code blocks. Always reference them inside 'env' property blocks.
    </p>
  `);

  const prodHtml = injectGlossaryLinks(`
    <p>
      Running MCP servers locally works well for individual testing, but doesn't scale for cloud applications, web portals, or distributed agent teams.
    </p>
    <p>
      With MCPserver.in, you deploy standard container clusters in Bengaluru and Mumbai. Your node exposes web SSE endpoints, protected by TLS 1.3 and advanced custom authorization headers, ensuring sub-50ms roundtrip handshakes from anywhere in India.
    </p>
  `);

  return (
    <div id="docs-page" className="min-h-screen bg-[#050508] text-white pt-6 pb-16 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <Breadcrumbs items={breadcrumbSteps} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-4">
          
          {/* Side Menu */}
          <div className="lg:col-span-3 space-y-6">
            <div className="p-4 rounded-xl bg-gray-900/20 border border-gray-900">
              <h3 className="font-sans font-bold text-xs uppercase tracking-wider text-gray-400 mb-3">Quick Start Guides</h3>
              <ul className="space-y-2 text-xs">
                <li><a href="#intro" className="text-cyan-400 hover:underline block py-0.5">Introduction to MCP</a></li>
                <li><a href="#quickstart" className="text-gray-400 hover:text-white block py-0.5">Local Installation</a></li>
                <li><a href="#config" className="text-gray-400 hover:text-white block py-0.5">Claude & Cursor Config</a></li>
                <li><a href="#deployment" className="text-gray-400 hover:text-white block py-0.5">Managed Edge Hosting</a></li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-gray-900/20 border border-gray-900">
              <h3 className="font-sans font-bold text-xs uppercase tracking-wider text-gray-400 mb-3">Protocol Primitives</h3>
              <ul className="space-y-2 text-xs">
                <li><span className="text-gray-500 block py-0.5">✔ Tool Schemas</span></li>
                <li><span className="text-gray-500 block py-0.5">✔ Resource Templates</span></li>
                <li><span className="text-gray-500 block py-0.5">✔ Prompt Templates</span></li>
                <li><span className="text-gray-500 block py-0.5">✔ Event-Driven Changes</span></li>
              </ul>
            </div>
          </div>

          {/* Main Doc text */}
          <div className="lg:col-span-9 space-y-8 text-xs sm:text-sm text-gray-300 leading-relaxed">
            
            <section id="intro" className="space-y-3 pb-6 border-b border-gray-900">
              <h1 className="text-2xl sm:text-3xl font-sans font-bold text-white tracking-tight flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-cyan-400" />
                Introduction to Model Context Protocol
              </h1>
              <div className="space-y-3" dangerouslySetInnerHTML={{ __html: mcpIntroHtml }} />
            </section>

            <section id="quickstart" className="space-y-3 pb-6 border-b border-gray-900">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Terminal className="w-4.5 h-4.5 text-cyan-400" />
                Setting up Local Integrations
              </h2>
              <div className="mb-4 text-gray-300" dangerouslySetInnerHTML={{ __html: localInstallHtml }} />
              
              <pre className="p-4 rounded-lg bg-black text-cyan-300 font-mono text-[11px] border border-gray-900 leading-relaxed">
{`{
  "mcpServers": {
    "postgres-local": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres", "postgresql://localhost:5432/mydb"]
    }
  }
}`}
              </pre>
            </section>

            <section id="config" className="space-y-3 pb-6 border-b border-gray-900">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Key className="w-4.5 h-4.5 text-cyan-400" />
                Configuring Authorization Keys
              </h2>
              <div className="space-y-3" dangerouslySetInnerHTML={{ __html: authHtml }} />
            </section>

            <section id="deployment" className="space-y-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4.5 h-4.5 text-emerald-400" />
                Production Managed Edge Deployments
              </h2>
              <div className="space-y-3" dangerouslySetInnerHTML={{ __html: prodHtml }} />
            </section>

          </div>

        </div>

      </div>
    </div>
  );
}
