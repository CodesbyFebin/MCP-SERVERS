"use client";

import Link from "next/link";
import { useTheme } from "../ThemeAndAuthProvider";
import ContentFamilyPageTemplate from "../ContentFamilyPageTemplate";
import type { SdkEntity } from "../../data/entities";
import { getUnifiedGraphSchema } from "../../lib/schema";
import { Code2, Package, Zap, Lock } from "lucide-react";

function CodeBlock({ code, lang = "bash" }: { code: string; lang?: string }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  return (
    <pre className={`p-4 rounded-xl border font-mono text-[11px] overflow-x-auto leading-relaxed ${isDark ? "bg-black text-cyan-300 border-white/5" : "bg-slate-100 text-slate-800 border-slate-200"}`}>
      <code>{code}</code>
    </pre>
  );
}

const SDK_EXAMPLES: Record<string, { server: string; tool: string }> = {
  typescript: {
    server: `import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({ name: "my-server", version: "1.0.0" });

server.tool(
  "add",
  { a: z.number(), b: z.number() },
  async ({ a, b }) => ({
    content: [{ type: "text", text: String(a + b) }],
  })
);

const transport = new StdioServerTransport();
await server.connect(transport);`,
    tool: `server.tool("get_weather", { city: z.string() }, async ({ city }) => {
  const data = await fetchWeather(city);
  return { content: [{ type: "text", text: JSON.stringify(data) }] };
});`,
  },
  python: {
    server: `from mcp.server.fastmcp import FastMCP

mcp = FastMCP("my-server")

@mcp.tool()
def add(a: int, b: int) -> int:
    """Add two numbers."""
    return a + b

if __name__ == "__main__":
    mcp.run(transport="stdio")`,
    tool: `@mcp.tool()
async def get_weather(city: str) -> dict:
    """Get weather for a city."""
    return await fetch_weather(city)`,
  },
  java: {
    server: `@SpringBootApplication
public class MyMcpServer {
    @Bean
    public McpServerFeatures.SyncToolSpecification addTool() {
        return new McpServerFeatures.SyncToolSpecification(
            new Tool("add", "Add two numbers",
                Map.of("a", Map.of("type", "integer"),
                       "b", Map.of("type", "integer"))),
            (exchange, args) -> new CallToolResult(
                String.valueOf((int)args.get("a") + (int)args.get("b")))
        );
    }
}`,
    tool: `// Register additional tools as Spring @Bean methods`,
  },
  go: {
    server: `server := mcp.NewServer("my-server", "1.0.0")

server.AddTool(mcp.Tool{
    Name:        "add",
    Description: "Add two numbers",
    InputSchema: mcp.ToolInputSchema{
        Type: "object",
        Properties: map[string]any{
            "a": map[string]any{"type": "number"},
            "b": map[string]any{"type": "number"},
        },
    },
}, func(ctx context.Context, req mcp.CallToolRequest) (*mcp.CallToolResult, error) {
    a := req.Params.Arguments["a"].(float64)
    b := req.Params.Arguments["b"].(float64)
    return mcp.NewToolResultText(fmt.Sprintf("%v", a+b)), nil
})`,
    tool: `// Add more tools with server.AddTool(...)`,
  },
};

export interface SdkPageTemplateProps {
  entity: SdkEntity;
  faqItems?: { question: string; answer: string }[];
}

export default function SdkPageTemplate({ entity, faqItems = [] }: SdkPageTemplateProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const examples = SDK_EXAMPLES[entity.languageSlug] ?? {
    server: `# See ${entity.officialDocs} for examples`,
    tool: `# Tool registration varies by SDK`,
  };

  const schema = getUnifiedGraphSchema({
    pageUrl: entity.route,
    title: `${entity.language} MCP SDK: Complete Developer Guide`,
    description: entity.metaDescription,
    breadcrumbs: [
      { name: "SDK Guides", item: "/sdk" },
      { name: `${entity.language} SDK`, item: entity.route },
    ],
    faq: faqItems,
    article: {
      title: `${entity.language} MCP SDK: Complete Developer Guide`,
      description: entity.metaDescription,
      authorName: "MCPServer.in Editorial",
      datePublished: entity.updatedAt,
      dateModified: entity.updatedAt,
    },
  });

  const relatedLinks = entity.relatedSdks.map((s) => ({
    label: `${s.charAt(0).toUpperCase() + s.slice(1)} MCP SDK`,
    href: `/sdk/${s}/`,
  }));
  relatedLinks.push({ label: "FastMCP Framework", href: "/frameworks/fastmcp/" });
  relatedLinks.push({ label: "stdio Transport", href: "/glossary/stdio/" });
  relatedLinks.push({ label: "Deploy MCP Server on Docker", href: "/deployment/docker/" });

  return (
    <ContentFamilyPageTemplate
      h1={`${entity.language} MCP SDK: Complete Developer Guide`}
      answerBlock={entity.metaDescription}
      breadcrumbs={[
        { name: "SDK Guides", href: "/sdk" },
        { name: `${entity.language} SDK`, href: entity.route },
      ]}
      badge="SDK Guide"
      sidebarItems={[
        { label: "Language", value: entity.language },
        { label: "Package", value: <code className="font-mono text-[10px]">{entity.packageName}</code> },
        { label: "Install", value: <code className="font-mono text-[10px]">{entity.installCommand.split(" ")[0]}</code> },
        { label: "Transports", value: entity.supportedTransports.join(", ") },
        { label: "Auth", value: entity.authSupport.join(", ") },
        { label: "Official repo", value: <Link href={entity.officialRepo} className="text-cyan-500 text-[10px] hover:underline">GitHub</Link> },
      ]}
      relatedLinks={relatedLinks}
      faqs={faqItems}
      publishedAt={entity.updatedAt}
      updatedAt={entity.updatedAt}
      citations={[
        { label: `${entity.language} MCP SDK Repository`, url: entity.officialRepo },
        { label: `${entity.language} MCP SDK Documentation`, url: entity.officialDocs },
      ]}
      schema={schema}
    >
      {/* Overview */}
      <section id="overview" className="space-y-3">
        <h2 className={`text-xl font-display font-bold ${isDark ? "text-white" : "text-slate-900"}`}>Overview</h2>
        <p className={`text-sm leading-relaxed ${isDark ? "text-white/70" : "text-slate-600"}`}>
          The {entity.name} is the official library for building{" "}
          <Link href="/glossary/mcp-server/" className="text-cyan-500 hover:underline">MCP servers</Link>{" "}
          in {entity.language}. It supports{" "}
          {entity.features.slice(0, 4).join(", ")}, and the{" "}
          {entity.supportedTransports.map((t, i) => (
            <span key={t}>
              <Link href={`/glossary/${t}/`} className="text-cyan-500 hover:underline">{t}</Link>
              {i < entity.supportedTransports.length - 1 ? " and " : ""}
            </span>
          ))}{" "}
          transport.
        </p>
      </section>

      {/* Installation */}
      <section id="installation" className="space-y-3">
        <h2 className={`text-xl font-display font-bold ${isDark ? "text-white" : "text-slate-900"}`}>Installation</h2>
        <CodeBlock code={entity.installCommand} />
      </section>

      {/* Minimal server */}
      <section id="minimal-server" className="space-y-3">
        <h2 className={`text-xl font-display font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
          Minimal Server Example
        </h2>
        <CodeBlock code={examples.server} lang={entity.languageSlug} />
      </section>

      {/* Adding a tool */}
      <section id="add-tool" className="space-y-3">
        <h2 className={`text-xl font-display font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
          Adding a Tool
        </h2>
        <p className={`text-sm ${isDark ? "text-white/70" : "text-slate-600"}`}>
          Tools are the primary way MCP servers expose functionality to clients.
          Each tool has a name, input schema, and handler function.
        </p>
        <CodeBlock code={examples.tool} lang={entity.languageSlug} />
      </section>

      {/* Features */}
      <section id="features" className="space-y-3">
        <h2 className={`text-xl font-display font-bold ${isDark ? "text-white" : "text-slate-900"}`}>Supported Features</h2>
        <div className="grid grid-cols-2 gap-2">
          {entity.features.map((f, i) => (
            <div key={i} className={`flex items-center gap-2 p-2.5 rounded-lg border text-xs ${isDark ? "bg-white/[0.01] border-white/5 text-white/70" : "bg-white border-slate-200 text-slate-700"}`}>
              <Zap className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
              {f}
            </div>
          ))}
        </div>
      </section>

      {/* Testing */}
      <section id="testing" className="space-y-3">
        <h2 className={`text-xl font-display font-bold ${isDark ? "text-white" : "text-slate-900"}`}>Testing Your Server</h2>
        <ol className={`list-decimal pl-5 space-y-2 text-sm ${isDark ? "text-white/70" : "text-slate-600"}`}>
          <li>Start the server and verify it prints no startup errors.</li>
          <li>Run <code className="font-mono text-[11px] bg-white/5 px-1 rounded">npx @modelcontextprotocol/inspector</code> and connect over stdio.</li>
          <li>Call your tools and verify they return the expected responses.</li>
          <li>Connect from <Link href="/clients/claude-desktop/" className="text-cyan-500 hover:underline">Claude Desktop</Link> and confirm tool visibility.</li>
        </ol>
      </section>
    </ContentFamilyPageTemplate>
  );
}
