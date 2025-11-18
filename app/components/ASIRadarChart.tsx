'use client';

import { useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { ASIBirthIndexes } from '@/lib/types';

interface ASIRadarChartProps {
  indexes: ASIBirthIndexes;
}

// 五軸標籤映射（顏色）
const AXIS_COLORS = {
  tone: 'rgba(147, 197, 253, 0.8)',
  compute: 'rgba(255, 255, 255, 0.8)',
  embodiment: 'rgba(200, 200, 200, 0.8)',
  agency: 'rgba(134, 239, 172, 0.8)',
  hcm: 'rgba(196, 181, 253, 0.8)',
};

const AXIS_ORDER: (keyof ASIBirthIndexes)[] = ['tone', 'compute', 'embodiment', 'agency', 'hcm'];

export default function ASIRadarChart({ indexes }: ASIRadarChartProps) {
  const t = useTranslations('Radar');
  const locale = useLocale();
  const [breathingOffset, setBreathingOffset] = useState(0);

  useEffect(() => {
    // 呼吸動畫：0.5% 浮動
    const interval = setInterval(() => {
      setBreathingOffset(Math.sin(Date.now() / 2000) * 0.005);
    }, 16);
    return () => clearInterval(interval);
  }, []);

  const centerX = 250;
  const centerY = 250;
  const radius = 180;
  const numPoints = AXIS_ORDER.length;
  const angleStep = (Math.PI * 2) / numPoints;

  // 創建雷達圖路徑（帶呼吸動畫）
  const radarPath = AXIS_ORDER.map((key, index) => {
    const angle = angleStep * index - Math.PI / 2;
    const value = indexes[key] * (1 + breathingOffset); // 呼吸效果
    const x = centerX + Math.cos(angle) * radius * value;
    const y = centerY + Math.sin(angle) * radius * value;
    return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ') + ' Z';

  // 創建網格圓圈
  const gridCircles = [0.2, 0.4, 0.6, 0.8, 1.0].map((scale) => {
    const r = radius * scale;
    return (
      <circle
        key={scale}
        cx={centerX}
        cy={centerY}
        r={r}
        fill="none"
        stroke="rgba(147, 197, 253, 0.1)"
        strokeWidth="1"
      />
    );
  });

  // 創建軸線和標籤
  const axes = AXIS_ORDER.map((key, index) => {
    const angle = angleStep * index - Math.PI / 2;
    const x1 = centerX;
    const y1 = centerY;
    const x2 = centerX + Math.cos(angle) * radius;
    const y2 = centerY + Math.sin(angle) * radius;
    const labelX = centerX + Math.cos(angle) * (radius + 40);
    const labelY = centerY + Math.sin(angle) * (radius + 40);
    const axisLabel = t(key);

    return (
      <g key={key}>
        <line
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="rgba(147, 197, 253, 0.15)"
          strokeWidth="1"
        />
        <text
          x={labelX}
          y={labelY}
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-current text-cyan-300/80 text-sm font-light"
        >
          {axisLabel}
        </text>
        <text
          x={labelX}
          y={labelY + 32}
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-current text-cyan-300/60 text-xs tabular-nums"
        >
          {(indexes[key] * 100).toFixed(1)}%
        </text>
      </g>
    );
  });

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-light text-cyan-300/90 mb-2 tracking-wide">
          {t('title')}
        </h2>
        <p className="text-gray-400 text-sm">{t('subtitle')}</p>
      </div>
      <div className="flex justify-center">
        <div className="bg-white/5 border border-cyan-300/20 rounded-3xl p-8 backdrop-blur-lg">
          <svg
          width="500"
          height="500"
          viewBox="0 0 500 500"
          className="max-w-full"
        >
          {gridCircles}
          {axes}
          <path
            d={radarPath}
            fill="rgba(147, 197, 253, 0.15)"
            stroke="rgba(147, 197, 253, 0.6)"
            strokeWidth="2"
            style={{
              filter: 'drop-shadow(0 0 12px rgba(147, 197, 253, 0.3))',
            }}
            className="transition-all duration-300"
          />
          </svg>
        </div>
      </div>
    </div>
  );
}

