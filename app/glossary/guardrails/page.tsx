import type { Metadata } from "next";
import Link from "next/link";
import { BrandMcpArticle, P, Ext } from "@/src/components/content/BrandMcpArticle";

export const dynamic = "force-static";

const SLUG = "guardrails";
const PATH = `/glossary/${SLUG}`;
const TITLE = "AI Guardrails for MCP Tool Use";
const DESCRIPTION =
  "What guardrails are for AI assistants, and a layered set for MCP: human approval, least privilege, input and output checks, content segregation, and limits, mapped to OWASP and the MCP spec.";
const REVIEWED = "2026-09-23";
const OWASP = "https://genai.owasp.org/llmrisk/llm01-prompt-injection/";
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
      h1="Guardrails (AI)"
      description={DESCRIPTION}
      reviewedAt={REVIEWED}
      directAnswer="Guardrails are the checks that keep an AI assistant within safe, intended behaviour. For assistants using MCP tools, the effective ones are enforced in code rather than hoped for in prompts: a human approves risky tool calls, each server gets only the permissions it needs, inputs and outputs are validated, external content is treated as data, and usage is rate-limited and logged."
      sections={[
        {
          id: "layers",
          heading: "Layered guardrails for MCP",
          body: (
            <ol className="list-inside list-decimal space-y-2 text-slate-700 dark:text-slate-300">
              <li>
                <strong>Human approval.</strong> The <Ext href={TOOLS}>tools spec</Ext> says there
                SHOULD always be a human in the loop who can deny tool calls, with confirmation for
                operations.
              </li>
              <li>
                <strong>Least privilege.</strong> Narrow OAuth scopes, read-only modes where
                offered, and{" "}
                <Link href="/blog/mcp-role-based-access-control" className={L}>role-based tool access</Link>.
              </li>
              <li>
                <strong>Input validation.</strong> Servers MUST validate tool inputs; add business
                limits such as maximum refund amounts through{" "}
                <Link href="/blog/mcp-policy-as-code" className={L}>policy as code</Link>.
              </li>
              <li>
                <strong>Output handling.</strong> Servers MUST sanitise outputs; clients SHOULD
                validate results before passing them to the model.
              </li>
              <li>
                <strong>Content segregation.</strong> Mark tool results and fetched pages as
                untrusted data; don&apos;t pair tools that read untrusted content with tools that
                spend money in the same unattended flow.
              </li>
              <li><strong>Limits and audit.</strong> Rate-limit tool calls (a spec MUST for servers), set timeouts, and log tool usage.</li>
            </ol>
          ),
        },
        {
          id: "owasp",
          heading: "How this maps to OWASP",
          body: (
            <P>
              <Ext href={OWASP}>OWASP LLM01:2025 Prompt Injection</Ext> lists mitigations that line
              up with the layers above: constrain model behaviour, validate output formats, filter
              inputs and outputs, enforce least privilege, require human approval for high-risk
              actions, segregate external content, and run adversarial tests.
            </P>
          ),
        },
        {
          id: "prompt",
          heading: "Prompts are the weakest layer",
          body: (
            <P>
              Instructions in a <Link href="/glossary/system-prompt" className={L}>system prompt</Link>{" "}
              help, but a model can be talked out of them. Anything that must not happen, such as a
              transfer over a limit, should be impossible in code, not just discouraged in text.
            </P>
          ),
        },
      ]}
      evidence={[
        {
          source: "OWASP LLM01:2025 Prompt Injection",
          url: OWASP,
          type: "documentation",
          status: "verified",
          reviewedAt: REVIEWED,
          finding: "Mitigations: constrain behaviour, validate output formats, input/output filtering, least privilege, human approval for high-risk actions, segregate external content, adversarial testing.",
        },
        {
          source: "MCP specification 2026-07-28: Tools",
          url: TOOLS,
          type: "official",
          status: "verified",
          reviewedAt: REVIEWED,
          finding: "Human in the loop SHOULD; servers MUST validate inputs, implement access controls, rate limit, sanitize outputs; clients SHOULD confirm sensitive operations, validate results, implement timeouts, log usage.",
        },
      ]}
      faqs={[
        {
          question: "What are AI guardrails?",
          answer: "Checks that keep an AI system within safe, intended behaviour, from approval prompts to permission limits.",
        },
        {
          question: "Are system prompts enough as guardrails?",
          answer: "No. They guide the model but can be overridden. Enforce critical limits in code.",
        },
        {
          question: "What does the MCP spec require of servers?",
          answer: "Validate inputs, implement access controls, rate-limit tool calls and sanitise outputs.",
        },
        {
          question: "What is indirect prompt injection?",
          answer: "Instructions hidden in external content, such as a web page or email, that change the model's behaviour when it reads them.",
        },
        {
          question: "Which tool calls should need approval?",
          answer: "Anything that spends money, sends messages, changes access or deletes data.",
        },
      ]}
      related={[
        { href: "/glossary/system-prompt", label: "System prompt" },
        { href: "/blog/mcp-policy-as-code", label: "Policy as code for MCP" },
        { href: "/glossary/cve-management", label: "CVE management for MCP" },
        { href: "/security/mcp-security", label: "MCP security overview" },
      ]}
    />
  );
}
