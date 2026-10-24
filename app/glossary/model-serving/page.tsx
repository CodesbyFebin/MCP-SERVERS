import type { Metadata } from "next";
import { BrandMcpArticle, P, Ext } from "@/src/components/content/BrandMcpArticle";

export const dynamic = "force-static";

const SLUG = "model-serving";
const PATH = `/glossary/${SLUG}`;
const TITLE = "Model Serving: Running LLMs in Production";
const DESCRIPTION =
  "What model serving means for LLMs, why batching and KV-cache memory dominate throughput, what vLLM's PagedAttention changed, and how served models relate to MCP.";
const REVIEWED = "2026-09-23";
const VLLM = "https://arxiv.org/abs/2309.06180";
const ARCH = "https://modelcontextprotocol.io/docs/2026-07-28/learn/architecture";

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
      h1="Model Serving"
      description={DESCRIPTION}
      reviewedAt={REVIEWED}
      directAnswer="Model serving is running a trained model behind an API so applications can send it requests. For large language models the hard parts are throughput and memory: serving many users means batching requests, and each request's key-value (KV) cache grows as it generates. Systems like vLLM manage that memory more efficiently. MCP sits beside serving, not inside it: the host calls the model, and the model calls MCP tools."
      sections={[
        {
          id: "problem",
          heading: "Why LLM serving is hard",
          body: (
            <P>
              The <Ext href={VLLM}>vLLM paper</Ext> (Kwon et al., 2023) explains that high
              throughput &ldquo;requires batching sufficiently many requests at a time&rdquo;, but
              each request&apos;s KV cache is large and changes size as it runs. Managed poorly, the
              memory is wasted by fragmentation and duplication, which caps the batch size.
            </P>
          ),
        },
        {
          id: "vllm",
          heading: "What PagedAttention changed",
          body: (
            <P>
              PagedAttention borrows virtual-memory paging from operating systems to store the KV
              cache in blocks. The authors report near-zero KV-cache waste, sharing of cache within
              and across requests, and 2–4× higher throughput at the same latency than the systems
              they compared against (FasterTransformer and Orca), with larger gains for longer
              sequences and larger models.
            </P>
          ),
        },
        {
          id: "mcp",
          heading: "Where MCP fits",
          body: (
            <>
              <P>
                The <Ext href={ARCH}>MCP architecture</Ext> doesn&apos;t define how hosts use models.
                A host application can call a hosted API or a self-served model; either way, it
                passes MCP tool definitions to the model and routes its tool calls to MCP servers.
              </P>
              <ul className="list-inside list-disc space-y-2 text-slate-700 dark:text-slate-300">
                <li>If you self-serve, the model must support tool calling well for MCP to be useful.</li>
                <li>Tool definitions and results use context tokens, which affects serving cost and batch size.</li>
                <li>An MCP server can also wrap a served model as a tool, for example a translation or transcription model.</li>
              </ul>
            </>
          ),
        },
      ]}
      evidence={[
        {
          source: "Kwon et al.: Efficient Memory Management for LLM Serving with PagedAttention",
          url: VLLM,
          type: "documentation",
          status: "verified",
          reviewedAt: REVIEWED,
          finding: "Batching needed for throughput; KV cache fragmentation limits batch size; PagedAttention gives near-zero waste and sharing; vLLM 2–4× throughput at same latency vs FasterTransformer and Orca.",
        },
        {
          source: "MCP docs: Architecture overview",
          url: ARCH,
          type: "official",
          status: "verified",
          reviewedAt: REVIEWED,
          finding: "MCP does not dictate how AI applications use LLMs or manage context.",
        },
      ]}
      faqs={[
        {
          question: "What is model serving?",
          answer: "Running a trained model behind an API so applications can send it requests at scale.",
        },
        {
          question: "What is the KV cache?",
          answer: "Stored attention keys and values for tokens already processed, which grows as a request generates text.",
        },
        {
          question: "What is vLLM?",
          answer: "An open-source LLM serving system built on PagedAttention, reported to raise throughput 2–4× over earlier systems.",
        },
        {
          question: "Does MCP serve models?",
          answer: "No. MCP connects AI applications to tools and data; serving the model is separate.",
        },
        {
          question: "Can I use MCP with a self-hosted model?",
          answer: "Yes, if your host application supports it and the model handles tool calling well.",
        },
      ]}
      related={[
        { href: "/glossary/tool-calling", label: "Tool calling" },
        { href: "/glossary/mcp-p95-latency", label: "p95 latency for MCP tools" },
        { href: "/glossary/whisper", label: "Whisper speech recognition" },
        { href: "/glossary", label: "MCP glossary" },
      ]}
    />
  );
}
