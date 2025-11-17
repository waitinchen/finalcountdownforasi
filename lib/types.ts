// API 資料結構定義
export interface ReadinessData {
  asi_index: number;
  countdown_days: number;
  safety_bias: number;
  domains: {
    tone: number;
    components: number;
    infrastructure: number;
    convergence: number;
    hcmi: number;
  };
  last_updated: string;
}

// 領域標籤映射
export const DOMAIN_LABELS = {
  tone: '媒體語氣',
  components: '技術零件',
  infrastructure: '基建演化',
  convergence: '跨域整合',
  hcmi: '心智成熟度'
} as const;

// 領域英文標籤（用於雷達圖）
export const DOMAIN_ENGLISH_LABELS = {
  tone: 'Tone',
  components: 'Components',
  infrastructure: 'Infrastructure',
  convergence: 'Convergence',
  hcmi: 'HCMI'
} as const;