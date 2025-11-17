import { NextResponse } from 'next/server';
import { fetchLatestCivilizationData } from '@/lib/sheets';
import { transformToReadinessData, validateCivilizationData } from '@/lib/dataTransform';
import { ReadinessData } from '@/lib/types';

export async function GET() {
  try {
    console.log('[/api/sheets/civilization] 開始獲取文明五元素數據...');
    
    // 從 Google Sheet 獲取最新數據
    const civData = await fetchLatestCivilizationData();
    
    if (!civData) {
      throw new Error('未獲取到數據');
    }
    
    // 驗證數據
    if (!validateCivilizationData(civData)) {
      throw new Error('數據格式驗證失敗');
    }
    
    // 轉換為 ReadinessData 格式
    const readinessData = transformToReadinessData(civData);
    
    console.log('[/api/sheets/civilization] 數據獲取成功:', readinessData);
    
    return NextResponse.json(readinessData);
  } catch (error) {
    console.error('[/api/sheets/civilization] 錯誤:', error);
    
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
        hcmi: hcmi,
      },
      last_updated: new Date().toISOString(),
    };
    
    return NextResponse.json(fallbackData);
  }
}

