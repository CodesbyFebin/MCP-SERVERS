import type { Metadata } from "next";
import { CheckCircle, Mail } from "lucide-react";
import Breadcrumbs from "../../src/components/Breadcrumbs";
import SchemaJsonLd from "../../src/components/SchemaJsonLd";
import { getUnifiedGraphSchema } from "../../src/lib/schema";

export const metadata: Metadata = {
  title: "Platform Status - MCPserver India",
  description: "How to check MCPserver.in service status and report an incident.",
  alternates: {
    canonical: "/status",
    languages: {
      "en-IN": "/status",
      "en": "/status",
    }
  },

};

export default function StatusPage() {
  const unifiedSchema = getUnifiedGraphSchema({
    pageUrl: "/status",
    title: "Platform Status",
    description: "How to check MCPserver.in service status and report an incident.",
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "System Status", item: "/status" },
    ],
  });

  return (
    <div id="status-page" className="min-h-screen bg-transparent text-white pt-6 pb-16">
      <SchemaJsonLd schema={unifiedSchema} />
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Breadcrumbs items={[{ name: "System Status", href: "/status" }]} />

        <section className="py-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-[11px] font-bold text-cyan-200">
            <CheckCircle className="h-3.5 w-3.5" />
            Platform status
          </div>
          <h1 className="mt-5 text-4xl font-black tracking-tight text-white sm:text-5xl">System Status</h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/65">
            We don't yet run a live, auto-updating status dashboard. If you're experiencing an issue or want to check current service health, reach out directly and we'll respond with the real state of things.
          </p>
        </section>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="text-sm font-black uppercase tracking-wider text-white/50">Report an Issue or Ask About Uptime</h2>
          <p className="mt-3 text-sm leading-relaxed text-white/60">
            Email us with what you're seeing (region, timestamp, and any error output) and we'll get back to you with an accurate status, not a simulated one.
          </p>
          <a
            href="mailto:support@mcpserver.in"
            className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-cyan-300 hover:underline"
          >
            <Mail className="h-4 w-4" />
            support@mcpserver.in
          </a>
        </div>
      </div>
    </div>
  );
}
