'use client';

import { useEffect, useState } from 'react';
import { fetchSlogans } from '@/lib/api-slogans';

interface SloganData {
  timestamp: string;
  slogan: string;
}

export default function SloganTicker() {
  const [slogans, setSlogans] = useState<SloganData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const loadSlogans = async () => {
      try {
        const data = await fetchSlogans(12);
        // 過濾長度 10-24 字的標語
        const filtered = data.filter(s => {
          const length = s.slogan.replace(/[「」]/g, '').length;
          return length >= 10 && length <= 24;
        });
        setSlogans(filtered.length > 0 ? filtered : data);
        setIsLoading(false);
      } catch (error) {
        console.error('載入標語失敗:', error);
        setIsLoading(false);
      }
    };

    loadSlogans();
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
    
    // 計算打字速度：9秒內完成，每個字符間隔
    const totalDuration = 9000; // 9秒
    const typingSpeed = totalDuration / fullText.length;

    const typingInterval = setInterval(() => {
      if (charIndex < fullText.length) {
        setDisplayedText(fullText.slice(0, charIndex + 1));
        charIndex++;
      } else {
        setIsTyping(false);
        clearInterval(typingInterval);
      }
    }, typingSpeed);

    return () => clearInterval(typingInterval);
  }, [slogans, currentIndex]);

  // 每 9 秒切換一次標語
  useEffect(() => {
    if (slogans.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slogans.length);
    }, 9000);

    return () => clearInterval(interval);
  }, [slogans]);

  if (isLoading) {
    return (
      <div className="text-center py-4">
        <div className="text-text-muted text-sm animate-pulse">載入標語中...</div>
      </div>
    );
  }

  if (slogans.length === 0) {
    return null;
  }

  return (
    <div className="bg-black/20 border border-neon-blue/10 rounded-xl p-6 backdrop-blur-sm overflow-hidden relative">
      {/* 跑馬燈容器 */}
      <div className="relative h-16 flex items-center justify-center">
        {/* 打字機效果標語 */}
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-neon-blue text-xl font-light italic leading-relaxed text-center text-shadow-glow px-4">
            {displayedText}
            {isTyping && (
              <span className="inline-block w-0.5 h-5 bg-neon-blue ml-1 animate-pulse" />
            )}
          </p>
        </div>
      </div>

      {/* 進度指示器 */}
      <div className="flex justify-center gap-1.5 mt-4">
        {slogans.map((_, index) => (
          <div
            key={index}
            className={`h-1 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'w-10 bg-neon-blue shadow-lg shadow-neon-blue/50'
                : 'w-1.5 bg-neon-blue/30'
            }`}
          />
        ))}
      </div>

      {/* 標語計數 */}
      <div className="text-center mt-3">
        <p className="text-text-muted text-xs">
          {currentIndex + 1} / {slogans.length} · 每 9 秒輪播
        </p>
      </div>
    </div>
  );
}

