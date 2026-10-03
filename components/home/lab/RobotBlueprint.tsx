import type { CSSProperties } from "react";
import d from "./draw.module.css";
import s from "./RobotBlueprint.module.css";

const INK = "var(--color-ink)";
const SOFT = "var(--color-ink-soft)";
const TEAL = "var(--color-teal-deep)";
const RED = "var(--color-accent)";
const HAND = "var(--font-caveat), cursive";
const MONO = "ui-monospace, monospace";

/** Stagger a draw/pop: when it starts and (optionally) how long it takes. */
const at = (delay: string, dur?: string) =>
  ({ "--d": delay, ...(dur && { "--dur": dur }) }) as CSSProperties;

const f = (n: number) => n.toFixed(1);

/** Outline of a rounded tube from A to B — the robot's limbs. */
function capsule(ax: number, ay: number, bx: number, by: number, r: number) {
  const len = Math.hypot(bx - ax, by - ay);
  const nx = (-(by - ay) / len) * r;
  const ny = ((bx - ax) / len) * r;
  return `M${f(ax + nx)} ${f(ay + ny)}L${f(bx + nx)} ${f(by + ny)}A${r} ${r} 0 0 0 ${f(bx - nx)} ${f(by - ny)}L${f(ax - nx)} ${f(ay - ny)}A${r} ${r} 0 0 0 ${f(ax + nx)} ${f(ay + ny)}Z`;
}

/** An 8-tooth gear outline centred on (cx, cy). */
function gear(cx: number, cy: number, rIn: number, rOut: number) {
  const pt = (deg: number, r: number) => {
    const a = (deg * Math.PI) / 180;
    return `${f(cx + r * Math.cos(a))} ${f(cy + r * Math.sin(a))}`;
  };
  const teeth = Array.from({ length: 8 }, (_, i) => {
    const a = i * 45;
    return `${pt(a - 13, rIn)}L${pt(a - 8, rOut)}L${pt(a + 8, rOut)}L${pt(a + 13, rIn)}`;
  });
  return `M${teeth.join("L")}Z`;
}

const LIMBS = [
  { path: capsule(80, 112, 68, 134, 4.5), delay: "0.55s" }, // left upper arm
  { path: capsule(68, 134, 60, 152, 4), delay: "0.7s" }, // left forearm
  { path: capsule(160, 112, 170, 134, 4.5), delay: "0.55s" }, // right upper arm
  { path: capsule(170, 134, 186, 134, 4), delay: "0.7s" }, // right forearm, holding the cup
];

const JOINTS = [
  { cx: 80, cy: 111, r: 5.5 },
  { cx: 160, cy: 111, r: 5.5 },
  { cx: 68, cy: 134, r: 3.5 },
  { cx: 170, cy: 134, r: 3.5 },
];

/** Numbered callouts: label, note, and where the leader lands on the robot. */
const CALLOUTS = [
  { n: 1, y: 30, note: "brain: tiny LLM", to: [129, 53] },
  { n: 2, y: 66, note: "eyes: 2 cams", note2: "+ vibes", to: [142, 64] },
  { n: 3, y: 108, note: "battery: coffee", to: [197, 121] },
  { n: 4, y: 150, note: "servo ×12", to: [173, 137] },
  { n: 5, y: 188, note: "4WD (rug-rated)", to: [155, 181] },
];

/** Little hand-drawn arrowheads for the dimension lines (no <marker> ids). */
const ARROWS = [
  "M33 25L36 19L39 25", // height, top
  "M33 184L36 190L39 184", // height, bottom
  "M92 205L86 208L92 211", // width, left
  "M148 205L154 208L148 211", // width, right
];

export function RobotBlueprint({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 240"
      className={`sketch block h-auto w-full ${className}`}
      fill="none"
      aria-hidden
    >
      {/* construction: centre line + eye line */}
      <g className={s.fade} style={at("1.3s")} stroke={SOFT} strokeWidth="1" opacity="0.55">
        <path d="M120 8V200" strokeDasharray="8 3 1.5 3" />
        <path d="M74 68H166" strokeDasharray="3 3" />
      </g>

      {/* ── the robot, front elevation ── */}
      <g stroke={INK} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="88" y="46" width="64" height="46" rx="10" pathLength={1} className={d.draw} style={at("0s", "0.9s")} />
        <rect x="84" y="100" width="72" height="58" rx="8" pathLength={1} className={d.draw} style={at("0.2s", "0.9s")} />
        <rect x="86" y="166" width="68" height="24" rx="12" pathLength={1} className={d.draw} style={at("0.4s", "0.9s")} />
        <path d="M114 92V100M126 92V100M106 158V166M134 158V166" pathLength={1} className={d.draw} style={at("0.5s", "0.5s")} />
        <path d="M88 63H83V73H88M152 63H157V73H152" pathLength={1} className={d.draw} style={at("0.6s", "0.5s")} />
        {LIMBS.map((l) => (
          <path key={l.path} d={l.path} pathLength={1} className={d.draw} style={at(l.delay, "0.7s")} />
        ))}
        {JOINTS.map((j) => (
          <circle key={j.cx + j.cy} {...j} pathLength={1} className={d.draw} style={at("0.9s", "0.5s")} />
        ))}
        {/* left pincer */}
        <path d="M55 154c-4 5-2 10 2 11M65 154c4 5 2 10-2 11" pathLength={1} className={d.draw} style={at("1s", "0.5s")} />
        {/* antenna */}
        <path d="M120 46V28" pathLength={1} className={d.draw} style={at("0.8s", "0.4s")} />
        <circle cx="120" cy="23" r="4.5" fill={RED} fillOpacity="0.85" className={d.pop} style={at("1.1s")} />
        {/* eyes: two camera lenses that blink */}
        <g className={s.blink}>
          {[106, 134].map((x) => (
            <g key={x}>
              <circle cx={x} cy="68" r="8" pathLength={1} className={d.draw} style={at("1s", "0.6s")} />
              <circle cx={x} cy="68" r="3.2" fill={INK} stroke="none" className={d.pop} style={at("1.4s")} />
            </g>
          ))}
        </g>
        <path d="M110 81q10 6 20 0" pathLength={1} className={d.draw} style={at("1.2s", "0.4s")} />
        {/* brain chip */}
        <path d="M114 50h12v7h-12zM111 52h3M111 55h3M126 52h3M126 55h3" strokeWidth="1.4" pathLength={1} className={d.draw} style={at("1.2s", "0.5s")} />
        {/* treads */}
        {[100, 120, 140].map((x) => (
          <circle key={x} cx={x} cy="178" r="7" pathLength={1} className={d.draw} style={at("1.1s", "0.5s")} />
        ))}
        {/* coffee cup, balanced on the right hand */}
        <path d="M179 114h16l-2 16h-12zM195 118c6 0 6 9-1 9" pathLength={1} className={d.draw} style={at("1.2s", "0.7s")} />
      </g>

      {/* chest: status screen + a gear that keeps turning */}
      <g stroke={TEAL} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="96" y="108" width="48" height="16" rx="3" pathLength={1} className={d.draw} style={at("1s", "0.6s")} />
        <path d="M100 116h8l3-5 4 10 4-10 4 10 3-5h18" pathLength={1} className={d.draw} style={at("1.5s", "0.8s")} />
        <g className={s.spin}>
          <path d={gear(120, 142, 7, 10)} pathLength={1} className={d.draw} style={at("1.3s", "0.8s")} />
          <circle cx="120" cy="142" r="3" pathLength={1} className={d.draw} style={at("1.5s", "0.4s")} />
        </g>
      </g>

      {/* steam */}
      <path d="M184 110c-3-3 3-5 0-8s3-5 0-7M190 110c-3-3 3-5 0-8s3-5 0-7" stroke={SOFT} strokeWidth="1.3" strokeLinecap="round" className={d.pop} style={at("2s")} />

      {/* antenna signal — red pen */}
      <g stroke={RED} strokeWidth="1.6" strokeLinecap="round">
        {[0, 1].map((i) => (
          <g key={i} className={s.ripple} style={{ "--rd": `${3.6 + i * 0.5}s` } as CSSProperties}>
            <path
              d={i ? "M107 13a16 16 0 0 0 0 20M133 13a16 16 0 0 1 0 20" : "M112 17a9 9 0 0 0 0 12M128 17a9 9 0 0 1 0 12"}
              className={d.pop}
              style={at(`${1.6 + i * 0.2}s`)}
            />
          </g>
        ))}
      </g>

      {/* ground + hatching */}
      <g stroke={SOFT} strokeWidth="1.2" strokeLinecap="round">
        <path d="M64 194H176" pathLength={1} className={d.draw} style={at("1.4s", "0.6s")} />
        <g className={s.fade} style={at("1.8s")} opacity="0.6">
          {Array.from({ length: 13 }, (_, i) => (
            <path key={i} d={`M${72 + i * 8} 195l-5 6`} />
          ))}
        </g>
      </g>

      {/* dimensions */}
      <g stroke={SOFT} strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M31 18.5H112M31 190H82M86 198V213M154 198V213" pathLength={1} className={d.draw} style={at("1.7s", "0.6s")} />
        <path d="M36 19V190M86 208H154" pathLength={1} className={d.draw} style={at("2s", "0.7s")} />
        {ARROWS.map((a) => (
          <path key={a} d={a} className={d.pop} style={at("2.5s")} />
        ))}
        {/* Ø leader off the left eye */}
        <path d="M100 62L84 40H64" pathLength={1} className={d.draw} style={at("2.2s", "0.5s")} />
      </g>
      <g fill={SOFT} fontFamily={MONO} fontSize="10.5">
        {/* rotate on a wrapper: .pop animates the text's own transform */}
        <g transform="rotate(-90 28 104)">
          <text x="28" y="104" textAnchor="middle" className={d.pop} style={at("2.6s")}>
            42 cm
          </text>
        </g>
        <text x="120" y="224" textAnchor="middle" className={d.pop} style={at("2.6s")}>
          17 cm
        </text>
        <text x="66" y="36" className={d.pop} style={at("2.6s")}>
          Ø 4
        </text>
        <text x="8" y="234" fontSize="9.5" opacity="0.75" className={d.pop} style={at("2.8s")}>
          FRONT · 1:4
        </text>
      </g>

      {/* numbered callouts */}
      {CALLOUTS.map((c, i) => {
        const delay = `${2.6 + i * 0.18}s`;
        return (
          <g key={c.n}>
            <path
              d={`M206 ${c.y}L${c.to[0]} ${c.to[1]}`}
              stroke={TEAL}
              strokeWidth="1.1"
              opacity="0.8"
              pathLength={1}
              className={d.draw}
              style={at(delay, "0.4s")}
            />
            <g className={d.pop} style={at(delay)}>
              <circle cx={c.to[0]} cy={c.to[1]} r="1.8" fill={TEAL} />
              <circle cx="213" cy={c.y} r="7" stroke={TEAL} strokeWidth="1.4" />
              <text x="213" y={c.y + 4} textAnchor="middle" fill={TEAL} fontFamily={HAND} fontSize="13" fontWeight="700">
                {c.n}
              </text>
              <text x="224" y={c.y + 4.5} fill={INK} fontFamily={HAND} fontSize="14">
                {c.note}
              </text>
              {c.note2 && (
                <text x="232" y={c.y + 18} fill={INK} fontFamily={HAND} fontSize="14">
                  {c.note2}
                </text>
              )}
            </g>
          </g>
        );
      })}

      {/* red-pen: the important part */}
      <path d="M262 39c14-2 30-1 44 1" stroke={RED} strokeWidth="2" strokeLinecap="round" pathLength={1} className={d.draw} style={at("3.3s", "0.4s")} />
    </svg>
  );
}
