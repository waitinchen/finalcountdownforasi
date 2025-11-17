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
    // 回退到預設標語
    return [
      { timestamp: new Date().toISOString(), slogan: '「文明的心已經追上技術的腳步。」' },
      { timestamp: new Date().toISOString(), slogan: '「基建與技術正同步加速。」' },
      { timestamp: new Date().toISOString(), slogan: '「這不是預測，是文明壓力的敘事量化。」' },
    ];
  }
}

