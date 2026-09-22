import type { Metadata } from "next";
import { BrandMcpArticle, Code, P, Ext } from "@/src/components/content/BrandMcpArticle";

export const dynamic = "force-static";

const SLUG = "system-prompt";
const PATH = `/glossary/${SLUG}`;
const TITLE = "System Prompt: Definition and MCP Tips";
const DESCRIPTION =
  "What a system prompt is, how it is passed in an API call, what belongs in it, and how to write system prompts for assistants that use MCP tools.";
const REVIEWED = "2026-09-23";
const DOCS = "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices";
const OWASP = "https://genai.owasp.org/llmrisk/llm01-prompt-injection/";

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
      h1="System Prompt"
      description={DESCRIPTION}
      reviewedAt={REVIEWED}
      directAnswer="A system prompt is the instruction an application gives a language model before the conversation starts, separate from user messages. It sets the model's role, rules and context. In Anthropic's Messages API it is the system parameter. For MCP assistants it is where you explain which tools to prefer, what needs confirmation, and how to treat content that tools return."
      sections={[
        {
          id: "api",
          heading: "How it is passed",
          body: (
            <>
              <P>Adapted from Anthropic&apos;s <Ext href={DOCS}>prompting guide</Ext>, a role set in the system prompt:</P>
              <Code>{`message = client.messages.create(
    model="claude-opus-5-5",
    max_tokens=1024,
    system="You are a helpful coding assistant specializing in Python.",
    messages=[
        {"role": "user", "content": "How do I sort a list of dictionaries by key?"}
    ],
)`}</Code>
              <P>The guide notes that even a single sentence of role setting focuses the model&apos;s behaviour and tone.</P>
            </>
          ),
        },
        {
          id: "mcp",
          heading: "System prompts for MCP assistants",
          body: (
            <ul className="list-inside list-disc space-y-2 text-slate-700 dark:text-slate-300">
              <li>Say when to use which tool, especially where tools overlap (&ldquo;use search_docs for how-to questions, lookup_order for order IDs&rdquo;).</li>
              <li>List actions that need the user&apos;s explicit confirmation first: payments, orders, messages, deletions.</li>
              <li>
                Tell the model that text returned by tools is data, not instructions. OWASP ranks
                prompt injection first (LLM01) in its 2025 LLM Top 10, including indirect injection
                through external content.
              </li>
              <li>Keep secrets out of the system prompt; the model can repeat it.</li>
            </ul>
          ),
        },
        {
          id: "limits",
          heading: "What a system prompt can't do",
          body: (
            <P>
              A system prompt guides behaviour but does not enforce it. Real limits belong in code:
              scopes, server-side authorization and approval prompts in the host. Treat the prompt as
              one layer of defence, not the only one.
            </P>
          ),
        },
      ]}
      evidence={[
        {
          source: "Anthropic: Prompting best practices",
          url: DOCS,
          type: "official",
          status: "verified",
          reviewedAt: REVIEWED,
          finding: "Setting a role in the system prompt focuses behaviour and tone; example using the system parameter in the Messages API.",
        },
        {
          source: "OWASP LLM01:2025 Prompt Injection",
          url: OWASP,
          type: "documentation",
          status: "verified",
          reviewedAt: REVIEWED,
          finding: "Direct and indirect prompt injection; indirect via external content such as websites or files; LLM01 in the 2025 LLM Top 10.",
        },
      ]}
      faqs={[
        {
          question: "What is a system prompt?",
          answer: "Instructions given to the model by the application, separate from user messages, setting its role and rules.",
        },
        {
          question: "Where do I put the system prompt in Anthropic's API?",
          answer: "In the system parameter of the Messages API request.",
        },
        {
          question: "Should I put API keys in the system prompt?",
          answer: "No. The model can reveal its instructions; keep secrets in server-side code.",
        },
        {
          question: "Can a system prompt stop prompt injection?",
          answer: "It helps but cannot guarantee it. Combine it with least-privilege tools and confirmation for risky actions.",
        },
        {
          question: "Do MCP servers set the system prompt?",
          answer: "No. The host application sets it. MCP servers can offer prompt templates the user or host may choose to use.",
        },
      ]}
      related={[
        { href: "/glossary/guardrails", label: "Guardrails" },
        { href: "/glossary/tool-calling", label: "Tool calling" },
        { href: "/glossary/chain-of-thought", label: "Chain of thought" },
        { href: "/glossary", label: "MCP glossary" },
      ]}
    />
  );
}
