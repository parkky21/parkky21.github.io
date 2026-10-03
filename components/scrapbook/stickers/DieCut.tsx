import type { CSSProperties, ReactNode } from "react";
import s from "./stickers.module.css";

/**
 * Wraps any artwork in a vinyl die-cut sticker: thick white kiss-cut border
 * that follows the artwork's silhouette, a lifted shadow, and a tilt that
 * swings on hover. Decorative by default — pass `label` when the sticker
 * says something a screen reader should hear.
 */
export function DieCut({
  rotate = 0,
  peel = false,
  label,
  className = "",
  children,
}: {
  rotate?: number;
  /** curl the bottom-right corner up (rectangular stickers only) */
  peel?: boolean;
  label?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={`${s.dieCut} ${peel ? s.peel : ""} select-none ${className}`}
      style={{ "--r": `${rotate}deg` } as CSSProperties}
      {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true })}
    >
      {children}
    </span>
  );
}
