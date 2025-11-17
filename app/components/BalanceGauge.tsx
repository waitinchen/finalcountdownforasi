'use client';

import { useEffect, useState } from 'react';

interface BalanceGaugeProps {
  value: number; // 0-100
}

export default function BalanceGauge({ value }: BalanceGaugeProps) {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    // 動畫效果
    const duration = 2000;
    const startTime = Date.now();
    const startValue = 0;
    const endValue = value;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current = startValue + (endValue - startValue) * easeOutCubic(progress);
      // 保留小數後2位
      setAnimatedValue(parseFloat(current.toFixed(2)));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setAnimatedValue(parseFloat(endValue.toFixed(2)));
      }
    };

    animate();
  }, [value]);

  const easeOutCubic = (t: number): number => {
    return 1 - Math.pow(1 - t, 3);
  };

  // 計算指針角度（0-200+ 映射到 0-180度，從左到右）
  // 心術平衡指數範圍：0-200+，100 為完全平衡
  const normalizedValue = Math.min(animatedValue, 200); // 限制最大顯示值為 200
  const angle = (normalizedValue / 200) * 180 - 90; // -90 到 90 度

  // 根據數值獲取顏色（C謀規格：0-30 極度失衡，30-60 偏術，60-100 偏平衡，>100 心領術）
  const getColor = (val: number) => {
    if (val <= 30) return '#ef4444'; // 紅色 - 極度失衡
    if (val <= 60) return '#f97316'; // 橙色 - 偏術
    if (val <= 100) return '#84cc16'; // 淺綠 - 偏平衡
    return '#22c55e'; // 綠色 - 心領術（>100）
  };

  const getStatus = (val: number) => {
    if (val <= 30) return '極度失衡';
    if (val <= 60) return '偏術';
    if (val <= 100) return '偏平衡';
    return '心領術';
  };

  const currentColor = getColor(animatedValue);
  const status = getStatus(animatedValue);

  return (
    <div className="bg-black/30 border border-neon-blue/20 rounded-xl p-6 backdrop-blur-sm hover:border-neon-blue/50 hover:-translate-y-1 hover:shadow-lg hover:shadow-neon-blue/20 transition-all duration-300 group">
      <div className="text-text-secondary text-sm mb-4 tracking-wide text-center">
        心與術平衡指數
      </div>

      {/* 儀表盤容器 */}
      <div className="relative w-full aspect-square max-w-[200px] mx-auto mb-4">
        {/* SVG 儀表盤 */}
        <svg
          viewBox="0 0 200 120"
          className="w-full h-full"
          style={{ filter: 'drop-shadow(0 0 10px rgba(100, 200, 255, 0.3))' }}
        >
          {/* 背景弧線（灰色） */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="rgba(100, 200, 255, 0.1)"
            strokeWidth="8"
            strokeLinecap="round"
          />

          {/* 彩色刻度（從左到右：紅→橙→黃→綠） */}
          <defs>
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
              <stop offset="25%" stopColor="#f97316" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#eab308" stopOpacity="0.8" />
              <stop offset="75%" stopColor="#84cc16" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#22c55e" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="url(#gaugeGradient)"
            strokeWidth="8"
            strokeLinecap="round"
          />

          {/* 刻度標記 */}
          {[0, 25, 50, 75, 100].map((mark) => {
            const markAngle = (mark / 100) * 180 - 90;
            const radian = (markAngle * Math.PI) / 180;
            const x1 = 100 + 80 * Math.cos(radian);
            const y1 = 100 - 80 * Math.sin(radian);
            const x2 = 100 + 90 * Math.cos(radian);
            const y2 = 100 - 90 * Math.sin(radian);

            return (
              <g key={mark}>
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="rgba(100, 200, 255, 0.5)"
                  strokeWidth="2"
                />
                {mark === 50 && (
                  <text
                    x={x2 + (mark === 50 ? -5 : 0)}
                    y={y2 - 5}
                    fill="rgba(139, 157, 195, 0.8)"
                    fontSize="12"
                    textAnchor="middle"
                  >
                    {mark}
                  </text>
                )}
              </g>
            );
          })}

          {/* 指針 */}
          <g transform={`translate(100, 100) rotate(${angle})`}>
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="-75"
              stroke={currentColor}
              strokeWidth="3"
              strokeLinecap="round"
              style={{
                filter: `drop-shadow(0 0 4px ${currentColor})`,
              }}
            />
            <circle
              cx="0"
              cy="0"
              r="6"
              fill={currentColor}
              style={{
                filter: `drop-shadow(0 0 6px ${currentColor})`,
              }}
            />
          </g>

          {/* 當前值徽章 */}
          <g transform={`translate(100, 100)`}>
            <circle
              cx="0"
              cy="-50"
              r="20"
              fill={currentColor}
              opacity="0.9"
              style={{
                filter: `drop-shadow(0 0 8px ${currentColor})`,
              }}
            />
            <text
              x="0"
              y="-45"
              fill="white"
              fontSize="14"
              fontWeight="bold"
              textAnchor="middle"
              className="tabular-nums"
            >
              {animatedValue.toFixed(2)}
            </text>
          </g>
        </svg>

        {/* 標籤文字 */}
        <div className="absolute bottom-0 left-0 right-0 text-center">
          <div className="text-xs text-text-muted mb-1">Now:</div>
          <div
            className="text-sm font-medium"
            style={{ color: currentColor }}
          >
            {status}
          </div>
        </div>
      </div>

      {/* 底部說明 */}
      <div className="text-center mt-2">
        <div className="text-xs text-text-muted">
          心：心智 / 術：媒體 | 元件 | 基建 | 整合
        </div>
      </div>
    </div>
  );
}

