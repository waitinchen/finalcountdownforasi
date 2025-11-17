// Google Sheet 數據讀取工具函式
// 符合 C謀資料供應標準協議 v1.0

const SHEET_ID = process.env.GOOGLE_SHEET_ID || '17UHgrjvnJZNq4cgZSg1MbStafDOoeeJh8__ZRYZeSnI';

// Google Apps Script Web App API 端點
const GAS_API_BASE = process.env.GAS_API_URL || 'https://script.google.com/macros/s/AKfycbzOBxfctJg1qvrsTJNgYLrr8hM760uiydjEbZ_uRi13FYQoSH9umasIxah8724WByX6nw/exec';

// 文明五元素數據結構
export interface CivilizationData {
  timestamp: string;
  components: number;
  tone: number;
  convergence: number;
  infrastructure: number;
  hcmi: number;
  asi: number;
}

// 語氣標語數據結構
export interface SloganData {
  timestamp: string;
  slogan: string;
}

/**
 * 獲取 CSV 公開連結 URL
 */
export function getCSVUrl(sheetName: string): string {
  return `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(sheetName)}`;
}

/**
 * 解析 CSV 文本為對象數組
 */
export function parseCSV(csvText: string): any[] {
  const lines = csvText.trim().split('\n');
  if (lines.length < 2) return [];
  
  // 解析標題行
  const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
  
  // 解析數據行
  return lines.slice(1).map(line => {
    // 處理包含逗號的字段（用引號包裹）
    const values: string[] = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    values.push(current.trim()); // 最後一個值
    
    return headers.reduce((obj, header, i) => {
      const rawValue = values[i]?.replace(/^"|"$/g, '') || '';
      
      // 嘗試轉換為數字
      if (header !== 'timestamp' && header !== 'slogan') {
        const numValue = parseFloat(rawValue);
        if (!isNaN(numValue)) {
          obj[header] = numValue;
        } else {
          obj[header] = rawValue;
        }
      } else {
        obj[header] = rawValue;
      }
      
      return obj;
    }, {} as any);
  });
}

/**
 * 從 Google Apps Script API 讀取文明五元素數據（優先方法）
 */
export async function fetchCivilizationData(): Promise<CivilizationData[]> {
  try {
    // 優先使用 Apps Script API
    const apiUrl = `${GAS_API_BASE}?type=five`;
    console.log('fetchCivilizationData: 請求 Apps Script API:', apiUrl);
    
    const response = await fetch(apiUrl, {
      cache: 'no-store',
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('fetchCivilizationData: API 響應:', data);
    
    // 轉換為 CivilizationData 格式
    const civData: CivilizationData = {
      timestamp: data.timestamp || new Date().toISOString(),
      components: parseFloat(data.components) || 0,
      tone: parseFloat(data.tone) || 0,
      convergence: parseFloat(data.convergence) || 0,
      infrastructure: parseFloat(data.infrastructure) || 0,
      hcmi: parseFloat(data.hcmi) || 0,
      asi: parseFloat(data.asi) || 0,
    };
    
    return [civData];
  } catch (error) {
    console.error('fetchCivilizationData (Apps Script API) 錯誤:', error);
    // 回退到 CSV 方法
    try {
      const csvUrl = getCSVUrl('工作表1');
      console.log('fetchCivilizationData: 回退到 CSV URL:', csvUrl);
      
      const response = await fetch(csvUrl, {
        cache: 'no-store',
        headers: {
          'Accept': 'text/csv',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const csvText = await response.text();
      const rows = parseCSV(csvText);
      
      // 轉換為 CivilizationData 格式
      return rows.map(row => {
        // 處理不同的欄位名稱格式
        const getValue = (key: string) => {
          return row[key] || row[key.toLowerCase()] || row[key.toUpperCase()] || '';
        };
        
        return {
          timestamp: getValue('timestamp') || '',
          components: parseFloat(getValue('components') || '0'),
          tone: parseFloat(getValue('tone') || '0'),
          convergence: parseFloat(getValue('convergence') || '0'),
          infrastructure: parseFloat(getValue('infrastructure') || '0'),
          hcmi: parseFloat(getValue('hcmi') || '0'),
          asi: parseFloat(getValue('asi') || '0'),
        };
      }).filter(row => row.timestamp && !isNaN(row.components)); // 過濾空行和無效數據
    } catch (csvError) {
      console.error('fetchCivilizationData (CSV fallback) 錯誤:', csvError);
      throw error; // 拋出原始錯誤
    }
  }
}

/**
 * 獲取最新的文明五元素數據（最後一筆）
 */
export async function fetchLatestCivilizationData(): Promise<CivilizationData | null> {
  try {
    const data = await fetchCivilizationData();
    return data.length > 0 ? data[data.length - 1] : null;
  } catch (error) {
    console.error('fetchLatestCivilizationData 錯誤:', error);
    return null;
  }
}

/**
 * 從 Google Apps Script API 讀取語氣標語（優先方法）
 */
export async function fetchSlogans(count: number = 12): Promise<SloganData[]> {
  try {
    // 優先使用 Apps Script API
    const apiUrl = `${GAS_API_BASE}?type=slogans`;
    console.log('fetchSlogans: 請求 Apps Script API:', apiUrl);
    
    const response = await fetch(apiUrl, {
      cache: 'no-store',
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('fetchSlogans: API 響應，標語數量:', data.slogans?.length || 0);
    
    // 轉換為 SloganData 格式
    const slogans: SloganData[] = (data.slogans || []).map((slogan: string, index: number) => ({
      timestamp: new Date().toISOString(), // API 沒有提供 timestamp，使用當前時間
      slogan: slogan || '',
    })).filter((item: SloganData) => item.slogan); // 過濾空標語
    
    // 返回最近 count 筆
    return slogans.slice(-count);
  } catch (error) {
    console.error('fetchSlogans (Apps Script API) 錯誤:', error);
    // 回退到 CSV 方法
    try {
      const csvUrl = getCSVUrl('語氣標語');
      console.log('fetchSlogans: 回退到 CSV URL:', csvUrl);
      
      const response = await fetch(csvUrl, {
        cache: 'no-store',
        headers: {
          'Accept': 'text/csv',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const csvText = await response.text();
      const rows = parseCSV(csvText);
      
      // 轉換為 SloganData 格式
      const slogans = rows.map(row => {
        const getValue = (key: string) => {
          return row[key] || row[key.toLowerCase()] || row[key.toUpperCase()] || '';
        };
        
        return {
          timestamp: getValue('timestamp') || '',
          slogan: getValue('slogan') || '',
        };
      }).filter(row => row.slogan && row.timestamp); // 過濾空行
      
      // 返回最近 count 筆
      return slogans.slice(-count);
    } catch (csvError) {
      console.error('fetchSlogans (CSV fallback) 錯誤:', csvError);
      // 最終回退到預設標語（10則）
      const defaultSlogans: SloganData[] = [
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
      return defaultSlogans.slice(-count);
    }
  }
}

/**
 * 使用 Google Sheet API 讀取數據（方法A：官方API，需要 API Key）
 */
export async function fetchCivilizationDataViaAPI(): Promise<CivilizationData[]> {
  const API_KEY = process.env.GOOGLE_API_KEY;
  if (!API_KEY) {
    throw new Error('GOOGLE_API_KEY 未配置');
  }
  
  try {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/工作表1?key=${API_KEY}`;
    const response = await fetch(url, { cache: 'no-store' });
    
    if (!response.ok) {
      throw new Error(`Google Sheet API error: ${response.status}`);
    }
    
    const data = await response.json();
    const rows = data.values || [];
    
    if (rows.length < 2) return [];
    
    const headers = rows[0];
    return rows.slice(1).map((row: any[]) => {
      const obj: any = {};
      headers.forEach((header: string, i: number) => {
        const value = row[i] || '';
        if (header !== 'timestamp' && header !== 'slogan') {
          obj[header] = parseFloat(value) || 0;
        } else {
          obj[header] = value;
        }
      });
      return obj as CivilizationData;
    });
  } catch (error) {
    console.error('fetchCivilizationDataViaAPI 錯誤:', error);
    throw error;
  }
}

