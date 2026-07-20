import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * MCP Telemetry Endpoint
 * 
 * This endpoint serves latency and regional metrics for the MCP server infrastructure.
 * In production, this data would be sourced from actual Prometheus/CloudWatch metrics.
 * 
 * To connect real telemetry:
 * 1. Set TELEMETRY_SOURCE=cloudwatch|prometheus|datadog in environment
 * 2. Configure AWS credentials or Prometheus endpoint in environment
 * 3. Implement the fetchTelemetryFromSource() function below
 */

interface RegionMetric {
  name: string;
  latencyMs: number;
  uptime: string;
  status: string;
  checkedAt: string;
}

interface LatencyPoint {
  time: string;
  p50: number;
  p90: number;
  p99: number;
  mumbai?: number;
  bengaluru?: number;
}

interface TelemetrySnapshot {
  generatedAt: string;
  targetMs: number;
  regions: RegionMetric[];
  series: LatencyPoint[];
  note: string;
}

const now = new Date();
const hour = now.getHours().toString().padStart(2, "0");
const minuteNum = now.getMinutes();

/**
 * Fetch real telemetry from configured sources
 * Implements adapter pattern for CloudWatch, Prometheus, or Datadog
 */
async function fetchTelemetryFromSource(): Promise<TelemetrySnapshot | null> {
  const source = process.env.TELEMETRY_SOURCE;
  
  if (source === "cloudwatch") {
    return fetchFromCloudWatch();
  } else if (source === "prometheus") {
    return fetchFromPrometheus();
  } else if (source === "datadog") {
    return fetchFromDatadog();
  }
  
  return null;
}

async function fetchFromCloudWatch(): Promise<TelemetrySnapshot | null> {
  // When real CloudWatch metrics are available, implement:
  // - AWS SDK getMetricData for p99 latency from CloudWatch
  // - Filter by metric math for ap-south-1 and ap-south-2 dimensions
  // - Return structured data matching TelemetrySnapshot
  return null;
}

async function fetchFromPrometheus(): Promise<TelemetrySnapshot | null> {
  // When real Prometheus metrics are available, implement:
  // - Query /api/v1/query for mcp_request_duration_seconds
  // - Query mcp_requests_total for throughput
  // - Query mcp_request_errors_total for error rates
  return null;
}

async function fetchFromDatadog(): Promise<TelemetrySnapshot | null> {
  // When real Datadog metrics are available, implement:
  // - Datadog API query for latencies
  // - Filter by tags: region:mumbai, region:bengaluru
  return null;
}

function getIllustrativeData(): TelemetrySnapshot {
  const sampleSeries = [7, 6, 8, 10, 9, 11, 9, 7];
  
  const series = sampleSeries.map((p50, idx) => {
    const offsetMinute = ((minuteNum - (sampleSeries.length - 1 - idx) * 5) % 60 + 60) % 60;
    const p90 = Math.round(p50 + 7 * (1.5 + Math.random()));
    const p99 = Math.round(p90 + 5 * (1.2 + Math.random() * 0.8));
    
    return {
      time: `${hour}:${offsetMinute.toString().padStart(2, "0")}`,
      p50: Math.max(1, p50 + Math.round((Math.random() - 0.5) * 2)),
      p90: Math.max(1, p90),
      p99: Math.max(1, p99),
      mumbai: Math.round(9 + Math.random() * 6),
      bengaluru: Math.round(8 + Math.random() * 5)
    };
  });

  const regions: RegionMetric[] = [
    {
      name: "Mumbai Edge",
      latencyMs: Math.round(11 + Math.random() * 4),
      uptime: "Targeting high availability",
      status: "Illustrative",
      checkedAt: now.toISOString()
    },
    {
      name: "Bengaluru Edge",
      latencyMs: Math.round(9 + Math.random() * 3),
      uptime: "Targeting high availability",
      status: "Illustrative",
      checkedAt: now.toISOString()
    },
    {
      name: "Secure Gateway Proxy",
      latencyMs: Math.round(3 + Math.random() * 2),
      uptime: "Targeting high availability",
      status: "Illustrative",
      checkedAt: now.toISOString()
    }
  ];

  return {
    generatedAt: now.toISOString(),
    targetMs: 50,
    regions,
    series,
    note: "Illustrative data for planning. Connect real telemetry by setting TELEMETRY_SOURCE."
  };
}

async function GET() {
  // Try to fetch real telemetry first
  const realData = await fetchTelemetryFromSource();
  
  if (realData) {
    return NextResponse.json(realData, {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "max-age=60"
      }
    });
  }

  // Fall back to illustrative data
  const snapshot = getIllustrativeData();

  return NextResponse.json(snapshot, {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store"
    }
  });
}

export { GET };