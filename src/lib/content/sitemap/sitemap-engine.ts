import type { SitemapEntry, SitemapIndex } from "./types"

export function createSitemapIndex(entries: SitemapEntry[]): SitemapIndex {
  const grouped = groupEntriesByLocale(entries)
  const sitemaps = Object.entries(grouped).map(([locale, localeEntries]) => ({
    url: `/sitemap-${locale}.xml`,
    lastModified: new Date().toISOString(),
  }))

  return {
    sitemaps,
    entries,
  }
}

export function groupEntriesByLocale(entries: SitemapEntry[]): Record<string, SitemapEntry[]> {
  return entries.reduce<Record<string, SitemapEntry[]>>((acc, entry) => {
    const locale = entry.locale || "en"
    if (!acc[locale]) {
      acc[locale] = []
    }
    acc[locale].push(entry)
    return acc
  }, {})
}

export function filterPublishedEntries(entries: SitemapEntry[]): SitemapEntry[] {
  return entries.filter((entry) => {
    return entry.priority > 0 && entry.changeFrequency !== "never"
  })
}

export function sortEntriesByPriority(entries: SitemapEntry[]): SitemapEntry[] {
  return [...entries].sort((a, b) => b.priority - a.priority)
}
