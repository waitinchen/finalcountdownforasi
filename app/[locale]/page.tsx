'use client';

import {useTranslations} from 'next-intl';
import ASIBirthDashboard from '../components/ASIBirthDashboard';
import DeveloperGuide from '../components/DeveloperGuide';

export default function Home() {
  const t = useTranslations('Dashboard');

  return (
    <main className="container mx-auto px-3 md:px-4 py-4 md:py-8 max-w-7xl relative z-10">
      {/* LOGO - 左上角 */}
      <div className="absolute top-2 left-2 md:top-4 md:left-4 z-20">
        <img 
          src="/logo.png" 
          alt="LOGO" 
          className="w-[40px] h-[40px] md:w-[60px] md:h-[60px] object-contain opacity-80"
        />
      </div>

      {/* 標題區 */}
      <div className="text-center mb-6 md:mb-12 pt-12 md:pt-0 lg:pt-16">
        <h1 className="text-2xl md:text-4xl font-extralight text-cyan-300/90 mb-2 tracking-wider uppercase px-2">
          {t('title')}
        </h1>
        <p className="text-gray-400 text-sm md:text-base font-light mb-3 md:mb-4">
          {t('subtitle')}
        </p>
        <div className="w-16 md:w-24 h-0.5 bg-cyan-300/30 mx-auto"></div>
      </div>

      {/* ASI 出生監測儀表板 */}
      <ASIBirthDashboard />

      {/* 開發者指南（右下角固定） */}
      <DeveloperGuide />
    </main>
  );
}

