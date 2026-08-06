export interface CDNConfig {
  enabled: boolean
  provider: "vercel" | "cloudflare" | "aws" | "none"
  cacheControl: {
    static: string
    dynamic: string
    api: string
    images: string
  }
  edgeRegions: string[]
}

export const DEFAULT_CDN_CONFIG: CDNConfig = {
  enabled: true,
  provider: "vercel",
  cacheControl: {
    static: "public, max-age=31536000, s-maxage=31536000, immutable",
    dynamic: "public, max-age=60, stale-while-revalidate=300",
    api: "no-store, must-revalidate",
    images: "public, max-age=31536000, s-maxage=31536000, immutable",
  },
  edgeRegions: ["iad1", "sfo1", "fra1", "hnd1", "syd1"],
}

export function getCDNHeaders(config: CDNConfig = DEFAULT_CDN_CONFIG): Record<string, string> {
  if (!config.enabled || config.provider === "none") {
    return {}
  }

  return {
    "CDN-Cache-Control": config.cacheControl.static,
    "CDN-Regions": config.edgeRegions.join(","),
  }
}
