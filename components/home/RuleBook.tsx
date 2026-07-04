import { rulebook } from "@/lib/data";
import { Sparkle } from "@/components/Doodles";
import { Annotation } from "@/components/scrapbook/Annotation";
import { Reveal } from "@/components/scrapbook/Reveal";
import { SectionHeading } from "@/components/scrapbook/SectionHeading";
import { Sticker } from "@/components/scrapbook/Sticker";

/**
 * An open book lying on the scrapbook page — no page flips, just the spread.
 * The rules live in `rulebook` in lib/data.ts: first half on the left page,
 * second half on the right.
 */
export function RuleBook() {
  const mid = Math.ceil(rulebook.length / 2);
  const leftRules = rulebook.slice(0, mid);
  const rightRules = rulebook.slice(mid);

  return (
    <section className="relative mx-auto max-w-5xl px-5 py-16">
      {/* scattered decorations */}
      <Sparkle className="absolute left-[4%] top-10 h-7 w-7 -rotate-6 opacity-70" />
      <Sparkle
        className="absolute bottom-16 right-[5%] hidden h-6 w-6 rotate-12 opacity-70 md:block"
        color="var(--color-teal)"
      />
      <div
        aria-hidden
        className="absolute right-[8%] top-8 hidden select-none lg:block"
      >
        <Sticker rotate={6} tint="var(--color-note-pink)">
          <span className="font-hand text-lg font-bold text-ink/85">
            no exceptions
          </span>
          ✌️
        </Sticker>
      </div>

      <SectionHeading kicker="things I live by" title="The Rule Book" />

      <Reveal rotate={-1}>
        <div className="relative mx-auto max-w-3xl">
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

          {/* the open spread */}
          <div className="relative grid grid-cols-1 sm:grid-cols-2">
            {/* left page */}
            <div
              className="relative rounded-t-lg px-7 py-8 sm:rounded-l-lg sm:rounded-tr-none sm:px-8"
              style={{
                background:
                  "linear-gradient(to right, #fffdf6 90%, #f5eedf 98%, #e9e0cd 100%)",
              }}
            >
              <p className="mb-5 font-heading text-xs font-bold uppercase tracking-[0.2em] text-ink-soft">
                rules for building
              </p>
              <ol className="space-y-5">
                {leftRules.map((rule, i) => (
                  <li key={rule} className="flex gap-3">
                    <span className="font-hand text-2xl font-bold leading-none text-accent-deep">
                      {i + 1}.
                    </span>
                    <p className="font-hand text-xl leading-snug text-ink/85">
                      {rule}
                    </p>
                  </li>
                ))}
              </ol>
            </div>

            {/* right page */}
            <div
              className="relative rounded-b-lg px-7 py-8 sm:rounded-r-lg sm:rounded-bl-none sm:border-l sm:border-ink/10 sm:px-8"
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
                  clipPath:
                    "polygon(0 0, 100% 0, 100% 100%, 50% 84%, 0 100%)",
                }}
              />
              <p className="mb-5 font-heading text-xs font-bold uppercase tracking-[0.2em] text-ink-soft">
                &amp; rules for me
              </p>
              <ol className="space-y-5">
                {rightRules.map((rule, i) => (
                  <li key={rule} className="flex gap-3">
                    <span className="font-hand text-2xl font-bold leading-none text-accent-deep">
                      {mid + i + 1}.
                    </span>
                    <p className="font-hand text-xl leading-snug text-ink/85">
                      {rule}
                    </p>
                  </li>
                ))}
              </ol>
              <p className="mt-6 text-right font-hand text-lg text-ink-soft">
                — parkky ✌️
              </p>
            </div>
          </div>
        </div>
      </Reveal>

      <div className="mt-12 text-center">
        <Annotation tone="soft" className="rotate-1">
          scribbled over the years — still holding up 📖
        </Annotation>
      </div>
    </section>
  );
}
