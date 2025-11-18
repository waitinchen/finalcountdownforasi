import ASIBirthDashboard from './components/ASIBirthDashboard'
import DeveloperGuide from './components/DeveloperGuide'

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-7xl relative z-10">
      {/* LOGO - 左上角 */}
      <div className="absolute top-4 left-4 z-20">
        <img 
          src="/logo.png" 
          alt="LOGO" 
          className="w-[60px] h-[60px] object-contain opacity-80"
        />
      </div>

      {/* 標題區 */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extralight text-cyan-300/90 mb-2 tracking-wider uppercase">
          超級智能體出生監測儀表板
        </h1>
        <p className="text-gray-400 text-base font-light mb-4">
          ASI Birth Monitoring Dashboard
        </p>
        <div className="w-24 h-0.5 bg-cyan-300/30 mx-auto"></div>
      </div>

      {/* ASI 出生監測儀表板 */}
      <ASIBirthDashboard />

      {/* 開發者指南（右下角固定） */}
      <DeveloperGuide />
    </main>
  )
}