'use client';

import { useEffect, useState } from 'react';
import { ReadinessData, DOMAIN_LABELS } from '@/lib/types';
import { fetchReadinessData } from '@/lib/api';
import BalanceGauge from './BalanceGauge';

export default function DomainsGrid() {
  const [data, setData] = useState<ReadinessData | null>(null);
  const [animatedValues, setAnimatedValues] = useState<{[key: string]: number}>({});
  const [timeUntilUpdate, setTimeUntilUpdate] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const loadData = async () => {
      try {
        console.log('DomainsGrid: 開始獲取數據...');
        const readinessData = await fetchReadinessData();
        console.log('DomainsGrid: 數據獲取成功:', readinessData);
        setData(readinessData);
        
        // 動畫各個分數
        Object.entries(readinessData.domains).forEach(([key, value]) => {
          animateValue(0, value, 1500, (animated) => {
            setAnimatedValues(prev => ({ ...prev, [key]: animated }));
          });
        });
      } catch (error) {
        console.error('DomainsGrid: 獲取數據失敗:', error);
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
        Object.entries(fallbackData.domains).forEach(([key, value]) => {
          animateValue(0, value, 1500, (animated) => {
            setAnimatedValues(prev => ({ ...prev, [key]: animated }));
          });
        });
      }
    };

    loadData();
  }, []);

  // 計算距離下一次數據更新的時間
  useEffect(() => {
    const calculateTimeUntilUpdate = () => {
      const now = new Date();
      const currentHour = now.getHours();

      // 更新時間點：00:00, 06:00, 12:00, 18:00
      const updateHours = [0, 6, 12, 18];
      
      // 找到下一個更新時間
      let nextUpdateHour = updateHours.find(hour => hour > currentHour);
      let nextUpdateDate = new Date(now);
      
      if (!nextUpdateHour) {
        // 如果已經過了今天的所有更新時間，使用明天的第一個更新時間（00:00）
        nextUpdateDate.setDate(nextUpdateDate.getDate() + 1);
        nextUpdateHour = 0;
      }
      
      nextUpdateDate.setHours(nextUpdateHour, 0, 0, 0);
      
      // 計算時間差
      const diff = Math.max(0, nextUpdateDate.getTime() - now.getTime());
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setTimeUntilUpdate({ hours, minutes, seconds });
    };

    // 立即計算一次
    calculateTimeUntilUpdate();
    
    // 每秒更新一次
    const interval = setInterval(calculateTimeUntilUpdate, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const animateValue = (
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

  if (!data) return <div>Loading...</div>;

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getBarColor = (score: number) => {
    if (score >= 80) return 'from-green-400 to-green-600';
    if (score >= 60) return 'from-yellow-400 to-yellow-600';
    return 'from-red-400 to-red-600';
  };

  return (
    <div className="bg-black/30 border border-neon-blue/20 rounded-2xl p-8 backdrop-blur-lg">
      <h2 className="text-xl font-light text-neon-blue mb-6 tracking-wide uppercase text-center">
        文明五元素
      </h2>
      
      <div className="mb-6 text-center">
        <p className="text-text-secondary text-sm leading-relaxed mb-4">
          <span className="text-neon-blue font-medium">文明五元素（5D Civilization Model）</span>
        </p>
        <div className="bg-black/30 border border-neon-blue/20 rounded-lg p-4 backdrop-blur-sm">
          <p className="text-text-primary text-sm mb-2">
            距離下一次 數據更新 還有
          </p>
          <div className="flex items-center justify-center gap-2 text-neon-blue">
            <span className="text-2xl font-thin tabular-nums">
              {String(timeUntilUpdate.hours).padStart(2, '0')}
            </span>
            <span className="text-text-secondary">小時</span>
            <span className="text-2xl font-thin tabular-nums">
              {String(timeUntilUpdate.minutes).padStart(2, '0')}
            </span>
            <span className="text-text-secondary">分</span>
            <span className="text-2xl font-thin tabular-nums">
              {String(timeUntilUpdate.seconds).padStart(2, '0')}
            </span>
            <span className="text-text-secondary">秒</span>
          </div>
          <p className="text-text-muted text-xs mt-2">
            (00:00、06:00、12:00、18:00 更新一次數據)
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(data.domains).map(([key, value]) => {
          const animatedValue = animatedValues[key] || 0;
          return (
            <div
              key={key}
              className="bg-black/30 border border-neon-blue/20 rounded-xl p-6 backdrop-blur-sm hover:border-neon-blue/50 hover:-translate-y-1 hover:shadow-lg hover:shadow-neon-blue/20 transition-all duration-300 group"
            >
              <div className="text-text-secondary text-sm mb-2 tracking-wide">
                {DOMAIN_LABELS[key as keyof typeof DOMAIN_LABELS]}
              </div>
              
              <div className={`text-3xl font-thin mb-3 ${getScoreColor(animatedValue)} group-hover:scale-105 transition-transform duration-300`}>
                {animatedValue}
                <span className="text-lg text-text-muted ml-1">分</span>
              </div>
              
              <div className="h-1 bg-neon-blue/10 rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r ${getBarColor(animatedValue)} rounded-full transition-all duration-1500 ease-out`}
                  style={{ width: `${animatedValue}%` }}
                />
              </div>
              
              <div className="text-xs text-text-muted mt-2">
                {new Date(data.last_updated).toLocaleDateString('zh-TW')}
              </div>
            </div>
          );
        })}
        
        {/* 第六個位置：心與術平衡指數儀表盤 */}
        {data.balance_index !== undefined && (
          <BalanceGauge value={data.balance_index} />
        )}
      </div>
    </div>
  );
}