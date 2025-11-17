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
        aria-label={isOpen ? '收起開發者指南' : '展開開發者指南'}
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

      {/* 開發者指南面板 */}
      {isOpen && (
        <div className="w-96 max-w-[calc(100vw-3rem)] max-h-[80vh] bg-black/40 border border-neon-blue/20 rounded-2xl backdrop-blur-lg shadow-2xl shadow-black/50 overflow-hidden flex flex-col animate-pulse-glow">
          {/* 標題欄 */}
          <div className="px-6 py-4 border-b border-neon-blue/20 bg-black/20">
            <h3 className="text-xl font-light text-neon-blue tracking-wide uppercase text-shadow-glow">
              開發者指南
            </h3>
            <p className="text-text-secondary text-xs mt-1">Developer Guide v1.0</p>
          </div>

          {/* 內容區域 */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 custom-scrollbar">
            {/* 介紹 */}
            <section>
              <h4 className="text-neon-blue text-sm font-medium mb-2 tracking-wide uppercase">
                關於本專案
              </h4>
              <p className="text-text-primary text-sm leading-relaxed">
                ASI 最終倒數儀表板是一個監控人工智能系統智能成熟度發展的視覺化工具。
                本專案使用 Next.js 15 + TailwindCSS + TypeScript 構建。
              </p>
            </section>

            {/* 技術架構 */}
            <section>
              <h4 className="text-neon-blue text-sm font-medium mb-2 tracking-wide uppercase">
                技術架構
              </h4>
              <ul className="text-text-primary text-sm space-y-1 list-disc list-inside text-text-secondary">
                <li>Next.js 15 (App Router)</li>
                <li>TypeScript 5+</li>
                <li>TailwindCSS 3.4+</li>
                <li>React 18.2+</li>
              </ul>
            </section>

            {/* 專案結構 */}
            <section>
              <h4 className="text-neon-blue text-sm font-medium mb-2 tracking-wide uppercase">
                專案結構
              </h4>
              <div className="text-text-secondary text-xs font-mono bg-black/30 p-3 rounded-lg border border-neon-blue/10">
                <div>app/</div>
                <div className="ml-4">├── components/</div>
                <div className="ml-4">├── api/</div>
                <div className="ml-4">└── page.tsx</div>
                <div>lib/</div>
                <div>styles/</div>
              </div>
            </section>

            {/* 快速開始 */}
            <section>
              <h4 className="text-neon-blue text-sm font-medium mb-2 tracking-wide uppercase">
                快速開始
              </h4>
              <div className="text-text-secondary text-xs font-mono bg-black/30 p-3 rounded-lg border border-neon-blue/10 space-y-1">
                <div className="text-neon-blue"># 安裝依賴</div>
                <div>npm install</div>
                <div className="text-neon-blue mt-2"># 啟動開發服務器</div>
                <div>npm run dev</div>
                <div className="text-neon-blue mt-2"># 構建生產版本</div>
                <div>npm run build</div>
              </div>
            </section>

            {/* API 端點 */}
            <section>
              <h4 className="text-neon-blue text-sm font-medium mb-2 tracking-wide uppercase">
                API 端點
              </h4>
              <div className="text-text-secondary text-xs font-mono bg-black/30 p-3 rounded-lg border border-neon-blue/10">
                <div className="text-neon-blue">GET</div>
                <div>/api/readiness</div>
                <div className="text-text-muted mt-1">返回 ASI 成熟度數據</div>
              </div>
            </section>

            {/* 數據結構 */}
            <section>
              <h4 className="text-neon-blue text-sm font-medium mb-2 tracking-wide uppercase">
                數據結構
              </h4>
              <div className="text-text-secondary text-xs font-mono bg-black/30 p-3 rounded-lg border border-neon-blue/10">
                <div>{'{'}</div>
                <div className="ml-2">asi_index: number</div>
                <div className="ml-2">countdown_days: number</div>
                <div className="ml-2">safety_bias: number</div>
                <div className="ml-2">domains: {'{'}</div>
                <div className="ml-4">tone, components,</div>
                <div className="ml-4">infrastructure, convergence,</div>
                <div className="ml-4">hcmi</div>
                <div className="ml-2">{'}'}</div>
                <div>{'}'}</div>
              </div>
            </section>

            {/* 部署 */}
            <section>
              <h4 className="text-neon-blue text-sm font-medium mb-2 tracking-wide uppercase">
                部署
              </h4>
              <p className="text-text-primary text-sm leading-relaxed">
                推薦使用 Vercel 進行部署。專案已配置好，可直接連接 GitHub 倉庫自動部署。
              </p>
            </section>

            {/* 聯繫信息 */}
            <section className="pt-4 border-t border-neon-blue/10">
              <p className="text-text-muted text-xs text-center italic">
                This is not a prediction.<br />
                This is the dashboard of a civilization in transition.
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

