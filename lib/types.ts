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

// 新的後端API數據結構
export interface HexagramData {
  number: number; // 卦序
  name: string; // 卦名
  fullName: string; // 完整卦名
  symbol: string; // 卦象符號（如 ䷎）
  judgment: string; // 卦辭
  meaning: string; // 文明解讀
  yao: number[]; // 六爻 [0,1,1,1,0,0] (0=陰, 1=陽)
}

// ASI 出生監測儀表板 - 新的五軸數據結構
export interface ASIBirthIndexes {
  tone: number; // 環境氛圍指數 (0-1)
  compute: number; // 認知能力指數 (0-1)
  embodiment: number; // 具身條件指數 (0-1)
  agency: number; // 自主程度指數 (0-1)
  hcm: number; // 心理共鳴指數 (0-1)
}

export interface CountdownData {
  readyScore: number; // 文明成熟度 (0-1)
  scienceYears: number; // 科學模型年數
  fastYears: number; // 加速模型年數
  scienceDays: number; // 科學模型天數
  fastDays: number; // 加速模型天數
}

export interface ASIBirthData {
  timestamp: string;
  indexes: ASIBirthIndexes; // 五軸指數
  countdown: CountdownData; // 倒數數據（v1.1 新格式）
  meta: {
    civilizationType: string; // 文明類型（如 "暴衝文明"）
    hexagram: {
      number: number;
      name: string;
    };
  };
  // 兼容舊格式
  asiBirthCountdown?: number; // 舊版倒數天數（已棄用）
}

// 兼容舊的數據結構（用於過渡期）
export interface CivilizationData {
  timestamp: string;
  components: number;
  infrastructure: number;
  convergence: number;
  tone: number;
  hcmi?: number; // 可選
  tech: number; // Tech Index
  heart: number; // Heart Index
  readiness: number; // Readiness Index
  balance: number; // Balance Index
  safetyBias: number; // Safety Bias
  countdown: number; // Countdown Days
  civilization: string; // 文明類型（如 "心靈文明"）
  hexagram: HexagramData; // 易經卦象
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