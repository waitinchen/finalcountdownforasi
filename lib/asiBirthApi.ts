// ASI 出生監測儀表板 API
import { ASIBirthData, ASIBirthIndexes, CountdownData } from './types';

/**
 * 計算倒數數據（v1.1 新公式）
 * 科學版：Math.pow(1 - ReadyScore, 2) * 30
 * 加速版：Math.pow(1 - ReadyScore, 2) * 20
 */
export function calculateCountdown(indexes: ASIBirthIndexes): CountdownData {
  const { tone, compute, embodiment, agency, hcm } = indexes;
  
  // ReadyScore（文明成熟度）
  const readyScore = (tone + compute + embodiment + agency + hcm) / 5;
  
  // 科學模型
  const scienceYears = Math.pow(1 - readyScore, 2) * 30;
  
  // 加速模型
  const fastYears = Math.pow(1 - readyScore, 2) * 20;
  
  return {
    readyScore,
    scienceYears,
    fastYears,
    scienceDays: Math.round(scienceYears * 365),
    fastDays: Math.round(fastYears * 365),
  };
}

/**
 * 從後端API獲取 ASI 出生監測數據
 * 通過 Next.js API 路由代理，避免 CORS 問題
 */
export async function fetchASIBirthData(): Promise<ASIBirthData> {
  try {
    console.log('fetchASIBirthData: 開始請求後端API...');
    
    // 使用 Next.js API 路由代理請求，避免 CORS 問題
    const response = await fetch('/api/asi-birth', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('fetchASIBirthData: 數據獲取成功:', data);
    
    // 轉換為 ASIBirthData 格式
    const indexes = {
      tone: data.indexes?.tone ?? (typeof data.tone === 'number' ? data.tone / 100 : 0),
      compute: data.indexes?.compute ?? (typeof data.components === 'number' ? data.components / 100 : 0),
      embodiment: data.indexes?.embodiment ?? (typeof data.infrastructure === 'number' ? data.infrastructure / 100 : 0),
      agency: data.indexes?.agency ?? (typeof data.convergence === 'number' ? data.convergence / 100 : 0),
      hcm: data.indexes?.hcm ?? (typeof data.hcmi === 'number' ? data.hcmi / 100 : 0),
    };
    
    // 計算倒數數據（v1.1 新公式）
    const countdown = calculateCountdown(indexes);
    
    return {
      timestamp: data.timestamp || new Date().toISOString(),
      indexes,
      countdown,
      meta: {
        civilizationType: data.meta?.civilizationType || data.civilization || '萌芽文明',
        hexagram: {
          number: data.meta?.hexagram?.number || data.hexagram?.number || 0,
          name: data.meta?.hexagram?.name || data.hexagram?.name || '',
        },
      },
      // 兼容舊格式
      asiBirthCountdown: data.asiBirthCountdown || data.countdown || countdown.scienceDays,
    };
  } catch (error) {
    console.error('Error fetching ASI birth data:', error);
    // 返回預設數據
    const fallbackIndexes = {
      tone: 0.02,
      compute: 0.51,
      embodiment: 0.5928,
      agency: 0.2882,
      hcm: 0.01,
    };
    const fallbackCountdown = calculateCountdown(fallbackIndexes);
    
    return {
      timestamp: new Date().toISOString(),
      indexes: fallbackIndexes,
      countdown: fallbackCountdown,
      meta: {
        civilizationType: '暴衝文明',
        hexagram: {
          number: 6,
          name: '師',
        },
      },
      asiBirthCountdown: fallbackCountdown.scienceDays,
    };
  }
}

/**
 * 計算五軸平均值（Human Civilization Readiness Score）
 * @deprecated 使用 calculateCountdown().readyScore 代替
 */
export function calculateReadinessScore(indexes: ASIBirthIndexes): number {
  const { tone, compute, embodiment, agency, hcm } = indexes;
  return (tone + compute + embodiment + agency + hcm) / 5;
}

