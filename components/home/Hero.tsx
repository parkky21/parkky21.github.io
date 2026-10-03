import type { ComponentType, CSSProperties } from "react";
import { hero, profile } from "@/lib/data";
import { CatPeekDoodle, ScribbleUnderline } from "@/components/Doodles";
import { PolaroidFrame } from "@/components/scrapbook/PolaroidFrame";
import { Reveal } from "@/components/scrapbook/Reveal";
import { Sticker } from "@/components/scrapbook/Sticker";
import { SketchSheet, type Paper } from "./lab/SketchSheet";
import { StitchBoard } from "./lab/StitchBoard";
import { Knot, Stitches } from "./lab/Stitches";
import { RobotBlueprint } from "./lab/RobotBlueprint";
import { TransformerRedesign } from "./lab/TransformerRedesign";
import { BrainWiring } from "./lab/BrainWiring";
import { GroundSensors } from "./lab/GroundSensors";

type SheetSpec = {
  key: keyof typeof hero.sheets;
  Sketch: ComponentType<{ className?: string }>;
  paper: Paper;
  rotate: number;
  /** cell in the 3×2 board on wide screens */
  place: string;
  /** the corner facing the photo — where the red thread is pinned */
  knot: string;
};

const SHEETS: SheetSpec[] = [
  { key: "robot", Sketch: RobotBlueprint, paper: "blueprint", rotate: -1.5, place: "xl:col-start-1 xl:row-start-1", knot: "bottom-2 right-2" },
  { key: "transformer", Sketch: TransformerRedesign, paper: "lined", rotate: 1.5, place: "xl:col-start-3 xl:row-start-1", knot: "bottom-2 left-2" },
  { key: "brain", Sketch: BrainWiring, paper: "dots", rotate: 1.2, place: "xl:col-start-1 xl:row-start-2", knot: "right-2 top-2" },
  { key: "ground", Sketch: GroundSensors, paper: "kraft", rotate: -1.2, place: "xl:col-start-3 xl:row-start-2", knot: "left-2 top-2" },
];

/** an index card: cream stock, faint rules, one red header line */
const INDEX_CARD: CSSProperties = {
  backgroundColor: "#fffdf6",
  backgroundImage:
    "linear-gradient(transparent 46px, rgba(196,61,43,0.35) 46px, rgba(196,61,43,0.35) 47px, transparent 47px), repeating-linear-gradient(transparent 0 25px, rgba(31,122,112,0.1) 25px 26px)",
};

const PIECE_SHADOW = "shadow-[0_2px_4px_rgba(58,47,47,0.12),0_14px_28px_-14px_rgba(40,25,10,0.5)]";

/**
 * The home page's opening spread: a cork board with everything stitched on.
 * Wide screens get a 3×2 board — sketch | name card | sketch, then
 * sketch | photo + bench note | sketch — with red thread pinned from the
 * photo out to each sketch. Narrower, the pieces stack: name, photo, then the
 * sketches as a 2-up grid (tablets) or a swipeable strip (phones).
 */
export function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 pt-8 sm:px-5 lg:pt-10">
      <StitchBoard className="px-5 py-10 sm:px-10 sm:py-12 xl:px-12">
        {/* sticker patches on the board's corners */}
        <div aria-hidden className="absolute -top-4 right-10 z-20 hidden select-none sm:block">
          <Sticker rotate={4} tint="var(--color-note-green)">
            <span className="font-hand text-lg font-bold text-ink/85">{hero.stickers.attention.text}</span>
            {hero.stickers.attention.emoji}
          </Sticker>
        </div>
        <div aria-hidden className="absolute -bottom-4 left-10 z-20 hidden select-none sm:block">
          <Sticker rotate={-5} tint="var(--color-note-orange)">
            <span className="font-hand text-lg font-bold text-ink/85">{hero.stickers.gpuBrrr.text}</span>
            {hero.stickers.gpuBrrr.emoji}
          </Sticker>
        </div>

        <div className="grid items-center gap-y-12 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)_minmax(0,1fr)] xl:gap-x-10 xl:gap-y-14">
          {/* ---------------- name card ---------------- */}
          <Reveal delay={0.05} className="mx-auto w-full max-w-md xl:col-start-2 xl:row-start-1">
            <div
              className={`scrap-tilt relative px-6 pb-6 pt-3 text-center ${PIECE_SHADOW}`}
              style={{ ...INDEX_CARD, "--tilt-rotate": "-0.6deg" } as CSSProperties}
            >
              <Stitches />
              <p className="font-hand text-lg leading-[34px] text-ink-soft">{hero.kicker}</p>
              <div className="relative mt-3 inline-block">
                <h1 className="font-heading text-5xl font-bold leading-tight text-ink sm:text-6xl xl:text-[3.6rem]">
                  {profile.name}
                </h1>
                <ScribbleUnderline className="absolute -bottom-2 left-0 h-5 w-full" />
              </div>
              <h2 className="mt-6 font-heading text-2xl font-semibold text-ink sm:text-3xl">
                <span className="highlight">{profile.title}</span>
              </h2>
              <p className="mx-auto mt-4 max-w-xs font-hand text-2xl leading-snug text-ink/85">
                {profile.tagline}
              </p>
              <p className="mt-2 flex items-center justify-center gap-2 font-hand text-lg text-ink-soft">
                <span aria-hidden>📍</span>
                {profile.location}
              </p>
            </div>
          </Reveal>

          {/* ---------------- photo + bench note ---------------- */}
          <div className="flex flex-col items-center gap-10 sm:flex-row sm:items-start sm:justify-center sm:gap-0 xl:col-start-2 xl:row-start-2">
            <Reveal rotate={-2.5} delay={0.25} className="relative">
              <CatPeekDoodle className="absolute -top-8 left-1/2 z-10 h-9 w-24 -translate-x-1/2" />
              <PolaroidFrame
                src={profile.photo || undefined}
                alt={`Photo of ${profile.name}`}
                caption={profile.photoCaption}
                rotate={0}
                width={190}
              />
              <Knot id="hub" className="left-1/2 top-1" />
            </Reveal>

            <Reveal rotate={2.5} delay={0.4} className="relative z-10 sm:-ml-3 sm:mt-8">
              <div className={`relative w-48 bg-note-yellow px-4 py-3 text-left ${PIECE_SHADOW}`}>
                <Stitches />
                <p className="font-hand text-xl font-bold text-accent-deep">{hero.buildLog.title}</p>
                <ul className="mt-1 space-y-1">
                  {hero.buildLog.items.map((item) => (
                    <li key={item.text} className="flex gap-2 font-hand text-[17px] leading-tight text-ink/85">
                      <span aria-hidden className="shrink-0 font-bold text-teal-deep">
                        {item.done ? "☑" : "☐"}
                      </span>
                      <span className={item.done ? "line-through decoration-ink/40 decoration-2" : ""}>
                        {item.text}
                        {item.done && <span className="sr-only"> (done)</span>}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          {/* ---------------- the sketch sheets ---------------- */}
          {/* phones: a swipeable strip · tablets: 2-up grid · wide: dissolves into the board grid */}
          <div className="-mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-8 pb-4 pt-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-x-10 sm:gap-y-12 sm:overflow-visible sm:p-0 xl:contents">
            {SHEETS.map(({ key, Sketch, paper, rotate, place, knot }, i) => {
              const copy = hero.sheets[key];
              return (
                <Reveal
                  key={key}
                  delay={0.1 + i * 0.1}
                  className={`w-[82%] shrink-0 snap-center sm:w-auto ${place}`}
                >
                  <SketchSheet
                    fig={copy.fig}
                    title={copy.title}
                    caption={copy.caption}
                    paper={paper}
                    rotate={rotate}
                    knot={{ id: key, className: knot }}
                    className="mx-auto max-w-[380px] xl:max-w-none"
                  >
                    <Sketch />
                  </SketchSheet>
                </Reveal>
              );
            })}
          </div>
        </div>

        <p aria-hidden className="mt-1 text-center font-hand text-xl text-[#fff6e4] sm:hidden">
          swipe the board →
        </p>
      </StitchBoard>
    </section>
  );
}
