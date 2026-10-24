import type { Metadata } from "next";
import { BrandMcpArticle, Code, P, Ext } from "@/src/components/content/BrandMcpArticle";

export const dynamic = "force-static";

const SLUG = "mcp-p95-latency";
const PATH = `/glossary/${SLUG}`;
const TITLE = "p95 Latency for MCP Tool Calls";
const DESCRIPTION =
  "What p95 latency means, how to calculate it, and why it is a better guide than the average for MCP tool calls, timeouts and service level objectives.";
const REVIEWED = "2026-09-23";
const SRE = "https://sre.google/sre-book/service-level-objectives/";
const HTTP = "https://modelcontextprotocol.io/specification/2026-07-28/basic/transports/streamable-http";

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
      h1="p95 Latency (MCP)"
      description={DESCRIPTION}
      reviewedAt={REVIEWED}
      directAnswer="p95 latency is the response time that 95% of requests meet or beat; only the slowest 5% take longer. For an MCP server it is usually measured per tool, from when the tool call arrives to when the result is returned. It shows the slow calls that users and AI clients actually notice, which an average hides."
      sections={[
        {
          id: "why",
          heading: "Why percentiles, not averages",
          body: (
            <>
              <P>
                Google&apos;s <Ext href={SRE}>Site Reliability Engineering book</Ext> puts it
                plainly: &ldquo;Most metrics are better thought of as distributions rather than
                averages.&rdquo; Its example is a service where a typical request takes about 50 ms
                but 5% of requests are 20 times slower. The average looks fine; those users
                don&apos;t.
              </P>
              <P>
                MCP tool calls can have the same shape: most calls hit a cache or a fast query, and a
                few wait on a slow upstream API, a cold start or a large result. p95 shows those; p99
                shows the rarer worst cases.
              </P>
            </>
          ),
        },
        {
          id: "calc",
          heading: "How to calculate it",
          body: (
            <>
              <P>
                Sort the durations, then take the value at the 95% position. With the nearest-rank
                method, for n samples that is the value at rank ⌈0.95 × n⌉. For example, with these
                20 made-up durations in milliseconds:
              </P>
              <Code>{`120 125 130 132 135 140 142 145 150 155
160 165 170 180 190 210 240 300 900 2400`}</Code>
              <P>
                ⌈0.95 × 20⌉ = 19, so p95 is the 19th value: <strong>900 ms</strong>. The median is
                about 158 ms and the mean is about 314 ms. Neither tells you that one call in ten takes
                900 ms or more.
              </P>
              <P>
                Monitoring tools usually estimate percentiles from histograms rather than sorting
                every sample, so their p95 can differ slightly from this exact calculation.
              </P>
            </>
          ),
        },
        {
          id: "mcp",
          heading: "Measuring p95 on an MCP server",
          body: (
            <ul className="mb-4 list-inside list-disc space-y-2 text-slate-700 dark:text-slate-300">
              <li>
                <strong>Per tool, not per server.</strong> A fast <code>search</code> tool and a
                slow <code>generate_report</code> tool averaged together tell you nothing useful.
              </li>
              <li>
                <strong>Record errors separately.</strong> Fast failures pull p95 down and make
                things look better than they are.
              </li>
              <li>
                <strong>Say where you measure.</strong> Inside the handler, at the HTTP layer, or
                end-to-end from the client all give different numbers. On Streamable HTTP servers,
                the <code>Mcp-Method</code> and <code>Mcp-Name</code> headers the{" "}
                <Ext href={HTTP}>specification</Ext> requires let a gateway label latency by method
                and tool without parsing the body.
              </li>
              <li>
                <strong>Use enough samples.</strong> p95 of 20 calls is one data point. Look at a
                window with hundreds of calls before drawing conclusions.
              </li>
            </ul>
          ),
        },
        {
          id: "timeouts",
          heading: "Using p95 to set timeouts and SLOs",
          body: (
            <>
              <P>
                A client timeout set just above the average will cut off every slow call. Set it
                from the high percentiles instead, with headroom, and make slow tools report
                progress so the client knows work is happening.
              </P>
              <P>
                A latency objective written with percentiles is easy to check. The SRE book&apos;s
                example format: 90% of calls under 1 ms, 99% under 10 ms, 99.9% under 100 ms. For an
                MCP tool you might write &ldquo;95% of <code>search</code> calls complete in under X
                ms over 30 days&rdquo;, choosing X from what your users can tolerate.
              </P>
            </>
          ),
        },
      ]}
      evidence={[
        {
          source: "Google SRE book: Service Level Objectives",
          url: SRE,
          type: "documentation",
          status: "verified",
          reviewedAt: REVIEWED,
          finding:
            "Metrics are better treated as distributions than averages; example where typical latency is about 50 ms but 5% of requests are 20 times slower; percentile-based SLO examples (90% < 1 ms, 99% < 10 ms, 99.9% < 100 ms).",
        },
        {
          source: "MCP specification 2026-07-28: Streamable HTTP",
          url: HTTP,
          type: "official",
          status: "verified",
          reviewedAt: REVIEWED,
          finding:
            "Requests carry Mcp-Method and Mcp-Name headers so intermediaries such as gateways and observability tooling can inspect requests without parsing the body.",
        },
        {
          source: "Worked example on this page",
          url: `https://www.mcpserver.in${PATH}`,
          type: "editorial",
          status: "verified",
          reviewedAt: REVIEWED,
          finding: "The 20 durations are invented for illustration; p95, median and mean are computed from them.",
          limitations: "Illustrative data, not a measurement of any real server.",
        },
      ]}
      faqs={[
        {
          question: "What does p95 latency mean?",
          answer: "95% of requests complete in this time or less. The slowest 5% take longer.",
        },
        {
          question: "Is p95 better than average latency?",
          answer:
            "For user experience, usually yes. An average can look healthy while a meaningful share of calls is very slow; p95 exposes that tail.",
        },
        {
          question: "What is a good p95 for an MCP tool?",
          answer:
            "There is no universal number. It depends on the tool: a lookup and a report generator have very different needs. Measure your own baseline, then set a target your users can accept.",
        },
        {
          question: "Should I measure p95 per MCP server or per tool?",
          answer: "Per tool. Different tools have very different latency profiles.",
        },
        {
          question: "What is the difference between p95 and p99?",
          answer:
            "p95 is the time 95% of requests meet; p99 is the time 99% meet. p99 captures rarer, slower outliers and needs more samples to be stable.",
        },
      ]}
      related={[
        { href: "/glossary/mcp-timeout", label: "MCP timeout" },
        { href: "/glossary/mcp-progress", label: "MCP progress notifications" },
        { href: "/blog/mcp-transport-methods", label: "MCP transports: stdio vs Streamable HTTP" },
        { href: "/glossary", label: "MCP glossary" },
      ]}
    />
  );
}
