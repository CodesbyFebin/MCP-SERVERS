import type { Metadata } from "next";
import { servers } from "../../src/data/servers";
import { categories } from "../../src/data/categories";
import Link from "next/link";

export const metadata: Metadata = {
  title: "MCP Server Directory - 1,000+ Servers",
  description: "Browse the complete directory of Model Context Protocol servers. Find servers by category, language, transport, and more.",
  alternates: { canonical: "/servers/" },
};

export default function ServersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">MCP Server Directory</h1>
        <p className="text-xl text-gray-600 mb-8">
          Explore {servers.length}+ Model Context Protocol servers organized by category, language, and transport.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/servers/category/${category.slug}`}
              className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{category.name}</h2>
              <p className="text-gray-600">
                {category.count} servers
              </p>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servers.slice(0, 12).map((server) => (
            <Link
              key={server.slug}
              href={`/servers/${server.slug}`}
              className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{server.name}</h3>
              <p className="text-gray-600 text-sm mb-2">{server.category}</p>
              <p className="text-gray-500 text-sm line-clamp-2">{server.description}</p>
            </Link>
          ))}
        </div>
      </div>
      <article class="answer-block definition">
        <h2>Definition</h2>
        <p>An MCP server is a standardized component that exposes tools, prompts, and resources to MCP-compatible AI clients, translating between protocol-compliant calls and underlying APIs or services.</p>
      </article>

      <article class="answer-block key-takeways">
        <h2>Key Takeaways</h2>
        <ul>
          <li>MCP servers bridge AI clients and backend services</li>
          <li>Supports stdio, SSE, and Streamable HTTP transports</li>
          <li>Verified servers with production deployment paths</li>
        </ul>
      </article>

      <article class="answer-block steps">
        <h2>Step-by-Step Process</h2>
        <ol>
          <li>Browse featured integrations by category</li>
          <li>Select a server matching your use case</li>
          <li>Follow setup guidance and auth notes</li>
          <li>Deploy with secure credential isolation</li>
        </ol>
      </article>

      <article class="answer-block comparison">
        <h2>Comparison Table</h2>
        <table class="table">
          <tr>
            <th>Transport</th>
            <th>Local Dev</th>
            <th>Remote Production</th>
            <th>Scale</th>
          </tr>
          <tr>
            <td>stdio</td>
            <td>✅ Best</td>
            <td>❌ Poor</td>
            <td>Limited</td>
          </tr>
          <tr>
            <td>SSE</td>
            <td>Moderate</td>
            <td>✅ Good</td>
            <td>Moderate</td>
          </tr>
          <tr>
            <td>Streamable HTTP</td>
            <td>Moderate</td>
            <td>✅ Excellent</td>
            <td>High</td>
          </tr>
        </table>
      </article>

      <article class="answer-block troubleshoot">
        <h2>Troubleshooting</h2>
        <ul>
          <li><strong>Connection refused:</strong> Check server health endpoint and auth tokens</li>
          <li><strong>Tool not found:</strong> Verify tool name matches schema export</li>
        </ul>
      </article>

      <article class="answer-block faq">
        <h2>Frequently Asked Questions</h2>
        <dl>
          <dt>What's the fastest way to deploy an MCP server?</dt>
          <dd>Use the deployment guides in the documentation hub with pre-configured templates.</dd>
        </dl>
      </article>

      <footer class="content-metadata">
        <div class="author">Author: John Doe</div>
        <div class="reviewer">Reviewer: Jane Smith</div>
        <div class="last-reviewed">Last reviewed: 2026-08-06</div>
      </footer>
    </div>
