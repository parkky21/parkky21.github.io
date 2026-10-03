import type { ReactNode } from "react";
import Image from "next/image";
import { indieProduct } from "@/lib/data";
import { noteTint } from "@/lib/palette";
import { Reveal } from "@/components/scrapbook/Reveal";
import { TornCard } from "@/components/scrapbook/TornCard";
import { WashiTape } from "@/components/scrapbook/WashiTape";
import { Sticker } from "@/components/scrapbook/Sticker";
import { Annotation } from "@/components/scrapbook/Annotation";

const stickerTilts = [-4, 3, -2];

type Shot = typeof indieProduct.shot;

/** A screenshot pasted into the scrapbook: white photo border, tilt, tape on top. */
function TapedShot({
  shot,
  sizes,
  className = "",
  children,
}: {
  shot: Shot;
  sizes: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <span
      className={`relative block bg-white p-2 shadow-[0_2px_4px_rgba(58,47,47,0.12),0_16px_32px_-12px_rgba(58,47,47,0.35)] ${className}`}
    >
      {children}
      <Image
        src={shot.src}
        alt={shot.alt}
        width={shot.width}
        height={shot.height}
        sizes={sizes}
        // above the fold on desktop, and the page's largest paint
        loading="eager"
        className="block h-auto w-full"
      />
    </span>
  );
}

const NEW_TAB = <span className="sr-only"> (opens in a new tab)</span>;

/** The side hustle, given its own spread above the project board. */
export function BtwinusSpread() {
  const p = indieProduct;
  const [primary, secondary] = p.links;

  return (
    <section aria-labelledby="btwinus-title" className="mb-24">
      <Reveal rotate={-0.6}>
        <TornCard
          tint="var(--color-note-pink)"
          contentClassName="grid items-center gap-10 p-6 sm:p-10 md:grid-cols-[1.05fr_1fr]"
        >
          <WashiTape
            color="amber"
            className="-top-3 left-10 h-6 w-28 -rotate-3"
          />

          <div>
            <p className="font-hand text-xl text-ink-soft">
              my first side hustle · live <span aria-hidden="true">✦</span>
            </p>
            <h2
              id="btwinus-title"
              className="mt-1 font-heading text-3xl font-bold text-ink sm:text-4xl"
            >
              {p.name}
            </h2>
            <p className="mt-1 font-hand text-2xl text-ink-soft">{p.tagline}</p>

            {p.blurb.map((para) => (
              <p key={para} className="mt-4 text-[15px] leading-relaxed text-ink/85">
                {para}
              </p>
            ))}

            {/* the stickers are decoration; screen readers get one plain sentence */}
            <p className="sr-only">{p.statsLabel}</p>
            <ul aria-hidden="true" className="mt-6 flex flex-wrap gap-3">
              {p.stats.map((s, i) => (
                <li key={s.label}>
                  <Sticker
                    rotate={stickerTilts[i % stickerTilts.length]}
                    tint={noteTint[s.color]}
                  >
                    <span className="font-hand text-lg font-bold text-ink/85">
                      {s.label}
                    </span>
                  </Sticker>
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href={primary.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-ink px-6 py-2.5 font-heading text-sm font-semibold text-paper transition-transform hover:-translate-y-0.5 hover:-rotate-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {primary.label} <span aria-hidden="true">↗</span>
                {NEW_TAB}
              </a>
              <a
                href={secondary.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-ink/25 bg-white/60 px-4 py-1.5 font-hand text-lg font-bold text-ink/70 transition-colors hover:border-ink hover:bg-white hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {secondary.label} <span aria-hidden="true">↗</span>
                {NEW_TAB}
              </a>
            </div>

            <Annotation className="mt-6 block">{p.postscript}</Annotation>
          </div>

          {/* same destination as the primary button, so kept out of the tab order */}
          <a
            href={p.url}
            target="_blank"
            rel="noreferrer"
            tabIndex={-1}
            aria-hidden="true"
            className="group relative block px-2 py-4"
          >
            <TapedShot
              shot={p.shot}
              sizes="(min-width: 768px) 520px, 90vw"
              className="-rotate-2 transition-transform duration-300 group-hover:-rotate-1"
            >
              <WashiTape
                color="kraft"
                className="-top-3 left-6 z-10 h-5 w-20 -rotate-6"
              />
              <WashiTape
                color="amber"
                className="-top-3 right-6 z-10 h-5 w-20 rotate-6"
              />
            </TapedShot>
          </a>
        </TornCard>
      </Reveal>
    </section>
  );
}
