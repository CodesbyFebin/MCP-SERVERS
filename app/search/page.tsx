"use client"

import { useState, useEffect, useMemo } from "react"

interface SearchResult {
  id: string
  type: string
  slug: string
  name: string
  summary: string
  route: string
  status: string
  qualityScore: number
  aliases?: string[]
  metadata?: Record<string, any>
}

export default function SearchPage() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [entityIndex, setEntityIndex] = useState<SearchResult[]>([])

  useEffect(() => {
    fetch("/search/entity-index.json")
      .then((res) => res.json())
      .then((data) => {
        setEntityIndex(data)
        setResults(data.slice(0, 10))
      })
      .catch((error) => {
        console.error("Failed to load search index:", error)
      })
  }, [])

  const filteredResults = useMemo(() => {
    if (!query.trim()) {
      return entityIndex.slice(0, 20)
    }

    const lowerQuery = query.toLowerCase()
    return entityIndex.filter((result) => {
      const searchText = [
        result.name,
        result.summary,
        result.slug,
        ...(result.aliases || []),
      ]
        .join(" ")
        .toLowerCase()

      return searchText.includes(lowerQuery)
    })
  }, [query, entityIndex])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    setTimeout(() => {
      setResults(filteredResults)
      setLoading(false)
    }, 100)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Search MCPServer.in</h1>
          <p className="text-lg text-gray-600">
            Search across {entityIndex.length} MCP servers, topics, and resources
          </p>
        </div>

        <form onSubmit={handleSearch} className="mb-8">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for MCP servers, topics, comparisons..."
              className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
            />
            <button
              type="submit"
              className="absolute right-2 top-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </form>

        <div className="mb-6">
          <div className="flex gap-2 flex-wrap">
            {["server", "topic", "pillar", "comparison"].map((type) => {
              const count = entityIndex.filter((r) => r.type === type).length
              return (
                <span
                  key={type}
                  className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm"
                >
                  {type}: {count}
                </span>
              )
            })}
          </div>
        </div>

        <div className="space-y-4">
          {filteredResults.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No results found for "{query}"</p>
            </div>
          ) : (
            filteredResults.map((result) => (
              <a
                key={result.id}
                href={result.route}
                className="block p-6 bg-white rounded-xl border border-gray-200 hover:border-blue-400 transition"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                        {result.type}
                      </span>
                      {result.status === "published" && (
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                          Published
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{result.name}</h3>
                    <p className="text-gray-600 mb-3">{result.summary}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>Quality: {result.qualityScore}/100</span>
                      <span>{result.route}</span>
                    </div>
                  </div>
                </div>
              </a>
            ))
          )}
        </div>

        {query && (
          <div className="mt-8 text-center text-sm text-gray-500">
            Found {filteredResults.length} results for "{query}"
          </div>
        )}
      </div>
    </div>
  )
}
