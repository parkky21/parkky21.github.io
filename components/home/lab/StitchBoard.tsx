"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import d from "./draw.module.css";
import s from "./StitchBoard.module.css";

type Point = { x: number; y: number };
type Thread = Point & { id: string; path: string };

/** Layout position relative to the board — ignores transforms, so tilts and
    reveal animations in flight don't drag the thread around. */
function offsetWithin(el: HTMLElement, board: HTMLElement): Point | null {
  let x = 0;
  let y = 0;
  let node: HTMLElement | null = el;
  while (node && node !== board) {
    x += node.offsetLeft;
    y += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return node === board ? { x, y } : null;
}

/**
 * The cork board the hero's pieces are stitched onto. Pieces mark pin spots
 * with <Knot>; red thread runs from the "hub" knot (the photo) to every other
 * visible knot, sagging a little like real string. Threads only show on wide
 * screens, where the pieces sit in a fixed spread.
 */
export function StitchBoard({ className = "", children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [threads, setThreads] = useState<{ hub: Point; ends: Thread[] } | null>(null);

  useEffect(() => {
    const board = ref.current;
    if (!board) return;

    const measure = () => {
      const hubEl = board.querySelector<HTMLElement>('[data-knot="hub"]');
      const hub = hubEl && offsetWithin(hubEl, board);
      if (!hub) return setThreads(null);
      const ends = Array.from(board.querySelectorAll<HTMLElement>("[data-knot]"))
        .filter((el) => el !== hubEl)
        .flatMap((el) => {
          const p = offsetWithin(el, board);
          if (!p) return [];
          const sag = Math.min(28, Math.hypot(p.x - hub.x, p.y - hub.y) * 0.12);
          const mx = (p.x + hub.x) / 2;
          const my = (p.y + hub.y) / 2 + sag;
          return [{ id: el.dataset.knot ?? "", ...p, path: `M${hub.x} ${hub.y}Q${mx} ${my} ${p.x} ${p.y}` }];
        });
      setThreads({ hub, ends });
    };

    const ro = new ResizeObserver(measure);
    ro.observe(board);
    document.fonts?.ready.then(measure);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={ref} className={`${s.board} ${className}`}>
      {children}
      {threads && (
        <svg aria-hidden width="100%" height="100%" className={`${s.threads} hidden xl:block`}>
          {threads.ends.map((t, i) => (
            <g key={t.id} style={{ "--d": `${0.9 + i * 0.18}s`, "--dur": "0.9s" } as CSSProperties}>
              <path d={t.path} pathLength={1} className={d.draw} stroke="rgba(40,20,10,0.18)" strokeWidth="2" fill="none" transform="translate(1 2)" />
              <path d={t.path} pathLength={1} className={d.draw} stroke="var(--color-thread)" strokeWidth="1.8" fill="none" strokeLinecap="round" />
              <Pin x={t.x} y={t.y} delay={`${1.7 + i * 0.18}s`} color={["#2a9d8f", "#e0a23c", "#2a9d8f", "#e0a23c"][i % 4]} />
            </g>
          ))}
          <Pin x={threads.hub.x} y={threads.hub.y} delay="0.8s" color="var(--color-thread)" big />
        </svg>
      )}
    </div>
  );
}

function Pin({ x, y, delay, color, big = false }: Point & { delay: string; color: string; big?: boolean }) {
  const r = big ? 7.5 : 6;
  return (
    <g className={s.pin} style={{ "--d": delay } as CSSProperties}>
      <circle cx={x + 1} cy={y + 2.5} r={r} fill="rgba(40,20,10,0.25)" />
      <circle cx={x} cy={y} r={r} fill={color} stroke="rgba(40,20,10,0.35)" strokeWidth="1" />
      <circle cx={x - r * 0.35} cy={y - r * 0.35} r={r * 0.32} fill="rgba(255,255,255,0.7)" />
    </g>
  );
}
