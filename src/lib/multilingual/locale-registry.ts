export interface Locale {
  code: string
  name: string
  nativeName: string
  direction: "ltr" | "rtl"
  enabled: boolean
  translationMode: "human" | "machine-assisted" | "machine"
  requiresHumanReview: boolean
  technicalGlossaryId: string | null
}

export interface LocaleRegistry {
  locales: Map<string, Locale>
}

export const DEFAULT_LOCALES: Locale[] = [
  { code: "en", name: "English", nativeName: "English", direction: "ltr", enabled: true, translationMode: "human", requiresHumanReview: false, technicalGlossaryId: null },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", direction: "ltr", enabled: true, translationMode: "machine-assisted", requiresHumanReview: true, technicalGlossaryId: "glossary-hi" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்", direction: "ltr", enabled: true, translationMode: "machine-assisted", requiresHumanReview: true, technicalGlossaryId: "glossary-ta" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు", direction: "ltr", enabled: true, translationMode: "machine-assisted", requiresHumanReview: true, technicalGlossaryId: "glossary-te" },
  { code: "ml", name: "Malayalam", nativeName: "മലയാളം", direction: "ltr", enabled: true, translationMode: "machine-assisted", requiresHumanReview: true, technicalGlossaryId: "glossary-ml" },
  { code: "mr", name: "Marathi", nativeName: "मराठी", direction: "ltr", enabled: true, translationMode: "machine-assisted", requiresHumanReview: true, technicalGlossaryId: "glossary-mr" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা", direction: "ltr", enabled: true, translationMode: "machine-assisted", requiresHumanReview: true, technicalGlossaryId: "glossary-bn" },
  { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી", direction: "ltr", enabled: true, translationMode: "machine-assisted", requiresHumanReview: true, technicalGlossaryId: "glossary-gu" },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ", direction: "ltr", enabled: true, translationMode: "machine-assisted", requiresHumanReview: true, technicalGlossaryId: "glossary-kn" },
  { code: "pa", name: "Punjabi", nativeName: "ਪੰਜਾਬੀ", direction: "ltr", enabled: true, translationMode: "machine-assisted", requiresHumanReview: true, technicalGlossaryId: "glossary-pa" },
  { code: "ur", name: "Urdu", nativeName: "اردو", direction: "rtl", enabled: true, translationMode: "machine-assisted", requiresHumanReview: true, technicalGlossaryId: "glossary-ur" },
  { code: "zh", name: "Chinese", nativeName: "中文", direction: "ltr", enabled: true, translationMode: "machine", requiresHumanReview: true, technicalGlossaryId: "glossary-zh" },
  { code: "ja", name: "Japanese", nativeName: "日本語", direction: "ltr", enabled: true, translationMode: "machine", requiresHumanReview: true, technicalGlossaryId: "glossary-ja" },
  { code: "ko", name: "Korean", nativeName: "한국어", direction: "ltr", enabled: true, translationMode: "machine", requiresHumanReview: true, technicalGlossaryId: "glossary-ko" },
  { code: "es", name: "Spanish", nativeName: "Español", direction: "ltr", enabled: true, translationMode: "machine-assisted", requiresHumanReview: false, technicalGlossaryId: "glossary-es" },
  { code: "de", name: "German", nativeName: "Deutsch", direction: "ltr", enabled: true, translationMode: "machine-assisted", requiresHumanReview: false, technicalGlossaryId: "glossary-de" },
  { code: "fr", name: "French", nativeName: "Français", direction: "ltr", enabled: true, translationMode: "machine-assisted", requiresHumanReview: false, technicalGlossaryId: "glossary-fr" },
  { code: "pt", name: "Portuguese", nativeName: "Português", direction: "ltr", enabled: true, translationMode: "machine-assisted", requiresHumanReview: false, technicalGlossaryId: "glossary-pt" },
  { code: "ru", name: "Russian", nativeName: "Русский", direction: "ltr", enabled: true, translationMode: "machine-assisted", requiresHumanReview: true, technicalGlossaryId: "glossary-ru" },
  { code: "it", name: "Italian", nativeName: "Italiano", direction: "ltr", enabled: true, translationMode: "machine-assisted", requiresHumanReview: false, technicalGlossaryId: "glossary-it" },
]

export function createLocaleRegistry(locales: Locale[] = DEFAULT_LOCALES): LocaleRegistry {
  return {
    locales: new Map(locales.map((l) => [l.code, l])),
  }
}

export function getLocale(registry: LocaleRegistry, code: string): Locale | undefined {
  return registry.locales.get(code)
}

export function isLocaleEnabled(registry: LocaleRegistry, code: string): boolean {
  const locale = registry.locales.get(code)
  return locale?.enabled ?? false
}

export function requiresHumanReview(registry: LocaleRegistry, code: string): boolean {
  const locale = registry.locales.get(code)
  return locale?.requiresHumanReview ?? false
}

export function getEnabledLocales(registry: LocaleRegistry): Locale[] {
  return Array.from(registry.locales.values()).filter((l) => l.enabled)
}
