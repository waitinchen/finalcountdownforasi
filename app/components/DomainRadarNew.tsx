'use client';

import { useEffect, useState } from 'react';
import { CivilizationData, DOMAIN_ENGLISH_LABELS } from '@/lib/types';
import { fetchCivilizationData } from '@/lib/api';
import SloganTicker from './SloganTicker';

export default function DomainRadarNew() {
  const [data, setData] = useState<CivilizationData | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        console.log('DomainRadarNew: 開始獲取數據...');
        const civilizationData = await fetchCivilizationData();
        console.log('DomainRadarNew: 數據獲取成功:', civilizationData);
        setData(civilizationData);
      } catch (error) {
        console.error('DomainRadarNew: 獲取數據失敗:', error);
      }
    };

    loadData();
  }, []);

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

  // 構建雷達圖數據
  const radarData = [
    { domain: DOMAIN_ENGLISH_LABELS.components, value: data.components },
    { domain: DOMAIN_ENGLISH_LABELS.infrastructure, value: data.infrastructure },
    { domain: DOMAIN_ENGLISH_LABELS.convergence, value: data.convergence },
    { domain: DOMAIN_ENGLISH_LABELS.tone, value: data.tone },
    ...(data.hcmi ? [{ domain: DOMAIN_ENGLISH_LABELS.hcmi, value: data.hcmi }] : []),
  ];

  const centerX = 200;
  const centerY = 200;
  const radius = 120;
  const numPoints = radarData.length;
  const angleStep = (Math.PI * 2) / numPoints;

  // 創建雷達圖路徑
  const radarPath = radarData.map((point, index) => {
    const angle = angleStep * index - Math.PI / 2;
    const value = point.value / 100;
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
        stroke="rgba(100, 200, 255, 0.1)"
        strokeWidth="1"
      />
    );
  });

  // 創建軸線和標籤
  const axes = radarData.map((point, index) => {
    const angle = angleStep * index - Math.PI / 2;
    const x1 = centerX;
    const y1 = centerY;
    const x2 = centerX + Math.cos(angle) * radius;
    const y2 = centerY + Math.sin(angle) * radius;
    const labelX = centerX + Math.cos(angle) * (radius + 30);
    const labelY = centerY + Math.sin(angle) * (radius + 30);

    return (
      <g key={index}>
        <line
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="rgba(100, 200, 255, 0.2)"
          strokeWidth="1"
        />
        <text
          x={labelX}
          y={labelY}
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-neon-blue text-xs fill-current"
        >
          {point.domain}
        </text>
        <text
          x={labelX}
          y={labelY + 15}
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-text-muted text-xs fill-current"
        >
          {point.value.toFixed(0)}
        </text>
      </g>
    );
  });

  return (
    <div className="bg-black/30 border border-neon-blue/20 rounded-2xl p-8 backdrop-blur-lg h-full w-full flex flex-col">
      <h2 className="text-xl font-light text-neon-blue mb-6 tracking-wide uppercase text-center">
        文明五維雷達圖
      </h2>

      <div className="flex-1 flex items-center justify-center">
        <svg
          width="400"
          height="400"
          viewBox="0 0 400 400"
          className="max-w-full"
        >
          {gridCircles}
          {axes}
          <path
            d={radarPath}
            fill="rgba(100, 200, 255, 0.2)"
            stroke="rgba(100, 200, 255, 0.8)"
            strokeWidth="2"
            className="animate-pulse"
          />
        </svg>
      </div>

      <div className="mt-6">
        <SloganTicker />
      </div>
    </div>
  );
}


