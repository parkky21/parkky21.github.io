"use client";

import { motion, useReducedMotion } from "framer-motion";

/* A wobbly underline that "draws" itself when scrolled into view. */
export function ScribbleUnderline({
  className = "",
  color = "var(--color-accent)",
}: {
  className?: string;
  color?: string;
}) {
  // Reduced motion shortens transitions to 0 rather than changing the
  // rendered markup — a render branch would break hydration.
  const reduceMotion = useReducedMotion();
  return (
    <svg
      className={className}
      viewBox="0 0 300 18"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden
    >
      <motion.path
        d="M3 11C46 5 92 4 138 7c44 3 88 6 159 2"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : { duration: 0.7, ease: "easeInOut" }
        }
      />
      <motion.path
        d="M14 15C70 12 150 13 286 11"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.55"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : { duration: 0.7, delay: 0.12, ease: "easeInOut" }
        }
      />
    </svg>
  );
}

/* A small curvy arrow doodle. Rotate via className. */
export function Arrow({
  className = "",
  color = "var(--color-ink-soft)",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      className={`sketch ${className}`}
      viewBox="0 0 80 66"
      fill="none"
      aria-hidden
    >
      {/* body — curves from upper-left to right-centre */}
      <path
        d="M6 10C22 42 44 54 70 50"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* arrowhead upper arm — goes upper-left from tip */}
      <path
        d="M70 50C62 46 56 42 50 36"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* arrowhead lower arm — goes lower-left from tip (symmetric V) */}
      <path
        d="M70 50C62 54 56 57 50 60"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* A four-point sparkle/star doodle. */
export function Sparkle({
  className = "",
  color = "var(--color-accent)",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      className={`sketch ${className}`}
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden
    >
      <path
        d="M20 3C21 13 27 19 37 20C27 21 21 27 20 37C19 27 13 21 3 20C13 19 19 13 20 3Z"
        stroke={color}
        strokeWidth="2.5"
        strokeLinejoin="round"
        fill={color}
        fillOpacity="0.12"
      />
    </svg>
  );
}

/* A tiny hand-drawn neural network — three layers of nodes, fully connected. */
export function NeuralNet({
  className = "",
  color = "var(--color-ink-soft)",
  nodeColor = "var(--color-accent)",
}: {
  className?: string;
  color?: string;
  nodeColor?: string;
}) {
  const layers = [
    { x: 14, ys: [20, 46, 72] },
    { x: 62, ys: [10, 34, 58, 82] },
    { x: 110, ys: [32, 60] },
  ];
  return (
    <svg
      className={`sketch ${className}`}
      viewBox="0 0 124 92"
      fill="none"
      aria-hidden
    >
      {layers.slice(0, -1).map((layer, i) =>
        layer.ys.flatMap((y1) =>
          layers[i + 1].ys.map((y2) => (
            <line
              key={`${i}-${y1}-${y2}`}
              x1={layer.x}
              y1={y1}
              x2={layers[i + 1].x}
              y2={y2}
              stroke={color}
              strokeWidth="1.6"
              strokeLinecap="round"
              opacity="0.45"
            />
          ))
        )
      )}
      {layers.map((layer, i) =>
        layer.ys.map((y) => (
          <circle
            key={`${i}-${y}`}
            cx={layer.x}
            cy={y}
            r="5.5"
            stroke={color}
            strokeWidth="2.2"
            fill={i === layers.length - 1 ? nodeColor : "var(--color-paper)"}
            fillOpacity={i === layers.length - 1 ? 0.35 : 1}
          />
        ))
      )}
    </svg>
  );
}

/* A friendly robot head with an antenna. */
export function RobotDoodle({
  className = "",
  color = "var(--color-ink-soft)",
  accent = "var(--color-accent)",
}: {
  className?: string;
  color?: string;
  accent?: string;
}) {
  return (
    <svg
      className={`sketch ${className}`}
      viewBox="0 0 80 78"
      fill="none"
      aria-hidden
    >
      {/* antenna */}
      <line x1="40" y1="18" x2="40" y2="9" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="40" cy="6.5" r="3.5" stroke={color} strokeWidth="2" fill={accent} fillOpacity="0.4" />
      {/* ears */}
      <rect x="5" y="34" width="8" height="15" rx="3" stroke={color} strokeWidth="2.5" />
      <rect x="67" y="34" width="8" height="15" rx="3" stroke={color} strokeWidth="2.5" />
      {/* head */}
      <rect x="14" y="18" width="52" height="46" rx="11" stroke={color} strokeWidth="3" />
      {/* eyes */}
      <circle cx="30" cy="39" r="4" fill={color} />
      <circle cx="50" cy="39" r="4" fill={color} />
      {/* smile */}
      <path d="M30 51C34 56 46 56 50 51" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

/* An "AI" chip — square with pins, like a little GPU sticker. */
export function ChipDoodle({
  className = "",
  color = "var(--color-ink-soft)",
  accent = "var(--color-accent-deep)",
}: {
  className?: string;
  color?: string;
  accent?: string;
}) {
  const pins = [26, 42, 58];
  return (
    <svg
      className={`sketch ${className}`}
      viewBox="0 0 84 84"
      fill="none"
      aria-hidden
    >
      {pins.map((p) => (
        <g key={p} stroke={color} strokeWidth="2.5" strokeLinecap="round">
          <line x1={p} y1="12" x2={p} y2="22" />
          <line x1={p} y1="62" x2={p} y2="72" />
          <line x1="12" y1={p} x2="22" y2={p} />
          <line x1="62" y1={p} x2="72" y2={p} />
        </g>
      ))}
      <rect x="22" y="22" width="40" height="40" rx="7" stroke={color} strokeWidth="3" fill="var(--color-paper)" />
      <text
        x="42"
        y="49"
        textAnchor="middle"
        fontFamily="var(--font-caveat), cursive"
        fontWeight="700"
        fontSize="20"
        fill={accent}
      >
        AI
      </text>
    </svg>
  );
}

/* A little chart with a descending loss curve that draws itself in. */
export function LossCurve({
  className = "",
  color = "var(--color-ink-soft)",
  accent = "var(--color-teal)",
}: {
  className?: string;
  color?: string;
  accent?: string;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <svg
      className={`sketch ${className}`}
      viewBox="0 0 110 80"
      fill="none"
      aria-hidden
    >
      {/* axes */}
      <path
        d="M14 8V66H102"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* loss curve — steep drop, a bump, then a long flat tail */}
      <motion.path
        d="M18 14C24 44 32 28 42 46C50 58 72 58 98 61"
        stroke={accent}
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : { duration: 1.1, ease: "easeInOut" }
        }
      />
      <text
        x="66"
        y="30"
        fontFamily="var(--font-caveat), cursive"
        fontWeight="700"
        fontSize="15"
        fill={color}
      >
        loss ↓
      </text>
    </svg>
  );
}

/* A sitting cat — loaf pose, curled tail, content closed eyes. */
export function CatDoodle({
  className = "",
  color = "var(--color-ink-soft)",
  accent = "var(--color-accent)",
}: {
  className?: string;
  color?: string;
  accent?: string;
}) {
  return (
    <svg
      className={`sketch ${className}`}
      viewBox="0 0 92 84"
      fill="none"
      aria-hidden
    >
      {/* ears */}
      <path d="M18 21L14 6L29 13" stroke={color} strokeWidth="2.5" strokeLinejoin="round" fill={accent} fillOpacity="0.15" />
      <path d="M40 12L50 2L52 18" stroke={color} strokeWidth="2.5" strokeLinejoin="round" fill={accent} fillOpacity="0.15" />
      {/* head */}
      <path
        d="M15 32C13 20 22 12 33 12C45 12 51 20 50 31C49 40 42 45 32 45C23 45 16 40 15 32Z"
        stroke={color}
        strokeWidth="3"
      />
      {/* closed happy eyes */}
      <path d="M23 28C25 31 28 31 30 28" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
      <path d="M37 28C39 31 42 31 44 28" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
      {/* whiskers */}
      <path d="M12 33L3 31M12 37L4 38" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M52 32L61 30M52 36L60 37" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      {/* body — seated, chest to haunch */}
      <path
        d="M28 45C26 56 26 68 28 76M45 44C58 48 68 56 68 68L68 76"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* ground + front paws */}
      <path d="M22 76H74" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M34 76C34 72 40 72 40 76" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
      {/* tail curling around the front */}
      <path
        d="M68 72C80 74 86 66 82 56C80 51 74 49 70 53"
        stroke={color}
        strokeWidth="2.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* A cat peeking over an edge — ears, eyes and paws only. Sit it on top of
   a card or frame so the bottom of the viewBox lines up with the edge. */
export function CatPeekDoodle({
  className = "",
  color = "var(--color-ink-soft)",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      className={`sketch ${className}`}
      viewBox="0 0 100 46"
      fill="none"
      aria-hidden
    >
      {/* ears */}
      <path d="M22 22L18 4L34 14" stroke={color} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M66 14L82 4L78 22" stroke={color} strokeWidth="2.5" strokeLinejoin="round" />
      {/* top of head, dome over the edge */}
      <path d="M12 46C14 22 34 14 50 14C66 14 86 22 88 46" stroke={color} strokeWidth="3" strokeLinecap="round" />
      {/* wide peeking eyes */}
      <circle cx="36" cy="34" r="3.5" fill={color} />
      <circle cx="64" cy="34" r="3.5" fill={color} />
      {/* paws hooked over the edge */}
      <path d="M24 46C24 40 32 40 32 46" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M68 46C68 40 76 40 76 46" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

/* An original little battle-bot — finned helmet, visor band, bolt on the
   chest plate. Our own design, no franchise likeness. */
export function MechBotDoodle({
  className = "",
  color = "var(--color-ink-soft)",
  accent = "var(--color-teal)",
}: {
  className?: string;
  color?: string;
  accent?: string;
}) {
  return (
    <svg
      className={`sketch ${className}`}
      viewBox="0 0 90 100"
      fill="none"
      aria-hidden
    >
      {/* crown fin */}
      <path d="M45 3L39 14H51L45 3Z" stroke={color} strokeWidth="2.2" strokeLinejoin="round" fill={accent} fillOpacity="0.3" />
      {/* helmet */}
      <path
        d="M25 22C25 15 65 15 65 22L67 44C67 54 58 60 45 60C32 60 23 54 23 44L25 22Z"
        stroke={color}
        strokeWidth="3"
      />
      {/* visor band */}
      <rect x="29" y="30" width="32" height="11" rx="5.5" stroke={color} strokeWidth="2.4" fill={accent} fillOpacity="0.35" />
      <circle cx="38" cy="35.5" r="2" fill={color} />
      <circle cx="52" cy="35.5" r="2" fill={color} />
      {/* jaw vents */}
      <path d="M39 48V53M45 49V54M51 48V53" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
      {/* shoulders */}
      <path d="M23 70L10 78V92" stroke={color} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M67 70L80 78V92" stroke={color} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
      {/* chest plate */}
      <rect x="27" y="64" width="36" height="31" rx="7" stroke={color} strokeWidth="3" />
      {/* power bolt */}
      <path
        d="M48 69L40 81H46L42 91L52 78H46L50 69Z"
        stroke={color}
        strokeWidth="1.8"
        strokeLinejoin="round"
        fill={accent}
        fillOpacity="0.35"
      />
    </svg>
  );
}

/* A fountain pen, nib resting mid-sentence — for journal-style sections. */
export function PenDoodle({
  className = "",
  color = "var(--color-ink-soft)",
  accent = "var(--color-accent)",
}: {
  className?: string;
  color?: string;
  accent?: string;
}) {
  return (
    <svg
      className={`sketch ${className}`}
      viewBox="0 0 90 30"
      fill="none"
      aria-hidden
    >
      {/* barrel */}
      <path d="M8 22L64 8" stroke={color} strokeWidth="4" strokeLinecap="round" />
      {/* cap band */}
      <path d="M40 13.5L48 11.4" stroke={accent} strokeWidth="4" strokeLinecap="round" />
      {/* nib */}
      <path
        d="M64 8L82 3L70 17L64 8Z"
        stroke={color}
        strokeWidth="2"
        strokeLinejoin="round"
        fill="var(--color-paper)"
      />
      <path d="M72 8L74.5 6" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      {/* ink trail */}
      <path
        d="M6 24C4 25.5 3 27 5 27.5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}

/* A loose hand-drawn circle, e.g. to ring a word. */
export function CircleScribble({
  className = "",
  color = "var(--color-teal)",
}: {
  className?: string;
  color?: string;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <svg
      className={className}
      viewBox="0 0 200 90"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden
    >
      <motion.path
        d="M100 6C150 4 196 18 196 45C196 74 140 86 96 84C42 81 6 66 6 43C6 19 56 8 110 7"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.7 }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : { duration: 0.9, ease: "easeInOut" }
        }
      />
    </svg>
  );
}
