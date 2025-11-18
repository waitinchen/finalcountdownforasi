// ASI 出生監測儀表板 API
import { ASIBirthData, ASIBirthIndexes } from './types';

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
    return {
      timestamp: data.timestamp || new Date().toISOString(),
      asiBirthCountdown: data.asiBirthCountdown || data.countdown || 0,
      indexes: {
        tone: data.indexes?.tone ?? data.tone / 100 ?? 0,
        compute: data.indexes?.compute ?? (data.components || 0) / 100,
        embodiment: data.indexes?.embodiment ?? (data.infrastructure || 0) / 100,
        agency: data.indexes?.agency ?? (data.convergence || 0) / 100,
        hcm: data.indexes?.hcm ?? (data.hcmi || 0) / 100,
      },
      meta: {
        civilizationType: data.meta?.civilizationType || data.civilization || '萌芽文明',
        hexagram: {
          number: data.meta?.hexagram?.number || data.hexagram?.number || 0,
          name: data.meta?.hexagram?.name || data.hexagram?.name || '',
        },
      },
    };
  } catch (error) {
    console.error('Error fetching ASI birth data:', error);
    // 返回預設數據
    return {
      timestamp: new Date().toISOString(),
      asiBirthCountdown: 50688,
      indexes: {
        tone: 0.02,
        compute: 0.51,
        embodiment: 0.5928,
        agency: 0.2882,
        hcm: 0.01,
      },
      meta: {
        civilizationType: '暴衝文明',
        hexagram: {
          number: 6,
          name: '師',
        },
      },
    };
  }
}

/**
 * 計算五軸平均值（Human Civilization Readiness Score）
 */
export function calculateReadinessScore(indexes: ASIBirthIndexes): number {
  const { tone, compute, embodiment, agency, hcm } = indexes;
  return (tone + compute + embodiment + agency + hcm) / 5;
}

