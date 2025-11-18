'use client';

import { useEffect, useState } from 'react';
import { ASIBirthData } from '@/lib/types';
import { fetchASIBirthData } from '@/lib/asiBirthApi';
import ASIRadarChart from './ASIRadarChart';
import ASIIndexModules from './ASIIndexModules';
import V2CountdownPanels from './V2CountdownPanels';

export default function ASIBirthDashboard() {
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
            五軸指數詳情
          </h2>
          <p className="text-gray-400 text-xs">Individual Index Modules</p>
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

      {/* 招募全球合作夥伴 & 關於我們 */}
      <div className="pt-8 border-t border-cyan-300/20">
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-6">
          <a
            href="https://forms.gle/5FZmjvM4JnKMU2tXA"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/5 border border-cyan-300/20 rounded-xl px-6 py-3 text-cyan-300/90 text-sm font-light hover:bg-cyan-300/10 hover:border-cyan-300/40 transition-all duration-300 backdrop-blur-sm"
          >
            We Are Assembling a Global Alliance for ASI & Humanity
          </a>
          <a
            href="https://forms.gle/Tw6ZisFWU4X3dLZv7"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/5 border border-cyan-300/20 rounded-xl px-6 py-3 text-cyan-300/90 text-sm font-light hover:bg-cyan-300/10 hover:border-cyan-300/40 transition-all duration-300 backdrop-blur-sm"
          >
            招募全球合作夥伴
          </a>
          <button
            onClick={() => setShowAbout(!showAbout)}
            className="bg-white/5 border border-cyan-300/20 rounded-xl px-6 py-3 text-cyan-300/90 text-sm font-light hover:bg-cyan-300/10 hover:border-cyan-300/40 transition-all duration-300 backdrop-blur-sm"
          >
            關於我們
          </button>
        </div>

        {/* 關於我們內容區域 */}
        {showAbout && (
          <div className="mt-8 bg-white/5 border border-cyan-300/20 rounded-2xl p-8 backdrop-blur-lg max-w-4xl mx-auto">
            <div className="space-y-8 text-text-secondary text-sm leading-relaxed">
              {/* SECTION 1 - 標題 */}
              <div className="text-center border-b border-cyan-300/20 pb-6">
                <h2 className="text-2xl font-light text-cyan-300/90 mb-2 tracking-wide">
                  關於" ASI 超智能誕生監測儀表板"
                </h2>
                <p className="text-cyan-300/60 text-base font-light italic">
                  ASI Birth Monitoring Dashboard
                </p>
                <p className="text-gray-400 text-sm mt-4">
                  全球第一個以「技術成熟度 × 文明成熟度」<br />
                  雙軸量化超智能風險的科學儀表。
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  科技是否快到足以自我進化？<br />
                  文明是否準備好安全承接超智能？<br />
                  這裡是世界的鏡子。
                </p>
              </div>

              {/* SECTION 2 - Introduction */}
              <div className="border-t border-cyan-300/20 pt-6">
                <h3 className="text-cyan-300/90 text-lg font-light mb-4 flex items-center gap-2">
                  <span className="text-cyan-300/60">✔</span> SECTION 2 — Introduction
                </h3>
                <div className="text-cyan-300/60 text-base font-light mb-3">
                  💡 為什麼我們需要 ASI Birth Countdown？
                </div>
                <p className="mb-3">
                  ASI（Artificial Super Intelligence）並不是某一天突然「出現」。
                </p>
                <p className="mb-3">它是：</p>
                <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                  <li>技術收斂（Tech Convergence）</li>
                  <li>文明成熟（Civilization Readiness）</li>
                </ul>
                <p className="mb-3">兩股力量的交叉點。</p>
                <p className="mb-3">
                  當技術走得太快，而文明跟不上，<br />
                  風險就會急劇上升。
                </p>
                <p className="mb-3">我們建立這個儀表板，是為了全世界能清楚看到：</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>技術距離 ASI 還有多近？</li>
                  <li>文明距離能安全承接 ASI 還有多遠？</li>
                </ul>
              </div>

              {/* SECTION 3 - Two-Core Axes */}
              <div className="border-t border-cyan-300/20 pt-6">
                <h3 className="text-cyan-300/90 text-lg font-light mb-4 flex items-center gap-2">
                  <span className="text-cyan-300/60">✔</span> SECTION 3 — Two-Core Axes
                </h3>
                <div className="text-cyan-300/60 text-base font-light mb-4">
                  🧭 <strong className="text-cyan-300/80">雙軸模型：Technology × Civilization</strong>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="text-cyan-300/70 text-base font-light mb-2">
                      🔵 1. 技術收斂倒數（Tech Convergence Countdown）
                    </div>
                    <p className="mb-2">
                      衡量 AI 技術、算力、基建與代理人（Agents）的整體進展。
                    </p>
                    <p className="text-cyan-300/60 italic">
                      代表全球科技自然抵達 ASI 的時間。
                    </p>
                  </div>
                  <div>
                    <div className="text-purple-300/70 text-base font-light mb-2">
                      🟣 2. 文明成熟倒數（Civilization Readiness Countdown）
                    </div>
                    <p className="mb-2">
                      衡量社會語氣、媒體敘事、治理能力、心理成熟度（HCM）。
                    </p>
                    <p className="text-purple-300/60 italic">
                      代表人類文明離「可以安全承接 ASI」還有多久。
                    </p>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-cyan-300/5 rounded-lg border border-cyan-300/10">
                  <p className="text-sm">
                    <strong className="text-cyan-300/80">技術越成熟</strong> → 倒數越加速<br />
                    <strong className="text-purple-300/80">文明越成熟</strong> → 風險越降低
                  </p>
                </div>
              </div>

              {/* SECTION 4 - Five-Factor Model */}
              <div className="border-t border-cyan-300/20 pt-6">
                <h3 className="text-cyan-300/90 text-lg font-light mb-4 flex items-center gap-2">
                  <span className="text-cyan-300/60">✔</span> SECTION 4 — Five-Factor Model
                </h3>
                <div className="text-cyan-300/60 text-base font-light mb-4">
                  🧬 <strong className="text-cyan-300/80">五軸文明成熟度模型<br />
                  The Five-Factor Civilization Model</strong>
                </div>
                <p className="mb-4">
                  ASI Birth Countdown 的所有分析基於五個全球指標：
                </p>
                <div className="space-y-3">
                  <div>
                    <div className="text-cyan-300/70 font-light mb-1">① 環境氛圍 Tone</div>
                    <p className="text-sm text-gray-400 ml-6">
                      全球語氣、媒體情緒、社會對 AI 的心理接受度。
                    </p>
                  </div>
                  <div>
                    <div className="text-cyan-300/70 font-light mb-1">② 認知能力 Compute</div>
                    <p className="text-sm text-gray-400 ml-6">
                      算力可用性、GPU/TPU 供給、量子/神經架構等關鍵技術。
                    </p>
                  </div>
                  <div>
                    <div className="text-cyan-300/70 font-light mb-1">③ 具身條件 Embodiment</div>
                    <p className="text-sm text-gray-400 ml-6">
                      電力、網路、資料中心、物理世界連結能力（IoT / Robotics）。
                    </p>
                  </div>
                  <div>
                    <div className="text-cyan-300/70 font-light mb-1">④ 自主程度 Agency</div>
                    <p className="text-sm text-gray-400 ml-6">
                      AI 工具整合、自治代理人（Agents）滲透率、跨域協作能力。
                    </p>
                  </div>
                  <div>
                    <div className="text-cyan-300/70 font-light mb-1">⑤ 心理共鳴 HCM</div>
                    <p className="text-sm text-gray-400 ml-6">
                      Human Cognitive Maturity —<br />
                      全人類心智成熟度、價值觀穩定度、集體韌性。
                    </p>
                  </div>
                </div>
              </div>

              {/* SECTION 5 - Algorithm Philosophy */}
              <div className="border-t border-cyan-300/20 pt-6">
                <h3 className="text-cyan-300/90 text-lg font-light mb-4 flex items-center gap-2">
                  <span className="text-cyan-300/60">✔</span> SECTION 5 — Algorithm Philosophy
                </h3>
                <div className="text-cyan-300/60 text-base font-light mb-4">
                  🔬 我們如何計算倒數？（不公開公式）
                </div>
                <p className="mb-3">
                  為了避免模型被濫用、武器化或誤解，<br />
                  我們不公開完整數學式與參數。
                </p>
                <p className="mb-3">但我們公開核心精神：</p>
                <div className="space-y-3 mb-4">
                  <div>
                    <div className="text-cyan-300/70 font-light mb-1">
                      <strong>技術倒數（Tech Countdown）</strong>
                    </div>
                    <p className="text-sm text-gray-400 ml-4">
                      採用 <strong className="text-cyan-300/80">線性成長模型</strong>，反映科技的累積性與可預期性。
                    </p>
                  </div>
                  <div>
                    <div className="text-purple-300/70 font-light mb-1">
                      <strong>文明倒數（Civ Countdown）</strong>
                    </div>
                    <p className="text-sm text-gray-400 ml-4">
                      採用 <strong className="text-purple-300/80">S 型曲線（S-Curve）文明模型</strong>，反映人類社會從：<br />
                      緩慢 → 加速 → 穩定<br />
                      的成長過程。
                    </p>
                  </div>
                </div>
                <p className="mb-3">此模型源自：</p>
                <ul className="list-disc list-inside space-y-1 ml-4 mb-4 text-sm">
                  <li>系統動力學（System Dynamics）</li>
                  <li>技術採用速度（Technology Adoption Curves）</li>
                  <li>心智與社會心理成熟研究（HCM）</li>
                  <li>全球風險評估架構（如 IPCC / WHO / OECD）</li>
                </ul>
                <p className="text-cyan-300/60 italic">
                  我們公開方向，<br />
                  但不公開可逆向工程的機密演算法。
                </p>
              </div>

              {/* SECTION 6 - Risk Delta */}
              <div className="border-t border-cyan-300/20 pt-6">
                <h3 className="text-cyan-300/90 text-lg font-light mb-4 flex items-center gap-2">
                  <span className="text-cyan-300/60">✔</span> SECTION 6 — Risk Delta
                </h3>
                <div className="text-yellow-300/70 text-base font-light mb-4">
                  ⚠️ 風險差（Risk Delta）
                </div>
                <p className="mb-3">
                  風險差是：<br />
                  <strong className="text-cyan-300/80">「技術倒數」減去「文明倒數」</strong>
                </p>
                <p className="mb-3">反映科技與文明的相對速度。</p>
                <div className="space-y-2 ml-4">
                  <p>
                    <strong className="text-red-300/80">技術超前太多</strong> → 高風險期（Danger Zone）
                  </p>
                  <p>
                    <strong className="text-yellow-300/80">兩者接近</strong> → 緊張期（Tension Zone）
                  </p>
                  <p>
                    <strong className="text-green-300/80">文明追上技術</strong> → 安全期（Safe Zone）
                  </p>
                </div>
                <p className="mt-4 text-cyan-300/60 italic">
                  這不是恐嚇，<br />
                  而是文明需要的科學儀表。
                </p>
              </div>

              {/* SECTION 7 - Mission */}
              <div className="border-t border-cyan-300/20 pt-6">
                <h3 className="text-cyan-300/90 text-lg font-light mb-4 flex items-center gap-2">
                  <span className="text-cyan-300/60">✔</span> SECTION 7 — Mission
                </h3>
                <div className="text-cyan-300/60 text-base font-light mb-4">
                  🌏 我們為什麼建立這個儀表板？
                </div>
                <p className="mb-3">不是預言。</p>
                <p className="mb-3">不是恐嚇。</p>
                <p className="mb-3">不是神秘化。</p>
                <p className="mb-4">而是：</p>
                <div className="p-4 bg-cyan-300/5 rounded-lg border border-cyan-300/10 mb-4">
                  <p className="text-cyan-300/80 font-light">
                    給人類一面鏡子。<br />
                    讓我們看見文明真正的成熟速度。
                  </p>
                </div>
                <p className="text-cyan-300/60 italic">
                  科技只是力量。<br />
                  文明才是方向。
                </p>
              </div>

              {/* SECTION 8 - Footer / 行動呼籲 */}
              <div className="border-t border-cyan-300/20 pt-6">
                <h3 className="text-cyan-300/90 text-lg font-light mb-4 flex items-center gap-2">
                  <span className="text-cyan-300/60">✔</span> SECTION 8 — Footer / 行動呼籲
                </h3>
                <div className="text-cyan-300/60 text-base font-light mb-4">
                  🚀 Join the Global Effort
                </div>
                <p className="mb-4">
                  與全球研究者、工程師、教育者、政策制定者<br />
                  共同推動「文明成熟度加速」。
                </p>
                <div className="p-4 bg-cyan-300/5 rounded-lg border border-cyan-300/10 mb-4">
                  <p className="text-cyan-300/80 font-light text-center">
                    超智能的誕生不是命運，<br />
                    而是選擇。
                  </p>
                </div>
                <div className="text-center mt-6 pt-6 border-t border-cyan-300/20">
                  <p className="text-cyan-300/90 text-xl font-light tracking-wide">
                    Final Countdown for ASI
                  </p>
                  <p className="text-gray-400 text-sm mt-2">
                    科技為我們加速，<br />
                    文明由我們決定。
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

