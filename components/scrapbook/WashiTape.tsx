const TAPE_TINTS = {
  amber: "rgba(224, 138, 60, 0.45)",
  teal: "rgba(42, 157, 143, 0.4)",
  kraft: "rgba(217, 199, 167, 0.65)",
} as const;

/**
 * A translucent washi-tape strip with ragged torn ends. Purely decorative —
 * position, size and rotate it from the call site via className (the
 * component sets no size or transform of its own, so width/height/rotate
 * utilities all apply cleanly).
 */
export function WashiTape({
  color = "kraft",
  className = "",
}: {
  color?: keyof typeof TAPE_TINTS;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute block ${className}`}
      style={{
        background: `repeating-linear-gradient(45deg, rgba(255,255,255,0.28) 0 5px, transparent 5px 11px), ${TAPE_TINTS[color]}`,
        mixBlendMode: "multiply",
        boxShadow: "0 1px 2px rgba(58,47,47,0.12)",
        clipPath:
          "polygon(1.5% 0%, 98.5% 2%, 100% 14%, 98% 26%, 100% 38%, 98.5% 50%, 100% 62%, 98% 74%, 100% 86%, 98.5% 98%, 2% 100%, 0% 86%, 1.8% 74%, 0.3% 62%, 1.5% 50%, 0% 38%, 1.8% 26%, 0.5% 14%, 1.5% 4%)",
      }}
    />
  );
}
