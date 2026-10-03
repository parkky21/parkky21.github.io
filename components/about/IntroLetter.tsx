import type { CSSProperties } from "react";
import Image from "next/image";
import { profile } from "@/lib/data";
import { PhotoCorners } from "@/components/scrapbook/Fasteners";
import { Reveal } from "@/components/scrapbook/Reveal";
import { Stamp } from "@/components/scrapbook/Stamp";
import { HelloSticker, LilySticker } from "@/components/scrapbook/stickers";

const SHEET_SHADOW =
  "shadow-[0_1px_2px_rgba(58,47,47,0.12),0_22px_38px_-20px_rgba(40,25,10,0.5)]";

/**
 * The /about intro: a page torn out of a ring binder (punched holes, red
 * margin, ruled lines) with my photo mounted in photo corners and the intro
 * handwritten on the lines. `.paper-lined` rules every 28px, so the copy
 * column is laid out in 28px steps to sit on them. The h1 for the page lives
 * here.
 */
export function IntroLetter() {
  return (
    <section className="mx-auto max-w-4xl px-4 pb-6 pt-14 sm:px-8">
      <Reveal rotate={-0.5}>
        <div
          className={`paper-lined relative pb-14 pl-[54px] pr-5 pt-14 sm:pl-16 sm:pr-12 ${SHEET_SHADOW}`}
        >
          <PunchHoles />
          <DividerTab label="about" />

          {/* round postmark in the top corner, half on the ruled area */}
          <div aria-hidden className="absolute right-4 top-3 sm:right-8 sm:top-4">
            <Stamp round rotate={-12} color="var(--color-teal-deep)" className="h-[74px] w-[74px] p-1.5! text-[8.5px]!">
              posted from
              <br />
              {profile.location.split(",")[0]}
            </Stamp>
          </div>

          {/* name badge slapped across the top edge, above the photo */}
          <span className="absolute -left-3 -top-9 z-20 sm:-left-6 sm:-top-8">
            <HelloSticker name={profile.name.split(" ")[0]} rotate={-7} />
          </span>

          {/* a coffee ring by the signature, and a spider lily sticker (the flower from the home page) */}
          <div aria-hidden className="coffee-ring -bottom-10 -right-6 hidden h-40 w-40 sm:block" />
          <span className="absolute -bottom-7 right-24 z-20 hidden sm:block">
            <LilySticker size={58} rotate={-12} />
          </span>

          <div className="grid gap-x-10 sm:grid-cols-[200px_minmax(0,1fr)] md:grid-cols-[220px_minmax(0,1fr)]">
            <MountedPhoto />

            <div>
              <h1 className="flex h-14 items-end pb-1 font-heading text-[2rem] font-bold leading-none text-ink sm:text-[2.4rem]">
                About me
              </h1>
              <p className="mt-7 font-hand text-[22px] leading-[28px] text-ink/90 sm:text-[23px]">
                {profile.introAbout}
              </p>
              <p className="mt-7 text-right font-hand text-[22px] leading-[28px] text-ink-soft">
                — {profile.nickname}
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/** A print held to the page by four black mounting corners. */
function MountedPhoto() {
  return (
    // fixed 11-rule height on phones so the copy below still lands on the lines
    <figure className="relative mx-auto h-[308px] w-[190px] sm:mx-0 sm:h-auto sm:w-full">
      <div
        className="scrap-tilt relative bg-[#fdfcf8] p-2.5 shadow-[0_1px_2px_rgba(58,47,47,0.2),0_10px_18px_-10px_rgba(40,25,10,0.55)]"
        style={{ "--tilt-rotate": "2deg" } as CSSProperties}
      >
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-kraft">
          {profile.photo && (
            <Image
              src={profile.photo}
              alt={`Photo of ${profile.name}`}
              fill
              priority
              sizes="220px"
              className="object-cover"
            />
          )}
        </div>
        <PhotoCorners size={20} />
      </div>
      <figcaption className="mt-3 text-center font-hand text-2xl text-ink/80">
        {profile.photoCaption}
      </figcaption>

    </figure>
  );
}

/** Three binder holes down the margin, showing the page beneath. */
function PunchHoles() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-y-0 left-3 flex flex-col justify-around py-10 sm:left-4">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="block h-[18px] w-[18px] rounded-full bg-paper shadow-[inset_1px_2px_3px_rgba(40,25,10,0.35)]"
        />
      ))}
    </div>
  );
}

/** A coloured index tab sticking out of the page edge, like a journal section divider. */
function DividerTab({ label }: { label: string }) {
  return (
    <div
      aria-hidden
      className="absolute -right-7 top-24 hidden h-24 w-7 items-center justify-center rounded-r-md bg-note-blue shadow-[2px_2px_4px_rgba(58,47,47,0.18)] sm:flex"
    >
      <span className="rotate-90 font-heading text-[11px] font-bold uppercase tracking-[0.25em] text-teal-deep">
        {label}
      </span>
    </div>
  );
}
