import { NextResponse } from 'next/server';
import { ASIBirthData, NarrativeData } from '@/lib/types';
import { calculateV2Countdown } from '@/lib/v2Countdown';
import { calculateCountdownV25, calculateTechLevel, calculateCivLevel } from '@/lib/calculateCountdownV25';

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
    // 注意：這裡的 indexes 是 0-1 範圍，用於 v2.0 計算
    const indexes = {
      tone: data.indexes?.tone ?? (typeof data.tone === 'number' ? data.tone / 100 : 0),
      compute: data.indexes?.compute ?? (typeof data.components === 'number' ? data.components / 100 : 0),
      embodiment: data.indexes?.embodiment ?? (typeof data.infrastructure === 'number' ? data.infrastructure / 100 : 0),
      agency: data.indexes?.agency ?? (typeof data.convergence === 'number' ? data.convergence / 100 : 0),
      hcm: data.indexes?.hcm ?? (typeof data.hcmi === 'number' ? data.hcmi / 100 : 0.01), // 默認 0.01 而不是 0
    };
    
    // 計算 v2.0 倒數數據（保留兼容）
    const narrative: NarrativeData | undefined = data.narrative ? {
      today: data.narrative.today || 50,
      avg7d: data.narrative.avg7d || 50,
    } : undefined;
    
    const v2 = calculateV2Countdown(indexes, narrative);
    
    // 計算 v2.5 倒數數據（新核心模型）
    const components = typeof data.components === 'number' ? data.components : (indexes.compute * 100);
    const infrastructure = typeof data.infrastructure === 'number' ? data.infrastructure : (indexes.embodiment * 100);
    const convergence = typeof data.convergence === 'number' ? data.convergence : (indexes.agency * 100);
    
    // 修正：確保 hcmi 正確獲取（優先使用原始數據，否則從 indexes 轉換）
    let hcmi: number;
    if (typeof data.hcmi === 'number' && data.hcmi > 0) {
      hcmi = data.hcmi; // 原始數據是 0-100 範圍
    } else if (indexes.hcm > 0) {
      hcmi = indexes.hcm * 100; // 從 0-1 轉換為 0-100
    } else {
      hcmi = 1; // 默認值，避免為 0
    }
    
    console.log('[/api/asi-birth] v2.5 計算 - hcmi:', hcmi, 'indexes.hcm:', indexes.hcm);
    
    const techLevel = calculateTechLevel(components, infrastructure, convergence);
    const civLevel = calculateCivLevel(hcmi);
    console.log('[/api/asi-birth] v2.5 計算 - civLevel:', civLevel, 'techLevel:', techLevel);
    const v25 = calculateCountdownV25(techLevel, civLevel);
    console.log('[/api/asi-birth] v2.5 計算結果:', v25);
    
    const birthData: ASIBirthData = {
      timestamp: data.timestamp || new Date().toISOString(),
      indexes,
      v2,
      v25,
      narrative,
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
    const fallbackIndexes = {
      tone: 0.02,
      compute: 0.51,
      embodiment: 0.5928,
      agency: 0.2882,
      hcm: 0.01,
    };
    const fallbackV2 = calculateV2Countdown(fallbackIndexes);
    
    // 計算 v2.5 fallback 數據
    const fallbackTechLevel = calculateTechLevel(51, 59.28, 28.82);
    const fallbackCivLevel = calculateCivLevel(1);
    const fallbackV25 = calculateCountdownV25(fallbackTechLevel, fallbackCivLevel);
    
    const fallbackData: ASIBirthData = {
      timestamp: new Date().toISOString(),
      indexes: fallbackIndexes,
      v2: fallbackV2,
      v25: fallbackV25,
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

