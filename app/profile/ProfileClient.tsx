"use client";

import React, { useState } from "react";
import { useAuth, useTheme } from "../../src/components/ThemeAndAuthProvider";
import { 
  UserPlus, LogIn, LogOut, Play, Trash2, 
  Plus, Database, Terminal 
} from "lucide-react";
import Breadcrumbs from "../../src/components/Breadcrumbs";

export default function AuthPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const { 
    user, serverConfigs, deployments, 
    login, register, logout, 
    saveServerConfig, deleteServerConfig, addDeployment 
  } = useAuth();

  // Authentication tabs and form inputs
  const [authTab, setAuthTab] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [authError, setAuthError] = useState("");

  // New config inputs
  const [newConfigName, setNewConfigName] = useState("");
  const [newConfigCommand, setNewConfigCommand] = useState("npx");
  const [newConfigArgs, setNewConfigArgs] = useState("");
  const [newConfigEnv, setNewConfigEnv] = useState("");
  const [configSuccess, setConfigSuccess] = useState("");

  const [authSubmitting, setAuthSubmitting] = useState(false);

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");

    if (!email || !password) {
      setAuthError("Please fill out all required fields.");
      return;
    }

    if (authTab === "register" && !name) {
      setAuthError("Name is required for sign up.");
      return;
    }

    setAuthSubmitting(true);
    const result =
      authTab === "login"
        ? await login(email, password)
        : await register(name, email, password, company || undefined);
    setAuthSubmitting(false);

    if (!result.success) {
      setAuthError(result.error || "Something went wrong. Please try again.");
      return;
    }

    // Reset forms
    setEmail("");
    setPassword("");
    setName("");
    setCompany("");
  };

  const handleAddConfig = (e: React.FormEvent) => {
    e.preventDefault();
    setConfigSuccess("");

    if (!newConfigName || !newConfigCommand) {
      alert("Please fill in the configuration name and command.");
      return;
    }

    const argsArray = newConfigArgs
      ? newConfigArgs.split(",").map((a) => a.trim())
      : [];

    saveServerConfig({
      name: newConfigName,
      command: newConfigCommand,
      args: argsArray,
      env: newConfigEnv
    });

    setNewConfigName("");
    setNewConfigCommand("npx");
    setNewConfigArgs("");
    setNewConfigEnv("");
    setConfigSuccess("✔ Configuration successfully saved to secure registry!");

    setTimeout(() => {
      setConfigSuccess("");
    }, 3000);
  };

  const handleTriggerDeploy = (configName: string) => {
    // Select dynamic edge region for deploying
    const regions = ["Mumbai-Edge-01", "Bengaluru-Edge-02", "Chennai-Edge-01"];
    const randomRegion = regions[Math.floor(Math.random() * regions.length)];
    addDeployment(configName, randomRegion);
  };

  const breadcrumbSteps = [
    { name: "User Account Hub", href: "/profile" }
  ];

  return (
    <div id="auth-page" className={`min-h-screen py-6 pb-16 transition-colors duration-200 ${
      isDark ? "bg-[#050508] text-[#e0e0e0]" : "bg-slate-50 text-slate-800"
    }`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <Breadcrumbs items={breadcrumbSteps} />

        {/* Not Logged In View: Login & Signup Forms */}
        {!user ? (
          <div className="max-w-md mx-auto mt-8">
            
            {/* Form Glass Container */}
            <div className={`p-6 sm:p-8 rounded-2xl border backdrop-blur-md shadow-xl ${
              isDark ? "bg-white/[0.02] border-white/5" : "bg-white border-slate-200 shadow-sm"
            }`}>
              
              {/* Tab Selector */}
              <div className="flex gap-2 mb-6 p-1 rounded-full bg-black/10 border border-white/5">
                <button
                  onClick={() => { setAuthTab("login"); setAuthError(""); }}
                  className={`flex-1 py-2 rounded-full text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    authTab === "login" ? "bg-cyan-500 text-black shadow-md" : "text-white/60 hover:text-white"
                  }`}
                >
                  <LogIn className="w-3.5 h-3.5" />
                  Sign In
                </button>
                <button
                  onClick={() => { setAuthTab("register"); setAuthError(""); }}
                  className={`flex-1 py-2 rounded-full text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    authTab === "register" ? "bg-cyan-500 text-black shadow-md" : "text-white/60 hover:text-white"
                  }`}
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  Sign Up
                </button>
              </div>

              {/* H1 Title */}
              <h1 className={`text-xl font-display font-bold text-center mb-6 ${
                isDark ? "text-white" : "text-slate-900"
              }`}>
                {authTab === "login" ? "Welcome Back to MCPserver" : "Create Developer Account"}
              </h1>

              {/* Error Box */}
              {authError && (
                <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-xl text-xs mb-4">
                  {authError}
                </div>
              )}

              {/* Form elements */}
              <form onSubmit={handleAuthSubmit} className="space-y-4">
                {authTab === "register" && (
                  <>
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Your Name</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Anand Sharma"
                        className="w-full px-4 py-2.5 bg-black/30 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Company / Organization</label>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="e.g. TechCorp Solutions"
                        className="w-full px-4 py-2.5 bg-black/30 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@domain.com"
                    className="w-full px-4 py-2.5 bg-black/30 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 bg-black/30 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={authSubmitting}
                  className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed text-black text-xs font-bold rounded-xl shadow-lg transition-all"
                >
                  {authSubmitting
                    ? "Please wait..."
                    : authTab === "login"
                      ? "Secure Login"
                      : "Initialize Developer Account"}
                </button>
              </form>

            </div>
          </div>
        ) : (
          /* Logged In Dashboard Area */
          <div className="space-y-8 mt-6">
            
            {/* Account Profile Header card */}
            <div className={`p-6 rounded-2xl border flex flex-col md:flex-row justify-between items-center gap-4 ${
              isDark ? "bg-white/[0.02] border-white/5" : "bg-white border-slate-200 shadow-sm"
            }`}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center font-display font-bold text-cyan-400 text-lg">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <h1 className={`text-lg font-bold font-display ${isDark ? "text-white" : "text-slate-900"}`}>{user.name}</h1>
                  <p className="text-xs text-gray-400 font-mono">{user.email} | {user.companyName}</p>
                </div>
              </div>
              <button
                onClick={logout}
                className="px-4 py-2 rounded-full border border-rose-500/20 bg-rose-500/5 text-rose-500 hover:bg-rose-500/10 text-xs font-semibold flex items-center gap-1.5 transition-all"
              >
                <LogOut className="w-3.5 h-3.5" />
                Sign Out
              </button>
            </div>

            {/* Config & Deploy Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Save Server Configurations (Left column) */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* 1. Configuration Listing */}
                <div className={`p-5 rounded-2xl border ${
                  isDark ? "bg-white/[0.01] border-white/5" : "bg-white border-slate-200 shadow-sm"
                }`}>
                  <h3 className={`text-sm font-display font-bold mb-4 flex items-center gap-2 ${
                    isDark ? "text-white" : "text-slate-900"
                  }`}>
                    <Database className="w-4 h-4 text-cyan-400" />
                    Saved Server Configurations
                  </h3>

                  {serverConfigs.length === 0 ? (
                    <p className="text-xs text-gray-500 py-2">No configurations saved yet. Create one below!</p>
                  ) : (
                    <div className="space-y-3.5">
                      {serverConfigs.map((config) => (
                        <div key={config.id} className="p-4 rounded-xl bg-black/30 border border-white/5 flex justify-between items-start gap-3">
                          <div className="space-y-1 overflow-hidden">
                            <h4 className={`text-xs font-bold ${isDark ? "text-white" : "text-slate-950"}`}>{config.name}</h4>
                            <p className="text-[10px] font-mono text-cyan-400 truncate">
                              Command: {config.command} {config.args.join(" ")}
                            </p>
                            {config.env && (
                              <p className="text-[9px] font-mono text-gray-500 truncate">
                                Env: {config.env}
                              </p>
                            )}
                            <p className="text-[9px] text-white/30 font-semibold uppercase">Saved: {config.dateSaved}</p>
                          </div>
                          <div className="flex gap-2 shrink-0">
                            <button
                              onClick={() => handleTriggerDeploy(config.name)}
                              className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 text-[10px] font-bold flex items-center gap-1"
                              title="Deploy now"
                            >
                              <Play className="w-3 h-3 fill-cyan-400" />
                              Deploy
                            </button>
                            <button
                              onClick={() => deleteServerConfig(config.id)}
                              className="p-1.5 rounded-lg bg-rose-500/10 text-rose-500 hover:bg-rose-500/20"
                              title="Delete config"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* 2. Config Creator Form */}
                <div className={`p-5 rounded-2xl border ${
                  isDark ? "bg-white/[0.01] border-white/5" : "bg-white border-slate-200 shadow-sm"
                }`}>
                  <h3 className={`text-sm font-display font-bold mb-4 flex items-center gap-2 ${
                    isDark ? "text-white" : "text-slate-900"
                  }`}>
                    <Plus className="w-4 h-4 text-cyan-400" />
                    Register New Server Configuration
                  </h3>

                  {configSuccess && (
                    <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-xs mb-4">
                      {configSuccess}
                    </div>
                  )}

                  <form onSubmit={handleAddConfig} className="space-y-3">
                    <div>
                      <label className="block text-[9px] uppercase font-bold text-gray-400 mb-1">Server Registry Name</label>
                      <input
                        type="text"
                        value={newConfigName}
                        onChange={(e) => setNewConfigName(e.target.value)}
                        placeholder="e.g. Postgres Local Connector"
                        className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[9px] uppercase font-bold text-gray-400 mb-1">Command Entry Point</label>
                        <input
                          type="text"
                          value={newConfigCommand}
                          onChange={(e) => setNewConfigCommand(e.target.value)}
                          placeholder="e.g. npx"
                          className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] uppercase font-bold text-gray-400 mb-1">Arguments (comma-separated)</label>
                        <input
                          type="text"
                          value={newConfigArgs}
                          onChange={(e) => setNewConfigArgs(e.target.value)}
                          placeholder="e.g. @modelcontextprotocol/server-postgres, --host"
                          className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[9px] uppercase font-bold text-gray-400 mb-1">Environment Secrets / API Keys</label>
                      <input
                        type="text"
                        value={newConfigEnv}
                        onChange={(e) => setNewConfigEnv(e.target.value)}
                        placeholder="e.g. API_KEY=sk_****, PORT=3000"
                        className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold rounded-xl transition-all"
                    >
                      Save Configuration
                    </button>
                  </form>
                </div>

              </div>

              {/* Deployment History Logs (Right column) */}
              <div className="lg:col-span-5 space-y-6">
                
                <div className={`p-5 rounded-2xl border ${
                  isDark ? "bg-white/[0.01] border-white/5" : "bg-white border-slate-200 shadow-sm"
                }`}>
                  <h3 className={`text-sm font-display font-bold mb-4 flex items-center gap-2 ${
                    isDark ? "text-white" : "text-slate-900"
                  }`}>
                    <Terminal className="w-4 h-4 text-cyan-400" />
                    Deployment History & Logs
                  </h3>

                  <div className="space-y-4">
                    {deployments.length === 0 ? (
                      <p className="text-xs text-gray-500">No deployments found. Select "Deploy" on any configuration to spin up a container.</p>
                    ) : (
                      deployments.map((dep) => (
                        <div key={dep.id} className="p-3 rounded-xl bg-black/40 border border-white/5 text-[10px] font-mono text-cyan-300 space-y-1">
                          <div className="flex justify-between items-center border-b border-white/5 pb-1 mb-1.5">
                            <span className="font-bold text-white truncate max-w-[150px]">{dep.serverName}</span>
                            <span className={`px-1.5 py-0.5 rounded-full text-[8px] font-bold ${
                              dep.status === "active"
                                ? "bg-emerald-500/10 text-emerald-400"
                                : "bg-cyan-500/10 text-cyan-400 animate-pulse"
                            }`}>
                              {dep.status.toUpperCase()}
                            </span>
                          </div>
                          <div><span className="text-gray-500">Region:</span> {dep.region}</div>
                          <div><span className="text-gray-500">Latency:</span> {dep.duration}</div>
                          <div><span className="text-gray-500">Timestamp:</span> {dep.timestamp}</div>
                          <div className="truncate"><span className="text-gray-500">SSE Host:</span> {dep.url}</div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
