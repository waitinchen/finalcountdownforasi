// ASI Countdown Dashboard v2.0 計算模組
import { ASIBirthIndexes, V2CountdownData, NarrativeData } from './types';

// 基準天數
const TECH_BASE_DAYS = 100000; // 技術倒數基準
const SAFETY_BASE_DAYS = 50000; // 安全倒數基準

/**
 * 計算 Narrative Stability（敘事穩定性）
 * N = 100 - |N_today - N_avg7d|
 */
export function calculateNarrativeStability(narrative?: NarrativeData): number {
  if (!narrative) {
    // 如果沒有提供敘事數據，使用默認值（可根據實際情況調整）
    return 75; // 默認中等穩定性
  }
  
  const { today, avg7d } = narrative;
  const stability = 100 - Math.abs(today - avg7d);
  return Math.max(0, Math.min(100, stability)); // 限制在 0-100
}

/**
 * 計算 Tech Convergence Level (TCL)
 * TCL = 0.4 × Cognitive + 0.4 × Embodiment + 0.2 × Agency
 */
export function calculateTCL(indexes: ASIBirthIndexes): number {
  const { compute: cognitive, embodiment, agency } = indexes;
  const tcl = 0.4 * (cognitive * 100) + 0.4 * (embodiment * 100) + 0.2 * (agency * 100);
  return Math.max(0, Math.min(100, tcl));
}

/**
 * 計算 Tech Convergence Countdown (TCC)
 * TCC = TechBaseDays × (1 - TCL/100)
 */
export function calculateTCC(tcl: number): number {
  return Math.round(TECH_BASE_DAYS * (1 - tcl / 100));
}

/**
 * 計算 Civilization Readiness Level (CRL)
 * CRL = 0.4 × HCM + 0.3 × Tone + 0.3 × Narrative Stability
 */
export function calculateCRL(
  indexes: ASIBirthIndexes,
  narrativeStability: number
): number {
  const { hcm, tone } = indexes;
  const crl = 0.4 * (hcm * 100) + 0.3 * (tone * 100) + 0.3 * narrativeStability;
  return Math.max(0, Math.min(100, crl));
}

/**
 * 計算 Civilization Readiness Countdown (CRC)
 * CRC = SafetyBaseDays × (1 - CRL/100)
 */
export function calculateCRC(crl: number): number {
  return Math.round(SAFETY_BASE_DAYS * (1 - crl / 100));
}

/**
 * 計算 Risk Delta 和 Risk Level
 * RiskDelta = TCC - CRC
 * 
 * 邏輯說明：
 * - 如果 TCC < CRC（技術倒數 < 文明倒數）→ 技術更快到達 → 危險（Crash）
 * - 如果 TCC > CRC（技術倒數 > 文明倒數）→ 文明更快準備好 → 安全（Safe）
 */
export function calculateRiskDelta(tcc: number, crc: number): {
  riskDelta: number;
  riskLevel: 'Safe' | 'Tense' | 'Crash';
} {
  const riskDelta = tcc - crc;
  
  let riskLevel: 'Safe' | 'Tense' | 'Crash';
  if (riskDelta > 0) {
    // 技術倒數 > 文明倒數 → 文明超前技術 → 安全
    riskLevel = 'Safe';
  } else if (Math.abs(riskDelta) < 500) {
    // 接近交會期（差距 < 500 天）
    riskLevel = 'Tense';
  } else {
    // 技術倒數 < 文明倒數 → 技術超前文明太多 → 危險
    riskLevel = 'Crash';
  }
  
  return { riskDelta, riskLevel };
}

/**
 * 計算完整的 v2.0 倒數數據
 */
export function calculateV2Countdown(
  indexes: ASIBirthIndexes,
  narrative?: NarrativeData
): V2CountdownData {
  // 1. 計算 Narrative Stability
  const narrativeStability = calculateNarrativeStability(narrative);
  
  // 2. 計算 TCL 和 TCC
  const TCL = calculateTCL(indexes);
  const TCC_days = calculateTCC(TCL);
  
  // 3. 計算 CRL 和 CRC
  const CRL = calculateCRL(indexes, narrativeStability);
  const CRC_days = calculateCRC(CRL);
  
  // 4. 計算 Risk Delta
  const { riskDelta, riskLevel } = calculateRiskDelta(TCC_days, CRC_days);
  
  return {
    TCL,
    TCC_days,
    CRL,
    CRC_days,
    RiskDelta: riskDelta,
    RiskLevel: riskLevel,
    narrativeStability,
  };
}

