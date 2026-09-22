import type { Metadata } from "next";
import Link from "next/link";
import { BrandMcpArticle, P, Ext } from "@/src/components/content/BrandMcpArticle";

export const dynamic = "force-static";

const SLUG = "hnsw";
const PATH = `/glossary/${SLUG}`;
const TITLE = "HNSW Index: How Vector Search Scales";
const DESCRIPTION =
  "What HNSW (Hierarchical Navigable Small World) graphs are, how they make approximate nearest-neighbour search fast, the trade-offs, and where they sit behind MCP search tools.";
const REVIEWED = "2026-09-23";
const PAPER = "https://arxiv.org/abs/1603.09320";

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
      h1="HNSW (Hierarchical Navigable Small World)"
      description={DESCRIPTION}
      reviewedAt={REVIEWED}
      directAnswer="HNSW is a graph-based index for approximate nearest-neighbour search, the operation behind vector search. It stores vectors in several layers of proximity graphs: sparse upper layers for long jumps and denser lower layers for fine search. Starting at the top and descending gives search cost that scales logarithmically, which is why many vector databases use it."
      sections={[
        {
          id: "how",
          heading: "How it works",
          body: (
            <>
              <P>
                From <Ext href={PAPER}>Malkov and Yashunin</Ext> (arXiv:1603.09320): HNSW
                &ldquo;incrementally builds a multi-layer structure consisting from hierarchical set
                of proximity graphs (layers) for nested subsets of the stored elements.&rdquo; Each
                element&apos;s top layer is chosen randomly with an exponentially decaying
                probability, so few elements reach the upper layers.
              </P>
              <P>
                A query starts at the top layer, greedily moves towards closer neighbours, drops a
                layer, and repeats. The authors report this allows &ldquo;a logarithmic complexity
                scaling&rdquo;.
              </P>
            </>
          ),
        },
        {
          id: "tradeoffs",
          heading: "Trade-offs",
          body: (
            <ul className="list-inside list-disc space-y-2 text-slate-700 dark:text-slate-300">
              <li><strong>Approximate:</strong> it can miss the true nearest neighbour. Higher search-time parameters raise recall at the cost of speed.</li>
              <li><strong>Memory:</strong> the graph links add memory on top of the vectors themselves.</li>
              <li><strong>Build time:</strong> inserting is slower than a flat index, which simply stores vectors.</li>
              <li>For small collections, exact (flat) search may be fast enough and simpler.</li>
            </ul>
          ),
        },
        {
          id: "mcp",
          heading: "Where it meets MCP",
          body: (
            <P>
              An MCP server that offers a <code>search</code> tool over documents usually embeds the
              query and asks a vector index, often HNSW-based, for the closest chunks. The model
              never sees the index; it sees the tool and its results. See{" "}
              <Link href="/glossary/semantic-search" className="text-blue-600 hover:underline dark:text-blue-400">
                semantic search
              </Link>
              .
            </P>
          ),
        },
      ]}
      evidence={[
        {
          source: "Malkov, Yashunin: Efficient and robust approximate nearest neighbor search using HNSW graphs",
          url: PAPER,
          type: "documentation",
          status: "verified",
          reviewedAt: REVIEWED,
          finding: "Multi-layer hierarchical proximity graphs; exponentially decaying layer assignment; top-down search with scale separation allows logarithmic complexity scaling.",
          limitations: "Trade-off notes are general properties of graph indexes, not measurements.",
        },
      ]}
      faqs={[
        {
          question: "What does HNSW stand for?",
          answer: "Hierarchical Navigable Small World.",
        },
        {
          question: "Is HNSW exact?",
          answer: "No. It is an approximate nearest-neighbour method; recall depends on its parameters.",
        },
        {
          question: "Why is HNSW fast?",
          answer: "Searching from sparse upper layers down to dense lower ones gives logarithmic complexity scaling, per the original paper.",
        },
        {
          question: "What is the main cost?",
          answer: "Extra memory for the graph links and slower index building than a flat index.",
        },
        {
          question: "Do I need HNSW for an MCP search tool?",
          answer: "Only at scale. Small collections can use exact search.",
        },
      ]}
      related={[
        { href: "/glossary/semantic-search", label: "Semantic search" },
        { href: "/directory/databases", label: "Database MCP servers" },
        { href: "/glossary/tool-calling", label: "Tool calling" },
        { href: "/glossary", label: "MCP glossary" },
      ]}
    />
  );
}
