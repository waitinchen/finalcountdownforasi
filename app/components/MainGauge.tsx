'use client';

import { useEffect, useState } from 'react';
import { ReadinessData } from '@/lib/types';
import { fetchReadinessData } from '@/lib/api';
import { calculateCivilizationCode } from '@/lib/civilization';
import CivilizationStatusCard from './CivilizationStatusCard';

export default function MainGauge() {
  const [data, setData] = useState<ReadinessData | null>(null);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        console.log('開始獲取數據...');
        const readinessData = await fetchReadinessData();
        console.log('數據獲取成功:', readinessData);
        setData(readinessData);
        
        // 動畫倒數
        animateNumber(0, readinessData.countdown_days, 2000, setCountdown);
      } catch (error) {
        console.error('獲取數據失敗:', error);
        // 使用預設數據（使用技術指引中的範例數據）
        const tone = 10;
        const components = 57;
        const infrastructure = 57;
        const convergence = 119;
        const hcmi = 97;
        
        const avgTech = (tone + components + infrastructure + convergence) / 4;
        const asiMaturity = (tone + components + infrastructure + convergence + hcmi) / 5;
        const balanceIndex = (hcmi / avgTech) * 100;
        const daysLeft = Math.round((100 - avgTech) * 1024);
        
        const fallbackData = {
          asi_index: 0,
          countdown_days: daysLeft,
          safety_bias: balanceIndex - 100,
          balance_index: parseFloat(balanceIndex.toFixed(2)), // 保留小數後2位
          five_element_maturity: Math.round(asiMaturity * 10) / 10,
          domains: {
            tone: tone,
            components: components,
            infrastructure: infrastructure,
            convergence: convergence,
            hcmi: hcmi
          },
          last_updated: new Date().toISOString()
        };
        setData(fallbackData);
        animateNumber(0, fallbackData.countdown_days, 2000, setCountdown);
      }
    };

    loadData();
  }, []);

  const animateNumber = (
    start: number,
    end: number,
    duration: number,
    setter: (value: number) => void
  ) => {
    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current = start + (end - start) * easeOutCubic(progress);
      
      setter(Math.floor(current));
      
      if (progress >= 1) {
        clearInterval(timer);
        setter(end);
      }
    }, 16);
  };

  const easeOutCubic = (t: number): number => {
    return 1 - Math.pow(1 - t, 3);
  };

  if (!data) {
    return (
      <div className="bg-black/30 border border-neon-blue/20 rounded-2xl p-8 backdrop-blur-lg h-full w-full flex flex-col items-center justify-center min-h-[500px]">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-2 border-neon-blue border-t-transparent rounded-full animate-spin mb-4"></div>
          <div className="text-neon-blue text-sm font-light">載入數據中...</div>
        </div>
      </div>
    );
  }

  // 計算文明狀態
  const civilizationCode = calculateCivilizationCode(data);

  return (
    <CivilizationStatusCard
      civilization={civilizationCode}
      countdownDays={countdown}
    />
  );
}