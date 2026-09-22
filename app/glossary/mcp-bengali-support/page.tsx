import type { Metadata } from "next";
import Link from "next/link";
import { BrandMcpArticle, Code, P, Ext } from "@/src/components/content/BrandMcpArticle";

export const dynamic = "force-static";

const SLUG = "mcp-bengali-support";
const PATH = `/glossary/${SLUG}`;
const TITLE = "Bengali Support in MCP Servers";
const DESCRIPTION =
  "Does MCP support Bengali? Yes: messages are UTF-8 JSON. What to watch for in tool names, schemas, headers and tokens, and open tools (IndicTrans2, Indic NLP Library) for Bengali text.";
const REVIEWED = "2026-09-23";
const TRANSPORTS = "https://modelcontextprotocol.io/specification/latest/basic/transports";
const TOOLS = "https://modelcontextprotocol.io/specification/2026-07-28/server/tools";
const HTTP = "https://modelcontextprotocol.io/specification/2026-07-28/basic/transports/streamable-http";
const IT2 = "https://github.com/AI4Bharat/IndicTrans2";

const L = "text-blue-600 hover:underline dark:text-blue-400";
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
      section={{ label: "Glossary", href: "/glossary" }}
      title={TITLE}
      h1="Bengali Support in MCP"
      description={DESCRIPTION}
      reviewedAt={REVIEWED}
      directAnswer="MCP carries Bengali text without special handling: the specification requires JSON-RPC messages to be UTF-8 encoded, so tool arguments, results, descriptions and resources can all contain বাংলা. The places to take care are tool names (which should stay ASCII), HTTP headers (non-ASCII values are Base64-encoded), token counts, and the quality of whatever model or library processes the text."
      sections={[
        {
          id: "works",
          heading: "What works out of the box",
          body: (
            <>
              <P>
                The <Ext href={TRANSPORTS}>transports spec</Ext> says JSON-RPC messages MUST be UTF-8
                encoded. A tool result in Bengali is just a string:
              </P>
              <Code>{`{
  "content": [
    { "type": "text", "text": "আপনার অর্ডার আজ বিকেলে পৌঁছাবে।" }
  ]
}`}</Code>
              <P>Descriptions and argument values can be in Bengali too, which helps when users write in Bengali.</P>
            </>
          ),
        },
        {
          id: "care",
          heading: "Where to take care",
          body: (
            <ul className={UL}>
              <li>
                <strong>Tool names:</strong> the <Ext href={TOOLS}>tools spec</Ext> recommends only
                ASCII letters, digits, underscore, hyphen and dot. Keep names in English
                (<code>track_order</code>) and put Bengali in the description.
              </li>
              <li>
                <strong>HTTP headers:</strong> on Streamable HTTP, values mirrored into{" "}
                <code>Mcp-Name</code> or <code>Mcp-Param-*</code> that aren&apos;t plain ASCII are
                sent Base64-encoded, per the <Ext href={HTTP}>transport spec</Ext>.
              </li>
              <li>
                <strong>Tokens:</strong> many tokenisers split Bengali script into more tokens than
                English for the same meaning, so long Bengali results use more context. See{" "}
                <Link href="/glossary/bpe" className={L}>BPE</Link>.
              </li>
              <li>
                <strong>Normalisation:</strong> the same Bengali word can be encoded in different
                Unicode sequences; normalise text before search or comparison.
              </li>
            </ul>
          ),
        },
        {
          id: "tools",
          heading: "Open tools for Bengali",
          body: (
            <P>
              <Ext href={IT2}>IndicTrans2</Ext> translates between English and Bengali (and the
              other scheduled Indian languages), and the Indic NLP Library handles normalisation
              and tokenisation. Both can sit behind an MCP tool; see the{" "}
              <Link href="/learn/indic-nlp-guide" className={L}>Indic NLP guide</Link>.
            </P>
          ),
        },
      ]}
      evidence={[
        { source: "MCP specification: Transports", url: TRANSPORTS, type: "official", status: "verified", reviewedAt: REVIEWED, finding: "JSON-RPC messages MUST be UTF-8 encoded." },
        { source: "MCP specification 2026-07-28: Tools", url: TOOLS, type: "official", status: "verified", reviewedAt: REVIEWED, finding: "Tool names SHOULD use only ASCII letters, digits, underscore, hyphen and dot." },
        { source: "MCP specification 2026-07-28: Streamable HTTP", url: HTTP, type: "official", status: "verified", reviewedAt: REVIEWED, finding: "Non-ASCII Mcp-Name and Mcp-Param values are Base64-encoded with the =?base64?...?= sentinel." },
        { source: "AI4Bharat/IndicTrans2", url: IT2, type: "repository", status: "verified", reviewedAt: REVIEWED, finding: "Supports all 22 scheduled Indic languages including Bengali." },
      ]}
      faqs={[
        { question: "Does MCP support Bengali?", answer: "Yes. MCP messages are UTF-8 JSON, so Bengali text works in arguments, results and descriptions." },
        { question: "Can tool names be in Bengali?", answer: "The spec recommends ASCII-only tool names. Keep names in English and describe them in Bengali." },
        { question: "Why does a Bengali result use more tokens?", answer: "Tokenisers often split Bengali script into more pieces than English text of similar meaning." },
        { question: "How do I translate Bengali inside an MCP tool?", answer: "Wrap a translation model such as IndicTrans2 as a tool." },
        { question: "Do HTTP headers break with Bengali values?", answer: "No. The spec Base64-encodes non-ASCII values mirrored into MCP headers." },
      ]}
      related={[
        { href: "/learn/indic-nlp-guide", label: "Indic NLP guide for MCP builders" },
        { href: "/glossary/bpe", label: "Byte pair encoding" },
        { href: "/glossary/whisper", label: "Whisper speech recognition" },
        { href: "/glossary", label: "MCP glossary" },
      ]}
    />
  );
}
