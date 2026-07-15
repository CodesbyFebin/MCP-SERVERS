import Link from "next/link";
import { ArrowRight, Cloud, Terminal } from "lucide-react";

export default function CTA() {
  return (
    <section id="cta-section" className="py-16 relative overflow-hidden bg-[#050508]">
      <div className="absolute inset-0 bg-gradient-to-t from-cyan-950/10 to-transparent pointer-events-none" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="p-8 sm:p-12 rounded-2xl bg-gray-900/40 border border-gray-800/80 backdrop-blur-md relative overflow-hidden">
          
          {/* Subtle decor */}
          <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <h2 className="font-sans font-bold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight leading-tight">
            Ready to Supercharge Your AI Agents?
          </h2>
          <p className="mt-4 text-sm sm:text-base text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Join over 50,000+ software developers and enterprise AI engineers deploying low-latency Model Context Protocol nodes with MCPserver.in.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              id="cta-deploy"
              href="/pricing"
              className="w-full sm:w-auto px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-sm font-semibold text-white transition-all flex items-center justify-center gap-2"
            >
              <Cloud className="w-4 h-4" />
              Get Started for Free
            </Link>

            <Link
              id="cta-explore"
              href="/mcp-server-directory"
              className="w-full sm:w-auto px-6 py-3 rounded-lg bg-gray-950 hover:bg-gray-900 border border-gray-800 text-sm font-semibold text-gray-300 transition-all flex items-center justify-center gap-2"
            >
              <Terminal className="w-4 h-4 text-cyan-400" />
              Browse 100+ Connectors
              <ArrowRight className="w-4 h-4 text-gray-500" />
            </Link>
          </div>

          <p className="mt-4 text-xs text-gray-500">
            No credit card required for local tools & basic play. Fully managed SSE servers start at ₹999/mo.
          </p>
        </div>
      </div>
    </section>
  );
}
