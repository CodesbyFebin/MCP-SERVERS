"use client";

import { useState } from "react";
import Breadcrumbs from "./Breadcrumbs";
import { ShieldCheck, Loader2, CheckCircle2, XCircle, AlertTriangle, Info } from "lucide-react";

interface CheckResult {
  id: string;
  label: string;
  weight: number;
  passed: boolean;
  detail: string;
}

interface ScanResponse {
  target: string;
  scanType: "github-repository" | "live-endpoint";
  score: number;
  checks: CheckResult[];
  disclaimer: string;
  scannedAt: string;
}

type Status = "idle" | "loading" | "success" | "error";

function scoreColor(score: number) {
  if (score >= 80) return "text-emerald-400";
  if (score >= 50) return "text-amber-400";
  return "text-red-400";
}

export default function DpdpScannerClient() {
  const [url, setUrl] = useState("https://github.com/modelcontextprotocol/servers");
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState<ScanResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const runScan = async () => {
    setStatus("loading");
    setErrorMessage("");
    setResult(null);
    try {
      const res = await fetch("/api/dpdp-scanner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMessage(data.error || `Scan failed with status ${res.status}`);
        setStatus("error");
        return;
      }
      setResult(data);
      setStatus("success");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Network error while contacting the scanner.");
      setStatus("error");
    }
  };

  return (
    <div id="tools-page" className="min-h-screen bg-transparent text-[#e0e0e0] font-sans pt-6 pb-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: "Developer Tools", href: "/tools/mcp-playground" },
            { name: "DPDP Compliance Scanner", href: "/tools/dpdp-compliance-scanner" },
          ]}
        />

        <div className="text-center py-6 mb-8 border-b border-white/5 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-60 h-60 bg-cyan-500/5 rounded-full blur-[80px] pointer-events-none" />
          <h1 className="text-3xl font-display font-bold text-white tracking-tighter leading-tight">
            Technical Compliance Scanner
          </h1>
          <p className="mt-2 text-xs text-white/50 max-w-xl mx-auto leading-relaxed">
            Checks technical indicators (license, security policy, HTTPS, access control) on GitHub repos or endpoints.
            Does not assess legal compliance.
          </p>
          <div className="mt-3 p-2 rounded-lg border border-amber-500/20 bg-amber-500/5 text-amber-200 text-[10px] flex items-center gap-1.5 justify-center">
            <Info className="w-3 h-3" />
            Educational tool only. Scan results do not constitute legal advice.
          </div>
        </div>

        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 sm:p-8 shadow-xl backdrop-blur-md">
          <div className="flex items-center gap-2 pb-3 border-b border-white/5">
            <ShieldCheck className="w-5 h-5 text-cyan-400" />
            <h3 className="font-display font-bold text-base text-white">Run Technical Checks</h3>
          </div>

          <p className="mt-3 text-xs text-white/50 leading-relaxed">
            Enter a GitHub repository URL or live endpoint to check technical indicators.
            Each check verifies publicly available information only.
          </p>
        </div>

        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 sm:p-8 shadow-xl backdrop-blur-md">
          <div className="flex items-center gap-2 pb-3 border-b border-white/5">
            <ShieldCheck className="w-5 h-5 text-cyan-400" />
            <h3 className="font-display font-bold text-base text-white">Scan a Server</h3>
          </div>

          <p className="mt-3 text-xs text-white/50 leading-relaxed">
            Paste a GitHub repository URL (checked via the live GitHub API) or a live server URL (checked via a
            direct HTTPS request). Each result below is a real, individually verifiable finding.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://github.com/owner/repo or https://your-server.example.com"
              className="flex-1 px-4 py-2.5 bg-black/40 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500"
            />
            <button
              onClick={runScan}
              disabled={status === "loading" || !url.trim()}
              className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 disabled:cursor-not-allowed text-black text-xs font-bold rounded-full flex items-center justify-center gap-1.5 transition-all shadow-[0_0_15px_rgba(34,211,238,0.2)]"
            >
              {status === "loading" ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <ShieldCheck className="w-3.5 h-3.5" />}
              {status === "loading" ? "Scanning..." : "Run Scan"}
            </button>
          </div>

          {status === "error" && (
            <div className="mt-6 p-4 rounded-lg bg-red-950/20 border border-red-950/30 text-red-400 text-xs flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {status === "success" && result && (
            <div className="mt-6 space-y-6">
              <div className="flex items-center justify-between p-4 rounded-lg bg-black/40 border border-white/5">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-white/40">
                    {result.scanType === "github-repository" ? "GitHub repository scan" : "Live endpoint scan"}
                  </div>
                  <div className="text-xs text-white/60 mt-1 break-all">{result.target}</div>
                </div>
                <div className={`text-3xl font-black ${scoreColor(result.score)}`}>{result.score}<span className="text-sm text-white/30">/100</span></div>
              </div>

              <div className="space-y-2">
                {result.checks.map((check) => (
                  <div key={check.id} className="p-3 rounded-lg bg-black/30 border border-white/5 flex items-start gap-3">
                    {check.passed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                    )}
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-white flex items-center gap-2">
                        {check.label}
                        <span className="text-[10px] font-normal text-white/30">{check.weight} pts</span>
                      </div>
                      <div className="text-[11px] text-white/50 mt-0.5">{check.detail}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 text-[11px] text-white/40 leading-relaxed">
                {result.disclaimer}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
