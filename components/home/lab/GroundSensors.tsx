import type { CSSProperties } from "react";
import d from "./draw.module.css";
import s from "./GroundSensors.module.css";

const INK = "var(--color-ink)";
const TEAL = "var(--color-teal)";
const TEAL_DEEP = "var(--color-teal-deep)";
const LILY = "#c43d2b";
const HAND = "var(--font-caveat), cursive";
const MONO = "ui-monospace, monospace";

const delay = (sec: number, dur?: number) =>
  ({ "--d": `${sec}s`, ...(dur ? { "--dur": `${dur}s` } : {}) }) as CSSProperties;

/* Strata boundaries — each two cubics so the fills can retrace them backwards. */
const HORIZON = "M6 80C60 77 110 83 160 80C210 77 260 78 314 81";
const TOP_SUB = "M6 122C70 118 120 127 180 121C230 116 270 120 314 124";
const SUB_ROCK = "M6 172C60 176 130 168 190 174C240 179 280 170 314 173";
const STRATA_FILLS = [
  { d: `${HORIZON}L314 124C270 120 230 116 180 121C120 127 70 118 6 122Z`, fill: INK, opacity: 0.09 },
  { d: `${TOP_SUB}L314 173C280 170 240 179 190 174C130 168 60 176 6 172Z`, fill: "var(--color-accent-deep)", opacity: 0.09 },
  { d: `${SUB_ROCK}L314 232L6 232Z`, fill: INK, opacity: 0.05 },
];
const STRATA_LABELS = [
  { text: "topsoil", y: 110 },
  { text: "subsoil", y: 150 },
  { text: "bedrock", y: 224 },
];

/* Two buried pods feed the agents; the agents talk to each other directly. */
const PODS = [
  { x: 70, y: 194, tilt: -6 },
  { x: 262, y: 190, tilt: 5 },
];
const MOLE_ANTENNA = "158 131";
const PROBE_TIP = "236 103";
const MESH = [
  `M70 194Q104 168 ${MOLE_ANTENNA}Q196 96 ${PROBE_TIP}L234 84`, // pod → agent-02 → agent-01
  `M262 190Q252 140 ${PROBE_TIP}`, // pod → agent-01
];
const TUNNEL = "M100 81C98 104 102 126 118 138C128 146 140 149 150 149";

/* Seeded PRNG so the stipple/hatch texture is identical on every render. */
function mulberry32(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
type Box = [x0: number, y0: number, x1: number, y1: number];
const inBox = (x: number, y: number, boxes: Box[]) =>
  boxes.some(([x0, y0, x1, y1]) => x >= x0 && x <= x1 && y >= y0 && y <= y1);
const nearPod = (x: number, y: number) => PODS.some((p) => Math.hypot(x - p.x, y - p.y) < 27);

function scatter(seed: number, n: number, [x0, y0, x1, y1]: Box, keepOut: Box[]) {
  const rand = mulberry32(seed);
  const pts: [number, number][] = [];
  for (let i = 0; i < n; i++) {
    const x = Math.round(x0 + rand() * (x1 - x0));
    const y = Math.round(y0 + rand() * (y1 - y0));
    if (!inBox(x, y, keepOut) && !nearPod(x, y)) pts.push([x, y]);
  }
  return pts;
}
const STIPPLE = scatter(21, 90, [10, 88, 310, 114], [[138, 82, 162, 104], [88, 82, 114, 120], [268, 98, 314, 112], [226, 82, 244, 112]]);
const HATCH = scatter(7, 80, [10, 132, 306, 162], [[8, 138, 112, 157], [96, 118, 152, 158], [138, 124, 216, 168], [266, 140, 314, 154]]);
const PEBBLES = [
  [24, 190, 5, 3], [122, 222, 6, 3.5], [200, 222, 4.5, 2.6], [234, 224, 6, 3.4], [298, 188, 4, 2.5],
];

/* Lycoris head: recurved petals flung outward, long stamens sweeping up. */
const LILY_HEAD = { x: 150, y: 40 };
const polar = (deg: number, r: number, bend = 0) => {
  const a = (deg * Math.PI) / 180;
  const px = LILY_HEAD.x + Math.cos(a) * r - Math.sin(a) * bend;
  const py = LILY_HEAD.y + Math.sin(a) * r + Math.cos(a) * bend;
  return `${px.toFixed(1)} ${py.toFixed(1)}`;
};
const PETALS = [-170, -130, -90, -50, -10, 30, 150].map(
  (a) => `M${polar(a, 0)}Q${polar(a, 7, 2.5)} ${polar(a, 13)}Q${polar(a, 14.5, 4)} ${polar(a, 10.5, 4.5)}`,
);
const STAMENS = [-158, -132, -108, -84, -60, -34].map((a) => ({
  d: `M${polar(a, 0)}Q${polar(a, 11, a < -90 ? 4 : -4)} ${polar(a, 18)}`,
  tip: polar(a, 18).split(" ").map(Number),
}));

const SPROUTS = [36, 56, 186, 206];

function Sprout({ x, at }: { x: number; at: number }) {
  return (
    <g strokeLinecap="round" strokeLinejoin="round">
      <path d={`M${x} 81q1 -9 0 -16`} stroke={INK} strokeWidth="1.4" pathLength={1} className={d.draw} style={delay(at, 0.6)} />
      <path
        d={`M${x} 70q-8 -6 -10 -1q5 4 10 1M${x} 66q7 -7 10 -2q-4 5 -10 2`}
        stroke={TEAL_DEEP}
        strokeWidth="1.4"
        fill={TEAL}
        fillOpacity="0.25"
        className={d.pop}
        style={delay(at + 0.4)}
      />
      {/* roots */}
      <path
        d={`M${x} 82q-3 8 -1 15q1 5 -2 9M${x} 82q4 6 6 12M${x} 82q-5 4 -8 8`}
        stroke={INK}
        strokeOpacity="0.7"
        strokeWidth="1.2"
        pathLength={1}
        className={d.draw}
        style={delay(at + 0.5, 1)}
      />
    </g>
  );
}

export function GroundSensors({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 240" className={`sketch block h-auto w-full ${className}`} fill="none" aria-hidden>
      {/* soil strata */}
      {STRATA_FILLS.map((f, i) => (
        <path key={i} d={f.d} fill={f.fill} fillOpacity={f.opacity} className={s.fade} style={delay(0.2 + i * 0.2)} />
      ))}
      <g className={s.fade} style={delay(0.8)} fill={INK}>
        {STIPPLE.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="0.9" fillOpacity="0.45" />
        ))}
        {HATCH.map(([x, y], i) => (
          <path key={i} d={`M${x} ${y}l4 -4`} stroke={INK} strokeOpacity="0.35" strokeWidth="1" strokeLinecap="round" />
        ))}
        {PEBBLES.map(([x, y, rx, ry], i) => (
          <ellipse key={i} cx={x} cy={y} rx={rx} ry={ry} stroke={INK} strokeOpacity="0.55" strokeWidth="1.2" fill={INK} fillOpacity="0.08" />
        ))}
      </g>
      {[HORIZON, TOP_SUB, SUB_ROCK].map((p, i) => (
        <path
          key={p}
          d={p}
          stroke={INK}
          strokeWidth={i === 0 ? 2.2 : 1.3}
          strokeOpacity={i === 0 ? 1 : 0.6}
          strokeLinecap="round"
          pathLength={1}
          className={d.draw}
          style={delay(i * 0.25, 1.1)}
        />
      ))}
      {STRATA_LABELS.map((l, i) => (
        <text key={l.text} x="312" y={l.y} textAnchor="end" fontFamily={HAND} fontSize="11.5" fill={INK} fillOpacity="0.75" className={d.pop} style={delay(1 + i * 0.15)}>
          {l.text}
        </text>
      ))}

      {/* crops */}
      {SPROUTS.map((x, i) => (
        <Sprout key={x} x={x} at={0.9 + i * 0.1} />
      ))}

      {/* red spider lily: bulb + roots below, bare stem and head above */}
      <g strokeLinecap="round">
        <path d="M150 82C144 86 141 92 144 97C147 100 153 100 156 97C159 92 156 86 150 82Z" stroke={INK} strokeWidth="1.4" fill="var(--color-kraft)" className={d.pop} style={delay(1.2)} />
        <path
          d="M146 99q-4 10 -2 18q2 8 -3 14M150 100q1 12 -1 22q-1 6 2 10M154 99q5 9 3 17q-2 6 3 10"
          stroke={INK}
          strokeOpacity="0.7"
          strokeWidth="1.2"
          pathLength={1}
          className={d.draw}
          style={delay(1.4, 1.1)}
        />
      </g>
      <g className={s.sway}>
        <path d="M150 81C149 68 152 56 150 41" stroke={TEAL_DEEP} strokeWidth="1.8" strokeLinecap="round" pathLength={1} className={d.draw} style={delay(1.2, 0.8)} />
        <g className={d.pop} style={delay(1.9)} stroke={LILY} strokeLinecap="round">
          {PETALS.map((p) => (
            <path key={p} d={p} strokeWidth="2.2" />
          ))}
          {STAMENS.map(({ d: p, tip: [tx, ty] }) => (
            <g key={p}>
              <path d={p} strokeWidth="0.9" />
              <circle cx={tx} cy={ty} r="1.2" fill={LILY} stroke="none" />
            </g>
          ))}
        </g>
      </g>

      {/* agent-02 dug in from the surface: mound, then its tunnel */}
      <path d="M88 81q12 -9 24 0" stroke={INK} strokeWidth="1.5" fill="var(--color-kraft)" strokeLinecap="round" className={d.pop} style={delay(1.4)} />
      <path d={TUNNEL} stroke="var(--color-paper)" strokeOpacity="0.4" strokeWidth="13" strokeLinecap="round" pathLength={1} className={d.draw} style={delay(1.5, 1)} />

      {/* scout drone */}
      <g className={d.pop} style={delay(2.8)}>
        <g className={d.float} style={delay(3.4)} stroke={INK} strokeWidth="1.4" strokeLinecap="round">
          <path d="M40 24h16M43 24l-4 -4M53 24l4 -4" />
          <rect x="43" y="23" width="10" height="5" rx="2" fill="var(--color-paper)" />
          <ellipse cx="37" cy="19.5" rx="5" ry="1.4" stroke={TEAL_DEEP} />
          <ellipse cx="59" cy="19.5" rx="5" ry="1.4" stroke={TEAL_DEEP} />
        </g>
      </g>

      {/* mesh: drawn faint, then packets flow along it */}
      {MESH.map((m, i) => (
        <g key={m}>
          <path d={m} stroke={TEAL_DEEP} strokeOpacity="0.45" strokeWidth="1.4" strokeLinecap="round" pathLength={1} className={d.draw} style={delay(2.6 + i * 0.2, 1)} />
          <path d={m} stroke={TEAL_DEEP} strokeWidth="2" strokeDasharray="3 9" strokeLinecap="round" className={s.flow} />
        </g>
      ))}

      {/* agent-01: surface rover sweeping the crops with its scan beam */}
      <g className={s.sweep}>
        <path d="M248 42L182 77L214 80Z" fill={TEAL} fillOpacity="0.16" stroke={TEAL} strokeOpacity="0.6" strokeWidth="1" strokeDasharray="2 3" className={s.fade} style={delay(3.1)} />
      </g>
      <path d="M238 62L230 67L234 82V103" stroke={INK} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" pathLength={1} className={d.draw} style={delay(2.2, 0.8)} />
      <g className={d.pop} style={delay(1.8)} strokeLinecap="round" strokeLinejoin="round">
        <path d="M258 56V48M266 32L269 23" stroke={INK} strokeWidth="1.5" />
        <circle cx="269" cy="22" r="2" fill="var(--color-accent)" />
        <rect x="236" y="56" width="44" height="14" rx="4" fill="var(--color-paper)" stroke={INK} strokeWidth="1.6" />
        <rect x="266" y="59" width="7" height="7" rx="1" stroke={INK} strokeWidth="1.1" />
        <rect x="244" y="32" width="28" height="16" rx="6" fill="var(--color-paper)" stroke={TEAL_DEEP} strokeWidth="1.8" />
        <rect x="247" y="36" width="14" height="8" rx="4" fill={TEAL} fillOpacity="0.25" stroke={TEAL_DEEP} strokeWidth="1.2" />
        <circle cx="251" cy="40" r="1.6" fill={TEAL_DEEP} />
        <circle cx="257" cy="40" r="1.6" fill={TEAL_DEEP} />
        {[246, 270].map((x) => (
          <g key={x}>
            <circle cx={x} cy="74" r="6" fill="var(--color-paper)" stroke={INK} strokeWidth="1.6" />
            <circle cx={x} cy="74" r="1.6" fill={INK} />
          </g>
        ))}
      </g>

      {/* agent-02: drill-nosed mole-bot, the hero, listening in the subsoil */}
      <g className={s.dig}>
        <g className={d.pop} style={delay(2.3)} strokeLinecap="round" strokeLinejoin="round">
          <path d="M160 138L158 131" stroke={INK} strokeWidth="1.4" />
          <circle cx="158" cy="130" r="2" fill={TEAL} stroke={TEAL_DEEP} strokeWidth="1" />
          <path d="M185 139L209 149L185 159Z" fill="var(--color-paper)" stroke={INK} strokeWidth="1.6" />
          <path d="M190 141.5L193 156.5M196 144L198 154M202 146.5L203 151.5" stroke={INK} strokeWidth="1.1" />
          <rect x="144" y="137" width="44" height="22" rx="11" fill="var(--color-paper)" stroke={TEAL_DEEP} strokeWidth="2" />
          <rect x="166" y="141" width="17" height="9" rx="4.5" fill={TEAL} fillOpacity="0.25" stroke={TEAL_DEEP} strokeWidth="1.2" />
          <circle cx="171" cy="145.5" r="1.7" fill={TEAL_DEEP} />
          <circle cx="178" cy="145.5" r="1.7" fill={TEAL_DEEP} />
          <rect x="151" y="143" width="8" height="8" rx="1" stroke={INK} strokeWidth="1.1" />
          <path d="M153 141.5v-1.5M157 141.5v-1.5M153 152.5v1.5M157 152.5v1.5M150 162h32" stroke={INK} strokeWidth="1" />
          {[154, 166, 178].map((x) => (
            <circle key={x} cx={x} cy="162" r="2.6" fill="var(--color-paper)" stroke={INK} strokeWidth="1.2" />
          ))}
        </g>
      </g>

      {/* sensor pods with sonar */}
      {PODS.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="13" stroke={TEAL} strokeWidth="1.4" className={s.ping} style={delay(3.6 + i * 1.2)} />
          <g className={d.pop} style={delay(2.6 + i * 0.25)} stroke={TEAL} strokeWidth="1.3" strokeLinecap="round">
            <path d={`M${p.x + 19} ${p.y - 8}q4 8 0 16M${p.x + 24} ${p.y - 12}q6 12 0 24M${p.x - 19} ${p.y - 8}q-4 8 0 16M${p.x - 24} ${p.y - 12}q-6 12 0 24`} />
          </g>
          <g className={d.pop} style={delay(2 + i * 0.2)}>
            <g transform={`translate(${p.x} ${p.y}) rotate(${p.tilt})`} strokeLinecap="round">
              <rect x="-14" y="-7" width="28" height="14" rx="7" fill="var(--color-paper)" stroke={TEAL_DEEP} strokeWidth="1.8" />
              <circle cx="-6" cy="0" r="3.6" stroke={TEAL_DEEP} strokeWidth="1.3" />
              <circle cx="-6" cy="0" r="1.5" fill={TEAL_DEEP} />
              <rect x="2" y="-3.5" width="7" height="7" rx="1" stroke={INK} strokeWidth="1.1" />
            </g>
          </g>
        </g>
      ))}

      {/* lab notes */}
      <g fill={INK}>
        <g className={d.pop} style={delay(3)}>
          <text x="180" y="22" fontFamily={HAND} fontSize="14">agent-01</text>
          <path d="M226 20Q238 22 244 33" fill="none" stroke={INK} strokeWidth="1.1" strokeLinecap="round" />
        </g>
        <g className={d.pop} style={delay(3.15)}>
          <text x="172" y="203" textAnchor="middle" fontFamily={HAND} fontSize="14">agent-02: digging</text>
          <path d="M172 190V168" fill="none" stroke={INK} strokeWidth="1.1" strokeLinecap="round" />
        </g>
        <g className={d.pop} style={delay(3.3)}>
          <text x="10" y="152" fontFamily={HAND} fontSize="13">root talk: decoded?</text>
          <path d="M48 140Q52 124 56 109" fill="none" stroke={INK} strokeWidth="1.1" strokeDasharray="2 2.5" strokeLinecap="round" />
        </g>
        <g className={d.pop} style={delay(3.45)}>
          <text x="12" y="229" fontFamily={MONO} fontSize="10.5">moisture 31%</text>
          <path d="M58 219Q62 212 66 203" fill="none" stroke={INK} strokeWidth="1.1" strokeLinecap="round" />
        </g>
      </g>
    </svg>
  );
}
