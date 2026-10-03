import type { CSSProperties } from "react";
import d from "./draw.module.css";
import s from "./TransformerRedesign.module.css";

const INK = "var(--color-ink)";
const SOFT = "var(--color-ink-soft)";
const TEAL = "var(--color-teal-deep)";
const PEN = "var(--color-accent-deep)";
const HAND = "var(--font-caveat), cursive";

/** Stagger helper: `--d` is read by the shared draw/pop classes. */
const at = (delay: number, dur?: number) =>
  ({ "--d": `${delay}s`, ...(dur ? { "--dur": `${dur}s` } : {}) }) as CSSProperties;

/* The stack's spine: everything is centred on this x. */
const CX = 90;

/* The classic encoder block, listed bottom → top in the order it draws in. */
const BLOCKS = [
  { y: 202, h: 18, lines: ["Input Embedding"], fill: "var(--color-paper)", t: 0.15 },
  { y: 130, h: 28, lines: ["Multi-Head", "Attention"], fill: "var(--color-note-blue)", t: 0.85 },
  { y: 100, h: 16, lines: ["Add & Norm"], fill: "var(--color-note-yellow)", t: 1.25 },
  { y: 64, h: 20, lines: ["Feed Forward"], fill: "var(--color-note-pink)", t: 1.5 },
  { y: 32, h: 16, lines: ["Add & Norm"], fill: "var(--color-note-yellow)", t: 1.8 },
];

/* Main data path segments (gaps between blocks), each with an up-arrowhead. */
const SPINE = [
  { y1: 236, y2: 220, t: 0 },
  { y1: 202, y2: 192, t: 0.5 },
  { y1: 130, y2: 116, t: 1.15 },
  { y1: 100, y2: 84, t: 1.4 },
  { y1: 64, y2: 48, t: 1.7 },
  { y1: 32, y2: 8, t: 2.0 },
];

/* A hand-picked attention map: mostly diagonal, a few long-range hops. */
const ATTN = [
  [0.9, 0.15, 0.1, 0.05, 0.2],
  [0.35, 0.8, 0.1, 0.15, 0.05],
  [0.1, 0.45, 0.7, 0.2, 0.1],
  [0.2, 0.1, 0.3, 0.85, 0.15],
  [0.6, 0.1, 0.15, 0.35, 0.75],
];
const HM = { x: 172, y: 126, cell: 8 };

const upHead = (x: number, y: number) => `M${x - 3} ${y + 4.5}L${x} ${y}L${x + 3} ${y + 4.5}`;
const rightHead = (x: number, y: number) => `M${x - 4.5} ${y - 3}L${x} ${y}L${x - 4.5} ${y + 3}`;

/**
 * "Transformer, redesigned": the Attention-Is-All-You-Need encoder block,
 * inked bottom → top the way data flows, then marked up in red pen —
 * N× swapped for ∞?, a world model wedged into the stack, and the
 * quadratic attention circled with an exasperated ?!.
 */
export function TransformerRedesign({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 240"
      className={`sketch block h-auto w-full ${className}`}
      fill="none"
      aria-hidden
    >
      <g stroke={INK} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        {/* the N× block outline, drawn slowly around the stack */}
        <rect x="30" y="22" width="120" height="154" rx="9" stroke={SOFT} strokeWidth="1.3" pathLength={1} className={d.draw} style={at(0.3, 1.9)} />

        {SPINE.map(({ y1, y2, t }) => (
          <g key={y1}>
            <line x1={CX} y1={y1} x2={CX} y2={y2} pathLength={1} className={d.draw} style={at(t, 0.3)} />
            <path d={upHead(CX, y2)} pathLength={1} className={d.draw} style={at(t + 0.25, 0.15)} />
          </g>
        ))}

        {/* ⊕ positional encoding, fed by a little sine wave */}
        <circle cx={CX} cy="186" r="6" pathLength={1} className={d.draw} style={at(0.55, 0.3)} />
        <path d="M84 186h12M90 180v12" strokeWidth="1.3" pathLength={1} className={d.draw} style={at(0.75, 0.2)} />
        <path d="M54 186c3-7 6-7 8 0s5 7 8 0 5-7 8 0" stroke={TEAL} pathLength={1} className={d.draw} style={at(0.6, 0.4)} />
        <path d="M79 186h4" pathLength={1} className={d.draw} style={at(0.85, 0.1)} />

        {/* Q, K, V prongs into attention */}
        <path d={`M${CX} 180V170M${CX} 170L66 158M${CX} 170V158M${CX} 170L114 158`} pathLength={1} className={d.draw} style={at(0.75, 0.35)} />

        {/* residual skips around each sub-layer */}
        <path d="M90 170H38V108H44" stroke={SOFT} pathLength={1} className={d.draw} style={at(0.9, 0.7)} />
        <path d={rightHead(44, 108)} stroke={SOFT} pathLength={1} className={d.draw} style={at(1.55, 0.15)} />
        <path d="M90 92H38V40H44" stroke={SOFT} pathLength={1} className={d.draw} style={at(1.4, 0.7)} />
        <path d={rightHead(44, 40)} stroke={SOFT} pathLength={1} className={d.draw} style={at(2.05, 0.15)} />
      </g>

      {/* a token riding the residual stream; it slips behind each box */}
      <circle cx={CX} cy="234" r="2.8" fill={TEAL} className={s.token} />

      {BLOCKS.map(({ y, h, lines, fill, t }) => (
        <g key={y}>
          <rect x="44" y={y} width="92" height={h} rx="3" fill={fill} stroke={INK} strokeWidth="1.6" pathLength={1} className={d.draw} style={at(t, 0.45)} />
          <text
            x={CX}
            y={y + h / 2 - ((lines.length - 1) * 11) / 2 + 4}
            textAnchor="middle"
            fontFamily={HAND}
            fontSize="13"
            fontWeight="700"
            fill={INK}
            className={d.pop}
            style={at(t + 0.35)}
          >
            {lines.map((line, i) => (
              <tspan key={line} x={CX} dy={i ? 11 : 0}>
                {line}
              </tspan>
            ))}
          </text>
        </g>
      ))}

      {/* N× — the original repeat count, about to be vetoed */}
      <text x="158" y="44" fontFamily={HAND} fontSize="17" fontWeight="700" fill={INK} className={d.pop} style={at(1.9)}>
        N×
      </text>

      {/* attention heatmap, sketched beside the attention box in teal pencil */}
      <g className={d.pop} style={at(2.1)}>
        <path d="M146 144h22" stroke={TEAL} strokeWidth="1.2" strokeDasharray="2 3" />
        {ATTN.flatMap((row, r) =>
          row.map((w, c) => (
            <rect
              key={`${r}-${c}`}
              x={HM.x + c * HM.cell}
              y={HM.y + r * HM.cell}
              width={HM.cell - 1}
              height={HM.cell - 1}
              fill={TEAL}
              fillOpacity={w}
              className={s.cell}
              style={{ "--sd": `${(r + c) * 0.22}s` } as CSSProperties}
            />
          )),
        )}
        <rect x={HM.x - 2} y={HM.y - 2} width={HM.cell * 5 + 3} height={HM.cell * 5 + 3} stroke={SOFT} strokeWidth="1.2" />
        <text x={HM.x + 19} y={HM.y + 54} textAnchor="middle" fontFamily={HAND} fontSize="12" fontWeight="600" fill={TEAL}>
          attn
        </text>
      </g>

      {/* ——— red-pen revisions ——— */}
      <g stroke={PEN} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {/* strike N×, write ∞? */}
        <path d="M155 38c9-3 18-4 28-5" pathLength={1} className={d.draw} style={at(2.3, 0.35)} />
        <path d="M184 37h8m-3-3 3 3-3 3" strokeWidth="1.6" pathLength={1} className={d.draw} style={at(2.55, 0.2)} />
        <path d="M207 36c-5-8-12-8-12 0s7 8 12 0 12-8 12 0-7 8-12 0" strokeWidth="2.2" pathLength={1} className={d.draw} style={at(2.6, 0.5)} />

        {/* circle the quadratic attention */}
        <path d="M86 125c30-3 58 6 57 20s-34 22-64 18-46-10-44-22 22-17 55-16" strokeWidth="1.8" pathLength={1} className={d.draw} style={at(2.75, 0.55)} />

        {/* wedge a world model into the stack */}
        <rect x="190" y="80" width="78" height="24" rx="4" fill="var(--color-note-yellow)" pathLength={1} className={d.draw} style={at(3.0, 0.45)} />
        <path d="M188 94c-26 7-56 6-85-1" strokeWidth="1.8" pathLength={1} className={d.draw} style={at(3.2, 0.4)} />
        <path d="M108 88l-6 5 7 4" strokeWidth="1.8" pathLength={1} className={d.draw} style={at(3.55, 0.15)} />
      </g>

      <g fontFamily={HAND} fontWeight="700" fill={PEN}>
        <text x="221" y="43" fontSize="20" className={d.pop} style={at(3.0)}>
          ?
        </text>
        <text x="229" y="96" textAnchor="middle" fontSize="14" className={d.pop} style={at(3.35)}>
          world model
        </text>
        <g transform="rotate(-5 196 72)">
          <text x="196" y="72" fontSize="15" className={d.pop} style={at(3.6)}>
            what if?
          </text>
        </g>
        <text x="222" y="146" fontSize="15" className={d.pop} style={at(3.2)}>
          O(n²)
        </text>
        <g className={s.wiggle}>
          <text x="244" y="168" fontSize="22" className={d.pop} style={at(3.35)}>
            ?!
          </text>
        </g>
        {/* pop owns `transform`, so rotations live on wrapper groups */}
        <g transform="rotate(-4 304 214)">
          <text x="304" y="214" textAnchor="end" fontSize="14" fontWeight="600" className={d.pop} style={at(3.8)}>
            (+ way more GPUs)
          </text>
        </g>
      </g>
    </svg>
  );
}
