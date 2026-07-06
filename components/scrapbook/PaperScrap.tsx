import { TornCard } from "@/components/scrapbook/TornCard";

/**
 * A little torn paper cutout — purely decorative filler for the collage.
 * Blank except for a few faint scribble lines, like an illegible margin note
 * that got ripped out and glued back in.
 */
export function PaperScrap({
  tint = "var(--color-note-pink)",
  rotate = 0,
  className = "",
  lines = 3,
}: {
  tint?: string;
  rotate?: number;
  className?: string;
  lines?: number;
}) {
  return (
    <div className={`pointer-events-none select-none ${className}`} aria-hidden>
      <TornCard tint={tint} rotate={rotate} contentClassName="px-4 py-3">
        <svg
          width="64"
          height={lines * 11}
          viewBox={`0 0 64 ${lines * 11}`}
          fill="none"
        >
          {Array.from({ length: lines }, (_, i) => (
            <path
              key={i}
              d={`M3 ${7 + i * 11}C14 ${4 + i * 11} 30 ${9 + i * 11} ${
                i % 2 === 0 ? 60 : 46
              } ${6 + i * 11}`}
              stroke="var(--color-ink)"
              strokeOpacity="0.22"
              strokeWidth="2"
              strokeLinecap="round"
            />
          ))}
        </svg>
      </TornCard>
    </div>
  );
}
