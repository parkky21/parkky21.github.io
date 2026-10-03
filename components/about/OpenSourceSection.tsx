import { openSource } from "@/lib/data";
import { Arrow } from "@/components/Doodles";
import { PaperClip } from "@/components/scrapbook/Fasteners";
import { Reveal } from "@/components/scrapbook/Reveal";
import { SectionHeading } from "@/components/scrapbook/SectionHeading";
import { Stamp } from "@/components/scrapbook/Stamp";
import { BugSticker, HoloSticker } from "@/components/scrapbook/stickers";
import { Barcode } from "./Barcode";
import r from "./Receipt.module.css";

const isMerged = (item: string) => item.toLowerCase().includes("merged");

/**
 * Open source, kept like a receipt you'd clip into a journal: a till-roll
 * slip itemising each contribution with its status, a rubber MERGED stamp
 * on the one that landed upstream, and a paper clip holding it to the page.
 */
export function OpenSourceSection() {
  return (
    <section className="relative mx-auto max-w-3xl px-4 py-16 sm:px-5">
      <SectionHeading
        kicker="giving back"
        title="Open Source"
        underline="var(--color-teal)"
      />

      <Reveal rotate={-1.2}>
        <div className="relative mx-auto w-full max-w-[440px]">
          <PaperClip className="-top-7 left-10 h-16 w-6 rotate-[8deg]" />

          {/* stickers slapped on the slip's corners, clear of the printing */}
          <span className="absolute -right-1 -top-6 z-20 sm:-right-10 sm:-top-5">
            <HoloSticker rotate={8}>open source ♥</HoloSticker>
          </span>

          <div className="[filter:drop-shadow(0_1px_1px_rgba(58,47,47,0.2))_drop-shadow(0_14px_16px_rgba(40,25,10,0.16))]">
            <div
              className={`${r.receipt} paper-grain px-6 pb-9 pt-10 font-mono text-ink sm:px-8`}
              style={{ backgroundColor: "#fbf9f2" }}
            >
              <header className="text-center">
                <p className="text-sm font-bold uppercase tracking-[0.3em]">
                  ★ Open Source ★
                </p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-ink-soft">
                  contributions · paid in PRs
                </p>
              </header>

              <Rule />

              <ol className="space-y-5">
                {openSource.map((item, i) => (
                  <li key={item} className="relative">
                    <p className="flex gap-3 text-[13px] leading-relaxed text-ink/85">
                      <span aria-hidden className="shrink-0 font-bold text-ink-soft">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{item}</span>
                    </p>
                    <p className="mt-1.5 flex items-baseline gap-2 pl-8 text-[11px] uppercase tracking-[0.16em] text-ink-soft">
                      <span>status</span>
                      <span aria-hidden className="flex-1 border-b-2 border-dotted border-ink/25" />
                      <span className={`font-bold ${isMerged(item) ? "text-teal-deep" : "text-accent-deep"}`}>
                        {isMerged(item) ? "merged ✓" : "ongoing"}
                      </span>
                    </p>
                  </li>
                ))}
              </ol>

              <Rule />

              <p className="text-center text-[11px] uppercase tracking-[0.22em] text-ink-soft">
                thank you, maintainers
              </p>
              {/* barcode on the left, and the MERGED stamp thumped down in the blank beside it */}
              <div className="mt-4 flex items-center justify-between gap-3">
                <div aria-hidden>
                  <Barcode seed="open-source" bars={34} className="h-9 w-36 text-ink/80 sm:w-44" />
                  <p className="mt-1 text-[10px] tracking-[0.3em] text-ink-soft">keep this receipt</p>
                </div>
                {openSource.some(isMerged) && (
                  <span aria-hidden className="shrink-0">
                    <Stamp rotate={-12} color="var(--color-teal-deep)" className="px-3! py-1.5! text-[15px]!">
                      merged
                    </Stamp>
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* a margin note off to the side on wide screens */}
          <div
            aria-hidden
            className="absolute -left-48 top-[38%] hidden w-40 flex-col items-end lg:flex"
          >
            <span className="mb-1 inline-block">
              <BugSticker size={48} rotate={-10} />
            </span>
            <span className="-rotate-3 text-right font-hand text-xl leading-tight text-ink-soft">
              one less bug in the wild
            </span>
            <Arrow className="mt-1 h-8 w-10 -rotate-12" color="var(--color-ink-soft)" />
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/** the dashed tear-line a till prints between sections */
function Rule() {
  return <div aria-hidden className="my-5 border-t-2 border-dashed border-ink/25" />;
}
