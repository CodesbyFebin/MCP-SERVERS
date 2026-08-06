import { describe, it, expect } from "vitest"
import {
  buildHreflangEntries,
  buildCanonicalWithHreflang,
} from "../../src/lib/multilingual/translation/pipeline"
import { createLocaleRegistry, getEnabledLocales } from "../../src/lib/multilingual/locale-registry"

describe("multilingual-pipeline", () => {
  const registry = createLocaleRegistry()
  const enabledLocales = getEnabledLocales(registry)

  it("should build hreflang entries", () => {
    const entries = buildHreflangEntries("/servers/postgres", enabledLocales)
    expect(entries.find((e) => e.locale === "x-default")).toBeDefined()
    expect(entries.find((e) => e.locale === "en")?.url).toBe("/servers/postgres")
    expect(entries.find((e) => e.locale === "hi")?.url).toBe("/hi/servers/postgres")
  })

  it("should build canonical with alternates", () => {
    const { canonical, alternates } = buildCanonicalWithHreflang("/servers/postgres", "en", enabledLocales)
    expect(canonical).toBe("/servers/postgres")
    expect(alternates.length).toBeGreaterThan(1)
  })

  it("should build canonical with locale prefix for non-English", () => {
    const { canonical } = buildCanonicalWithHreflang("/servers/postgres", "hi", enabledLocales)
    expect(canonical).toBe("/hi/servers/postgres")
  })

  it("should have enabled locales", () => {
    expect(enabledLocales.length).toBeGreaterThan(0)
    expect(enabledLocales.some((l) => l.code === "en")).toBe(true)
    expect(enabledLocales.some((l) => l.code === "hi")).toBe(true)
  })
})
