import type { Metadata } from "next";
import type { ReactNode } from "react";
import { BrandMcpArticle, P } from "@/src/components/content/BrandMcpArticle";

/**
 * Page for a brand where no official or community MCP server could be
 * verified. Rendered noindex,follow: a truthful answer for visitors, but not
 * a page worth competing in search with near-identical siblings. Flip to
 * index once a real server exists and the page is rewritten around it.
 */
export interface NoMcpFoundProps {
  slug: string;
  brand: string;
  reviewedAt: string;
  /** What kind of company this is, e.g. "a bank" or "a UPI payments app". */
  kind: string;
  /** Brand-specific paragraph: what an MCP server for it would need, or nearby options. */
  context: ReactNode;
  alternatives: { href: string; label: string }[];
}

export function noMcpMetadata(slug: string, brand: string): Metadata {
  const title = `${brand} MCP Server: None Found Yet`;
  const description = `We found no official or community MCP server for ${brand}. What that means, what to avoid, and related options.`;
  return {
    title,
    description,
    alternates: { canonical: `https://www.mcpserver.in/blog/${slug}` },
    robots: { index: false, follow: true },
    openGraph: { title, description, type: "article" },
  };
}

export function NoMcpFound(props: NoMcpFoundProps) {
  const { brand } = props;
  const title = `${brand} MCP Server: None Found Yet`;
  return (
    <BrandMcpArticle
      slug={props.slug}
      title={title}
      h1={`${brand} MCP Server`}
      description={`We found no official or community MCP server for ${brand}.`}
      status="no-official"
      reviewedAt={props.reviewedAt}
      directAnswer={`As of ${props.reviewedAt}, ${brand} has not published an MCP server, and we did not find a community MCP server for it worth recommending. An AI assistant cannot connect to your ${brand} account through MCP today.`}
      sections={[
        {
          id: "context",
          heading: `Why there is no ${brand} MCP server yet`,
          body: <>{props.context}</>,
        },
        {
          id: "avoid",
          heading: "What to avoid",
          body: (
            <ul className="list-inside list-disc space-y-2 text-slate-700 dark:text-slate-300">
              <li>
                Any tool that asks for your {brand} password, PIN or OTP so an AI assistant can
                &ldquo;connect&rdquo; to it. That gives unofficial code full access to your account.
              </li>
              <li>
                Listings that claim an official {brand} MCP server without a link to {brand}&apos;s
                own website or GitHub organisation.
              </li>
            </ul>
          ),
        },
        {
          id: "check",
          heading: "How to check for yourself",
          body: (
            <P>
              Look for an announcement on {brand}&apos;s own website, developer portal or official
              GitHub organisation, or search the official MCP Registry at
              registry.modelcontextprotocol.io. We will update this page when something real
              appears.
            </P>
          ),
        },
      ]}
      evidence={[
        {
          source: `Search for a ${brand} MCP server`,
          url: `https://www.mcpserver.in/blog/${props.slug}`,
          type: "editorial",
          status: "verified",
          reviewedAt: props.reviewedAt,
          finding: `Web searches on ${props.reviewedAt} for an official or community ${brand} MCP server, ${props.kind}, returned no qualifying result.`,
          limitations: "Absence of evidence: a server could exist that our searches did not surface.",
        },
      ]}
      faqs={[
        {
          question: `Is there an official ${brand} MCP server?`,
          answer: `Not that we could find as of ${props.reviewedAt}.`,
        },
        {
          question: `Can Claude or ChatGPT access my ${brand} account?`,
          answer: `Not through MCP today. Don't give an AI tool your ${brand} password, PIN or OTP.`,
        },
      ]}
      related={props.alternatives}
    />
  );
}
