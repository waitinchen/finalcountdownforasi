// 從 CivilizationData 計算文明狀態
import { CivilizationData } from './types';

const CIVILIZATION_LABELS: Record<string, string> = {
  basic: '基礎文明',
  seed: '萌芽文明',
  runaway: '暴衝文明',
  heart: '心靈文明',
  golden: '黃金文明',
};

/**
 * 根據 CivilizationData 計算文明狀態
 * 判斷邏輯：
 * 1. 黃金文明：Readiness >= 80 且 Balance >= 80
 * 2. 心靈文明：Heart 遠大於 Tech（差距 > 20）且 Readiness >= 40
 * 3. 暴衝文明：Tech 遠大於 Heart（差距 > 20）且 Readiness >= 20
 * 4. 基礎文明：Readiness < 20 且 Tech 和 Heart 都很低
 * 5. 萌芽文明：其他情況（心沒有追上術，但 Readiness < 20 或差距不大）
 */
export function calculateCivilizationFromData(data: CivilizationData): string {
  const { tech, heart, readiness, balance } = data;
  
  const techHeartGap = tech - heart;
  
  // 1. 黃金文明：Readiness >= 80 且 Balance >= 80
  if (readiness >= 80 && balance >= 80) {
    return CIVILIZATION_LABELS.golden;
  }
  
  // 2. 心靈文明：Heart 遠大於 Tech（差距 > 20）且 Readiness >= 40
  if (techHeartGap < -20 && readiness >= 40) {
    return CIVILIZATION_LABELS.heart;
  }
  
  // 3. 暴衝文明：Tech 遠大於 Heart（差距 > 20）且 Readiness >= 20
  // 只有在 Readiness 較高時，才判斷為暴衝文明
  if (techHeartGap > 20 && readiness >= 20) {
    return CIVILIZATION_LABELS.runaway;
  }
  
  // 4. 基礎文明：Readiness < 20 且 Tech 和 Heart 都很低（都 < 30）
  if (readiness < 20 && tech < 30 && heart < 30) {
    return CIVILIZATION_LABELS.basic;
  }
  
  // 5. 萌芽文明：其他情況
  // - Readiness < 20 但 Tech 或 Heart 有一個較高 → 萌芽文明（心沒有追上術）
  // - 20 <= Readiness < 80 且 Tech 和 Heart 差距不大 → 萌芽文明
  return CIVILIZATION_LABELS.seed;
}

