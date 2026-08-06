import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MCP Server Directory - Placeholder",
  description: "Placeholder for MCP Server Directory.",
  alternates: {
    canonical: "/servers/",
    languages: {
      "en-IN": "/servers/",
      "en": "/servers/",
    },
  },
};

export default function Page() {
  return (
    <div>
      <p>MCP Server Directory - placeholder</p>
    </div>
  );
}
