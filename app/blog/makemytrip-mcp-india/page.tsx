import type { Metadata } from "next";
import Link from "next/link";
import { BrandMcpArticle, P, Ext } from "@/src/components/content/BrandMcpArticle";

export const dynamic = "force-static";

const SLUG = "makemytrip-mcp-india";
const TITLE = "MakeMyTrip MCP Server: What Exists Today";
const DESCRIPTION =
  "MakeMyTrip has no official MCP server. An open-source flight-search server and commercial scrapers expose MakeMyTrip data over MCP. What they do, their limits, and booking risks.";
const REVIEWED = "2026-09-23";
const FLIGHT = "https://github.com/ravi-bytes/india-flight-mcp";
const BRIGHT = "https://brightdata.com/ai/mcp-server/makemytrip";
const APIFY = "https://apify.com/ecomscrape/makemytrip-hotel-details-scraper/api/mcp";

export function generateMetadata(): Metadata {
  return {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: `https://www.mcpserver.in/blog/${SLUG}` },
    robots: { index: true, follow: true },
    openGraph: { title: TITLE, description: DESCRIPTION, type: "article" },
  };
}

export default function Page() {
  return (
    <BrandMcpArticle
      slug={SLUG}
      title={TITLE}
      h1="MakeMyTrip MCP Server"
      description={DESCRIPTION}
      status="no-official"
      reviewedAt={REVIEWED}
      directAnswer="MakeMyTrip has not published an official MCP server. You can get MakeMyTrip flight prices into an AI assistant with the open-source india-flight-mcp project, and hotel and travel data through commercial scraping services that offer MCP access, such as Bright Data and Apify. None of these books trips; booking stays on MakeMyTrip."
      sections={[
        {
          id: "options",
          heading: "Options",
          body: (
            <ul className="mb-4 list-inside list-disc space-y-3 text-slate-700 dark:text-slate-300">
              <li>
                <Ext href={FLIGHT}>ravi-bytes/india-flight-mcp</Ext> (MIT, Node.js 16+): searches
                flights and deals across Indian travel sites. MakeMyTrip is the active provider;
                Cleartrip, EaseMyTrip, Yatra, Goibibo and HappyFares are listed as coming soon. It
                does not book. The README does not say how it collects data.
              </li>
              <li>
                <Ext href={BRIGHT}>Bright Data&apos;s MakeMyTrip MCP server</Ext>: a commercial
                scraping service described as extracting public MakeMyTrip data such as flight
                prices, hotel availability, packages and reviews.
              </li>
              <li>
                <Ext href={APIFY}>Apify MakeMyTrip hotel scrapers</Ext>: hosted actors callable over
                MCP that return hotel details and reviews.
              </li>
            </ul>
          ),
        },
        {
          id: "limits",
          heading: "Limits and risks",
          body: (
            <ul className="list-inside list-disc space-y-2 text-slate-700 dark:text-slate-300">
              <li>Prices from scraped pages can be stale by the time you book; confirm on MakeMyTrip.</li>
              <li>Scraping may conflict with MakeMyTrip&apos;s terms of use.</li>
              <li>Commercial scrapers charge per use; check pricing before connecting them to an assistant that may call them often.</li>
              <li>No option here handles your MakeMyTrip login or payment, which is a good thing.</li>
            </ul>
          ),
        },
        {
          id: "trains",
          heading: "Trains",
          body: (
            <P>
              For train search, availability and PNR status, community Indian Railways servers
              are more direct. See{" "}
              <Link href="/blog/indian-railways-mcp-india" className="text-blue-600 hover:underline dark:text-blue-400">
                Indian Railways MCP servers
              </Link>
              .
            </P>
          ),
        },
      ]}
      evidence={[
        {
          source: "ravi-bytes/india-flight-mcp README",
          url: FLIGHT,
          type: "repository",
          status: "verified",
          reviewedAt: REVIEWED,
          finding:
            "Aggregates Indian flight prices and deals; MakeMyTrip active, others coming soon; Node.js 16+; npm install/npm start; MIT; no booking.",
          limitations: "Data collection method not stated.",
        },
        {
          source: "Bright Data: MakeMyTrip MCP server",
          url: BRIGHT,
          type: "registry",
          status: "unverified",
          reviewedAt: REVIEWED,
          finding: "Commercial scraping of public MakeMyTrip data over MCP.",
          limitations: "Based on search summary of the product page.",
        },
        {
          source: "Apify MakeMyTrip hotel details scraper",
          url: APIFY,
          type: "registry",
          status: "unverified",
          reviewedAt: REVIEWED,
          finding: "Hosted scraper for MakeMyTrip hotel details usable over MCP.",
          limitations: "Based on the listing.",
        },
      ]}
      faqs={[
        {
          question: "Does MakeMyTrip have an official MCP server?",
          answer: "No official MakeMyTrip MCP server was found as of the review date.",
        },
        {
          question: "Can an AI book flights on MakeMyTrip?",
          answer: "Not through any MCP server we found. The options are search and data only.",
        },
        {
          question: "Is there a free option?",
          answer: "ravi-bytes/india-flight-mcp is open source under MIT. The scraping services are commercial.",
        },
        {
          question: "How current are the prices?",
          answer: "They are fetched or scraped at query time and can change; confirm on MakeMyTrip before booking.",
        },
        {
          question: "Can it compare MakeMyTrip with other sites?",
          answer: "india-flight-mcp lists other Indian travel sites as coming soon; only MakeMyTrip was active on the review date.",
        },
      ]}
      related={[
        { href: "/blog/indian-railways-mcp-india", label: "Indian Railways MCP servers" },
        { href: "/blog/irctc-mcp-india", label: "IRCTC MCP and ticket booking" },
        { href: "/security/mcp-security", label: "MCP security overview" },
        { href: "/best/mcp-servers", label: "Best MCP servers: where to start" },
      ]}
    />
  );
}
