import type { CSSProperties, ReactNode } from "react";
import { ScribbleUnderline } from "@/components/Doodles";
import { WashiTape } from "./WashiTape";

/** the torn strip's stock: off-white cartridge paper with a fibre grain */
const STRIP: CSSProperties = {
  backgroundColor: "#fffdf6",
  backgroundImage: "var(--paper-grain)",
  // #torn-edge (SketchDefs) roughs the edges; the two drop-shadows lift the
  // strip off the page — a tight contact shadow plus a soft long one
  filter:
    "url(#torn-edge) drop-shadow(0 1px 1px rgba(58,47,47,0.16)) drop-shadow(0 10px 14px rgba(58,47,47,0.14))",
};

/**
 * Consistent section header, done the way you'd title a scrapbook page: the
 * title on a strip of torn paper taped down at the top, with a handwritten
 * kicker scrawled above it like a margin note. Tilt alternates by title so
 * neighbouring headings don't all lean the same way (deterministic — no
 * randomness at render).
 */
export function SectionHeading({
  kicker,
  title,
  underline = "var(--color-accent)",
  align = "center",
  className = "",
  as: Tag = "h2",
  id,
  sticker,
}: {
  kicker?: string;
  title: string;
  underline?: string;
  align?: "center" | "left";
  className?: string;
  as?: "h1" | "h2";
  id?: string;
  /**
   * Optional die-cut sticker (from ./stickers) slapped on the strip's top-right
   * corner. Keep it small (~40–56px) — on phones it sits inside the strip's
   * width so it can't push the page sideways.
   */
  sticker?: ReactNode;
}) {
  const tilt = title.length % 2 === 0 ? -1.2 : 1;

  return (
    <div
      className={`mb-14 ${align === "center" ? "text-center" : ""} ${className}`}
    >
      {kicker && (
        <p className="mb-4 inline-block -rotate-2 font-hand text-xl text-ink-soft">
          {kicker}
        </p>
      )}
      {/* block wrapper keeps the kicker on its own line above the strip */}
      <div>
        <div
          className="scrap-tilt relative inline-block"
          style={{ "--tilt-rotate": `${tilt}deg` } as CSSProperties}
        >
          <div aria-hidden className="absolute inset-0" style={STRIP} />
          <WashiTape className="-top-2.5 left-1/2 h-5 w-16 -translate-x-1/2 -rotate-3 sm:w-20" />
          <Tag
            id={id}
            className="relative px-6 pb-4 pt-3.5 font-heading text-[1.7rem] font-bold leading-tight text-ink text-balance sm:px-9 sm:text-4xl"
          >
            <span className="relative inline-block">
              {title}
              <ScribbleUnderline
                className="absolute -bottom-3 left-0 h-4 w-full"
                color={underline}
              />
            </span>
          </Tag>
          {sticker && (
            <span className="absolute -top-7 right-0 z-10 sm:-right-9">{sticker}</span>
          )}
        </div>
      </div>
    </div>
  );
}
