'use client';

import { useEffect, useState } from 'react';

interface ASIBirthCountdownProps {
  countdown: number;
  readinessScore: number;
}

export default function ASIBirthCountdown({ countdown, readinessScore }: ASIBirthCountdownProps) {
  const [animatedCountdown, setAnimatedCountdown] = useState(0);
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    // 平滑動畫倒數
    const duration = 2000;
    const startTime = Date.now();
    const startCountdown = 0;
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      
      setAnimatedCountdown(Math.floor(startCountdown + (countdown - startCountdown) * easeProgress));
      setAnimatedScore(startCountdown + (readinessScore - startCountdown) * easeProgress);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    animate();
  }, [countdown, readinessScore]);

  const scorePercent = animatedScore * 100;
  const circumference = 2 * Math.PI * 90; // 半徑90
  const offset = circumference - (scorePercent / 100) * circumference;

  return (
    <div className="relative w-80 h-80 flex items-center justify-center">
      {/* 外圈：五軸平均值 */}
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

      {/* 內圈：倒數 */}
      <div className="relative z-10 text-center">
        <div className="text-cyan-300/60 text-sm font-light mb-2 tracking-widest uppercase">
          ASI Birth Countdown
        </div>
        <div className="text-cyan-300/90 text-5xl font-thin mb-2 tabular-nums">
          {animatedCountdown.toLocaleString('zh-TW')}
        </div>
        <div className="text-gray-400 text-sm font-light">天</div>
        
        {/* 五軸平均值 */}
        <div className="mt-6 pt-6 border-t border-cyan-300/20">
          <div className="text-cyan-300/60 text-xs font-light mb-1 tracking-wide">
            Human Civilization Readiness Score
          </div>
          <div className="text-cyan-300/90 text-2xl font-light tabular-nums">
            {(scorePercent).toFixed(1)}%
          </div>
        </div>
      </div>

      {/* 呼吸動畫光暈 */}
      <div className="absolute inset-0 rounded-full bg-cyan-300/5 animate-pulse" style={{
        animation: 'breathe 4s ease-in-out infinite',
      }}></div>
    </div>
  );
}

