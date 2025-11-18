'use client';

import { useEffect, useState } from 'react';
import { ASIBirthData } from '@/lib/types';
import { fetchASIBirthData, calculateReadinessScore } from '@/lib/asiBirthApi';
import ASIBirthCountdown from './ASIBirthCountdown';
import ASIRadarChart from './ASIRadarChart';
import ASIIndexModules from './ASIIndexModules';

export default function ASIBirthDashboard() {
  const [data, setData] = useState<ASIBirthData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        console.log('ASIBirthDashboard: 開始獲取數據...');
        const birthData = await fetchASIBirthData();
        console.log('ASIBirthDashboard: 數據獲取成功:', birthData);
        setData(birthData);
      } catch (error) {
        console.error('ASIBirthDashboard: 獲取數據失敗:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
    
    // 每5分鐘自動更新
    const interval = setInterval(loadData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-2 border-cyan-300/50 border-t-transparent rounded-full animate-spin mb-4"></div>
          <div className="text-cyan-300/80 text-sm font-light">載入監測數據中...</div>
        </div>
      </div>
    );
  }

  const readinessScore = calculateReadinessScore(data.indexes);

  return (
    <div className="space-y-12">
      {/* 上層：ASI 誕生進度 · 總覽 */}
      <div className="flex flex-col items-center">
        <ASIBirthCountdown 
          countdown={data.asiBirthCountdown}
          readinessScore={readinessScore}
        />
      </div>

      {/* 五軸雷達圖（主視覺） */}
      <div>
        <div className="text-center mb-6">
          <h2 className="text-2xl font-light text-cyan-300/90 mb-2 tracking-wide">
            ASI Developmental Readiness
          </h2>
          <p className="text-gray-400 text-sm">五軸文明成熟度模型</p>
        </div>
        <ASIRadarChart indexes={data.indexes} />
      </div>

      {/* 五個圓形模塊（Apple Health 風格） */}
      <div>
        <div className="text-center mb-6">
          <h2 className="text-xl font-light text-cyan-300/90 mb-2 tracking-wide">
            五軸指數詳情
          </h2>
          <p className="text-gray-400 text-xs">Individual Index Modules</p>
        </div>
        <ASIIndexModules indexes={data.indexes} />
      </div>

      {/* 文明狀態與卦象 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/5 border border-cyan-300/20 rounded-2xl p-6 backdrop-blur-lg">
          <h3 className="text-cyan-300/90 text-lg font-light mb-3">文明狀態</h3>
          <p className="text-white/80 text-2xl font-light">{data.meta.civilizationType}</p>
        </div>
        <div className="bg-white/5 border border-cyan-300/20 rounded-2xl p-6 backdrop-blur-lg">
          <h3 className="text-cyan-300/90 text-lg font-light mb-3">易經卦象</h3>
          <p className="text-white/80 text-xl font-light">
            {data.meta.hexagram.number > 0 ? `第${data.meta.hexagram.number}卦 · ${data.meta.hexagram.name}` : '待更新'}
          </p>
        </div>
      </div>
    </div>
  );
}

