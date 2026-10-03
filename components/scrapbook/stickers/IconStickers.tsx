import type { ReactNode } from "react";
import { DieCut } from "./DieCut";

/**
 * Illustrated die-cut stickers — flat colour, chunky ink outline, the kind
 * you'd find on a laptop lid. All share one 64×64 artboard; size with
 * `size` (px). Decorative unless given a `label`.
 */
type IconProps = { size?: number; rotate?: number; className?: string; label?: string };

const INK = "#3a2f2f";
const LINE = { stroke: INK, strokeWidth: 2.5, strokeLinecap: "round", strokeLinejoin: "round" } as const;

function Icon({
  size = 64,
  rotate = 0,
  className = "",
  label,
  children,
}: IconProps & { children: ReactNode }) {
  return (
    <DieCut rotate={rotate} className={className} label={label}>
      <svg viewBox="0 0 64 64" width={size} height={size} className="block overflow-visible">
        {children}
      </svg>
    </DieCut>
  );
}

export function RobotSticker(p: IconProps) {
  return (
    <Icon rotate={-6} {...p}>
      <path d="M32 12V6" {...LINE} />
      <circle cx="32" cy="5" r="3.5" fill="#c43d2b" {...LINE} strokeWidth={2} />
      <rect x="8" y="24" width="5" height="14" rx="2" fill="#e08a3c" {...LINE} />
      <rect x="51" y="24" width="5" height="14" rx="2" fill="#e08a3c" {...LINE} />
      <rect x="12" y="12" width="40" height="38" rx="10" fill="#8ec5e8" {...LINE} />
      <rect x="18" y="20" width="28" height="15" rx="7" fill="#24324a" {...LINE} />
      <circle cx="26" cy="27.5" r="3.2" fill="#9cf2e4" />
      <circle cx="38" cy="27.5" r="3.2" fill="#9cf2e4" />
      <path d="M24 42h16" {...LINE} />
      <path d="M28 42v3M32 42v3M36 42v3" {...LINE} strokeWidth={1.8} />
      <path d="M16 16a8 8 0 0 1 6-3" stroke="#fff" strokeOpacity="0.8" strokeWidth="2" strokeLinecap="round" fill="none" />
    </Icon>
  );
}

export function ChipSticker(p: IconProps) {
  const pins = [18, 26, 34, 42];
  return (
    <Icon rotate={8} {...p}>
      {pins.map((v) => (
        <g key={v} {...LINE} strokeWidth={2.5} stroke="#c9a227">
          <path d={`M${v + 2} 6v6M${v + 2} 52v6M6 ${v + 2}h6M52 ${v + 2}h6`} />
        </g>
      ))}
      <rect x="12" y="12" width="40" height="40" rx="5" fill="#2e3b36" {...LINE} />
      <rect x="20" y="20" width="24" height="24" rx="3" fill="#2a9d8f" stroke="#9cf2e4" strokeWidth="1.5" />
      <text x="32" y="36" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fffdf6" className="font-heading">
        GPU
      </text>
      <circle cx="17" cy="17" r="1.8" fill="#fffdf6" />
    </Icon>
  );
}

export function BrainSticker(p: IconProps) {
  return (
    <Icon rotate={-4} {...p}>
      <path
        d="M31 10c-4-4-12-3-14 3-6 0-10 6-7 12-4 4-3 11 2 13 0 6 6 10 12 8 2 4 7 5 7 1V10zM33 10c4-4 12-3 14 3 6 0 10 6 7 12 4 4 3 11-2 13 0 6-6 10-12 8-2 4-7 5-7 1V10z"
        fill="#f4a7b9"
        {...LINE}
      />
      <path d="M17 22c4 0 6 3 6 6M14 34c4-2 8 0 9 3M26 46c0-4 2-6 5-6" {...LINE} strokeWidth={2} fill="none" />
      <path d="M47 22c-4 0-6 3-6 6M50 34c-4-2-8 0-9 3M38 46c0-4-2-6-5-6" {...LINE} strokeWidth={2} fill="none" />
      {/* a little circuit trace, because it's being redesigned */}
      <path d="M41 16h6v6" stroke="#2a9d8f" strokeWidth="2" fill="none" strokeLinecap="round" />
      <circle cx="47" cy="23" r="2" fill="#2a9d8f" />
    </Icon>
  );
}

export function BoltSticker(p: IconProps) {
  return (
    <Icon rotate={10} {...p}>
      <path d="M36 4 12 36h16l-6 24 28-36H33l3-20z" fill="#f6c344" {...LINE} />
      <path d="M33 10 20 30" stroke="#fff" strokeOpacity="0.7" strokeWidth="2" strokeLinecap="round" />
    </Icon>
  );
}

export function HeartSticker(p: IconProps) {
  return (
    <Icon rotate={-8} {...p}>
      <path d="M32 55S7 40 7 22c0-8 6-13 13-13 6 0 10 4 12 8 2-4 6-8 12-8 7 0 13 5 13 13 0 18-25 33-25 33z" fill="#e2504c" {...LINE} />
      <path d="M15 20c0-4 3-6 6-6" stroke="#fff" strokeOpacity="0.8" strokeWidth="3" strokeLinecap="round" fill="none" />
    </Icon>
  );
}

export function StarSticker(p: IconProps) {
  return (
    <Icon rotate={12} {...p}>
      <path d="m32 5 8 17 18 2-13 13 4 19-17-9-17 9 4-19L6 24l18-2 8-17z" fill="#f6c344" {...LINE} />
      <circle cx="26" cy="31" r="2.2" fill={INK} />
      <circle cx="38" cy="31" r="2.2" fill={INK} />
      <path d="M28 38c2 2.5 6 2.5 8 0" {...LINE} strokeWidth={2} fill="none" />
      <circle cx="22" cy="36" r="2.5" fill="#f29bb0" opacity="0.8" />
      <circle cx="42" cy="36" r="2.5" fill="#f29bb0" opacity="0.8" />
    </Icon>
  );
}

export function SmileySticker(p: IconProps) {
  return (
    <Icon rotate={-10} {...p}>
      <circle cx="32" cy="32" r="26" fill="#f6c344" {...LINE} />
      <path d="M22 24v6M42 24v6" {...LINE} strokeWidth={3.5} />
      <path d="M18 38c6 10 22 10 28 0" {...LINE} fill="none" />
    </Icon>
  );
}

/** a mug of coffee, steam curling up, a latte-art heart on top */
export function CoffeeSticker(p: IconProps) {
  return (
    <Icon rotate={5} {...p}>
      <path d="M22 6c-3 3 3 5 0 8M30 4c-3 3 3 5 0 8M38 6c-3 3 3 5 0 8" stroke="#a08c7a" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M46 28h4a7 7 0 0 1 0 14h-5" fill="none" {...LINE} strokeWidth={3} />
      <path d="M10 20h38v24a12 12 0 0 1-12 12H22a12 12 0 0 1-12-12z" fill="#fffdf6" {...LINE} />
      <path d="M10 20h38v5H10z" fill="#e08a3c" />
      <ellipse cx="29" cy="20" rx="19" ry="4.5" fill="#7a4a24" {...LINE} />
      <path d="M29 22.5c-2.5-1.5-4-2.5-4-3.6 0-1 1.6-1.6 4 0 2.4-1.6 4-1 4 0 0 1.1-1.5 2.1-4 3.6z" fill="#f3dcc0" />
      <path d="M15 30v12" stroke="#e8dfd0" strokeWidth="2.5" strokeLinecap="round" />
    </Icon>
  );
}

/** the blood blossom — a red spider lily: curled petals, long arching stamens */
const LILY_PETALS = [-160, -120, -75, -35, 5, 175];
/* each stamen arches up from the throat and ends in a pollen tip */
const LILY_STAMENS = [
  { d: "M32 31C27 22 21 15 12 12", tip: [12, 12] },
  { d: "M32 31C30 20 27 11 22 4", tip: [22, 4] },
  { d: "M32 31C34 20 37 11 42 4", tip: [42, 4] },
  { d: "M32 31C37 22 43 15 52 12", tip: [52, 12] },
  { d: "M32 31C25 27 16 25 7 26", tip: [7, 26] },
  { d: "M32 31C39 27 48 25 57 26", tip: [57, 26] },
];

export function LilySticker(p: IconProps) {
  return (
    <Icon rotate={-10} {...p}>
      <path d="M32 34v26" stroke="#4f6b45" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M32 50c-5-1-9 1-11 5" stroke="#4f6b45" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {LILY_STAMENS.map(({ d, tip: [x, y] }) => (
        <g key={d}>
          <path d={d} stroke="#c62f2a" strokeWidth="1.6" fill="none" strokeLinecap="round" />
          <circle cx={x} cy={y} r="1.8" fill="#f6c344" stroke={INK} strokeWidth="0.8" />
        </g>
      ))}
      <g transform="translate(32 32)">
        {LILY_PETALS.map((a) => (
          <path
            key={a}
            transform={`rotate(${a})`}
            d="M0-2C6-6 12-5 17-10 18-5 14 1 6 3 3 3 1 2 0 2z"
            fill="#d8352f"
            stroke={INK}
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        ))}
        <circle r="3.5" fill="#9e1f1b" stroke={INK} strokeWidth="1.6" />
      </g>
    </Icon>
  );
}

export function RocketSticker(p: IconProps) {
  return (
    <Icon rotate={-20} {...p}>
      <path d="M26 46c-2 6-8 8-10 12 4-2 7 0 12-4" fill="#f6c344" {...LINE} strokeWidth={2} />
      <path d="M32 4c10 8 12 22 8 38H24C20 26 22 12 32 4z" fill="#fffdf6" {...LINE} />
      <path d="M24 30 14 42l10 2M40 30l10 12-10 2" fill="#c43d2b" {...LINE} />
      <circle cx="32" cy="22" r="5" fill="#8ec5e8" {...LINE} strokeWidth={2} />
      <path d="M27 48h10l-2 6h-6z" fill="#e08a3c" {...LINE} strokeWidth={2} />
    </Icon>
  );
}

/** a bug with a thumbs-up attitude — for "it works on my machine" moments */
export function BugSticker(p: IconProps) {
  return (
    <Icon rotate={7} {...p}>
      <path d="M20 26 10 20M44 26l10-6M18 36H8M46 36h10M20 46l-9 7M44 46l9 7" {...LINE} />
      <path d="M26 14l-4-6M38 14l4-6" {...LINE} />
      <ellipse cx="32" cy="38" rx="15" ry="18" fill="#9ad3bc" {...LINE} />
      <circle cx="32" cy="18" r="8" fill={INK} />
      <path d="M32 22v34" {...LINE} strokeWidth={2} />
      <circle cx="25" cy="34" r="2.5" fill={INK} />
      <circle cx="39" cy="44" r="2.5" fill={INK} />
      <circle cx="40" cy="32" r="2" fill={INK} />
    </Icon>
  );
}
