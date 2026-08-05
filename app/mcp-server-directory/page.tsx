import DirectoryClient from "./DirectoryClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MCP Server Directory - Explore 100+ Integrations - MCPserver.in",
  description: "Browse the curated directory of Model Context Protocol (MCP) servers. Integrate databases, web APIs, developer tools, and SaaS platforms side-by-side.",
  alternates: {
    canonical: "/mcp-server-directory",
    languages: {
      "en-IN": "/mcp-server-directory",
      "en": "/mcp-server-directory",
        }
  },

};

export default function DirectoryPage() {
  return (
    <div className="min-h-screen bg-[#050508] text-white py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <DirectoryClient />

        <article class="answer-block definition">
          <h2>Definition</h2>
          <p>The MCP Server Directory is a curated catalog of Model Context Protocol servers organized by category, integration type, and capability.</p>
        </article>

        <article class="answer-block key-takeways">
          <h2>Key Takeaways</h2>
          <ul>
            <li>Browse 100+ MCP server integrations</li>
            <li>Filter by database, API, and developer tools</li>
            <li>Side-by-side comparison of server capabilities</li>
          </ul>
        </article>

        <article class="answer-block steps">
          <h2>Step-by-Step Process</h2>
          <ol>
            <li>Select a category from the directory</li>
            <li>Review server details and compatibility</li>
            <li>Integrate the selected server into your workflow</li>
          </ol>
        </article>

        <article class="answer-block comparison">
          <h2>Comparison Table</h2>
          <table class="table">
            <tr>
              <th>Category</th>
              <th>Example Servers</th>
              <th>Primary Use</th>
            </tr>
            <tr>
              <td>Databases</td>
              <td>PostgreSQL, BigQuery</td>
              <td>Data access and queries</td>
            </tr>
            <tr>
              <td>Web APIs</td>
              <td>GitHub, Slack</td>
              <td>Service integration</td>
            </tr>
            <tr>
              <td>Developer Tools</td>
              <td>SDKs, CLI tools</td>
              <td>Development workflows</td>
            </tr>
          </table>
        </article>

        <article class="answer-block troubleshoot">
          <h2>Troubleshooting</h2>
          <ul>
            <li><strong>Server not found:</strong> Check category filters or use search</li>
            <li><strong>Integration fails:</strong> Verify API credentials and permissions</li>
          </ul>
        </article>

        <article class="answer-block faq">
          <h2>Frequently Asked Questions</h2>
          <dl>
            <dt>How many servers are listed?</dt>
            <dd>100+ MCP servers across all categories.</dd>
            <dt>Is the directory free to use?</dt>
            <dd>Yes, the directory is free and open to all users.</dd>
          </dl>
        </article>

        <article class="answer-block limitations">
          <h2>Limitations</h2>
          <ul>
            <li>Directory coverage depends on community submissions</li>
            <li>Not all servers may be actively maintained</li>
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
