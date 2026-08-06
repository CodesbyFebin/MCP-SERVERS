export interface PipelineMetrics {
  pipelineRunId: string
  startedAt: string
  completedAt: string | null
  status: "running" | "completed" | "failed"
  candidatesProcessed: number
  pagesPublished: number
  pagesRejected: number
  evidenceFailures: number
  duplicateMatches: number
  translationFailures: number
  buildDurationMs: number
  costPerPublishedPage: number | null
}

export interface BuildEvidence {
  buildId: string
  timestamp: string
  entityCount: number
  pageCount: number
  sitemapCount: number
  indexCount: number
  qualityGateResults: Array<{ route: string; passed: boolean; score: number }>
}
