"use client";

import { Activity, AlertTriangle, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface LatencyPoint {
  time: string;
  p50: number;
  p90: number;
  p99: number;
  mumbai: number;
  bengaluru: number;
}

interface RegionMetric {
  name: string;
  latencyMs: number;
  uptime: string;
  status: string;
}

interface P99Snapshot {
  generatedAt: string;
  targetMs: number;
  series: LatencyPoint[];
  regions: RegionMetric[];
}

const fallbackLatencySeries: LatencyPoint[] = [
  { time: "00:00", p50: 7, p90: 14, p99: 32, mumbai: 11, bengaluru: 9 },
  { time: "03:00", p50: 6, p90: 13, p99: 29, mumbai: 10, bengaluru: 8 },
  { time: "06:00", p50: 8, p90: 16, p99: 35, mumbai: 12, bengaluru: 10 },
  { time: "09:00", p50: 10, p90: 22, p99: 44, mumbai: 14, bengaluru: 12 },
  { time: "12:00", p50: 9, p90: 20, p99: 41, mumbai: 13, bengaluru: 11 },
  { time: "15:00", p50: 11, p90: 24, p99: 47, mumbai: 15, bengaluru: 13 },
  { time: "18:00", p50: 9, p90: 18, p99: 38, mumbai: 12, bengaluru: 10 },
  { time: "21:00", p50: 7, p90: 15, p99: 31, mumbai: 11, bengaluru: 9 },
];

const fallbackRegions: RegionMetric[] = [
  { name: "Mumbai Edge", latencyMs: 12, uptime: "Targeting high availability", status: "Illustrative" },
  { name: "Bengaluru Edge", latencyMs: 11, uptime: "Targeting high availability", status: "Illustrative" },
  { name: "Secure Gateway Proxy", latencyMs: 4, uptime: "Targeting high availability", status: "Illustrative" },
  { name: "In-Browser Sandbox", latencyMs: 2, uptime: "Targeting high availability", status: "Illustrative" },
];

export default function P99DashboardClient() {
  const [snapshot, setSnapshot] = useState<P99Snapshot>({
    generatedAt: "2026-07-19T00:00:00.000Z",
    targetMs: 50,
    series: fallbackLatencySeries,
    regions: fallbackRegions,
  });

  useEffect(() => {
    fetch("/api/telemetry/p99")
      .then((response) => {
        if (!response.ok) throw new Error("telemetry unavailable");
        return response.json() as Promise<P99Snapshot>;
      })
      .then(setSnapshot)
      .catch(() => {
        setSnapshot((current) => current);
      });
  }, []);

  return (
    <section className="pb-10">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {snapshot.regions.map((region) => (
          <div key={region.name} className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-sm font-black text-white">{region.name}</h2>
              <ShieldCheck className="h-4 w-4 text-emerald-300" />
            </div>
            <div className="mt-4 text-3xl font-black text-cyan-200">{region.latencyMs}ms</div>
            <div className="mt-1 text-xs text-white/45">Illustrative route latency estimate</div>
            <div className="mt-4 flex items-center justify-between border-t border-white/8 pt-3 text-[11px]">
              <span className="text-white/45">90-day uptime</span>
              <span className="font-bold text-emerald-200">{region.uptime} {region.status}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-black text-white">Latency percentiles</h2>
              <p className="mt-1 text-xs text-white/45">
                Example data from `/data/mcp-stats-2026.json` — illustrative, not live telemetry. Sample generated {new Date(snapshot.generatedAt).toLocaleDateString("en-IN")}.
              </p>
            </div>
            <Activity className="h-5 w-5 text-cyan-300" />
          </div>
          <div className="h-[360px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={snapshot.series} margin={{ left: 0, right: 12, top: 10, bottom: 0 }}>
                <defs>
                  <linearGradient id="p99" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.45} />
                    <stop offset="95%" stopColor="#a78bfa" stopOpacity={0.03} />
                  </linearGradient>
                  <linearGradient id="p90" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#22d3ee" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                <XAxis dataKey="time" stroke="rgba(255,255,255,0.45)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="rgba(255,255,255,0.45)" fontSize={12} tickLine={false} axisLine={false} unit="ms" />
                <Tooltip contentStyle={{ background: "#08111f", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8, color: "#fff" }} />
                <Legend />
                <Area type="monotone" dataKey="p99" stroke="#a78bfa" fill="url(#p99)" strokeWidth={2} />
                <Area type="monotone" dataKey="p90" stroke="#22d3ee" fill="url(#p90)" strokeWidth={2} />
                <Area type="monotone" dataKey="p50" stroke="#34d399" fill="transparent" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-xl border border-amber-400/20 bg-amber-500/10 p-5">
            <h2 className="text-sm font-black text-white">Example data</h2>
            <div className="mt-4 text-lg font-black text-amber-200">Illustrative, not live</div>
            <p className="mt-2 text-xs leading-relaxed text-amber-100/70">
              This panel demonstrates what SLA-target tracking could look like once connected to a real metrics source. Figures shown are sample data.
            </p>
          </div>
          <div className="rounded-xl border border-amber-400/20 bg-amber-500/10 p-5">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-200" />
              <h2 className="text-sm font-black text-white">Alert policy</h2>
            </div>
              <p className="mt-3 text-xs leading-relaxed text-amber-100/70">
                Illustrative alert example: page on-call when latency exceeds a chosen threshold or error rate rises above a configured level.
              </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
            <h2 className="text-sm font-black text-white">Implementation source</h2>
            <p className="mt-3 text-xs leading-relaxed text-white/55">
              RedisTimeSeries writes per execution, WebSocket fanout publishes percentile frames every 15 seconds, and reports are retained for enterprise evidence packs.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
