import type { CSSProperties, ReactNode } from "react";

/** The tape cartridges in the label maker; the yellow roll takes black embossing. */
export const TAPE_ROLLS = {
  ink: { tape: "#2a2424", ink: "#f6f1e6" },
  red: { tape: "#9e2b22", ink: "#fbf3ec" },
  teal: { tape: "#17544d", ink: "#eef8f6" },
  blue: { tape: "#24508c", ink: "#f2f4f8" },
  green: { tape: "#2d6a4a", ink: "#f0f6f1" },
  yellow: { tape: "#e8b93c", ink: "#2a2420" },
} as const;

export type TapeRoll = keyof typeof TAPE_ROLLS;

const SIZES = {
  /** tech tags on the project cards */
  sm: "px-2 py-[3px] font-mono text-[10.5px] tracking-[0.14em]",
  /** skills, section labels */
  md: "px-2.5 py-[5px] font-mono text-[11.5px] tracking-[0.14em] sm:text-[12px]",
  /** the nav logo */
  lg: "gap-1.5 px-3.5 py-1 font-heading text-[13px] tracking-[0.22em] sm:text-sm",
} as const;

// gloss across the top of the plastic, a darker belly where the cutter sheared it
const GLOSS =
  "linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 45%, rgba(0,0,0,0.18) 100%)";
// embossed letters: a pale lip above, a shadow below
const EMBOSS = "0 -0.5px 0 rgba(255,255,255,0.3), 0 1px 0.5px rgba(0,0,0,0.5)";

/**
 * A strip of embossed label-maker tape. Renders as the element the caller
 * needs (`li` inside a tag list, `span` for decoration) so semantics stay the
 * caller's. `cut` angles both ends like the cutter bit through them; the
 * shadow then moves to an outer wrapper, since clip-path would cut it off.
 */
export function LabelTape({
  roll = "ink",
  size = "md",
  rotate = 0,
  cut = false,
  as: Tag = "span",
  className = "",
  children,
}: {
  roll?: TapeRoll;
  size?: keyof typeof SIZES;
  rotate?: number;
  cut?: boolean;
  as?: "span" | "li";
  className?: string;
  children: ReactNode;
}) {
  const { tape, ink } = TAPE_ROLLS[roll];
  const strip: CSSProperties = {
    color: ink,
    background: `${GLOSS}, ${tape}`,
    textShadow: EMBOSS,
  };
  const stripClass = `inline-flex items-center rounded-[2px] font-bold uppercase leading-none ${SIZES[size]}`;
  const tilt = { "--tilt-rotate": `${rotate}deg` } as CSSProperties;

  if (cut) {
    return (
      <Tag
        className={`scrap-tilt inline-block ${className}`}
        style={{
          ...tilt,
          filter: "drop-shadow(0 1px 1px rgba(40,25,10,0.4)) drop-shadow(0 4px 5px rgba(40,25,10,0.18))",
        }}
      >
        <span
          className={stripClass}
          style={{ ...strip, clipPath: "polygon(5px 0, 100% 0, calc(100% - 5px) 100%, 0 100%)" }}
        >
          {children}
        </span>
      </Tag>
    );
  }

  return (
    <Tag
      className={`scrap-tilt ${stripClass} ${className}`}
      style={{
        ...tilt,
        ...strip,
        boxShadow: "inset 0 0 0 0.5px rgba(0,0,0,0.3), 0 1px 1px rgba(40,25,10,0.35), 0 4px 6px -3px rgba(40,25,10,0.4)",
      }}
    >
      {children}
    </Tag>
  );
}
