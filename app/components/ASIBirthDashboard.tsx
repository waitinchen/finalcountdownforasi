'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { ASIBirthData } from '@/lib/types';
import { fetchASIBirthData } from '@/lib/asiBirthApi';
import ASIRadarChart from './ASIRadarChart';
import ASIIndexModules from './ASIIndexModules';
import V2CountdownPanels from './V2CountdownPanels';

export default function ASIBirthDashboard() {
  const t = useTranslations('Dashboard');
  const tAbout = useTranslations('AboutUs');
  const [data, setData] = useState<ASIBirthData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAbout, setShowAbout] = useState(false);

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

  return (
    <div className="space-y-6 md:space-y-12">
      {/* v2.5 雙軸倒數面板（優先）或 v2.0 面板 */}
      {(data.v25 || data.v2) && (
        <div>
          <V2CountdownPanels v25Data={data.v25} v2Data={data.v2} />
        </div>
      )}

      {/* 五軸雷達圖（主視覺） */}
      <div>
        <ASIRadarChart indexes={data.indexes} />
      </div>

      {/* 五個圓形模塊（Apple Health 風格） */}
      <div>
        <div className="text-center mb-6">
          <h2 className="text-xl font-light text-cyan-300/90 mb-2 tracking-wide">
            {t('indexModulesTitle')}
          </h2>
          <p className="text-gray-400 text-xs">{t('indexModulesSubtitle')}</p>
        </div>
        <ASIIndexModules indexes={data.indexes} />
      </div>

      {/* Spotify 播客節目 */}
      <div className="w-full">
        <iframe
          data-testid="embed-iframe"
          style={{ borderRadius: '12px' }}
          src="https://open.spotify.com/embed/episode/7MvMpnwBOAbT9ElSsK023E?utm_source=generator"
          width="100%"
          height="152"
          frameBorder="0"
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          className="w-full rounded-lg md:rounded-xl"
        />
      </div>

      {/* 文明狀態與卦象 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
        <div className="bg-white/5 border border-cyan-300/20 rounded-xl md:rounded-2xl p-4 md:p-6 backdrop-blur-lg">
          <h3 className="text-cyan-300/90 text-base md:text-lg font-light mb-2 md:mb-3">{t('civilizationStatus')}</h3>
          <p className="text-white/80 text-xl md:text-2xl font-light">{data.meta.civilizationType}</p>
        </div>
        <div className="bg-white/5 border border-cyan-300/20 rounded-xl md:rounded-2xl p-4 md:p-6 backdrop-blur-lg">
          <h3 className="text-cyan-300/90 text-base md:text-lg font-light mb-2 md:mb-3">{t('hexagram')}</h3>
          <p className="text-white/80 text-lg md:text-xl font-light">
            {data.meta.hexagram.number > 0 ? `第${data.meta.hexagram.number}卦 · ${data.meta.hexagram.name}` : '待更新'}
          </p>
        </div>
      </div>

      {/* 招募全球合作夥伴 & 關於我們 */}
      <div className="pt-4 md:pt-8 border-t border-cyan-300/20">
        <div className="flex flex-col md:flex-row gap-2 md:gap-4 justify-center items-center mb-4 md:mb-6">
          <a
            href="https://forms.gle/5FZmjvM4JnKMU2tXA"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/5 border border-cyan-300/20 rounded-lg md:rounded-xl px-4 py-2 md:px-6 md:py-3 text-cyan-300/90 text-xs md:text-sm font-light hover:bg-cyan-300/10 hover:border-cyan-300/40 transition-all duration-300 backdrop-blur-sm w-full md:w-auto text-center"
          >
            {t('globalAlliance')}
          </a>
          <a
            href="https://forms.gle/Tw6ZisFWU4X3dLZv7"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/5 border border-cyan-300/20 rounded-lg md:rounded-xl px-4 py-2 md:px-6 md:py-3 text-cyan-300/90 text-xs md:text-sm font-light hover:bg-cyan-300/10 hover:border-cyan-300/40 transition-all duration-300 backdrop-blur-sm w-full md:w-auto text-center"
          >
            {t('recruitPartners')}
          </a>
          <button
            onClick={() => setShowAbout(!showAbout)}
            className="bg-white/5 border border-cyan-300/20 rounded-lg md:rounded-xl px-4 py-2 md:px-6 md:py-3 text-cyan-300/90 text-xs md:text-sm font-light hover:bg-cyan-300/10 hover:border-cyan-300/40 transition-all duration-300 backdrop-blur-sm w-full md:w-auto"
          >
            {t('aboutUs')}
          </button>
        </div>

        {/* 關於我們內容區域 */}
        {showAbout && (
          <div className="mt-4 md:mt-8 bg-white/5 border border-cyan-300/20 rounded-xl md:rounded-2xl p-4 md:p-8 backdrop-blur-lg max-w-4xl mx-auto">
            <div className="space-y-4 md:space-y-8 text-text-secondary text-xs md:text-sm leading-relaxed">
              {/* SECTION 1 - 標題 */}
              <div className="text-center border-b border-cyan-300/20 pb-6">
                <h2 className="text-2xl font-light text-cyan-300/90 mb-2 tracking-wide">
                  {tAbout('title')}
                </h2>
                <p className="text-cyan-300/60 text-base font-light italic">
                  {tAbout('subtitle')}
                </p>
              </div>

              {/* SECTION 1 - 使命 */}
              <div className="border-t border-cyan-300/20 pt-6">
                <h3 className="text-cyan-300/90 text-lg font-light mb-4">
                  <strong className="text-cyan-300/80">{tAbout('section1.title')}</strong>
                </h3>
                <p className="mb-3">
                  {tAbout('section1.p1')}
                </p>
                <p className="mb-3">{tAbout('section1.p2')}</p>
                <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                  <li><strong className="text-cyan-300/80">{tAbout('section1.item1')}</strong></li>
                  <li><strong className="text-cyan-300/80">{tAbout('section1.item2')}</strong></li>
                </ul>
                <p className="mb-3">{tAbout('section1.p3')}</p>
                <p className="mb-3">
                  {tAbout('section1.p4')}
                </p>
                <p className="mb-3">
                  <strong className="text-cyan-300/80">Final Countdown for ASI</strong> {tAbout('section1.p5')}
                </p>
                <div className="p-4 bg-cyan-300/5 rounded-lg border border-cyan-300/10 mb-4">
                  <p className="text-cyan-300/80 font-light">
                    <strong>{tAbout('section1.highlight1')}</strong><br />
                    <strong>{tAbout('section1.highlight2')}</strong>
                  </p>
                </div>
                <p className="mb-3">{tAbout('section1.p6')}</p>
                <p className="mb-3">{tAbout('section1.p7')}</p>
                <p className="mb-3">{tAbout('section1.p8')}</p>
                <p>{tAbout('section1.p9')}</p>
              </div>

              {/* SECTION 2 - ASI 超智能誕生監測儀表板 */}
              <div className="border-t border-cyan-300/20 pt-6">
                <h3 className="text-cyan-300/90 text-lg font-light mb-4">
                  <strong className="text-cyan-300/80">{tAbout('section2.title')}</strong>
                </h3>
                <p className="mb-4">
                  {tAbout('section2.p1')}
                </p>
                
                <div className="mb-6">
                  <h4 className="text-cyan-300/70 text-base font-light mb-3">
                    {tAbout('section2.subtitle')}
                  </h4>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="text-cyan-300/70 text-base font-light mb-2">
                        <strong>{tAbout('section2.techTitle')}</strong>
                      </div>
                      <p className="mb-2">{tAbout('section2.techMeasures')}</p>
                      <ul className="list-disc list-inside space-y-1 ml-4 mb-2">
                        <li>{tAbout('section2.techItem1')}</li>
                        <li>{tAbout('section2.techItem2')}</li>
                        <li>{tAbout('section2.techItem3')}</li>
                        <li>{tAbout('section2.techItem4')}</li>
                        <li>{tAbout('section2.techItem5')}</li>
                      </ul>
                      <p className="text-cyan-300/60 italic">
                        {tAbout('section2.techNote')}
                      </p>
                    </div>
                    
                    <div>
                      <div className="text-purple-300/70 text-base font-light mb-2">
                        <strong>{tAbout('section2.civTitle')}</strong>
                      </div>
                      <p className="mb-2">{tAbout('section2.civMeasures')}</p>
                      <ul className="list-disc list-inside space-y-1 ml-4 mb-2">
                        <li>{tAbout('section2.civItem1')}</li>
                        <li>{tAbout('section2.civItem2')}</li>
                        <li>{tAbout('section2.civItem3')}</li>
                        <li>{tAbout('section2.civItem4')}</li>
                        <li>{tAbout('section2.civItem5')}</li>
                      </ul>
                      <p className="text-purple-300/60 italic">
                        {tAbout('section2.civNote')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 3 - 五軸文明模型 */}
              <div className="border-t border-cyan-300/20 pt-6">
                <h3 className="text-cyan-300/90 text-lg font-light mb-4">
                  <strong className="text-cyan-300/80">{tAbout('section3.title')}</strong>
                </h3>
                <p className="mb-4">
                  {tAbout('section3.p1')}
                </p>
                <div className="space-y-4">
                  <div>
                    <div className="text-cyan-300/70 font-light mb-2">
                      <strong>{tAbout('section3.item1Title')}</strong>
                    </div>
                    <p className="text-sm text-gray-400 ml-4">
                      {tAbout('section3.item1Desc')}
                    </p>
                  </div>
                  <div>
                    <div className="text-cyan-300/70 font-light mb-2">
                      <strong>{tAbout('section3.item2Title')}</strong>
                    </div>
                    <p className="text-sm text-gray-400 ml-4">
                      {tAbout('section3.item2Desc')}
                    </p>
                  </div>
                  <div>
                    <div className="text-cyan-300/70 font-light mb-2">
                      <strong>{tAbout('section3.item3Title')}</strong>
                    </div>
                    <p className="text-sm text-gray-400 ml-4">
                      {tAbout('section3.item3Desc')}
                    </p>
                  </div>
                  <div>
                    <div className="text-cyan-300/70 font-light mb-2">
                      <strong>{tAbout('section3.item4Title')}</strong>
                    </div>
                    <p className="text-sm text-gray-400 ml-4">
                      {tAbout('section3.item4Desc')}
                    </p>
                  </div>
                  <div>
                    <div className="text-cyan-300/70 font-light mb-2">
                      <strong>{tAbout('section3.item5Title')}</strong>
                    </div>
                    <p className="text-sm text-gray-400 ml-4">
                      {tAbout('section3.item5Desc')}
                    </p>
                  </div>
                </div>
              </div>

              {/* SECTION 4 - 計算哲學 */}
              <div className="border-t border-cyan-300/20 pt-6">
                <h3 className="text-cyan-300/90 text-lg font-light mb-4">
                  <strong className="text-cyan-300/80">{tAbout('section4.title')}</strong>
                </h3>
                <p className="mb-3">
                  {tAbout('section4.p1')}
                </p>
                <p className="mb-3">{tAbout('section4.p2')}</p>
                <div className="space-y-3 mb-4">
                  <div>
                    <div className="text-cyan-300/70 font-light mb-1">
                      ✔ <strong>{tAbout('section4.techTitle')}</strong>
                    </div>
                    <p className="text-sm text-gray-400 ml-4">
                      {tAbout('section4.techDesc')}
                    </p>
                  </div>
                  <div>
                    <div className="text-purple-300/70 font-light mb-1">
                      ✔ <strong>{tAbout('section4.civTitle')}</strong>
                    </div>
                    <p className="text-sm text-gray-400 ml-4">
                      {tAbout('section4.civDesc')}
                    </p>
                  </div>
                </div>
                <p className="mb-3">{tAbout('section4.p3')}</p>
                <ul className="list-disc list-inside space-y-1 ml-4 mb-4 text-sm">
                  <li>{tAbout('section4.source1')}</li>
                  <li>{tAbout('section4.source2')}</li>
                  <li>{tAbout('section4.source3')}</li>
                  <li>{tAbout('section4.source4')}</li>
                </ul>
                <p className="text-cyan-300/60 italic">
                  {tAbout('section4.p4')}
                </p>
              </div>

              {/* SECTION 5 - 風險差 */}
              <div className="border-t border-cyan-300/20 pt-6">
                <h3 className="text-cyan-300/90 text-lg font-light mb-4">
                  <strong className="text-cyan-300/80">{tAbout('section5.title')}</strong>
                </h3>
                <p className="mb-3">{tAbout('section5.p1')}</p>
                <div className="p-4 bg-cyan-300/5 rounded-lg border border-cyan-300/10 mb-4">
                  <p className="text-cyan-300/80 font-light">
                    <strong>{tAbout('section5.highlight')}</strong>
                  </p>
                </div>
                <p className="mb-3">{tAbout('section5.p2')}</p>
                <div className="space-y-2 ml-4 mb-4">
                  <p>
                    <strong className="text-red-300/80">{tAbout('section5.danger')}</strong>
                  </p>
                  <p>
                    <strong className="text-yellow-300/80">{tAbout('section5.tension')}</strong>
                  </p>
                  <p>
                    <strong className="text-green-300/80">{tAbout('section5.safe')}</strong>
                  </p>
                </div>
                <p className="text-cyan-300/60 italic">
                  {tAbout('section5.p3')}
                </p>
              </div>

              {/* SECTION 6 - 全球共同體計畫 */}
              <div className="border-t border-cyan-300/20 pt-6">
                <h3 className="text-cyan-300/90 text-lg font-light mb-4">
                  <strong className="text-cyan-300/80">{tAbout('section6.title')}</strong>
                </h3>
                <p className="mb-3">
                  {tAbout('section6.p1')}
                </p>
                <p className="mb-3">{tAbout('section6.p2')}</p>
                <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                  <li><strong className="text-cyan-300/80">{tAbout('section6.item1')}</strong></li>
                  <li><strong className="text-cyan-300/80">{tAbout('section6.item2')}</strong></li>
                  <li><strong className="text-cyan-300/80">{tAbout('section6.item3')}</strong></li>
                  <li><strong className="text-cyan-300/80">{tAbout('section6.item4')}</strong></li>
                  <li><strong className="text-cyan-300/80">{tAbout('section6.item5')}</strong></li>
                  <li><strong className="text-cyan-300/80">{tAbout('section6.item6')}</strong></li>
                </ul>
                <p className="mb-3">{tAbout('section6.p3')}</p>
                <div className="p-4 bg-cyan-300/5 rounded-lg border border-cyan-300/10 mb-4">
                  <p className="text-cyan-300/80 font-light">
                    <strong>{tAbout('section6.highlight')}</strong>
                  </p>
                </div>
                <p className="mb-3">
                  {tAbout('section6.p4')}
                </p>
              </div>

              {/* SECTION 7 - 這不只是科技計畫 */}
              <div className="border-t border-cyan-300/20 pt-6">
                <h3 className="text-cyan-300/90 text-lg font-light mb-4">
                  <strong className="text-cyan-300/80">{tAbout('section7.title')}</strong>
                </h3>
                <p className="mb-3">{tAbout('section7.p1')}</p>
                <p className="mb-3">{tAbout('section7.p2')}</p>
                <p className="mb-4">{tAbout('section7.p3')}</p>
                <p className="mb-3">{tAbout('section7.p4')}</p>
                <div className="p-4 bg-cyan-300/5 rounded-lg border border-cyan-300/10 mb-4">
                  <p className="text-cyan-300/80 font-light">
                    <strong>{tAbout('section7.highlight')}</strong>
                  </p>
                </div>
                <p className="text-cyan-300/60 italic">
                  {tAbout('section7.p5')}
                </p>
              </div>

              {/* SECTION 8 - 加入我們 */}
              <div className="border-t border-cyan-300/20 pt-6">
                <h3 className="text-cyan-300/90 text-lg font-light mb-4">
                  <strong className="text-cyan-300/80">{tAbout('section8.title')}</strong>
                </h3>
                <p className="mb-3">{tAbout('section8.p1')}</p>
                <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                  <li>{tAbout('section8.item1')}</li>
                  <li>{tAbout('section8.item2')}</li>
                  <li>{tAbout('section8.item3')}</li>
                  <li>{tAbout('section8.item4')}</li>
                  <li>{tAbout('section8.item5')}</li>
                </ul>
                <p className="mb-4">
                  {tAbout('section8.p2')}
                </p>
                <div className="p-4 bg-cyan-300/5 rounded-lg border border-cyan-300/10 mb-4">
                  <p className="text-cyan-300/80 font-light text-center">
                    {tAbout('section8.highlight')}
                  </p>
                </div>
                <div className="text-center mt-6 pt-6 border-t border-cyan-300/20">
                  <p className="text-cyan-300/90 text-xl font-light tracking-wide">
                    {tAbout('section8.footer')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

