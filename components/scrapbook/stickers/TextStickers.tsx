import type { ReactNode } from "react";
import { DieCut } from "./DieCut";
import s from "./stickers.module.css";

type Common = { rotate?: number; className?: string; label?: string };

/* 18-point starburst, computed once at module load (deterministic for SSR) */
const BURST = Array.from({ length: 36 }, (_, i) => {
  const r = i % 2 === 0 ? 50 : 41;
  const a = (Math.PI * i) / 18 - Math.PI / 2;
  return `${(50 + r * Math.cos(a)).toFixed(1)},${(50 + r * Math.sin(a)).toFixed(1)}`;
}).join(" ");

/** A starburst "NEW!"-style badge. Keep text to 1–3 short words. */
export function BurstSticker({
  children,
  color = "#f6c344",
  ink = "#3a2f2f",
  size = 96,
  rotate = -8,
  className = "",
  label,
}: Common & { children: ReactNode; color?: string; ink?: string; size?: number }) {
  return (
    <DieCut rotate={rotate} className={className} label={label}>
      <span className="relative grid place-items-center" style={{ width: size, height: size }}>
        <svg viewBox="0 0 100 100" className={`absolute inset-0 h-full w-full ${s.burstSpin}`}>
          <polygon points={BURST} fill={color} stroke={ink} strokeWidth="2" strokeLinejoin="round" />
        </svg>
        <span
          className="relative px-3 text-center font-heading font-bold uppercase leading-[0.95] tracking-tight"
          style={{ color: ink, fontSize: size * 0.15 }}
        >
          {children}
        </span>
      </span>
    </DieCut>
  );
}

/* circumference of the r=35 rim path, a hair short so the ring doesn't overlap */
const RIM = 216;

/**
 * A round seal with text running around the rim and an emoji/icon in the
 * middle. `id` must be unique on the page (it names the text path).
 */
export function SealSticker({
  id,
  ring,
  center,
  color = "#2a9d8f",
  ink = "#fffdf6",
  size = 104,
  rotate = 6,
  className = "",
  label,
}: Common & { id: string; ring: string; center: ReactNode; color?: string; ink?: string; size?: number }) {
  const pathId = `seal-${id}`;
  // shrink the rim type for long text, then let textLength close the ring exactly
  const fontSize = Math.min(10.5, Math.max(6.5, (RIM / ring.length - 1.2) / 0.64));
  return (
    <DieCut rotate={rotate} className={className} label={label}>
      <svg viewBox="0 0 100 100" width={size} height={size} className="block">
        <defs>
          <path id={pathId} d="M50,50 m-35,0 a35,35 0 1,1 70,0 a35,35 0 1,1 -70,0" />
        </defs>
        <circle cx="50" cy="50" r="48" fill={color} />
        <circle cx="50" cy="50" r="27" fill="none" stroke={ink} strokeOpacity="0.55" strokeWidth="1.2" strokeDasharray="2 3" />
        <text fill={ink} fontSize={fontSize} fontWeight="700" letterSpacing="1.2" className="font-heading uppercase">
          <textPath href={`#${pathId}`} startOffset="0" textLength={RIM} lengthAdjust="spacing">
            {ring}
          </textPath>
        </text>
        <text x="50" y="61" textAnchor="middle" fontSize="30">
          {center}
        </text>
      </svg>
    </DieCut>
  );
}

/** Holographic foil pill — the shiny one everyone wants. */
export function HoloSticker({
  children,
  rotate = -4,
  className = "",
  label,
}: Common & { children: ReactNode }) {
  return (
    <DieCut rotate={rotate} className={className} label={label}>
      <span
        className={`${s.holo} relative inline-flex items-center gap-1.5 overflow-hidden rounded-full border-2 border-ink/80 px-4 py-1.5 font-heading text-sm font-bold uppercase tracking-wide text-ink`}
      >
        <span className="relative">{children}</span>
      </span>
    </DieCut>
  );
}

/** The classic red "HELLO my name is" badge. */
export function HelloSticker({
  name,
  rotate = -3,
  className = "",
  label,
}: Common & { name: string }) {
  return (
    <DieCut rotate={rotate} peel className={className} label={label}>
      <span className="block w-44 overflow-hidden rounded-lg bg-[#c43d2b] text-center">
        <span className="block pt-1.5 font-heading text-lg font-bold leading-none tracking-wider text-white">HELLO</span>
        <span className="block pb-1 font-heading text-[10px] font-semibold uppercase tracking-[0.2em] text-white/90">my name is</span>
        <span className="block bg-white py-1.5 font-hand text-3xl font-bold leading-none text-ink">{name}</span>
        <span className="block h-2.5" />
      </span>
    </DieCut>
  );
}

/** A comic speech bubble with a tail pointing down-left. */
export function BubbleSticker({
  children,
  color = "#ffffff",
  rotate = 3,
  className = "",
  label,
}: Common & { children: ReactNode; color?: string }) {
  return (
    <DieCut rotate={rotate} className={className} label={label}>
      <span
        className="relative inline-block rounded-2xl border-2 border-ink px-3.5 py-1.5 font-hand text-xl font-bold leading-tight text-ink"
        style={{ background: color }}
      >
        {children}
        <svg viewBox="0 0 20 16" className="absolute -bottom-[13px] left-5 h-4 w-5" aria-hidden>
          <path d="M1 0 L5 15 L16 0" fill={color} stroke="#3a2f2f" strokeWidth="2" strokeLinejoin="round" />
          <path d="M2 0 H15" stroke={color} strokeWidth="3" />
        </svg>
      </span>
    </DieCut>
  );
}

/** A chunky retro slogan sticker, e.g. "SHIP IT" or "GPU go brrr". */
export function SloganSticker({
  children,
  color = "#e08a3c",
  ink = "#3a2f2f",
  rotate = -5,
  peel = false,
  className = "",
  label,
}: Common & { children: ReactNode; color?: string; ink?: string; peel?: boolean }) {
  return (
    <DieCut rotate={rotate} peel={peel} className={className} label={label}>
      <span
        className="inline-flex items-center gap-1.5 rounded-md border-[2.5px] px-3 py-1 font-heading text-sm font-bold uppercase tracking-wide"
        style={{ background: color, color: ink, borderColor: ink, boxShadow: `3px 3px 0 ${ink}` }}
      >
        {children}
      </span>
    </DieCut>
  );
}
