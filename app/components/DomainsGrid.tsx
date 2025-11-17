'use client';

import { useEffect, useState } from 'react';
import { ReadinessData, DOMAIN_LABELS } from '@/lib/types';
import { fetchReadinessData } from '@/lib/api';

export default function DomainsGrid() {
  const [data, setData] = useState<ReadinessData | null>(null);
  const [animatedValues, setAnimatedValues] = useState<{[key: string]: number}>({});

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
        // 使用預設數據
        const fallbackData = {
          asi_index: 73.2,
          countdown_days: 2424,
          safety_bias: 18.1,
          domains: {
            tone: 66,
            components: 81,
            infrastructure: 72,
            convergence: 54,
            hcmi: 63
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
        <p className="text-text-secondary text-sm leading-relaxed">
          <span className="text-neon-blue font-medium">文明五元素（5D Civilization Model）</span><br />
          ASI 的距離不是技術倒數，而是五股文明力場的收斂速度：<br />
          媒體語氣、<span className="text-text-primary">技術零件</span>、<span className="text-text-primary">基建演化</span>、<br />
          <span className="text-text-primary">跨域整合</span>、心智成熟度
        </p>
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
      </div>
    </div>
  );
}