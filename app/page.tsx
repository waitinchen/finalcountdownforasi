import DashboardNew from './components/DashboardNew'
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
        <p className="text-text-secondary text-base font-light mb-4 italic">
          ASI 並非未來事件。它是我們已經啟動的命運。
        </p>
        <div className="w-24 h-0.5 bg-neon-blue/30 mx-auto"></div>
      </div>

      {/* 新版儀表板 */}
      <DashboardNew />

      {/* 開發者指南（右下角固定） */}
      <DeveloperGuide />
    </main>
  )
}