import { NextResponse } from 'next/server';
import { ReadinessData } from '@/lib/types';

export async function GET() {
  // 靜態 API 回應
  const readinessData: ReadinessData = {
    asi_index: 73.2,
    countdown_days: 2424,
    safety_bias: 18.1,
    domains: {
      tone: 66,
      components: 81,
      infrastructure: 72,
      convergence: 54,
      hcmi: 63
    },
    last_updated: "2025-11-17T00:00:00Z"
  };

  return NextResponse.json(readinessData);
}