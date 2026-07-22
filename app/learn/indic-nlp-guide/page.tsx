import type { Metadata } from "next";
import Link from "next/link";
import { Languages, ArrowRight } from "lucide-react";
import Breadcrumbs from "../../../src/components/Breadcrumbs";
import SchemaJsonLd from "../../../src/components/SchemaJsonLd";
import { getUnifiedGraphSchema } from "../../../src/lib/schema";
import { getContentDates } from "../../../src/lib/contentDates";

export const metadata: Metadata = {
  title: "Indic NLP Guide: Local AI Models for Indian Languages | MCPserver.in",
  description:
    "Run Hindi, Tamil, Telugu, Bengali, and other Indian-language NLP models locally with Ollama or Hugging Face Transformers, and expose them to AI agents through MCP.",
  alternates: {
    canonical: "/learn/indic-nlp-guide",
    languages: {
    "en-IN": "/learn/indic-nlp-guide",
    "en": "/learn/indic-nlp-guide",
        },
  },
};

export default function IndicNLPGuidePage() {
  const dates = getContentDates("learn:indic-nlp-guide");
  const unifiedSchema = getUnifiedGraphSchema({
    speakable: ["#indicNlpGuide"],
    pageUrl: "/learn/indic-nlp-guide",
    title: "Indic NLP Guide: Local AI Models for Indian Languages",
    description:
      "Run Hindi, Tamil, Telugu, Bengali, and other Indian-language NLP models locally with Ollama or Hugging Face Transformers, and expose them to AI agents through MCP.",
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Learn", item: "/learn" },
      { name: "Indic NLP Guide", item: "/learn/indic-nlp-guide" },
    ],
    article: {
      title: "Indic NLP Guide: Local AI Models for Indian Languages",
      description:
        "Run Hindi, Tamil, Telugu, Bengali, and other Indian-language NLP models locally, with no cloud data sharing.",
      authorName: "MCPserver.in Engineering",
      authorRole: "Platform Team",
      datePublished: dates.datePublished,
      dateModified: dates.dateModified,
    },
  });

  return (
    <div id="indic-nlp-guide" className="min-h-screen bg-transparent text-white pt-6 pb-16">
      <SchemaJsonLd schema={unifiedSchema} />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: "Learn", href: "/learn" },
            { name: "Indic NLP Guide", href: "/learn/indic-nlp-guide" },
          ]}
        />

        <section className="py-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-[11px] font-bold text-cyan-200">
            <Languages className="h-3.5 w-3.5" />
            Local AI for Indian languages
          </div>
          <h1 className="mt-5 text-4xl font-black tracking-tight text-white sm:text-5xl">
            Indic NLP: Local AI for Indian Languages
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/65">
            Run NLP models for Hindi, Tamil, Telugu, Bengali, and other Indian languages entirely on your own machine — no data leaves your environment.
          </p>
          <div className="mt-6 rounded-xl border border-emerald-400/20 bg-emerald-500/[0.06] p-4 text-sm leading-relaxed text-emerald-100/80">
            Running models locally keeps user data on-premises, which matters for DPDP-conscious deployments — but local processing is one input to a compliance posture, not a substitute for one.
          </div>
        </section>

        <section className="mt-4">
          <h2 className="text-xl font-black text-white">Why Local Indic NLP</h2>
          <ul className="mt-4 space-y-2 text-sm leading-relaxed text-white/65">
            <li className="flex gap-2"><span className="text-cyan-300">–</span><span><strong className="text-white/85">Data locality:</strong> processing stays on infrastructure you control, relevant for DPDP and RBI-adjacent workloads.</span></li>
            <li className="flex gap-2"><span className="text-cyan-300">–</span><span><strong className="text-white/85">Language coverage:</strong> models like AI4Bharat's IndicBERT family are trained specifically on Indian-language corpora rather than adapted from English-first models.</span></li>
            <li className="flex gap-2"><span className="text-cyan-300">–</span><span><strong className="text-white/85">No per-token API cost:</strong> once downloaded, inference is free to run repeatedly.</span></li>
            <li className="flex gap-2"><span className="text-cyan-300">–</span><span><strong className="text-white/85">No network round-trip:</strong> local execution removes an external API call from the latency budget.</span></li>
          </ul>
        </section>

        <section className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="text-xl font-black text-white">Option 1: Ollama</h2>
          <p className="mt-3 text-sm leading-relaxed text-white/65">
            Ollama is a lightweight, cross-platform local model runner that supports custom system prompts via a Modelfile.
          </p>
          <div className="mt-4">
            <div className="text-xs font-bold uppercase tracking-wide text-white/40">Install</div>
            <pre className="mt-2 overflow-x-auto rounded-lg border border-white/10 bg-black/40 p-3 text-sm text-cyan-300"><code>curl -fsSL https://ollama.com/install.sh | sh</code></pre>
          </div>
          <div className="mt-4">
            <div className="text-xs font-bold uppercase tracking-wide text-white/40">Create a Modelfile</div>
            <pre className="mt-2 overflow-x-auto rounded-lg border border-white/10 bg-black/40 p-3 text-sm text-cyan-300"><code>{`FROM llama2:7b
SYSTEM """You respond in Hindi, Tamil, Telugu, Bengali, or English
depending on the language the user writes in."""
PARAMETER temperature 0.7`}</code></pre>
          </div>
          <div className="mt-4">
            <div className="text-xs font-bold uppercase tracking-wide text-white/40">Build and run</div>
            <pre className="mt-2 overflow-x-auto rounded-lg border border-white/10 bg-black/40 p-3 text-sm text-cyan-300"><code>{`ollama create indic -f ./Modelfile
ollama run indic`}</code></pre>
          </div>
          <p className="mt-4 text-xs text-white/40">
            A general-purpose model like Llama 2 has partial multilingual ability from pretraining, not dedicated Indic fine-tuning — for language-specific accuracy, pair this pattern with a model actually trained for the target language (see Option 2).
          </p>
        </section>

        <section className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="text-xl font-black text-white">Option 2: Hugging Face Transformers</h2>
          <p className="mt-3 text-sm leading-relaxed text-white/65">
            Use the <code className="rounded bg-white/10 px-1 py-0.5">transformers</code> library with a model trained specifically for Indian languages, such as one from AI4Bharat.
          </p>
          <div className="mt-4">
            <div className="text-xs font-bold uppercase tracking-wide text-white/40">Environment</div>
            <pre className="mt-2 overflow-x-auto rounded-lg border border-white/10 bg-black/40 p-3 text-sm text-cyan-300"><code>pip install transformers torch sentencepiece</code></pre>
          </div>
          <div className="mt-4">
            <div className="text-xs font-bold uppercase tracking-wide text-white/40">Example: text classification in Hindi</div>
            <pre className="mt-2 overflow-x-auto rounded-lg border border-white/10 bg-black/40 p-3 text-sm text-cyan-300"><code>{`from transformers import pipeline

# Use a checkpoint fine-tuned for your specific task —
# a base language model alone won't have a classification head.
classifier = pipeline(
    "text-classification",
    model="<a task-specific fine-tuned Indic checkpoint>"
)

result = classifier("यह फिल्म बहुत अच्छी है!")
print(result)`}</code></pre>
          </div>
          <p className="mt-4 text-xs text-white/40">
            Model weights can run into several GB — check disk space and RAM before downloading, and confirm the checkpoint you pick was actually fine-tuned for the task (classification, NER, translation) you need, not just pretrained.
          </p>
        </section>

        <section className="mt-8 rounded-2xl border border-violet-400/20 bg-violet-500/[0.05] p-6">
          <h2 className="text-xl font-black text-white">Option 3: Expose It as an MCP Server</h2>
          <p className="mt-3 text-sm leading-relaxed text-white/65">
            Once you have a local pipeline working, wrap it in a small MCP server so any MCP client can call it as a tool. There's no ready-made <code className="rounded bg-white/10 px-1 py-0.5">pip install</code> package for this — you write a thin server around your own pipeline, following the same pattern as any other custom MCP tool.
          </p>
          <div className="mt-4">
            <div className="text-xs font-bold uppercase tracking-wide text-white/40">Client config, once your server exists</div>
            <pre className="mt-2 overflow-x-auto rounded-lg border border-white/10 bg-black/40 p-3 text-sm text-cyan-300"><code>{`{
  "mcpServers": {
    "indic-nlp": {
      "command": "python",
      "args": ["path/to/your_server.py"],
      "env": {
        "MODEL_PATH": "/path/to/your/model"
      }
    }
  }
}`}</code></pre>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-white/65">
            For the mechanics of defining tools and handlers, see the{" "}
            <Link href="/mcp-python" className="text-cyan-300">MCP Python</Link> pillar and{" "}
            <Link href="/blog/model-context-protocol-beginner-guide" className="text-cyan-300">
              MCP beginner's guide
            </Link>
            .
          </p>
        </section>

        <div className="mt-12 rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-950/30 to-violet-950/30 p-8 text-center">
          <h3 className="text-xl font-black text-white">Related reading</h3>
          <p className="mx-auto mt-3 max-w-xl text-sm text-white/58">
            See the India services integrations for payment and communication MCP servers, or the DPDP guide for the compliance side of running AI infrastructure in India.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/learn/india-services" className="inline-flex items-center gap-2 rounded-md bg-violet-600 px-5 py-2.5 text-xs font-black text-white">
              India Services Hub <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/learn/dpdp-compliance-guide" className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-5 py-2.5 text-xs font-black text-white">
              DPDP Compliance Guide
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
