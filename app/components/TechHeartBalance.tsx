'use client';

interface TechHeartBalanceProps {
  tech: number;
  heart: number;
}

export default function TechHeartBalance({ tech, heart }: TechHeartBalanceProps) {
  const total = tech + heart;
  const techPercent = total > 0 ? (tech / total) * 100 : 50;
  const heartPercent = total > 0 ? (heart / total) * 100 : 50;

  return (
    <div className="bg-black/30 border border-neon-blue/20 rounded-2xl p-8 backdrop-blur-lg h-full w-full">
      <h2 className="text-xl font-light text-neon-blue mb-6 tracking-wide uppercase text-center">
        心與術平衡儀
      </h2>
      
      <div className="space-y-6">
        {/* Tech vs Heart 對比條 */}
        <div className="space-y-4">
          {/* Tech 條 */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-text-secondary text-sm">術 (Tech)</span>
              <span className="text-blue-400 font-medium">{tech.toFixed(1)}</span>
            </div>
            <div className="relative h-8 bg-black/50 rounded-lg overflow-hidden border border-neon-blue/20">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg transition-all duration-1000"
                style={{ width: `${techPercent}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
              </div>
            </div>
          </div>

          {/* Heart 條 */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-text-secondary text-sm">心 (Heart)</span>
              <span className="text-pink-400 font-medium">{heart.toFixed(1)}</span>
            </div>
            <div className="relative h-8 bg-black/50 rounded-lg overflow-hidden border border-neon-blue/20">
              <div
                className="h-full bg-gradient-to-r from-pink-500 to-pink-600 rounded-lg transition-all duration-1000"
                style={{ width: `${heartPercent}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
              </div>
            </div>
          </div>
        </div>

        {/* Yin-Yang 風格指示器 */}
        <div className="flex items-center justify-center pt-4">
          <div className="relative w-32 h-32">
            {/* 外圈 */}
            <div className="absolute inset-0 rounded-full border-2 border-neon-blue/30"></div>
            
            {/* 動態平衡球 */}
            <div
              className="absolute top-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-pink-500 transform -translate-y-1/2 transition-all duration-1000"
              style={{
                left: `calc(${techPercent}% - 2rem)`,
              }}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400/50 to-pink-400/50 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* 平衡狀態文字 */}
        <div className="text-center pt-4">
          <div className="text-text-muted text-xs mb-1">平衡狀態</div>
          <div className="text-neon-blue text-sm font-light">
            {tech > heart ? '術 > 心' : tech < heart ? '心 > 術' : '心術平衡'}
          </div>
        </div>
      </div>
    </div>
  );
}

