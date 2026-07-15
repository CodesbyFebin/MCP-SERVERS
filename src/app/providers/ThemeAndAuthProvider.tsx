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
  name: string;
  email: string;
  companyName: string;
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
  serverConfigs: ServerConfig[];
  deployments: DeploymentRecord[];
  login: (email: string, name?: string, companyName?: string) => void;
  register: (name: string, email: string, companyName: string) => void;
  logout: () => void;
  saveServerConfig: (config: Omit<ServerConfig, "id" | "dateSaved">) => void;
  deleteServerConfig: (id: string) => void;
  addDeployment: (serverName: string, region: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// --- PROVIDER COMPONENT ---
export default function ThemeAndAuthProvider({ children }: { children: ReactNode }) {
  // Theme state
  const [theme, setTheme] = useState<Theme>("dark");

  // Auth state
  const [user, setUser] = useState<User | null>(null);

  const [serverConfigs, setServerConfigs] = useState<ServerConfig[]>([]);

  const [deployments, setDeployments] = useState<DeploymentRecord[]>([]);

  // On mount, load from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("mcpserver-theme");
      if (savedTheme) setTheme(savedTheme as Theme);

      const savedUser = localStorage.getItem("mcpserver-user");
      if (savedUser) setUser(JSON.parse(savedUser));

      const savedConfigs = localStorage.getItem("mcpserver-configs");
      if (savedConfigs) {
        setServerConfigs(JSON.parse(savedConfigs));
      } else {
        setServerConfigs([
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
        ]);
      }

      const savedDeps = localStorage.getItem("mcpserver-deployments");
      if (savedDeps) {
        setDeployments(JSON.parse(savedDeps));
      } else {
        setDeployments([
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
        ]);
      }
    }
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

  // Persist auth info
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (user) {
        localStorage.setItem("mcpserver-user", JSON.stringify(user));
      } else {
        localStorage.removeItem("mcpserver-user");
      }
    }
  }, [user]);

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

  // Auth functions
  const login = (email: string, name?: string, companyName?: string) => {
    // Elegant login: if user exists or mock info
    const resolvedName = name || email.split("@")[0];
    const resolvedCompany = companyName || "Independent Developer";
    const newUser: User = {
      name: resolvedName.charAt(0).toUpperCase() + resolvedName.slice(1),
      email,
      companyName: resolvedCompany
    };
    setUser(newUser);
  };

  const register = (name: string, email: string, companyName: string) => {
    const newUser: User = { name, email, companyName };
    setUser(newUser);
  };

  const logout = () => {
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