"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import s from "./FieldSection.module.css";

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** True only while the element sits below the fold: never hide what the reader can already see. */
const belowFold = (el: Element) => el.getBoundingClientRect().top > window.innerHeight * 0.92;

/**
 * Wraps the server-rendered FieldSVG. On mount it (1) swaps the lilies to strap leaves outside
 * Sep 1 – Oct 31, (2) arms the draw-on and plays it once when scrolled into view, and
 * (3) shows a tiny "on duty" tooltip over a lily mark on hover-capable pointers, and
 * (4) marks the art [data-live] while it is on screen, so the roaming agents only move then.
 * Without JS the art renders complete and in bloom.
 */
export function FieldArt({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tip, setTip] = useState<{ x: number; y: number } | null>(null);

  // season / draw / live are pure DOM flags read only by CSS, so they are written straight to the
  // element's dataset rather than routed through React state (no re-render needed).
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const m = new Date().getMonth(); // 8 = Sep, 9 = Oct
    if (m !== 8 && m !== 9) el.dataset.season = "leaf";
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion() || !belowFold(el) || !("IntersectionObserver" in window)) return;
    el.dataset.draw = "armed";
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          el.dataset.draw = "play";
          io.disconnect();
        }
      },
      { threshold: 0.28 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      delete el.dataset.draw;
    };
  }, []);

  // the agents only move while the field is on screen (CSS pauses them otherwise)
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const setLive = (on: boolean) => {
      if (on) el.dataset.live = "";
      else delete el.dataset.live;
    };
    if (!("IntersectionObserver" in window)) {
      setLive(true);
      return () => setLive(false);
    }
    const io = new IntersectionObserver((entries) => setLive(entries.some((e) => e.isIntersecting)), { threshold: 0 });
    io.observe(el);
    return () => {
      io.disconnect();
      setLive(false);
    };
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const over = (e: PointerEvent) => {
      if (!fine.matches) return;
      const mark = (e.target as Element).closest?.("[data-lily]");
      if (!mark) return;
      const a = el.getBoundingClientRect();
      const b = mark.getBoundingClientRect();
      setTip({ x: b.left + b.width / 2 - a.left, y: b.top - a.top });
    };
    const out = (e: PointerEvent) => {
      const to = e.relatedTarget as Element | null;
      if (!to || !to.closest?.("[data-lily]")) setTip(null);
    };
    el.addEventListener("pointerover", over);
    el.addEventListener("pointerout", out);
    return () => {
      el.removeEventListener("pointerover", over);
      el.removeEventListener("pointerout", out);
    };
  }, []);

  return (
    <div ref={ref} className={className} data-season="bloom">
      {children}
      <span
        className={s.tip}
        aria-hidden="true"
        data-show={tip ? "" : undefined}
        style={tip ? ({ "--x": `${tip.x}px`, "--y": `${tip.y}px` } as CSSProperties) : undefined}
      >
        on duty
      </span>
    </div>
  );
}
