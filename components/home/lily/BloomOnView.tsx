"use client";

import { useEffect, useRef, type ReactNode } from "react";
import s from "./BloomOnView.module.css";

/** Only hold back what the reader can't see yet — never freeze something already on screen. */
const belowFold = (el: Element) => el.getBoundingClientRect().top > window.innerHeight * 0.92;

/**
 * Defers a pure-CSS draw-on (e.g. LilySVG's) until the wrapper scrolls into view.
 *
 * The children render complete by default (SSR, no JS, reduced motion). On mount, and only when
 * motion is allowed and the wrapper starts below the fold, it is marked [data-armed], which pauses
 * every descendant animation; the first intersection removes the flag so the draw-on plays once.
 * The flag is written straight to the DOM — CSS is its only reader, so no React state is needed.
 */
export function BloomOnView({
  children,
  className = "",
  threshold = 0.3,
}: {
  children: ReactNode;
  className?: string;
  threshold?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (
      !el ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !belowFold(el) ||
      !("IntersectionObserver" in window)
    ) {
      return;
    }
    el.dataset.armed = "";
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          delete el.dataset.armed;
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      delete el.dataset.armed;
    };
  }, [threshold]);

  return (
    <div ref={ref} className={`${s.wrap} ${className}`.trim()}>
      {children}
    </div>
  );
}
