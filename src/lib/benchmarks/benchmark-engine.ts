export interface BenchmarkRecord {
  id: string
  name: string
  description: string
  metric: string
  environment: string
  hardware: string | null
  dataset: string | null
  method: string
  sampleSize: number
  repetitions: number
  runAt: string
  results: Record<string, number>
  sourceArtifacts: string[]
  reviewerId: string | null
  status: "draft" | "reviewed" | "published"
  entities: string[]
}

export interface BenchmarkMethodology {
  id: string
  benchmarkId: string
  steps: string[]
  environmentSetup: string
  dataCollection: string
  analysisMethod: string
  limitations: string[]
}

export interface BenchmarkRunOptions {
  name: string
  description: string
  metric: string
  environment: string
  hardware?: string | null
  dataset?: string | null
  method: string
  sampleSize?: number
  repetitions?: number
  entities?: string[]
  runFn: () => Promise<Record<string, number>>
}

export function createBenchmarkRecord(overrides: Partial<BenchmarkRecord> = {}): BenchmarkRecord {
  return {
    id: `benchmark-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    name: "",
    description: "",
    metric: "",
    environment: "",
    hardware: null,
    dataset: null,
    method: "",
    sampleSize: 1,
    repetitions: 1,
    runAt: new Date().toISOString(),
    results: {},
    sourceArtifacts: [],
    reviewerId: null,
    status: "draft",
    entities: [],
    ...overrides,
  }
}

export async function runBenchmark(options: BenchmarkRunOptions): Promise<BenchmarkRecord> {
  const benchmark = createBenchmarkRecord({
    name: options.name,
    description: options.description,
    metric: options.metric,
    environment: options.environment,
    hardware: options.hardware ?? null,
    dataset: options.dataset ?? null,
    method: options.method,
    sampleSize: options.sampleSize ?? 1,
    repetitions: options.repetitions ?? 1,
    entities: options.entities ?? [],
  })

  try {
    const results = await options.runFn()
    benchmark.results = results
    benchmark.status = "reviewed"
  } catch (error) {
    benchmark.status = "draft"
    throw error
  }

  return benchmark
}

export function createBenchmarkMethodology(overrides: Partial<BenchmarkMethodology> = {}): BenchmarkMethodology {
  return {
    id: `methodology-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    benchmarkId: "",
    steps: [],
    environmentSetup: "",
    dataCollection: "",
    analysisMethod: "",
    limitations: [],
    ...overrides,
  }
}
