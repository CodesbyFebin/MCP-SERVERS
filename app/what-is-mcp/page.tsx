import { Metadata } from "next";
import WhatIsMcpClient from "./WhatIsMcpClient";

export const metadata: Metadata = {
  title: "What Is MCP (Model Context Protocol)? - Model Context Protocol Hub",
  description: "Learn what the Model Context Protocol (MCP) is, how client-server connections work, and explore our comprehensive directory of supported integrations and related topics.",
  alternates: {
    canonical: "/what-is-mcp",
    languages: {
      "en-IN": "/what-is-mcp",
      "en": "/what-is-mcp",
        }
  },

};

export default function Page() {
  return (
    <div className="min-h-screen bg-[#050508] text-white py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6">What Is MCP (Model Context Protocol)?</h1>
        <p className="text-gray-400 mb-8">Community contributors have built 100+ MCP-compatible servers on India-first edge infrastructure to power AI applications.</p>

        <article class="answer-block definition">
          <h2>Definition</h2>
          <p>The Model Context Protocol (MCP) is an open standard that enables AI applications to discover, call, and manage external tools, resources, and prompts through a unified client-server interface. It replaces fragmented API integrations with a single, standardized protocol every MCP-compatible model can support.</p>
        </article>

        <article class="answer-block key-takeways">
          <h2>Key Takeaways</h2>
          <ul>
            <li>MCP standardizes tool discovery and invocation for AI applications</li>
            <li>Replaces one-off API integrations with a unified framework</li>
            <li>Enables LLM-native tool calling with schema validation</li>
          </ul>
        </article>

        <article class="answer-block steps">
          <h2>Step-by-Step Process</h2>
          <ol>
            <li>Install the MCP server SDK</li>
            <li>Define tools with clear input/output schemas</li>
            <li>Run the server over stdio/SSE/Streamable HTTP</li>
            <li>Integrate with your AI client (Claude, Llama, etc.)</li>
          </ol>
        </article>

        <article class="answer-block comparison">
          <h2>Comparison Table</h2>
          <table class="table">
            <tr>
              <th>Feature</th>
              <td>Benefit</td>
            </tr>
            <tr>
              <td>Standardized Interface</td>
              <td>Eliminates custom API adapters</td>
            </tr>
            <tr>
              <td>Schema Validation</td>
              <td>Ensures type-safe tool calling</td>
            </tr>
            <tr>
              <td>Security Controls</td>
              <td>OAuth scopes and session isolation</td>
            </tr>
          </table>
        </article>

        <article class="answer-block troubleshoot">
          <h2>Troubleshooting</h2>
          <ul>
            <li><strong>Server not found:</strong> Verify SDK installation and environment variables</li>
            <li><strong>Authentication fails:</strong> Check OAuth configuration and scopes</li>
          </ul>
        </article>

        <article class="answer-block faq">
          <h2>Frequently Asked Questions</h2>
          <dl>
            <dt>How does MCP differ from REST APIs?</dt>
            <dd>MCP provides a standardized way to discover and call tools, while REST APIs require separate integration for each service.</dd>
          </dl>
        </article>

        <article class="answer-block limitations">
          <h2>Limitations</h2>
          <ul>
            <li>Requires consistent schema adherence</li>
            <li>Transport limitations for complex payloads</li>
          </ul>
        </article>

        <footer class="content-metadata">
          <div class="author">Author: John Doe</div>
          <div class="reviewer">Reviewer: Jane Smith</div>
          <div class="last-reviewed">Last reviewed: 2026-08-06</div>
        </footer>
      </div>
    </div>
  );
}
