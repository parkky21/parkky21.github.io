import type { CSSProperties } from "react";
import { blogs } from "@/lib/data";
import { Arrow, MechBotDoodle } from "@/components/Doodles";
import { PaperClip } from "@/components/scrapbook/Fasteners";
import { Reveal } from "@/components/scrapbook/Reveal";
import { SectionHeading } from "@/components/scrapbook/SectionHeading";
import { Stamp } from "@/components/scrapbook/Stamp";
import { WashiTape } from "@/components/scrapbook/WashiTape";
import { CoffeeSticker, HeartSticker, SloganSticker } from "@/components/scrapbook/stickers";

type Blog = (typeof blogs)[number];

/** Stamp-pad inks, keyed by the post's tint so each card keeps its colour. */
const INK: Record<NonNullable<Blog["tint"]>, string> = {
  blue: "var(--color-teal-deep)",
  green: "var(--color-teal-deep)",
  pink: "#b4473a",
  orange: "var(--color-accent-deep)",
  yellow: "var(--color-accent-deep)",
  purple: "#7a5a6e",
};

/** Header band height — the red rule sits on it and the blue rules start below. */
const HEADER_PX = 48;
const RULE_PX = 26;

/**
 * A 3×5 library catalogue card: cream stock, a red rule under the header,
 * faint blue rules below, and the rod hole punched through the bottom — a
 * real hole (masked), so whatever page it's lying on shows through.
 */
const CARD_STOCK: CSSProperties = {
  backgroundColor: "#fffdf6",
  // top to bottom: fibre grain, the red rule, a blank header band (so the
  // blue rules only start below the red one), then the blue rules
  backgroundImage: `var(--paper-grain), linear-gradient(transparent ${HEADER_PX - 1}px, rgba(196,61,43,0.45) ${HEADER_PX - 1}px, rgba(196,61,43,0.45) ${HEADER_PX}px, transparent ${HEADER_PX}px), linear-gradient(#fffdf6 ${HEADER_PX}px, transparent ${HEADER_PX}px), repeating-linear-gradient(transparent 0 ${RULE_PX - 1}px, rgba(31,122,112,0.14) ${RULE_PX - 1}px ${RULE_PX}px)`,
  backgroundPosition: `0 0, 0 0, 0 0, 0 ${HEADER_PX}px`,
  maskImage: "radial-gradient(circle at 50% calc(100% - 15px), transparent 6.5px, #000 7px)",
  WebkitMaskImage: "radial-gradient(circle at 50% calc(100% - 15px), transparent 6.5px, #000 7px)",
};

const TILTS = [-1.2, 0.9, -0.6];

/**
 * "Writing", filed like a library card catalogue: one catalogue card per
 * post, each held to the page a different way, with the librarian's stamp
 * across it. The margins carry the handwritten asides.
 */
export function WritingSection() {
  return (
    <section className="relative mx-auto max-w-5xl px-5 py-16">
      {/* margin notes — wide screens only, where there's a margin to write in */}
      <p
        aria-hidden
        className="absolute left-[3%] top-24 hidden -rotate-6 select-none font-hand text-xl text-ink-soft lg:block"
      >
        3am brain dumps ✍️
        <Arrow className="ml-6 mt-1 block h-10 w-12 rotate-[30deg]" />
      </p>
      <span aria-hidden className="absolute left-[23%] top-[6.5rem] hidden lg:block">
        <SloganSticker rotate={-8} color="#f6c344" peel>
          hot takes
        </SloganSticker>
      </span>
      <div aria-hidden className="absolute right-[3%] top-10 hidden select-none lg:block">
        <span className="coffee-ring -left-6 -top-6 h-32 w-32" />
        {/* the mug that left the ring, stuck down beside it */}
        <span className="absolute -right-1 top-24">
          <CoffeeSticker size={58} rotate={12} />
        </span>
        <p className="relative mt-10 rotate-6 font-hand text-xl text-ink-soft">
          read w/ coffee ☕
        </p>
      </div>

      <SectionHeading kicker="from the notebook" title="Writing" />

      <ul className="flex flex-col items-center gap-10 sm:flex-row sm:flex-wrap sm:items-stretch sm:justify-center sm:gap-x-8 sm:gap-y-12">
        {blogs.map((b, i) => (
          <li
            key={b.title}
            className="w-full max-w-[360px] sm:w-[calc(50%-1rem)] sm:max-w-none lg:w-[calc((100%-4rem)/3)]"
          >
            <CatalogueCard blog={b} index={i} />
          </li>
        ))}
      </ul>

      {/* signed off at the foot of the drawer */}
      <div
        aria-hidden
        className="mt-14 flex select-none items-center justify-center gap-4 sm:justify-end sm:pr-6"
      >
        <MechBotDoodle className="h-14 w-14 rotate-3 opacity-90" />
        <HeartSticker size={44} rotate={-12} />
        <Stamp round rotate={-10} color="var(--color-teal-deep)" className="w-[104px]">
          cat-reviewed
          <br />★<br />
          bot-approved
        </Stamp>
      </div>
    </section>
  );
}

function CatalogueCard({ blog, index }: { blog: Blog; index: number }) {
  const external = Boolean(blog.link && blog.link !== "#");
  const source = external ? new URL(blog.link!).hostname.replace(/^www\./, "") : null;
  const ink = blog.tint ? INK[blog.tint] : INK.yellow;
  const callNo = `${String(index + 1).padStart(3, "0")}.3 PAR`;

  return (
    <Reveal rotate={TILTS[index % TILTS.length]} delay={index * 0.1} className="h-full">
      <a
        href={blog.link ?? "#"}
        target={external ? "_blank" : undefined}
        rel="noreferrer"
        aria-label={external ? `${blog.title} (opens in a new tab)` : blog.title}
        className="group relative block h-full rounded-sm transition-transform duration-300 hover:-translate-y-1.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent motion-reduce:transition-none"
      >
        <Fastener index={index} />

        {/* drop-shadow on a wrapper: a box-shadow would be masked off with the hole */}
        <div className="h-full [filter:drop-shadow(0_1px_1.5px_rgba(58,47,47,0.18))_drop-shadow(0_12px_14px_rgba(40,25,10,0.16))]">
          <div className="flex h-full min-h-[230px] flex-col px-5 pb-9" style={CARD_STOCK}>
            <div
              aria-hidden
              className="flex items-center justify-between gap-2"
              style={{ height: HEADER_PX }}
            >
              <span className="font-mono text-[11px] font-semibold tracking-[0.12em] text-ink-soft">
                {callNo}
              </span>
              {source && (
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft/80">
                  {source}
                </span>
              )}
            </div>

            <h3
              className="font-heading text-lg font-semibold text-ink"
              style={{ lineHeight: `${RULE_PX}px` }}
            >
              {blog.title}
            </h3>

            {/* the librarian's stamp, and a hand-scrawled "read it" by the hole */}
            <div aria-hidden className="mt-auto flex items-end justify-between gap-3 pt-5">
              {blog.sticker && (
                <Stamp color={ink} rotate={index % 2 === 0 ? -5 : 4}>
                  {blog.sticker}
                </Stamp>
              )}
              <span className="ml-auto flex items-center gap-1.5 font-hand text-lg text-ink-soft transition-colors group-hover:text-ink">
                {blog.emoji && <span className="text-base">{blog.emoji}</span>}
                read it
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transition-none">
                  →
                </span>
              </span>
            </div>
          </div>
        </div>
      </a>
    </Reveal>
  );
}

/** Each card is held down differently — tape, a clip, tape across a corner. */
function Fastener({ index }: { index: number }) {
  switch (index % 3) {
    case 0:
      return (
        <WashiTape className="-top-3 left-1/2 z-10 h-6 w-24 -translate-x-1/2 -rotate-2" />
      );
    case 1:
      return <PaperClip className="-top-5 left-28 h-14 w-5" />;
    default:
      return (
        <WashiTape
          color="amber"
          className="-right-5 -top-1 z-10 h-6 w-20 rotate-[38deg]"
        />
      );
  }
}
