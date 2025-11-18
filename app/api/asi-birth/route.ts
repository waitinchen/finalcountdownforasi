import { NextResponse } from 'next/server';
import { ASIBirthData } from '@/lib/types';

// Google Apps Script API URL
const ASI_BIRTH_API_URL = 'https://script.google.com/macros/s/AKfycbzTpW8Hewr3b5Z1hj1qN_K8cMstp2NHlU4XlbpqN8ei10KPFytD9odF-Hf0qYLks8_FnQ/exec?type=five';

export async function GET() {
  try {
    console.log('[/api/asi-birth] 開始獲取 ASI 出生監測數據...');
    
    // 從 Google Apps Script API 獲取數據
    const response = await fetch(ASI_BIRTH_API_URL, {
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
    console.log('[/api/asi-birth] 數據獲取成功:', data);
    
    // 轉換為 ASIBirthData 格式
    const birthData: ASIBirthData = {
      timestamp: data.timestamp || new Date().toISOString(),
      asiBirthCountdown: data.asiBirthCountdown || data.countdown || 0,
      indexes: {
        tone: data.indexes?.tone ?? (data.tone !== undefined ? data.tone / 100 : 0),
        compute: data.indexes?.compute ?? (data.components !== undefined ? data.components / 100 : 0),
        embodiment: data.indexes?.embodiment ?? (data.infrastructure !== undefined ? data.infrastructure / 100 : 0),
        agency: data.indexes?.agency ?? (data.convergence !== undefined ? data.convergence / 100 : 0),
        hcm: data.indexes?.hcm ?? (data.hcmi !== undefined ? data.hcmi / 100 : 0),
      },
      meta: {
        civilizationType: data.meta?.civilizationType || data.civilization || '萌芽文明',
        hexagram: {
          number: data.meta?.hexagram?.number || data.hexagram?.number || 0,
          name: data.meta?.hexagram?.name || data.hexagram?.name || '',
        },
      },
    };

    return NextResponse.json(birthData);
  } catch (error) {
    console.error('[/api/asi-birth] 錯誤:', error);
    
    // 返回預設數據
    const fallbackData: ASIBirthData = {
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

    return NextResponse.json(fallbackData);
  }
}

