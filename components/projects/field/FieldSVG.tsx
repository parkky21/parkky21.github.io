import type { CSSProperties } from "react";
import s from "./FieldSVG.module.css";

/**
 * The Field: a fine-line, engraving-style landscape. A distant Sahyadri ridge (flat basalt
 * mesas, steep scarps, a few strata hairlines), then seven terraced rice paddies stepping down
 * toward the viewer, each a lip, a hatched riser and broken water contours with sparse rice
 * clumps. Spider-lily marks stand along the bunds.
 *
 * Generated once at module load from a seeded PRNG; every coordinate is rounded, so the markup
 * is deterministic for SSR. Server Component: no state, no effects. The draw-on and the season
 * swap are driven by data attributes set on an ancestor (see Field.client.tsx):
 *   [data-draw="armed" | "play"]  and  [data-season="leaf"].
 * With neither attribute the drawing is complete and the lilies are in bloom.
 */

export const FIELD_W = 1600;
export const FIELD_H = 640;
const W = FIELD_W;
const H = FIELD_H;
const VB_Y = 56; // empty sky above the far ridge is cropped off

type P = [number, number];

function mulberry32(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rnd = mulberry32(0x5a4d71);
const range = (a: number, b: number) => a + (b - a) * rnd();

const f = (n: number) => {
  const v = Math.round(n * 10) / 10 + 0;
  return Number.isInteger(v) ? String(v) : v.toFixed(1);
};
const pt = (p: P) => `${f(p[0])} ${f(p[1])}`;

/** Straight polyline. */
const poly = (pts: P[]) => "M" + pts.map(pt).join("L");

/** Catmull-Rom through points, as cubic beziers. */
function smooth(pts: P[]) {
  let d = `M${pt(pts[0])}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1: P = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2: P = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += `C${pt(c1)} ${pt(c2)} ${pt(p2)}`;
  }
  return d;
}

/* ------------------------------------------------------------------ ridge */

/*
 * Deccan-trap profile: smooth low-frequency noise, then "terraced" through a steep sigmoid so the
 * line settles into long flat tops broken by sudden scarps, the way basalt weathers in steps.
 */
type Flat = { x0: number; x1: number; y: number };

function ridge(yTop: number, yLow: number, levels: number, jitter: number) {
  const waves = Array.from({ length: 4 }, (_, i) => ({
    fr: (0.0034 + rnd() * 0.0022) * (1 + i * 1.6),
    ph: rnd() * Math.PI * 2,
    a: 1 / (1 + i * 0.9),
  }));
  const total = waves.reduce((t, w) => t + w.a, 0);
  const noise = (x: number) => 0.5 + (0.5 * waves.reduce((t, w) => t + w.a * Math.sin(x * w.fr + w.ph), 0)) / total;
  const step = (n: number) => {
    const q = n * levels;
    const fl = Math.floor(q);
    const fr = q - fl;
    const sg = (t: number) => 1 / (1 + Math.exp(-(t - 0.5) * 16));
    return (fl + (sg(fr) - sg(0)) / (sg(1) - sg(0))) / levels;
  };
  const pts: P[] = [];
  for (let x = -60; x <= W + 60; x += 8) {
    const v = step(Math.min(0.999, Math.max(0, (noise(x) - 0.5) * 1.35 + 0.5)));
    pts.push([x, yLow - (yLow - yTop) * v + range(-jitter, jitter)]);
  }
  // collect the flats (for strata) and the steep faces (for hatching)
  const flats: Flat[] = [];
  const faces: { x: number; y: number; dir: number }[] = [];
  let run: P[] = [];
  for (let i = 1; i < pts.length; i++) {
    const dy = pts[i][1] - pts[i - 1][1];
    if (Math.abs(dy) < 1.6) run.push(pts[i]);
    else {
      if (run.length > 7) flats.push({ x0: run[0][0], x1: run[run.length - 1][0], y: run.reduce((t, p) => t + p[1], 0) / run.length });
      run = [];
      if (Math.abs(dy) > 3.2) faces.push({ x: pts[i][0], y: Math.min(pts[i][1], pts[i - 1][1]), dir: Math.sign(dy) });
    }
  }
  return { pts, flats, faces };
}

const FAR = ridge(92, 200, 4, 0.5);
const NEAR = ridge(128, 238, 5, 0.7);
const FAR_D = poly(FAR.pts);
const NEAR_D = poly(NEAR.pts);
const NEAR_FILL = `${NEAR_D}L${W + 60} ${H}L-60 ${H}Z`;

/** Basalt strata under the flats, plus a little engraver's hatching down the scarps. */
const STRATA_D = (() => {
  let d = "";
  for (const m of NEAR.flats) {
    const layers = 1 + Math.floor(rnd() * 2.4);
    for (let l = 0; l < layers; l++) {
      const y = m.y + 6 + l * range(5, 8);
      let x = m.x0 + range(6, 30);
      while (x < m.x1 - 14) {
        const x2 = Math.min(x + range(8, 40), m.x1 - 10);
        if (x2 - x > 5 && rnd() < 0.8) d += `M${f(x)} ${f(y + range(-0.5, 0.5))}H${f(x2)}`;
        x = x2 + range(8, 34);
      }
    }
  }
  for (const fc of NEAR.faces) {
    if (rnd() < 0.35) continue;
    const len = range(5, 13);
    d += `M${f(fc.x + range(-2, 2))} ${f(fc.y + 3)}l${f(fc.dir * len * 0.35)} ${f(len)}`;
  }
  return d;
})();

/* ------------------------------------------------------------------ terraces */

const N = 7;
const TOP = 262;
// lip (bund) of each terrace; nearer terraces are taller (perspective)
const lipBase = Array.from({ length: N + 1 }, (_, k) => TOP + (H + 30 - TOP) * Math.pow(k / N, 1.3));
const ph1 = range(0, Math.PI * 2);
const ph2 = range(0, Math.PI * 2);
const ph3 = range(0, Math.PI * 2);

/** Contour-like bunds: one hillside shape that slowly morphs from terrace to terrace. */
function lipY(k: number, x: number) {
  const depth = k / N; // 0 far, 1 near
  const amp = 8 + 44 * Math.pow(depth, 1.1);
  const u = (x - W * 0.46) / (W / 2);
  return (
    lipBase[k] +
    amp *
      (0.55 * Math.sin(x * 0.0029 + ph1 + k * 0.12) +
        0.3 * Math.sin(x * 0.0061 + ph2 - k * 0.1) +
        0.15 * Math.sin(x * 0.0127 + ph3 + k * 0.2)) -
    (10 + 46 * depth) * u * u
  );
}
const riserH = (k: number) => 2.4 + 8 * Math.pow(k / N, 1.2);

const STEP = 40;
const xs = Array.from({ length: Math.ceil((W + 80) / STEP) + 1 }, (_, i) => -40 + i * STEP);
const curve = (fn: (x: number) => number) => smooth(xs.map((x) => [x, fn(x)] as P));

type Terrace = { lip: string; foot: string; hatch: string; water: string; rice: string; k: number };

const TERRACES: Terrace[] = Array.from({ length: N }, (_, k) => {
  const depth = k / N;
  const rh = riserH(k);
  const lip = curve((x) => lipY(k, x));
  const foot = curve((x) => lipY(k, x) + rh);

  // riser hatch: engraver's slanted strokes, only along some stretches of the wall
  let hatch = "";
  let hx = range(0, 30);
  const gate = range(0, Math.PI * 2);
  while (hx < W + 10) {
    if (Math.sin(hx * 0.0052 + gate) > 0.25 && rnd() < 0.7) {
      const y = lipY(k, hx);
      hatch += `M${f(hx)} ${f(y + 0.9)}l${f(-rh * 0.35)} ${f(rh - 1.3)}`;
    }
    hx += range(5, 12) * (1.25 - depth * 0.45);
  }

  // broken water contours across the paddy surface, plus rice clumps riding them
  let water = "";
  let rice = "";
  const lines = 1 + Math.round(depth * 1.6);
  for (let l = 0; l < lines; l++) {
    const t = (l + 0.6) / (lines + 0.5);
    const yAt = (x: number) => {
      const a = lipY(k, x) + rh;
      const b = lipY(k + 1, x);
      return a + (b - a) * t;
    };
    let x = range(-20, 80);
    while (x < W + 20) {
      const len = range(40, 190) * (0.7 + depth * 0.6);
      const x2 = x + len;
      const seg: P[] = [];
      for (let sx = x; sx < x2; sx += 24) seg.push([sx, yAt(sx)]);
      seg.push([x2, yAt(x2)]);
      if (seg.length > 1) water += smooth(seg);

      // rice clumps: a tiny fan of 2-3 ticks, sparse
      let cx = x + range(10, 70);
      while (cx < x2 - 6) {
        if (rnd() < 0.5) {
          const sc = 0.45 + depth * 0.95;
          const cy = yAt(cx);
          const n = 2 + (rnd() < 0.45 ? 1 : 0);
          for (let i = 0; i < n; i++) {
            const lean = (i - (n - 1) / 2) * 2.1 * sc + range(-0.5, 0.5);
            const h = (5.5 + rnd() * 3) * sc;
            rice += `M${f(cx + i * 0.9 * sc)} ${f(cy)}l${f(lean)} ${f(-h)}`;
          }
        }
        cx += range(38, 120) * (1.25 - depth * 0.45);
      }
      x = x2 + range(40, 200);
    }
  }
  return { lip, foot, hatch, water, rice, k };
});

/* ------------------------------------------------------------------ lilies on the bunds */

type Lily = { x: number; y: number; s: number; d: number; flip: boolean };

const LILIES: Lily[] = (() => {
  const out: Lily[] = [];
  // which bunds carry lilies, and how many clusters each (far bunds fewer)
  for (let k = 1; k < N; k++) {
    const depth = k / N;
    const clusters = k < 3 ? 1 : 2;
    for (let c = 0; c < clusters; c++) {
      // keep one cluster near the centre so narrow (cropped) screens still see them
      const centre = c === 0 ? range(560, 1040) : rnd() < 0.5 ? range(120, 480) : range(1120, 1480);
      const count = 2 + Math.floor(rnd() * (2 + depth * 2.5));
      const gap = (18 + rnd() * 10) * (0.5 + depth);
      let x = centre - (gap * (count - 1)) / 2;
      for (let i = 0; i < count; i++) {
        const lx = x + range(-3, 3);
        out.push({ x: lx, y: lipY(k, lx) - 0.6, s: Math.round((0.5 + depth * 0.75 + range(-0.05, 0.08)) * 100) / 100, d: 0, flip: rnd() < 0.5 });
        x += gap * range(0.7, 1.3);
      }
    }
  }
  out.sort((a, b) => a.y - b.y); // far first: painter's order + reveal order
  out.forEach((l, i) => (l.d = 1.45 + i * 0.028));
  return out;
})();

/* Glyphs, drawn in a local frame: base of the stem at 0,0, flower head at 0,-12. */
const BLOOM_STEM = "M0 0Q-.6 -6 .2 -11.2";
const BLOOM_RAYS = (() => {
  let d = "";
  for (let i = 0; i < 6; i++) {
    const a = ((-180 + i * 60) * Math.PI) / 180; // no ray straight down the stem
    const ex = Math.cos(a) * 6.4;
    const ey = -12 + Math.sin(a) * 6.4 - 1.6; // tips sweep upward, like the stamens
    const mx = Math.cos(a) * 3.6;
    const my = -12 + Math.sin(a) * 3.6 + 0.9;
    d += `M0 -12Q${f(mx)} ${f(my)} ${f(ex)} ${f(ey)}`;
  }
  return d;
})();
const LEAF = "M0 0Q-3.4 -5 -9.6 -5.4M0 0Q-1.8 -7 -5.4 -11.2M0 0Q1 -7.4 4.4 -12M0 0Q3.6 -4.6 10 -4.4";

/* ------------------------------------------------------------------ machines */

/*
 * Agri-tech machines, engraved like the figures in an old landscape plate but drawn as sleek,
 * future farm kit (Moebius / Syd Mead line art). Hand-placed with no PRNG draws, so the landscape
 * above is untouched, and scaled with the terrace they stand on. Each glyph is a list of parts in
 * a local frame with its footing at 0,0:
 *   body  vellum-filled hairline shape (hides the paddy lines behind it)
 *   line  iron-gall hairline          fine   lighter, thinner hairline (far side, seams)
 *   gilt  thin gilt accent            pulse  gilt, slowly breathing (lidar, scan)
 *   green paddy-green (seedlings)     lamp   gilt dot           light  gilt dot that blinks
 */

/** A point on the paddy surface of terrace k: t=0 at the foot of its riser, t=1 at the next lip. */
function surf(k: number, x: number, t: number) {
  const foot = lipY(k, x) + riserH(k);
  return foot + (lipY(k + 1, x) - foot) * t;
}

type PartKind = "body" | "line" | "fine" | "gilt" | "pulse" | "green" | "lamp" | "light" | "belt" | "mesh";
type Part = [PartKind, string];

const circ = (cx: number, cy: number, r: number) =>
  `M${f(cx - r)} ${f(cy)}a${f(r)} ${f(r)} 0 1 0 ${f(2 * r)} 0a${f(r)} ${f(r)} 0 1 0 ${f(-2 * r)} 0`;
const elli = (cx: number, cy: number, rx: number, ry: number) =>
  `M${f(cx - rx)} ${f(cy)}a${f(rx)} ${f(ry)} 0 1 0 ${f(2 * rx)} 0a${f(rx)} ${f(ry)} 0 1 0 ${f(-2 * rx)} 0`;
const rad = (deg: number) => (deg * Math.PI) / 180;
const at = (cx: number, cy: number, r: number, deg: number): P => [cx + Math.cos(rad(deg)) * r, cy + Math.sin(rad(deg)) * r];
const arc = (cx: number, cy: number, r: number, a0: number, a1: number) => {
  const [x0, y0] = at(cx, cy, r, a0);
  const [x1, y1] = at(cx, cy, r, a1);
  return `M${f(x0)} ${f(y0)}A${f(r)} ${f(r)} 0 0 1 ${f(x1)} ${f(y1)}`;
};
/** Dotted line as zero-length round-capped dashes (so the stroke draw-on still applies). */
function dots(a: P, b: P, gap: number) {
  const n = Math.max(1, Math.round(Math.hypot(b[0] - a[0], b[1] - a[1]) / gap));
  let d = "";
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    d += `M${f(a[0] + (b[0] - a[0]) * t)} ${f(a[1] + (b[1] - a[1]) * t)}h.1`;
  }
  return d;
}
function wheelSpokes(cx: number, cy: number, r: number, spokes: number) {
  let sp = "";
  for (let i = 0; i < spokes; i++) {
    const a = (360 / spokes) * i + 12;
    const [x0, y0] = at(cx, cy, r * 0.3, a);
    const [x1, y1] = at(cx, cy, r * 0.9, a + 9);
    sp += `M${f(x0)} ${f(y0)}L${f(x1)} ${f(y1)}`;
  }
  return sp;
}
/* 1. Farm crawler: a tracked harvester with no cab. Low angular shell, a tread belt (animated in CSS),
      road wheels, a sensor dome with a lidar sweep, a harvesting header and reel up front. */
const TRACK = "M-44 -18H40A9 9 0 0 1 40 0H-44A9 9 0 0 1 -44 -18Z"; // clockwise: top runs forward
const CRAWLER: Part[] = [
  ["body", TRACK],
  ["belt", TRACK],
  ["fine", "M-44 -16.2H40A7.2 7.2 0 0 1 40 -1.8H-44A7.2 7.2 0 0 1 -44 -16.2Z"],
  ["line", circ(-44, -9, 5.6) + circ(40, -9, 5.6) + [-29, -15, -1, 13, 26].map((x) => circ(x, -6.2, 3.4)).join("")],
  ["fine", wheelSpokes(-44, -9, 5.6, 6) + wheelSpokes(40, -9, 5.6, 6)],
  ["body", "M-57 -20L-53 -32L-37 -37.6L12 -38.6L54 -24L61 -20Z"],
  ["fine", "M-53 -26.6L12 -30.6L55 -21.6M-50 -30.6l2.6 -3.4M-46.6 -31.6l2.6 -3.4M-43.2 -32.6l2.6 -3.4"],
  ["gilt", "M-47 -24.4L-14 -26.6M44 -24.6L57 -20.8"],
  ["line", "M61 -20L73 -12.4V-4H60M63.4 -4v4M67 -4v4M70.6 -4v4"],
  ["fine", circ(67, -15.4, 4.4) + wheelSpokes(67, -15.4, 4.4, 5)],
  ["body", "M-16 -38.4A8 8 0 0 1 0 -38.4Z"],
  ["fine", arc(-8, -38.4, 5, 200, 340)],
  ["pulse", arc(-8, -44, 10, -58, 4) + arc(-8, -44, 16, -54, 0) + arc(-8, -44, 22, -50, -4)],
  ["lamp", circ(57.6, -22, 1.1) + circ(-55.6, -24, 0.9)],
  ["light", circ(-8, -48.2, 1.3)],
];

/* 2. Hexacopter: six arms in perspective, a capsule body, gimbal camera, skids. */
const HEXA: Part[] = (() => {
  const ends = Array.from({ length: 6 }, (_, i) => {
    const a = rad(i * 60 + 30);
    return [Math.cos(a) * 24, Math.sin(a) * 6 - 1] as P;
  });
  const rotorSet = (pts: P[]) => pts.map(([x, y]) => `M0 -.5L${f(x)} ${f(y)}M${f(x)} ${f(y)}V${f(y - 3)}` + elli(x, y - 3.4, 8, 1.7)).join("");
  const back = ends.filter((p) => p[1] < -1);
  const front = ends.filter((p) => p[1] >= -1);
  return [
    ["fine", rotorSet(back)],
    ["body", "M-10 0C-10 -5 10 -5 10 0C10 3.6 -10 3.6 -10 0Z"],
    ["fine", "M-7 -1.6C-3 -3.8 3 -3.8 7 -1.6M-6 2.4L-8.6 10M6 2.4L8.6 10M-12.4 10H-5M5 10H12.4"],
    ["line", rotorSet(front) + "M-2.4 2.6V6.4M2.4 2.6V6.4M-3.2 6.4H3.2"],
    ["body", circ(0, 9.2, 3)],
    ["lamp", circ(0.9, 9.6, 1.1)],
    ["light", circ(front[0][0], front[0][1], 1) + circ(front[2][0], front[2][1], 1)],
  ] as Part[];
})();

/* 3. Quadruped field robot, facing left, planting seedlings with two articulated arms. */
const PLANTER: Part[] = [
  ["fine", "M9 -23.5L20 -13L15 -1.5M15 -1.5h3M-9 -22.5L-5 -13L-10 -1.5M-10 -1.5h3"], // far legs
  ["fine", "M-12 -21.5L-22 -15L-22 -3.4M-22 -3.4l-1.6 2.4M-22 -3.4l1.4 2.4"], // far arm
  ["green", "M-22 0l-.6 -4.6M-22 0l1 -4"],
  ["body", "M-18 -26C-18 -31 12 -32 18 -27L19 -23C10 -20 -12 -20 -18 -22Z"],
  ["body", "M-18 -27.2L-25.4 -26.2L-26.4 -22.6L-18 -21.8Z"], // sensor head
  ["fine", "M-14 -24C-4 -26 8 -26 16 -24.6M-8 -31.2L-7 -34H7L8 -31.2"],
  ["green", "M-5 -34l-1 -4.4M-2 -34l.5 -4.8M1 -34l-.5 -4.4M4 -34l1 -4.4"], // seedling tray
  ["line", "M12 -22L17.4 -11.4L12.4 0M10.6 0h4M-12 -21L-7.6 -11L-13 0M-15 0h4"], // near legs
  ["line", circ(17.4, -11.4, 1.2) + circ(-7.6, -11, 1.2)],
  ["line", "M-15 -22L-26.4 -17.6L-29.6 -6.2M-29.6 -6.2l-2 3M-29.6 -6.2l1.6 3" + circ(-26.4, -17.6, 1.1)], // near arm
  ["green", "M-30.4 -3.2l-.8 -5.2M-30.4 -3.2l1 -4.6"],
  ["fine", "M14 -28.6L17 -36.4"],
  ["light", circ(17.3, -37.6, 1.1)],
  ["lamp", circ(-24.6, -24.6, 0.8)],
];

/* 4. Six-wheeled rover: rocker-bogie, solar-panel back, a mast with a blinking light. */
const ROVER: Part[] = [
  ["fine", circ(-13, -6.6, 4.4) + circ(3, -6.6, 4.4) + circ(19, -6.6, 4.4)], // far wheels
  ["body", circ(-16, -4.4, 4.4) + circ(0, -4.4, 4.4) + circ(16, -4.4, 4.4)],
  ["line", circ(-16, -4.4, 1.2) + circ(0, -4.4, 1.2) + circ(16, -4.4, 1.2) + "M-16 -4.4L-8 -11.4L0 -4.4M-8 -11.4H7L16 -4.4"],
  ["body", "M-19 -11H17L20 -14L18 -19H-16L-19 -15Z"],
  ["fine", "M-16 -15H17"],
  ["body", "M-17 -20.4L-12 -28.4H10.4L6 -20.4Z"],
  ["fine", "M-14.4 -24.4H8.2M-11.2 -20.4L-7 -28.4M-5.4 -20.4L-1.4 -28.4M.4 -20.4L4 -28.4"],
  ["line", "M12 -19V-40M10 -44L7.6 -50"],
  ["body", "M8 -40H18V-44H8Z"],
  ["lamp", circ(16.4, -42, 0.8)],
  ["light", circ(12, -47.6, 1.2)],
];

/* 5. Micro-drone for the swarm. */
const MICRO: Part[] = [
  ["line", "M-3 -.5L-8.4 -1.8M3 -.5L8.4 -1.8" + elli(-8.4, -2.8, 4, 0.9) + elli(8.4, -2.8, 4, 0.9)],
  ["body", "M-3.6 0C-3.6 -2.2 3.6 -2.2 3.6 0C3.6 1.5 -3.6 1.5 -3.6 0Z"],
  ["light", circ(0, 2.2, 0.8)],
];

/* 6. Sensor / weather mast: a slender double pole, guy wires, a tiny dish, a helical turbine. */
const MAST: Part[] = [
  ["fine", "M-.6 -56L-16 0M.6 -56L14 0"],
  ["line", "M-.6 0V-80M.6 0V-80M-4 0H4M-2.6 0L-.6 -4M2.6 0L.6 -4"],
  ["body", "M-3 -34H3V-26H-3Z"],
  ["fine", "M-2 -32H2M-2 -30H2M-2 -28H2M.6 -46L2 -45.2"],
  ["body", "M1 -46L10 -50L11 -47L2 -43Z"],
  ["line", "M-.6 -64H-7.4"],
  ["body", "M-7 -70.4Q-15.6 -66 -11 -57.6Q-10.2 -64.4 -7 -70.4Z"],
  ["fine", "M-9.2 -64L-15.4 -67.4"],
  ["line", "M0 -80V-96M-4 -82C4 -85 -4 -91 4 -94M4 -82C-4 -85 4 -91 -4 -94"],
  ["fine", "M-4.6 -82H4.6M-4.6 -94H4.6"],
  ["light", circ(0, -98.6, 1.2)],
];

/* 7. Supervisor scouts: tiny wheeled and legged bots that wander the bunds. */
const SCOUT_W: Part[] = [
  ["body", circ(-6, -3.2, 3.2) + circ(7, -3.2, 3.2)],
  ["line", circ(-6, -3.2, 0.9) + circ(7, -3.2, 0.9)],
  ["body", "M-10.4 -5.6C-10.4 -11 7 -12.4 11.4 -7.2L11.6 -5.2H-10.4Z"],
  ["fine", "M-8 -8.2L9 -9M-4 -10.6L-6.4 -18"],
  ["lamp", circ(9.4, -8.2, 0.75)],
  ["light", circ(-6.6, -19.2, 1)],
];
const SCOUT_L: Part[] = [
  ["fine", "M-3 -7L-6 -11L-8.4 0M2 -7L4 -11.6L5.4 0"], // far legs
  ["body", elli(0, -8.4, 7.4, 3.2)],
  ["line", "M-4 -7L-9 -11.4L-11.6 0M1 -6.6L1.6 -12L-.6 0M5 -7L10 -11.4L12.4 0"],
  ["body", circ(8.6, -9.6, 2.3)],
  ["fine", "M-2 -11.2L-4 -18.4"],
  ["lamp", circ(9.6, -9.8, 0.7)],
  ["light", circ(-4.2, -19.6, 1)],
];

/* ------------------------------------------------------------------ the roaming agents */

/*
 * Everything that moves rides a CSS motion path (offset-path) in viewBox units: ground agents
 * follow lanes laid along the terrace surfaces (offset-rotate: auto, so they tilt with the
 * land), drones fly long closed routes across the whole field. Negative animation delays give
 * every agent its own phase, so the paused first frame (no JS, reduced motion, out of view) is
 * already a busy, frozen moment. Animations only run while the section is in view.
 */

const polyLen = (pts: P[]) => pts.reduce((t, p, i) => (i ? t + Math.hypot(p[0] - pts[i - 1][0], p[1] - pts[i - 1][1]) : 0), 0);

/** A lane along terrace k at depth t, from well off the left edge to well off the right. */
function lane(k: number, t: number, wobble = 0, ph = 0) {
  const pts = Array.from({ length: Math.ceil((W + 440) / 40) + 1 }, (_, i) => {
    const x = -220 + i * 40;
    return [x, surf(k, x, Math.min(0.92, Math.max(0.08, t + wobble * Math.sin(x * 0.011 + ph))))] as P;
  });
  return { d: smooth(pts), len: polyLen(pts) };
}

/** A meandering scout path inside terrace k between x0 and x1: weaves from bund to paddy. */
function meander(k: number, x0: number, x1: number, ph: number) {
  const pts: P[] = [];
  for (let x = x0; x <= x1; x += 16) pts.push([x, surf(k, x, 0.5 + 0.3 * Math.sin((x - x0) * 0.013 + ph))]);
  return smooth(pts);
}

/** Closed flight routes, sampled densely (drones don't rotate, so straight segments are fine). */
function route(fn: (u: number) => P, n = 160) {
  const pts = Array.from({ length: n }, (_, i) => fn((i / n) * Math.PI * 2));
  return poly(pts) + "Z";
}
// long traversal: out along one line of paddies, turn off-stage, back along a lower one
const RACETRACK = route((u) => {
  const c = Math.cos(u);
  const x = W / 2 + (W / 2 + 160) * Math.sin(u);
  const y = 300 + 34 * (1 - c) + 10 * Math.sin(x * 0.006);
  return [x, y];
});
const EIGHT = route((u) => [W / 2 + 760 * Math.sin(u), 318 + 46 * Math.sin(2 * u)]);
const HIGH_EIGHT = route((u) => [W / 2 + 720 * Math.sin(u + 1.1), 168 + 28 * Math.sin(2 * (u + 1.1))]);

type Ground = {
  id: string;
  glyph: Part[];
  path: string;
  s: number;
  dur: number;
  phase: number; // 0..1, where it is in the frozen frame
  reverse?: boolean;
  small?: boolean;
  rear: number; // local x of the tail, where the track trail starts
  ping?: boolean;
  link?: number; // a mesh line back to a convoy follower this far behind (viewBox units)
  escorts?: boolean;
};

const L5 = lane(5, 0.42);
const L4 = lane(4, 0.5, 0.03, 1.2);
const L3 = lane(3, 0.55, 0.04, 2.1);
const L2 = lane(2, 0.58, 0.035, 0.4);
const L1 = lane(1, 0.55, 0.05, 3);
const sAt = (k: number) => Math.round((0.42 + (k / N) * 0.62) * 100) / 100;

const PLANTER_GAP = 120;
const GROUND: Ground[] = [
  { id: "crawler", glyph: CRAWLER, path: L5.d, s: 0.86, dur: 110, phase: 0.52, rear: -54, ping: true, escorts: true },
  { id: "rover", glyph: ROVER, path: L4.d, s: sAt(4), dur: 78, phase: 0.66, rear: -19, small: true },
  { id: "planter-3", glyph: PLANTER, path: L3.d, s: sAt(3), dur: 150, phase: 0.36, reverse: true, rear: -20 },
  { id: "planter-2a", glyph: PLANTER, path: L2.d, s: sAt(2), dur: 170, phase: 0.47, rear: -20, link: PLANTER_GAP, ping: true },
  { id: "planter-2b", glyph: PLANTER, path: L2.d, s: sAt(2), dur: 170, phase: 0.47 - PLANTER_GAP / L2.len, rear: -20, small: true },
  { id: "rover-1", glyph: ROVER, path: L1.d, s: sAt(1), dur: 96, phase: 0.18, reverse: true, rear: -19, small: true },
];

type Scout = { id: string; glyph: Part[]; path: string; s: number; dur: number; phase: number; small?: boolean };
const SCOUTS: Scout[] = [
  { id: "scout-a", glyph: SCOUT_W, path: meander(4, 380, 900, 0.3), s: 0.92, dur: 30, phase: 0.1 },
  { id: "scout-b", glyph: SCOUT_L, path: meander(3, 880, 1380, 1.7), s: 0.86, dur: 34, phase: 0.55 },
  { id: "scout-c", glyph: SCOUT_W, path: meander(2, 260, 700, 2.6), s: 0.74, dur: 27, phase: 0.8, small: true },
  { id: "scout-d", glyph: SCOUT_L, path: meander(5, 1060, 1500, 0.9), s: 1, dur: 38, phase: 0.3, small: true },
];

type Flyer = { id: string; kind: "hexa" | "swarm"; path: string; s: number; dur: number; phase: number; small?: boolean; ground?: number };
const FLYERS: Flyer[] = [
  { id: "hexa-a", kind: "hexa", path: RACETRACK, s: 0.82, dur: 50, phase: 0.08, ground: 66 },
  { id: "hexa-b", kind: "hexa", path: EIGHT, s: 0.62, dur: 64, phase: 0.6, ground: 52, small: true },
  { id: "swarm", kind: "swarm", path: HIGH_EIGHT, s: 0.86, dur: 40, phase: 0.3 },
];

/** Hexacopter scan: a dotted cone from the gimbal to a perspective grid on the paddy below. */
function scanGrid(groundLocal: number) {
  let grid = "";
  const rows = 4, cols = 9;
  const corners: P[] = [];
  for (let j = 0; j < rows; j++) {
    const widen = 0.8 + 0.2 * (j / (rows - 1));
    for (let i = 0; i < cols; i++) {
      const gx = (i - (cols - 1) / 2) * 7.4 * widen;
      const gy = groundLocal - 5 + j * 3.4;
      grid += `M${f(gx)} ${f(gy)}h.1`;
      if (j === rows - 1 && (i === 0 || i === cols - 1)) corners.push([gx, gy]);
    }
  }
  return { grid, cone: dots([0, 12.6], corners[0], 3.6) + dots([0, 12.6], corners[1], 3.6) };
}

const SWARM_POS: P[] = [[0, -9], [-22, 6], [22, 6]];
const SWARM_MESH = dots(SWARM_POS[0], SWARM_POS[1], 3) + dots(SWARM_POS[0], SWARM_POS[2], 3) + dots(SWARM_POS[1], SWARM_POS[2], 3);

/* static backbone: three sensor masts on the bunds, linked by a flowing gilt mesh */
type Mast = { x: number; y: number; s: number; small?: boolean };
const MASTS: Mast[] = [
  { x: 240, y: lipY(4, 240) - 0.4, s: 0.74, small: true },
  { x: 600, y: lipY(3, 600) - 0.4, s: 0.66 },
  { x: 1265, y: lipY(2, 1265) - 0.4, s: 0.56 },
];
const mastTop = (m: Mast): P => [m.x, m.y - 98.6 * m.s];
const BACKBONE = poly([mastTop(MASTS[0]), mastTop(MASTS[1]), mastTop(MASTS[2])]);

const PART_CLASS: Record<Exclude<PartKind, "lamp" | "light">, string> = {
  body: s.mBody,
  line: s.mLine,
  fine: s.mFine,
  gilt: s.mGilt,
  pulse: s.mGilt,
  green: s.mGreen,
  belt: s.belt,
  mesh: s.mesh,
};

function Parts({ parts, d }: { parts: Part[]; d: number }) {
  return (
    <>
      {parts.map(([kind, path], i) => {
        if (kind === "lamp" || kind === "light" || kind === "belt" || kind === "mesh") {
          // not drawn on (their dashes are their own): they fade in with the lights
          return (
            <g key={i} className={s.lit} style={v(d + 0.8)}>
              <path className={kind === "light" ? s.light : kind === "lamp" ? s.lamp : PART_CLASS[kind]} d={path} />
            </g>
          );
        }
        const ink = <path className={`${s.ink} ${PART_CLASS[kind]}`} d={path} pathLength={1} style={v(d + i * 0.04, 0.9)} />;
        return kind === "pulse" ? (
          <g key={i} className={s.pulse}>
            {ink}
          </g>
        ) : (
          <g key={i}>{ink}</g>
        );
      })}
    </>
  );
}

const cls = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(" ");
const motion = (path: string | null, dur: number, phase: number, extra?: CSSProperties) =>
  ({
    ...(path ? { offsetPath: `path('${path}')` } : {}),
    "--dur": `${dur}s`,
    "--del": `${f(-phase * dur)}s`,
    ...extra,
  }) as CSSProperties;

function GroundAgent({ a }: { a: Ground }) {
  const trail = `M${a.rear - 120} -0.6H${a.rear}M${a.rear - 120} 2.4H${a.rear}`;
  return (
    <g
      className={cls(s.roam, s.machine, a.small && s.small)}
      data-machine={a.id}
      style={motion(a.path, a.dur, a.phase, a.reverse ? { animationDirection: "reverse" } : undefined)}
    >
      <g transform={`scale(${a.reverse ? -a.s : a.s} ${a.s})`} style={{ "--sw": f(1 / a.s) } as CSSProperties}>
        <path className={s.trail} d={trail} />
        {a.link && (
          <Parts parts={[["mesh", `M-6 -30L${f(-a.link / a.s)} -30`]]} d={2} />
        )}
        {a.escorts && (
          <>
            {[
              { x0: 104, y0: 4, amp: 18 },
              { x0: -150, y0: 3, amp: 14 },
            ].map((e, i) => {
              const px = -8, py = -48; // the dome
              const ex = e.x0, ey = e.y0 - 19; // escort antenna
              const k0 = (ex - e.amp - px) / (ex - px);
              const k1 = (ex + e.amp - px) / (ex - px);
              const st = { "--a": `${e.amp}px`, "--k0": String(Math.round(k0 * 1000) / 1000), "--k1": String(Math.round(k1 * 1000) / 1000), animationDelay: `${-i * 2.3}s` } as CSSProperties;
              return (
                <g key={i}>
                  <g transform={`translate(${px} ${py})`}>
                    <g className={cls(s.lit)} style={v(2.4)}>
                      <path className={cls(s.mesh, s.escortLink)} d={`M0 0L${f(ex - px)} ${f(ey - py)}`} style={st} />
                    </g>
                  </g>
                  <g className={s.escort} style={st}>
                    <g transform={`translate(${e.x0} ${e.y0}) scale(0.95)`}>
                      <Parts parts={SCOUT_W} d={2.1} />
                    </g>
                  </g>
                </g>
              );
            })}
          </>
        )}
        {a.ping && <path className={s.ping} d={circ(0, -18, 8)} />}
        <Parts parts={a.glyph} d={1.6} />
      </g>
    </g>
  );
}

function ScoutAgent({ a }: { a: Scout }) {
  return (
    <g className={cls(s.scout, s.machine, a.small && s.small)} data-machine={a.id} style={motion(a.path, a.dur, a.phase)}>
      <g className={s.face}>
        <g transform={`scale(${a.s})`} style={{ "--sw": f(1 / a.s) } as CSSProperties}>
          <path className={cls(s.mesh, s.beam)} d="M-5 -22V-110" />
          <path className={s.ping} d={circ(-5, -12, 7)} />
          <Parts parts={a.glyph} d={1.9} />
        </g>
      </g>
    </g>
  );
}

function FlyerAgent({ a }: { a: Flyer }) {
  const body =
    a.kind === "hexa" ? (
      (() => {
        const { grid, cone } = scanGrid((a.ground ?? 60) / a.s);
        return (
          <>
            <g className={s.pulse}>
              <path className={s.scanDots} d={grid + cone} />
            </g>
            <g className={s.bob}>
              <Parts parts={HEXA} d={1.8} />
            </g>
          </>
        );
      })()
    ) : (
      <>
        <g className={s.pulse}>
          <path className={s.scanDots} d={SWARM_MESH} />
        </g>
        {SWARM_POS.map(([x, y], i) => (
          <g key={i} transform={`translate(${x} ${y})`}>
            <g className={[s.bob, s.bob2, s.bob3][i]}>
              <Parts parts={MICRO} d={1.5 + i * 0.1} />
            </g>
          </g>
        ))}
      </>
    );
  return (
    <>
      {/* a dotted contrail: dots riding the same route a beat behind */}
      {Array.from({ length: 7 }, (_, i) => (
        <circle
          key={i}
          className={cls(s.fly, s.contrail, a.small && s.small)}
          r={f(1.1 - i * 0.1)}
          style={motion(a.path, a.dur, a.phase - ((i + 1) * 0.42) / a.dur, { opacity: f(0.62 - i * 0.08) })}
        />
      ))}
      <g className={cls(s.fly, s.machine, a.small && s.small)} data-machine={a.id} style={motion(a.path, a.dur, a.phase)}>
        <g transform={`scale(${a.s})`} style={{ "--sw": f(1 / a.s) } as CSSProperties}>
          {body}
        </g>
      </g>
    </>
  );
}

/* ------------------------------------------------------------------ component */

const v = (d: number, t?: number) => ({ "--d": `${d}s`, ...(t ? { "--t": `${t}s` } : {}) }) as CSSProperties;

export interface FieldSVGProps {
  className?: string;
}

export default function FieldSVG({ className }: FieldSVGProps) {
  return (
    <svg
      className={className ? `${s.field} ${className}` : s.field}
      viewBox={`0 ${VB_Y} ${W} ${H - VB_Y}`}
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="field-trail" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" style={{ stopColor: "var(--iron-gall)", stopOpacity: 0 }} />
          <stop offset="1" style={{ stopColor: "var(--iron-gall)", stopOpacity: 0.42 }} />
        </linearGradient>
      </defs>
      {/* sky and hills */}
      <path className={`${s.ink} ${s.far}`} d={FAR_D} pathLength={1} style={v(0.05, 1.6)} />
      <path className={s.mask} d={NEAR_FILL} />
      <path className={`${s.ink} ${s.ridge}`} d={NEAR_D} pathLength={1} style={v(0, 1.5)} />
      <path className={`${s.ink} ${s.strata}`} d={STRATA_D} pathLength={1} style={v(0.7, 1.1)} />

      {/* terraces, far to near */}
      {TERRACES.map((t) => (
        <g key={t.k} opacity={f(0.5 + 0.5 * Math.pow(t.k / (N - 1), 0.8))}>
          <path className={`${s.ink} ${s.water}`} d={t.water} pathLength={1} style={v(0.85 + t.k * 0.09, 1.1)} />
          <path className={`${s.ink} ${s.rice}`} d={t.rice} pathLength={1} style={v(1.15 + t.k * 0.09, 0.9)} />
          <path className={`${s.ink} ${s.hatch}`} d={t.hatch} pathLength={1} style={v(0.7 + t.k * 0.09, 0.9)} />
          <path className={`${s.ink} ${s.foot}`} d={t.foot} pathLength={1} style={v(0.5 + t.k * 0.09, 1.2)} />
          <path className={`${s.ink} ${s.lip}`} d={t.lip} pathLength={1} style={v(0.35 + t.k * 0.09, 1.3)} />
        </g>
      ))}

      {/* spider-lily marks along the bunds: bloom (Sep–Oct) or strap leaves (the rest of the year) */}
      {LILIES.map((l, i) => (
        <g
          key={i}
          className={s.lily}
          data-lily=""
          transform={`translate(${f(l.x)} ${f(l.y)}) scale(${l.flip ? -l.s : l.s} ${l.s})`}
          style={v(l.d)}
        >
          <g className={s.bloom}>
            <path className={s.stem} d={BLOOM_STEM} />
            <path className={s.rays} d={BLOOM_RAYS} />
          </g>
          <path className={s.leaf} d={LEAF} />
          <circle className={s.hit} cx="0" cy="-8" r="14" />
        </g>
      ))}

      {/* the network backbone: sensor masts on the bunds, linked by a flowing gilt mesh */}
      <g className={s.lit} style={v(2.2)}>
        <path className={cls(s.mesh, s.backbone)} d={BACKBONE} />
      </g>
      {MASTS.map((m, i) => (
        <g key={i} className={cls(s.machine, m.small && s.small)} data-machine={`mast-${i}`}>
          <g transform={`translate(${f(m.x)} ${f(m.y)}) scale(${m.s})`} style={{ "--sw": f(1 / m.s) } as CSSProperties}>
            <path className={s.ping} d={circ(0, -98.6, 7)} style={{ animationDelay: `${-i * 2.7}s` }} />
            <Parts parts={MAST} d={1.6 + i * 0.1} />
          </g>
        </g>
      ))}

      {/* roaming agents, far to near; drones last, they fly over everything */}
      {SCOUTS.map((a) => (
        <ScoutAgent key={a.id} a={a} />
      ))}
      {GROUND.map((a) => (
        <GroundAgent key={a.id} a={a} />
      ))}
      {FLYERS.map((a) => (
        <FlyerAgent key={a.id} a={a} />
      ))}

    </svg>
  );
}
