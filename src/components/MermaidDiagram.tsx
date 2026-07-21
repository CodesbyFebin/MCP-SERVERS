"use client";

import { useEffect, useId, useRef, useState } from "react";

export default function MermaidDiagram({ chart }: { chart: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const id = useId().replace(/:/g, "-");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    import("mermaid").then(({ default: mermaid }) => {
      mermaid.initialize({
        startOnLoad: false,
        theme: "dark",
        themeVariables: {
          background: "#050508",
          primaryColor: "#0e1a2b",
          primaryTextColor: "#e2e8f0",
          primaryBorderColor: "#22d3ee",
          lineColor: "#475569",
          secondaryColor: "#1e1b3a",
          tertiaryColor: "#0a0a12",
          fontFamily: "inherit",
        },
      });

      mermaid
        .render(`mermaid-${id}`, chart)
        .then(({ svg }) => {
          if (!cancelled && containerRef.current) {
            containerRef.current.innerHTML = svg;
          }
        })
        .catch((err) => {
          if (!cancelled) setError(err instanceof Error ? err.message : "Failed to render diagram");
        });
    });

    return () => {
      cancelled = true;
    };
  }, [chart, id]);

  if (error) {
    return (
      <pre className="mt-5 overflow-x-auto rounded-lg border border-red-400/20 bg-black/60 p-4 text-xs leading-6 text-red-300">
        Diagram failed to render: {error}
      </pre>
    );
  }

  return (
    <div
      ref={containerRef}
      className="mt-5 flex justify-center overflow-x-auto rounded-lg border border-white/10 bg-black/30 p-4"
    />
  );
}
