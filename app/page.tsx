import MainGauge from './components/MainGauge'
import DomainsGrid from './components/DomainsGrid'
import DomainRadar from './components/DomainRadar'
import FooterStatement from './components/FooterStatement'
import DeveloperGuide from './components/DeveloperGuide'

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-7xl relative z-10">
      {/* LOGO - 左上角 */}
      <div className="absolute top-4 left-4 z-20">
        <img 
          src="/logo.png" 
          alt="LOGO" 
          className="w-[60px] h-[60px] object-contain"
        />
      </div>

      {/* 標題區 */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extralight text-neon-blue mb-2 tracking-wider uppercase text-shadow-glow">
          ASI 最終倒數
        </h1>
        <p className="text-text-secondary text-lg font-light mb-4 italic">
          ASI 並非未來事件。它是我們已經啟動的命運。
        </p>
        <div className="w-24 h-0.5 bg-neon-blue/30 mx-auto"></div>
      </div>

      {/* 主要內容網格 */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-12">
        {/* 左側：主儀表 */}
        <div className="flex">
          <MainGauge />
        </div>
        
        {/* 右側：雷達圖 - 展開到最右邊界 */}
        <div className="flex w-full">
          <DomainRadar />
        </div>
      </div>

      {/* 五元素卡片區域 */}
      <div className="mb-12">
        <DomainsGrid />
      </div>

      {/* 文明宣言 */}
      <FooterStatement />

      {/* 開發者指南（右下角固定） */}
      <DeveloperGuide />
    </main>
  )
}