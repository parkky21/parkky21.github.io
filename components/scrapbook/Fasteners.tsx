/**
 * The little bits of hardware that hold a real scrapbook together — a paper
 * clip, a staple, photo corners and a push pin. All purely decorative
 * (aria-hidden) and absolutely positioned: place, size and rotate them from
 * the call site via className, on a `relative` parent.
 */

/** A bent-wire paper clip, drawn to hang over a card's top edge. */
export function PaperClip({
  className = "",
  color = "#9aa3a8",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 64"
      fill="none"
      className={`pointer-events-none absolute z-20 drop-shadow-[1px_2px_1.5px_rgba(40,25,10,0.35)] ${className}`}
    >
      <path
        d="M8 20V52a6 6 0 0 0 12 0V12a9 9 0 0 0-18 0v38"
        stroke={color}
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      {/* a glint along the wire so it reads as metal */}
      <path
        d="M3.4 14a7.6 7.6 0 0 1 7-9.2"
        stroke="#fff"
        strokeOpacity="0.75"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** A single office staple punched through the paper. */
export function Staple({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute z-20 block h-[5px] w-7 rounded-[1px] ${className}`}
      style={{
        background:
          "linear-gradient(180deg, #e6e9eb 0%, #a9b0b5 45%, #7d858a 100%)",
        boxShadow:
          "0 1px 1px rgba(40,25,10,0.45), inset 0 0 0 0.5px rgba(0,0,0,0.25)",
      }}
    />
  );
}

/**
 * Four mounting corners, the kind you lick and stick to hold a photo in an
 * album. Sits inside a `relative` frame and covers its corners.
 */
export function PhotoCorners({
  color = "#3a2f2f",
  size = 22,
}: {
  color?: string;
  size?: number;
}) {
  const corners = [
    "left-0 top-0",
    "right-0 top-0 rotate-90",
    "bottom-0 right-0 rotate-180",
    "bottom-0 left-0 -rotate-90",
  ];
  return (
    <>
      {corners.map((pos) => (
        <span
          key={pos}
          aria-hidden
          className={`pointer-events-none absolute z-10 block ${pos}`}
          style={{
            width: size,
            height: size,
            background: color,
            clipPath: "polygon(0 0, 100% 0, 0 100%)",
            filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.3))",
            opacity: 0.88,
          }}
        />
      ))}
    </>
  );
}

/** A round-headed push pin, seen from slightly above. */
export function PushPin({
  className = "",
  color = "#c43d2b",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className={`pointer-events-none absolute z-20 h-6 w-6 ${className}`}
    >
      <ellipse cx="13" cy="17" rx="6" ry="3" fill="rgba(40,25,10,0.28)" />
      <circle cx="12" cy="11" r="7" fill={color} />
      <circle cx="12" cy="11" r="6.4" fill="none" stroke="#000" strokeOpacity="0.2" strokeWidth="1.2" />
      <circle cx="9.5" cy="8.5" r="2" fill="#fff" fillOpacity="0.6" />
    </svg>
  );
}
