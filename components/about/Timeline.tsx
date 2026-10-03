import type { ReactNode } from "react";
import { milestones, type Milestone } from "@/lib/data";
import { Arrow } from "@/components/Doodles";
import { Staple } from "@/components/scrapbook/Fasteners";
import { Reveal } from "@/components/scrapbook/Reveal";
import { SectionHeading } from "@/components/scrapbook/SectionHeading";
import { Stamp } from "@/components/scrapbook/Stamp";
import { WashiTape } from "@/components/scrapbook/WashiTape";
import {
  BoltSticker,
  BrainSticker,
  BubbleSticker,
  RocketSticker,
} from "@/components/scrapbook/stickers";
import { Barcode } from "./Barcode";
import { Ticket } from "./Ticket";

/* small, alternating tilts so the stubs look glued in by hand, not typeset */
const TILTS = [-0.9, 0.7, -0.5, 0.8, -0.7, 0.5];

const KIND = {
  education: { stock: "teal", stamp: "school", pass: "school pass", ink: "var(--color-teal-deep)" },
  work: { stock: "amber", stamp: "work", pass: "work pass", ink: "var(--color-accent-deep)" },
} as const;

/*
 * A sticker for some stops, keyed by position in the journey. They sit on the
 * ticket's top edge just left of the stub, where the paper is blank on every
 * ticket; phones skip them (the stub strip is up there instead).
 */
const STOP_STICKERS: Record<number, ReactNode> = {
  2: <BrainSticker size={50} rotate={12} />,
  3: <BoltSticker size={46} rotate={-10} />,
  4: (
    <BubbleSticker rotate={4} color="#fdf0d0">
      namaste, hello!
    </BubbleSticker>
  ),
  5: <RocketSticker size={56} rotate={14} />,
};

/**
 * Career path as a travel journal: every stop is a ticket stub glued down the
 * page, school passes in green and work passes in amber, joined by a dotted
 * route. Alternate stubs are taped or stapled down.
 */
export function Timeline() {
  return (
    <section className="relative mx-auto max-w-3xl px-4 py-16 sm:px-5">
      <SectionHeading
        kicker="the journey so far"
        title="Career Path"
        underline="var(--color-teal)"
      />

      <div className="relative">
        {/* the route between stops — only shows in the gaps */}
        <div
          aria-hidden
          className="absolute bottom-6 left-1/2 top-6 border-l-[3px] border-dotted border-ink/25"
        />

        <ol className="relative space-y-10 sm:space-y-12">
          {milestones.map((m, i) => (
            <li
              key={`${m.period}-${m.org}`}
              className={`relative sm:w-[92%] ${i % 2 === 1 ? "sm:ml-auto" : ""}`}
            >
              <Reveal rotate={TILTS[i % TILTS.length]} delay={0.05}>
                <div className="relative">
                  {i % 2 === 0 ? (
                    <WashiTape
                      color={m.kind === "education" ? "teal" : "amber"}
                      className="-left-3 -top-2.5 z-10 h-6 w-20 -rotate-[28deg]"
                    />
                  ) : (
                    <>
                      {/* staples punched through the stub */}
                      <Staple className="right-8 top-2.5 rotate-[4deg] sm:right-[60px] sm:top-3" />
                      <span className="hidden sm:contents">
                        <Staple className="bottom-3 right-[60px] -rotate-[3deg]" />
                      </span>
                    </>
                  )}
                  {STOP_STICKERS[i] && (
                    <span className="absolute -top-6 right-[164px] z-20 hidden sm:block">
                      {STOP_STICKERS[i]}
                    </span>
                  )}
                  {/* phones keep just the "now" rocket, on the perforation by the short ticket header */}
                  {i === milestones.length - 1 && (
                    <span className="absolute right-3 top-9 z-20 sm:hidden">
                      <RocketSticker size={44} rotate={14} />
                    </span>
                  )}
                  <MilestoneTicket m={m} serial={i + 1} total={milestones.length} />
                </div>
              </Reveal>

              {i === milestones.length - 1 && <YouAreHere />}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function MilestoneTicket({ m, serial, total }: { m: Milestone; serial: number; total: number }) {
  const kind = KIND[m.kind];
  const no = `Nº ${String(serial).padStart(2, "0")}`;

  return (
    <Ticket
      stock={kind.stock}
      stub={
        <div className="flex h-full items-center justify-between gap-3 px-5 sm:flex-col sm:justify-center sm:gap-3 sm:px-3 sm:py-5 sm:text-center">
          <div>
            <p
              aria-hidden
              className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-soft"
            >
              admit one
            </p>
            <p className="font-heading text-sm font-bold leading-snug text-ink">
              {m.period}
            </p>
          </div>
          {/* phones: a flat rubber stamp in the strip; wider: a round postmark */}
          <span className="sm:hidden">
            <Stamp rotate={-4} color={kind.ink}>
              {kind.stamp}
            </Stamp>
          </span>
          <span className="hidden sm:block">
            <Stamp round rotate={-14} color={kind.ink} className="h-16 w-16">
              {kind.stamp}
            </Stamp>
          </span>
          <div aria-hidden className="hidden sm:block">
            <Barcode seed={`${m.org}${m.period}`} className="h-7 w-24 text-ink/70" />
            <p className="mt-1 font-mono text-[10px] tracking-[0.3em] text-ink-soft">{no}</p>
          </div>
        </div>
      }
    >
      <div className="px-5 pb-5 pt-3 sm:px-6 sm:pt-4">
        {/* the printed header every ticket has */}
        <p
          aria-hidden
          // left-aligned so the top-right corner stays blank for a sticker
          className="mb-2.5 border-b border-ink/15 pb-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-soft"
        >
          {kind.pass} · stop {serial} of {total}
        </p>
        <h3 className="font-heading text-lg font-semibold leading-snug text-ink">
          {m.title}
        </h3>
        <p className="font-hand text-xl leading-tight" style={{ color: kind.ink }}>
          {m.org}
        </p>
        <p className="mt-2 text-[15px] leading-snug text-ink/85">{m.detail}</p>

        {m.highlights && (
          <ul className="mt-3 space-y-1.5 border-t border-dashed border-ink/20 pt-3">
            {m.highlights.map((h) => (
              <li key={h} className="flex gap-2 text-sm leading-snug text-ink/80">
                <span aria-hidden className="mt-px font-mono text-xs" style={{ color: kind.ink }}>
                  ▸
                </span>
                {h}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Ticket>
  );
}

/** A margin scribble beside the newest stub — only where there's a margin to write in. */
function YouAreHere() {
  return (
    <div
      aria-hidden
      className="absolute right-full top-10 mr-3 hidden w-28 flex-col items-end lg:flex"
    >
      <span className="-rotate-6 text-right font-hand text-xl leading-tight text-accent-deep">
        still on this ride
      </span>
      <Arrow className="mt-1 h-8 w-10 -rotate-[8deg]" color="var(--color-accent-deep)" />
    </div>
  );
}
