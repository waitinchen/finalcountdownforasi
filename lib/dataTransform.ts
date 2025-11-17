// 數據轉換函式
// 將 Google Sheet 數據轉換為前端需要的格式

import { CivilizationData } from './sheets';
import { ReadinessData } from './types';

/**
 * 將文明五元素數據轉換為 ReadinessData 格式
 */
export function transformToReadinessData(civData: CivilizationData): ReadinessData {
  const { tone, components, infrastructure, convergence, hcmi } = civData;
  
  // 計算術的平均值（媒體、關鍵元件、基建、整合）
  const avgTech = (tone + components + infrastructure + convergence) / 4;
  
  // 計算五元素成熟度（五元素平均值）
  const fiveElementMaturity = (tone + components + infrastructure + convergence + hcmi) / 5;
  
  // 計算心術平衡指數（C謀公式：hcmi / avgTech * 100）
  const balanceIndex = avgTech > 0 ? (hcmi / avgTech) * 100 : 0;
  
  // 計算距離 ASI 降臨天數（Narrative Index）
  const daysLeft = Math.round((100 - avgTech) * 1024);
  
  return {
    asi_index: 0, // ASI 文明成熟度永遠為 0，直到事件觸發
    countdown_days: daysLeft,
    safety_bias: balanceIndex - 100, // 心術平衡偏移
    balance_index: parseFloat(balanceIndex.toFixed(2)), // 保留小數後2位
    five_element_maturity: Math.round(fiveElementMaturity * 10) / 10,
    domains: {
      tone: tone,
      components: components,
      infrastructure: infrastructure,
      convergence: convergence,
      hcmi: hcmi,
    },
    last_updated: civData.timestamp || new Date().toISOString(),
  };
}

/**
 * 驗證文明五元素數據
 */
export function validateCivilizationData(data: CivilizationData): boolean {
  return (
    typeof data.components === 'number' &&
    typeof data.tone === 'number' &&
    typeof data.convergence === 'number' &&
    typeof data.infrastructure === 'number' &&
    typeof data.hcmi === 'number' &&
    !isNaN(data.components) &&
    !isNaN(data.tone) &&
    !isNaN(data.convergence) &&
    !isNaN(data.infrastructure) &&
    !isNaN(data.hcmi)
  );
}

