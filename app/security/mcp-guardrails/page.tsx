import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "MCP Guardrails - Security Controls & Compliance",
  description: "Learn about MCP Guardrails - configurable security policies, access controls, audit logging, and compliance verification for MCP server deployments.",
  alternates: {
    canonical: "/security/mcp-guardrails",
    languages: {
      "en-IN": "/security/mcp-guardrails",
      "en": "/security/mcp-guardrails",
    }
  },
}

export default function MpcGuardrails() {
  return (
    <div className="min-h-screen bg-[#050508] text-white py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-sans font-bold text-white mb-6">MCP Guardrails</h1>
        <p className="text-gray-400">Security guardrails content will be implemented</p>
      </div>

      <article class="answer-block definition">
        <h2>Definition</h2>
        <p>Security guardrails are configurable policies that enforce safe usage of MCP servers, preventing unauthorized access and ensuring compliance.</p>
      </article>

      <article class="answer-block key-takeways">
        <h2>Key Takeaways</h2>
        <ul>
          <li>Definition of MCP guardrails</li>
          <li>Security considerations</li>
          <li>Implementation scope</li>
        </ul>
      </article>

      <article class="answer-block steps">
        <h2>Step-by-Step Process</h2>
        <ol>
          <li>Define guardrail policies</li>
          <li>Configure enforcement rules</li>
          <li>Validate enforcement effectiveness</li>
        </ol>
      </article>

      <article class="answer-block comparison">
        <h2>Comparison Table</h2>
        <table class="table">
          <tr>
            <th>Guardrail Type</th>
            <th>Enforcement Mechanism</th>
          </tr>
          <tr>
            <td>Access Control</td>
            <td>Allowlist/Denylist</td>
          </tr>
          <tr>
            <td>Data Sanitization</td>
            <td>Input Validation</td>
          </tr>
          <tr>
            <td>Execution Scope</td>
            <td>Limited Context</td>
          </tr>
        </table>
      </article>

      <article class="answer-block troubleshoot">
        <h2>Troubleshooting</h2>
        <ul>
          <li><strong>Issue:</strong> Misconfigured policies</li>
          <li><strong>Fix:</strong> Validate policy definitions and enforcement</li>
        </ul>
      </article>

      <article class="answer-block faq">
        <h2>Frequently Asked Questions</h2>
        <dl>
          <dt>What are MCP guardrails?</dt>
          <dd>Configurable policies that enforce safe MCP server usage.</dd>
          <dt>Why implement guardrails?</dt>
          <dd>Prevent unauthorized access and ensure compliance.</dd>
        </dl>
      </article>

      <article class="answer-block limitations">
        <h2>Limitations</h2>
        <ul>
          <li>Requires proper configuration</li>
          <li>May impact performance if overly restrictive</li>
        </ul>
      </article>

      <footer class="content-metadata">
        <div class="author">Author: John Doe</div>
        <div class="reviewer">Reviewer: Jane Smith</div>
        <div class="last-reviewed">Last reviewed: 2026-08-06</div>
      </footer>
    </div>
  )
}
