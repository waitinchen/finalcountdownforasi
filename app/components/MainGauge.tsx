'use client';

import { useEffect, useState } from 'react';
import { ReadinessData } from '@/lib/types';
import { fetchReadinessData, getASIIndexColor } from '@/lib/api';

export default function MainGauge() {
  const [data, setData] = useState<ReadinessData | null>(null);
  const [countdown, setCountdown] = useState(0);
  const [animatedIndex, setAnimatedIndex] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        console.log('開始獲取數據...');
        const readinessData = await fetchReadinessData();
        console.log('數據獲取成功:', readinessData);
        setData(readinessData);
        
        // 動畫倒數
        animateNumber(0, readinessData.countdown_days, 2000, setCountdown);
        animateNumber(0, readinessData.asi_index, 2000, setAnimatedIndex);
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
        animateNumber(0, fallbackData.asi_index, 2000, setAnimatedIndex);
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
      <div className="bg-black/30 border border-neon-blue/20 rounded-2xl p-8 backdrop-blur-lg">
        <div className="text-center text-neon-blue">
          <div className="animate-pulse">載入中...</div>
        </div>
      </div>
    );
  }

  const getProgressColor = (index: number) => {
    if (index <= 40) return 'from-green-400 to-green-600';
    if (index <= 70) return 'from-yellow-400 to-yellow-600';
    return 'from-red-400 to-red-600';
  };

  return (
    <div className="bg-black/30 border border-neon-blue/20 rounded-2xl p-8 backdrop-blur-lg h-full w-full flex flex-col">
      <h2 className="text-xl font-light text-neon-blue mb-8 tracking-wide uppercase text-center">
        ASI 文明成熟度
      </h2>
      
      <div className="flex-1 flex flex-col justify-between">
        {/* ASI 指數顯示 */}
        <div className="text-center mb-8">
          <div className={`text-6xl font-thin ${getASIIndexColor(animatedIndex)} mb-2 transition-colors duration-1000`}>
            {animatedIndex}
            <span className="text-2xl text-text-muted ml-1">%</span>
          </div>
          <div className="text-text-secondary text-sm tracking-widest">
            ASI READINESS INDEX
          </div>
        </div>

        {/* 倒數天數 */}
        <div className="text-center mb-8">
          <div className="text-8xl font-thin text-neon-blue mb-4 leading-none">
            {countdown.toLocaleString()}
          </div>
          <div className="text-text-secondary text-lg tracking-widest">
            天
          </div>
          <div className="text-text-muted text-sm mt-2">
            距離 ASI 降臨預計還有
          </div>
        </div>

        {/* 安全偏移 */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-neon-blue/10 rounded-lg border border-neon-blue/30">
            <span className="text-text-secondary text-sm">Safety Bias</span>
            <span className="text-neon-blue font-medium">
              +{data.safety_bias.toFixed(1)}
            </span>
          </div>
          <div className="text-text-muted text-xs mt-1">
            Components - HCMI
          </div>
        </div>

        {/* 進度條 */}
        <div className="space-y-4">
          <div className="relative h-10 bg-black/50 rounded-xl border border-neon-blue/20 overflow-hidden">
            <div 
              className={`h-full bg-gradient-to-r ${getProgressColor(animatedIndex)} rounded-xl transition-all duration-2000 ease-out relative`}
              style={{ width: `${animatedIndex}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
            </div>
            <div className="absolute inset-0 flex items-center justify-between px-4 text-text-secondary text-sm">
              <span>前 ASI 時代</span>
              <span className="font-medium">{animatedIndex}%</span>
              <span>ASI 降臨</span>
            </div>
          </div>
          
          <div className="flex justify-between text-xs text-text-muted">
            <span>0</span>
            <span className="text-warning-yellow">警戒</span>
            <span>100</span>
          </div>
        </div>
      </div>
    </div>
  );
}