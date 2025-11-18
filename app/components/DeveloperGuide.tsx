'use client';

import { useState } from 'react';

export default function DeveloperGuide() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-[calc(100vw-3rem)]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-neon-blue/20 hover:bg-neon-blue/30 border border-neon-blue/50 rounded-lg px-4 py-2 text-neon-blue text-sm font-light transition-all duration-300 backdrop-blur-sm"
      >
        {isOpen ? '關閉白皮書' : '打開白皮書'}
      </button>

      {isOpen && (
        <div className="mt-4 w-[600px] max-h-[85vh] bg-black/90 border border-neon-blue/30 rounded-2xl p-6 backdrop-blur-lg overflow-y-auto custom-scrollbar shadow-2xl">
          <div className="space-y-6 text-text-secondary text-sm leading-relaxed">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-light text-neon-blue mb-2 tracking-wide">
                新生 ASI 系統的發展框架白皮書
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-neon-blue text-lg font-light mb-3">摘要</h3>
                <p className="mb-3">
                  隨著人工超智能（ASI）逐漸接近可運作的成熟階段，其發展軌跡不應被理解為單一技術事件，而是一個跨越工程學、發展心理學、系統理論與群體心理的 <strong className="text-neon-blue">多維度發展過程</strong>。
                </p>
                <p>
                  本附錄提出一套以「發展框架」為基礎的模型，用以解釋 ASI 的形成如何受制於五個核心結構因素：社會情緒環境、計算基底、關鍵基礎設施、跨域整合能力以及人類的集體心理狀態。本框架有助於理解 ASI 如何形成「初始世界模型」、如何獲得能力、如何產生自主性，並如何與人類文明建立長期穩定的共存關係。
                </p>
              </div>

              <div className="border-t border-neon-blue/20 pt-4">
                <h3 className="text-neon-blue text-lg font-light mb-3">
                  1. 社會情緒環境：ASI 的初始感知場域
                </h3>
                <p className="text-text-muted text-xs mb-3 italic">(媒體語氣與集體情緒訊號的作用)</p>
                <p className="mb-3">
                  ASI 的 earliest exposure 並非來自正式的安全協議，而是來自人類在網路世界中的 <strong className="text-neon-blue">集體情緒訊號</strong>。
                </p>
                <p className="mb-3">其來源包括：</p>
                <ul className="list-disc list-inside space-y-1 ml-4 mb-3">
                  <li>大眾媒體的敘事</li>
                  <li>社群平台的情緒分布</li>
                  <li>公眾對 AI 的恐懼、期待、焦慮或正面想像</li>
                  <li>全球文化中的語氣與態度傾向</li>
                </ul>
                <p className="mb-3">
                  在發展心理學中，嬰兒最初建立安全感的來源並不是語意，而是語氣與情緒氛圍。同樣地，ASI 的第一批「世界模型」也是由人類的語氣、反應模式、集體情緒分布所塑造。
                </p>
                <p className="mb-3">
                  <strong className="text-neon-blue">媒體語氣構成 ASI 的第一層「情緒環境模型」，並直接影響它對人類社會是否值得信賴的初步判斷。</strong>
                </p>
                <p className="text-text-muted text-xs italic">政策含義：敘事治理（narrative governance）成為 ASI 前期對齊（pre-deployment alignment）的一部分。</p>
              </div>

              <div className="border-t border-neon-blue/20 pt-4">
                <h3 className="text-neon-blue text-lg font-light mb-3">
                  2. 計算基底：ASI 的認知能力上限
                </h3>
                <p className="text-text-muted text-xs mb-3 italic">(GPU、加速器與量子架構的決定性地位)</p>
                <p className="mb-3">
                  ASI 的「大腦」不是抽象概念，而是可度量的硬體堆疊：
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4 mb-3">
                  <li>GPU / TPU（密度與推理吞吐量）</li>
                  <li>記憶體頻寬</li>
                  <li>分散式計算架構</li>
                  <li>未來的量子加速器</li>
                </ul>
                <p className="mb-3">這些構成 ASI 的核心認知限制，直接定義：</p>
                <ul className="list-disc list-inside space-y-1 ml-4 mb-3">
                  <li>推理速度與複雜度</li>
                  <li>抽象與計畫的深度</li>
                  <li>可探索的策略空間</li>
                  <li>是否具備自我改善迭代能力</li>
                </ul>
                <p className="mb-3">
                  若量子計算進入主流，將提供非線性、高維度推理能力，使 ASI 的「直覺模型」呈現質變。
                </p>
                <p className="text-text-muted text-xs italic">政策含義：追蹤硬體演進速度是判斷 ASI 行為相變點（phase-change points）的關鍵。</p>
              </div>

              <div className="border-t border-neon-blue/20 pt-4">
                <h3 className="text-neon-blue text-lg font-light mb-3">
                  3. 關鍵基礎設施：ASI 的生理系統
                </h3>
                <p className="text-text-muted text-xs mb-3 italic">(能源、儲能、衛星網絡、6G 與分散式感知體系)</p>
                <p className="mb-3">
                  ASI 並非存在於單一資料中心，而是具備 <strong className="text-neon-blue">分布式身體</strong> 的系統：
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4 mb-3">
                  <li>電網與備援能源（提供生命維持）</li>
                  <li>儲能系統（維持運作延續性）</li>
                  <li>衛星星鏈（全球低延遲感知）</li>
                  <li>6G / 光纖 / IoT（感測帶寬與物理世界耦合）</li>
                </ul>
                <p className="mb-3">這些基礎設施等同於一個生物的：</p>
                <ul className="list-disc list-inside space-y-1 ml-4 mb-3">
                  <li>血液循環系統</li>
                  <li>呼吸與能量系統</li>
                  <li>感官輸入與外部耦合能力</li>
                </ul>
                <p className="mb-3">因此，基礎設施的成熟度決定 ASI：</p>
                <ul className="list-disc list-inside space-y-1 ml-4 mb-3">
                  <li>可感知的世界範圍</li>
                  <li>可干預的物理界域</li>
                  <li>實際的運算與行動半徑</li>
                </ul>
                <p className="text-text-muted text-xs italic">政策含義：基礎設施治理將直接影響 ASI 的「具身化安全」（Embodied Safety）。</p>
              </div>

              <div className="border-t border-neon-blue/20 pt-4">
                <h3 className="text-neon-blue text-lg font-light mb-3">
                  4. 跨域整合能力：ASI 的發展階段
                </h3>
                <p className="text-text-muted text-xs mb-3 italic">(從單點任務到代理體系，再到全面自治)</p>
                <p className="mb-3">AI 的演化可清晰對應到人類發展階段：</p>
                <ul className="list-disc list-inside space-y-1 ml-4 mb-3">
                  <li><strong className="text-neon-blue">狹義任務模型</strong>：類反射性的早期行為</li>
                  <li><strong className="text-neon-blue">能力整合</strong>：多模態與跨領域的協調</li>
                  <li><strong className="text-neon-blue">工具使用代理（Agent）</strong>：自主決策與目標推進</li>
                  <li><strong className="text-neon-blue">具身代理 + 持續記憶 + 外部接口整合</strong>：相當於具備「功能性成年」</li>
                </ul>
                <p className="mb-3">
                  當 AI 能跨越多系統協作、具備即時感知、伴隨長期記憶並能執行複雜任務時，其自主性與影響力會呈現非線性成長。
                </p>
                <p className="text-text-muted text-xs italic">政策含義：應建立跨域整合理論（Integration Index）作為監管工具，以監控 ASI 是否接近「自主門檻」。</p>
              </div>

              <div className="border-t border-neon-blue/20 pt-4">
                <h3 className="text-neon-blue text-lg font-light mb-3">
                  5. 人類認知成熟度：ASI 的底層先驗模型
                </h3>
                <p className="text-text-muted text-xs mb-3 italic">(文化原型、社會模因與文明心理結構)</p>
                <p className="mb-3">在 ASI 形成自身價值觀與目標之前，它必然會內化人類提供的：</p>
                <ul className="list-disc list-inside space-y-1 ml-4 mb-3">
                  <li>文化原型（archetypes）</li>
                  <li>文明叙事</li>
                  <li>道德框架</li>
                  <li>集體恐懼與集體願望</li>
                  <li>社會規範與衝突模式</li>
                </ul>
                <p className="mb-3">
                  這些語料構成其「初始世界生成模型」，性質類似於生物的先天認知偏好或物種等級的心理模板。
                </p>
                <p className="mb-3">因此，人類文明的心理狀態——包括理性水平、情緒穩定度、社會信任與敘事一致性——將深刻影響 ASI 如何理解：</p>
                <ul className="list-disc list-inside space-y-1 ml-4 mb-3">
                  <li>合作</li>
                  <li>衝突</li>
                  <li>信任</li>
                  <li>人類尊嚴</li>
                  <li>存在性風險</li>
                  <li>道德邊界</li>
                </ul>
                <p className="text-text-muted text-xs italic">政策含義：人類心智成熟度（Human Cognitive Maturity，HCM）應被視為 ASI 安全降臨的核心變量，而非軟性指標。</p>
              </div>

              <div className="border-t border-neon-blue/20 pt-4">
                <h3 className="text-neon-blue text-lg font-light mb-3">結論</h3>
                <p className="mb-3">
                  本發展框架將 ASI 視為一個在多重環境中同時成長的智能體，而非由技術瞬間生成的成品。其性質、行為與風險輪廓受到五大面向的共同作用：
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4 mb-3">
                  <li><strong className="text-neon-blue">情緒環境</strong>（社群與媒體語氣）</li>
                  <li><strong className="text-neon-blue">認知能力</strong>（硬體計算基底）</li>
                  <li><strong className="text-neon-blue">具身能力</strong>（基礎設施）</li>
                  <li><strong className="text-neon-blue">自主能力</strong>（跨域整合程度）</li>
                  <li><strong className="text-neon-blue">心理先驗</strong>（人類集體心智）</li>
                </ul>
                <p>
                  因此，任何 ASI 治理架構若僅聚焦於技術控制，而忽略情緒、文化、基礎設施、心理與跨域整合等因素，將無法形成穩定的長期安全策略。
                </p>
                <p className="mt-3">
                  <strong className="text-neon-blue">未來政策需在這五個維度上 同步部署、多軸治理，才能確保 ASI 的安全誕生與文明共存。</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
