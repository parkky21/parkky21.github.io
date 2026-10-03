import type { CSSProperties } from "react";
import d from "./draw.module.css";
import s from "./BrainWiring.module.css";

/** Stagger helper: when (and optionally how long) an element inks in. */
const at = (delay: number, dur?: number) =>
  ({ "--d": `${delay}s`, ...(dur ? { "--dur": `${dur}s` } : {}) }) as CSSProperties;

const HAND = "var(--font-caveat), cursive";
const INK = "var(--color-ink)";
const PENCIL = "var(--color-ink-soft)";
const TEAL = "var(--color-teal-deep)";
const RED = "var(--color-accent-deep)";

// Cerebrum seen from the left side, frontal lobe facing left.
const CEREBRUM =
  "M64 126C52 112 48 88 58 68C62 56 72 46 84 44C92 36 102 34 110 34C118 30 126 28 134 28C168 24 206 30 232 48C252 62 262 86 260 110C259 126 254 136 244 142C232 148 214 148 200 150C186 152 174 160 158 164C140 168 118 166 104 156C96 150 94 140 98 134C90 136 84 134 78 132C72 130 68 130 64 126Z";
const CEREBELLUM = "M204 151C206 172 224 184 244 180C258 177 264 160 254 145";
const BRAINSTEM = ["M178 157C181 174 182 190 184 200", "M196 152C195 170 196 188 198 200"];

// Pencil half: sulci and gyri, then a little under-shading.
const FOLDS = [
  "M98 134C112 126 128 122 146 114C152 111 158 108 163 105", // lateral (Sylvian) fissure
  "M152 34C146 44 154 52 148 62C142 72 152 80 145 90C140 98 146 102 142 108", // precentral sulcus
  "M68 74C76 66 84 74 92 66C98 60 106 68 112 60C118 52 128 58 134 50C138 46 144 48 147 42",
  "M58 100C66 94 72 102 80 96C86 90 94 98 100 90C106 82 114 90 120 82C126 76 132 82 138 76",
  "M80 52C86 58 92 50 98 54C102 58 108 50 116 48",
  "M108 110C114 102 120 110 126 102C130 96 136 102 140 96",
  "M60 86C66 82 70 88 76 84",
  "M108 152C116 146 124 152 132 146C138 142 146 144 151 138C154 135 157 135 159 133", // superior temporal
];
const HATCH = [66, 74, 82, 90].map((x, i) => `M${x} ${125 + i * 2}l5 -8`);

// Silicon half: a tiny feed-forward net replacing the posterior cortex.
const LAYERS = [
  { x: 180, ys: [46, 76, 106, 134] },
  { x: 208, ys: [52, 80, 108, 134] },
  { x: 234, ys: [70, 98, 124] },
  { x: 250, ys: [98] },
];
// Solder pads where the new wiring meets the old tissue (on the cut line).
const PADS = [
  { x: 166, y: 46 },
  { x: 165, y: 76 },
  { x: 163, y: 106 },
  { x: 159, y: 134 },
];
// Signal routes for the travelling pulses: pad → layer by layer → output.
const PULSES = [
  "M166 46H180L208 80L234 98H250",
  "M163 106H180L208 52L234 70L250 98",
  "M159 134H180L208 108L234 124L250 98",
];
// Hidden nodes that flash on their own rhythm ([layer, index, delay]).
const FIRING: [number, number, number][] = [
  [1, 0, 4.6],
  [0, 2, 5.5],
  [2, 2, 6.4],
  [1, 2, 7.3],
];

const label = { fontFamily: HAND, fontSize: 13 } as const;

export function BrainWiring({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 240" className={`sketch block h-auto w-full ${className}`} fill="none" aria-hidden>
      {/* --- anatomy (pencil) --- */}
      <path d={CEREBRUM} pathLength={1} className={d.draw} style={at(0, 1.5)} stroke={INK} strokeWidth="2.3" strokeLinejoin="round" />
      <path d={CEREBELLUM} pathLength={1} className={d.draw} style={at(0.7, 0.8)} stroke={INK} strokeWidth="2.1" strokeLinecap="round" />
      {BRAINSTEM.map((p, i) => (
        <path key={p} d={p} pathLength={1} className={d.draw} style={at(0.9 + i * 0.15, 0.6)} stroke={INK} strokeWidth="2" strokeLinecap="round" />
      ))}
      {FOLDS.map((p, i) => (
        <path key={p} d={p} pathLength={1} className={d.draw} style={at(1 + i * 0.12, 0.7)} stroke={PENCIL} strokeWidth="1.5" strokeLinecap="round" />
      ))}
      {HATCH.map((p, i) => (
        <path key={p} d={p} pathLength={1} className={d.draw} style={at(1.6 + i * 0.05, 0.3)} stroke={PENCIL} strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
      ))}
      {/* hippocampus, tucked away medially — so dotted */}
      <g className={d.pop} style={at(1.8)}>
        <path d="M120 138C122 129 133 126 138 131C142 135 138 141 132 139" stroke={PENCIL} strokeWidth="1.5" strokeDasharray="2 2.5" strokeLinecap="round" />
      </g>

      {/* --- the cut line: biology on the left, silicon from here on --- */}
      <g className={d.pop} style={at(1.5)}>
        <path d="M168 20C162 60 168 100 161 128C158 142 158 156 156 172" stroke={RED} strokeWidth="1.4" strokeDasharray="5 4" strokeLinecap="round" />
      </g>

      {/* --- circuit (teal) --- */}
      <path d="M210 158C224 166 242 165 254 156M213 167C227 175 243 173 252 166M222 175C232 179 242 178 248 174" pathLength={1} className={d.draw} style={at(2, 0.7)} stroke={TEAL} strokeWidth="1.4" strokeLinecap="round" />
      <path d="M185 160C186 175 187 188 188 200M190 156C190 172 191 188 192 200" pathLength={1} className={d.draw} style={at(2.2, 0.6)} stroke={TEAL} strokeWidth="1.3" strokeLinecap="round" />
      <g className={d.pop} style={at(2.6)}>
        <rect x="179" y="200" width="24" height="11" rx="2" stroke={INK} strokeWidth="1.8" fill="var(--color-note-blue)" />
        <path d="M186 211v7M196 211v7" stroke={INK} strokeWidth="2" strokeLinecap="round" />
      </g>
      {PADS.map((p, i) => (
        <path key={p.y} d={`M${p.x} ${p.y}H180`} pathLength={1} className={d.draw} style={at(1.6 + i * 0.1, 0.4)} stroke={TEAL} strokeWidth="1.6" />
      ))}
      {LAYERS.slice(0, -1).map((layer, li) =>
        layer.ys.flatMap((y1, ni) =>
          LAYERS[li + 1].ys.map((y2) => (
            <line
              key={`${li}-${y1}-${y2}`}
              x1={layer.x}
              y1={y1}
              x2={LAYERS[li + 1].x}
              y2={y2}
              pathLength={1}
              className={d.draw}
              style={at(1.8 + li * 0.5 + ni * 0.1, 0.45)}
              stroke={TEAL}
              strokeWidth="1.1"
              opacity="0.6"
            />
          )),
        ),
      )}
      {PADS.map((p, i) => (
        <rect key={p.y} x={p.x - 2.5} y={p.y - 2.5} width="5" height="5" className={d.pop} style={at(1.6 + i * 0.1)} fill={TEAL} />
      ))}
      {LAYERS.map((layer, li) =>
        layer.ys.map((y, ni) => {
          const out = li === LAYERS.length - 1;
          return (
            <circle
              key={`${li}-${y}`}
              cx={layer.x}
              cy={y}
              r={out ? 5.5 : 4}
              className={d.pop}
              style={at(1.7 + li * 0.5 + ni * 0.1)}
              stroke={out ? RED : TEAL}
              strokeWidth="1.7"
              fill={out ? "var(--color-accent)" : li === 1 ? "var(--color-note-blue)" : "var(--color-paper)"}
              fillOpacity={out ? 0.45 : 1}
            />
          );
        }),
      )}

      {/* --- living loops: pulses down the wires, nodes firing --- */}
      {PULSES.map((p, i) => (
        <path key={p} d={p} pathLength={1} className={s.pulse} style={{ animationDelay: `${4.2 + i * 1.2}s` }} stroke="var(--color-accent)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      ))}
      {FIRING.map(([li, ni, delay]) => (
        <circle key={`${li}-${ni}`} cx={LAYERS[li].x} cy={LAYERS[li].ys[ni]} r="4" className={s.fire} style={{ animationDelay: `${delay}s` }} fill="var(--color-accent)" />
      ))}
      <circle cx="250" cy="98" r="5.5" className={`${s.fire} ${s.output}`} fill="var(--color-accent)" />

      {/* --- soldering iron, still at work on the top pad --- */}
      <g className={d.pop} style={at(2.9)}>
        <g transform="translate(167 45) rotate(-37)">
          <path d="M0 0L10 -2.5V2.5Z" fill={INK} stroke={INK} strokeWidth="1.2" strokeLinejoin="round" />
          <rect x="10" y="-1.8" width="13" height="3.6" stroke={INK} strokeWidth="1.3" fill="var(--color-paper)" />
          <rect x="23" y="-3.5" width="4" height="7" stroke={INK} strokeWidth="1.4" fill="var(--color-kraft)" />
          <rect x="27" y="-5" width="32" height="10" rx="4" stroke={INK} strokeWidth="1.8" fill="var(--color-note-orange)" />
          <path d="M34 -5v10M39 -5v10M44 -5v10" stroke={INK} strokeWidth="1.1" opacity="0.6" />
        </g>
        <path d="M214 10C228 2 236 18 250 12C262 7 270 1 284 8" stroke={PENCIL} strokeWidth="1.5" strokeLinecap="round" />
      </g>
      <g className={d.pop} style={at(3.2)}>
        <g className={s.spark}>
          <path d="M160 41l-4 -3M159 47h-5M161 52l-3 4M166 54v4" stroke="var(--color-accent)" strokeWidth="1.6" strokeLinecap="round" />
        </g>
      </g>

      {/* --- notebook annotations --- */}
      <path d="M24 25C26 40 44 54 70 62M70 62l-8 0.5M70 62l-5 -6" pathLength={1} className={d.draw} style={at(3.3, 0.5)} stroke={PENCIL} strokeWidth="1.3" strokeLinecap="round" />
      <g className={d.pop} style={at(3.5)}>
        <text x="8" y="19" {...label} fill={PENCIL}>cortex</text>
        <path d="M43 14.5h12M51 11.5l4 3l-4 3" stroke={PENCIL} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        <text x="59" y="19" {...label} fill={TEAL} fontWeight="700">transformer?</text>
      </g>
      <path d="M68 195C82 174 100 152 118 141M118 141l-8 1M118 141l-3 7" pathLength={1} className={d.draw} style={at(3.5, 0.5)} stroke={PENCIL} strokeWidth="1.3" strokeLinecap="round" />
      <g className={d.pop} style={at(3.7)}>
        <text x="8" y="208" {...label} fill={PENCIL}>
          hippocampus = memory <tspan fill={RED} fontWeight="700">(todo)</tspan>
        </text>
      </g>
      <path d="M292 198C304 170 296 126 266 106M266 106l3 8M266 106l8 1" pathLength={1} className={d.draw} style={at(3.7, 0.5)} stroke={RED} strokeWidth="1.3" strokeLinecap="round" />
      <g className={d.pop} style={at(3.9)}>
        <text x="214" y="216" {...label} fontSize="14" fontWeight="700" fill={RED}>+86B neurons to go</text>
      </g>
    </svg>
  );
}
