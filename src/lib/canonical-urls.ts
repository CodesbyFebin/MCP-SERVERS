export interface CanonicalURL {
  path: string;
  canonical: string;
  alternates: Array<{ hreflang: string; href: string }>;
}

export const canonicalURLs: CanonicalURL[] = [
  // Servers
  {
    path: "/servers/",
    canonical: "https://mcpserver.in/servers/",
    alternates: [
      { hreflang: "hi", href: "https://mcpserver.in/hi/servers/" },
      { hreflang: "es", href: "https://mcpserver.in/es/servers/" },
      { hreflang: "zh", href: "https://mcpserver.in/zh/servers/" },
      { hreflang: "ja", href: "https://mcpserver.in/ja/servers/" },
      { hreflang: "x-default", href: "https://mcpserver.in/servers/" },
    ],
  },
  {
    path: "/tutorials/",
    canonical: "https://mcpserver.in/tutorials/",
    alternates: [
      { hreflang: "hi", href: "https://mcpserver.in/hi/tutorials/" },
      { hreflang: "es", href: "https://mcpserver.in/es/tutorials/" },
      { hreflang: "zh", href: "https://mcpserver.in/zh/tutorials/" },
      { hreflang: "ja", href: "https://mcpserver.in/ja/tutorials/" },
      { hreflang: "x-default", href: "https://mcpserver.in/tutorials/" },
    ],
  },
  {
    path: "/database/",
    canonical: "https://mcpserver.in/database/",
    alternates: [
      { hreflang: "hi", href: "https://mcpserver.in/hi/database/" },
      { hreflang: "es", href: "https://mcpserver.in/es/database/" },
      { hreflang: "zh", href: "https://mcpserver.in/zh/database/" },
      { hreflang: "ja", href: "https://mcpserver.in/ja/database/" },
      { hreflang: "x-default", href: "https://mcpserver.in/database/" },
    ],
  },
];

export function getCanonicalURL(path: string): CanonicalURL | undefined {
  return canonicalURLs.find(url => url.path === path);
}

export function getCanonicalTag(path: string): string {
  const url = getCanonicalURL(path);
  if (!url) return `<link rel="canonical" href="https://mcpserver.in${path}" />`;

  const alternates = url.alternates
    .map(alt => `  <link rel="alternate" hreflang="${alt.hreflang}" href="${alt.href}" />`)
    .join("\n");

  return `<link rel="canonical" href="${url.canonical}" />\n${alternates}`;
}
