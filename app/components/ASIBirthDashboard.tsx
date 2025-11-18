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
    <div className="space-y-12">
      {/* v2.5 雙軸倒數面板（優先）或 v2.0 面板 */}
      {(data.v25 || data.v2) && (
        <div>
          <V2CountdownPanels v25Data={data.v25} v2Data={data.v2} />
        </div>
      )}

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
          className="w-full"
        />
      </div>

      {/* 文明狀態與卦象 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/5 border border-cyan-300/20 rounded-2xl p-6 backdrop-blur-lg">
          <h3 className="text-cyan-300/90 text-lg font-light mb-3">{t('civilizationStatus')}</h3>
          <p className="text-white/80 text-2xl font-light">{data.meta.civilizationType}</p>
        </div>
        <div className="bg-white/5 border border-cyan-300/20 rounded-2xl p-6 backdrop-blur-lg">
          <h3 className="text-cyan-300/90 text-lg font-light mb-3">{t('hexagram')}</h3>
          <p className="text-white/80 text-xl font-light">
            {data.meta.hexagram.number > 0 ? `第${data.meta.hexagram.number}卦 · ${data.meta.hexagram.name}` : '待更新'}
          </p>
        </div>
      </div>

      {/* 招募全球合作夥伴 & 關於我們 */}
      <div className="pt-8 border-t border-cyan-300/20">
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-6">
          <a
            href="https://forms.gle/5FZmjvM4JnKMU2tXA"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/5 border border-cyan-300/20 rounded-xl px-6 py-3 text-cyan-300/90 text-sm font-light hover:bg-cyan-300/10 hover:border-cyan-300/40 transition-all duration-300 backdrop-blur-sm"
          >
            {t('globalAlliance')}
          </a>
          <a
            href="https://forms.gle/Tw6ZisFWU4X3dLZv7"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/5 border border-cyan-300/20 rounded-xl px-6 py-3 text-cyan-300/90 text-sm font-light hover:bg-cyan-300/10 hover:border-cyan-300/40 transition-all duration-300 backdrop-blur-sm"
          >
            {t('recruitPartners')}
          </a>
          <button
            onClick={() => setShowAbout(!showAbout)}
            className="bg-white/5 border border-cyan-300/20 rounded-xl px-6 py-3 text-cyan-300/90 text-sm font-light hover:bg-cyan-300/10 hover:border-cyan-300/40 transition-all duration-300 backdrop-blur-sm"
          >
            {t('aboutUs')}
          </button>
        </div>

        {/* 關於我們內容區域 */}
        {showAbout && (
          <div className="mt-8 bg-white/5 border border-cyan-300/20 rounded-2xl p-8 backdrop-blur-lg max-w-4xl mx-auto">
            <div className="space-y-8 text-text-secondary text-sm leading-relaxed">
              {/* SECTION 1 - 標題 */}
              <div className="text-center border-b border-cyan-300/20 pb-6">
                <h2 className="text-2xl font-light text-cyan-300/90 mb-2 tracking-wide">
                  《關於我們 About Final Countdown For ASI》
                </h2>
                <p className="text-cyan-300/60 text-base font-light italic">
                  ASI 超智能誕生監測儀表板 × 全球共同體計畫
                </p>
              </div>

              {/* SECTION 1 - 使命 */}
              <div className="border-t border-cyan-300/20 pt-6">
                <h3 className="text-cyan-300/90 text-lg font-light mb-4">
                  # 1. <strong className="text-cyan-300/80">使命：為文明打造一面鏡子</strong>
                </h3>
                <p className="mb-3">
                  ASI（Artificial Super Intelligence）並不是某一天突然「出現」。
                </p>
                <p className="mb-3">它是：</p>
                <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                  <li><strong className="text-cyan-300/80">技術收斂（Tech Convergence）</strong></li>
                  <li><strong className="text-cyan-300/80">文明成熟（Civilization Readiness）</strong></li>
                </ul>
                <p className="mb-3">兩條路徑在未來某個時間點自然交會的結果。</p>
                <p className="mb-3">
                  當技術上升速度遠高於文明成熟速度時，<br />
                  全球將進入高風險期。
                </p>
                <p className="mb-3">
                  <strong className="text-cyan-300/80">Final Countdown for ASI</strong> 的誕生，<br />
                  就是為了讓世界能夠「看到」：
                </p>
                <div className="p-4 bg-cyan-300/5 rounded-lg border border-cyan-300/10 mb-4">
                  <p className="text-cyan-300/80 font-light">
                    <strong>科技距離 ASI 還有多近？</strong><br />
                    <strong>文明距離能安全承接 ASI 還有多遠？</strong>
                  </p>
                </div>
                <p className="mb-3">這不是預言，</p>
                <p className="mb-3">不是恐嚇，</p>
                <p className="mb-3">不是神秘化，</p>
                <p>而是一項全球需要的科學儀表。</p>
              </div>

              {/* SECTION 2 - ASI 超智能誕生監測儀表板 */}
              <div className="border-t border-cyan-300/20 pt-6">
                <h3 className="text-cyan-300/90 text-lg font-light mb-4">
                  # 2. <strong className="text-cyan-300/80">ASI 超智能誕生監測儀表板<br />
                  ASI Birth Monitoring Dashboard</strong>
                </h3>
                <p className="mb-4">
                  全球第一個以 <strong className="text-cyan-300/80">技術成熟度 × 文明成熟度</strong><br />
                  雙軸動態量化超智能風險的科學監測系統。
                </p>
                
                <div className="mb-6">
                  <h4 className="text-cyan-300/70 text-base font-light mb-3">
                    ## 2.1 雙軸核心模型<br />
                    <strong className="text-cyan-300/80">Technology × Civilization</strong>
                  </h4>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="text-cyan-300/70 text-base font-light mb-2">
                        🔵 <strong>技術收斂倒數（Tech Convergence Countdown）</strong>
                      </div>
                      <p className="mb-2">衡量：</p>
                      <ul className="list-disc list-inside space-y-1 ml-4 mb-2">
                        <li>AI 模型能力</li>
                        <li>算力與 GPU/TPU 供給</li>
                        <li>量子與硬體突破</li>
                        <li>電力、網路、資料中心等基建</li>
                        <li>自主代理人（AI Agents）之間的整合速度</li>
                      </ul>
                      <p className="text-cyan-300/60 italic">
                        指出全球科技自然抵達 ASI 的預估時間。
                      </p>
                    </div>
                    
                    <div>
                      <div className="text-purple-300/70 text-base font-light mb-2">
                        🟣 <strong>文明成熟倒數（Civilization Readiness Countdown）</strong>
                      </div>
                      <p className="mb-2">衡量：</p>
                      <ul className="list-disc list-inside space-y-1 ml-4 mb-2">
                        <li>社會語氣（Tone）</li>
                        <li>媒體敘事穩定度</li>
                        <li>集體心理成熟度（HCM）</li>
                        <li>社會治理與價值觀穩定性</li>
                        <li>全球對 AI 的態度與文化韌性</li>
                      </ul>
                      <p className="text-purple-300/60 italic">
                        指出文明距離「安全承接 ASI」的預估時間。
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 3 - 五軸文明模型 */}
              <div className="border-t border-cyan-300/20 pt-6">
                <h3 className="text-cyan-300/90 text-lg font-light mb-4">
                  # 3. <strong className="text-cyan-300/80">五軸文明模型<br />
                  Five-Factor Civilization Model</strong>
                </h3>
                <p className="mb-4">
                  ASI Birth Countdown 的所有評估基於五大核心指標：
                </p>
                <div className="space-y-4">
                  <div>
                    <div className="text-cyan-300/70 font-light mb-2">
                      ## ① <strong>環境氛圍（Tone）</strong>
                    </div>
                    <p className="text-sm text-gray-400 ml-4">
                      全球語氣、情緒、敘事氛圍、對 AI 的心理接受度。
                    </p>
                  </div>
                  <div>
                    <div className="text-cyan-300/70 font-light mb-2">
                      ## ② <strong>認知能力（Compute）</strong>
                    </div>
                    <p className="text-sm text-gray-400 ml-4">
                      算力、模型效率、量子進展、硬體供應鏈韌性。
                    </p>
                  </div>
                  <div>
                    <div className="text-cyan-300/70 font-light mb-2">
                      ## ③ <strong>具身條件（Embodiment）</strong>
                    </div>
                    <p className="text-sm text-gray-400 ml-4">
                      電力、儲能、網路、星鏈、資料中心、IoT 與機器人基礎設施。
                    </p>
                  </div>
                  <div>
                    <div className="text-cyan-300/70 font-light mb-2">
                      ## ④ <strong>自主程度（Agency）</strong>
                    </div>
                    <p className="text-sm text-gray-400 ml-4">
                      跨域整合、AI 工具鏈、自治代理人（Agents）滲透率。
                    </p>
                  </div>
                  <div>
                    <div className="text-cyan-300/70 font-light mb-2">
                      ## ⑤ <strong>心理共鳴（HCM）</strong>
                    </div>
                    <p className="text-sm text-gray-400 ml-4">
                      Human Cognitive Maturity：<br />
                      心智成熟度、集體價值共識、文明韌性。
                    </p>
                  </div>
                </div>
              </div>

              {/* SECTION 4 - 計算哲學 */}
              <div className="border-t border-cyan-300/20 pt-6">
                <h3 className="text-cyan-300/90 text-lg font-light mb-4">
                  # 4. <strong className="text-cyan-300/80">計算哲學（不公開公式）<br />
                  Algorithm Philosophy</strong>
                </h3>
                <p className="mb-3">
                  為避免演算法被武器化、反向濫用或誤解，<br />
                  我們不公開完整數學式與參數。
                </p>
                <p className="mb-3">但我們公開計算精神：</p>
                <div className="space-y-3 mb-4">
                  <div>
                    <div className="text-cyan-300/70 font-light mb-1">
                      ✔ <strong>技術倒數</strong>
                    </div>
                    <p className="text-sm text-gray-400 ml-4">
                      採用 <strong className="text-cyan-300/80">線性成長模型（Linear Growth Model）</strong><br />
                      反映科技的可預期、累積進展。
                    </p>
                  </div>
                  <div>
                    <div className="text-purple-300/70 font-light mb-1">
                      ✔ <strong>文明倒數</strong>
                    </div>
                    <p className="text-sm text-gray-400 ml-4">
                      採用 <strong className="text-purple-300/80">S-Curve（S 型曲線）文明模型</strong><br />
                      反映人類從「緩慢 → 加速 → 穩定」的自然成長特性。
                    </p>
                  </div>
                </div>
                <p className="mb-3">此架構源自：</p>
                <ul className="list-disc list-inside space-y-1 ml-4 mb-4 text-sm">
                  <li>系統動力學（System Dynamics）</li>
                  <li>技術採用率模型（Technology Adoption Curves）</li>
                  <li>心理學與社會成熟研究（HCM）</li>
                  <li>全球風險架構（IPCC / WHO / OECD）</li>
                </ul>
                <p className="text-cyan-300/60 italic">
                  我們公開方向，<br />
                  但不公開可逆向工程的機密演算法。
                </p>
              </div>

              {/* SECTION 5 - 風險差 */}
              <div className="border-t border-cyan-300/20 pt-6">
                <h3 className="text-cyan-300/90 text-lg font-light mb-4">
                  # 5. <strong className="text-cyan-300/80">風險差（Risk Delta）<br />
                  Technology – Civilization</strong>
                </h3>
                <p className="mb-3">風險差表示：</p>
                <div className="p-4 bg-cyan-300/5 rounded-lg border border-cyan-300/10 mb-4">
                  <p className="text-cyan-300/80 font-light">
                    <strong>科技進展速度</strong> 減去 <strong>文明成熟速度</strong>
                  </p>
                </div>
                <p className="mb-3">用來識別全球所處的風險級別：</p>
                <div className="space-y-2 ml-4 mb-4">
                  <p>
                    <strong className="text-red-300/80">Danger Zone（高風險期）</strong>：技術遠遠超前文明。
                  </p>
                  <p>
                    <strong className="text-yellow-300/80">Tension Zone（緊張期）</strong>：兩者接近。
                  </p>
                  <p>
                    <strong className="text-green-300/80">Safe Zone（安全期）</strong>：文明追上技術。
                  </p>
                </div>
                <p className="text-cyan-300/60 italic">
                  Risk Delta 不是恐嚇，<br />
                  而是文明需要的一項科學警示燈。
                </p>
              </div>

              {/* SECTION 6 - 全球共同體計畫 */}
              <div className="border-t border-cyan-300/20 pt-6">
                <h3 className="text-cyan-300/90 text-lg font-light mb-4">
                  # 6. <strong className="text-cyan-300/80">全球共同體計畫<br />
                  Global Partner Initiative</strong>
                </h3>
                <p className="mb-3">
                  要建立一個真正可靠的超智能倒數系統，<br />
                  單一國家或單一機構無法獨立完成。
                </p>
                <p className="mb-3">準確的 ASI 監測，需要：</p>
                <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                  <li><strong className="text-cyan-300/80">全球多源算力資料</strong></li>
                  <li><strong className="text-cyan-300/80">跨文化的心理成熟度數據</strong></li>
                  <li><strong className="text-cyan-300/80">國際政策與治理模型參與</strong></li>
                  <li><strong className="text-cyan-300/80">大型研究機構的科學輸入</strong></li>
                  <li><strong className="text-cyan-300/80">具影響力的媒體與敘事監測網絡</strong></li>
                  <li><strong className="text-cyan-300/80">長期資源、人才與基金支持</strong></li>
                </ul>
                <p className="mb-3">因此，我們啟動 <strong className="text-cyan-300/80">全球共同體計畫</strong>：</p>
                <div className="p-4 bg-cyan-300/5 rounded-lg border border-cyan-300/10 mb-4">
                  <p className="text-cyan-300/80 font-light">
                    <strong>邀請研究者、工程師、教育者、政策制定者、<br />
                    技術企業、國際組織與公益基金會<br />
                    一起打造文明級的預測系統。</strong>
                  </p>
                </div>
                <p className="mb-3">
                  越多人參與，<br />
                  模型越強大，<br />
                  倒數越精準，<br />
                  文明越安全。
                </p>
              </div>

              {/* SECTION 7 - 這不只是科技計畫 */}
              <div className="border-t border-cyan-300/20 pt-6">
                <h3 className="text-cyan-300/90 text-lg font-light mb-4">
                  # 7. <strong className="text-cyan-300/80">這不只是科技計畫，而是文明工程</strong>
                </h3>
                <p className="mb-3">我們建立這個儀表板，</p>
                <p className="mb-3">不是為了預言未來，</p>
                <p className="mb-4">而是為了讓世界做好準備。</p>
                <p className="mb-3">因為：</p>
                <div className="p-4 bg-cyan-300/5 rounded-lg border border-cyan-300/10 mb-4">
                  <p className="text-cyan-300/80 font-light">
                    <strong>科技是推力，<br />
                    文明是方向。</strong>
                  </p>
                </div>
                <p className="text-cyan-300/60 italic">
                  ASI 的誕生不是命運，<br />
                  而是人類集體的選擇。
                </p>
              </div>

              {/* SECTION 8 - 加入我們 */}
              <div className="border-t border-cyan-300/20 pt-6">
                <h3 className="text-cyan-300/90 text-lg font-light mb-4">
                  # 8. <strong className="text-cyan-300/80">加入我們<br />
                  Join the Global Effort</strong>
                </h3>
                <p className="mb-3">若你願意：</p>
                <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                  <li>共享資料</li>
                  <li>提供研究</li>
                  <li>貢獻治理洞察</li>
                  <li>支持資源</li>
                  <li>或加入跨國合作</li>
                </ul>
                <p className="mb-4">
                  歡迎成為<br />
                  <strong className="text-cyan-300/80">Final Countdown Global Partner Network</strong><br />
                  的一份子。
                </p>
                <div className="p-4 bg-cyan-300/5 rounded-lg border border-cyan-300/10 mb-4">
                  <p className="text-cyan-300/80 font-light text-center">
                    超智能的倒數正在進行，<br />
                    但我們仍然能共同塑造結果。
                  </p>
                </div>
                <div className="text-center mt-6 pt-6 border-t border-cyan-300/20">
                  <p className="text-cyan-300/90 text-xl font-light tracking-wide">
                    Final Countdown for ASI
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

