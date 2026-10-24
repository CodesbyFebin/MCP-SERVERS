import type { Metadata } from "next";
import Link from "next/link";
import { BrandMcpArticle, P, Ext } from "@/src/components/content/BrandMcpArticle";

export const dynamic = "force-static";

const SLUG = "agent";
const PATH = `/glossary/${SLUG}`;
const TITLE = "AI Agent: Definition and How MCP Fits";
const DESCRIPTION =
  "What an AI agent is, how it differs from a workflow, and where MCP fits: agents discover and call tools on MCP servers through the host application.";
const REVIEWED = "2026-09-23";
const ANTHROPIC = "https://www.anthropic.com/engineering/building-effective-agents";
const ARCH = "https://modelcontextprotocol.io/docs/2026-07-28/learn/architecture";
const TOOLS = "https://modelcontextprotocol.io/specification/2026-07-28/server/tools";

const L = "text-blue-600 hover:underline dark:text-blue-400";

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
      section={{ label: "Glossary", href: "/glossary" }}
      title={TITLE}
      h1="Agent (AI)"
      description={DESCRIPTION}
      reviewedAt={REVIEWED}
      directAnswer="An AI agent is a system in which a language model decides for itself which steps to take and which tools to use to complete a task. That distinguishes it from a workflow, where code fixes the sequence of steps. MCP gives agents a standard way to discover and call tools and read data: the host application connects to MCP servers and lets the model use what they expose."
      sections={[
        {
          id: "definition",
          heading: "Agents vs workflows",
          body: (
            <>
              <P>
                Anthropic&apos;s <Ext href={ANTHROPIC}>Building effective agents</Ext> (December
                2024) draws the line clearly: &ldquo;Workflows are systems where LLMs and tools are
                orchestrated through predefined code paths. Agents, on the other hand, are systems
                where LLMs dynamically direct their own processes and tool usage, maintaining
                control over how they accomplish tasks.&rdquo;
              </P>
              <P>
                The same article recommends &ldquo;finding the simplest solution possible, and only
                increasing complexity when needed.&rdquo; Many tasks need a workflow, not an agent.
              </P>
            </>
          ),
        },
        {
          id: "mcp",
          heading: "Where MCP fits",
          body: (
            <>
              <P>
                Anthropic describes the basic building block as an &ldquo;augmented LLM&rdquo;: a
                model with retrieval, tools and memory. MCP is one way to supply those tools. In the{" "}
                <Ext href={ARCH}>MCP architecture</Ext>, the agent runs inside a host application,
                which creates a client for each MCP server, lists their tools, and routes the
                model&apos;s tool calls to the right server.
              </P>
              <P>
                MCP does not define the agent&apos;s reasoning loop; it only standardises how context
                and actions are exchanged.
              </P>
            </>
          ),
        },
        {
          id: "safety",
          heading: "Keeping a human in the loop",
          body: (
            <P>
              The MCP <Ext href={TOOLS}>tools specification</Ext> says there SHOULD always be a
              human in the loop able to deny tool calls, and that hosts SHOULD show which tools are
              exposed and confirm operations. The more autonomy an agent has, the more this
              matters: approve anything that spends money, sends messages or deletes data.
            </P>
          ),
        },
        {
          id: "examples",
          heading: "Examples on this site",
          body: (
            <P>
              A coding agent using the{" "}
              <Link href="/blog/mcp-server-for-gitlab-devops" className={L}>GitLab MCP server</Link>, or
              a research agent reading your portfolio through{" "}
              <Link href="/blog/zerodha-mcp-server-trading-ai" className={L}>Zerodha&apos;s Kite MCP</Link>{" "}
              are both agents calling MCP tools.
            </P>
          ),
        },
      ]}
      evidence={[
        {
          source: "Anthropic: Building effective agents",
          url: ANTHROPIC,
          type: "documentation",
          status: "verified",
          reviewedAt: REVIEWED,
          finding: "Workflow vs agent definition; augmented LLM building block and MCP mention; advice to start simple.",
        },
        {
          source: "MCP docs: Architecture overview",
          url: ARCH,
          type: "official",
          status: "verified",
          reviewedAt: REVIEWED,
          finding: "Host creates one client per server; MCP focuses only on context exchange and does not dictate how hosts use models.",
        },
        {
          source: "MCP specification 2026-07-28: Tools",
          url: TOOLS,
          type: "official",
          status: "verified",
          reviewedAt: REVIEWED,
          finding: "There SHOULD always be a human in the loop with the ability to deny tool invocations.",
        },
      ]}
      faqs={[
        {
          question: "What is an AI agent?",
          answer: "A system where a language model decides its own steps and tool use to complete a task.",
        },
        {
          question: "How is an agent different from a workflow?",
          answer: "In a workflow, code fixes the sequence of steps. In an agent, the model chooses them.",
        },
        {
          question: "Do I need MCP to build an agent?",
          answer: "No. MCP is one standard way to give an agent tools and data, not a requirement.",
        },
        {
          question: "Does MCP define how the agent reasons?",
          answer: "No. MCP only defines how context and actions are exchanged between hosts and servers.",
        },
        {
          question: "Should agents act without approval?",
          answer: "The MCP spec recommends a human in the loop who can deny tool calls, especially for consequential actions.",
        },
      ]}
      related={[
        { href: "/glossary/tool-calling", label: "Tool calling" },
        { href: "/complete-guide-mcp-servers", label: "The complete guide to MCP servers" },
        { href: "/glossary/guardrails", label: "Guardrails" },
        { href: "/glossary", label: "MCP glossary" },
      ]}
    />
  );
}
