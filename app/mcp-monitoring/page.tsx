"use client";

import { useState, useEffect } from "react";
import { useTheme } from "../../src/components/ThemeAndAuthProvider";
import { 
  Activity, Cpu, Server, Clock, ShieldCheck, 
  Play, Pause, RefreshCw, Layers, CheckCircle2, AlertOctagon 
} from "lucide-react";
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend, LineChart, Line, 
  Cell, PieChart, Pie, ReferenceLine
} from "recharts";
import Breadcrumbs from "../../src/components/Breadcrumbs";

// Mock dataset representing traffic trends across Indian Edge Nodes and others
const clusterData = {
  all: [
    { time: "09:00", requests: 420, latencyMumbai: 12, latencyBengaluru: 14, latencyUS: 180, errors: 1 },
    { time: "10:00", requests: 780, latencyMumbai: 13, latencyBengaluru: 15, latencyUS: 195, errors: 2 },
    { time: "11:00", requests: 1200, latencyMumbai: 11, latencyBengaluru: 12, latencyUS: 210, errors: 0 },
    { time: "12:00", requests: 950, latencyMumbai: 14, latencyBengaluru: 13, latencyUS: 190, errors: 3 },
    { time: "13:00", requests: 1100, latencyMumbai: 12, latencyBengaluru: 11, latencyUS: 185, errors: 1 },
    { time: "14:00", requests: 1400, latencyMumbai: 15, latencyBengaluru: 16, latencyUS: 230, errors: 4 },
    { time: "15:00", requests: 1650, latencyMumbai: 13, latencyBengaluru: 14, latencyUS: 245, errors: 2 },
    { time: "16:00", requests: 1300, latencyMumbai: 12, latencyBengaluru: 12, latencyUS: 200, errors: 1 },
    { time: "17:00", requests: 1500, latencyMumbai: 11, latencyBengaluru: 13, latencyUS: 215, errors: 0 }
  ],
  bengaluru: [
    { time: "09:00", requests: 200, latencyMumbai: 15, latencyBengaluru: 11, latencyUS: 220, errors: 0 },
    { time: "10:00", requests: 350, latencyMumbai: 16, latencyBengaluru: 12, latencyUS: 230, errors: 1 },
    { time: "11:00", requests: 580, latencyMumbai: 14, latencyBengaluru: 10, latencyUS: 240, errors: 0 },
    { time: "12:00", requests: 460, latencyMumbai: 15, latencyBengaluru: 11, latencyUS: 210, errors: 1 },
    { time: "13:00", requests: 520, latencyMumbai: 13, latencyBengaluru: 9, latencyUS: 205, errors: 0 },
    { time: "14:00", requests: 680, latencyMumbai: 17, latencyBengaluru: 13, latencyUS: 250, errors: 2 },
    { time: "15:00", requests: 810, latencyMumbai: 15, latencyBengaluru: 11, latencyUS: 260, errors: 1 },
    { time: "16:00", requests: 620, latencyMumbai: 14, latencyBengaluru: 10, latencyUS: 225, errors: 0 },
    { time: "17:00", requests: 730, latencyMumbai: 13, latencyBengaluru: 9, latencyUS: 235, errors: 0 }
  ],
  mumbai: [
    { time: "09:00", requests: 220, latencyMumbai: 10, latencyBengaluru: 16, latencyUS: 160, errors: 1 },
    { time: "10:00", requests: 430, latencyMumbai: 11, latencyBengaluru: 17, latencyUS: 170, errors: 1 },
    { time: "11:00", requests: 620, latencyMumbai: 9, latencyBengaluru: 14, latencyUS: 180, errors: 0 },
    { time: "12:00", requests: 490, latencyMumbai: 12, latencyBengaluru: 15, latencyUS: 165, errors: 2 },
    { time: "13:00", requests: 580, latencyMumbai: 10, latencyBengaluru: 13, latencyUS: 160, errors: 1 },
    { time: "14:00", requests: 720, latencyMumbai: 12, latencyBengaluru: 18, latencyUS: 210, errors: 2 },
    { time: "15:00", requests: 840, latencyMumbai: 11, latencyBengaluru: 16, latencyUS: 220, errors: 1 },
    { time: "16:00", requests: 680, latencyMumbai: 10, latencyBengaluru: 14, latencyUS: 175, errors: 1 },
    { time: "17:00", requests: 770, latencyMumbai: 9, latencyBengaluru: 14, latencyUS: 185, errors: 0 }
  ]
};

const responseShare = [
  { name: "200 OK", value: 8900 },
  { name: "201 Created", value: 950 },
  { name: "400 Client Err", value: 120 },
  { name: "500 Server Err", value: 30 }
];

const COLORS = ["#06b6d4", "#a855f7", "#e11d48", "#f59e0b"];

export default function MonitoringPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // State Management
  const [selectedCluster, setSelectedCluster] = useState<"all" | "bengaluru" | "mumbai">("all");
  const [latencySlaTarget, setLatencySlaTarget] = useState<number>(20);
  const [isLiveSimulating, setIsLiveSimulating] = useState<boolean>(true);
  const [trafficMultiplier, setTrafficMultiplier] = useState<number>(1);
  const [liveLogs, setLiveLogs] = useState<string[]>([
    "Monitoring dashboard is illustrative.",
    "This page shows simulated traffic patterns for planning purposes.",
    "For real service health, contact support@mcpserver.in"
  ]);

  // Live simulation ticker
  useEffect(() => {
    if (!isLiveSimulating) return;

    const interval = setInterval(() => {
      setTrafficMultiplier((prev) => {
        const rand = Math.random();
        if (rand < 0.3) return Math.max(0.8, prev - 0.1);
        if (rand > 0.7) return Math.min(1.5, prev + 0.1);
        return prev;
      });

      const edgeNode = Math.random() > 0.5 ? "Mumbai-Edge-02" : "Bengaluru-Edge-01";
      const latency = Math.floor(Math.random() * 20) + 20;
      const rpcMethod = Math.random() > 0.5 ? "tools/call" : "resources/list";
      const newLog = `[${new Date().toLocaleTimeString()}] ${edgeNode}: Illustrative latency ${latency}ms for ${rpcMethod}`;

      setLiveLogs((prev) => [newLog, ...prev.slice(0, 4)]);
    }, 3000);

    return () => clearInterval(interval);
  }, [isLiveSimulating]);

  const rawData = clusterData[selectedCluster];
  const activeData = rawData.map((item) => ({
    ...item,
    requests: Math.round(item.requests * trafficMultiplier)
  }));

  // Calculated metrics
  const totalRequests = activeData.reduce((acc, curr) => acc + curr.requests, 0);
  const avgMumbaiLat = Math.round(activeData.reduce((acc, curr) => acc + curr.latencyMumbai, 0) / activeData.length);
  const avgBengaluruLat = Math.round(activeData.reduce((acc, curr) => acc + curr.latencyBengaluru, 0) / activeData.length);
  const totalErrors = activeData.reduce((acc, curr) => acc + curr.errors, 0);

  const breadcrumbSteps = [
    { name: "Dev Suite", href: "/tools/mcp-playground" },
    { name: "Monitoring Simulator", href: "/mcp-monitoring" }
  ];

  return (
    <div id="monitoring-page" className={`min-h-screen py-6 pb-16 transition-colors duration-200 ${
      isDark ? "bg-[#050508] text-[#e0e0e0]" : "bg-slate-50 text-slate-800"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <Breadcrumbs items={breadcrumbSteps} />

        {/* Dashboard Title Header */}
        <div className={`text-center py-6 mb-8 border-b relative ${isDark ? "border-white/5" : "border-slate-200"}`}>
          {isDark && (
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-cyan-500/5 rounded-full blur-[80px] pointer-events-none" />
          )}
          <h1 className={`text-3xl font-display font-bold tracking-tighter leading-tight ${
            isDark ? "text-white" : "text-slate-900"
          }`}>
            Monitoring Dashboard Simulator
          </h1>
          <p className={`mt-2 text-xs max-w-xl mx-auto leading-relaxed ${
            isDark ? "text-white/50" : "text-slate-500"
          }`}>
            An interactive, client-side simulation of what a monitoring dashboard for India regional edge clusters could look like — the traffic and latency data below is generated locally, not pulled from live infrastructure.
          </p>
        </div>

        {/* Interactive Controls Panel */}
        <div className={`p-4 rounded-2xl border mb-8 flex flex-col md:flex-row gap-4 items-center justify-between backdrop-blur-sm ${
          isDark ? "bg-white/[0.01] border-white/5" : "bg-white border-slate-200 shadow-sm"
        }`}>
          {/* Cluster Selection */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <span className="text-xs font-semibold shrink-0">Edge Cluster:</span>
            <div className="flex gap-1.5 p-1 rounded-full bg-black/10 border border-white/5 w-full md:w-auto">
              <button
                onClick={() => setSelectedCluster("all")}
                className={`flex-1 md:flex-initial px-3 py-1 rounded-full text-[11px] font-bold transition-all ${
                  selectedCluster === "all"
                    ? "bg-cyan-500 text-black"
                    : "text-white/60 hover:text-white"
                }`}
              >
                All Nodes
              </button>
              <button
                onClick={() => setSelectedCluster("bengaluru")}
                className={`flex-1 md:flex-initial px-3 py-1 rounded-full text-[11px] font-bold transition-all ${
                  selectedCluster === "bengaluru"
                    ? "bg-cyan-500 text-black"
                    : "text-white/60 hover:text-white"
                }`}
              >
                Bengaluru-Edge
              </button>
              <button
                onClick={() => setSelectedCluster("mumbai")}
                className={`flex-1 md:flex-initial px-3 py-1 rounded-full text-[11px] font-bold transition-all ${
                  selectedCluster === "mumbai"
                    ? "bg-cyan-500 text-black"
                    : "text-white/60 hover:text-white"
                }`}
              >
                Mumbai-Edge
              </button>
            </div>
          </div>

          {/* SLA Target slider */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
            <span className="text-xs font-semibold">SLA Latency Limit:</span>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="15"
                max="100"
                value={latencySlaTarget}
                onChange={(e) => setLatencySlaTarget(Number(e.target.value))}
                className="w-24 sm:w-32 h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
              <span className="text-xs font-mono font-bold text-cyan-400">{latencySlaTarget}ms</span>
            </div>
          </div>

          {/* Simulator state toggles */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <button
              onClick={() => setIsLiveSimulating(!isLiveSimulating)}
              className={`px-3 py-1.5 rounded-full text-[11px] font-bold flex items-center gap-1.5 transition-all ${
                isLiveSimulating
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
              }`}
            >
              {isLiveSimulating ? (
                <>
                  <Pause className="w-3 h-3 fill-emerald-400" />
                  Simulate Active
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 fill-amber-400" />
                  Simulate Paused
                </>
              )}
            </button>
          </div>
        </div>

        {/* Live Metrics Grid Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          
          <div className={`p-4 rounded-2xl border ${
            isDark ? "bg-white/[0.01] border-white/5" : "bg-white border-slate-200 shadow-sm"
          }`}>
            <div className="flex items-center justify-between">
              <span className={`text-[10px] uppercase font-bold tracking-wider ${isDark ? "text-white/40" : "text-slate-400"}`}>Uptime Status</span>
              <Activity className="w-4 h-4 text-emerald-500 shrink-0" />
            </div>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className={`text-xl sm:text-2xl font-bold font-display ${isDark ? "text-white" : "text-slate-900"}`}>Sample</span>
              <span className="text-[10px] text-amber-400 font-bold">● Simulated</span>
            </div>
          </div>

          <div className={`p-4 rounded-2xl border ${
            isDark ? "bg-white/[0.01] border-white/5" : "bg-white border-slate-200 shadow-sm"
          }`}>
            <div className="flex items-center justify-between">
              <span className={`text-[10px] uppercase font-bold tracking-wider ${isDark ? "text-white/40" : "text-slate-400"}`}>Throughput</span>
              <Layers className="w-4 h-4 text-cyan-500 shrink-0" />
            </div>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className={`text-xl sm:text-2xl font-bold font-display ${isDark ? "text-white" : "text-slate-900"}`}>
                {Math.round(totalRequests / 10)} req/s
              </span>
              <span className="text-[10px] text-cyan-400 font-bold">Simulated</span>
            </div>
          </div>

          <div className={`p-4 rounded-2xl border ${
            isDark ? "bg-white/[0.01] border-white/5" : "bg-white border-slate-200 shadow-sm"
          }`}>
            <div className="flex items-center justify-between">
              <span className={`text-[10px] uppercase font-bold tracking-wider ${isDark ? "text-white/40" : "text-slate-400"}`}>Latency (India)</span>
              <Clock className="w-4 h-4 text-purple-500 shrink-0" />
            </div>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className={`text-xl sm:text-2xl font-bold font-display ${isDark ? "text-white" : "text-slate-900"}`}>
                {selectedCluster === "bengaluru" ? avgBengaluruLat : avgMumbaiLat}ms
              </span>
              <span className="text-[10px] text-purple-400 font-bold">Simulated</span>
            </div>
          </div>

          <div className={`p-4 rounded-2xl border ${
            isDark ? "bg-white/[0.01] border-white/5" : "bg-white border-slate-200 shadow-sm"
          }`}>
            <div className="flex items-center justify-between">
              <span className={`text-[10px] uppercase font-bold tracking-wider ${isDark ? "text-white/40" : "text-slate-400"}`}>Errors Detected</span>
              <AlertOctagon className="w-4 h-4 text-rose-500 shrink-0" />
            </div>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className={`text-xl sm:text-2xl font-bold font-display ${isDark ? "text-white" : "text-slate-900"}`}>{totalErrors}</span>
              <span className="text-[10px] text-rose-500 font-bold">Simulated</span>
            </div>
          </div>

        </div>

        {/* Charts Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Area Chart: Throughput Load */}
          <div className={`lg:col-span-2 p-5 rounded-2xl border flex flex-col justify-between ${
            isDark ? "bg-white/[0.01] border-white/5" : "bg-white border-slate-200 shadow-sm"
          }`}>
            <div className="mb-4">
              <h3 className={`text-sm font-display font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                Throughput & Request Frequency
              </h3>
              <p className={`text-[10px] ${isDark ? "text-white/40" : "text-slate-500"}`}>
                Aggregated requests count mapped by time intervals.
              </p>
            </div>
            <div className="h-64 sm:h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={activeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"} />
                  <XAxis dataKey="time" stroke={isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.5)"} fontSize={10} />
                  <YAxis stroke={isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.5)"} fontSize={10} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: isDark ? "#0f172a" : "#ffffff", 
                      border: "1px solid rgba(255,255,255,0.1)",
                      fontSize: "11px",
                      borderRadius: "8px"
                    }}
                  />
                  <Area type="monotone" dataKey="requests" stroke="#06b6d4" strokeWidth={2} fillOpacity={1} fill="url(#colorRequests)" name="Request Vol" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart: Response Codes Share */}
          <div className={`p-5 rounded-2xl border flex flex-col justify-between ${
            isDark ? "bg-white/[0.01] border-white/5" : "bg-white border-slate-200 shadow-sm"
          }`}>
            <div className="mb-4">
              <h3 className={`text-sm font-display font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                JSON-RPC Status Codes
              </h3>
              <p className={`text-[10px] ${isDark ? "text-white/40" : "text-slate-500"}`}>
                Share of client-handshake outcomes.
              </p>
            </div>
            <div className="h-56 sm:h-64 flex justify-center items-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={responseShare}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {responseShare.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ 
                      backgroundColor: isDark ? "#0f172a" : "#ffffff", 
                      border: "1px solid rgba(255,255,255,0.1)",
                      fontSize: "11px",
                      borderRadius: "8px"
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[10px] font-semibold mt-2 border-t border-white/5 pt-3">
              {responseShare.map((item, i) => (
                <div key={item.name} className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: COLORS[i] }} />
                  <span className="truncate">{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Line Chart: Latency Trends (Indian vs International) */}
          <div className={`lg:col-span-3 p-5 rounded-2xl border ${
            isDark ? "bg-white/[0.01] border-white/5" : "bg-white border-slate-200 shadow-sm"
          }`}>
            <div className="mb-4 flex justify-between items-start">
              <div>
                <h3 className={`text-sm font-display font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                  Latency Profiling (Simulated)
                </h3>
                <p className={`text-[10px] ${isDark ? "text-white/40" : "text-slate-500"}`}>
                  Locally generated sample data illustrating latency differences across Bengaluru, Mumbai, and an international hub.
                </p>
              </div>
              <div className="flex gap-2 text-[10px] font-mono">
                <span className="text-emerald-500 font-bold">✔ Within Simulated SLA</span>
              </div>
            </div>
            <div className="h-72 sm:h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={activeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"} />
                  <XAxis dataKey="time" stroke={isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.5)"} fontSize={10} />
                  <YAxis stroke={isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.5)"} fontSize={10} />
                  <Tooltip
                    contentStyle={{ 
                      backgroundColor: isDark ? "#0f172a" : "#ffffff", 
                      border: "1px solid rgba(255,255,255,0.1)",
                      fontSize: "11px",
                      borderRadius: "8px"
                    }}
                  />
                  <Legend verticalAlign="top" height={36} iconSize={10} wrapperStyle={{ fontSize: "11px" }} />
                  
                  {/* Reference line showing SLA Target dynamically! */}
                  <ReferenceLine y={latencySlaTarget} label={{ value: `SLA Limit (${latencySlaTarget}ms)`, fill: '#ef4444', fontSize: 10 }} stroke="#ef4444" strokeDasharray="3 3" />
                  
                  <Line type="monotone" dataKey="latencyBengaluru" stroke="#06b6d4" strokeWidth={2.5} activeDot={{ r: 6 }} name="Bengaluru Edge (ms)" />
                  <Line type="monotone" dataKey="latencyMumbai" stroke="#a855f7" strokeWidth={2.5} name="Mumbai Edge (ms)" />
                  <Line type="monotone" dataKey="latencyUS" stroke="#e11d48" strokeWidth={1.5} strokeDasharray="3 3" name="US Central Hub (ms)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* Live Simulator Logs Terminal */}
        <div className={`mt-8 p-5 rounded-2xl border ${
          isDark ? "bg-[#0b0b0e] border-white/5" : "bg-white border-slate-200 shadow-sm"
        }`}>
          <div className="flex justify-between items-center mb-3">
            <h4 className="text-xs font-bold uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping shrink-0" />
              Simulated Gateway Transactions Logger
            </h4>
            <span className="text-[10px] text-gray-500 font-mono">{isLiveSimulating ? "Simulation running" : "Simulation paused"}</span>
          </div>
          <div className="bg-black/80 rounded-xl p-4 font-mono text-[11px] text-emerald-400 space-y-1.5 border border-white/5 max-h-40 overflow-y-auto">
            {liveLogs.map((log, index) => (
              <div key={index} className="truncate select-all">
                <span className="text-white/30">&gt; </span>{log}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
