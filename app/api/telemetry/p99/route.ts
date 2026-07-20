import { NextResponse } from "next/server";

export const runtime = "nodejs";

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

function buildSeries(base: number[], variance: number): LatencyPoint[] {
  return base.map((p50, idx) => {
    const p90 = Math.round(p50 + variance * (1.5 + Math.random()));
    const p99 = Math.round(p90 + variance * (1.2 + Math.random() * 0.8));
    const offsetMinute = ((minuteNum - (base.length - 1 - idx) * 5) % 60 + 60) % 60;
    return {
      time: `${hour}:${offsetMinute.toString().padStart(2, "0")}`,
      p50: Math.max(1, p50 + Math.round((Math.random() - 0.5) * variance)),
      p90: Math.max(1, p90),
      p99: Math.max(1, p99)
    };
  });
}

function sampleRegions(): RegionMetric[] {
  return [
    {
      name: "Mumbai Edge",
      latencyMs: Math.round(10 + Math.random() * 8),
      uptime: "Targeting high availability",
      status: "Illustrative",
      checkedAt: now.toISOString()
    },
    {
      name: "Bengaluru Edge",
      latencyMs: Math.round(9 + Math.random() * 7),
      uptime: "Targeting high availability",
      status: "Illustrative",
      checkedAt: now.toISOString()
    },
    {
      name: "Secure Gateway Proxy",
      latencyMs: Math.round(2 + Math.random() * 4),
      uptime: "Targeting high availability",
      status: "Illustrative",
      checkedAt: now.toISOString()
    },
    {
      name: "In-Browser Sandbox",
      latencyMs: Math.round(1 + Math.random() * 3),
      uptime: "Targeting high availability",
      status: "Illustrative",
      checkedAt: now.toISOString()
    }
  ];
}

export async function GET() {
  const snapshot: TelemetrySnapshot = {
    generatedAt: now.toISOString(),
    targetMs: 50,
    regions: sampleRegions(),
    series: buildSeries([7, 6, 8, 10, 9, 11, 9, 7], 4),
    note: "This endpoint currently returns illustrative sample data. Replace with real telemetry ingestion when available."
  };

  return NextResponse.json(snapshot, {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store"
    }
  });
}
