'use client';

import { useEffect, useState } from 'react';
import { V2CountdownData, V25CountdownData } from '@/lib/types';

interface V2CountdownPanelsProps {
  v2Data?: V2CountdownData;
  v25Data?: V25CountdownData;
}

export default function V2CountdownPanels({ v2Data, v25Data }: V2CountdownPanelsProps) {
  // 優先使用 v2.5 數據，否則使用 v2.0 數據
  const useV25 = !!v25Data;
  
  const [animatedTechDays, setAnimatedTechDays] = useState(0);
  const [animatedCivDays, setAnimatedCivDays] = useState(0);

  useEffect(() => {
    // 平滑動畫
    const duration = 2000;
    const startTime = Date.now();
    
    const targetTechDays = useV25 ? (v25Data?.tech.days || 0) : (v2Data?.TCC_days || 0);
    const targetCivDays = useV25 ? (v25Data?.civilization.days || 0) : (v2Data?.CRC_days || 0);
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      
      setAnimatedTechDays(targetTechDays * easeProgress);
      setAnimatedCivDays(targetCivDays * easeProgress);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setAnimatedTechDays(targetTechDays);
        setAnimatedCivDays(targetCivDays);
      }
    };
    
    animate();
  }, [v2Data, v25Data, useV25]);

  // 使用 v2.5 數據或 v2.0 數據
  const techDays = useV25 ? (v25Data?.tech.days || 0) : (v2Data?.TCC_days || 0);
  const techYears = useV25 ? (v25Data?.tech.years || 0) : 0;
  const techLevel = useV25 ? (v25Data?.tech.level || 0) : (v2Data?.TCL || 0) / 100;
  
  const civDays = useV25 ? (v25Data?.civilization.days || 0) : (v2Data?.CRC_days || 0);
  const civYears = useV25 ? (v25Data?.civilization.years || 0) : 0;
  const civLevel = useV25 ? (v25Data?.civilization.level || 0) : (v2Data?.CRL || 0) / 100;
  
  // RiskDelta = techDays - civDays
  // 如果 techDays < civDays（技術更快）→ 危險（技術超前文明）
  // 如果 techDays > civDays（文明更快）→ 安全（文明超前技術）
  const riskDelta = useV25 ? (techDays - civDays) : (v2Data?.RiskDelta || 0);
  const riskLevel = useV25 
    ? (riskDelta > 0 ? 'Safe' : (Math.abs(riskDelta) < 500 ? 'Tense' : 'Crash'))
    : (v2Data?.RiskLevel || 'Safe');

  // 風險等級顏色
  const getRiskColor = () => {
    // 根據 riskLevel 判斷
    switch (riskLevel) {
      case 'Safe':
        return 'text-green-400 border-green-400/30 bg-green-900/30'; // 安全：偏暗綠色
      case 'Tense':
        return 'text-yellow-400 border-yellow-400/30 bg-yellow-900/20';
      case 'Crash':
        return 'text-red-400 border-red-400/30 bg-red-900/30'; // 危險：偏暗紅色
      default:
        return 'text-cyan-300/80 border-cyan-300/20 bg-white/5';
    }
  };

  const riskColorClass = getRiskColor();

  return (
    <div className="space-y-8">
      {/* 兩個倒數面板 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* A. Tech Convergence Countdown */}
        <div className="bg-white/5 border border-cyan-300/20 rounded-2xl p-8 backdrop-blur-lg">
          <div className="text-center">
            <div className="text-cyan-300/60 text-sm font-light mb-4 tracking-wide uppercase">
              技術達標 Tech Convergence Countdown
            </div>
            <div className="text-cyan-300/90 text-5xl font-thin mb-2 tabular-nums">
              {Math.round(animatedTechDays).toLocaleString('zh-TW')}
            </div>
            <div className="text-gray-400 text-sm font-light mb-2">天</div>
            {useV25 && techYears > 0 && (
              <div className="text-cyan-300/60 text-sm font-light mb-4">
                ≈ {techYears.toFixed(1)} 年
              </div>
            )}
            <div className="text-cyan-300/60 text-xs font-light italic mb-4">
              技術預估在 {Math.round(animatedTechDays).toLocaleString('zh-TW')} 天後自然達成
            </div>
            <div className="mt-4 pt-4 border-t border-cyan-300/20">
              <div className="text-cyan-300/60 text-xs font-light mb-1">Tech Readiness Level</div>
              <div className="text-cyan-300/90 text-2xl font-light tabular-nums">
                {(techLevel * 100).toFixed(1)}%
              </div>
            </div>
          </div>
        </div>

        {/* B. Civilization Readiness Countdown */}
        <div className="bg-white/5 border border-purple-300/20 rounded-2xl p-8 backdrop-blur-lg">
          <div className="text-center">
            <div className="text-purple-300/60 text-sm font-light mb-4 tracking-wide uppercase">
              安全達標 Civilization Readiness Countdown
            </div>
            <div className="text-purple-300/90 text-5xl font-thin mb-2 tabular-nums">
              {Math.round(animatedCivDays).toLocaleString('zh-TW')}
            </div>
            <div className="text-gray-400 text-sm font-light mb-2">天</div>
            {useV25 && civYears > 0 && (
              <div className="text-purple-300/60 text-sm font-light mb-4">
                ≈ {civYears.toFixed(1)} 年
              </div>
            )}
            <div className="text-purple-300/60 text-xs font-light italic mb-4">
              文明預估需要 {Math.round(animatedCivDays).toLocaleString('zh-TW')} 天才能安全承接 ASI
            </div>
            <div className="mt-4 pt-4 border-t border-purple-300/20">
              <div className="text-purple-300/60 text-xs font-light mb-1">Civilization Maturity</div>
              <div className="text-purple-300/90 text-2xl font-light tabular-nums">
                {(civLevel * 100).toFixed(1)}%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* C. Risk Delta */}
      {(v2Data || v25Data) && (
        <div className={`border-2 rounded-2xl p-8 backdrop-blur-lg ${riskColorClass}`}>
          <div className="text-center">
            <div className="text-sm font-light mb-4 tracking-wide uppercase opacity-80">
              偏差 Risk Delta
            </div>
            <div className={`text-4xl font-thin mb-2 tabular-nums ${
              riskLevel === 'Safe' ? 'text-green-400' :
              riskLevel === 'Tense' ? 'text-yellow-400' :
              'text-red-400'
            }`}>
              {riskDelta > 0 ? '+' : ''}{riskDelta.toLocaleString('zh-TW')}
            </div>
            <div className="text-gray-400 text-sm font-light mb-4">天差距</div>
            
            {/* 風險等級標籤 */}
            <div className="mt-6">
              <div className={`inline-block px-6 py-3 rounded-lg border-2 ${
                riskLevel === 'Safe' ? 'border-green-400/50 bg-green-900/40 text-green-300' :
                riskLevel === 'Tense' ? 'border-yellow-400/50 bg-yellow-900/30 text-yellow-300' :
                'border-red-400/50 bg-red-900/40 text-red-300'
              }`}>
                <div className="text-lg font-light uppercase tracking-wide">
                  {riskLevel === 'Safe' ? '✓ 安全' :
                   riskLevel === 'Tense' ? '⚠ 緊張' :
                   '✗ 危險'}
                </div>
              </div>
            </div>

            {/* 風險說明 */}
            <div className="mt-6 text-sm font-light opacity-70 leading-relaxed max-w-2xl mx-auto">
              {riskLevel === 'Safe' && (
                <p>文明跑在技術前面，具備安全緩衝期</p>
              )}
              {riskLevel === 'Tense' && (
                <p>技術與文明接近交會期，需要密切監測</p>
              )}
              {riskLevel === 'Crash' && (
                <p>技術超前文明太多，存在高風險</p>
              )}
            </div>

            {/* 詳細數據 */}
            {!useV25 && v2Data && (
              <div className="mt-6 pt-6 border-t border-current/20 grid grid-cols-3 gap-4 text-xs">
                <div>
                  <div className="opacity-60 mb-1">Narrative Stability</div>
                  <div className="text-lg font-light tabular-nums">
                    {v2Data.narrativeStability.toFixed(1)}%
                  </div>
                </div>
                <div>
                  <div className="opacity-60 mb-1">TCL</div>
                  <div className="text-lg font-light tabular-nums">
                    {v2Data.TCL.toFixed(1)}%
                  </div>
                </div>
                <div>
                  <div className="opacity-60 mb-1">CRL</div>
                  <div className="text-lg font-light tabular-nums">
                    {v2Data.CRL.toFixed(1)}%
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

