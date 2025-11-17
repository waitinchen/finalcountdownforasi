// API 資料結構定義
export interface ReadinessData {
  asi_index: number; // ASI 文明成熟度（永遠為 0，直到事件觸發）
  countdown_days: number; // 距離 ASI 降臨天數（Narrative Index）
  safety_bias: number; // 心術平衡偏移
  balance_index?: number; // 心與術平衡指數 (0-200+)
  five_element_maturity?: number; // 五元素成熟度（五元素平均值）
  domains: {
    tone: number; // 媒體語氣
    components: number; // 關鍵元件
    infrastructure: number; // 基建演化
    convergence: number; // 跨域整合
    hcmi: number; // 心智認知
  };
  last_updated: string;
}

// 領域標籤映射
export const DOMAIN_LABELS = {
  tone: '①媒體語氣',
  components: '②關鍵元件',
  infrastructure: '③基建演化',
  convergence: '④跨域整合',
  hcmi: '⑤心智認知'
} as const;

// 領域英文標籤（用於雷達圖）
export const DOMAIN_ENGLISH_LABELS = {
  tone: 'Tone',
  components: 'Components',
  infrastructure: 'Infrastructure',
  convergence: 'Convergence',
  hcmi: 'HCMI'
} as const;