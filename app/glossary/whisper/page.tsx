import type { Metadata } from "next";
import { BrandMcpArticle, P, Ext } from "@/src/components/content/BrandMcpArticle";

export const dynamic = "force-static";

const SLUG = "whisper";
const PATH = `/glossary/${SLUG}`;
const TITLE = "Whisper Speech Recognition Explained";
const DESCRIPTION =
  "What OpenAI's Whisper is, how it was trained, what it is good at, and how to expose speech-to-text as an MCP tool for voice notes and Indian-language audio.";
const REVIEWED = "2026-09-23";
const PAPER = "https://arxiv.org/abs/2212.04356";
const REPO = "https://github.com/openai/whisper";

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
      h1="Whisper (Speech Recognition)"
      description={DESCRIPTION}
      reviewedAt={REVIEWED}
      directAnswer="Whisper is a speech-recognition model from OpenAI, described in the 2022 paper Robust Speech Recognition via Large-Scale Weak Supervision. It was trained on 680,000 hours of multilingual, multitask audio transcripts from the internet and performs well zero-shot, without fine-tuning. OpenAI released the models and inference code, so it can run locally."
      sections={[
        {
          id: "paper",
          heading: "What the paper reports",
          body: (
            <P>
              According to <Ext href={PAPER}>Radford et al.</Ext> (arXiv:2212.04356), when scaled to
              680,000 hours of multilingual and multitask supervision, the models &ldquo;generalize
              well to standard benchmarks and are often competitive with prior fully supervised
              results but in a zero-shot transfer setting&rdquo;, and approach human accuracy and
              robustness. The models and code are published in the{" "}
              <Ext href={REPO}>openai/whisper</Ext> repository.
            </P>
          ),
        },
        {
          id: "mcp",
          heading: "Whisper as an MCP tool",
          body: (
            <>
              <P>
                A local MCP server can expose a <code>transcribe_audio</code> tool that takes a file
                path, runs Whisper, and returns text the model can summarise or act on. Useful for:
              </P>
              <ul className="list-inside list-disc space-y-2 text-slate-700 dark:text-slate-300">
                <li>Voice notes and meeting recordings</li>
                <li>Customer calls attached to support tickets</li>
                <li>Mixed-language audio, common in India, before translation</li>
              </ul>
            </>
          ),
        },
        {
          id: "tips",
          heading: "Practical tips",
          body: (
            <ul className="list-inside list-disc space-y-2 text-slate-700 dark:text-slate-300">
              <li>Transcription takes time; send progress notifications for long files and set generous timeouts.</li>
              <li>Accept file paths within an allowed folder, and reject paths outside it.</li>
              <li>Test accuracy on your own accents and languages; benchmark results don&apos;t guarantee quality on your audio.</li>
              <li>Recordings are personal data. Running locally keeps audio off third-party servers.</li>
            </ul>
          ),
        },
      ]}
      evidence={[
        {
          source: "Radford et al.: Robust Speech Recognition via Large-Scale Weak Supervision",
          url: PAPER,
          type: "documentation",
          status: "verified",
          reviewedAt: REVIEWED,
          finding: "680,000 hours of multilingual, multitask supervision; strong zero-shot generalisation; approaches human accuracy and robustness; models and inference code released.",
        },
        {
          source: "openai/whisper (GitHub)",
          url: REPO,
          type: "repository",
          status: "unverified",
          reviewedAt: REVIEWED,
          finding: "Repository hosting the released models and inference code.",
          limitations: "Repository contents not reviewed in detail.",
        },
      ]}
      faqs={[
        {
          question: "What is Whisper?",
          answer: "OpenAI's open speech-recognition model, trained on 680,000 hours of multilingual audio.",
        },
        {
          question: "Can Whisper run locally?",
          answer: "Yes. OpenAI released the models and inference code.",
        },
        {
          question: "Does it support languages other than English?",
          answer: "Yes. It was trained on multilingual data; test accuracy on the languages you need.",
        },
        {
          question: "How do I use it with Claude or another MCP client?",
          answer: "Wrap it in an MCP server with a transcription tool that takes an audio file and returns text.",
        },
        {
          question: "Is it accurate enough for production?",
          answer: "It depends on your audio. Evaluate on real samples before relying on it.",
        },
      ]}
      related={[
        { href: "/learn/indic-nlp-guide", label: "Indic NLP guide for MCP builders" },
        { href: "/glossary/mcp-progress", label: "MCP progress notifications" },
        { href: "/glossary/model-serving", label: "Model serving" },
        { href: "/glossary", label: "MCP glossary" },
      ]}
    />
  );
}
