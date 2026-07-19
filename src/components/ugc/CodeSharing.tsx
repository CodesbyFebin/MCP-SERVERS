"use client";

import { useState, useCallback } from "react";
import {
  Code2,
  Copy,
  Check,
  Download,
  Plus,
  Trash2,
  Terminal,
  Eye
} from "lucide-react";

export interface CodeSnippet {
  id: string;
  title: string;
  language: string;
  code: string;
  author: string;
  timestamp: string;
  description?: string;
  downloads: number;
}

interface CodeSharingProps {
  postId: string;
  initialSnippets?: CodeSnippet[];
  allowSubmissions?: boolean;
}

const LANGUAGE_OPTIONS = [
  "TypeScript",
  "Python",
  "JavaScript",
  "Bash",
  "JSON",
  "YAML",
  "Go",
  "Rust",
  "cURL",
  "Other"
];

const languageColors: Record<string, string> = {
  TypeScript: "text-blue-300 bg-blue-500/10",
  Python: "text-emerald-300 bg-emerald-500/10",
  JavaScript: "text-amber-300 bg-amber-500/10",
  Bash: "text-gray-300 bg-gray-500/10",
  JSON: "text-cyan-300 bg-cyan-500/10",
  YAML: "text-violet-300 bg-violet-500/10",
  Go: "text-sky-300 bg-sky-500/10",
  Rust: "text-orange-300 bg-orange-500/10",
  cURL: "text-pink-300 bg-pink-500/10",
  Other: "text-white/50 bg-white/5"
};

export default function CodeSharing({
  postId,
  initialSnippets = [],
  allowSubmissions = true
}: CodeSharingProps) {
  const [snippets, setSnippets] = useState<CodeSnippet[]>(initialSnippets);
  const [showForm, setShowForm] = useState(false);
  const [expandedSnippet, setExpandedSnippet] = useState<string | null>(null);
  const [newSnippet, setNewSnippet] = useState({
    title: "",
    language: "TypeScript",
    code: "",
    description: ""
  });
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleSubmit = useCallback(() => {
    if (newSnippet.title.trim() && newSnippet.code.trim()) {
      const snippet: CodeSnippet = {
        id: `snippet-${Date.now()}`,
        title: newSnippet.title.trim(),
        language: newSnippet.language,
        code: newSnippet.code.trim(),
        author: "You",
        timestamp: "Just now",
        description: newSnippet.description.trim() || undefined,
        downloads: 0
      };
      setSnippets((prev) => [snippet, ...prev]);
      setNewSnippet({ title: "", language: "TypeScript", code: "", description: "" });
      setShowForm(false);
    }
  }, [newSnippet]);

  const handleCopy = useCallback(async (snippetId: string, code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedId(snippetId);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // fallback: select text
    }
  }, []);

  const handleDelete = useCallback((snippetId: string) => {
    setSnippets((prev) => prev.filter((s) => s.id !== snippetId));
  }, []);

  const handleDownload = useCallback((snippet: CodeSnippet) => {
    const extensions: Record<string, string> = {
      TypeScript: "ts",
      Python: "py",
      JavaScript: "js",
      Bash: "sh",
      JSON: "json",
      YAML: "yaml",
      Go: "go",
      Rust: "rs",
      cURL: "sh",
      Other: "txt"
    };
    const ext = extensions[snippet.language] || "txt";
    const blob = new Blob([snippet.code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${snippet.title.replace(/\s+/g, "-").toLowerCase()}.${ext}`;
    a.click();
    URL.revokeObjectURL(url);

    setSnippets((prev) =>
      prev.map((s) =>
        s.id === snippet.id ? { ...s, downloads: s.downloads + 1 } : s
      )
    );
  }, []);

  return (
    <section className="mt-12 border-t border-white/10 pt-8" aria-label="Code Snippets">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Code2 className="h-5 w-5 text-emerald-300" />
          <h2 className="text-lg font-black text-white">
            Code Snippets ({snippets.length})
          </h2>
        </div>

        {allowSubmissions && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-bold text-white hover:bg-emerald-500 transition"
          >
            <Plus className="h-3.5 w-3.5" />
            Share Code
          </button>
        )}
      </div>

      {/* Submission Form */}
      {showForm && (
        <div className="mb-6 rounded-xl border border-emerald-400/20 bg-emerald-500/5 p-5">
          <h3 className="text-sm font-bold text-white mb-3">Share a Code Snippet</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              type="text"
              value={newSnippet.title}
              onChange={(e) => setNewSnippet({ ...newSnippet, title: e.target.value })}
              placeholder="Snippet title..."
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/30 focus:border-emerald-400/50 focus:outline-none"
            />
            <select
              value={newSnippet.language}
              onChange={(e) => setNewSnippet({ ...newSnippet, language: e.target.value })}
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-emerald-400/50 focus:outline-none appearance-none"
            >
              {LANGUAGE_OPTIONS.map((lang) => (
                <option key={lang} value={lang} className="bg-gray-900">
                  {lang}
                </option>
              ))}
            </select>
          </div>
          <input
            type="text"
            value={newSnippet.description}
            onChange={(e) => setNewSnippet({ ...newSnippet, description: e.target.value })}
            placeholder="Brief description (optional)..."
            className="w-full mt-3 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/30 focus:border-emerald-400/50 focus:outline-none"
          />
          <textarea
            value={newSnippet.code}
            onChange={(e) => setNewSnippet({ ...newSnippet, code: e.target.value })}
            placeholder="Paste your code here..."
            className="w-full mt-3 resize-none rounded-lg border border-white/10 bg-gray-950/50 px-3 py-2 text-sm font-mono text-emerald-200 placeholder-white/20 focus:border-emerald-400/50 focus:outline-none"
            rows={6}
          />
          <div className="mt-3 flex justify-end gap-2">
            <button
              onClick={() => setShowForm(false)}
              className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-white/60 hover:bg-white/10 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!newSnippet.title.trim() || !newSnippet.code.trim()}
              className="rounded-lg bg-emerald-600 px-4 py-2 text-xs font-bold text-white disabled:opacity-40 hover:bg-emerald-500 transition"
            >
              Share Snippet
            </button>
          </div>
        </div>
      )}

      {/* Snippets List */}
      <div className="space-y-4">
        {snippets.length > 0 ? (
          snippets.map((snippet) => {
            const isExpanded = expandedSnippet === snippet.id;
            const langColor = languageColors[snippet.language] ?? languageColors.Other;
            const isCopied = copiedId === snippet.id;

            return (
              <div
                key={snippet.id}
                className="rounded-xl border border-white/10 bg-white/[0.03] overflow-hidden"
              >
                {/* Header */}
                <div className="flex items-center gap-3 px-4 py-3">
                  <span
                    className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${langColor}`}
                  >
                    {snippet.language}
                  </span>
                  <h3 className="text-sm font-bold text-white flex-1 truncate">
                    {snippet.title}
                  </h3>
                  <div className="flex items-center gap-1 text-[11px] text-white/40">
                    <span>by {snippet.author}</span>
                    <span>·</span>
                    <span>{snippet.timestamp}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleCopy(snippet.id, snippet.code)}
                      className="p-1.5 rounded text-white/40 hover:text-white/70 transition"
                      title="Copy to clipboard"
                    >
                      {isCopied ? (
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                    </button>
                    <button
                      onClick={() => handleDownload(snippet)}
                      className="p-1.5 rounded text-white/40 hover:text-white/70 transition"
                      title="Download"
                    >
                      <Download className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() =>
                        setExpandedSnippet(isExpanded ? null : snippet.id)
                      }
                      className="p-1.5 rounded text-white/40 hover:text-white/70 transition"
                      title={isExpanded ? "Collapse" : "Expand"}
                    >
                      <Eye className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                {/* Description */}
                {snippet.description && (
                  <p className="px-4 pb-2 text-xs text-white/40">{snippet.description}</p>
                )}

                {/* Code (expandable) */}
                {isExpanded && (
                  <div className="border-t border-white/5">
                    <pre className="overflow-x-auto p-4 text-xs font-mono leading-5 text-emerald-200 bg-gray-950/30">
                      <code>{snippet.code}</code>
                    </pre>
                    <div className="flex items-center justify-between px-4 py-2 border-t border-white/5">
                      <span className="text-[11px] text-white/30">
                        {snippet.downloads} downloads
                      </span>
                      <button
                        onClick={() => handleDelete(snippet.id)}
                        className="flex items-center gap-1 text-[11px] text-red-400/60 hover:text-red-400 transition"
                      >
                        <Trash2 className="h-3 w-3" />
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="text-center py-10">
            <Terminal className="h-10 w-10 mx-auto text-white/20 mb-3" />
            <p className="text-sm text-white/40">
              No code snippets shared yet. Be the first to contribute!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
