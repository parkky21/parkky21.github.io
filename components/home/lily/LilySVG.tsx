import { useId, type CSSProperties } from "react";
import s from "./LilySVG.module.css";

/**
 * Hand-built SVG red spider lily (Lycoris radiata): the first-paint / no-WebGL hero art.
 *
 * The geometry is generated once at module load from a tiny 3D model: six flowers on short
 * pedicels, each with six recurved, crisped tepals and six stamens + a style, projected
 * orthographically from a slightly raised eye. A seeded PRNG keeps it deterministic, and every
 * coordinate is rounded to an integer, so server and client markup are identical.
 *
 * Works as a Server Component (no state, no effects); the draw-on is pure CSS.
 */

/* ------------------------------------------------------------------ layout */

// Hero viewBox is 2000 x 1250 (16:10). Umbel at 68% / 38%, scape leaves the bottom at ~63%.
const W = 2000;
const H = 1250;
const CX = 1360; // 0.68 * W
const CY = 475; // 0.38 * H
// Hero window: zoomed 1.25x on the drawing, umbel at 68% x / 50% y (vertically centred).
const HERO_ZOOM = 0.8;
const HW = W * HERO_ZOOM;
const HH = H * HERO_ZOOM;
const VIEWBOX_HERO = `${CX - HW * 0.68} ${CY - HH * 0.5} ${HW} ${HH}`;
// 'centered' (mobile portrait): same drawing, a narrower window with the umbel at 50% / 46%.
const CW = 1100;
const CH = 2000;
const VIEWBOX_CENTERED = `${CX - CW * 0.5} ${Math.round(CY - CH * 0.46)} ${CW} ${CH}`;
// 'stem' (added for the scrapbook site): the whole plant, umbel to soil, as a tall cut-out.
export const STEM_W = 840;
export const STEM_H = 1460;
const VIEWBOX_STEM = `${CX - STEM_W / 2} 40 ${STEM_W} ${STEM_H}`;

/* ------------------------------------------------------------------ math */

type V3 = [number, number, number];
type P2 = [number, number];
const add = (a: V3, b: V3): V3 => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
const mul = (a: V3, k: number): V3 => [a[0] * k, a[1] * k, a[2] * k];
const cross = (a: V3, b: V3): V3 => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const norm = (a: V3): V3 => mul(a, 1 / Math.hypot(a[0], a[1], a[2]));
const lin = (...terms: [V3, number][]): V3 => terms.reduce<V3>((acc, [v, k]) => add(acc, mul(v, k)), [0, 0, 0]);
const UP: V3 = [0, 1, 0];
const rad = (d: number) => (d * Math.PI) / 180;

function mulberry32(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Eye raised ~14deg above the umbel; +z points at the viewer.
const EL = rad(14);
const CE = Math.cos(EL);
const SE = Math.sin(EL);
const SC = 1.4; // model units -> viewBox units
const proj = (p: V3): P2 => [CX + p[0] * SC, CY - (p[1] * CE - p[2] * SE) * SC];
const depth = (p: V3) => p[1] * SE + p[2] * CE;

/* ------------------------------------------------------------------ path formatting */

const r = Math.round;
function nums(list: number[]) {
  let out = "";
  list.forEach((n, i) => {
    const v = r(n) + 0; // +0 turns -0 into 0
    out += (i > 0 && v >= 0 ? " " : "") + v;
  });
  return out;
}
const ri = (p: P2): P2 => [r(p[0]), r(p[1])];
const mid = (a: P2, b: P2): P2 => [r((a[0] + b[0]) / 2), r((a[1] + b[1]) / 2)];

/** Closed smooth outline through midpoints, quadratic segments, relative coords. */
function smoothClosed(raw: P2[]) {
  const p = raw.map(ri);
  const n = p.length;
  let cur = mid(p[n - 1], p[0]);
  const d = `M${nums(cur)}q`;
  const seg: number[] = [];
  for (let i = 0; i < n; i++) {
    const m = mid(p[i], p[(i + 1) % n]);
    seg.push(p[i][0] - cur[0], p[i][1] - cur[1], m[0] - cur[0], m[1] - cur[1]);
    cur = m;
  }
  return d + nums(seg) + "z";
}

/** Open smooth curve through midpoints (starts at p0, ends at pn). */
function smoothOpen(raw: P2[]) {
  const p = raw.map(ri);
  const n = p.length;
  let cur = p[0];
  const seg: number[] = [];
  for (let i = 1; i < n - 1; i++) {
    const e = i === n - 2 ? p[n - 1] : mid(p[i], p[i + 1]);
    seg.push(p[i][0] - cur[0], p[i][1] - cur[1], e[0] - cur[0], e[1] - cur[1]);
    cur = e;
  }
  return `M${nums(p[0])}q${nums(seg)}`;
}

function cubic(a: P2, b: P2, c: P2, e: P2) {
  const [p0, p1, p2, p3] = [a, b, c, e].map(ri);
  return `M${nums(p0)}c${nums([p1[0] - p0[0], p1[1] - p0[1], p2[0] - p0[0], p2[1] - p0[1], p3[0] - p0[0], p3[1] - p0[1]])}`;
}

/* ------------------------------------------------------------------ model */

type Item =
  | { k: "tepal"; z: number; d: string; rib: string; g: number; delay: number }
  | { k: "fil"; z: number; d: string; style: boolean; delay: number }
  | { k: "ped"; z: number; d: string; ovary: string; delay: number };

interface Grad {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  back: boolean;
}

interface Anthers {
  body: string;
  pollen: string;
  stigma: string;
  delay: number;
}

const sec = (n: number) => `${Math.round(n * 1000) / 1000}s`;

function build() {
  const rnd = mulberry32(0x1c0215);
  const j = (a: number, b: number) => a + (b - a) * rnd();
  const items: Item[] = [];
  const grads: Grad[] = [];
  const anthers: Anthers[] = [];

  const FLOWERS = 6;
  // Hand-tuned elevations (deg) so the umbel reads as a loose sphere rather than a ring.
  const ELEV = [22, -2, 34, 8, 27, -6];
  const AZ0 = rad(-40);

  for (let i = 0; i < FLOWERS; i++) {
    const az = AZ0 + (i / FLOWERS) * Math.PI * 2 + j(-0.2, 0.2);
    const el = rad(ELEV[i] + j(-5, 5));
    const a = norm([Math.cos(el) * Math.cos(az), Math.sin(el), Math.cos(el) * Math.sin(az)]);
    const u = norm(cross(a, Math.abs(a[1]) > 0.95 ? [1, 0, 0] : UP));
    const v = cross(a, u);
    const ped = j(36, 46);
    const B: V3 = add(mul(a, ped), [0, 4, 0]);
    const zB = depth(B);
    const tDelay = 0.48 + i * 0.07;

    // pedicel + inferior ovary
    const pedStart: V3 = [0, -6, 0];
    const pedMid: V3 = add(mul(a, ped * 0.45), [0, -4, 0]);
    const ov0 = proj(add(B, mul(a, -9)));
    const ov1 = proj(add(B, mul(a, 2)));
    items.push({
      k: "ped",
      z: zB - 30,
      d: smoothOpen([proj(pedStart), proj(pedMid), proj(add(B, mul(a, -6)))]),
      ovary: `M${nums(ri(ov0))}l${nums([r(ov1[0]) - r(ov0[0]), r(ov1[1]) - r(ov0[1])])}`,
      delay: 0.32 + i * 0.04,
    });

    // tepals
    const L = j(112, 126);
    const HW = 8.2; // half-width at the widest point
    const rot0 = j(0, Math.PI * 2);
    const N = 18;
    for (let k = 0; k < 6; k++) {
      const beta = rot0 + (k * Math.PI) / 3 + j(-0.14, 0.14);
      const rv = lin([u, Math.cos(beta)], [v, Math.sin(beta)]);
      const bv = cross(a, rv);
      const th0 = rad(j(26, 40));
      const th1 = rad(j(200, 236));
      const Lk = L * j(0.9, 1.06);
      const twist = j(-0.7, 0.7);
      const ph1 = j(0, 6.28);
      const ph2 = j(0, 6.28);
      const waves = j(4.5, 6);
      const left: P2[] = [];
      const right: P2[] = [];
      const centre: V3[] = [];
      let c: V3 = add(B, mul(a, 2));
      let zSum = 0;
      for (let q = 0; q <= N; q++) {
        const t = q / N;
        if (q > 0) {
          const tm = (q - 0.5) / N;
          const thm = th0 + (th1 - th0) * Math.pow(tm, 1.7);
          c = add(c, mul(lin([a, Math.cos(thm)], [rv, Math.sin(thm)]), Lk / N));
        }
        const th = th0 + (th1 - th0) * Math.pow(t, 1.7);
        const n = lin([a, -Math.sin(th)], [rv, Math.cos(th)]);
        const tau = twist * t;
        const b2 = lin([bv, Math.cos(tau)], [n, Math.sin(tau)]);
        const n2 = lin([n, Math.cos(tau)], [bv, -Math.sin(tau)]);
        // narrow claw, widest near a third, acute tip
        const w = HW * (0.22 * (1 - t) + (0.8 * Math.sqrt(t) * (1 - t)) / 0.385);
        const env = Math.pow(Math.sin(Math.PI * t), 0.8);
        const om = Math.PI * 2 * waves * t;
        const wl = w * (1 + 0.16 * env * Math.sin(om + ph1));
        const wr = w * (1 + 0.16 * env * Math.sin(om + ph2));
        const ol = w * 0.55 * env * Math.sin(om + ph1 + 1.3);
        const or = w * 0.55 * env * Math.sin(om + ph2 + 1.3);
        centre.push(c);
        zSum += depth(c);
        if (q === N) {
          left.push(proj(c));
        } else {
          left.push(proj(lin([c, 1], [b2, wl], [n2, ol])));
          right.push(proj(lin([c, 1], [b2, -wr], [n2, or])));
        }
      }
      const outline = [...left, ...right.reverse()];
      const g0 = proj(centre[0]);
      const g1 = proj(centre[Math.round(N * 0.62)]);
      grads.push({ x1: r(g0[0]), y1: r(g0[1]), x2: r(g1[0]), y2: r(g1[1]), back: zB < -10 });
      items.push({
        k: "tepal",
        z: zSum / (N + 1),
        d: smoothClosed(outline),
        rib: smoothOpen(centre.slice(1, N - 1).filter((_, idx) => idx % 2 === 0).map(proj)),
        g: grads.length - 1,
        delay: tDelay + k * 0.025,
      });
    }

    // stamens (6) + style
    const S = L * j(1.9, 2.1);
    const body: string[] = [];
    const pollen: string[] = [];
    let stigma = "";
    for (let q = 0; q < 7; q++) {
      const isStyle = q === 6;
      const psi = (q * Math.PI * 2) / 6 + j(-0.3, 0.3);
      const spread = isStyle ? 0.06 : j(0.3, 0.55);
      const len = S * (isStyle ? 1.1 : j(0.9, 1.04));
      const d0 = norm(lin([a, 1], [u, spread * Math.cos(psi)], [v, spread * Math.sin(psi)]));
      const lift = j(0.2, 0.32);
      const P0 = add(B, mul(a, 6));
      const P1 = add(P0, mul(d0, 0.42 * len));
      const P2 = lin([P0, 1], [d0, 0.76 * len], [UP, 0.07 * len]);
      const P3 = lin([P0, 1], [d0, 0.84 * len], [UP, lift * len]);
      const [p0, p1, p2, p3] = [P0, P1, P2, P3].map(proj);
      items.push({
        k: "fil",
        z: (depth(P0) + depth(P1) + depth(P2) + depth(P3)) / 4,
        d: cubic(p0, p1, p2, p3),
        style: isStyle,
        delay: 1.02 + i * 0.06 + q * 0.018,
      });
      const tip = ri(p3);
      if (isStyle) {
        stigma = `M${nums(tip)}h.1`;
      } else {
        // versatile anther, held roughly across the filament tip
        let tx = p3[0] - p2[0];
        let ty = p3[1] - p2[1];
        const tl = Math.hypot(tx, ty) || 1;
        tx /= tl;
        ty /= tl;
        const h = j(3.2, 4.4);
        const ax = -ty * h + tx * 1.2;
        const ay = tx * h + ty * 1.2;
        body.push(`M${nums([tip[0] - ax, tip[1] - ay])}l${nums([2 * ax, 2 * ay])}`);
        pollen.push(`M${nums([tip[0] + ax * 0.35, tip[1] + ay * 0.35])}h.1`);
      }
    }
    anthers.push({ body: body.join(""), pollen: pollen.join(""), stigma, delay: 1.78 + i * 0.07 });
  }

  items.sort((p, q) => p.z - q.z);
  return { items, grads, anthers };
}

const MODEL = build();

/* Scape: leaves the umbel, a long gentle S, exits the hero bottom at ~63% x, keeps going
   so the taller 'centered' window is filled too. */
const SCAPE = "M1359 482C1356 700 1292 980 1262 1250S1236 1500 1240 1620";
const SCAPE_SHADE = "M1363 520C1360 720 1298 990 1268 1250S1242 1500 1246 1620";
// faint gold engraving hairline along the lit side of the scape (the only gold on the plate)
const SCAPE_HAIR = "M1354 560C1350 740 1290 990 1258 1250";
// two withered spathe bracts at the top of the scape
const BRACTS = [
  "M1358 488q-9 18-14 46q-2 14 3 26q3-24 9-42q4-14 2-30z",
  "M1362 490q11 16 17 40q3 13 0 25q-5-22-12-38q-6-12-5-27z",
];

/* ------------------------------------------------------------------ component */

export interface LilySVGProps {
  className?: string;
  /** CSS draw-on on first paint (default true). Always off under prefers-reduced-motion. */
  animate?: boolean;
  /** 'hero': umbel at 68% / 38% (desktop, matches the 3D). 'centered': umbel at 50% / 46%.
   *  'stem': the whole plant in a tall STEM_W x STEM_H window. */
  framing?: "hero" | "centered" | "stem";
}

const dl = (delay: number) => ({ "--d": sec(delay) }) as CSSProperties;

export default function LilySVG({ className, animate = true, framing = "hero" }: LilySVGProps) {
  const uid = "ly" + useId().replace(/[^a-zA-Z0-9]/g, "");
  const { items, grads, anthers } = MODEL;
  const cls = [s.lily, animate ? s.animate : "", className].filter(Boolean).join(" ");

  return (
    <svg
      className={cls}
      viewBox={framing === "stem" ? VIEWBOX_STEM : framing === "centered" ? VIEWBOX_CENTERED : VIEWBOX_HERO}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="A red spider lily, Lycoris radiata, drawn in crimson"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`${uid}f`}>
          <stop offset="0" stopColor="#5A0A16" />
          <stop offset=".3" stopColor="#8C0C21" />
          <stop offset=".62" stopColor="#C0102A" />
          <stop offset="1" stopColor="#D8321E" />
        </linearGradient>
        <linearGradient id={`${uid}b`}>
          <stop offset="0" stopColor="#4A0812" />
          <stop offset=".35" stopColor="#780B1D" />
          <stop offset=".7" stopColor="#A50F26" />
          <stop offset="1" stopColor="#BC2420" />
        </linearGradient>
        {grads.map((g, i) => (
          <linearGradient
            key={i}
            id={`${uid}${i}`}
            href={`#${uid}${g.back ? "b" : "f"}`}
            gradientUnits="userSpaceOnUse"
            x1={g.x1}
            y1={g.y1}
            x2={g.x2}
            y2={g.y2}
          />
        ))}
      </defs>

      <g className={s.scape}>
        <path className={s.stem} d={SCAPE} pathLength={1} />
        <path className={s.stemShade} d={SCAPE_SHADE} pathLength={1} />
        <path className={s.hair} d={SCAPE_HAIR} pathLength={1} />
        {BRACTS.map((d, i) => (
          <path key={i} className={s.bract} d={d} pathLength={1} />
        ))}
      </g>

      {items.map((it, i) =>
        it.k === "tepal" ? (
          <g key={i} className={s.tepal} style={dl(it.delay)}>
            <path className={s.blade} d={it.d} fill={`url(#${uid}${it.g})`} pathLength={1} />
            <path className={s.rib} d={it.rib} pathLength={1} />
          </g>
        ) : it.k === "fil" ? (
          <path key={i} className={it.style ? s.styleF : s.fil} d={it.d} pathLength={1} style={dl(it.delay)} />
        ) : (
          <g key={i} className={s.ped} style={dl(it.delay)}>
            <path className={s.pedicel} d={it.d} pathLength={1} />
            <path className={s.ovary} d={it.ovary} pathLength={1} />
          </g>
        ),
      )}

      {anthers.map((an, i) => (
        <g key={i} className={s.anthers} style={dl(an.delay)}>
          <path className={s.anther} d={an.body} />
          <path className={s.pollen} d={an.pollen} />
          <path className={s.stigma} d={an.stigma} />
        </g>
      ))}
    </svg>
  );
}
