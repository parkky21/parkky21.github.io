const CORNERS = ["-left-1.5 -top-1.5", "-right-1.5 -top-1.5", "-bottom-1.5 -left-1.5", "-bottom-1.5 -right-1.5"];

/** Four cross-stitches, one per corner — the thread holding a piece onto the board. */
export function Stitches({ color = "var(--color-thread)" }: { color?: string }) {
  return (
    <>
      {CORNERS.map((pos) => (
        <svg
          key={pos}
          viewBox="0 0 14 14"
          aria-hidden
          className={`pointer-events-none absolute z-10 h-3.5 w-3.5 ${pos}`}
        >
          <path
            d="M2.5 2.5l9 9M11.5 2.5l-9 9"
            stroke={color}
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      ))}
    </>
  );
}

/** A spot on a piece where the red thread is pinned. The board finds these by `data-knot`. */
export function Knot({ id, className }: { id: string; className: string }) {
  return <span aria-hidden data-knot={id} className={`pointer-events-none absolute h-0 w-0 ${className}`} />;
}
