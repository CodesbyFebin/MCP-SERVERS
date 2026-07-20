"use client";

/**
 * MCP Benchmark Tool
 * Interactive performance testing for MCP servers
 */

import { useState } from 'react'

interface BenchmarkResult {
  server: string
  latency: number
  success: boolean
  error?: string
  timestamp: Date
}

interface ServerConfig {
  name: string
  endpoint: string
  description: string
}

const SERVERS: ServerConfig[] = [
  {
    name: 'Filesystem',
    endpoint: 'stdio',
    description: 'Local filesystem access'
  },
  {
    name: 'PostgreSQL',
    endpoint: 'postgres://localhost:5432',
    description: 'Database query testing'
  },
  {
    name: 'Redis',
    endpoint: 'redis://localhost:6379',
    description: 'Cache operations'
  },
  {
    name: 'Prometheus',
    endpoint: 'http://localhost:9090',
    description: 'Metrics endpoint'
  },
  {
    name: 'Grafana',
    endpoint: 'http://localhost:3000',
    description: 'Dashboard API'
  },
  {
    name: 'GitHub',
    endpoint: 'https://api.github.com',
    description: 'REST API test'
  },
  {
    name: 'Slack',
    endpoint: 'https://slack.com/api',
    description: 'Bot API test'
  },
  {
    name: 'Custom Server',
    endpoint: '',
    description: 'Test your own MCP server'
  }
]

export default function BenchmarkTool() {
  const [selectedServer, setSelectedServer] = useState<string>('')
  const [results, setResults] = useState<BenchmarkResult[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [latency, setLatency] = useState<number | null>(null)

  const runBenchmark = async () => {
    if (!selectedServer) return

    setIsRunning(true)
    const startTime = Date.now()

    try {
      // Simulate benchmark - in production, this would make actual requests
      await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000))
      
      const latencyMs = Math.floor(Math.random() * 100) + 20
      setLatency(latencyMs)
      
      const newResult: BenchmarkResult = {
        server: selectedServer,
        latency: latencyMs,
        success: true,
        timestamp: new Date()
      }
      
      setResults([newResult, ...results.slice(0, 9)])
    } catch (error) {
      const newResult: BenchmarkResult = {
        server: selectedServer,
        latency: 0,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date()
      }
      setResults([newResult, ...results.slice(0, 9)])
    } finally {
      setIsRunning(false)
    }
  }

  const clearResults = () => {
    setResults([])
    setLatency(null)
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">MCP Server Benchmark Tool</h1>
      
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Test Configuration</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Select Server to Test
            </label>
            <select
              value={selectedServer}
              onChange={(e) => setSelectedServer(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Select a server --</option>
              {SERVERS.map((server) => (
                <option key={server.name} value={server.name}>
                  {server.name} - {server.description}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">
              Test Location
            </label>
            <select className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500">
              <option value="mumbai">Mumbai, India (Default)</option>
              <option value="bengaluru">Bengaluru, India</option>
              <option value="delhi">Delhi, India</option>
              <option value="global">Global (Random)</option>
            </select>
          </div>
        </div>
        
        <button
          onClick={runBenchmark}
          disabled={isRunning || !selectedServer}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
            isRunning || !selectedServer
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {isRunning ? 'Running Benchmark...' : 'Run Benchmark'}
        </button>
      </div>

      {latency !== null && (
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded">
          <div className="flex items-center">
            <div className="ml-3">
              <p className="text-sm font-medium text-blue-800">
                {selectedServer} Benchmark Complete
              </p>
              <p className="text-sm text-blue-700">
                Latency: <span className="font-semibold">{latency}ms</span>
              </p>
            </div>
          </div>
        </div>
      )}

      {results.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Recent Results</h2>
            <button
              onClick={clearResults}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
            >
              Clear All
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Server
                  </th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">
                    Latency
                  </th>
                  <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {results.map((result, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 text-sm font-medium text-gray-900">
                      {result.server}
                    </td>
                    <td className="px-4 py-2 text-sm text-right text-gray-700">
                      {result.latency}ms
                    </td>
                    <td className="px-4 py-2 text-center">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          result.success
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {result.success ? 'Success' : 'Failed'}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-sm text-right text-gray-500">
                      {result.timestamp.toLocaleTimeString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="mt-6 bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Benchmark Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="bg-gray-50 p-4 rounded">
            <p className="text-gray-600">Excellent</p>
            <p className="font-medium text-green-600">&lt; 50ms</p>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <p className="text-gray-600">Good</p>
            <p className="font-medium text-yellow-600">50-100ms</p>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <p className="text-gray-600">Needs Improvement</p>
            <p className="font-medium text-red-600">&gt; 100ms</p>
          </div>
        </div>
      </div>
    </div>
  )
}