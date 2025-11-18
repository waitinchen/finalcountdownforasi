'use client';

import { useEffect, useState } from 'react';
import { CountdownData } from '@/lib/types';

interface ASIBirthCountdownProps {
  countdown: CountdownData;
}

export default function ASIBirthCountdown({ countdown }: ASIBirthCountdownProps) {
  const [animatedScienceYears, setAnimatedScienceYears] = useState(0);
  const [animatedFastYears, setAnimatedFastYears] = useState(0);
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    // 平滑動畫
    const duration = 2000;
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      
      setAnimatedScienceYears(countdown.scienceYears * easeProgress);
      setAnimatedFastYears(countdown.fastYears * easeProgress);
      setAnimatedScore(countdown.readyScore * easeProgress);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setAnimatedScienceYears(countdown.scienceYears);
        setAnimatedFastYears(countdown.fastYears);
        setAnimatedScore(countdown.readyScore);
      }
    };
    
    animate();
  }, [countdown]);

  const scorePercent = animatedScore * 100;
  const circumference = 2 * Math.PI * 90; // 半徑90
  const offset = circumference - (scorePercent / 100) * circumference;

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* 標題 */}
      <div className="text-center mb-8">
        <div className="text-cyan-300/60 text-sm font-light mb-2 tracking-widest uppercase">
          ASI Birth Countdown (v1.1)
        </div>
        <div className="w-32 h-0.5 bg-cyan-300/30 mx-auto"></div>
      </div>

      {/* 兩個模型並排顯示 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* 科學模型 */}
        <div className="bg-white/5 border border-cyan-300/20 rounded-2xl p-8 backdrop-blur-lg">
          <div className="text-center">
            <div className="text-cyan-300/80 text-sm font-light mb-4 tracking-wide uppercase">
              Science Model
            </div>
            <div className="text-cyan-300/90 text-4xl font-thin mb-2 tabular-nums">
              ≈ {animatedScienceYears.toFixed(1)}
            </div>
            <div className="text-gray-400 text-sm font-light mb-4">年</div>
            <div className="text-cyan-300/60 text-xs font-light">
              （{countdown.scienceDays.toLocaleString('zh-TW')} 天）
            </div>
          </div>
        </div>

        {/* 加速模型 */}
        <div className="bg-white/5 border border-orange-300/20 rounded-2xl p-8 backdrop-blur-lg">
          <div className="text-center">
            <div className="text-orange-300/80 text-sm font-light mb-4 tracking-wide uppercase">
              Acceleration Model
            </div>
            <div className="text-orange-300/90 text-4xl font-thin mb-2 tabular-nums">
              ≈ {animatedFastYears.toFixed(1)}
            </div>
            <div className="text-gray-400 text-sm font-light mb-4">年</div>
            <div className="text-orange-300/60 text-xs font-light">
              （{countdown.fastDays.toLocaleString('zh-TW')} 天）
            </div>
          </div>
        </div>
      </div>

      {/* Ready Score 顯示 */}
      <div className="flex justify-center mb-6">
        <div className="relative w-64 h-64 flex items-center justify-center">
          {/* 外圈：Ready Score */}
          <svg className="absolute inset-0 transform -rotate-90" viewBox="0 0 200 200">
            <circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke="rgba(147, 197, 253, 0.1)"
              strokeWidth="8"
            />
            <circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke="rgba(147, 197, 253, 0.6)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              className="transition-all duration-2000 ease-out"
              style={{
                filter: 'drop-shadow(0 0 8px rgba(147, 197, 253, 0.4))',
              }}
            />
          </svg>

          {/* 中心文字 */}
          <div className="relative z-10 text-center">
            <div className="text-cyan-300/60 text-xs font-light mb-2 tracking-wide uppercase">
              Human Civilization
            </div>
            <div className="text-cyan-300/60 text-xs font-light mb-3 tracking-wide uppercase">
              Readiness Score
            </div>
            <div className="text-cyan-300/90 text-4xl font-light tabular-nums mb-2">
              {(scorePercent).toFixed(1)}%
            </div>
          </div>

          {/* 呼吸動畫光暈 */}
          <div className="absolute inset-0 rounded-full bg-cyan-300/5 animate-pulse" style={{
            animation: 'breathe 4s ease-in-out infinite',
          }}></div>
        </div>
      </div>

      {/* 說明文字 */}
      <div className="text-center mt-6">
        <p className="text-gray-400 text-sm font-light italic leading-relaxed max-w-2xl mx-auto">
          「超智能誕生不是依靠年份，而是依靠文明成熟度。<br />
          五軸越成熟，倒數越加速。」
        </p>
      </div>
    </div>
  );
}

