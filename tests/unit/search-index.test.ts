import { describe, it, expect } from "vitest"
import { createEmptySearchIndex } from "../../src/lib/search/search-index"

describe("search-index", () => {
  it("should create empty search index", () => {
    const index = createEmptySearchIndex()
    expect(index.entities).toEqual([])
    expect(index.relationships).toEqual([])
    expect(index.pages).toEqual([])
  })
})
