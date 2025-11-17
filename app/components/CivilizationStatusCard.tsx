'use client';

import { useState, useRef, useEffect } from 'react';

export type CivilizationCode = "basic" | "seed" | "runaway" | "heart" | "golden";

const CIVILIZATION_LABEL: Record<CivilizationCode, string> = {
  basic: "基礎文明",
  seed: "萌芽文明",
  runaway: "暴衝文明",
  heart: "心靈文明",
  golden: "黃金文明",
};

const CIVILIZATION_TAGLINE: Record<CivilizationCode, string> = {
  basic: "技術剛起步，距離 ASI 仍然遙遠，屬於安全但遲緩的階段。",
  seed: "技術開始成形，社會已感覺到 AI 影響，但治理還在摸索。",
  runaway: "技術暴衝超前，治理與心智跟不上，風險與紅利都被放大。",
  heart: "技術與心智逐漸對齊，開始討論倫理、邊界與共同未來。",
  golden: "技術成熟且人類心智跟上，ASI 成為文明共同的守護者。",
};

const CIVILIZATION_COLOR: Record<CivilizationCode, string> = {
  basic: "#4b9fff",
  seed: "#41d392",
  runaway: "#ff6b6b",
  heart: "#ffb347",
  golden: "#ffd93b",
};

const ALL_CIVILIZATIONS: CivilizationCode[] = ["basic", "seed", "runaway", "heart", "golden"];

interface CivilizationStatusCardProps {
  civilization: CivilizationCode | null;  // 從 API 帶進來
  countdownDays: number;                 // 下面還是可以保留倒數天數
}

export default function CivilizationStatusCard({
  civilization,
  countdownDays,
}: CivilizationStatusCardProps) {
  const currentCode: CivilizationCode = civilization ?? "basic";
  const [currentIndex, setCurrentIndex] = useState(ALL_CIVILIZATIONS.indexOf(currentCode));
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 確保初始索引正確
  useEffect(() => {
    const index = ALL_CIVILIZATIONS.indexOf(currentCode);
    if (index !== -1) {
      setCurrentIndex(index);
    }
  }, [currentCode]);

  // 滑動距離閾值
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      // 向左滑動，顯示下一個
      setCurrentIndex((prev) => (prev + 1) % ALL_CIVILIZATIONS.length);
    } else if (isRightSwipe) {
      // 向右滑動，顯示上一個
      setCurrentIndex((prev) => (prev - 1 + ALL_CIVILIZATIONS.length) % ALL_CIVILIZATIONS.length);
    }
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % ALL_CIVILIZATIONS.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + ALL_CIVILIZATIONS.length) % ALL_CIVILIZATIONS.length);
  };

  const displayedCode = ALL_CIVILIZATIONS[currentIndex];
  const isCurrent = displayedCode === currentCode;

  return (
    <div 
      ref={containerRef}
      className="h-full w-full rounded-2xl bg-black/30 border border-neon-blue/20 px-8 py-10 flex flex-col justify-between backdrop-blur-lg relative overflow-hidden"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* 左右箭頭按鈕 */}
      <button
        onClick={goToPrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-neon-blue/60 hover:text-neon-blue hover:bg-neon-blue/10 rounded-full transition-all z-10"
        aria-label="上一個文明狀態"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={goToNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-neon-blue/60 hover:text-neon-blue hover:bg-neon-blue/10 rounded-full transition-all z-10"
        aria-label="下一個文明狀態"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* 標題 */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className={`text-sm tracking-[0.25em] ${isCurrent ? 'text-neon-blue' : 'text-text-muted'}`}>
            當下文明狀態
          </div>
          <div className="text-xs text-text-muted mt-1">
            CURRENT CIVILIZATION STATE
          </div>
        </div>
        {/* 狀態指示器 */}
        <div className="flex gap-1">
          {ALL_CIVILIZATIONS.map((code, idx) => (
            <div
              key={code}
              className={`w-1.5 h-1.5 rounded-full transition-all ${
                idx === currentIndex
                  ? isCurrent
                    ? 'bg-neon-blue'
                    : 'bg-text-muted'
                  : 'bg-text-muted/30'
              }`}
            />
          ))}
        </div>
      </div>

      {/* 大字：文明名稱 */}
      <div className="mt-6">
        <div 
          className="text-[52px] leading-none font-semibold transition-colors duration-300"
          style={{ 
            color: isCurrent ? CIVILIZATION_COLOR[displayedCode] : '#6b7280' 
          }}
        >
          {CIVILIZATION_LABEL[displayedCode]}
        </div>
        <div className={`mt-4 text-sm leading-relaxed transition-colors duration-300 ${
          isCurrent ? 'text-text-secondary' : 'text-text-muted'
        }`}>
          {CIVILIZATION_TAGLINE[displayedCode]}
        </div>
        {/* 狀態標籤 */}
        {!isCurrent && (
          <div className="mt-3 text-xs text-text-muted italic">
            (數據不符合此狀態)
          </div>
        )}
      </div>

      {/* 底部：仍然可以保留倒數天數 */}
      <div className="mt-10 pt-6 border-t border-neon-blue/20">
        <div className="text-xs text-text-muted mb-1">
          距離 ASI 降臨預計還有
        </div>
        <div className={`text-4xl font-semibold tracking-tight transition-colors duration-300 ${
          isCurrent ? 'text-neon-blue' : 'text-text-muted'
        }`}>
          {countdownDays.toLocaleString("zh-TW")}
          <span className="ml-2 text-lg text-text-muted">天</span>
        </div>
      </div>
    </div>
  );
}

