import { describe, it, expect } from "vitest"
import { runBenchmark, createBenchmarkMethodology } from "../../src/lib/benchmarks/benchmark-engine"

describe("benchmark-engine", () => {
  it("should run benchmark and return record", async () => {
    const benchmark = await runBenchmark({
      name: "Test Benchmark",
      description: "Test",
      metric: "latency",
      environment: "local",
      method: "test",
      entities: ["server.postgres"],
      runFn: async () => ({ p50: 10, p95: 20 }),
    })

    expect(benchmark.id).toBeDefined()
    expect(benchmark.name).toBe("Test Benchmark")
    expect(benchmark.status).toBe("reviewed")
    expect(benchmark.results).toEqual({ p50: 10, p95: 20 })
  })

  it("should create benchmark methodology", () => {
    const methodology = createBenchmarkMethodology({
      benchmarkId: "bench-1",
      steps: ["step1", "step2"],
    })

    expect(methodology.id).toBeDefined()
    expect(methodology.benchmarkId).toBe("bench-1")
    expect(methodology.steps).toHaveLength(2)
  })

  it("should handle benchmark errors", async () => {
    await expect(
      runBenchmark({
        name: "Failing Benchmark",
        description: "Test",
        metric: "latency",
        environment: "local",
        method: "test",
        runFn: async () => {
          throw new Error("Benchmark failed")
        },
      })
    ).rejects.toThrow("Benchmark failed")
  })
})
