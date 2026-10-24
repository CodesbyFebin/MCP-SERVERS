import type { Metadata } from "next";
import Link from "next/link";
import { BrandMcpArticle, P, Ext } from "@/src/components/content/BrandMcpArticle";

export const dynamic = "force-static";

const SLUG = "mcp-video-courses-ranked";
const TITLE = "MCP Courses: Free Official Options Compared";
const DESCRIPTION =
  "Free MCP courses from Anthropic Academy and Hugging Face compared: who publishes them, what they cover, certificates, and what to check because the protocol changed in 2026.";
const REVIEWED = "2026-09-23";
const ANTH = "https://anthropic.skilljar.com/introduction-to-model-context-protocol";
const ANTH_ADV = "https://anthropic-partners.skilljar.com/model-context-protocol-advanced-topics";
const HF = "https://huggingface.co/learn/mcp-course/en/unit0/introduction";
const HF_REPO = "https://github.com/huggingface/mcp-course";

const TH = "border-b border-slate-200 px-4 py-2 font-medium text-slate-600 dark:border-slate-800 dark:text-slate-400";

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
      h1="MCP Courses Compared"
      description={DESCRIPTION}
      reviewedAt={REVIEWED}
      directAnswer="The two most credible free MCP courses come from the people behind the protocol and its ecosystem: Anthropic Academy's Introduction to Model Context Protocol (with an advanced follow-up) and Hugging Face's MCP Course, built in partnership with Anthropic. We have not taken them end to end, so this is a factual comparison, not a ranking. Whichever you choose, check it covers the 2026-07-28 protocol changes."
      sections={[
        {
          id: "table",
          heading: "The courses",
          body: (
            <div className="overflow-x-auto rounded border border-slate-200 dark:border-slate-800">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 text-left dark:bg-slate-900">
                    <th className={TH}>Course</th>
                    <th className={TH}>Publisher</th>
                    <th className={TH}>Covers</th>
                    <th className={TH}>Cost</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700 dark:divide-slate-800 dark:text-slate-300">
                  <tr>
                    <td className="px-4 py-2"><Ext href={ANTH}>Introduction to Model Context Protocol</Ext></td>
                    <td className="px-4 py-2">Anthropic Academy (Skilljar)</td>
                    <td className="px-4 py-2">Building MCP servers and clients in Python; tools, resources and prompts</td>
                    <td className="px-4 py-2">Free with a Skilljar account</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2"><Ext href={ANTH_ADV}>Model Context Protocol: Advanced Topics</Ext></td>
                    <td className="px-4 py-2">Anthropic Academy</td>
                    <td className="px-4 py-2">Follow-up to the introduction</td>
                    <td className="px-4 py-2">Free</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2"><Ext href={HF}>MCP Course</Ext></td>
                    <td className="px-4 py-2">Hugging Face, with Anthropic</td>
                    <td className="px-4 py-2">Fundamentals, an end-to-end app, a deployed app; Python or TypeScript</td>
                    <td className="px-4 py-2">Free; certificate on completion</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ),
        },
        {
          id: "check",
          heading: "Check it's up to date",
          body: (
            <>
              <P>The 2026-07-28 revision changed things many earlier lessons teach:</P>
              <ul className="list-inside list-disc space-y-2 text-slate-700 dark:text-slate-300">
                <li>No <code>initialize</code> handshake or sessions; requests carry metadata and clients can call <code>server/discover</code>.</li>
                <li>No standalone GET/SSE stream; notifications come through <code>subscriptions/listen</code>.</li>
                <li>Sampling and protocol logging are deprecated.</li>
                <li>Python and TypeScript SDKs are at v2 with new imports.</li>
              </ul>
              <P>
                Older lessons still teach the concepts well; just check code against current docs.
                Our <Link href="/blog/mcp-transport-methods" className="text-blue-600 hover:underline dark:text-blue-400">transports guide</Link>{" "}
                summarises what changed.
              </P>
            </>
          ),
        },
        {
          id: "pick",
          heading: "Which to start with",
          body: (
            <ul className="list-inside list-disc space-y-2 text-slate-700 dark:text-slate-300">
              <li>Python developer who wants to build a server quickly: Anthropic&apos;s introduction.</li>
              <li>Want a project you can deploy and share, or prefer TypeScript: Hugging Face&apos;s course (source on <Ext href={HF_REPO}>GitHub</Ext>).</li>
            </ul>
          ),
        },
      ]}
      evidence={[
        { source: "Anthropic Academy: Introduction to Model Context Protocol", url: ANTH, type: "official", status: "unverified", reviewedAt: REVIEWED, finding: "Free course on Skilljar; building MCP servers and clients with Python; tools, resources and prompts.", limitations: "Based on course listing and search summaries; course not taken." },
        { source: "Anthropic Academy: MCP Advanced Topics", url: ANTH_ADV, type: "official", status: "unverified", reviewedAt: REVIEWED, finding: "Advanced follow-up course listing.", limitations: "Listing only." },
        { source: "Hugging Face MCP Course", url: HF, type: "official", status: "unverified", reviewedAt: REVIEWED, finding: "Free course in partnership with Anthropic; units from fundamentals to a deployed app; certificate.", limitations: "Based on course pages and summaries; course not taken." },
      ]}
      faqs={[
        { question: "What is the best MCP course?", answer: "We don't rank them without taking them end to end. Anthropic Academy's and Hugging Face's courses are the most credible free options." },
        { question: "Are these MCP courses free?", answer: "Yes. Anthropic Academy needs a free Skilljar account; Hugging Face's course is free." },
        { question: "Do they give certificates?", answer: "Hugging Face issues a certificate on completion; check Anthropic Academy for its current certificate policy." },
        { question: "Do the courses cover the 2026-07-28 spec?", answer: "Check each course's update date. Many lessons predate it; compare code with current SDK docs." },
        { question: "Do I need Python?", answer: "Anthropic's introduction uses Python; Hugging Face's course offers Python or TypeScript." },
      ]}
      related={[
        { href: "/blog/mcp-server-video-tutorials-youtube", label: "Choosing MCP video tutorials" },
        { href: "/complete-guide-mcp-servers", label: "The complete guide to MCP servers" },
        { href: "/blog/mcp-server-code-snippets-community-library", label: "MCP code snippets" },
        { href: "/compare/python-vs-typescript-mcp", label: "Python vs TypeScript for MCP" },
      ]}
    />
  );
}
