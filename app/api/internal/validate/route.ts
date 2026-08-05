import { NextResponse } from "next/server";
import { validatePublishingGraph } from "../../../../src/data/publishing";

export async function POST() {
  const result = validatePublishingGraph();
  return NextResponse.json(result);
}
