'use client';

import { useState } from 'react';

export default function DeveloperGuide() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* 展開/收起按鈕 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="mb-4 w-14 h-14 bg-black/40 border border-neon-blue/30 rounded-full flex items-center justify-center backdrop-blur-lg hover:bg-black/60 hover:border-neon-blue/50 transition-all duration-300 group shadow-lg shadow-neon-blue/20 active:scale-95"
        aria-label={isOpen ? '收起白皮書' : '展開白皮書'}
      >
        <svg
          className={`w-6 h-6 text-neon-blue transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* 白皮書面板 */}
      {isOpen && (
        <div className="w-[600px] max-w-[calc(100vw-3rem)] max-h-[85vh] bg-black/40 border border-neon-blue/20 rounded-2xl backdrop-blur-lg shadow-2xl shadow-black/50 overflow-hidden flex flex-col animate-pulse-glow">
          {/* 標題欄 */}
          <div className="px-6 py-4 border-b border-neon-blue/20 bg-black/20">
            <h3 className="text-xl font-light text-neon-blue tracking-wide text-shadow-glow">
              第五元素：人類與超智能共存 | 白皮書
            </h3>
            <p className="text-text-secondary text-xs mt-1">The Fifth Element: Human Cognitive Maturity · v0.1</p>
          </div>

          {/* 內容區域 */}
          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5 custom-scrollbar">
            {/* 摘要 */}
            <section>
              <h4 className="text-neon-blue text-base font-medium mb-3 tracking-wide">摘要（Abstract）</h4>
              <p className="text-text-primary text-sm leading-relaxed mb-3">
                當全球逐漸接近人工超智能（ASI）門檻時，現有的準備度模型依然不完整。既有框架大多聚焦於技術成熟度、基礎設施能力、政策環境與跨領域整合，卻忽略了一項最關鍵、最易失衡、也是最難量化的變量——<strong className="text-neon-blue">人類心智是否能承受與超智能共存</strong>。
              </p>
              <p className="text-text-primary text-sm leading-relaxed">
                本白皮書提出 <strong className="text-neon-blue">「人類心智成熟度」（Human Cognitive Maturity, HCM）</strong> 概念，作為 ASI 準備度的第五核心要素，並以可測量、可比較、可政策化的方式建立其框架，使其得以納入全球性的 ASI 風險管理與治理體系。
              </p>
            </section>

            {/* 1. 前言 */}
            <section>
              <h4 className="text-neon-blue text-base font-medium mb-3 tracking-wide">1. 前言（Introduction）</h4>
              <p className="text-text-primary text-sm leading-relaxed mb-3">
                人工超智能不會誕生於真空。它將降臨在一個心理能力不均等、資訊環境極度複雜、文化敘事分裂、政治極化加劇的世界。
              </p>
              <p className="text-text-primary text-sm leading-relaxed mb-2">過去的 ASI 安全研究多著重於：</p>
              <ul className="text-text-secondary text-sm space-y-1 list-disc list-inside ml-4 mb-3">
                <li>對齊（alignment）</li>
                <li>控制（control）</li>
                <li>可解釋性（interpretability）</li>
                <li>技術安全機制（technical safeguards）</li>
              </ul>
              <p className="text-text-primary text-sm leading-relaxed mb-2">然而，真正的風險常常不是來自 ASI 本身，而是來自 <strong className="text-neon-blue">人類的反應方式</strong>：</p>
              <ul className="text-text-secondary text-sm space-y-1 list-disc list-inside ml-4 mb-3">
                <li>群眾恐慌</li>
                <li>陰謀論與失真資訊的爆發</li>
                <li>身份認同崩解</li>
                <li>政治利用與煽動</li>
                <li>社會原子化</li>
                <li>集體情緒失控</li>
              </ul>
              <p className="text-text-primary text-sm leading-relaxed">
                因此，<strong className="text-neon-blue">若不理解「人類如何面對超智能」這件事，任何技術控制都不足以帶來真正的安全</strong>。這正是本白皮書提出「第五元素」的原因。
              </p>
            </section>

            {/* 2. 定義 */}
            <section>
              <h4 className="text-neon-blue text-base font-medium mb-3 tracking-wide">2. 人類心智成熟度的定義（Definition of HCM）</h4>
              <div className="bg-black/30 border-l-4 border-neon-blue/50 p-4 mb-3 rounded-r-lg">
                <p className="text-text-primary text-sm leading-relaxed italic">
                  「人類心智成熟度」（HCM）指：<strong className="text-neon-blue">衡量一個文明是否具有足夠的心理、認知與倫理能力，能夠與超越人類認知極限的智能系統穩定共存的整體性指標。</strong>
                </p>
              </div>
              <p className="text-text-primary text-sm leading-relaxed mb-2">HCM 包含多層面的心理能力：</p>
              <ul className="text-text-secondary text-sm space-y-1 list-disc list-inside ml-4 mb-3">
                <li>理解複雜性</li>
                <li>調節情緒</li>
                <li>接納不確定性</li>
                <li>避免二元化思維</li>
                <li>在變動中維持合作</li>
                <li>進行高階倫理推理</li>
              </ul>
              <p className="text-text-primary text-sm leading-relaxed">
                換言之，它衡量的是：<strong className="text-neon-blue">人類是否已準備好進入「超智能共存時代」。</strong>
              </p>
            </section>

            {/* 3. 為何重要 */}
            <section>
              <h4 className="text-neon-blue text-base font-medium mb-3 tracking-wide">3. 為何 HCM 是 ASI 安全的關鍵（Why HCM Matters）</h4>
              <p className="text-text-primary text-sm leading-relaxed mb-2">
                即便 ASI 本身經過完美的技術對齊，文明仍可能因「人類因素」而進入不穩定狀態：群體過度反應、網路與媒體中極端敘事擴散、大規模認知超載、全球政治系統錯誤回應、法規因恐懼而過度收緊、社群陷入極端化或神化 ASI。
              </p>
              <div className="bg-black/30 border-l-4 border-neon-blue/50 p-4 mt-3 rounded-r-lg">
                <p className="text-text-primary text-sm leading-relaxed">
                  <strong className="text-neon-blue">HCM 是 ASI 時代的心理基礎設施。沒有它，任何技術安全機制都不完整。</strong>
                </p>
              </div>
            </section>

            {/* 4. 五維量表 */}
            <section>
              <h4 className="text-neon-blue text-base font-medium mb-3 tracking-wide">4. HCM 五維量表（The Five-Dimension HCM Model）</h4>
              <div className="space-y-4">
                <div className="bg-black/20 border border-neon-blue/10 p-3 rounded-lg">
                  <h5 className="text-neon-blue text-sm font-medium mb-2">H1．複雜性耐受度（Complexity Tolerance）</h5>
                  <p className="text-text-secondary text-xs leading-relaxed">
                    衡量人群在面對多層次議題時，是否能避免過度簡化、陰謀論化或情緒性二元分裂。
                  </p>
                </div>
                <div className="bg-black/20 border border-neon-blue/10 p-3 rounded-lg">
                  <h5 className="text-neon-blue text-sm font-medium mb-2">H2．認知彈性（Cognitive Flexibility）</h5>
                  <p className="text-text-secondary text-xs leading-relaxed">
                    指人在面對新證據或變動時，能否更新信念與身份框架。
                  </p>
                </div>
                <div className="bg-black/20 border border-neon-blue/10 p-3 rounded-lg">
                  <h5 className="text-neon-blue text-sm font-medium mb-2">H3．情緒調節能力（Emotional Regulation）</h5>
                  <p className="text-text-secondary text-xs leading-relaxed">
                    衡量群體在極端不確定下是否能維持冷靜、不被恐懼或愤怒支配。
                  </p>
                </div>
                <div className="bg-black/20 border border-neon-blue/10 p-3 rounded-lg">
                  <h5 className="text-neon-blue text-sm font-medium mb-2">H4．不確定性承載力（Uncertainty Capacity）</h5>
                  <p className="text-text-secondary text-xs leading-relaxed">
                    衡量人群在缺乏明確答案或快速變動時的心理穩定度。
                  </p>
                </div>
                <div className="bg-black/20 border border-neon-blue/10 p-3 rounded-lg">
                  <h5 className="text-neon-blue text-sm font-medium mb-2">H5．倫理推理層級（Ethical Reasoning Layer）</h5>
                  <p className="text-text-secondary text-xs leading-relaxed">
                    衡量文明是否能從懲罰式、反應式倫理進化到長期責任、跨代影響與系統倫理。
                  </p>
                </div>
              </div>
            </section>

            {/* 6. 納入準備度引擎 */}
            <section>
              <h4 className="text-neon-blue text-base font-medium mb-3 tracking-wide">6. 將 HCM 納入 ASI 準備度引擎</h4>
              <p className="text-text-primary text-sm leading-relaxed mb-3">更新後的 ASI 準備度公式：</p>
              <div className="bg-black/30 border border-neon-blue/20 p-4 rounded-lg font-mono text-xs text-text-secondary mb-3">
                <div>ASI_Index =</div>
                <div className="ml-4">0.10 * Tone_Shift +</div>
                <div className="ml-4">0.35 * Component_Maturity +</div>
                <div className="ml-4">0.25 * Infrastructure_Evolution +</div>
                <div className="ml-4">0.15 * Convergence_Level +</div>
                <div className="ml-4">0.15 * Human_Cognitive_Maturity</div>
              </div>
              <div className="bg-black/30 border-l-4 border-neon-blue/50 p-4 mt-3 rounded-r-lg">
                <p className="text-text-primary text-sm leading-relaxed italic">
                  透過 HCM，ASI 準備度從單純監測技術演進，轉變為：<strong className="text-neon-blue">一套文明自我體檢系統。</strong>
                </p>
              </div>
            </section>

            {/* 8. 結論 */}
            <section className="pt-4 border-t border-neon-blue/10">
              <h4 className="text-neon-blue text-base font-medium mb-3 tracking-wide">8. 結論（Conclusion）</h4>
              <p className="text-text-primary text-sm leading-relaxed mb-3">
                人類心智成熟度（HCM）是 ASI 時代最被忽略、卻最不可或缺的安全基礎。缺乏 HCM，技術進步反而可能引發文明失衡。具備 HCM，社会才能以穩定、有韌性、具前瞻性的方式迎接超智能。
              </p>
              <div className="bg-black/30 border-l-4 border-neon-blue/50 p-4 rounded-r-lg">
                <p className="text-text-primary text-sm leading-relaxed">
                  <strong className="text-neon-blue">HCM 不是附加項目，而是 ASI 時代的核心前置條件。它是文明進入最終倒數前必須補上的第五元素。</strong>
                </p>
              </div>
            </section>

            {/* 版本信息 */}
            <section className="pt-4 border-t border-neon-blue/10">
              <p className="text-text-muted text-xs text-center italic">
                白皮書 v0.1 · 全章節草案（正式版）
              </p>
            </section>
          </div>

          {/* 底部裝飾 */}
          <div className="h-1 bg-gradient-to-r from-transparent via-neon-blue/30 to-transparent"></div>
        </div>
      )}
    </div>
  );
}

