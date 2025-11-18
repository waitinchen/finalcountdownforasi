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
 * 判斷順序：
 * 1. 暴衝文明：Tech 遠大於 Heart（差距 > 20）
 * 2. 心靈文明：Heart 遠大於 Tech（差距 > 20）且 Readiness >= 40
 * 3. 基礎文明：Readiness < 20
 * 4. 黃金文明：Readiness >= 80 且 Balance >= 80
 * 5. 萌芽文明：其他情況
 */
export function calculateCivilizationFromData(data: CivilizationData): string {
  const { tech, heart, readiness, balance } = data;
  
  const techHeartGap = tech - heart;
  
  // 1. 暴衝文明：Tech 遠大於 Heart（差距 > 20）
  if (techHeartGap > 20) {
    return CIVILIZATION_LABELS.runaway;
  }
  
  // 2. 心靈文明：Heart 遠大於 Tech（差距 > 20）且 Readiness >= 40
  if (techHeartGap < -20 && readiness >= 40) {
    return CIVILIZATION_LABELS.heart;
  }
  
  // 3. 基礎文明：Readiness < 20
  if (readiness < 20) {
    return CIVILIZATION_LABELS.basic;
  }
  
  // 4. 黃金文明：Readiness >= 80 且 Balance >= 80
  if (readiness >= 80 && balance >= 80) {
    return CIVILIZATION_LABELS.golden;
  }
  
  // 5. 萌芽文明：其他情況（20 <= Readiness < 80，且 Tech 和 Heart 差距不大）
  return CIVILIZATION_LABELS.seed;
}

