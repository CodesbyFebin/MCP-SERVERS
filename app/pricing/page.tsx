import type { Metadata } from "next";
import PricingTable from "../../src/components/PricingTable";
import Breadcrumbs from "../../src/components/Breadcrumbs";
import { ShieldAlert, Zap, Globe, Clock, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Managed MCP Hosting Pricing - MCPserver.in",
  description: "Examine hosting plans for the Model Context Protocol. Deploy secure SSE server nodes with low-latency in Mumbai/Bengaluru starting at ₹999/mo.",
};

export default function Pricing() {
  const breadcrumbSteps = [{ name: "Pricing", href: "/pricing" }];

  return (
    <div id="pricing-page" className="min-h-screen bg-transparent text-[#e0e0e0] font-sans pt-6 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <Breadcrumbs items={breadcrumbSteps} />

        {/* Pricing Header */}
        <div className="text-center py-10 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-60 h-60 bg-purple-500/5 rounded-full blur-[80px] pointer-events-none" />
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tighter leading-tight">
            Plans for Every AI Builder
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-white/50 max-w-2xl mx-auto leading-relaxed">
            Choose your hosting scale. Deploy local developer tools for free, or host permanent cloud-grade Server-Sent Event (SSE) nodes on our ultra-low latency Indian networks.
          </p>
        </div>

        {/* Dynamic Pricing cards */}
        <div className="mt-8">
          <PricingTable />
        </div>

        {/* Plan Feature Comparison table / highlights */}
        <div className="mt-16 bg-white/[0.01] border border-white/5 rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto backdrop-blur-sm shadow-xl">
          <h3 className="font-display font-bold text-sm text-white mb-6 text-center">
            Standard Infrastructure Features Included on All Plans
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded bg-cyan-500/10 flex items-center justify-center shrink-0 mt-0.5 border border-cyan-500/20">
                <Globe className="w-4 h-4 text-cyan-400" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Mumbai/Bengaluru Edge Nodes</h4>
                <p className="text-[11px] text-white/50 mt-1 leading-normal">
                  All cloud-hosted nodes run inside localized secure containers close to key database centers to guarantee sub-50ms roundtrip execution speeds.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded bg-purple-500/10 flex items-center justify-center shrink-0 mt-0.5 border border-purple-500/20">
                <ShieldAlert className="w-4 h-4 text-purple-400" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Advanced Sandbox Isolation</h4>
                <p className="text-[11px] text-white/50 mt-1 leading-normal">
                  Our clusters run isolated docker layers with strict memory allocations, ensuring one fumbled API key or shell command cannot compromise other nodes.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded bg-blue-500/10 flex items-center justify-center shrink-0 mt-0.5 border border-blue-500/20">
                <Clock className="w-4 h-4 text-blue-400" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">99.99% Network Uptime SLA</h4>
                <p className="text-[11px] text-white/50 mt-1 leading-normal">
                  We guarantee continuous Server-Sent Event connection channels, automated reconnect handshakes, and active fallback traffic routers.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-500/20">
                <Zap className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Zero Cold Starts</h4>
                <p className="text-[11px] text-white/50 mt-1 leading-normal">
                  Unlike conventional serverless runtimes, our Developer and higher hosting containers maintain persistent SSE sessions to eliminate initial model query lag.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Security / Indian compliance pledge */}
        <div className="mt-10 p-5 rounded-xl border border-white/5 bg-white/[0.01] text-center max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 backdrop-blur-sm">
          <div className="flex items-center gap-2.5 text-left">
            <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
            <div className="text-xs">
              <span className="font-semibold text-white block">Secured and Compliant Payments</span>
              <span className="text-white/40 text-[10px]">All transactions are processed in Indian Rupees (INR) with standard 3D Secure verification.</span>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] text-white/60 font-mono font-bold tracking-wide">GST INVOICING</span>
            <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] text-white/60 font-mono font-bold tracking-wide">PCI DSS LEVEL 1</span>
          </div>
        </div>

      </div>
    </div>
  );
}
