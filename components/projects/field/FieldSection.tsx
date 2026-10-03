import { fieldNote } from "@/lib/data";
import { Reveal } from "@/components/scrapbook/Reveal";
import { SectionHeading } from "@/components/scrapbook/SectionHeading";
import { TornCard } from "@/components/scrapbook/TornCard";
import { WashiTape } from "@/components/scrapbook/WashiTape";
import FieldSVG from "./FieldSVG";
import { FieldArt } from "./FieldArt";
import s from "./FieldSection.module.css";

/** The next quest: the original engraved Field, pasted into the scrapbook on a yellow note. */
export function FieldSection() {
  return (
    <section aria-labelledby="field-title" className="mt-24">
      <SectionHeading
        id="field-title"
        kicker={fieldNote.kicker}
        title={fieldNote.title}
        underline="var(--color-teal)"
      />

      {/* tint reads --vellum (see .theme) so the SVG hill mask is always seamless. Untilted:
          the "on duty" tooltip is positioned from viewport rects, which a rotation would skew. */}
      <TornCard
        tint="var(--vellum)"
        className={s.theme}
        contentClassName="px-3 pt-8 pb-10 sm:px-6"
      >
        <WashiTape color="teal" className="-top-3 left-8 h-6 w-28 -rotate-6" />
        <WashiTape color="kraft" className="-top-3 right-8 h-6 w-28 rotate-6" />

        {/* not wrapped in Reveal: the art runs its own draw-on */}
        <FieldArt className={s.art}>
          <FieldSVG />
        </FieldArt>

        <div className="mx-auto mt-10 max-w-xl px-2 text-center">
          <Reveal delay={0.12}>
            <p className="font-hand text-2xl leading-snug text-ink sm:text-3xl">
              {fieldNote.pull.split(/(?<=\.)\s+/).map((sentence) => (
                <span key={sentence} className={s.pullLine}>
                  {sentence}{" "}
                </span>
              ))}
            </p>
          </Reveal>
          <span aria-hidden="true" className="mx-auto my-6 block h-px w-10 bg-kraft" />
          <Reveal delay={0.2}>
            <p className="text-[15px] italic leading-relaxed text-ink-soft">{fieldNote.someday}</p>
          </Reveal>
        </div>
      </TornCard>
    </section>
  );
}
