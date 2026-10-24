import type { Metadata } from "next";
import Link from "next/link";
import { BrandMcpArticle, Code, P, Ext } from "@/src/components/content/BrandMcpArticle";

export const dynamic = "force-static";

const SLUG = "spring-ai-mcp";
const PATH = "/frameworks/spring-ai-mcp";
const TITLE = "Spring AI MCP: Boot Starters and @McpTool";
const DESCRIPTION =
  "Build MCP servers and clients in Spring Boot with Spring AI: the client and server starters, choosing stdio, SSE, Streamable HTTP or stateless mode, and the @McpTool annotations.";
const REVIEWED = "2026-09-23";
const DOCS = "https://docs.spring.io/spring-ai/reference/api/mcp/mcp-overview.html";

const TH = "border-b border-slate-200 px-4 py-2 font-medium text-slate-600 dark:border-slate-800 dark:text-slate-400";
const UL = "mb-4 list-inside list-disc space-y-2 text-slate-700 dark:text-slate-300";

const SERVERS: [string, string, string][] = [
  ["STDIO", "spring-ai-starter-mcp-server", "spring.ai.mcp.server.stdio=true"],
  ["Streamable HTTP (WebMVC)", "spring-ai-starter-mcp-server-webmvc", "spring.ai.mcp.server.protocol=STREAMABLE"],
  ["Stateless Streamable HTTP (WebMVC)", "spring-ai-starter-mcp-server-webmvc", "spring.ai.mcp.server.protocol=STATELESS"],
  ["SSE (WebMVC)", "spring-ai-starter-mcp-server-webmvc", "spring.ai.mcp.server.protocol=SSE (or unset)"],
  ["Streamable HTTP (WebFlux)", "spring-ai-starter-mcp-server-webflux", "spring.ai.mcp.server.protocol=STREAMABLE"],
  ["Stateless Streamable HTTP (WebFlux)", "spring-ai-starter-mcp-server-webflux", "spring.ai.mcp.server.protocol=STATELESS"],
  ["SSE (WebFlux)", "spring-ai-starter-mcp-server-webflux", "spring.ai.mcp.server.protocol=SSE (or unset)"],
];

export function generateMetadata(): Metadata {
  return {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: `https://www.mcpserver.in${PATH}` },
    robots: { index: true, follow: true },
    openGraph: { title: TITLE, description: DESCRIPTION, type: "article" },
  };
}

export default function Page() {
  return (
    <BrandMcpArticle
      slug={SLUG}
      path={PATH}
      section={{ label: "Developer", href: "/developer" }}
      title={TITLE}
      h1="Spring AI MCP"
      description={DESCRIPTION}
      reviewedAt={REVIEWED}
      directAnswer="Spring AI adds MCP support to Spring Boot through Boot starters and annotations, built on the official MCP Java SDK. Add spring-ai-starter-mcp-server (stdio), -webmvc or -webflux for a server, or spring-ai-starter-mcp-client for a client, then mark methods with @McpTool. Choose the transport with spring.ai.mcp.server.* properties. Spring AI 2.0 requires MCP Java SDK 1.0.0 or later."
      sections={[
        {
          id: "server",
          heading: "Server starters and transports",
          body: (
            <>
              <P>
                Pick a starter for your web stack, then select the protocol with a property. The
                table follows the <Ext href={DOCS}>Spring AI MCP reference</Ext>:
              </P>
              <div className="overflow-x-auto rounded border border-slate-200 dark:border-slate-800">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50 text-left dark:bg-slate-900">
                      <th className={TH}>Server type</th>
                      <th className={TH}>Dependency</th>
                      <th className={TH}>Property</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-700 dark:divide-slate-800 dark:text-slate-300">
                    {SERVERS.map(([t, d, p]) => (
                      <tr key={t}>
                        <td className="px-4 py-2">{t}</td>
                        <td className="px-4 py-2 font-mono text-xs">{d}</td>
                        <td className="px-4 py-2 font-mono text-xs">{p}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <P>
                Note that SSE is the default when the property is unset. For new remote servers,
                set <code>STREAMABLE</code> or <code>STATELESS</code> explicitly: the standalone
                HTTP+SSE transport has been deprecated in the MCP specification since 2025-03-26.
              </P>
            </>
          ),
        },
        {
          id: "tools",
          heading: "Exposing tools with annotations",
          body: (
            <>
              <P>
                Server-side annotations are <code>@McpTool</code>, <code>@McpResource</code>,{" "}
                <code>@McpPrompt</code> and <code>@McpComplete</code>. Spring AI generates the JSON
                Schema for tool parameters from the method signature. A tool is a method on a
                Spring bean:
              </P>
              <Code>{`@Component
public class WeatherTools {

    @McpTool(description = "Get the current temperature for a city")
    public String currentTemperature(String city) {
        return weatherService.lookup(city);
    }
}`}</Code>
              <P>
                Handlers can also accept special parameters such as{" "}
                <code>McpSyncServerExchange</code>, <code>McpAsyncServerExchange</code>,{" "}
                <code>McpTransportContext</code> and <code>McpMeta</code> when they need request
                context. Check the reference for the exact attribute names supported by your Spring
                AI version.
              </P>
            </>
          ),
        },
        {
          id: "client",
          heading: "Client starters",
          body: (
            <>
              <ul className={UL}>
                <li>
                  <code>spring-ai-starter-mcp-client</code>: stdio, Servlet-based Streamable HTTP,
                  stateless Streamable HTTP and SSE
                </li>
                <li>
                  <code>spring-ai-starter-mcp-client-webflux</code>: WebFlux-based Streamable HTTP,
                  stateless Streamable HTTP and SSE
                </li>
              </ul>
              <P>
                Client-side annotations (<code>@McpLogging</code>, <code>@McpSampling</code>,{" "}
                <code>@McpElicitation</code>, <code>@McpProgress</code>) let your application handle
                what servers send back, such as elicitation requests and progress updates.
              </P>
            </>
          ),
        },
        {
          id: "versions",
          heading: "Versions",
          body: (
            <P>
              On the review date the reference covered Spring AI 2.0.1 and stated that Spring AI 2.0
              requires MCP Java SDK 1.0.0 (RC1 or later). The Spring WebFlux and WebMVC MCP
              transports moved from the Java SDK into Spring AI 2.0. If you are on Spring AI 1.x,
              follow that version&apos;s documentation; starter names and properties differ.
            </P>
          ),
        },
        {
          id: "without",
          heading: "Without Spring",
          body: (
            <P>
              For a plain Java service, use the{" "}
              <Link href="/sdk/java" className="text-blue-600 hover:underline dark:text-blue-400">
                MCP Java SDK
              </Link>{" "}
              directly with its stdio or Servlet transports.
            </P>
          ),
        },
      ]}
      evidence={[
        {
          source: "Spring AI reference: MCP overview",
          url: DOCS,
          type: "official",
          status: "verified",
          reviewedAt: REVIEWED,
          finding:
            "Client starters spring-ai-starter-mcp-client and -webflux; server starters spring-ai-starter-mcp-server, -webmvc, -webflux with spring.ai.mcp.server.stdio and spring.ai.mcp.server.protocol=SSE|STREAMABLE|STATELESS; server annotations @McpTool, @McpResource, @McpPrompt, @McpComplete; client annotations @McpLogging, @McpSampling, @McpElicitation, @McpProgress; special parameters; Spring AI 2.0.1; Spring AI 2.0 requires MCP Java SDK 1.0.0 (RC1 or later).",
          limitations:
            "The @McpTool example on this page is illustrative; confirm attribute names against the reference for your version.",
        },
      ]}
      faqs={[
        {
          question: "Which starter do I need for an MCP server in Spring Boot?",
          answer:
            "spring-ai-starter-mcp-server for stdio, spring-ai-starter-mcp-server-webmvc for Servlet apps, or spring-ai-starter-mcp-server-webflux for reactive apps.",
        },
        {
          question: "How do I switch a Spring AI MCP server to Streamable HTTP?",
          answer: "Set spring.ai.mcp.server.protocol=STREAMABLE (or STATELESS) with the webmvc or webflux starter.",
        },
        {
          question: "What does STATELESS mean here?",
          answer:
            "A Streamable HTTP mode where the server keeps no per-client session between requests, which makes horizontal scaling simpler.",
        },
        {
          question: "Is Spring AI MCP built on the official Java SDK?",
          answer: "Yes. Spring AI 2.0 depends on MCP Java SDK 1.0.0 (RC1 or later).",
        },
        {
          question: "How are tool input schemas generated?",
          answer: "Spring AI generates JSON Schemas for tool parameters from the annotated method's signature.",
        },
      ]}
      related={[
        { href: "/sdk/java", label: "MCP Java SDK" },
        { href: "/blog/mcp-transport-methods", label: "MCP transports: stdio vs Streamable HTTP" },
        { href: "/glossary/mcp-elicitation", label: "MCP elicitation" },
        { href: "/deployment/aws", label: "Deploying MCP servers on AWS" },
      ]}
    />
  );
}
