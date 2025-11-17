import { NextResponse } from 'next/server';
import { ReadinessData } from '@/lib/types';

export async function GET() {
  // 兼容舊的 /api/readiness 端點，重定向到 /api/latest
  // 或使用回退數據（使用技術指引中的範例數據）
  const tone = 10;
  const components = 57;
  const infrastructure = 57;
  const convergence = 119;
  const hcmi = 97;
  
  // 計算五元素平均值（ASI 文明成熟度）
  const avgTech = (tone + components + infrastructure + convergence) / 4;
  const asiMaturity = (tone + components + infrastructure + convergence + hcmi) / 5;
  
  // 計算心術平衡指數（C謀公式：hcmi / avgTech * 100）
  const balanceIndex = (hcmi / avgTech) * 100;
  
  // 計算距離 ASI 降臨天數（Narrative Index）
  const daysLeft = Math.round((100 - avgTech) * 1024);

  const readinessData: ReadinessData = {
    asi_index: 0, // ASI 文明成熟度永遠為 0
    countdown_days: daysLeft,
    safety_bias: balanceIndex - 100,
    balance_index: parseFloat(balanceIndex.toFixed(2)), // 保留小數後2位
    five_element_maturity: Math.round(asiMaturity * 10) / 10,
    domains: {
      tone: tone,
      components: components,
      infrastructure: infrastructure,
      convergence: convergence,
      hcmi: hcmi
    },
    last_updated: new Date().toISOString()
  };

  return NextResponse.json(readinessData);
}