export interface TranslationRecord {
  id: string
  sourceRoute: string
  locale: string
  translatedRoute: string
  status: "pending" | "machine-translated" | "human-reviewed" | "published" | "rejected"
  translatedTitle: string
  translatedDescription: string
  translatedContent: Record<string, string>
  terminologyGlossaryId: string | null
  reviewedBy: string | null
  reviewedAt: string | null
  qualityScore: number | null
  createdAt: string
  updatedAt: string
}

export interface TerminologyGlossary {
  id: string
  locale: string
  entries: Array<{
    term: string
    translation: string
    context: string
    approved: boolean
  }>
}

export interface HreflangEntry {
  locale: string
  url: string
  isDefault?: boolean
}

export function buildHreflangEntries(baseRoute: string, locales: Array<{ code: string; enabled: boolean }>): HreflangEntry[] {
  const entries: HreflangEntry[] = []
  const defaultEntry: HreflangEntry = {
    locale: "x-default",
    url: baseRoute,
    isDefault: true,
  }
  entries.push(defaultEntry)

  for (const locale of locales) {
    if (!locale.enabled) continue
    entries.push({
      locale: locale.code,
      url: locale.code === "en" ? baseRoute : `/${locale.code}${baseRoute}`,
    })
  }

  return entries
}

export function buildCanonicalWithHreflang(
  baseRoute: string,
  currentLocale: string,
  locales: Array<{ code: string; enabled: boolean }>
): { canonical: string; alternates: HreflangEntry[] } {
  const alternates = buildHreflangEntries(baseRoute, locales)
  const canonical = currentLocale === "en" ? baseRoute : `/${currentLocale}${baseRoute}`
  return { canonical, alternates }
}
