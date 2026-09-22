import type { Metadata } from "next";
import Link from "next/link";
import { BrandMcpArticle, Code, P, Ext } from "@/src/components/content/BrandMcpArticle";

export const dynamic = "force-static";

const SLUG = "java";
const PATH = "/sdk/java";
const TITLE = "MCP Java SDK: Maven Setup and First Server";
const DESCRIPTION =
  "The official MCP Java SDK: Maven and Gradle coordinates with the BOM, modules, a synchronous stdio server with one tool, the available transports, and how it relates to Spring AI.";
const REVIEWED = "2026-09-23";
const REPO = "https://github.com/modelcontextprotocol/java-sdk";
const DOCS = "https://java.sdk.modelcontextprotocol.io/latest/";
const QUICK = "https://java.sdk.modelcontextprotocol.io/latest/quickstart/";
const SERVER = "https://java.sdk.modelcontextprotocol.io/latest/server/";

const UL = "mb-4 list-inside list-disc space-y-2 text-slate-700 dark:text-slate-300";

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
      h1="MCP Java SDK"
      description={DESCRIPTION}
      reviewedAt={REVIEWED}
      directAnswer="The official MCP Java SDK lives at modelcontextprotocol/java-sdk and is maintained in collaboration with Spring AI. Add the io.modelcontextprotocol.sdk BOM and the mcp artifact, build a server with McpServer.sync or McpServer.async, and choose a transport provider: stdio, Servlet-based Streamable HTTP, or Spring WebFlux and WebMVC through Spring AI. It requires Java 17 or later and is MIT-licensed."
      sections={[
        {
          id: "deps",
          heading: "Add the dependency",
          body: (
            <>
              <P>Maven, with the BOM managing versions (2.0.0 shown in the quickstart on the review date):</P>
              <Code>{`<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>io.modelcontextprotocol.sdk</groupId>
            <artifactId>mcp-bom</artifactId>
            <version>2.0.0</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>

<dependency>
    <groupId>io.modelcontextprotocol.sdk</groupId>
    <artifactId>mcp</artifactId>
</dependency>`}</Code>
              <P>Gradle:</P>
              <Code>{`dependencies {
    implementation platform("io.modelcontextprotocol.sdk:mcp-bom:2.0.0")
    implementation "io.modelcontextprotocol.sdk:mcp"
}`}</Code>
              <P>
                Check the <Ext href={QUICK}>quickstart</Ext> for the latest version; the API
                reference already lists 2.0.1.
              </P>
            </>
          ),
        },
        {
          id: "modules",
          heading: "Modules",
          body: (
            <ul className={UL}>
              <li>
                <code>mcp</code>: convenience bundle of <code>mcp-core</code> plus{" "}
                <code>mcp-json-jackson3</code>. Includes stdio, SSE and Streamable HTTP transports
                without needing a web framework.
              </li>
              <li><code>mcp-core</code>: the reference implementation</li>
              <li><code>mcp-json-jackson2</code> / <code>mcp-json-jackson3</code>: JSON binding</li>
              <li><code>mcp-test</code>: testing utilities</li>
              <li>
                <code>mcp-bom</code>: keeps module versions aligned
              </li>
              <li>
                Spring WebFlux and WebMVC transports now ship in Spring AI 2.0+, not in this
                repository.
              </li>
            </ul>
          ),
        },
        {
          id: "server",
          heading: "A minimal stdio server",
          body: (
            <>
              <P>From the SDK&apos;s <Ext href={SERVER}>server guide</Ext>:</P>
              <Code>{`StdioServerTransportProvider transportProvider =
    new StdioServerTransportProvider(McpJsonDefaults.getMapper());

McpSyncServer server = McpServer.sync(transportProvider)
    .serverInfo("my-server", "1.0.0")
    .capabilities(ServerCapabilities.builder()
        .tools(true)
        .build())
    .toolCall(
        Tool.builder("echo", schema)
            .description("Echoes input")
            .build(),
        (exchange, request) -> CallToolResult.builder()
            .content(List.of(new McpSchema.TextContent(
                request.arguments().get("text").toString())))
            .build())
    .build();`}</Code>
              <P>
                <code>schema</code> is the tool&apos;s JSON Schema for its input, for example an
                object with a required <code>text</code> string. Use <code>McpServer.async</code>{" "}
                for a Reactor-based server. As with any stdio server, send logs to stderr, never
                stdout.
              </P>
            </>
          ),
        },
        {
          id: "transports",
          heading: "Server transport providers",
          body: (
            <ul className={UL}>
              <li><code>StdioServerTransportProvider</code>: stdin/stdout, for local servers</li>
              <li><code>HttpServletStreamableServerTransportProvider</code>: Streamable HTTP on any Servlet container</li>
              <li><code>WebFluxStreamableServerTransportProvider</code> / <code>WebMvcStreamableServerTransportProvider</code>: Streamable HTTP through Spring AI</li>
              <li>
                <code>HttpServletSseServerTransportProvider</code> and the WebFlux/WebMVC SSE
                providers: the legacy HTTP+SSE transport, kept for older clients
              </li>
            </ul>
          ),
        },
        {
          id: "spring",
          heading: "Using Spring Boot?",
          body: (
            <P>
              Spring AI builds on this SDK with Boot starters and annotations such as{" "}
              <code>@McpTool</code>, so you rarely write the builder code above by hand. See our{" "}
              <Link href="/frameworks/spring-ai-mcp" className="text-blue-600 hover:underline dark:text-blue-400">
                Spring AI MCP guide
              </Link>
              .
            </P>
          ),
        },
      ]}
      evidence={[
        {
          source: "modelcontextprotocol/java-sdk README",
          url: REPO,
          type: "official",
          status: "verified",
          reviewedAt: REVIEWED,
          finding:
            "Maintained in collaboration with Spring AI; groupId io.modelcontextprotocol.sdk; modules mcp, mcp-core, mcp-json-jackson2/3, mcp-test, mcp-bom; Spring transports in Spring AI 2.0+; Java 17+; MIT licence.",
        },
        {
          source: "MCP Java SDK docs: Quickstart",
          url: QUICK,
          type: "official",
          status: "verified",
          reviewedAt: REVIEWED,
          finding:
            "Maven and Gradle snippets with mcp-bom 2.0.0 and the mcp artifact; mcp bundles mcp-core with mcp-json-jackson3 and includes stdio, SSE and Streamable HTTP transports.",
        },
        {
          source: "MCP Java SDK docs: Server",
          url: SERVER,
          type: "official",
          status: "verified",
          reviewedAt: REVIEWED,
          finding: "Synchronous stdio server example with McpServer.sync and toolCall; list of server transport providers.",
        },
        {
          source: "MCP Java SDK docs home",
          url: DOCS,
          type: "official",
          status: "verified",
          reviewedAt: REVIEWED,
          finding: "API reference lists mcp-core 2.0.1.",
        },
      ]}
      faqs={[
        {
          question: "What are the Maven coordinates for the MCP Java SDK?",
          answer:
            "Import io.modelcontextprotocol.sdk:mcp-bom as a BOM and add io.modelcontextprotocol.sdk:mcp as a dependency.",
        },
        {
          question: "Which Java version does it need?",
          answer: "Java 17 or later, according to the repository.",
        },
        {
          question: "Is the Java SDK official?",
          answer:
            "Yes. It is in the modelcontextprotocol GitHub organisation and maintained in collaboration with Spring AI.",
        },
        {
          question: "Do I need Spring to use it?",
          answer:
            "No. The core SDK has stdio and Servlet-based HTTP transports. Spring AI adds WebFlux and WebMVC transports and Boot auto-configuration.",
        },
        {
          question: "Sync or async server?",
          answer:
            "McpServer.sync suits blocking code and is simpler. McpServer.async is Reactor-based and suits non-blocking applications.",
        },
      ]}
      related={[
        { href: "/frameworks/spring-ai-mcp", label: "Spring AI MCP" },
        { href: "/sdk/typescript", label: "MCP TypeScript SDK" },
        { href: "/blog/mcp-transport-methods", label: "MCP transports: stdio vs Streamable HTTP" },
        { href: "/glossary/mcp-tool-input-schema", label: "Tool inputSchema" },
      ]}
    />
  );
}
