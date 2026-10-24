import type { Metadata } from "next";
import Link from "next/link";
import { BrandMcpArticle, Code, P, Ext } from "@/src/components/content/BrandMcpArticle";

export const dynamic = "force-static";

const SLUG = "semantic-search";
const PATH = `/glossary/${SLUG}`;
const TITLE = "Semantic Search and MCP Search Tools";
const DESCRIPTION =
  "What semantic search is, how sentence embeddings made it practical, how it differs from keyword search, and how to expose it as an MCP tool with good results.";
const REVIEWED = "2026-09-23";
const SBERT = "https://arxiv.org/abs/1908.10084";

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
      h1="Semantic Search"
      description={DESCRIPTION}
      reviewedAt={REVIEWED}
      directAnswer="Semantic search finds text by meaning rather than exact words. Documents and queries are turned into embedding vectors, and the closest vectors are returned, so a search for 'refund status' can match 'money back tracking'. In MCP, it is usually exposed as a search tool on a server that embeds the query, looks up a vector index, and returns the best passages."
      sections={[
        {
          id: "how",
          heading: "How it became practical",
          body: (
            <P>
              <Ext href={SBERT}>Sentence-BERT</Ext> (Reimers and Gurevych, 2019) showed why
              sentence embeddings matter: finding the most similar pair among 10,000 sentences took
              about 65 hours with BERT used as a cross-encoder, versus about 5 seconds with SBERT
              embeddings compared by cosine similarity, while keeping BERT&apos;s accuracy.
              Embedding each document once and comparing vectors is what makes search at scale
              feasible; indexes like <Link href="/glossary/hnsw" className={L}>HNSW</Link> keep the
              lookup fast.
            </P>
          ),
        },
        {
          id: "keyword",
          heading: "Semantic vs keyword search",
          body: (
            <ul className="list-inside list-disc space-y-2 text-slate-700 dark:text-slate-300">
              <li>Semantic search handles synonyms and paraphrase; keyword search handles exact IDs, codes and names better.</li>
              <li>Many systems combine both (hybrid search) and re-rank the merged results.</li>
              <li>Order numbers, PNRs and SKUs belong in keyword or exact-match filters, not embeddings.</li>
            </ul>
          ),
        },
        {
          id: "mcp",
          heading: "Designing an MCP search tool",
          body: (
            <>
              <Code>{`{
  "name": "search_docs",
  "description": "Search the product docs by meaning. Use for how-to questions. For exact error codes use lookup_error_code.",
  "inputSchema": {
    "type": "object",
    "properties": {
      "query": { "type": "string", "description": "Natural-language question" },
      "limit": { "type": "integer", "minimum": 1, "maximum": 10, "default": 5 }
    },
    "required": ["query"]
  }
}`}</Code>
              <ul className="list-inside list-disc space-y-2 text-slate-700 dark:text-slate-300">
                <li>Return a few short passages with source IDs or URLs, not whole documents.</li>
                <li>Say in the description when to use this tool instead of an exact lookup.</li>
                <li>Filter by the caller&apos;s permissions before returning results.</li>
              </ul>
            </>
          ),
        },
      ]}
      evidence={[
        {
          source: "Reimers, Gurevych: Sentence-BERT",
          url: SBERT,
          type: "documentation",
          status: "verified",
          reviewedAt: REVIEWED,
          finding: "Most similar pair in 10,000 sentences: about 65 hours with BERT vs about 5 seconds with SBERT embeddings and cosine similarity, maintaining BERT's accuracy.",
        },
        {
          source: "Example tool definition on this page",
          url: `https://www.mcpserver.in${PATH}`,
          type: "editorial",
          status: "verified",
          reviewedAt: REVIEWED,
          finding: "Illustrative search tool schema following the MCP tools specification.",
        },
      ]}
      faqs={[
        {
          question: "What is semantic search?",
          answer: "Search by meaning, using embedding vectors, rather than by matching exact words.",
        },
        {
          question: "Is semantic search better than keyword search?",
          answer: "For paraphrased questions, often. For exact IDs and codes, keyword search is better. Hybrid search combines them.",
        },
        {
          question: "What is an embedding?",
          answer: "A vector representation of text where similar meanings end up close together.",
        },
        {
          question: "How do I add semantic search to Claude?",
          answer: "Run an MCP server with a search tool that embeds the query and queries your vector index.",
        },
        {
          question: "How many results should the tool return?",
          answer: "A handful of short passages with sources, to save the model's context.",
        },
      ]}
      related={[
        { href: "/glossary/hnsw", label: "HNSW index" },
        { href: "/glossary/tool-calling", label: "Tool calling" },
        { href: "/directory/databases", label: "Database MCP servers" },
        { href: "/glossary", label: "MCP glossary" },
      ]}
    />
  );
}
