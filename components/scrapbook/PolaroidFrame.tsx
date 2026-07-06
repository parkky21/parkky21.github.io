import type { CSSProperties } from "react";
import Image from "next/image";
import { WashiTape } from "./WashiTape";

/** A polaroid-style photo frame taped onto the page. */
export function PolaroidFrame({
  src,
  alt,
  caption,
  rotate = -3,
  width = 250,
  hoverTilt = false,
  className = "",
}: {
  src?: string;
  alt: string;
  caption: string;
  rotate?: number;
  width?: number;
  hoverTilt?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`scrap-tilt relative shrink-0 ${hoverTilt ? "scrap-tilt-hover" : ""} ${className}`}
      style={{ "--tilt-rotate": `${rotate}deg`, width } as CSSProperties}
    >
      <div className="relative bg-white p-3 pb-14 shadow-[0_10px_30px_-10px_rgba(58,47,47,0.35)]">
        <WashiTape
          color="kraft"
          className="-top-3 left-1/2 h-6 w-20 -translate-x-1/2 -rotate-3"
        />

        <div className="relative aspect-[4/5] w-full overflow-hidden bg-stone-100">
          {src ? (
            <Image
              src={src}
              alt={alt}
              fill
              priority
              sizes={`${width}px`}
              className="object-cover"
            />
          ) : (
            <PlaceholderAvatar />
          )}
        </div>

        <p className="absolute inset-x-0 bottom-3 text-center font-hand text-2xl text-ink/80">
          {caption}
        </p>
      </div>
    </div>
  );
}

/* A hand-drawn stand-in shown until a real photo is dropped in. */
function PlaceholderAvatar() {
  return (
    <svg
      viewBox="0 0 200 250"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <rect width="200" height="250" fill="#f5f5f4" />
      <g
        className="sketch"
        fill="none"
        stroke="var(--color-ink)"
        strokeOpacity="0.55"
        strokeWidth="3"
        strokeLinecap="round"
      >
        <circle cx="100" cy="95" r="42" />
        <path d="M40 235c4-46 28-72 60-72s56 26 60 72" />
      </g>
      <text
        x="100"
        y="160"
        textAnchor="middle"
        className="font-hand"
        fontSize="15"
        fill="var(--color-ink)"
        fillOpacity="0.45"
      >
        drop your photo in
      </text>
      <text
        x="100"
        y="180"
        textAnchor="middle"
        className="font-hand"
        fontSize="13"
        fill="var(--color-ink)"
        fillOpacity="0.4"
      >
        /public
      </text>
    </svg>
  );
}
