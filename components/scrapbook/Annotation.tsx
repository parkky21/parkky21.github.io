import type { ReactNode } from "react";

const TONES = {
  soft: "text-ink-soft",
  accent: "text-accent-deep",
  teal: "text-teal-deep",
} as const;

/** A handwritten side-note, e.g. "that's me!" next to the polaroid. */
export function Annotation({
  tone = "soft",
  className = "",
  children,
}: {
  tone?: keyof typeof TONES;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span className={`font-hand text-xl ${TONES[tone]} ${className}`}>
      {children}
    </span>
  );
}
