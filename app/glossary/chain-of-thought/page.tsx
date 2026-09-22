import type { Metadata } from "next";
import { BrandMcpArticle, P, Ext } from "@/src/components/content/BrandMcpArticle";

export const dynamic = "force-static";

const SLUG = "chain-of-thought";
const PATH = `/glossary/${SLUG}`;
const TITLE = "Chain-of-Thought Prompting Explained";
const DESCRIPTION =
  "What chain-of-thought (CoT) prompting is, what the original paper showed, how it relates to built-in reasoning in newer models, and how it helps with multi-step MCP tool use.";
const REVIEWED = "2026-09-23";
const PAPER = "https://arxiv.org/abs/2201.11903";

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
      h1="Chain of Thought (CoT)"
      description={DESCRIPTION}
      reviewedAt={REVIEWED}
      directAnswer="Chain of thought is a series of intermediate reasoning steps a language model writes before its final answer. Wei et al. (2022) showed that giving a large model a few worked examples with step-by-step reasoning, called chain-of-thought prompting, improved performance on arithmetic, commonsense and symbolic reasoning tasks. Many current models can now reason step by step without being shown examples."
      sections={[
        {
          id: "paper",
          heading: "What the original paper found",
          body: (
            <P>
              <Ext href={PAPER}>Chain-of-Thought Prompting Elicits Reasoning in Large Language
              Models</Ext> (arXiv:2201.11903) reports that such reasoning abilities &ldquo;emerge
              naturally in sufficiently large language models&rdquo;. Its headline example: prompting
              a 540B-parameter model with eight chain-of-thought exemplars reached state-of-the-art
              accuracy on the GSM8K maths word-problem benchmark at the time.
            </P>
          ),
        },
        {
          id: "how",
          heading: "How to use it",
          body: (
            <ul className="list-inside list-disc space-y-2 text-slate-700 dark:text-slate-300">
              <li><strong>Few-shot CoT:</strong> include worked examples that show the reasoning, not just the answer.</li>
              <li><strong>Instruction:</strong> ask the model to think step by step before answering.</li>
              <li><strong>Built-in reasoning:</strong> many recent models have a reasoning or extended-thinking mode you enable through the API instead of prompting for it.</li>
            </ul>
          ),
        },
        {
          id: "mcp",
          heading: "Chain of thought and MCP tools",
          body: (
            <>
              <P>
                Multi-step tasks, such as &ldquo;find overdue invoices, then email each
                customer&rdquo;, go better when the model plans which tools to call and in what order
                before acting. Asking it to state the plan also gives you a point to review before
                consequential calls.
              </P>
              <P>
                Written reasoning is not a guarantee of correctness. Check tool arguments and
                results, especially for payments, orders and deletions.
              </P>
            </>
          ),
        },
      ]}
      evidence={[
        {
          source: "Wei et al.: Chain-of-Thought Prompting Elicits Reasoning in Large Language Models",
          url: PAPER,
          type: "documentation",
          status: "verified",
          reviewedAt: REVIEWED,
          finding: "Chain of thought = intermediate reasoning steps; improves arithmetic, commonsense and symbolic reasoning; emerges in sufficiently large models; 540B model with eight exemplars reached state of the art on GSM8K.",
        },
      ]}
      faqs={[
        {
          question: "What is chain-of-thought prompting?",
          answer: "Prompting a model to produce intermediate reasoning steps, often by showing worked examples, before giving its answer.",
        },
        {
          question: "Does chain of thought work on small models?",
          answer: "The original paper found the benefit emerges in sufficiently large models.",
        },
        {
          question: "Do I still need to prompt for it?",
          answer: "Less often. Many current models reason step by step on their own or offer a reasoning mode in the API.",
        },
        {
          question: "How does it help with tool use?",
          answer: "Planning the sequence of tool calls before acting improves multi-step tasks and gives you a plan to review.",
        },
        {
          question: "Is the reasoning always correct?",
          answer: "No. Verify results and tool arguments independently.",
        },
      ]}
      related={[
        { href: "/glossary/agent", label: "AI agent" },
        { href: "/glossary/tool-calling", label: "Tool calling" },
        { href: "/glossary/system-prompt", label: "System prompt" },
        { href: "/glossary", label: "MCP glossary" },
      ]}
    />
  );
}
