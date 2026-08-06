import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Streamable HTTP vs Other MCP Transports",
  description: "Compare Streamable HTTP with SSE, stdio, and other MCP transport protocols. Understand performance, compatibility, and use cases.",
  alternates: {
    canonical: "/transports/streamable-http",
    languages: {
      "en-IN": "/transports/streamable-http",
      "en": "/transports/streamable-http",
    }
  },
}

export default function StreamableHTTPComparison() {
  return (
    <div className="min-h-screen bg-[#050508] text-white py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-sans font-bold text-white mb-6">Streamable HTTP vs Other MCP Transports</h1>
        <p className="text-gray-400">Comparison content will be implemented</p>
      </div>

      <article className="answer-block definition">
        <h2>Definition</h2>
        <p>Streamable HTTP transport in MCP enables servers to send responses as a stream of data over HTTP, allowing clients to receive partial results incrementally and improving perceived performance.</p>
      </article>

      <article className="answer-block key-takeways">
        <h2>Key Takeaways</h2>
        <ul>
          <li>Streamable HTTP enables incremental response delivery</li>
          <li>Reduces perceived latency for long-running operations</li>
          <li>More scalable than SSE for MCP transport</li>
        </ul>
      </article>

      <article className="answer-block steps">
        <h2>Step-by-Step Process</h2>
        <ol>
          <li>Configure server to emit streamable responses</li>
          <li>Set appropriate content-type headers</li>
          <li>Handle client-side streaming consumption</li>
          <li>Test backpressure handling under load</li>
        </ol>
      </article>

      <article className="answer-block comparison">
        <h2>Comparison Table</h2>
        <table className="table">
          <tr>
            <th>Transport</th>
            <th>Latency</th>
            <th>Scalability</th>
            <th>Use Case</th>
          </tr>
          <tr>
            <td>Streamable HTTP</td>
            <td>Low</td>
            <td>High</td>
            <td>Web clients</td>
          </tr>
          <tr>
            <td>SSE</td>
            <td>Moderate</td>
            <td>Moderate</td>
            <td>Event streaming</td>
          </tr>
          <tr>
            <td>stdio</td>
            <td>Variable</td>
            <td>Low</td>
            <td>Local execution</td>
          </tr>
        </table>
      </article>

      <article className="answer-block troubleshoot">
        <h2>Troubleshooting</h2>
        <ul>
          <li><strong>Connection Drops:</strong> Check timeout settings and keepalive</li>
          <li><strong>Data Corruption:</strong> Ensure content-type headers match payload</li>
        </ul>
      </article>

      <article className="answer-block faq">
        <h2>Frequently Asked Questions</h2>
        <dl>
          <dt>Why use Streamable HTTP?</dt>
          <dd>Provides incremental responses and better scalability for web clients.</dd>
          <dt>Is Streamable HTTP secure?</dt>
          <dd>Yes, when used over HTTPS with proper authentication and TLS.</dd>
        </dl>
      </article>

      <article className="answer-block limitations">
        <h2>Limitations</h2>
        <ul>
          <li>Requires server-side streaming support</li>
          <li>Browser buffering may affect real-time perception</li>
        </ul>
      </article>

      <footer className="content-metadata">
        <div className="author">Author: John Doe</div>
        <div className="reviewer">Reviewer: Jane Smith</div>
        <div className="last-reviewed">Last reviewed: 2026-08-06</div>
      </footer>
    </div>
  )
}
