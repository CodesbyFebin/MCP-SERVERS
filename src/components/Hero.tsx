import Link from "next/link";
import { Terminal, Cpu, Cloud, ShieldCheck } from "lucide-react";
import { siteConfig } from "../data/site";

export default function Hero() {
  return (
    <section id="hero-section" className="relative pt-20 pb-16 overflow-hidden bg-transparent">
      
      {/* Background neon ambient aura */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[400px] pointer-events-none">
        <div className="absolute top-[-10%] left-[20%] w-[450px] h-[450px] rounded-full bg-cyan-500/5 blur-[120px]" />
        <div className="absolute top-[10%] right-[20%] w-[450px] h-[450px] rounded-full bg-purple-600/5 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* World's Largest Hosted MCP Platform Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-[10px] uppercase tracking-widest font-bold mb-6">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
          World's Largest Hosted MCP Platform
        </div>

        {/* H1 Heading */}
        <h1 className="font-display font-bold text-4xl sm:text-6xl lg:text-7xl text-white tracking-tighter leading-[1.1] max-w-4xl mx-auto animate-fade-in">
          Build, deploy and manage <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
            MCP servers at scale.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-lg text-white/50 max-w-2xl mx-auto leading-relaxed">
          Discover trusted MCP integrations, test them in a browser, and deploy production-ready servers directly to managed infrastructure in seconds.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            id="hero-deploy-cta"
            href="/pricing/"
            className="w-full sm:w-auto px-8 py-4 bg-cyan-500 text-black font-bold rounded-xl shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:scale-105 transition-transform flex items-center justify-center gap-2"
          >
            <Cloud className="w-4 h-4" />
            Start Deploying Free
          </Link>
          
          <Link
            id="hero-explore-cta"
            href="/mcp-server-directory/"
            className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
          >
            <Terminal className="w-4 h-4 text-cyan-400" />
            Explore Directory
          </Link>

          <Link
            id="hero-playground-cta"
            href="/tools/mcp-playground/"
            className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
          >
            <Cpu className="w-4 h-4 text-purple-400" />
            Open Playground
          </Link>
        </div>

        {/* Trust & Accents */}
        <div className="mt-8 flex items-center justify-center gap-6 text-xs text-white/40">
          <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-cyan-400" /> 100% Free Local Tools</span>
          <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-cyan-400" /> Indian Edge Data Center</span>
          <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-cyan-400" /> Enterprise Sandbox</span>
        </div>

        {/* Core Site Statistics */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 pt-10 border-t border-white/5 max-w-5xl mx-auto">
          <div>
            <div className="text-2xl sm:text-3xl font-display font-bold text-white">{siteConfig.stats.servers}</div>
            <div className="text-xs text-white/40 mt-1">MCP Servers</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-display font-bold text-white">{siteConfig.stats.deployments}</div>
            <div className="text-xs text-white/40 mt-1">Deployments</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-display font-bold text-white">{siteConfig.stats.requests}</div>
            <div className="text-xs text-white/40 mt-1">Requests / Day</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-display font-bold text-white">{siteConfig.stats.countries}</div>
            <div className="text-xs text-white/40 mt-1">Countries</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-display font-bold text-white">{siteConfig.stats.uptime}</div>
            <div className="text-xs text-white/40 mt-1">Uptime</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-display font-bold text-white">100%</div>
            <div className="text-xs text-white/40 mt-1">Free Basic Plan</div>
          </div>
        </div>

      </div>
    </section>
  );
}
