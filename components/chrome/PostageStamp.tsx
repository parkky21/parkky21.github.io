import type { CSSProperties } from "react";
import { Sparkle } from "@/components/Doodles";

/** gap between perforation holes, px — the stamp's sides are multiples of it */
const PITCH = 10;

/**
 * Perforations: a grid of holes punched out of the white stamp paper, offset
 * so a hole centre lands on every edge (that's what leaves the half-moon
 * bites). The interior holes are hidden under the printed design, which is a
 * sibling layer rather than a child so the mask doesn't punch through it.
 */
const PERFORATED: CSSProperties = {
  WebkitMaskImage: "radial-gradient(circle, transparent 3px, #000 3.4px)",
  maskImage: "radial-gradient(circle, transparent 3px, #000 3.4px)",
  WebkitMaskSize: `${PITCH}px ${PITCH}px`,
  maskSize: `${PITCH}px ${PITCH}px`,
  WebkitMaskPosition: `-${PITCH / 2}px -${PITCH / 2}px`,
  maskPosition: `-${PITCH / 2}px -${PITCH / 2}px`,
};

/** A small postage stamp with perforated edges. Decorative. */
export function PostageStamp({
  rotate = 3,
  className = "",
}: {
  rotate?: number;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={`relative block select-none ${className}`}
      style={{
        width: PITCH * 8,
        height: PITCH * 10,
        transform: `rotate(${rotate}deg)`,
        filter: "drop-shadow(0 1px 1px rgba(40,25,10,0.3)) drop-shadow(0 3px 4px rgba(40,25,10,0.12))",
      }}
    >
      <span className="absolute inset-0 bg-[#fffdf6]" style={PERFORATED} />
      {/* the printed design */}
      <span className="absolute inset-[6px] flex flex-col items-center justify-between overflow-hidden bg-teal-deep px-1 py-1.5 text-[#fdf0d0]">
        <span className="relative font-heading text-[8px] font-bold uppercase tracking-[0.2em]">
          India
        </span>
        <Sparkle className="relative h-8 w-8" color="#fdf0d0" />
        <span className="relative font-heading text-[10px] font-bold leading-none">₹25</span>
        {/* a sliver of engraved hills along the bottom */}
        <span
          className="absolute inset-x-0 bottom-0 h-3 opacity-25"
          style={{
            background:
              "radial-gradient(ellipse 60% 100% at 30% 100%, #fdf0d0 60%, transparent 62%), radial-gradient(ellipse 50% 90% at 85% 100%, #fdf0d0 60%, transparent 62%)",
          }}
        />
      </span>
    </span>
  );
}
