import type { CSSProperties, ReactNode } from "react";
import s from "./HousePlate.module.css";

/**
 * House plates: one hand-authored engraving per project, on a 400 × 300 (4:3) field.
 * Each one is a small diagram of what the project does. Server-safe: no state, CSS-only motion.
 */

const f = (n: number) => +n.toFixed(2);

/** An open arc, angles in degrees (0 = east, 90 = south), drawn clockwise from a0 to a1. */
function arc(cx: number, cy: number, r: number, a0: number, a1: number) {
  const t0 = (a0 * Math.PI) / 180;
  const t1 = (a1 * Math.PI) / 180;
  const large = a1 - a0 > 180 ? 1 : 0;
  return `M${f(cx + r * Math.cos(t0))} ${f(cy + r * Math.sin(t0))}A${r} ${r} 0 ${large} 1 ${f(cx + r * Math.cos(t1))} ${f(cy + r * Math.sin(t1))}`;
}

const i = (n: number) => ({ "--i": n }) as CSSProperties;
const cx = (...names: (string | false | undefined)[]) => names.filter(Boolean).join(" ");

/** Engraver's ground: three hairlines that shorten, like a cast shadow. */
function Ground({ y, x0, x1 }: { y: number; x0: number; x1: number }) {
  const w = x1 - x0;
  return (
    <g className={s.faint}>
      <path d={`M${x0} ${y}H${x1}`} />
      <path d={`M${x0 + w * 0.14} ${y + 5}H${x1 - w * 0.14}`} />
      <path d={`M${x0 + w * 0.3} ${y + 10}H${x1 - w * 0.3}`} />
    </g>
  );
}

/** A small arrowhead pointing along +x at (x, y), or rotated by deg. */
function Head({ x, y, deg = 0, className }: { x: number; y: number; deg?: number; className?: string }) {
  return <path className={className} d={`M${x - 5} ${y - 4}L${x} ${y}L${x - 5} ${y + 4}`} transform={deg ? `rotate(${deg} ${x} ${y})` : undefined} />;
}

/* ------------------------------------------------------------------ I · OpenBee */

function OpenBee() {
  const bars = [8, 18, 30, 40, 26, 34, 16, 8];
  return (
    <>
      {/* laptop */}
      <rect x="60" y="40" width="280" height="180" rx="8" />
      <rect className={s.dim} x="72" y="52" width="256" height="156" rx="3" />
      <circle className={s.fill} cx="200" cy="46" r="1.2" />
      <path d="M60 220H340L374 232Q376 238 368 238H32Q24 238 26 232Z" />
      <path className={s.dim} d="M178 220Q180 225 186 225H214Q220 225 222 220" />
      <Ground y={248} x0={50} x1={350} />

      {/* no network */}
      <g className={s.dim}>
        <path d={arc(304, 92, 7, 225, 315)} />
        <path d={arc(304, 92, 13, 225, 315)} />
        <path d={arc(304, 92, 19, 225, 315)} />
      </g>
      <circle className={s.fill} cx="304" cy="90" r="1.6" />
      <path className={cx(s.red, s.bold)} d="M290 70L318 96" />

      {/* ear: Whisper */}
      <g className={s.dim}>
        <path className={cx(s.anim, s.wave)} style={i(2)} d={arc(124, 128, 30, 160, 200)} />
        <path className={cx(s.anim, s.wave)} style={i(1)} d={arc(124, 128, 24, 162, 198)} />
      </g>
      <path d="M112 122C112 104 138 102 138 122C138 134 128 136 127 146C126 156 114 158 112 150" />
      <path d="M119 122C119 112 131 112 131 122C131 128 125 129 124 135" />

      <path className={s.flow} d="M148 128H170" />
      <Head x={172} y={128} />

      {/* spark: Gemma */}
      <path className={cx(s.anim, s.twinkle, s.pale)} d="M200 106Q202 126 222 128Q202 130 200 150Q198 130 178 128Q198 126 200 106Z" />
      <path className={s.dim} d="M220 100Q220.5 105.5 226 106Q220.5 106.5 220 112Q219.5 106.5 214 106Q219.5 105.5 220 100Z" />

      <path className={s.flow} d="M230 128H252" />
      <Head x={254} y={128} />

      {/* voice: Kokoro */}
      {bars.map((h, n) => (
        <path key={n} className={cx(s.anim, s.bar)} style={i(n)} d={`M${264 + n * 6} ${128 - h / 2}V${128 + h / 2}`} />
      ))}

      <g className={s.dim}>
        <text className={s.txt} x="125" y="182" textAnchor="middle">EAR</text>
        <text className={s.txt} x="200" y="182" textAnchor="middle">MIND</text>
        <text className={s.txt} x="285" y="182" textAnchor="middle">VOICE</text>
      </g>
    </>
  );
}

/* ------------------------------------------------------------------ II · Alice */

function Alice() {
  const rays = [0.12, 0.3, 0.5, 0.7, 0.88];
  return (
    <>
      {/* wall and mount */}
      <path d="M26 32H118" />
      <g className={s.faint}>
        {Array.from({ length: 12 }, (_, n) => (
          <path key={n} d={`M${30 + n * 8} 32L${36 + n * 8} 25`} />
        ))}
      </g>
      <path d="M70 32V48" />

      {/* camera eye */}
      <circle cx="70" cy="64" r="16" />
      <path className={s.dim} d="M57 64Q70 53 83 64Q70 75 57 64Z" />
      <circle cx="70" cy="64" r="5" />
      <circle className={s.fill} cx="70" cy="64" r="1.8" />

      {/* scan cone */}
      <g className={cx(s.anim, s.sweep)} style={{ transformBox: "view-box", transformOrigin: "82px 76px" }}>
        <path className={s.dim} d="M82 76L262 196M82 76L214 252" />
        <g className={s.faint}>
          {rays.map((t) => (
            <path key={t} d={`M86 80L${f(262 + (214 - 262) * t)} ${f(196 + (252 - 196) * t)}`} />
          ))}
        </g>
      </g>

      {/* the house plan */}
      <rect x="120" y="120" width="150" height="130" />
      <rect className={s.dim} x="123.5" y="123.5" width="143" height="123" />
      <path d="M200 120V168M200 194V250M120 186H174" />
      <g className={s.dim}>
        <path d="M174 186V212" />
        <path d="M174 212A26 26 0 0 0 200 186" />
        <rect x="132" y="132" width="28" height="40" rx="2" />
        <rect x="136" y="135" width="20" height="8" rx="1.5" />
        <circle cx="238" cy="148" r="9" />
        <rect x="224" y="144" width="5" height="8" rx="1" />
        <rect x="247" y="144" width="5" height="8" rx="1" />
        <path d="M130 238V212H140M130 238H160" />
        <path d="M222 120V117M252 120V117M222 118.5H252" />
      </g>

      {/* the trouble */}
      <circle className={s.redFill} cx="232" cy="222" r="3" />
      <circle className={cx(s.red, s.anim, s.pulse)} cx="232" cy="222" r="6" />
      <path className={s.red} d="M220 214V210H224M240 210H244V214M244 230V234H240M224 234H220V230" />

      {/* to the phone */}
      <path className={s.flow} d="M276 196C294 196 294 160 306 160" />
      <Head x={309} y={160} />

      <g className={cx(s.anim, s.ring)}>
        <rect x="314" y="118" width="48" height="84" rx="7" />
        <rect className={s.dim} x="319" y="128" width="38" height="62" rx="2" />
        <path className={s.dim} d="M333 123H343" />
        <path className={s.red} d="M338 148L346 162H330Z" />
        <path className={s.red} d="M338 153V157" />
        <circle className={s.dim} cx="338" cy="178" r="5" />
      </g>
      <g className={s.dim}>
        <path className={cx(s.anim, s.wave)} style={i(0)} d={arc(338, 160, 34, 300, 340)} />
        <path className={cx(s.anim, s.wave)} style={i(1)} d={arc(338, 160, 42, 298, 342)} />
      </g>
    </>
  );
}

/* ------------------------------------------------------------------ III · Marathi SLM */

function MarathiSLM() {
  const tokens = ["एका", "गावा", "त", "एक"];
  return (
    <g transform="translate(200 148) scale(1.1) translate(-200 -148)">
      {/* six layers, bottom to top */}
      {Array.from({ length: 6 }, (_, n) => {
        const y = 204 - n * 24;
        return (
          <g key={n}>
            <rect className={s.lit} style={i(n)} x="128" y={y} width="144" height="14" rx="2" />
            <g className={s.dim}>
              {Array.from({ length: 8 }, (_, k) => (
                <circle key={k} className={s.fill} cx={f(140 + k * 17.14)} cy={y + 7} r="1.5" />
              ))}
            </g>
            {n < 5 ? (
              <path className={s.faint} d={`M164 ${y}V${y - 10}M200 ${y}V${y - 10}M236 ${y}V${y - 10}`} />
            ) : null}
          </g>
        );
      })}

      {/* the count */}
      <path className={s.dim} d="M284 84H290V218H284" />
      <text className={cx(s.txt, s.txtLg)} x="298" y="154">23.3M</text>
      <text className={cx(s.txt, s.dim)} x="298" y="167">PARAMS</text>
      <g className={s.faint}>
        {Array.from({ length: 6 }, (_, n) => (
          <text key={n} className={s.txt} x="116" y={213 - n * 24} textAnchor="end">
            {n + 1}
          </text>
        ))}
      </g>

      {/* tokens in */}
      {tokens.map((t, n) => {
        const x = 140 + n * 40;
        return (
          <g key={t} className={cx(s.anim, s.rise)} style={i(n)}>
            <rect className={s.dim} x={x - 16} y="242" width="32" height="24" rx="2" />
            <text className={s.deva} x={x} y="259" textAnchor="middle">
              {t}
            </text>
            <path className={s.flow} d={`M${x} 240V222`} />
          </g>
        );
      })}

      {/* the next token out */}
      <path className={s.flow} d="M200 80V60" />
      <Head x={200} y={58} deg={-90} />
      <rect className={s.red} x="176" y="28" width="48" height="26" rx="2" />
      <text className={cx(s.deva, s.blink)} x="200" y="46" textAnchor="middle">
        राजा
      </text>
    </g>
  );
}

/* ------------------------------------------------------------------ IV · LocalMind */

function Page({ dx = 0, dy = 0, lines = true, className }: { dx?: number; dy?: number; lines?: boolean; className?: string }) {
  return (
    <g className={className} transform={dx || dy ? `translate(${dx} ${dy})` : undefined}>
      <path d="M92 150H132L144 162V218H92Z" />
      <path d="M132 150V162H144" />
      {lines ? (
        <g className={s.dim}>
          <path d="M100 172H136M100 180H136M100 188H128M100 196H136M100 204H118" />
        </g>
      ) : null}
    </g>
  );
}

function LocalMind() {
  return (
    <>
      {/* the house */}
      <path d="M40 128L200 44L360 128" />
      <path className={s.dim} d="M62 128L200 56L338 128" />
      <path d="M64 118V252H336V118" />
      <path d="M282 89V62H302V100" />
      <g className={s.faint}>
        {Array.from({ length: 7 }, (_, n) => (
          <path key={n} d={`M${84 + n * 10} ${f(128 - (n + 2) * 5.6)}L${88 + n * 10} ${f(128 - (n + 2) * 5.6 + 6)}`} />
        ))}
      </g>
      <Ground y={252} x0={28} x1={372} />

      {/* the lock */}
      <path className={cx(s.anim, s.shut)} d="M193 94V87A7 7 0 0 1 207 87V94" />
      <rect x="187" y="93" width="26" height="21" rx="3" />
      <circle className={s.redFill} cx="200" cy="101.5" r="2.4" />
      <path className={s.red} d="M200 103V108.5" />

      {/* documents */}
      <Page dx={-12} dy={-10} lines={false} className={s.faint} />
      <Page dx={-6} dy={-5} lines={false} className={s.dim} />
      <Page />

      {/* into the chat */}
      <path className={s.flow} d="M154 182H220" />
      <Head x={223} y={182} />

      <path d="M240 152H320Q328 152 328 160V200Q328 208 320 208H266L252 222V208H240Q232 208 232 200V160Q232 152 240 152Z" />
      <path className={s.dim} d="M244 168H314M244 178H302" />
      {[0, 1, 2].map((n) => (
        <circle key={n} className={cx(s.fill, s.dot)} style={i(n)} cx={248 + n * 10} cy="193" r="2" />
      ))}
    </>
  );
}

/* ------------------------------------------------------------------ V · MemorySearch */

/** Little engraved pictures for the frames, drawn in a 60 × 46 cell at (x, y). */
const SCENES: ((x: number, y: number) => ReactNode)[] = [
  (x, y) => (
    <>
      <path d={`M${x + 6} ${y + 38}L${x + 20} ${y + 18}L${x + 30} ${y + 30}L${x + 40} ${y + 14}L${x + 54} ${y + 38}`} />
      <circle cx={x + 47} cy={y + 11} r="4" />
    </>
  ),
  (x, y) => (
    <>
      <path d={arc(x + 30, y + 26, 9, 180, 360)} />
      <path d={`M${x + 8} ${y + 26}H${x + 52}M${x + 14} ${y + 32}H${x + 46}M${x + 22} ${y + 38}H${x + 38}`} />
    </>
  ),
  (x, y) => (
    <>
      <circle cx={x + 30} cy={y + 18} r="10" />
      <path d={`M${x + 30} ${y + 28}V${y + 40}M${x + 16} ${y + 40}H${x + 44}`} />
    </>
  ),
  (x, y) => (
    <>
      <circle cx={x + 30} cy={y + 15} r="5" />
      <path d={`M${x + 18} ${y + 40}Q${x + 18} ${y + 23} ${x + 30} ${y + 23}Q${x + 42} ${y + 23} ${x + 42} ${y + 40}`} />
    </>
  ),
  (x, y) => (
    <>
      <path d={`M${x + 14} ${y + 40}V${y + 22}L${x + 30} ${y + 10}L${x + 46} ${y + 22}V${y + 40}Z`} />
      <path d={`M${x + 26} ${y + 40}V${y + 30}H${x + 34}V${y + 40}`} />
    </>
  ),
  (x, y) => (
    <>
      <path d={`M${x + 12} ${y + 30}H${x + 48}L${x + 42} ${y + 37}H${x + 18}Z`} />
      <path d={`M${x + 30} ${y + 30}V${y + 9}L${x + 44} ${y + 26}H${x + 30}`} />
    </>
  ),
  (x, y) => (
    <>
      <path d={`M${x + 36} ${y + 10}A12 12 0 1 0 ${x + 44} ${y + 30}A10 10 0 0 1 ${x + 36} ${y + 10}Z`} />
      <circle className={s.fill} cx={x + 14} cy={y + 12} r="1" />
      <circle className={s.fill} cx={x + 20} cy={y + 30} r="1" />
    </>
  ),
  () => null, // the highlighted one is drawn separately
  (x, y) => (
    <>
      <path d={`M${x + 30} ${y + 40}V${y + 22}`} />
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <path key={a} d={`M${x + 30} ${y + 18}L${f(x + 30 + 11 * Math.cos(((a - 90) * Math.PI) / 180))} ${f(y + 18 + 11 * Math.sin(((a - 90) * Math.PI) / 180))}`} />
      ))}
    </>
  ),
  (x, y) => (
    <>
      <path d={`M${x + 10} ${y + 40}V${y + 22}A8 8 0 0 1 ${x + 26} ${y + 22}V${y + 40}`} />
      <path d={`M${x + 34} ${y + 40}V${y + 22}A8 8 0 0 1 ${x + 50} ${y + 22}V${y + 40}`} />
      <path d={`M${x + 6} ${y + 40}H${x + 54}`} />
    </>
  ),
  (x, y) => <path d={`M${x + 8} ${y + 40}L${x + 28} ${y + 12}M${x + 52} ${y + 40}L${x + 32} ${y + 12}M${x + 30} ${y + 36}V${y + 32}M${x + 30} ${y + 26}V${y + 22}`} />,
  (x, y) => (
    <path
      d={`M${x + 12} ${y + 20}Q${x + 16} ${y + 16} ${x + 20} ${y + 20}Q${x + 24} ${y + 16} ${x + 28} ${y + 20}M${x + 32} ${y + 30}Q${x + 36} ${y + 26} ${x + 40} ${y + 30}Q${x + 44} ${y + 26} ${x + 48} ${y + 30}`}
    />
  ),
];

function MemorySearch() {
  const gx = 46;
  const hx = gx + 3 * 72;
  const hy = 144;
  return (
    <>
      {/* the query */}
      <rect x="40" y="24" width="140" height="28" rx="14" />
      <circle cx="58" cy="37" r="5" />
      <path d="M61.5 40.5L66 45" />
      <text className={cx(s.txt, s.txtLg)} x="76" y="42">
        “rain”
      </text>
      <path className={cx(s.pale, s.blink)} d="M134 31V44" />

      {/* the frames */}
      {SCENES.map((scene, n) => {
        const x = gx + (n % 4) * 72;
        const y = 86 + Math.floor(n / 4) * 58;
        if (n === 7) return null;
        return (
          <g key={n} className={s.dim}>
            <rect x={x} y={y} width="60" height="46" />
            <g className={s.dim}>{scene(x, y)}</g>
          </g>
        );
      })}

      {/* the match */}
      <rect className={s.pale} x={hx} y={hy} width="60" height="46" />
      <rect className={s.dim} x={hx - 4} y={hy - 4} width="68" height="54" />
      <path
        className={s.red}
        d={`M${hx - 8} ${hy + 4}V${hy - 8}H${hx + 4}M${hx + 56} ${hy - 8}H${hx + 68}V${hy + 4}M${hx + 68} ${hy + 42}V${hy + 54}H${hx + 56}M${hx + 4} ${hy + 54}H${hx - 8}V${hy + 42}`}
      />
      <path d={`M${hx + 18} ${hy + 20}A7 7 0 0 1 ${hx + 26} ${hy + 10}A10 10 0 0 1 ${hx + 44} ${hy + 12}A6 6 0 0 1 ${hx + 44} ${hy + 22}H${hx + 18}A1 1 0 0 1 ${hx + 18} ${hy + 20}Z`} />
      <g className={s.pale}>
        {[0, 1, 2, 3, 4].map((n) => (
          <path key={n} className={s.rain} style={{ animationDelay: `${n * -0.17}s` }} d={`M${hx + 20 + n * 6} ${hy + 26}L${hx + 16 + n * 6} ${hy + 42}`} />
        ))}
      </g>

      {/* the pointer */}
      <path className={s.flow} d="M184 38H340Q366 38 366 64V151Q366 167 352 167" />
      <Head x={348} y={167} deg={180} />
    </>
  );
}

/* ------------------------------------------------------------------ VI · Draupadi */

function Draupadi() {
  const calm = [0, -4, 3, -2, 2, -5, 5, -3, 1, -6, 6, -2, 3, -4, 2];
  const quiet = calm.map((d, n) => `${n ? "L" : "M"}${28 + n * 6} ${160 + d}`).join("");
  return (
    <>
      <path className={s.faint} d="M24 160H208" />
      <path className={s.dim} d={quiet} />
      <path className={cx(s.red, s.bold)} d="M112 160L118 142L124 194L130 66L136 234L142 104L148 188L154 140L160 172L166 152L172 164L178 157L184 161L190 160" />
      <text className={cx(s.txt, s.txtMd, s.txtRed)} x="130" y="54" textAnchor="middle">
        “HELP”
      </text>

      <path className={s.flow} d="M198 170C220 170 238 166 258 160" />
      <Head x={262} y={159} deg={-15} />

      {/* the map */}
      <g className={s.faint}>
        <path d="M228 230Q300 220 386 236M262 266L350 192M330 266L390 226M236 252H306M344 198L386 210" />
      </g>
      <ellipse className={s.dim} cx="300" cy="214" rx="24" ry="5" />

      {/* the pin, calling out */}
      <path d="M300 212C292 192 272 176 272 148A28 28 0 0 1 328 148C328 176 308 192 300 212Z" />
      <circle cx="300" cy="148" r="9" />
      <circle className={s.redFill} cx="300" cy="148" r="2.6" />
      {[40, 52, 64].map((r, n) => (
        <path key={r} className={cx(s.wave, n ? s.dim : undefined)} style={i(n)} d={arc(300, 148, r, 222, 318)} />
      ))}
    </>
  );
}

const PLATES: Record<string, () => ReactNode> = {
  openbee: OpenBee,
  alice: Alice,
  "marathi-slm": MarathiSLM,
  localmind: LocalMind,
  memorysearch: MemorySearch,
  draupadi: Draupadi,
};

export function HousePlate({ id, className }: { id: string; className?: string }) {
  const Art = PLATES[id];
  if (!Art) return null;
  return (
    <svg className={cx(s.art, className)} viewBox="0 0 400 300" aria-hidden="true" focusable="false">
      <Art />
    </svg>
  );
}

export default HousePlate;
