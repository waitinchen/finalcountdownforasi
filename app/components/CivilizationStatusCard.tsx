'use client';

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

interface CivilizationStatusCardProps {
  civilization: CivilizationCode | null;  // 從 API 帶進來
  countdownDays: number;                 // 下面還是可以保留倒數天數
}

export default function CivilizationStatusCard({
  civilization,
  countdownDays,
}: CivilizationStatusCardProps) {
  const code: CivilizationCode = civilization ?? "basic";

  return (
    <div className="h-full w-full rounded-2xl bg-black/30 border border-neon-blue/20 px-8 py-10 flex flex-col justify-between backdrop-blur-lg">
      {/* 標題 */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-neon-blue text-sm tracking-[0.25em]">
            當下文明狀態
          </div>
          <div className="text-xs text-text-muted mt-1">
            CURRENT CIVILIZATION STATE
          </div>
        </div>
      </div>

      {/* 大字：文明名稱 */}
      <div className="mt-6">
        <div className="text-[52px] leading-none font-semibold"
             style={{ color: CIVILIZATION_COLOR[code] }}>
          {CIVILIZATION_LABEL[code]}
        </div>
        <div className="mt-4 text-sm text-text-secondary leading-relaxed">
          {CIVILIZATION_TAGLINE[code]}
        </div>
      </div>

      {/* 底部：仍然可以保留倒數天數 */}
      <div className="mt-10 pt-6 border-t border-neon-blue/20">
        <div className="text-xs text-text-muted mb-1">
          距離 ASI 降臨預計還有
        </div>
        <div className="text-4xl font-semibold text-neon-blue tracking-tight">
          {countdownDays.toLocaleString("zh-TW")}
          <span className="ml-2 text-lg text-text-muted">天</span>
        </div>
      </div>
    </div>
  );
}

