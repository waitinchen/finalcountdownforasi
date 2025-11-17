import { ReadinessData } from './types';

// API 請求函式
export async function fetchReadinessData(): Promise<ReadinessData> {
  try {
    console.log('fetchReadinessData: 開始請求 /api/readiness');
    const response = await fetch('/api/readiness', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // 確保不緩存
    });
    
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
    // 回退到預設數據
    const fallbackData = {
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