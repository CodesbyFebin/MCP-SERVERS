export interface CacheConfig {
  maxAge: number
  staleWhileRevalidate: number
  revalidate: number | false
}

export const CACHE_CONFIGS: Record<string, CacheConfig> = {
  static: {
    maxAge: 31536000,
    staleWhileRevalidate: 31536000,
    revalidate: false,
  },
  dynamic: {
    maxAge: 0,
    staleWhileRevalidate: 300,
    revalidate: 60,
  },
  api: {
    maxAge: 0,
    staleWhileRevalidate: 0,
    revalidate: 0,
  },
  search: {
    maxAge: 3600,
    staleWhileRevalidate: 86400,
    revalidate: 3600,
  },
}

export function getCacheControl(config: CacheConfig): string {
  const parts = [`public, max-age=${config.maxAge}`]

  if (config.staleWhileRevalidate > 0) {
    parts.push(`stale-while-revalidate=${config.staleWhileRevalidate}`)
  }

  if (config.revalidate !== false && config.revalidate > 0) {
    parts.push(`s-maxage=${config.revalidate}`)
  }

  return parts.join(", ")
}
