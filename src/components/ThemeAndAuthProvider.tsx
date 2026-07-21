"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// --- THEME TYPES & CONTEXT ---
export type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// --- AUTH TYPES & CONTEXT ---
export interface User {
  id: string;
  name: string;
  email: string;
  companyName: string | null;
}

export interface AuthResult {
  success: boolean;
  error?: string;
}

export interface ServerConfig {
  id: string;
  name: string;
  command: string;
  args: string[];
  env: string;
  dateSaved: string;
}

export interface DeploymentRecord {
  id: string;
  serverName: string;
  status: "active" | "failed" | "building";
  duration: string;
  timestamp: string;
  region: string;
  url: string;
}

interface AuthContextType {
  user: User | null;
  authLoading: boolean;
  serverConfigs: ServerConfig[];
  deployments: DeploymentRecord[];
  login: (email: string, password: string) => Promise<AuthResult>;
  register: (name: string, email: string, password: string, companyName?: string) => Promise<AuthResult>;
  logout: () => Promise<void>;
  saveServerConfig: (config: Omit<ServerConfig, "id" | "dateSaved">) => void;
  deleteServerConfig: (id: string) => void;
  addDeployment: (serverName: string, region: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const defaultServerConfigs: ServerConfig[] = [
  {
    id: "conf-1",
    name: "GitHub Enterprise Connector",
    command: "npx",
    args: ["@modelcontextprotocol/server-github"],
    env: "GITHUB_PERSONAL_ACCESS_TOKEN=ghp_****",
    dateSaved: "2026-07-01 14:22"
  },
  {
    id: "conf-2",
    name: "PostgreSQL Local Sandbox",
    command: "npx",
    args: ["@modelcontextprotocol/server-postgres", "--host", "127.0.0.1"],
    env: "DATABASE_URL=postgres://****",
    dateSaved: "2026-07-04 09:10"
  }
];

const defaultDeployments: DeploymentRecord[] = [
  {
    id: "dep-1",
    serverName: "GitHub Enterprise Connector",
    status: "active",
    duration: "14ms",
    timestamp: "2026-07-08 12:44:10",
    region: "Mumbai-Edge-01",
    url: "https://hub.mcpserver.in/sse/github-enterprise-connector"
  },
  {
    id: "dep-2",
    serverName: "PostgreSQL Local Sandbox",
    status: "active",
    duration: "22ms",
    timestamp: "2026-07-08 18:30:15",
    region: "Bengaluru-Edge-02",
    url: "https://hub.mcpserver.in/sse/postgresql-local-sandbox"
  }
];

function readJsonStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    localStorage.removeItem(key);
    return fallback;
  }
}

// --- PROVIDER COMPONENT ---
export default function ThemeAndAuthProvider({ children }: { children: ReactNode }) {
  // Theme state
  const [theme, setTheme] = useState<Theme>("dark");

  // Auth state — the real session lives in an httpOnly cookie verified server-side
  // (see src/lib/auth.ts + middleware.ts). This just mirrors it for the UI.
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  const [serverConfigs, setServerConfigs] = useState<ServerConfig[]>([]);

  const [deployments, setDeployments] = useState<DeploymentRecord[]>([]);

  // On mount, load theme/demo-config from localStorage and the real session from the server
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("mcpserver-theme");
      if (savedTheme === "light" || savedTheme === "dark") {
        setTheme(savedTheme);
      } else if (savedTheme) {
        localStorage.removeItem("mcpserver-theme");
      }

      const parsedConfigs = readJsonStorage<ServerConfig[]>("mcpserver-configs", defaultServerConfigs);
      setServerConfigs(Array.isArray(parsedConfigs) ? parsedConfigs : defaultServerConfigs);

      const parsedDeployments = readJsonStorage<DeploymentRecord[]>("mcpserver-deployments", defaultDeployments);
      setDeployments(Array.isArray(parsedDeployments) ? parsedDeployments : defaultDeployments);
    }

    fetch("/api/auth/me")
      .then((res) => (res.ok ? res.json() : { user: null }))
      .then((data) => setUser(data.user ?? null))
      .catch(() => setUser(null))
      .finally(() => setAuthLoading(false));
  }, []);

  // Apply theme to DOM
  useEffect(() => {
    if (typeof window !== "undefined") {
      const root = window.document.documentElement;
      if (theme === "light") {
        root.classList.add("light");
        root.classList.remove("dark");
      } else {
        root.classList.add("dark");
        root.classList.remove("light");
      }
      localStorage.setItem("mcpserver-theme", theme);
    }
  }, [theme]);

  useEffect(() => {
    if (typeof window !== "undefined" && serverConfigs.length > 0) {
      localStorage.setItem("mcpserver-configs", JSON.stringify(serverConfigs));
    }
  }, [serverConfigs]);

  useEffect(() => {
    if (typeof window !== "undefined" && deployments.length > 0) {
      localStorage.setItem("mcpserver-deployments", JSON.stringify(deployments));
    }
  }, [deployments]);

  // Toggle theme
  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // Auth functions — these call the real, server-verified endpoints in app/api/auth/*
  const login = async (email: string, password: string): Promise<AuthResult> => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || "Login failed" };
      }
      setUser(data.user);
      return { success: true };
    } catch {
      return { success: false, error: "Network error — please try again" };
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    companyName?: string
  ): Promise<AuthResult> => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, companyName })
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || "Registration failed" };
      }
      setUser(data.user);
      return { success: true };
    } catch {
      return { success: false, error: "Network error — please try again" };
    }
  };

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" }).catch(() => {});
    setUser(null);
  };

  // Config functions
  const saveServerConfig = (config: Omit<ServerConfig, "id" | "dateSaved">) => {
    const newConfig: ServerConfig = {
      ...config,
      id: "conf-" + Date.now(),
      dateSaved: new Date().toISOString().replace("T", " ").slice(0, 16)
    };
    setServerConfigs((prev) => [newConfig, ...prev]);
  };

  const deleteServerConfig = (id: string) => {
    setServerConfigs((prev) => prev.filter((c) => c.id !== id));
  };

  // Deployment functions
  const addDeployment = (serverName: string, region: string) => {
    const id = "dep-" + Date.now();
    const newDep: DeploymentRecord = {
      id,
      serverName,
      status: "building",
      duration: "--",
      timestamp: new Date().toISOString().replace("T", " ").slice(0, 19),
      region,
      url: `https://hub.mcpserver.in/sse/${serverName.toLowerCase().replace(/[^a-z0-9]/g, "-")}`
    };

    setDeployments((prev) => [newDep, ...prev]);

    // Simulate completion
    setTimeout(() => {
      setDeployments((prev) =>
        prev.map((d) =>
          d.id === id
            ? { ...d, status: "active", duration: `${Math.floor(Math.random() * 25) + 10}ms` }
            : d
        )
      );
    }, 2500);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <AuthContext.Provider
        value={{
          user,
          authLoading,
          serverConfigs,
          deployments,
          login,
          register,
          logout,
          saveServerConfig,
          deleteServerConfig,
          addDeployment
        }}
      >
        {children}
      </AuthContext.Provider>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeAndAuthProvider");
  }
  return context;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a ThemeAndAuthProvider");
  }
  return context;
}
