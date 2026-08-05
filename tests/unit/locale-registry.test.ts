import { describe, it, expect } from "vitest"
import { createLocaleRegistry, getEnabledLocales, isLocaleEnabled, requiresHumanReview } from "../../src/lib/multilingual/locale-registry"

describe("locale-registry", () => {
  it("should create registry with default locales", () => {
    const registry = createLocaleRegistry()
    const enabled = getEnabledLocales(registry)
    expect(enabled.length).toBeGreaterThan(0)
    expect(enabled.some((l) => l.code === "en")).toBe(true)
    expect(enabled.some((l) => l.code === "hi")).toBe(true)
  })

  it("should check locale enabled", () => {
    const registry = createLocaleRegistry()
    expect(isLocaleEnabled(registry, "en")).toBe(true)
    expect(isLocaleEnabled(registry, "hi")).toBe(true)
    expect(isLocaleEnabled(registry, "xx")).toBe(false)
  })

  it("should check human review requirement", () => {
    const registry = createLocaleRegistry()
    expect(requiresHumanReview(registry, "hi")).toBe(true)
    expect(requiresHumanReview(registry, "en")).toBe(false)
  })
})
