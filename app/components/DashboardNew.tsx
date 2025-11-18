'use client';

import { useEffect, useState } from 'react';
import { CivilizationData } from '@/lib/types';
import { fetchCivilizationData } from '@/lib/api';
import CivilizationBanner from './CivilizationBanner';
import TechHeartBalance from './TechHeartBalance';
import DomainRadarNew from './DomainRadarNew';
import KPICards from './KPICards';
import HexagramDisplay from './HexagramDisplay';

export default function DashboardNew() {
  const [data, setData] = useState<CivilizationData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        console.log('DashboardNew: 開始獲取數據...');
        const civilizationData = await fetchCivilizationData();
        console.log('DashboardNew: 數據獲取成功:', civilizationData);
        setData(civilizationData);
      } catch (error) {
        console.error('DashboardNew: 獲取數據失敗:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-2 border-neon-blue border-t-transparent rounded-full animate-spin mb-4"></div>
          <div className="text-neon-blue text-sm font-light">載入數據中...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* ① 文明類型 Banner */}
      <div>
        <CivilizationBanner civilization={data.civilization} />
      </div>

      {/* ② 心與術平衡儀 + 五維雷達圖 */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <TechHeartBalance tech={data.tech} heart={data.heart} />
        <DomainRadarNew />
      </div>

      {/* ③ 六大指標卡片 */}
      <div>
        <h2 className="text-xl font-light text-neon-blue mb-4 tracking-wide uppercase">
          六大文明指標
        </h2>
        <KPICards
          tech={data.tech}
          heart={data.heart}
          readiness={data.readiness}
          balance={data.balance}
          safetyBias={data.safetyBias}
          countdown={data.countdown}
        />
      </div>

      {/* ④ 易經卦象區塊 */}
      <div>
        <HexagramDisplay hexagram={data.hexagram} />
      </div>
    </div>
  );
}

