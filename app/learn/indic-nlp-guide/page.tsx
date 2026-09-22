import type { Metadata } from "next";
import { BrandMcpArticle, Code, P, Ext } from "@/src/components/content/BrandMcpArticle";

export const dynamic = "force-static";

const SLUG = "indic-nlp-guide";
const PATH = `/learn/${SLUG}`;
const TITLE = "Indic NLP for MCP: Translation and Text Tools";
const DESCRIPTION =
  "Open-source building blocks for Indian-language AI tools: IndicTrans2 for translation across 22 scheduled languages and the Indic NLP Library for normalisation, tokenisation and transliteration, wrapped as MCP tools.";
const REVIEWED = "2026-09-23";
const INDICTRANS = "https://github.com/AI4Bharat/IndicTrans2";
const PAPER = "https://arxiv.org/abs/2305.16307";
const INLTK = "https://github.com/anoopkunchukuttan/indic_nlp_library";
const PYSDK = "https://github.com/modelcontextprotocol/python-sdk";

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
      section={{ label: "Learn", href: "/learn" }}
      title={TITLE}
      h1="Indic NLP Guide for MCP Builders"
      description={DESCRIPTION}
      reviewedAt={REVIEWED}
      directAnswer="To give an AI assistant reliable Indian-language tools, wrap proven open-source models and libraries as MCP tools. AI4Bharat's IndicTrans2 translates between English and all 22 scheduled Indian languages and among Indian languages, under the MIT licence. The Indic NLP Library handles the text plumbing: normalisation, tokenisation, sentence splitting and script conversion. An MCP server exposes these as tools any MCP client can call."
      sections={[
        {
          id: "why",
          heading: "Why dedicated Indic tools",
          body: (
            <P>
              General-purpose language models handle Hindi and other major Indian languages to
              varying degrees, but results can vary for lower-resource languages, mixed scripts and
              code-mixed text. A dedicated translation model or a deterministic script converter
              gives you a predictable, testable step that the assistant can call instead of
              guessing.
            </P>
          ),
        },
        {
          id: "indictrans2",
          heading: "IndicTrans2: translation",
          body: (
            <>
              <P>
                <Ext href={INDICTRANS}>IndicTrans2</Ext> from AI4Bharat describes itself as
                &ldquo;the first open-source transformer-based multilingual NMT model that supports
                high-quality translations across all the 22 scheduled Indic languages&rdquo;. The
                paper was published in Transactions on Machine Learning Research in 2023{" "}
                (<Ext href={PAPER}>arXiv:2305.16307</Ext>).
              </P>
              <P>Languages covered:</P>
              <P>
                Assamese, Bengali, Bodo, Dogri, English, Gujarati, Hindi, Kannada, Kashmiri (Arabic
                and Devanagari), Konkani, Malayalam, Maithili, Manipuri (Bengali and Meitei),
                Marathi, Nepali, Odia, Punjabi, Sanskrit, Santali, Sindhi (Arabic and Devanagari),
                Tamil, Telugu, Urdu.
              </P>
              <P>Checkpoints on Hugging Face:</P>
              <ul className={UL}>
                <li><code>ai4bharat/indictrans2-en-indic-1B</code> and <code>ai4bharat/indictrans2-en-indic-dist-200M</code></li>
                <li><code>ai4bharat/indictrans2-indic-en-1B</code> and <code>ai4bharat/indictrans2-indic-en-dist-200M</code></li>
                <li><code>ai4bharat/indictrans2-indic-indic-1B</code> and <code>ai4bharat/indictrans2-indic-indic-dist-320M</code></li>
              </ul>
              <P>
                The 1B models are the full-size versions; the distilled 200M and 320M versions are
                smaller and cheaper to run. The repository also lists long-context variants (up to
                2048 tokens). Model checkpoints are released under the MIT licence.
              </P>
            </>
          ),
        },
        {
          id: "inlp",
          heading: "Indic NLP Library: text processing",
          body: (
            <>
              <P>
                The <Ext href={INLTK}>Indic NLP Library</Ext>, maintained by Anoop Kunchukuttan
                under the MIT licence, covers text normalisation, script information, word
                tokenisation and detokenisation, sentence splitting, word segmentation,
                syllabification, script conversion, romanisation and indicisation.
              </P>
              <Code>pip install indic-nlp-library</Code>
              <P>
                It needs the separate Indic NLP Resources repository for some functions; follow the
                setup in its README.
              </P>
            </>
          ),
        },
        {
          id: "mcp",
          heading: "Exposing them as MCP tools",
          body: (
            <>
              <P>
                With the official <Ext href={PYSDK}>MCP Python SDK</Ext> (v2), a tool is a typed
                Python function with a decorator. A minimal server skeleton:
              </P>
              <Code>{`from mcp.server import MCPServer

mcp = MCPServer("indic-tools")

@mcp.tool()
def translate(text: str, source_lang: str, target_lang: str) -> str:
    """Translate text between English and Indian languages with IndicTrans2.
    Language codes follow IndicTrans2's convention, e.g. eng_Latn, hin_Deva, tam_Taml."""
    return run_indictrans2(text, source_lang, target_lang)  # your model wrapper

@mcp.tool()
def normalize(text: str, lang: str) -> str:
    """Normalise Indian-language text with the Indic NLP Library."""
    return run_normalizer(text, lang)  # your library wrapper`}</Code>
              <P>
                Install the SDK with <code>uv add &quot;mcp[cli]&quot;</code> and test it in the
                MCP Inspector with <code>uv run mcp dev server.py</code>. The helper functions are
                yours to write against each project&apos;s documented API; check the IndicTrans2
                README for its preprocessing and language-code conventions.
              </P>
            </>
          ),
        },
        {
          id: "design",
          heading: "Design tips",
          body: (
            <ul className={UL}>
              <li>
                <strong>Load models once.</strong> A 1B-parameter model takes time and memory to
                load. Load it at server start, not per call, or use a distilled checkpoint.
              </li>
              <li>
                <strong>Make language codes explicit.</strong> Put the accepted codes in the tool
                description so the model passes valid values.
              </li>
              <li>
                <strong>Keep text local if it is sensitive.</strong> A stdio server running on the
                user&apos;s machine keeps text off third-party APIs.
              </li>
              <li>
                <strong>Log to stderr.</strong> Some model-loading code prints progress to
                stdout, which breaks a stdio MCP server. Redirect it.
              </li>
              <li>
                <strong>Evaluate on your text.</strong> Published benchmark scores do not guarantee
                quality on your domain. Test with real samples and native speakers.
              </li>
            </ul>
          ),
        },
      ]}
      evidence={[
        {
          source: "AI4Bharat/IndicTrans2 (GitHub)",
          url: INDICTRANS,
          type: "repository",
          status: "verified",
          reviewedAt: REVIEWED,
          finding:
            "Supports all 22 scheduled Indic languages (language list as given); 1B base models and 200M/320M distilled models for En-Indic, Indic-En and Indic-Indic; long-context variants up to 2048 tokens; Hugging Face model IDs; MIT licence for checkpoints; TMLR 2023, arXiv 2305.16307.",
        },
        {
          source: "anoopkunchukuttan/indic_nlp_library (GitHub)",
          url: INLTK,
          type: "repository",
          status: "verified",
          reviewedAt: REVIEWED,
          finding:
            "Normalisation, script information, tokenisation/detokenisation, sentence splitting, word segmentation, syllabification, script conversion, romanisation, indicisation; pip install indic-nlp-library; MIT licence; requires Indic NLP Resources.",
        },
        {
          source: "modelcontextprotocol/python-sdk README",
          url: PYSDK,
          type: "official",
          status: "verified",
          reviewedAt: REVIEWED,
          finding:
            "v2 quickstart uses from mcp.server import MCPServer with @mcp.tool(); install with uv add \"mcp[cli]\"; test with uv run mcp dev server.py.",
          limitations: "The server skeleton on this page is illustrative; the helper functions are not provided.",
        },
      ]}
      faqs={[
        {
          question: "Which Indian languages does IndicTrans2 support?",
          answer:
            "All 22 scheduled languages: Assamese, Bengali, Bodo, Dogri, Gujarati, Hindi, Kannada, Kashmiri, Konkani, Maithili, Malayalam, Manipuri, Marathi, Nepali, Odia, Punjabi, Sanskrit, Santali, Sindhi, Tamil, Telugu and Urdu, plus English.",
        },
        {
          question: "Can I use IndicTrans2 commercially?",
          answer:
            "The repository states the model checkpoints are released under the MIT licence. Check the licences of any datasets or dependencies you also ship.",
        },
        {
          question: "Is there an official Indic NLP MCP server?",
          answer:
            "We did not find one published by AI4Bharat or the Indic NLP Library maintainers as of the review date. The example on this page shows how to build your own.",
        },
        {
          question: "Which IndicTrans2 model should I start with?",
          answer:
            "Start with a distilled checkpoint (200M or 320M parameters) for lower cost and memory, and move to the 1B model if quality on your text needs it.",
        },
        {
          question: "What does the Indic NLP Library add on top of a translation model?",
          answer:
            "Deterministic text processing: normalisation, tokenisation, sentence splitting and script conversion, which are useful before translation, search or indexing.",
        },
      ]}
      related={[
        { href: "/glossary/mcp-bengali-support", label: "Bengali support in MCP" },
        { href: "/glossary/whisper", label: "Whisper (speech recognition)" },
        { href: "/blog/mcp-transport-methods", label: "MCP transports: stdio vs Streamable HTTP" },
        { href: "/learn/mcp-server", label: "What is an MCP server?" },
      ]}
    />
  );
}
