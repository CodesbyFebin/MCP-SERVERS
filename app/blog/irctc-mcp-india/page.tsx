import type { Metadata } from "next";
import Link from "next/link";
import { BrandMcpArticle, P, Ext } from "@/src/components/content/BrandMcpArticle";

export const dynamic = "force-static";

const SLUG = "irctc-mcp-india";
const TITLE = "IRCTC MCP: Can an AI Book Train Tickets?";
const DESCRIPTION =
  "IRCTC has no official MCP server, and no MCP server can book IRCTC tickets. What AI assistants can do today (train search, availability, PNR) and why booking automation is risky.";
const REVIEWED = "2026-09-23";
const RISHI = "https://github.com/RishiMaddheshiya/indian_railway_mcp-server";

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
      h1="IRCTC MCP Server"
      description={DESCRIPTION}
      status="no-official"
      reviewedAt={REVIEWED}
      directAnswer="IRCTC has not published an MCP server, and we found no MCP server that books IRCTC tickets. Community servers can help an AI assistant plan a trip: search trains, check seat availability and fares, and read PNR status. Booking, payment and cancellation still happen on the IRCTC website or app."
      sections={[
        {
          id: "can",
          heading: "What an AI assistant can do today",
          body: (
            <>
              <P>With a community Indian Railways MCP server connected, you can ask things like:</P>
              <ul className="mb-4 list-inside list-disc space-y-2 text-slate-700 dark:text-slate-300">
                <li>Which trains run from Pune to Nagpur on Friday?</li>
                <li>Is 3A available on train 12129 for that date, and what is the fare?</li>
                <li>What is the status of PNR 1234567890?</li>
                <li>Plan a route from Kochi to Varanasi with one change.</li>
              </ul>
              <P>
                The tools for these are listed on our{" "}
                <Link href="/blog/indian-railways-mcp-india" className="text-blue-600 hover:underline dark:text-blue-400">
                  Indian Railways MCP page
                </Link>
                .
              </P>
            </>
          ),
        },
        {
          id: "cannot",
          heading: "What it cannot do",
          body: (
            <>
              <P>
                The most complete community server,{" "}
                <Ext href={RISHI}>RishiMaddheshiya/indian_railway_mcp-server</Ext>, says plainly
                that it &ldquo;cannot book, cancel or pay for tickets, and it never will.&rdquo; We
                found no MCP server that logs in to IRCTC to book.
              </P>
              <P>
                Its README also notes that there is no official free public API for Indian Railways
                passenger data, so availability and fares come from unofficial sources and should
                be checked on IRCTC before you book.
              </P>
            </>
          ),
        },
        {
          id: "why",
          heading: "Why automated booking is a bad idea anyway",
          body: (
            <ul className="list-inside list-disc space-y-2 text-slate-700 dark:text-slate-300">
              <li>
                A booking tool would need your IRCTC username and password, and would handle
                payment. That is a lot of trust to give unofficial code.
              </li>
              <li>Automating the IRCTC website may breach its terms of use; check them before trying.</li>
              <li>
                Bookings involve passenger names, ages and ID details. Mistakes are hard to fix
                after payment.
              </li>
            </ul>
          ),
        },
        {
          id: "workflow",
          heading: "A practical workflow",
          body: (
            <ol className="list-inside list-decimal space-y-2 text-slate-700 dark:text-slate-300">
              <li>Ask the assistant to find trains and compare availability and fares.</li>
              <li>Pick the train and class yourself.</li>
              <li>Book on IRCTC, then ask the assistant to track the PNR.</li>
            </ol>
          ),
        },
      ]}
      evidence={[
        {
          source: "RishiMaddheshiya/indian_railway_mcp-server README",
          url: RISHI,
          type: "repository",
          status: "verified",
          reviewedAt: REVIEWED,
          finding:
            "Read-only; cannot book, cancel or pay for tickets; no official free public API for Indian Railways passenger data; not affiliated with IRCTC; verify on IRCTC before booking; tools include train search, seat availability, fare, PNR status and journey planning.",
        },
      ]}
      faqs={[
        {
          question: "Is there an official IRCTC MCP server?",
          answer: "No official IRCTC MCP server was found as of the review date.",
        },
        {
          question: "Can Claude or ChatGPT book IRCTC tickets through MCP?",
          answer: "Not through any MCP server we found. Community servers are read-only.",
        },
        {
          question: "Can an AI check my PNR status?",
          answer: "Yes, with a community server that has a PNR tool, such as get_pnr_status in RishiMaddheshiya/indian_railway_mcp-server.",
        },
        {
          question: "Should I give an AI tool my IRCTC password?",
          answer: "We don't recommend it. None of the read-only servers needs it, and booking automation would put your account and payments at risk.",
        },
        {
          question: "Is the availability data reliable?",
          answer: "It comes from unofficial sources. Confirm on IRCTC before booking.",
        },
      ]}
      related={[
        { href: "/blog/indian-railways-mcp-india", label: "Indian Railways MCP servers" },
        { href: "/blog/makemytrip-mcp-india", label: "MakeMyTrip MCP status" },
        { href: "/security/mcp-security", label: "MCP security overview" },
        { href: "/best/mcp-servers", label: "Best MCP servers: where to start" },
      ]}
    />
  );
}
