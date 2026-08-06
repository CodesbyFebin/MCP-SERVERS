export interface SitemapEntry {
  url: string
  lastModified: string
  changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never"
  priority: number
  locale: string
  canonical: string
  alternates: Array<{ hreflang: string; url: string }>
}

export interface SitemapIndex {
  sitemaps: Array<{ url: string; lastModified: string }>
  entries: SitemapEntry[]
}
