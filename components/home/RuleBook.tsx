import { bloodBlossom } from "@/lib/data";
import { CatDoodle, Sparkle } from "@/components/Doodles";
import { PaperScrap } from "@/components/scrapbook/PaperScrap";
import { Reveal } from "@/components/scrapbook/Reveal";
import { SectionHeading } from "@/components/scrapbook/SectionHeading";
import { WashiTape } from "@/components/scrapbook/WashiTape";
import { BloomOnView } from "./lily/BloomOnView";
import LilySVG from "./lily/LilySVG";

/**
 * "The Blood Blossom": an open book lying on the scrapbook page. A red spider
 * lily is pressed on the left page; the right page holds the Red Rising quote
 * it stands in for, plus a handwritten line under it. Copy lives in
 * `bloodBlossom` in lib/data.ts. (Name kept as RuleBook: app/page.tsx imports it.)
 */
export function RuleBook() {
  return (
    <section className="relative mx-auto max-w-5xl px-5 py-16">
      {/* scattered decorations */}
      <Sparkle className="absolute left-[4%] top-10 h-7 w-7 -rotate-6 opacity-70" />
      <Sparkle
        className="absolute bottom-16 right-[5%] hidden h-6 w-6 rotate-12 opacity-70 md:block"
        color="var(--color-teal)"
      />
      <PaperScrap
        tint="var(--color-note-pink)"
        rotate={-6}
        className="absolute bottom-[30%] left-0 hidden lg:block"
        lines={2}
      />

      <SectionHeading
        kicker="pressed between the pages"
        title="The Blood Blossom"
      />

      <Reveal rotate={1}>
        <div className="relative mx-auto max-w-3xl">
          {/* a cat asleep on top of the cover */}
          <CatDoodle className="absolute -top-12 right-12 hidden h-14 w-14 sm:block" />
          {/* cover peeking out around the pages */}
          <div
            aria-hidden
            className="absolute -inset-2 rounded-xl bg-accent-deep shadow-[0_22px_45px_-15px_rgba(58,47,47,0.5)]"
          />
          {/* stacked page edges along the bottom */}
          <div
            aria-hidden
            className="absolute -bottom-1 left-2 right-2 h-1.5 rounded-b"
            style={{
              background:
                "repeating-linear-gradient(to right, #fffdf6 0 6px, #e9e0cd 6px 7px)",
            }}
          />

          {/* the open spread (stacks on mobile, lily first) */}
          <div className="relative grid grid-cols-1 sm:grid-cols-2">
            {/* left page: the pressed specimen */}
            <div
              className="relative flex flex-col items-center justify-center rounded-t-lg px-7 py-8 sm:rounded-l-lg sm:rounded-tr-none sm:px-8"
              style={{
                background:
                  "linear-gradient(to right, #fffdf6 90%, #f5eedf 98%, #e9e0cd 100%)",
              }}
            >
              <PressedLily specimen={bloodBlossom.specimen} />
            </div>

            {/* right page: the quote and my note on it */}
            <div
              className="relative rounded-b-lg px-7 py-8 sm:flex sm:flex-col sm:rounded-r-lg sm:rounded-bl-none sm:border-l sm:border-ink/10 sm:px-8"
              style={{
                background:
                  "linear-gradient(to left, #fffdf6 90%, #f5eedf 98%, #e9e0cd 100%)",
              }}
            >
              {/* bookmark ribbon lying over the page */}
              <div
                aria-hidden
                className="absolute -top-2 right-8 h-14 w-5 rotate-1 bg-teal shadow-[0_2px_5px_rgba(58,47,47,0.25)]"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 84%, 0 100%)",
                }}
              />
              <p className="mb-5 font-heading text-xs font-bold uppercase tracking-[0.2em] text-ink-soft">
                {bloodBlossom.pageLabel}
              </p>
              {/* less text than the lily is tall: centre the note against it */}
              <div className="sm:flex sm:flex-1 sm:flex-col sm:justify-center">
                <figure>
                  <blockquote className="border-l-2 border-accent-deep/40 pl-4">
                    {bloodBlossom.paragraphs.map((para) => (
                      <p
                        key={para}
                        className="font-hand text-2xl leading-snug text-ink/90 sm:text-[1.65rem]"
                      >
                        {para}
                      </p>
                    ))}
                  </blockquote>
                  <figcaption className="mt-3 text-right font-hand text-lg text-ink-soft">
                    <cite className="not-italic">{bloodBlossom.credit}</cite>
                  </figcaption>
                </figure>
                <div aria-hidden className="my-6 h-0.5 w-20 rounded-full bg-kraft" />
                <p className="font-hand text-xl font-bold leading-snug text-ink">
                  <span className="highlight [--hl:var(--color-note-pink)]">
                    {bloodBlossom.rule}
                  </span>
                </p>
              </div>
              <p className="mt-6 text-right font-hand text-lg text-ink-soft">
                {bloodBlossom.signoff}
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/**
 * The whole plant taped flat to the page like a herbarium sheet. The drawing is
 * decorative (the facing page carries the meaning), and its draw-on is held
 * until the spread scrolls into view.
 */
function PressedLily({ specimen }: { specimen: string }) {
  return (
    <figure className="flex flex-col items-center">
      <div className="relative aspect-[840/1460] h-[300px] sm:h-[340px] md:h-[420px]">
        <div
          aria-hidden
          className="h-full w-full [filter:drop-shadow(2px_4px_3px_rgba(58,47,47,0.22))]"
        >
          <BloomOnView className="h-full w-full">
            <LilySVG framing="stem" />
          </BloomOnView>
        </div>
        {/* tape across the stem, holding it flat */}
        <WashiTape className="left-[26%] top-[61%] h-3.5 w-[38%] -rotate-[9deg]" />
        <WashiTape
          color="amber"
          className="left-[23%] top-[85%] h-3 w-[36%] rotate-[6deg]"
        />
      </div>
      <figcaption className="mt-3 font-hand text-base text-ink-soft">
        {specimen}
      </figcaption>
    </figure>
  );
}
