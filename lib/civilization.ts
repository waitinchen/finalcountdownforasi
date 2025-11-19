// 文明狀態計算函數
import { ReadinessData } from './types';
import { CivilizationCode } from '@/app/components/CivilizationStatusCard';

/**
 * 根據數據計算文明狀態
 * 基於 Tech Index、Heart Index、Readiness Index 和 Balance Index
 */
export function calculateCivilizationCode(data: ReadinessData): CivilizationCode {
  const { domains, balance_index, five_element_maturity } = data;
  const { tone, components, infrastructure, convergence, hcmi } = domains;
  
  // 計算 Tech Index（術指數）
  const techIndex = 0.40 * components + 0.35 * infrastructure + 0.25 * convergence;
  
  // 計算 Heart Index（心指數）
  const heartIndex = 0.60 * hcmi + 0.40 * tone;
  
  // 計算 Readiness Index（文明成熟度）
  const readinessIndex = (techIndex * heartIndex) / 100;
  
  // 計算 Balance Index（平衡指數）
  const gap = Math.abs(techIndex - heartIndex);
  const normGap = Math.min(gap / 50, 1);
  const balanceIndex = (1 - normGap) * 100;
  
  // 判斷文明狀態
  // 基礎文明：Readiness < 20
  if (readinessIndex < 20) {
    return "basic";
  }
  
  // 黃金文明：Readiness >= 80 且 Balance >= 80
  if (readinessIndex >= 80 && balanceIndex >= 80) {
    return "golden";
  }
  
  // 暴衝文明：Tech 遠大於 Heart（Safety Bias > 20）
  if (techIndex - heartIndex > 20) {
    return "runaway";
  }
  
  // 心靈文明：Heart 遠大於 Tech（Safety Bias < -20）且 Readiness >= 40
  if (heartIndex - techIndex > 20 && readinessIndex >= 40) {
    return "heart";
  }
  
  // 萌芽文明：其他情況（20 <= Readiness < 80）
  return "seed";
}


