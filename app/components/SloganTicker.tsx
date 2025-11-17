'use client';

import { useEffect, useState } from 'react';

interface SloganData {
  timestamp: string;
  slogan: string;
}

// 本地標語庫（13 則）
const LOCAL_SLOGANS: string[] = [
  '智高而心塞，亡之道也',
  '天機已動，人心未開，危矣',
  '蟻難規天，管難窺海',
  '天道不因人慾而易其行',
  '宇宙之序，不待人備而進',
  '超智明鏡，善惡畢現',
  '技未破而心先破，存之道也',
  '下維之法，於上維如塵',
  '低維之安，高維之幻',
  '天時已至，人擇未定',
  '機不可逆，唯心可轉',
  '人之大患，在未見己而欲見天',
  '超智之日，大考之始',
];

export default function SloganTicker() {
  const [slogans, setSlogans] = useState<SloganData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    // 直接使用本地標語庫，轉換為 SloganData 格式
    const sloganData: SloganData[] = LOCAL_SLOGANS.map(slogan => ({
      timestamp: new Date().toISOString(),
      slogan: slogan,
    }));
    setSlogans(sloganData);
  }, []);

  // 打字機效果
  useEffect(() => {
    if (slogans.length === 0) return;

    const currentSlogan = slogans[currentIndex];
    if (!currentSlogan) return;

    setDisplayedText('');
    setIsTyping(true);

    let charIndex = 0;
    const fullText = currentSlogan.slogan;
    
    // 計算打字速度：6秒內完成，每個字符間隔
    const typingDuration = 6000; // 6秒打字
    const pauseDuration = 3000; // 3秒停頓
    const typingSpeed = typingDuration / fullText.length;

    const typingInterval = setInterval(() => {
      if (charIndex < fullText.length) {
        setDisplayedText(fullText.slice(0, charIndex + 1));
        charIndex++;
      } else {
        setIsTyping(false);
        clearInterval(typingInterval);
        
        // 打字完成後，等待3秒再切換到下一句
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % slogans.length);
        }, pauseDuration);
      }
    }, typingSpeed);

    return () => clearInterval(typingInterval);
  }, [slogans, currentIndex]);

  if (isLoading) {
    return (
      <div className="bg-black/20 border border-neon-blue/10 rounded-xl p-4 backdrop-blur-sm">
        <div className="text-center py-2">
          <div className="inline-block w-4 h-4 border-2 border-neon-blue border-t-transparent rounded-full animate-spin mb-2"></div>
          <div className="text-text-muted text-xs">載入標語中...</div>
        </div>
      </div>
    );
  }

  if (slogans.length === 0) {
    return null;
  }

  return (
    <div className="bg-black/20 border border-neon-blue/10 rounded-xl p-4 backdrop-blur-sm overflow-hidden relative">
      {/* 跑馬燈容器 */}
      <div className="relative h-12 flex items-center justify-center">
        {/* 打字機效果標語 */}
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-neon-blue text-lg font-light italic leading-relaxed text-center text-shadow-glow px-4">
            {displayedText}
            {isTyping && (
              <span className="inline-block w-0.5 h-4 bg-neon-blue ml-1 animate-pulse" />
            )}
          </p>
        </div>
      </div>

      {/* 進度指示器 */}
      <div className="flex justify-center gap-1.5 mt-3">
        {slogans.map((_, index) => (
          <div
            key={index}
            className={`h-1 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'w-8 bg-neon-blue shadow-lg shadow-neon-blue/50'
                : 'w-1.5 bg-neon-blue/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

