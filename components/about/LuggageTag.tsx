import type { ReactNode } from "react";

/**
 * A manila luggage tag, eyelet on the left, with a bit of string looping out
 * of the hole. The tag's notched shape is a clip-path, so its lift comes from
 * a drop-shadow on the wrapper (a box-shadow would be clipped away).
 */
export function LuggageTag({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative [filter:drop-shadow(0_1px_1px_rgba(58,47,47,0.25))_drop-shadow(0_6px_8px_rgba(40,25,10,0.18))] ${className}`}
    >
      {/* the string, tied through the eyelet and trailing off up-left */}
      <svg
        aria-hidden
        viewBox="0 0 60 50"
        fill="none"
        className="pointer-events-none absolute -left-9 top-1/2 z-10 h-[50px] w-[60px] -translate-y-[60%]"
      >
        <path
          d="M47 30c-6-6-14-4-15 1s7 7 11 2M43 33C30 34 14 26 4 6"
          stroke="#8a6a44"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
      <div
        className="paper-grain relative flex min-h-[60px] items-center py-2.5 pl-10 pr-6"
        style={{
          backgroundColor: "#e8cf98",
          clipPath:
            "polygon(16px 0, 100% 0, 100% 100%, 16px 100%, 0 calc(100% - 14px), 0 14px)",
        }}
      >
        {/* reinforced eyelet: a card washer around the punched hole */}
        <span
          aria-hidden
          className="absolute left-3.5 top-1/2 grid h-[18px] w-[18px] -translate-y-1/2 place-items-center rounded-full bg-[#d6b46e] shadow-[inset_0_0_0_1px_rgba(120,85,45,0.35)]"
        >
          <span className="block h-[7px] w-[7px] rounded-full bg-[#7d5a35] shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]" />
        </span>
        {children}
      </div>
    </div>
  );
}
