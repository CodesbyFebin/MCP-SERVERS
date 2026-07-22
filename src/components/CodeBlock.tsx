"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

function detectLanguage(code: string): string {
  const trimmed = code
    .split("\n")
    .filter((line) => !/^\s*(\/\/|#)/.test(line))
    .join("\n")
    .trim();
  if (trimmed.startsWith("{") || trimmed.startsWith("[")) return "json";
  if (/^(npm|npx|node|pip|python|curl|docker|kubectl|git)\b/m.test(trimmed)) return "bash";
  if (/^(apiVersion|kind):/m.test(trimmed)) return "yaml";
  if (/(import .* from|=>|interface |: string|: number)/.test(trimmed)) return "typescript";
  if (/^(SELECT|INSERT|UPDATE|DELETE|CREATE)\b/im.test(trimmed)) return "sql";
  if (/^graph\s/m.test(trimmed)) return "mermaid";
  return "text";
}

export default function CodeBlock({ code, language }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);
  const resolvedLanguage = language ?? detectLanguage(code);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard API unavailable (non-HTTPS or unsupported browser) - silently ignore.
    }
  };

  return (
    <div className="mt-5 overflow-hidden rounded-lg border border-cyan-400/15 bg-black/60">
      <div className="flex items-center justify-between border-b border-white/5 px-4 py-2">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">{resolvedLanguage}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-md px-2 py-1 text-[11px] font-semibold text-slate-400 transition hover:bg-white/[0.06] hover:text-cyan-200"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3 text-emerald-300" /> Copied
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" /> Copy
            </>
          )}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-xs leading-6 text-cyan-100">
        <code>{code}</code>
      </pre>
    </div>
  );
}
