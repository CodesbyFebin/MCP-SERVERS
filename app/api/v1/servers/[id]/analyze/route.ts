import { NextRequest, NextResponse } from 'next/server';
import { fetchAndAnalyzeErrors } from '../../../../../../src/lib/log-fetcher';

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const result = await fetchAndAnalyzeErrors(id);
  return NextResponse.json(result);
}