'use client';

import { useEffect, useState } from 'react';
import { ReadinessData, DOMAIN_ENGLISH_LABELS } from '@/lib/types';
import { fetchReadinessData } from '@/lib/api';
import SloganTicker from './SloganTicker';

export default function DomainRadar() {
  const [data, setData] = useState<ReadinessData | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        console.log('DomainRadar: 開始獲取數據...');
        const readinessData = await fetchReadinessData();
        console.log('DomainRadar: 數據獲取成功:', readinessData);
        setData(readinessData);
      } catch (error) {
        console.error('DomainRadar: 獲取數據失敗:', error);
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

  const radarData = Object.entries(data.domains).map(([key, value]) => ({
    domain: DOMAIN_ENGLISH_LABELS[key as keyof typeof DOMAIN_ENGLISH_LABELS],
    value: value,
  }));

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

  // 創建軸線
  const axes = radarData.map((point, index) => {
    const angle = angleStep * index - Math.PI / 2;
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;
    return (
      <line
        key={index}
        x1={centerX}
        y1={centerY}
        x2={x}
        y2={y}
        stroke="rgba(100, 200, 255, 0.2)"
        strokeWidth="1"
      />
    );
  });

  // 創建標籤位置
  const labels = radarData.map((point, index) => {
    const angle = angleStep * index - Math.PI / 2;
    const labelRadius = radius + 30;
    const x = centerX + Math.cos(angle) * labelRadius;
    const y = centerY + Math.sin(angle) * labelRadius;
    return (
      <text
        key={index}
        x={x}
        y={y}
        textAnchor="middle"
        fill="#8b9dc3"
        fontSize="12"
        fontWeight="300"
      >
        {point.domain}
      </text>
    );
  });

  // 創建數據點
  const dataPoints = radarData.map((point, index) => {
    const angle = angleStep * index - Math.PI / 2;
    const value = point.value / 100;
    const x = centerX + Math.cos(angle) * radius * value;
    const y = centerY + Math.sin(angle) * radius * value;
    return (
      <circle
        key={index}
        cx={x}
        cy={y}
        r="4"
        fill="#64c8ff"
        stroke="rgba(100, 200, 255, 0.8)"
        strokeWidth="2"
      />
    );
  });

  return (
    <div className="bg-black/30 border border-neon-blue/20 rounded-2xl p-8 backdrop-blur-lg h-full w-full flex flex-col">
      <h2 className="text-xl font-light text-neon-blue mb-8 tracking-wide uppercase text-center">
        五維指標雷達圖
      </h2>
      
      <div className="flex-1 flex flex-col justify-between">
        <div className="w-full flex-1 flex items-center justify-center min-h-0">
          <svg width="400" height="400" viewBox="0 0 400 400" className="w-full h-full max-h-96 max-w-full">
            {/* 網格圓圈 */}
            {gridCircles}
            
            {/* 軸線 */}
            {axes}
            
            {/* 雷達圖數據區域 */}
            <path
              d={radarPath}
              fill="rgba(100, 200, 255, 0.2)"
              stroke="#64c8ff"
              strokeWidth="2"
            />
            
            {/* 數據點 */}
            {dataPoints}
            
            {/* 標籤 */}
            {labels}
          </svg>
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-text-muted text-xs">
            五個維度綜合評估文明成熟度進展
          </p>
        </div>
        
        {/* 標語跑馬燈 - 放在雷達圖下方 */}
        <div className="mt-6">
          <SloganTicker />
        </div>
      </div>
    </div>
  );
}