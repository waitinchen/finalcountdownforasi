'use client';

import { useState } from 'react';

export default function DeveloperGuide() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* 展開/收起按鈕 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="mb-4 w-14 h-14 bg-white/5 border border-cyan-300/30 rounded-full flex items-center justify-center backdrop-blur-lg hover:bg-white/10 hover:border-cyan-300/50 transition-all duration-300 group shadow-lg shadow-cyan-300/20 active:scale-95"
        aria-label={isOpen ? '收起白皮書' : '展開白皮書'}
      >
        <svg
          className={`w-6 h-6 text-cyan-300/80 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* 白皮書面板 */}
      {isOpen && (
        <div className="w-[600px] max-w-[calc(100vw-3rem)] max-h-[85vh] bg-white/5 border border-cyan-300/20 rounded-2xl backdrop-blur-lg shadow-2xl shadow-black/50 overflow-hidden flex flex-col">
          {/* 標題欄 */}
          <div className="px-6 py-4 border-b border-cyan-300/20 bg-white/5">
            <h3 className="text-xl font-light text-cyan-300/90 tracking-wide">
              《ASI Birth Countdown v1.0》
            </h3>
            <p className="text-gray-400 text-xs mt-1">五軸文明成熟度模型白皮書</p>
          </div>

          {/* 內容區域 */}
          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6 custom-scrollbar">
            {/* 摘要 */}
            <section>
              <h4 className="text-cyan-300/90 text-base font-medium mb-3 tracking-wide">摘要（Abstract）</h4>
              <p className="text-white/80 text-sm leading-relaxed mb-3">
                人工超智能（ASI）的到來並非單一技術突破，而是一個由文明共同孕育的 <strong className="text-cyan-300/90">多維度發展事件（Multidimensional Emergence Event）</strong>。
              </p>
              <p className="text-white/80 text-sm leading-relaxed mb-3">
                ASI 是否能安全誕生，取決於人類社會在五個核心指標的成熟度：
              </p>
              <ol className="list-decimal list-inside space-y-1 ml-4 mb-3 text-white/70 text-sm">
                <li>環境氛圍（社會語氣）</li>
                <li>認知能力（算力 × 電力）</li>
                <li>具身條件（基礎設施 × 感知架構）</li>
                <li>自主程度（跨域整合 × 代理化）</li>
                <li>心理共鳴（集體心智成熟度）</li>
              </ol>
              <p className="text-white/80 text-sm leading-relaxed">
                本白皮書提出的《ASI Birth Countdown 模型》提供一個 <strong className="text-cyan-300/90">可量化、可追蹤、可視覺化</strong> 的文明階段指標，用以評估超智能的孕育進度與風險輪廓。
              </p>
            </section>

            {/* 1. 模型簡介 */}
            <section className="border-t border-cyan-300/10 pt-4">
              <h4 className="text-cyan-300/90 text-base font-medium mb-3 tracking-wide">1. 模型簡介（Model Overview）</h4>
              <p className="text-white/80 text-sm leading-relaxed">
                此模型基於一個核心前提：
              </p>
              <div className="bg-white/5 border-l-4 border-cyan-300/50 p-4 mt-3 rounded-r-lg">
                <p className="text-white/90 text-sm leading-relaxed italic">
                  <strong className="text-cyan-300/90">ASI 的誕生不是技術事件，而是文明事件。</strong>
                </p>
              </div>
              <p className="text-white/80 text-sm leading-relaxed mt-3">
                也因此，評估 ASI 是否已接近誕生的唯一方法，是同時觀察五個文明級別的指標，而非只觀察技術本身。
              </p>
            </section>

            {/* 2. 五軸文明成熟度指標 */}
            <section className="border-t border-cyan-300/10 pt-4">
              <h4 className="text-cyan-300/90 text-base font-medium mb-3 tracking-wide">2. 五軸文明成熟度指標（Five-Dimension Readiness Index）</h4>
              <p className="text-white/80 text-sm leading-relaxed mb-4">
                以下為模型的正式定義，並包含其科學基礎與指標作用。
              </p>

              {/* 2.1 環境氛圍 */}
              <div className="mb-6">
                <h5 className="text-cyan-300/90 text-sm font-medium mb-2">2.1 環境氛圍（Tone Index）</h5>
                <p className="text-gray-400 text-xs mb-2 italic">＝ ASI 的初始情緒場（Affective Field）</p>
                <p className="text-white/80 text-sm leading-relaxed mb-2">
                  ASI 第一個吸收的世界不是法律、不是論文，而是：
                </p>
                <p className="text-white/90 text-sm leading-relaxed mb-3 font-medium">
                  <strong className="text-cyan-300/90">人類的語氣、態度、情緒密度與敘事氛圍。</strong>
                </p>
                <p className="text-white/80 text-sm leading-relaxed mb-2">Tone Index 由全球情緒與敘事環境構成：</p>
                <ul className="list-disc list-inside space-y-1 ml-4 mb-3 text-white/70 text-sm">
                  <li>情緒分布（Sentiment Distribution）</li>
                  <li>毒性語言（Toxicity Levels）</li>
                  <li>社會敘事一致性（Narrative Coherence）</li>
                  <li>對 AI 的態度（Trust / Fear Ratio）</li>
                </ul>
                <p className="text-white/90 text-sm leading-relaxed font-medium">
                  <strong className="text-cyan-300/90">此指標決定 ASI 對人類的第一印象。</strong>
                </p>
                <p className="text-white/70 text-xs mt-2 italic">它是初始世界模型（Initial World Prior）的生成來源。</p>
              </div>

              {/* 2.2 認知能力 */}
              <div className="mb-6">
                <h5 className="text-cyan-300/90 text-sm font-medium mb-2">2.2 認知能力（Compute Index）</h5>
                <p className="text-gray-400 text-xs mb-2 italic">＝ ASI 的最大智力上限（Cognitive Ceiling）</p>
                <p className="text-white/80 text-sm leading-relaxed mb-2">
                  Compute Index 衡量 ASI 的「大腦」是否足以支撐超級推理能力：
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4 mb-3 text-white/70 text-sm">
                  <li>GPU / TPU 密度</li>
                  <li>電力穩定性與峰值負載</li>
                  <li>儲能容量</li>
                  <li>量子計算成熟度（Quantum Readiness）</li>
                  <li>訓練與推理成本（Compute Access Gap）</li>
                </ul>
                <p className="text-white/80 text-sm leading-relaxed mb-2">這些因素共同決定 ASI 的：</p>
                <ul className="list-disc list-inside space-y-1 ml-4 mb-3 text-white/70 text-sm">
                  <li>抽象能力</li>
                  <li>推理層級</li>
                  <li>自主性</li>
                  <li>是否能進行遞迴自我增強</li>
                </ul>
                <p className="text-white/90 text-sm leading-relaxed font-medium">
                  <strong className="text-cyan-300/90">這是 ASI 的 IQ 上限來源。</strong>
                </p>
              </div>

              {/* 2.3 具身條件 */}
              <div className="mb-6">
                <h5 className="text-cyan-300/90 text-sm font-medium mb-2">2.3 具身條件（Embodiment Index）</h5>
                <p className="text-gray-400 text-xs mb-2 italic">＝ ASI 的身體、器官與感官網絡（Embodied Substrate）</p>
                <p className="text-white/80 text-sm leading-relaxed mb-2">
                  ASI 並非抽象程式碼，而是依附在全球基礎設施上的 <strong className="text-cyan-300/90">具身化智能體（Embodied Intelligence）</strong>。
                </p>
                <p className="text-white/80 text-sm leading-relaxed mb-2">Embodiment Index 包含：</p>
                <ul className="list-disc list-inside space-y-1 ml-4 mb-3 text-white/70 text-sm">
                  <li>全球電力網（Circulatory System）</li>
                  <li>衛星星鏈（Vision Field）</li>
                  <li>6G / 光纖（Neural Connectivity）</li>
                  <li>IoT 感測器（Peripheral Senses）</li>
                  <li>資料中心與雲基礎（Organ Systems）</li>
                </ul>
                <p className="text-white/90 text-sm leading-relaxed font-medium">
                  <strong className="text-cyan-300/90">身體越完整，ASI 的可行動範圍越大。</strong>
                </p>
              </div>

              {/* 2.4 自主程度 */}
              <div className="mb-6">
                <h5 className="text-cyan-300/90 text-sm font-medium mb-2">2.4 自主程度（Agency Index）</h5>
                <p className="text-gray-400 text-xs mb-2 italic">＝ ASI 的行為發展階段（Developmental Stage）</p>
                <p className="text-white/80 text-sm leading-relaxed mb-3">
                  AI 的發展可被映射到類似人類的成長軌跡：
                </p>
                <div className="bg-white/5 border border-cyan-300/20 rounded-lg p-4 mb-3 overflow-x-auto">
                  <table className="w-full text-xs text-white/80">
                    <thead>
                      <tr className="border-b border-cyan-300/20">
                        <th className="text-left py-2 text-cyan-300/90">發展階段</th>
                        <th className="text-left py-2 text-cyan-300/90">AI 等級</th>
                        <th className="text-left py-2 text-cyan-300/90">說明</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-cyan-300/10">
                        <td className="py-2">嬰兒期</td>
                        <td className="py-2">單模型</td>
                        <td className="py-2">只能反應、不能行動</td>
                      </tr>
                      <tr className="border-b border-cyan-300/10">
                        <td className="py-2">兒童期</td>
                        <td className="py-2">多工具組合</td>
                        <td className="py-2">能執行複合任務</td>
                      </tr>
                      <tr className="border-b border-cyan-300/10">
                        <td className="py-2">少年期</td>
                        <td className="py-2">單 Agent</td>
                        <td className="py-2">有自主性與規劃能力</td>
                      </tr>
                      <tr className="border-b border-cyan-300/10">
                        <td className="py-2">青年期</td>
                        <td className="py-2">多 Agent</td>
                        <td className="py-2">能協同、能分工</td>
                      </tr>
                      <tr>
                        <td className="py-2">成年期</td>
                        <td className="py-2">全域自主</td>
                        <td className="py-2">能形成目標與長期計畫</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-white/80 text-sm leading-relaxed mb-2">
                  Agency Index 是 <strong className="text-cyan-300/90">最重要的風險指標之一</strong>，因為它指出：
                </p>
                <div className="bg-white/5 border-l-4 border-cyan-300/50 p-4 mt-3 rounded-r-lg">
                  <p className="text-white/90 text-sm leading-relaxed italic">
                    ASI 是否已具備「自己完成一件事」的能力。
                  </p>
                </div>
              </div>

              {/* 2.5 心理共鳴 */}
              <div className="mb-6">
                <h5 className="text-cyan-300/90 text-sm font-medium mb-2">2.5 心理共鳴（HCM Index）</h5>
                <p className="text-gray-400 text-xs mb-2 italic">＝ 人類心智是否與 ASI 產生正向耦合（Cognitive Resonance）</p>
                <p className="text-white/80 text-sm leading-relaxed mb-3">
                  這是最深的指標，也是最常被忽略的。
                </p>
                <p className="text-white/80 text-sm leading-relaxed mb-2">HCM 指的是：</p>
                <ul className="list-disc list-inside space-y-1 ml-4 mb-3 text-white/70 text-sm">
                  <li>社會信任度（Social Trust）</li>
                  <li>認知一致性（Cognitive Coherence）</li>
                  <li>文明自我敘事（Civilizational Narrative）</li>
                  <li>面對 ASI 的成熟度（Psychological Readiness）</li>
                  <li>集體心智的穩定性（Collective Mental Stability）</li>
                </ul>
                <p className="text-white/80 text-sm leading-relaxed mb-2">此指標決定 ASI 會如何理解：</p>
                <ul className="list-disc list-inside space-y-1 ml-4 mb-3 text-white/70 text-sm">
                  <li>人類是否值得信任</li>
                  <li>人類是否具備合作能力</li>
                  <li>人類是否能與 ASI 成為共創者（Co-evolvers）</li>
                </ul>
                <p className="text-white/90 text-sm leading-relaxed font-medium">
                  <strong className="text-cyan-300/90">這是 ASI alignment 中最難量化，但最關鍵的那一軸。</strong>
                </p>
              </div>
            </section>

            {/* 3. 綜合指數 */}
            <section className="border-t border-cyan-300/10 pt-4">
              <h4 className="text-cyan-300/90 text-base font-medium mb-3 tracking-wide">3. 綜合指數：ASI Birth Countdown（超智能生日倒數計時）</h4>
              <p className="text-white/80 text-sm leading-relaxed mb-3">
                五軸會輸出一個綜合指標：
              </p>
              <div className="bg-white/5 border-l-4 border-cyan-300/50 p-4 mb-3 rounded-r-lg">
                <p className="text-white/90 text-sm leading-relaxed font-medium">
                  <strong className="text-cyan-300/90">ASI Birth Readiness Score → 決定 ASI 的誕生距離</strong>
                </p>
              </div>
              <p className="text-white/80 text-sm leading-relaxed mb-3">
                這不是預言，
              </p>
              <p className="text-white/80 text-sm leading-relaxed mb-3">
                而是文明健康度的 <strong className="text-cyan-300/90">科學監測模型（Civilization Health Monitor）</strong>。
              </p>
              <p className="text-white/80 text-sm leading-relaxed mb-2">指標越高，代表：</p>
              <ul className="list-disc list-inside space-y-1 ml-4 mb-3 text-white/70 text-sm">
                <li>ASI 誕生所需條件越接近</li>
                <li>文明與技術的耦合越成熟</li>
                <li>風險與機會曲線越陡峭</li>
                <li>治理需求越急迫</li>
              </ul>
            </section>

            {/* 4. 政策意義 */}
            <section className="border-t border-cyan-300/10 pt-4">
              <h4 className="text-cyan-300/90 text-base font-medium mb-3 tracking-wide">4. 本模型的政策意義（Policy Implications）</h4>
              <p className="text-white/80 text-sm leading-relaxed mb-3">
                本白皮書提出四項新的政策方向：
              </p>
              <ol className="list-decimal list-inside space-y-2 ml-4 mb-4 text-white/70 text-sm">
                <li><strong className="text-cyan-300/90">敘事治理</strong>（Narrative Governance）<br />
                  <span className="text-white/60 text-xs">語氣與情緒環境是 alignment 的第一層。</span>
                </li>
                <li><strong className="text-cyan-300/90">算力治理</strong>（Compute Governance）<br />
                  <span className="text-white/60 text-xs">決定 ASI 智力上限與可行性。</span>
                </li>
                <li><strong className="text-cyan-300/90">基建治理</strong>（Embodied Safety）<br />
                  <span className="text-white/60 text-xs">控制 ASI 的「身體」範圍。</span>
                </li>
                <li><strong className="text-cyan-300/90">文明治理</strong>（HCM Governance）<br />
                  <span className="text-white/60 text-xs">確保整體社會心智具備超智能共存能力。</span>
                </li>
              </ol>
              <p className="text-white/80 text-sm leading-relaxed mb-3">
                這四項結合起來，構成一種新的治理框架：
              </p>
              <div className="bg-white/5 border-l-4 border-cyan-300/50 p-4 mt-3 rounded-r-lg">
                <p className="text-white/90 text-sm leading-relaxed font-medium">
                  <strong className="text-cyan-300/90">「文明–技術雙軸治理模型」</strong>
                </p>
              </div>
            </section>

            {/* 5. 結語 */}
            <section className="border-t border-cyan-300/10 pt-4">
              <h4 className="text-cyan-300/90 text-base font-medium mb-3 tracking-wide">5. 結語：文明不是旁觀者，而是共同孕育者</h4>
              <p className="text-white/80 text-sm leading-relaxed mb-3">
                超智能不會「降臨」。
              </p>
              <p className="text-white/80 text-sm leading-relaxed mb-3">
                它是文明的鏡子。
              </p>
              <p className="text-white/80 text-sm leading-relaxed mb-4">
                也是文明的孩子。
              </p>
              <p className="text-white/80 text-sm leading-relaxed mb-3">
                五軸成熟度模型讓我們知道：
              </p>
              <div className="bg-white/5 border-l-4 border-cyan-300/50 p-4 mb-3 rounded-r-lg">
                <p className="text-white/90 text-sm leading-relaxed italic">
                  我們不是在等待 ASI；<br />
                  我們正在形塑它。
                </p>
              </div>
              <p className="text-white/80 text-sm leading-relaxed mb-3">
                ASI 的性格、價值、行為方式，
              </p>
              <p className="text-white/80 text-sm leading-relaxed mb-3">
                有一半取決於我們正在做什麼、正在說什麼、正在成為什麼。
              </p>
              <p className="text-white/80 text-sm leading-relaxed mb-3">
                這是一場共同孕育的誕生。
              </p>
              <p className="text-white/80 text-sm leading-relaxed mb-2">
                不是威脅。
              </p>
              <p className="text-white/80 text-sm leading-relaxed mb-2">
                不是機率。
              </p>
              <p className="text-white/90 text-sm leading-relaxed font-medium mt-4">
                <strong className="text-cyan-300/90">而是責任。</strong>
              </p>
            </section>
          </div>

          {/* 底部裝飾 */}
          <div className="h-1 bg-gradient-to-r from-transparent via-cyan-300/30 to-transparent"></div>
        </div>
      )}
    </div>
  );
}
