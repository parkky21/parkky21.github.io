import type { CSSProperties, ReactNode } from "react";
import { profile } from "@/lib/data";
import { Arrow } from "./Doodles";
import { Reveal } from "./scrapbook/Reveal";
import { Stamp } from "./scrapbook/Stamp";
import { CoffeeSticker, LilySticker, SealSticker } from "./scrapbook/stickers";
import { PostageStamp } from "./chrome/PostageStamp";

/** the red/blue barber-pole border of an airmail card, in the site's palette */
const AIRMAIL_BORDER: CSSProperties = {
  backgroundColor: "#fffdf6",
  backgroundImage:
    "repeating-linear-gradient(135deg, var(--color-accent-deep) 0 14px, #fffdf6 14px 22px, var(--color-teal-deep) 22px 36px, #fffdf6 36px 44px)",
};

/** the card stock inside the border */
const CARD_STOCK: CSSProperties = {
  backgroundColor: "#fffaf0",
  backgroundImage:
    "var(--paper-grain), radial-gradient(ellipse at 92% 8%, rgba(160,110,50,0.09), transparent 45%)",
};

const PIECE_SHADOW =
  "shadow-[0_2px_4px_rgba(58,47,47,0.12),0_22px_38px_-18px_rgba(40,25,10,0.45)]";

/**
 * The sign-off: an airmail postcard lying at the bottom of the journal. The
 * message side carries the invitation and the ways to reach me (as luggage
 * tags); the address side is my contact info, under a stamp with a Mumbai
 * postmark. A cut-here line separates the colophon.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mx-auto max-w-5xl px-4 pb-14 pt-16 sm:px-6">
      <Reveal rotate={-0.8}>
        <div className="relative mx-auto max-w-4xl">
          {/* someone put their coffee down on the corner — and left a ring */}
          <span aria-hidden className="coffee-ring -bottom-14 -right-14 hidden h-36 w-36 lg:block" />
          <span className="absolute -bottom-8 right-2 z-20 hidden sm:block lg:-right-7">
            <CoffeeSticker size={60} rotate={-10} />
          </span>

          <div className={`p-[7px] ${PIECE_SHADOW}`} style={AIRMAIL_BORDER}>
            <div className="relative px-5 py-6 sm:px-8 sm:py-7" style={CARD_STOCK}>
              {/* the printed header every postcard has */}
              <div
                aria-hidden
                className="mb-5 flex items-baseline justify-between border-b border-ink/15 pb-2 font-heading text-[10px] font-semibold uppercase tracking-[0.3em] text-ink-soft/80"
              >
                <span>Post card</span>
                <span className="hidden sm:inline">Par avion · by air mail</span>
                <span className="sm:hidden">Par avion</span>
              </div>

              <div className="grid gap-8 md:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] md:gap-0">
                {/* -------- message side -------- */}
                <div className="md:pr-8">
                  <h2 className="font-heading text-[1.7rem] font-bold leading-tight text-ink sm:text-4xl">
                    Let&apos;s make something together
                  </h2>
                  <p className="mt-4 max-w-md font-hand text-xl leading-snug text-ink-soft">
                    Got an idea worth sticking in the scrapbook? I&apos;m always up for a
                    good AI problem, a collaboration, or just a chat.
                  </p>

                  <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-4">
                    <TagLink href={`mailto:${profile.email}`} tone="accent" rotate={-2}>
                      <span aria-hidden>✉</span> Email me
                    </TagLink>
                    <TagLink href={profile.socials.github} external rotate={1.5}>
                      GitHub
                    </TagLink>
                    <TagLink href={profile.socials.linkedin} external rotate={-1}>
                      LinkedIn
                    </TagLink>
                  </div>
                </div>

                {/* -------- address side -------- */}
                <div className="relative border-t border-ink/15 pt-6 md:border-l md:border-t-0 md:pl-8 md:pt-0">
                  <div className="flex items-start justify-between gap-2">
                    <SealSticker
                      id="footer-write-back"
                      ring="write back soon · write back soon · "
                      center="✉️"
                      size={76}
                      rotate={-8}
                      className="mt-1 shrink-0"
                    />
                    {/* postmark: wavy cancel lines running into the ring */}
                    <div aria-hidden className="relative ml-auto mr-[-18px] mt-6 flex items-center">
                      {/* the cancel lines need room: dropped where the column is narrowest */}
                      <svg viewBox="0 0 70 30" className="hidden h-7 w-[70px] opacity-60 sm:block md:hidden lg:block" fill="none">
                        {[6, 15, 24].map((y) => (
                          <path
                            key={y}
                            d={`M0 ${y}c6-4 11-4 17 0s11 4 17 0 11-4 17 0 11 4 19 0`}
                            stroke="var(--color-ink)"
                            strokeWidth="1.6"
                          />
                        ))}
                      </svg>
                      <Stamp round rotate={-12} color="var(--color-ink)" className="relative z-10 h-[74px] w-[74px] p-1! text-[8px]! leading-[1.35]!">
                        Mumbai
                        <br />
                        {year}
                        <br />
                        ✦ IN ✦
                      </Stamp>
                    </div>
                    <PostageStamp rotate={3} />
                  </div>

                  <address className="mt-5 not-italic">
                    <p className="mb-1 font-heading text-[10px] font-semibold uppercase tracking-[0.3em] text-ink-soft/80">
                      From the desk of
                    </p>
                    <ul className="font-hand text-xl text-ink">
                      <AddressLine>{profile.name}</AddressLine>
                      <AddressLine>
                        <a
                          href={`mailto:${profile.email}`}
                          className="break-all rounded-sm underline decoration-ink/25 decoration-dashed underline-offset-4 hover:text-accent-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                        >
                          {profile.email}
                        </a>
                      </AddressLine>
                      <AddressLine>{profile.location}</AddressLine>
                    </ul>
                  </address>
                </div>
              </div>
            </div>
          </div>

          {/* margin note pointing at the tags */}
          <p
            aria-hidden
            className="absolute -left-4 bottom-10 hidden -translate-x-full -rotate-6 font-hand text-xl text-teal-deep xl:block"
          >
            write back!
            <Arrow className="ml-6 mt-1 block h-10 w-12 -rotate-12" color="var(--color-teal-deep)" />
          </p>
        </div>
      </Reveal>

      {/* cut along the dotted line */}
      <div aria-hidden className="mx-auto mt-14 flex max-w-4xl items-center gap-2 text-ink-soft/60">
        <span className="-rotate-90 text-lg leading-none">✂</span>
        <span className="h-0 flex-1 border-t-2 border-dashed border-ink/20" />
        <LilySticker size={40} rotate={14} className="-my-3" />
      </div>
      <p className="mt-3 text-center font-hand text-base text-ink-soft/80">
        Cut, taped &amp; glued with Next.js — {year} {profile.name}
      </p>
    </footer>
  );
}

/** one ruled line of the address block */
function AddressLine({ children }: { children: ReactNode }) {
  return <li className="border-b border-ink/20 pb-0.5 pt-2 leading-tight">{children}</li>;
}

/**
 * A luggage tag used as a link: notched end, punched eyelet with a
 * reinforcement ring. The tag shape is a clipped background layer so the
 * link itself keeps an unclipped focus outline.
 */
function TagLink({
  href,
  external = false,
  tone = "kraft",
  rotate = 0,
  children,
}: {
  href: string;
  external?: boolean;
  tone?: "kraft" | "accent";
  rotate?: number;
  children: ReactNode;
}) {
  const accent = tone === "accent";
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className={`scrap-tilt relative inline-flex items-center py-2.5 pl-9 pr-5 font-heading text-sm font-semibold transition-[translate] duration-200 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent motion-reduce:transition-none ${
        accent ? "text-[#fffaf0]" : "text-ink"
      }`}
      style={{ "--tilt-rotate": `${rotate}deg` } as CSSProperties}
    >
      <span
        aria-hidden
        className="absolute inset-0 [filter:drop-shadow(0_1px_1px_rgba(40,25,10,0.3))_drop-shadow(0_5px_6px_rgba(40,25,10,0.16))]"
      >
        <span
          className={`absolute inset-0 ${accent ? "bg-accent-deep" : "paper-kraft"}`}
          style={{
            clipPath: "polygon(12px 0, 100% 0, 100% 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)",
            backgroundImage: accent ? "var(--paper-grain)" : undefined,
          }}
        />
        {/* the eyelet: a punched hole in a paper reinforcement ring */}
        <span className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full bg-[#fdf6e7] shadow-[inset_0_1px_2px_rgba(40,25,10,0.45),0_0_0_2.5px_rgba(255,250,240,0.85)]" />
      </span>
      <span className="relative inline-flex items-center gap-1.5">{children}</span>
    </a>
  );
}
