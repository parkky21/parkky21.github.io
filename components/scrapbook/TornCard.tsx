import type { CSSProperties, ReactNode } from "react";

/**
 * The workhorse scrapbook card: a torn-paper background layer behind crisp
 * content. The `#torn-edge` SVG filter (see SketchDefs) only distorts the
 * background div, so text stays sharp. Set `torn={false}` for a plain
 * rounded card (used on the printable resume).
 */
export function TornCard({
  tint = "#ffffff",
  rotate = 0,
  torn = true,
  hoverTilt = false,
  className = "",
  contentClassName = "",
  children,
}: {
  tint?: string;
  rotate?: number;
  torn?: boolean;
  hoverTilt?: boolean;
  className?: string;
  contentClassName?: string;
  children: ReactNode;
}) {
  const bgStyle: CSSProperties = {
    background: tint,
    ...(torn
      ? {
          filter:
            "url(#torn-edge) drop-shadow(0 1px 2px rgba(58,47,47,0.08)) drop-shadow(0 14px 30px rgba(58,47,47,0.14))",
          borderRadius: "10px",
        }
      : {
          borderRadius: "24px",
          boxShadow:
            "0 1px 2px rgba(58,47,47,0.06), 0 14px 30px -12px rgba(58,47,47,0.25)",
        }),
  };

  return (
    <div
      className={`scrap-tilt relative ${hoverTilt ? "scrap-tilt-hover" : ""} ${className}`}
      style={{ "--tilt-rotate": `${rotate}deg` } as CSSProperties}
    >
      <div aria-hidden className="absolute inset-0" style={bgStyle} />
      <div className={`relative ${contentClassName}`}>{children}</div>
    </div>
  );
}
