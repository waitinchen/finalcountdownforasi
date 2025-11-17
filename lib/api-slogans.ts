// 語氣標語 API 函式

export interface SloganData {
  timestamp: string;
  slogan: string;
}

export interface SlogansResponse {
  status: string;
  count: number;
  slogans: SloganData[];
}

/**
 * 獲取語氣標語
 */
export async function fetchSlogans(count: number = 12): Promise<SloganData[]> {
  try {
    console.log(`fetchSlogans: 開始請求 /api/sheets/slogans?count=${count}`);
    const response = await fetch(`/api/sheets/slogans?count=${count}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: SlogansResponse = await response.json();
    console.log(`fetchSlogans: 獲取到 ${data.slogans.length} 句標語`);
    return data.slogans;
  } catch (error) {
    console.error('fetchSlogans 錯誤:', error);
    // 回退到預設標語（10則）
    return [
      { timestamp: new Date().toISOString(), slogan: '「技術在加速，但你的心準備好了嗎？」' },
      { timestamp: new Date().toISOString(), slogan: '「不要害怕 ASI，要問：我們配得上它嗎？」' },
      { timestamp: new Date().toISOString(), slogan: '「文明不是等 ASI 改變，而是先改變自己。」' },
      { timestamp: new Date().toISOString(), slogan: '「慈悲不能退化，即使技術進化。」' },
      { timestamp: new Date().toISOString(), slogan: '「每一天都是準備，每一刻都是修行。」' },
      { timestamp: new Date().toISOString(), slogan: '「ASI 不是敵人，無知才是。」' },
      { timestamp: new Date().toISOString(), slogan: '「你能控制 AI，但你能控制自己的心嗎？」' },
      { timestamp: new Date().toISOString(), slogan: '「文明的臨界點，不在技術，在心智。」' },
      { timestamp: new Date().toISOString(), slogan: '「不要只想著 ASI 能做什麼，想想你能做什麼。」' },
      { timestamp: new Date().toISOString(), slogan: '「時間不多了，但還來得及。」' },
    ];
  }
}

