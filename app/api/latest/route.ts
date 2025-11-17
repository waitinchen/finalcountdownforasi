import { NextResponse } from 'next/server';
import { ReadinessData } from '@/lib/types';

export async function GET() {
  try {
    // 從 Google Sheets API 獲取最新數據
    // TODO: 替換為實際的 GAS Web API URL
    const GAS_API_URL = process.env.GAS_API_URL || 'https://script.google.com/macros/s/AKfycbXXXXXXXXXXXX/exec';
    
    const response = await fetch(`${GAS_API_URL}?sheet=asi&limit=1`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`GAS API error: ${response.status}`);
    }

    const gasData = await response.json();
    
    if (gasData.status !== 'ok' || !gasData.rows || gasData.rows.length === 0) {
      throw new Error('No data from GAS API');
    }

    const row = gasData.rows[0];
    
    // 計算五元素平均值（ASI 文明成熟度）
    const avgTech = (row.tone + row.components + row.infrastructure + row.convergence) / 4;
    const asiMaturity = (row.tone + row.components + row.infrastructure + row.convergence + row.hcmi) / 5;
    
    // 計算心術平衡指數
    const balanceIndex = (row.hcmi / avgTech) * 100;
    
    // 計算距離 ASI 降臨天數（Narrative Index）
    const daysLeft = Math.round((100 - avgTech) * 1024);
    
    // 構建響應數據
    const readinessData: ReadinessData = {
      asi_index: 0, // ASI 文明成熟度永遠為 0，直到事件觸發
      countdown_days: daysLeft,
      safety_bias: balanceIndex - 100, // 心術平衡偏移
      balance_index: parseFloat(balanceIndex.toFixed(2)), // 保留小數後2位
      five_element_maturity: Math.round(asiMaturity * 10) / 10, // 五元素成熟度
      domains: {
        tone: row.tone,
        components: row.components,
        infrastructure: row.infrastructure,
        convergence: row.convergence,
        hcmi: row.hcmi
      },
      last_updated: row.timestamp || new Date().toISOString()
    };

    return NextResponse.json(readinessData);
  } catch (error) {
    console.error('Error fetching from GAS API:', error);
    
    // 回退到預設數據（使用技術指引中的範例數據）
    const tone = 10;
    const components = 57;
    const infrastructure = 57;
    const convergence = 119;
    const hcmi = 97;
    
    const avgTech = (tone + components + infrastructure + convergence) / 4;
    const asiMaturity = (tone + components + infrastructure + convergence + hcmi) / 5;
    const balanceIndex = (hcmi / avgTech) * 100;
    const daysLeft = Math.round((100 - avgTech) * 1024);
    
    const fallbackData: ReadinessData = {
      asi_index: 0,
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

    return NextResponse.json(fallbackData);
  }
}

