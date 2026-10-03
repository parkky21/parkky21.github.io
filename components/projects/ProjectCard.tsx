import type { CSSProperties, ReactNode } from "react";
import type { Project } from "@/lib/data";
import { hasRepo } from "@/lib/palette";
import { Reveal } from "@/components/scrapbook/Reveal";
import { PaperClip } from "@/components/scrapbook/Fasteners";
import { Stamp } from "@/components/scrapbook/Stamp";
import {
  BoltSticker,
  BrainSticker,
  BubbleSticker,
  BurstSticker,
  ChipSticker,
  HeartSticker,
  HoloSticker,
  RobotSticker,
  SloganSticker,
  StarSticker,
} from "@/components/scrapbook/stickers";
import { PlateSketch } from "@/components/projects/plates/PlateSketch";
import { LabelTape, type TapeRoll } from "@/components/scrapbook/LabelTape";

/**
 * Pressboard folder stocks, one per project colour. Deeper than the note
 * tints on purpose: the folder has to read as card stock *behind* a cream
 * report sheet, not as another sheet of paper.
 */
const FOLDER: Record<Project["color"], string> = {
  yellow: "#e9d39f",
  orange: "#e2bb8c",
  pink: "#e1b6a8",
  blue: "#a9cbc5",
  green: "#bccfac",
  purple: "#cdbab0",
};

/** Real filing drawers stagger their tabs so every label stays visible. */
const TAB_SPOTS = ["left-4", "left-1/2 -translate-x-1/2", "right-4"];
const TILTS = [-0.7, 0.5, -0.4, 0.6, -0.5, 0.4];
const TAPES: TapeRoll[] = ["ink", "teal", "red"];

const SHEET_SHADOW =
  "shadow-[0_1px_2px_rgba(58,47,47,0.14),0_10px_18px_-12px_rgba(40,25,10,0.45)]";

/**
 * One project, filed as a lab report: a coloured file folder with the
 * project's name on its tab, the report sheet lying on top with the engraved
 * sketch paper-clipped to it, and the stack punched out on a label maker.
 * Hovering slides the sheet up out of the folder (and wakes the sketch —
 * PlateSketch animates under the nearest [data-plate]).
 */
export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const shortName = project.name.split(" — ")[0];
  const tape = TAPES[index % TAPES.length];

  return (
    <Reveal
      delay={(index % 3) * 0.08}
      rotate={TILTS[index % TILTS.length]}
      className="h-full"
    >
      <article data-plate className="group relative flex h-full flex-col pt-7">
        <Folder color={FOLDER[project.color]} tabSpot={TAB_SPOTS[index % TAB_SPOTS.length]}>
          {shortName}
        </Folder>

        {/* the second page of the report, peeking out from under the first */}
        <div
          aria-hidden
          className={`absolute bottom-5 left-4 right-3 top-12 rotate-[1.4deg] bg-[#f7f1e3] ${SHEET_SHADOW}`}
        />

        {/* the report sheet itself — slides up when you reach for it */}
        <div
          className={`paper-grain relative mx-3 mb-5 mt-4 flex flex-1 flex-col bg-[#fffcf3] px-5 pb-5 pt-4 transition-transform duration-300 ease-out group-hover:-translate-y-2 motion-reduce:transition-none sm:mr-4 ${SHEET_SHADOW}`}
        >
          {/* a typed header strip, like the top of a lab form */}
          <div className="flex items-baseline justify-between gap-3 border-b border-ink/25 pb-1.5">
            <span
              aria-hidden
              className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-soft"
            >
              Lab report
            </span>
            <p className="font-hand text-lg font-bold leading-none text-accent-deep">
              {project.date}
            </p>
          </div>

          {project.plate && <ClippedPrint project={project} index={index} />}

          <h3 className="mt-5 font-heading text-lg font-semibold leading-tight text-ink">
            {project.name}
          </h3>

          <p className="mt-2 text-[15px] leading-snug text-ink/85">
            {project.blurb}
          </p>

          {/* the shipping tag drops to its own line when the strips would get squeezed */}
          <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-5">
            <ul aria-label="Built with" className="flex flex-1 basis-36 flex-wrap gap-x-1.5 gap-y-2">
              {project.tags.map((t, i) => (
                <LabelTape
                  key={t}
                  as="li"
                  roll={tape}
                  size="sm"
                  rotate={i % 2 === 0 ? -1 : 0.8}
                >
                  {t}
                </LabelTape>
              ))}
            </ul>
            {hasRepo(project) && <RepoTag href={project.repo} name={project.name} />}
          </div>
        </div>
      </article>
    </Reveal>
  );
}

/**
 * The folder: a back panel the full size of the card with a tab rising
 * off its top edge, plus two score lines near the bottom where a real
 * folder creases to hold more pages. The tab label is decorative — the
 * card's heading carries the name.
 */
function Folder({
  color,
  tabSpot,
  children,
}: {
  color: string;
  tabSpot: string;
  children: string;
}) {
  const stock: CSSProperties = {
    backgroundColor: color,
    backgroundImage: "var(--paper-grain)",
  };
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div
        className={`absolute top-0 h-9 w-36 ${tabSpot}`}
        style={{
          ...stock,
          clipPath: "polygon(0 100%, 7% 18%, 12% 0, 88% 0, 93% 18%, 100% 100%)",
        }}
      >
        <span className="absolute inset-x-5 top-1.5 block truncate bg-[#fffcf3] px-1.5 py-px text-center font-hand text-[15px] font-bold leading-snug text-ink/85 shadow-[0_0_0_0.5px_rgba(58,47,47,0.2)]">
          {children}
        </span>
      </div>
      <div
        className="absolute inset-x-0 bottom-0 top-7 rounded-[3px] shadow-[0_2px_3px_rgba(58,47,47,0.14),0_18px_30px_-16px_rgba(40,25,10,0.55)]"
        style={stock}
      >
        <span className="absolute inset-x-0 bottom-3 h-px bg-black/10 shadow-[0_1px_0_rgba(255,255,255,0.35)]" />
        <span className="absolute inset-x-0 bottom-1.5 h-px bg-black/10 shadow-[0_1px_0_rgba(255,255,255,0.35)]" />
      </div>
    </div>
  );
}

type Plate = NonNullable<Project["plate"]>;

/**
 * Stickers slapped on each print, picked by what the project is about — an
 * icon for every project, plus a loud text sticker on the featured ones.
 */
const ICON_STICKER: Record<Plate, ReactNode> = {
  "marathi-slm": <BrainSticker size={50} rotate={-10} />,
  openbee: <RobotSticker size={50} rotate={8} />,
  memorysearch: <StarSticker size={46} rotate={-6} />,
  localmind: <ChipSticker size={48} rotate={10} />,
  alice: <BoltSticker size={48} rotate={-8} />,
  draupadi: <HeartSticker size={46} rotate={9} />,
};

const TEXT_STICKER: Partial<Record<Plate, ReactNode>> = {
  "marathi-slm": <BurstSticker size={74} rotate={10}>from scratch</BurstSticker>,
  openbee: <BubbleSticker rotate={5} color="#fdf0d0">zero cloud!</BubbleSticker>,
  localmind: <HoloSticker rotate={6}>100% local</HoloSticker>,
  alice: (
    <SloganSticker rotate={7} color="#2a9d8f" ink="#1f2a28">
      on watch
    </SloganSticker>
  ),
};

/**
 * The project's sketch as a print, paper-clipped to the report. Stickers sit
 * on the print's corners (never over the sheet's text), and open-source work
 * gets a rubber stamp across its bottom edge.
 */
function ClippedPrint({ project, index }: { project: Project; index: number }) {
  const plate = project.plate!;
  const textSticker = project.featured ? TEXT_STICKER[plate] : undefined;
  return (
    <div
      className={`relative mt-4 bg-white p-1.5 shadow-[0_1px_2px_rgba(58,47,47,0.18),0_6px_10px_-6px_rgba(40,25,10,0.35)] ${
        index % 2 === 0 ? "rotate-[0.6deg]" : "-rotate-[0.6deg]"
      }`}
    >
      {/* left of centre: clear of the plate's numeral and the top-right sticker */}
      <PaperClip className="-top-5 left-16 h-14 w-5" />
      <PlateSketch plate={plate} index={index} />

      <span aria-hidden className="absolute -bottom-4 -left-4 z-20">
        {ICON_STICKER[plate]}
      </span>
      {textSticker && (
        <span aria-hidden className="absolute -right-3 -top-3 z-20">
          {textSticker}
        </span>
      )}
      {hasRepo(project) && (
        <span aria-hidden className="absolute -bottom-3 right-2 z-10">
          <Stamp color="var(--color-teal-deep)" rotate={-8} className="bg-white/40">
            open source
          </Stamp>
        </span>
      )}
    </div>
  );
}

/**
 * The repo link as a kraft shipping tag, eyelet and all. The tag shape is
 * clipped on an inner span so the anchor's focus ring isn't clipped away.
 */
function RepoTag({ href, name }: { href: string; name: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={`GitHub repo for ${name} (opens in a new tab)`}
      className="ml-auto shrink-0 rotate-[-4deg] rounded-sm transition-transform duration-200 hover:rotate-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-reduce:transition-none"
    >
      <span
        className="paper-kraft relative flex items-center gap-1 py-1 pl-6 pr-3 font-hand text-base font-bold leading-tight text-ink shadow-[0_1px_2px_rgba(40,25,10,0.3)]"
        style={{ clipPath: "polygon(0 50%, 14px 0, 100% 0, 100% 100%, 14px 100%)" }}
      >
        {/* the eyelet: a reinforced ring with the hole punched through */}
        <span
          aria-hidden
          className="absolute left-[9px] top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-[#fffcf3] shadow-[inset_0_1px_1px_rgba(40,25,10,0.45),0_0_0_2px_#c6a87a]"
        />
        GitHub <span aria-hidden>↗</span>
      </span>
    </a>
  );
}
