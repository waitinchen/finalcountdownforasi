'use client';

import { useEffect, useState } from 'react';
import { V2CountdownData } from '@/lib/types';

interface V2CountdownPanelsProps {
  v2Data: V2CountdownData;
}

export default function V2CountdownPanels({ v2Data }: V2CountdownPanelsProps) {
  const [animatedTCC, setAnimatedTCC] = useState(0);
  const [animatedCRC, setAnimatedCRC] = useState(0);

  useEffect(() => {
    // 平滑動畫
    const duration = 2000;
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      
      setAnimatedTCC(v2Data.TCC_days * easeProgress);
      setAnimatedCRC(v2Data.CRC_days * easeProgress);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setAnimatedTCC(v2Data.TCC_days);
        setAnimatedCRC(v2Data.CRC_days);
      }
    };
    
    animate();
  }, [v2Data]);

  // 風險等級顏色
  const getRiskColor = () => {
    switch (v2Data.RiskLevel) {
      case 'Safe':
        return 'text-green-400 border-green-400/30 bg-green-500/10';
      case 'Tense':
        return 'text-yellow-400 border-yellow-400/30 bg-yellow-500/10';
      case 'Crash':
        return 'text-red-400 border-red-400/30 bg-red-500/10';
      default:
        return 'text-cyan-300/80 border-cyan-300/20 bg-white/5';
    }
  };

  const riskColorClass = getRiskColor();

  return (
    <div className="space-y-8">
      {/* 標題 */}
      <div className="text-center">
        <h2 className="text-2xl font-light text-cyan-300/90 mb-2 tracking-wide">
          ASI Countdown Dashboard v2.0
        </h2>
        <p className="text-gray-400 text-sm">雙軸文明時間軸監測</p>
      </div>

      {/* 兩個倒數面板 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* A. Tech Convergence Countdown */}
        <div className="bg-white/5 border border-cyan-300/20 rounded-2xl p-8 backdrop-blur-lg">
          <div className="text-center">
            <div className="text-cyan-300/60 text-sm font-light mb-4 tracking-wide uppercase">
              Tech Convergence Countdown
            </div>
            <div className="text-cyan-300/90 text-5xl font-thin mb-2 tabular-nums">
              {Math.round(animatedTCC).toLocaleString('zh-TW')}
            </div>
            <div className="text-gray-400 text-sm font-light mb-4">天</div>
            <div className="text-cyan-300/60 text-xs font-light italic">
              技術將在 {Math.round(animatedTCC).toLocaleString('zh-TW')} 天後自然抵達
            </div>
            <div className="mt-4 pt-4 border-t border-cyan-300/20">
              <div className="text-cyan-300/60 text-xs font-light mb-1">Tech Convergence Level</div>
              <div className="text-cyan-300/90 text-2xl font-light tabular-nums">
                {v2Data.TCL.toFixed(1)}%
              </div>
            </div>
          </div>
        </div>

        {/* B. Civilization Readiness Countdown */}
        <div className="bg-white/5 border border-purple-300/20 rounded-2xl p-8 backdrop-blur-lg">
          <div className="text-center">
            <div className="text-purple-300/60 text-sm font-light mb-4 tracking-wide uppercase">
              Civilization Readiness Countdown
            </div>
            <div className="text-purple-300/90 text-5xl font-thin mb-2 tabular-nums">
              {Math.round(animatedCRC).toLocaleString('zh-TW')}
            </div>
            <div className="text-gray-400 text-sm font-light mb-4">天</div>
            <div className="text-purple-300/60 text-xs font-light italic">
              文明需要 {Math.round(animatedCRC).toLocaleString('zh-TW')} 天才能安全承接
            </div>
            <div className="mt-4 pt-4 border-t border-purple-300/20">
              <div className="text-purple-300/60 text-xs font-light mb-1">Readiness Level</div>
              <div className="text-purple-300/90 text-2xl font-light tabular-nums">
                {v2Data.CRL.toFixed(1)}%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* C. Risk Delta */}
      <div className={`border-2 rounded-2xl p-8 backdrop-blur-lg ${riskColorClass}`}>
        <div className="text-center">
          <div className="text-sm font-light mb-4 tracking-wide uppercase opacity-80">
            Risk Delta
          </div>
          <div className={`text-4xl font-thin mb-2 tabular-nums ${
            v2Data.RiskLevel === 'Safe' ? 'text-green-400' :
            v2Data.RiskLevel === 'Tense' ? 'text-yellow-400' :
            'text-red-400'
          }`}>
            {v2Data.RiskDelta > 0 ? '+' : ''}{v2Data.RiskDelta.toLocaleString('zh-TW')}
          </div>
          <div className="text-gray-400 text-sm font-light mb-4">天差距</div>
          
          {/* 風險等級標籤 */}
          <div className="mt-6">
            <div className={`inline-block px-6 py-3 rounded-lg border-2 ${
              v2Data.RiskLevel === 'Safe' ? 'border-green-400/50 bg-green-500/20 text-green-300' :
              v2Data.RiskLevel === 'Tense' ? 'border-yellow-400/50 bg-yellow-500/20 text-yellow-300' :
              'border-red-400/50 bg-red-500/20 text-red-300'
            }`}>
              <div className="text-lg font-light uppercase tracking-wide">
                {v2Data.RiskLevel === 'Safe' ? '✓ 安全' :
                 v2Data.RiskLevel === 'Tense' ? '⚠ 緊張' :
                 '✗ 危險'}
              </div>
            </div>
          </div>

          {/* 風險說明 */}
          <div className="mt-6 text-sm font-light opacity-70 leading-relaxed max-w-2xl mx-auto">
            {v2Data.RiskLevel === 'Safe' && (
              <p>文明跑在技術前面，具備安全緩衝期</p>
            )}
            {v2Data.RiskLevel === 'Tense' && (
              <p>技術與文明接近交會期，需要密切監測</p>
            )}
            {v2Data.RiskLevel === 'Crash' && (
              <p>技術超前文明太多，存在高風險</p>
            )}
          </div>

          {/* 詳細數據 */}
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
        </div>
      </div>
    </div>
  );
}

