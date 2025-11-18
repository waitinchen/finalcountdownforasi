'use client';

interface KPICardsProps {
  tech: number;
  heart: number;
  readiness: number;
  balance: number;
  safetyBias: number;
  countdown: number;
}

export default function KPICards({
  tech,
  heart,
  readiness,
  balance,
  safetyBias,
  countdown,
}: KPICardsProps) {
  const cards = [
    {
      label: 'Tech',
      value: tech.toFixed(1),
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30',
    },
    {
      label: 'Heart',
      value: heart.toFixed(1),
      color: 'text-pink-400',
      bgColor: 'bg-pink-500/10',
      borderColor: 'border-pink-500/30',
    },
    {
      label: 'Readiness',
      value: readiness.toFixed(1),
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/30',
    },
    {
      label: 'Balance',
      value: balance.toFixed(1),
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/30',
    },
    {
      label: 'Safety Bias',
      value: safetyBias > 0 ? `+${safetyBias.toFixed(1)}` : safetyBias.toFixed(1),
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30',
    },
    {
      label: 'Countdown',
      value: countdown.toLocaleString('zh-TW'),
      color: 'text-red-400',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/30',
      unit: '天',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`${card.bgColor} ${card.borderColor} border rounded-xl p-4 backdrop-blur-sm transition-all duration-300 hover:scale-105`}
        >
          <div className={`${card.color} text-xs font-light mb-2 tracking-wide uppercase`}>
            {card.label}
          </div>
          <div className={`${card.color} text-2xl font-semibold`}>
            {card.value}
            {card.unit && <span className="text-sm ml-1">{card.unit}</span>}
          </div>
        </div>
      ))}
    </div>
  );
}

