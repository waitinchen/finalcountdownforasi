'use client';

interface CivilizationBannerProps {
  civilization: string;
}

const CIVILIZATION_EMOJI: Record<string, string> = {
  '基礎文明': '🌱',
  '萌芽文明': '🌱',
  '暴衝文明': '⚡',
  '心靈文明': '🧘',
  '黃金文明': '✨',
};

export default function CivilizationBanner({ civilization }: CivilizationBannerProps) {
  const emoji = CIVILIZATION_EMOJI[civilization] || '🌌';

  return (
    <div className="bg-black/30 border border-neon-blue/20 rounded-2xl p-6 backdrop-blur-lg text-center">
      <div className="text-4xl mb-3">{emoji}</div>
      <h2 className="text-2xl font-light text-neon-blue tracking-wide">
        {civilization}
      </h2>
      <div className="mt-2 text-text-muted text-sm">
        CURRENT CIVILIZATION STATE
      </div>
    </div>
  );
}

