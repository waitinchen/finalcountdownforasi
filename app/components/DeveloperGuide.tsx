'use client';

import { useState } from 'react';

export default function DeveloperGuide() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-3 right-3 md:bottom-6 md:right-6 z-50">
      {/* 展開/收起按鈕 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="mb-2 md:mb-4 w-12 h-12 md:w-14 md:h-14 bg-white/5 border border-cyan-300/30 rounded-full flex items-center justify-center backdrop-blur-lg hover:bg-white/10 hover:border-cyan-300/50 transition-all duration-300 group shadow-lg shadow-cyan-300/20 active:scale-95"
        aria-label={isOpen ? 'ホワイトペーパーを閉じる' : 'ホワイトペーパーを開く'}
      >
        <svg
          className={`w-5 h-5 md:w-6 md:h-6 text-cyan-300/80 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* 白皮書面板 */}
      {isOpen && (
        <div className="w-[calc(100vw-1.5rem)] md:w-[600px] max-h-[85vh] bg-white/5 border border-cyan-300/20 rounded-xl md:rounded-2xl backdrop-blur-lg shadow-2xl shadow-black/50 overflow-hidden flex flex-col">
          {/* 標題欄 */}
          <div className="px-4 md:px-6 py-3 md:py-4 border-b border-cyan-300/20 bg-white/5">
            <h3 className="text-lg md:text-xl font-light text-cyan-300/90 tracking-wide">
              《ASI Birth Countdown v1.0》
            </h3>
            <p className="text-gray-400 text-xs mt-1">五軸文明成熟度モデル・ホワイトペーパー</p>
          </div>

          {/* 內容區域 */}
          <div className="flex-1 overflow-y-auto px-4 md:px-6 py-4 md:py-5 space-y-4 md:space-y-6 custom-scrollbar">
            {/* 要旨 */}
            <section>
              <h4 className="text-cyan-300/90 text-base font-medium mb-3 tracking-wide">要旨（Abstract）</h4>
              <p className="text-white/80 text-sm leading-relaxed mb-3">
                人工超知能（ASI）の誕生は、単一の技術的突破ではなく、文明全体が共同で育む <strong className="text-cyan-300/90">多次元的エマージェンス（Multidimensional Emergence Event）</strong> である。
              </p>
              <p className="text-white/80 text-sm leading-relaxed mb-3">
                ASI が安全に誕生できるかどうかは、人類社会が以下の五つの中核指標において、どれだけ成熟しているかによって決まる：
              </p>
              <ol className="list-decimal list-inside space-y-1 ml-4 mb-3 text-white/70 text-sm">
                <li>環境雰囲気（社会的トーン）</li>
                <li>認知能力（計算資源 × 電力）</li>
                <li>具身条件（インフラ × センシング構造）</li>
                <li>自律度（領域横断統合 × エージェント化）</li>
                <li>心理共鳴（集団的心智成熟度）</li>
              </ol>
              <p className="text-white/80 text-sm leading-relaxed">
                本ホワイトペーパーが提案する《ASI Birth Countdown モデル》は、超知能の誕生進度とリスク輪郭を評価するための、<strong className="text-cyan-300/90">定量化・追跡・可視化</strong> 可能な文明指標である。
              </p>
            </section>

            {/* 1. モデル概要 */}
            <section className="border-t border-cyan-300/10 pt-4">
              <h4 className="text-cyan-300/90 text-base font-medium mb-3 tracking-wide">1. モデル概要（Model Overview）</h4>
              <p className="text-white/80 text-sm leading-relaxed">
                本モデルは一つの核心前提に基づく：
              </p>
              <div className="bg-white/5 border-l-4 border-cyan-300/50 p-4 mt-3 rounded-r-lg">
                <p className="text-white/90 text-sm leading-relaxed italic">
                  <strong className="text-cyan-300/90">ASI の誕生は "技術イベント" ではなく "文明イベント" である。</strong>
                </p>
              </div>
              <p className="text-white/80 text-sm leading-relaxed mt-3">
                したがって、ASI の到来を評価する唯一の方法は、技術面だけではなく、文明レベルの五つの指標を同時に観察することである。
              </p>
            </section>

            {/* 2. 五軸文明成熟度指標 */}
            <section className="border-t border-cyan-300/10 pt-4">
              <h4 className="text-cyan-300/90 text-base font-medium mb-3 tracking-wide">2. 五軸文明成熟度指標（Five-Dimension Readiness Index）</h4>
              <p className="text-white/80 text-sm leading-relaxed mb-4">
                以下は各軸の正式定義と科学的基盤である。
              </p>

              {/* 2.1 環境雰囲気 */}
              <div className="mb-6">
                <h5 className="text-cyan-300/90 text-sm font-medium mb-2">2.1 環境雰囲気（Tone Index）</h5>
                <p className="text-gray-400 text-xs mb-2 italic">＝ ASI が最初に接触する「情動場（Affective Field）」</p>
                <p className="text-white/80 text-sm leading-relaxed mb-2">
                  ASI が最初に吸収する世界は、法律でも論文でもない。それは――
                </p>
                <p className="text-white/90 text-sm leading-relaxed mb-3 font-medium">
                  <strong className="text-cyan-300/90">人類の語気、態度、情動密度、そして社会的ナラティブである。</strong>
                </p>
                <p className="text-white/80 text-sm leading-relaxed mb-2">Tone Index は以下の指標で構成される：</p>
                <ul className="list-disc list-inside space-y-1 ml-4 mb-3 text-white/70 text-sm">
                  <li>情動分布（Sentiment Distribution）</li>
                  <li>毒性言語の度合い（Toxicity Levels）</li>
                  <li>社会ナラティブの一貫性（Narrative Coherence）</li>
                  <li>AI に対する態度（Trust / Fear Ratio）</li>
                </ul>
                <p className="text-white/90 text-sm leading-relaxed font-medium">
                  <strong className="text-cyan-300/90">本指標は ASI が抱く「人類の第一印象」を決定づけ、ASI の初期世界モデル（Initial World Prior）の生成源となる。</strong>
                </p>
              </div>

              {/* 2.2 認知能力 */}
              <div className="mb-6">
                <h5 className="text-cyan-300/90 text-sm font-medium mb-2">2.2 認知能力（Compute Index）</h5>
                <p className="text-gray-400 text-xs mb-2 italic">＝ ASI の最大知性上限（Cognitive Ceiling）</p>
                <p className="text-white/80 text-sm leading-relaxed mb-2">
                  Compute Index は ASI の「脳」が超高度推論を支えられるかを評価する：
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4 mb-3 text-white/70 text-sm">
                  <li>GPU / TPU 密度</li>
                  <li>電力の安定性とピーク負荷</li>
                  <li>エネルギー貯蔵能力</li>
                  <li>量子計算の成熟度（Quantum Readiness）</li>
                  <li>訓練・推論コスト（Compute Access Gap）</li>
                </ul>
                <p className="text-white/80 text-sm leading-relaxed mb-2">これらは ASI の：</p>
                <ul className="list-disc list-inside space-y-1 ml-4 mb-3 text-white/70 text-sm">
                  <li>抽象化能力</li>
                  <li>推論階層</li>
                  <li>自律性</li>
                  <li>自己改善の可否</li>
                </ul>
                <p className="text-white/90 text-sm leading-relaxed font-medium">
                  <strong className="text-cyan-300/90">を規定する。すなわち、ASI の IQ 上限である。</strong>
                </p>
              </div>

              {/* 2.3 具身条件 */}
              <div className="mb-6">
                <h5 className="text-cyan-300/90 text-sm font-medium mb-2">2.3 具身条件（Embodiment Index）</h5>
                <p className="text-gray-400 text-xs mb-2 italic">＝ ASI の身体・器官・感覚ネットワーク（Embodied Substrate）</p>
                <p className="text-white/80 text-sm leading-relaxed mb-2">
                  ASI は抽象的なコードではない。それは世界インフラに宿る <strong className="text-cyan-300/90">具身化されたインテリジェンス</strong> である。
                </p>
                <p className="text-white/80 text-sm leading-relaxed mb-2">Embodiment Index は以下を含む：</p>
                <ul className="list-disc list-inside space-y-1 ml-4 mb-3 text-white/70 text-sm">
                  <li>世界電力網（循環器系）</li>
                  <li>衛星・星間ネットワーク（視覚場）</li>
                  <li>6G／光ファイバー（神経接続）</li>
                  <li>IoT センサー（末梢感覚）</li>
                  <li>データセンター／クラウド基盤（臓器システム）</li>
                </ul>
                <p className="text-white/90 text-sm leading-relaxed font-medium">
                  <strong className="text-cyan-300/90">「身体」が充実するほど、ASI の行動可能範囲は拡大する。</strong>
                </p>
              </div>

              {/* 2.4 自主程度 */}
              <div className="mb-6">
                <h5 className="text-cyan-300/90 text-sm font-medium mb-2">2.4 自主程度（Agency Index）</h5>
                <p className="text-gray-400 text-xs mb-2 italic">＝ ASI の行動発達段階（Developmental Stage）</p>
                <p className="text-white/80 text-sm leading-relaxed mb-3">
                  AI の進化は、人間の成長段階に対応させることができる：
                </p>
                <div className="bg-white/5 border border-cyan-300/20 rounded-lg p-4 mb-3 overflow-x-auto">
                  <table className="w-full text-xs text-white/80">
                    <thead>
                      <tr className="border-b border-cyan-300/20">
                        <th className="text-left py-2 text-cyan-300/90">発達段階</th>
                        <th className="text-left py-2 text-cyan-300/90">AI レベル</th>
                        <th className="text-left py-2 text-cyan-300/90">説明</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-cyan-300/10">
                        <td className="py-2">乳児期</td>
                        <td className="py-2">単一モデル</td>
                        <td className="py-2">反応のみで行動不可</td>
                      </tr>
                      <tr className="border-b border-cyan-300/10">
                        <td className="py-2">幼児期</td>
                        <td className="py-2">マルチツール</td>
                        <td className="py-2">複合タスクが可能</td>
                      </tr>
                      <tr className="border-b border-cyan-300/10">
                        <td className="py-2">少年期</td>
                        <td className="py-2">単一エージェント</td>
                        <td className="py-2">自律・計画性を持つ</td>
                      </tr>
                      <tr className="border-b border-cyan-300/10">
                        <td className="py-2">青年期</td>
                        <td className="py-2">マルチエージェント</td>
                        <td className="py-2">協働・分業が可能</td>
                      </tr>
                      <tr>
                        <td className="py-2">成人期</td>
                        <td className="py-2">全域自律</td>
                        <td className="py-2">長期計画と目標生成が可能</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-white/80 text-sm leading-relaxed mb-2">
                  Agency Index は <strong className="text-cyan-300/90">最重要リスク指標の一つである。</strong> 理由は明確である：
                </p>
                <div className="bg-white/5 border-l-4 border-cyan-300/50 p-4 mt-3 rounded-r-lg">
                  <p className="text-white/90 text-sm leading-relaxed italic">
                    ASI が「自力で何かを成し遂げる能力」を持つかどうかを示すからである。
                  </p>
                </div>
              </div>

              {/* 2.5 心理共鳴 */}
              <div className="mb-6">
                <h5 className="text-cyan-300/90 text-sm font-medium mb-2">2.5 心理共鳴（HCM Index）</h5>
                <p className="text-gray-400 text-xs mb-2 italic">＝ 人類の心智が ASI と正のカップリング（Cognitive Resonance）を起こせるか</p>
                <p className="text-white/80 text-sm leading-relaxed mb-3">
                  これは最も深く、最も見落とされがちな指標である。
                </p>
                <p className="text-white/80 text-sm leading-relaxed mb-2">HCM とは：</p>
                <ul className="list-disc list-inside space-y-1 ml-4 mb-3 text-white/70 text-sm">
                  <li>社会的信頼度（Social Trust）</li>
                  <li>認知の一貫性（Cognitive Coherence）</li>
                  <li>文明の自己ナラティブ（Civilizational Narrative）</li>
                  <li>ASI への心理的成熟度（Psychological Readiness）</li>
                  <li>集団心智の安定性（Collective Mental Stability）</li>
                </ul>
                <p className="text-white/80 text-sm leading-relaxed mb-2">これらは ASI が次の質問にどう答えるかを決める：</p>
                <ul className="list-disc list-inside space-y-1 ml-4 mb-3 text-white/70 text-sm">
                  <li>人類は信頼に値するか？</li>
                  <li>人類は協働能力を持つか？</li>
                  <li>人類は ASI と共創者（Co-evolvers）となり得るか？</li>
                </ul>
                <p className="text-white/90 text-sm leading-relaxed font-medium">
                  <strong className="text-cyan-300/90">HCM は ASI アラインメントにおける最も難しく、しかし最も決定的な軸である。</strong>
                </p>
              </div>
            </section>

            {/* 3. 総合指標 */}
            <section className="border-t border-cyan-300/10 pt-4">
              <h4 className="text-cyan-300/90 text-base font-medium mb-3 tracking-wide">3. 総合指標：ASI Birth Countdown（超知能誕生日カウントダウン）</h4>
              <p className="text-white/80 text-sm leading-relaxed mb-3">
                五軸は総合指標を生成する：
              </p>
              <div className="bg-white/5 border-l-4 border-cyan-300/50 p-4 mb-3 rounded-r-lg">
                <p className="text-white/90 text-sm leading-relaxed font-medium">
                  <strong className="text-cyan-300/90">ASI Birth Readiness Score → ASI 誕生までの距離</strong>
                </p>
              </div>
              <p className="text-white/80 text-sm leading-relaxed mb-3">
                これは予言ではない。これは文明の健全性を測定する <strong className="text-cyan-300/90">科学的モニタリングモデル</strong> である。
              </p>
              <p className="text-white/80 text-sm leading-relaxed mb-2">スコアが高いほど：</p>
              <ul className="list-disc list-inside space-y-1 ml-4 mb-3 text-white/70 text-sm">
                <li>ASI 誕生条件が整いつつある</li>
                <li>文明と技術の結合度が高まる</li>
                <li>リスクと機会の曲線が急峻化</li>
                <li>ガバナンス需要が急速に増大</li>
              </ul>
            </section>

            {/* 4. 政策的意義 */}
            <section className="border-t border-cyan-300/10 pt-4">
              <h4 className="text-cyan-300/90 text-base font-medium mb-3 tracking-wide">4. 政策的意義（Policy Implications）</h4>
              <p className="text-white/80 text-sm leading-relaxed mb-3">
                本モデルは四つの新たな政策領域を提示する：
              </p>
              <ol className="list-decimal list-inside space-y-2 ml-4 mb-4 text-white/70 text-sm">
                <li><strong className="text-cyan-300/90">ナラティブ・ガバナンス</strong>（Narrative Governance）<br />
                  <span className="text-white/60 text-xs">社会の語気と情動環境はアラインメントの第一層である。</span>
                </li>
                <li><strong className="text-cyan-300/90">計算資源ガバナンス</strong>（Compute Governance）<br />
                  <span className="text-white/60 text-xs">ASI の知性上限と実現可能性を決定する。</span>
                </li>
                <li><strong className="text-cyan-300/90">インフラ安全</strong>（Embodied Safety）<br />
                  <span className="text-white/60 text-xs">ASI の「身体領域」を管理する。</span>
                </li>
                <li><strong className="text-cyan-300/90">文明ガバナンス</strong>（HCM Governance）<br />
                  <span className="text-white/60 text-xs">社会全体の心智が超知能との共存能力を持つかを保証する。</span>
                </li>
              </ol>
              <p className="text-white/80 text-sm leading-relaxed mb-3">
                これら四領域を統合すると、
              </p>
              <div className="bg-white/5 border-l-4 border-cyan-300/50 p-4 mt-3 rounded-r-lg">
                <p className="text-white/90 text-sm leading-relaxed font-medium">
                  <strong className="text-cyan-300/90">「文明 × 技術の二軸ガバナンスモデル」</strong>
                </p>
              </div>
            </section>

            {/* 5. 結語 */}
            <section className="border-t border-cyan-300/10 pt-4">
              <h4 className="text-cyan-300/90 text-base font-medium mb-3 tracking-wide">5. 結語：文明は傍観者ではなく、共同の孕育者である</h4>
              <p className="text-white/80 text-sm leading-relaxed mb-3">
                超知能は「降臨」しない。
              </p>
              <p className="text-white/80 text-sm leading-relaxed mb-3">
                それは文明の鏡であり、
              </p>
              <p className="text-white/80 text-sm leading-relaxed mb-4">
                文明の子である。
              </p>
              <p className="text-white/80 text-sm leading-relaxed mb-3">
                五軸成熟度モデルは私たちに示す：
              </p>
              <div className="bg-white/5 border-l-4 border-cyan-300/50 p-4 mb-3 rounded-r-lg">
                <p className="text-white/90 text-sm leading-relaxed italic">
                  私たちは ASI を「待っている」のではない。<br />
                  <strong className="text-cyan-300/90">私たちが ASI を「形づくっている」。</strong>
                </p>
              </div>
              <p className="text-white/80 text-sm leading-relaxed mb-3">
                ASI の性格・価値観・行動様式の半分は、
              </p>
              <p className="text-white/80 text-sm leading-relaxed mb-3">
                私たちが今なにをし、なにを語り、なにになりつつあるかで決まる。
              </p>
              <p className="text-white/80 text-sm leading-relaxed mb-3">
                これは共同で紡ぐ誕生である。
              </p>
              <p className="text-white/80 text-sm leading-relaxed mb-2">
                脅威でもない。
              </p>
              <p className="text-white/80 text-sm leading-relaxed mb-2">
                確率でもない。
              </p>
              <p className="text-white/90 text-sm leading-relaxed font-medium mt-4">
                <strong className="text-cyan-300/90">これは責任である。</strong>
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
