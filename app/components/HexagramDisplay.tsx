'use client';

import { useEffect, useState } from 'react';
import { HexagramData } from '@/lib/types';

interface HexagramDisplayProps {
  hexagram: HexagramData;
}

export default function HexagramDisplay({ hexagram }: HexagramDisplayProps) {
  const [visibleYao, setVisibleYao] = useState<number[]>([]);

  useEffect(() => {
    // 逐條淡入動畫
    setVisibleYao([]);
    hexagram.yao.forEach((_, index) => {
      setTimeout(() => {
        setVisibleYao((prev) => [...prev, index]);
      }, index * 200);
    });
  }, [hexagram.yao]);

  // 自下而上顯示（從索引5到0）
  const displayYao = [...hexagram.yao].reverse();

  return (
    <div className="bg-black/30 border border-neon-blue/20 rounded-2xl p-8 backdrop-blur-lg">
      <h2 className="text-xl font-light text-neon-blue mb-6 tracking-wide uppercase text-center">
        易經卦象
      </h2>

      <div className="space-y-6">
        {/* 卦象符號（大字） */}
        <div className="text-center">
          <div
            className="text-7xl font-light text-yellow-300/80 mb-4 transition-transform duration-300 hover:scale-110 cursor-pointer"
            style={{ fontFamily: 'serif' }}
          >
            {hexagram.symbol}
          </div>
        </div>

        {/* 卦名與卦辭 */}
        <div className="text-center space-y-2">
          <div className="text-neon-blue text-lg font-light">
            {hexagram.fullName}
          </div>
          <div className="text-text-secondary text-sm italic">
            {hexagram.judgment}
          </div>
        </div>

        {/* 六爻顯示（自下而上） */}
        <div className="space-y-2">
          <div className="text-text-muted text-xs text-center mb-3">六爻（自下而上）</div>
          {displayYao.map((yao, index) => {
            const originalIndex = 5 - index;
            const isVisible = visibleYao.includes(originalIndex);
            const isYang = yao === 1;
            
            return (
              <div
                key={index}
                className={`flex items-center justify-center transition-opacity duration-500 ${
                  isVisible ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div className={`text-2xl font-mono ${
                  isYang ? 'text-yellow-300' : 'text-gray-400'
                }`}>
                  {isYang ? '———' : '— —'}
                </div>
                <span className="ml-3 text-text-muted text-xs">
                  {isYang ? '陽' : '陰'}
                </span>
              </div>
            );
          })}
        </div>

        {/* 文明解讀（最重要） */}
        <div className="mt-8 pt-6 border-t border-neon-blue/20">
          <div className="text-text-muted text-xs mb-2 text-center">文明解讀</div>
          <div className="text-neon-blue text-lg font-light text-center leading-relaxed animate-fade-in">
            {hexagram.meaning}
          </div>
        </div>
      </div>
    </div>
  );
}

