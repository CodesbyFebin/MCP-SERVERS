import type { Metadata } from "next";
import { BrandMcpArticle, Code, P, Ext } from "@/src/components/content/BrandMcpArticle";

export const dynamic = "force-static";

const SLUG = "bpe";
const PATH = `/glossary/${SLUG}`;
const TITLE = "Byte Pair Encoding (BPE) Explained";
const DESCRIPTION =
  "What byte pair encoding is, how BPE tokenisation splits words into subword units, where it came from, and why token counts matter for MCP tool results and context windows.";
const REVIEWED = "2026-09-23";
const PAPER = "https://arxiv.org/abs/1508.07909";

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
      h1="BPE (Byte Pair Encoding)"
      description={DESCRIPTION}
      reviewedAt={REVIEWED}
      directAnswer="Byte pair encoding (BPE) is a way of splitting text into subword tokens. It starts from single characters (or bytes) and repeatedly merges the most frequent adjacent pair into a new token until the vocabulary reaches a target size. Common words become one token; rare words are built from pieces. Sennrich, Haddow and Birch applied it to neural machine translation in 2015 so models could handle words they had never seen."
      sections={[
        {
          id: "how",
          heading: "How it works",
          body: (
            <>
              <P>A toy example with the words low, lower and lowest, merging the most frequent pair each time:</P>
              <Code>{`start:   l o w | l o w e r | l o w e s t
merge 1: "l o" → "lo"    lo w | lo w e r | lo w e s t
merge 2: "lo w" → "low"  low | low e r | low e s t
merge 3: "low e" → "lowe" low | lowe r | lowe s t`}</Code>
              <P>
                The learned merges are then applied in the same order to new text. An unseen word
                such as &ldquo;lowered&rdquo; still tokenises, as <code>lowe</code> +{" "}
                <code>r</code> + <code>e</code> + <code>d</code>.
              </P>
            </>
          ),
        },
        {
          id: "origin",
          heading: "Origin",
          body: (
            <P>
              BPE began as a data-compression algorithm. <Ext href={PAPER}>Sennrich et al.</Ext>{" "}
              (arXiv:1508.07909) used it to make translation models &ldquo;capable of
              open-vocabulary translation by encoding rare and unknown words as sequences of
              subword units&rdquo;, and reported gains of 1.1 and 1.3 BLEU on WMT 15
              English–German and English–Russian over a back-off dictionary baseline.
            </P>
          ),
        },
        {
          id: "mcp",
          heading: "Why it matters for MCP",
          body: (
            <ul className="list-inside list-disc space-y-2 text-slate-700 dark:text-slate-300">
              <li>
                Models count context in tokens, not characters. A large tool result can use much of
                the context window, so return only what the model needs and paginate long lists.
              </li>
              <li>
                Tokenisers trained mostly on English text often split other scripts, such as
                Devanagari or Bengali, into more tokens per word. Check real token counts for
                Indian-language content rather than estimating from character length.
              </li>
              <li>Different models use different tokenisers, so the same text can cost different amounts.</li>
            </ul>
          ),
        },
      ]}
      evidence={[
        {
          source: "Sennrich, Haddow, Birch: Neural Machine Translation of Rare Words with Subword Units",
          url: PAPER,
          type: "documentation",
          status: "verified",
          reviewedAt: REVIEWED,
          finding: "Subword units via byte pair encoding enable open-vocabulary NMT; +1.1 and +1.3 BLEU on WMT 15 En-De and En-Ru over a back-off dictionary.",
        },
        {
          source: "Toy merge example on this page",
          url: `https://www.mcpserver.in${PATH}`,
          type: "editorial",
          status: "verified",
          reviewedAt: REVIEWED,
          finding: "Illustrative merges on a three-word corpus.",
          limitations: "The script-efficiency note is a general observation; measure with your model's tokenizer.",
        },
      ]}
      faqs={[
        {
          question: "What does BPE stand for?",
          answer: "Byte pair encoding.",
        },
        {
          question: "Why use subwords instead of whole words?",
          answer: "Subwords keep the vocabulary manageable while still representing rare and unseen words.",
        },
        {
          question: "Do all LLMs use BPE?",
          answer: "Many use BPE or close variants, but tokenisers differ between model families.",
        },
        {
          question: "How does tokenisation affect MCP servers?",
          answer: "Tool results consume tokens in the model's context, so keep them concise and paginate large outputs.",
        },
        {
          question: "Who introduced BPE for neural models?",
          answer: "Sennrich, Haddow and Birch applied it to neural machine translation in 2015 (arXiv:1508.07909).",
        },
      ]}
      related={[
        { href: "/learn/indic-nlp-guide", label: "Indic NLP guide for MCP builders" },
        { href: "/glossary/semantic-search", label: "Semantic search" },
        { href: "/glossary/system-prompt", label: "System prompt" },
        { href: "/glossary", label: "MCP glossary" },
      ]}
    />
  );
}
