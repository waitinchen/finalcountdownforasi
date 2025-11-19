// ASI Countdown Dashboard v2.5 計算模組
// 技術倒數 = 線性模型
// 文明倒數 = S-curve 模型

export interface V25CountdownData {
  tech: {
    level: number; // TechLevel (0-1)
    years: number; // TechYears
    days: number; // TechDays
  };
  civilization: {
    level: number; // CivLevel (0-1)
    years: number; // CivYears
    days: number; // CivDays
  };
}

/**
 * 計算 v2.5 倒數數據
 * 
 * 技術倒數（線性模型）：
 * TechYears = (1 - TechLevel) * 30
 * 
 * 文明倒數（S-curve 模型）：
 * CivYears = (1 / (0.4 + CivLevel)) * 20
 */
export function calculateCountdownV25(
  techLevel: number,
  civLevel: number
): V25CountdownData {
  // 確保輸入在有效範圍內
  techLevel = Math.max(0, Math.min(1, techLevel));
  civLevel = Math.max(0, Math.min(1, civLevel));

  // -----------------------
  // A. Tech Convergence (線性模型)
  // -----------------------
  const techYears = (1 - techLevel) * 30;
  const techDays = Math.round(techYears * 365);

  // -----------------------
  // B. Civilization Readiness (S-curve 模型)
  // -----------------------
  const civYears = (1 / (0.4 + civLevel)) * 20;
  const civDays = Math.round(civYears * 365);

  return {
    tech: {
      level: techLevel,
      years: techYears,
      days: techDays,
    },
    civilization: {
      level: civLevel,
      years: civYears,
      days: civDays,
    },
  };
}

/**
 * 從五軸數據計算 TechLevel
 * TechLevel = (components + infrastructure + convergence) / 300
 */
export function calculateTechLevel(
  components: number,
  infrastructure: number,
  convergence: number
): number {
  return (components + infrastructure + convergence) / 300;
}

/**
 * 從五軸數據計算 CivLevel
 * CivLevel = hcmi / 100
 */
export function calculateCivLevel(hcmi: number): number {
  return hcmi / 100;
}


