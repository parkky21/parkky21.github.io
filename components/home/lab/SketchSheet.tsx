import type { CSSProperties, ReactNode } from "react";
import { BloomOnView } from "@/components/home/lily/BloomOnView";
import { Knot, Stitches } from "./Stitches";

const PAPER = {
  // engineering pad: fine teal grid
  blueprint: {
    backgroundColor: "#eef5f3",
    backgroundImage:
      "linear-gradient(rgba(31,122,112,0.13) 1px, transparent 1px), linear-gradient(90deg, rgba(31,122,112,0.13) 1px, transparent 1px)",
    backgroundSize: "14px 14px",
  },
  // ruled notebook page with a margin line
  lined: {
    backgroundColor: "#fffdf6",
    backgroundImage:
      "linear-gradient(90deg, transparent 26px, rgba(224,138,60,0.35) 26px, rgba(224,138,60,0.35) 27px, transparent 27px), repeating-linear-gradient(transparent 0 21px, rgba(58,47,47,0.09) 21px 22px)",
  },
  // dot grid
  dots: {
    backgroundColor: "#fdf0d0",
    backgroundImage: "radial-gradient(rgba(58,47,47,0.18) 1px, transparent 1.2px)",
    backgroundSize: "14px 14px",
  },
  // brown kraft card
  kraft: {
    backgroundColor: "#e6d7bb",
    backgroundImage:
      "radial-gradient(rgba(58,47,47,0.07) 1px, transparent 1.4px), radial-gradient(rgba(255,255,255,0.25) 1px, transparent 1.4px)",
    backgroundSize: "9px 9px, 13px 13px",
  },
} satisfies Record<string, CSSProperties>;

export type Paper = keyof typeof PAPER;

/**
 * One page torn out of the lab notebook and stitched onto the hero's board:
 * a paper swatch, a "fig." label, a hand-written caption, and a sketch that
 * draws itself in once it scrolls into view. `knot` marks where the red
 * thread is pinned.
 */
export function SketchSheet({
  fig,
  title,
  caption,
  paper,
  rotate = 0,
  knot,
  className = "",
  children,
}: {
  fig: string;
  title: string;
  caption: string;
  paper: Paper;
  rotate?: number;
  knot?: { id: string; className: string };
  className?: string;
  children: ReactNode;
}) {
  return (
    <figure
      className={`scrap-tilt scrap-tilt-soft relative ${className}`}
      style={{ "--tilt-rotate": `${rotate}deg` } as CSSProperties}
    >
      <div
        className="relative p-3 pb-2 shadow-[0_2px_4px_rgba(58,47,47,0.1),0_14px_28px_-14px_rgba(58,47,47,0.4)]"
        style={PAPER[paper]}
      >
        <Stitches />
        {knot && <Knot {...knot} />}
        <div className="flex items-baseline justify-between gap-2 border-b border-dashed border-ink/20 pb-1">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-soft">
            {fig}
          </span>
          <span className="font-hand text-lg font-bold leading-none text-ink">{title}</span>
        </div>
        <BloomOnView className="mt-1">{children}</BloomOnView>
        <figcaption className="mt-1 font-hand text-[17px] leading-snug text-ink/80">
          {caption}
        </figcaption>
      </div>
    </figure>
  );
}
