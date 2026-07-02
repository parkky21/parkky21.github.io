import { profile } from "@/lib/data";
import { CircleScribble, RobotDoodle, Sparkle } from "@/components/Doodles";
import { Reveal } from "@/components/scrapbook/Reveal";
import { Sticker } from "@/components/scrapbook/Sticker";
import { TornCard } from "@/components/scrapbook/TornCard";
import { WashiTape } from "@/components/scrapbook/WashiTape";

export function IntroNote() {
  return (
    <section className="relative mx-auto max-w-3xl px-5 py-14">
      {/* a robot peeking at the note + a sticker slapped on the corner */}
      <RobotDoodle className="absolute -top-2 right-[6%] hidden h-14 w-14 -rotate-12 opacity-80 md:block" />
      <Sparkle
        className="absolute bottom-[18%] left-[2%] h-7 w-7 rotate-12 opacity-70"
        color="var(--color-teal)"
      />
      <div
        aria-hidden
        className="absolute bottom-[8%] right-[3%] z-10 hidden select-none md:block"
      >
        <Sticker rotate={6} tint="var(--color-note-pink)">
          <span className="font-hand text-lg font-bold text-ink/85">
            runs on chai + CUDA
          </span>
          ☕
        </Sticker>
      </div>
      <Reveal rotate={-1}>
        <TornCard
          tint="var(--color-note-yellow)"
          contentClassName="px-7 py-10 text-center sm:px-10"
        >
          <WashiTape
            color="amber"
            className="-top-3.5 left-1/2 h-7 w-28 -translate-x-1/2 -rotate-2"
          />

          <p className="font-hand text-2xl leading-relaxed text-ink/90">
            {profile.intro}
          </p>

          <div className="relative mt-7 inline-block">
            <span className="font-hand text-2xl font-bold text-accent-deep">
              {profile.introCircle}
            </span>
            <CircleScribble className="absolute -inset-x-7 -inset-y-3 h-[calc(100%+1.5rem)] w-[calc(100%+3.5rem)]" />
          </div>
        </TornCard>
      </Reveal>
    </section>
  );
}
