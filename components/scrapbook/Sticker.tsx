import type { CSSProperties, ReactNode } from "react";

/**
 * A die-cut sticker: white pill with a soft lifted shadow and a slight tilt.
 * Used for the nav logo, timeline badges, and little callouts.
 */
export function Sticker({
  rotate = 0,
  tint = "#ffffff",
  className = "",
  children,
}: {
  rotate?: number;
  tint?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={`scrap-tilt scrap-tilt-hover inline-flex items-center gap-1.5 rounded-full border border-ink/10 px-3 py-1 shadow-[0_2px_6px_rgba(58,47,47,0.18)] ${className}`}
      style={{
        background: tint,
        "--tilt-rotate": `${rotate}deg`,
      } as CSSProperties}
    >
      {children}
    </span>
  );
}
