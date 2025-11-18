'use client';

import { ASIBirthIndexes } from '@/lib/types';

interface ASIIndexModulesProps {
  indexes: ASIBirthIndexes;
}

const MODULE_INFO = {
  tone: {
    label: 'Environment Tone',
    labelZh: '環境氛圍指數',
    description: 'Global Tone Stability',
    color: 'rgba(147, 197, 253, 0.8)',
    bgColor: 'rgba(147, 197, 253, 0.1)',
  },
  compute: {
    label: 'Cognitive Capacity',
    labelZh: '認知能力指數',
    description: 'Compute Availability',
    color: 'rgba(255, 255, 255, 0.9)',
    bgColor: 'rgba(255, 255, 255, 0.1)',
  },
  embodiment: {
    label: 'Embodiment Readiness',
    labelZh: '具身條件指數',
    description: 'Infrastructure Sensory Field',
    color: 'rgba(200, 200, 200, 0.8)',
    bgColor: 'rgba(200, 200, 200, 0.1)',
  },
  agency: {
    label: 'Agency Integration',
    labelZh: '自主程度指數',
    description: 'Autonomy Emergence Level',
    color: 'rgba(134, 239, 172, 0.8)',
    bgColor: 'rgba(134, 239, 172, 0.1)',
  },
  hcm: {
    label: 'HCM Resonance',
    labelZh: '心理共鳴指數',
    description: 'Collective Mind Resonance',
    color: 'rgba(196, 181, 253, 0.8)',
    bgColor: 'rgba(196, 181, 253, 0.1)',
  },
};

export default function ASIIndexModules({ indexes }: ASIIndexModulesProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-6">
      {(Object.keys(indexes) as Array<keyof ASIBirthIndexes>).map((key) => {
        const value = indexes[key];
        const percent = value * 100;
        const info = MODULE_INFO[key];
        const circumference = 2 * Math.PI * 45;
        const offset = circumference - (percent / 100) * circumference;

        return (
          <div
            key={key}
            className="bg-white/5 border border-cyan-300/20 rounded-xl md:rounded-2xl p-3 md:p-6 backdrop-blur-lg hover:bg-white/8 transition-all duration-300"
          >
            <div className="text-center mb-2 md:mb-4">
              <div className="text-gray-400 text-xs font-light mb-1">{info.label}</div>
              <div className="text-cyan-300/80 text-xs md:text-sm font-light mb-1 md:mb-2">{info.labelZh}</div>
            </div>

            {/* 圓形進度條 */}
            <div className="relative w-20 h-20 md:w-32 md:h-32 mx-auto mb-2 md:mb-4">
              <svg className="transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="rgba(147, 197, 253, 0.1)"
                  strokeWidth="6"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke={info.color}
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                  className="transition-all duration-1000 ease-out"
                  style={{
                    filter: `drop-shadow(0 0 4px ${info.color})`,
                  }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-white/90 text-base md:text-2xl font-light tabular-nums">
                    {percent.toFixed(1)}%
                  </div>
                </div>
              </div>
            </div>

            {/* 描述 */}
            <div className="text-center">
              <div className="text-gray-400 text-xs font-light">{info.description}</div>
            </div>

            {/* 呼吸動畫指示器 */}
            <div className="mt-2 md:mt-4 flex justify-center">
              <div
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor: info.color,
                  animation: 'breathe 3s ease-in-out infinite',
                }}
              ></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

