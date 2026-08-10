export interface CanonicalURL {
  path: string;
  canonical: string;
  alternates: Array<{ hreflang: string; href: string }>;
}

export const SITE_ORIGIN = "https://mcpserver.in";

export const canonicalURLs: CanonicalURL[] = [
  {
    path: "/servers/",
    canonical: `${SITE_ORIGIN}/servers/`,
    alternates: [
      { hreflang: "en-IN", href: `${SITE_ORIGIN}/servers/` },
      { hreflang: "en", href: `${SITE_ORIGIN}/servers/` },
      { hreflang: "hi", href: `${SITE_ORIGIN}/hi/servers/` },
      { hreflang: "es", href: `${SITE_ORIGIN}/es/servers/` },
      { hreflang: "zh", href: `${SITE_ORIGIN}/zh/servers/` },
      { hreflang: "ja", href: `${SITE_ORIGIN}/ja/servers/` },
      { hreflang: "x-default", href: `${SITE_ORIGIN}/servers/` },
    ],
  },
  {
    path: "/tutorials/",
    canonical: `${SITE_ORIGIN}/tutorials/`,
    alternates: [
      { hreflang: "en-IN", href: `${SITE_ORIGIN}/tutorials/` },
      { hreflang: "en", href: `${SITE_ORIGIN}/tutorials/` },
      { hreflang: "hi", href: `${SITE_ORIGIN}/hi/tutorials/` },
      { hreflang: "es", href: `${SITE_ORIGIN}/es/tutorials/` },
      { hreflang: "zh", href: `${SITE_ORIGIN}/zh/tutorials/` },
      { hreflang: "ja", href: `${SITE_ORIGIN}/ja/tutorials/` },
      { hreflang: "x-default", href: `${SITE_ORIGIN}/tutorials/` },
    ],
  },
  {
    path: "/database/",
    canonical: `${SITE_ORIGIN}/database/`,
    alternates: [
      { hreflang: "en-IN", href: `${SITE_ORIGIN}/database/` },
      { hreflang: "en", href: `${SITE_ORIGIN}/database/` },
      { hreflang: "hi", href: `${SITE_ORIGIN}/hi/database/` },
      { hreflang: "es", href: `${SITE_ORIGIN}/es/database/` },
      { hreflang: "zh", href: `${SITE_ORIGIN}/zh/database/` },
      { hreflang: "ja", href: `${SITE_ORIGIN}/ja/database/` },
      { hreflang: "x-default", href: `${SITE_ORIGIN}/database/` },
    ],
  },
];

function normalizePath(path: string): string {
  if (!path) return "/";
  const pathname = path.split(/[?#]/, 1)[0] || "/";
  return pathname === "/" ? "/" : `/${pathname.replace(/^\/+|\/+$/g, "")}/`;
}

export function getCanonicalURL(path: string): CanonicalURL {
  const normalized = normalizePath(path);
  return canonicalURLs.find((url) => normalizePath(url.path) === normalized) ?? {
    path: normalized,
    canonical: `${SITE_ORIGIN}${normalized}`,
    alternates: [
      { hreflang: "en-IN", href: `${SITE_ORIGIN}${normalized}` },
      { hreflang: "en", href: `${SITE_ORIGIN}${normalized}` },
      { hreflang: "x-default", href: `${SITE_ORIGIN}${normalized}` },
    ],
  };
}

export function getCanonicalTag(path: string): string {
  const url = getCanonicalURL(path);
  const alternates = url.alternates
    .map((alt) => `  <link rel="alternate" hreflang="${alt.hreflang}" href="${alt.href}" />`)
    .join("\n");

  return `<link rel="canonical" href="${url.canonical}" />\n${alternates}`;
}
