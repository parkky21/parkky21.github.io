import type { CSSProperties, ReactNode } from "react";

/**
 * A rubber-stamp impression: uppercase, double ruled border, uneven ink.
 * The `.stamp-ink` mask (globals.css) knocks speckles out of the ink so it
 * looks pressed by hand rather than printed.
 */
export function Stamp({
  color = "var(--color-accent-deep)",
  rotate = -6,
  round = false,
  className = "",
  children,
}: {
  color?: string;
  rotate?: number;
  /** a circular postmark instead of a rectangular stamp */
  round?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={`stamp-ink inline-flex select-none items-center justify-center text-center font-heading font-bold uppercase leading-tight tracking-[0.14em] ${
        round
          ? "aspect-square rounded-full p-3 text-[10px]"
          : "rounded-[3px] px-3 py-1 text-xs"
      } ${className}`}
      style={
        {
          color,
          border: `2px solid ${color}`,
          boxShadow: `inset 0 0 0 2px transparent, inset 0 0 0 3.5px ${color}`,
          transform: `rotate(${rotate}deg)`,
          opacity: 0.82,
        } as CSSProperties
      }
    >
      {children}
    </span>
  );
}
