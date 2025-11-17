import { ReadinessData } from './types';

// API 請求函式 - 優先使用 /api/sheets/civilization（從 Google Sheet 獲取數據）
export async function fetchReadinessData(): Promise<ReadinessData> {
  try {
    // 優先從 Google Sheet 獲取數據
    console.log('fetchReadinessData: 開始請求 /api/sheets/civilization');
    let response = await fetch('/api/sheets/civilization', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });
    
    // 如果失敗，嘗試 /api/latest
    if (!response.ok) {
      console.log('fetchReadinessData: Sheet API 失敗，嘗試 /api/latest');
      response = await fetch('/api/latest', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      });
    }
    
    console.log('fetchReadinessData: 響應狀態:', response.status, response.statusText);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('fetchReadinessData: 解析的數據:', data);
    return data;
  } catch (error) {
    console.error('Error fetching readiness data:', error);
    console.error('錯誤詳情:', error instanceof Error ? error.message : String(error));
    // 回退到預設數據（使用技術指引中的範例數據）
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
    
    const fallbackData = {
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
    console.log('fetchReadinessData: 使用預設數據:', fallbackData);
    return fallbackData;
  }
}

// 根據ASI指數獲取顏色
export function getASIIndexColor(asiIndex: number): string {
  if (asiIndex <= 40) return 'text-green-400';
  if (asiIndex <= 70) return 'text-yellow-400';
  return 'text-red-400';
}

// 根據進度獲取顏色
export function getProgressColor(progress: number): string {
  if (progress <= 40) return 'from-green-400 to-green-600';
  if (progress <= 70) return 'from-yellow-400 to-yellow-600';
  return 'from-red-400 to-red-600';
}

// 格式化日期
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleString('zh-TW', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}