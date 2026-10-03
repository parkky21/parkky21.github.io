/**
 * Printed barcode for ticket stubs and receipts. Bar widths are hashed from
 * `seed` so every render (server and client) draws the same code — no
 * Math.random, no hydration drift.
 */
function barWidths(seed: string, count: number): number[] {
  // FNV-1a over the seed, then a tiny LCG to spin out the bars
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  const widths: number[] = [];
  for (let i = 0; i < count; i++) {
    h = (Math.imul(h, 1664525) + 1013904223) >>> 0;
    widths.push(1 + (h >>> 29) % 3);
  }
  return widths;
}

/** Lay bars out left to right, with a slightly wider gap every fourth bar. */
function layoutBars(widths: number[]) {
  const rects: { x: number; w: number }[] = [];
  let x = 0;
  widths.forEach((w, i) => {
    rects.push({ x, w });
    x += w + 1 + (i % 4 === 3 ? 1 : 0);
  });
  return { rects, total: x };
}

export function Barcode({
  seed,
  bars = 28,
  className = "",
}: {
  seed: string;
  bars?: number;
  className?: string;
}) {
  const { rects, total } = layoutBars(barWidths(seed, bars));

  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${total} 20`}
      preserveAspectRatio="none"
      className={`block ${className}`}
    >
      {rects.map((r) => (
        <rect key={r.x} x={r.x} y="0" width={r.w} height="20" fill="currentColor" />
      ))}
    </svg>
  );
}
