import { profile } from "@/lib/data";
import {
  Arrow,
  ChipDoodle,
  LossCurve,
  NeuralNet,
  RobotDoodle,
  ScribbleUnderline,
  Sparkle,
} from "@/components/Doodles";
import { Annotation } from "@/components/scrapbook/Annotation";
import { PolaroidFrame } from "@/components/scrapbook/PolaroidFrame";
import { Reveal } from "@/components/scrapbook/Reveal";
import { Sticker } from "@/components/scrapbook/Sticker";
import { WashiTape } from "@/components/scrapbook/WashiTape";

export function Hero() {
  return (
    <section className="relative mx-auto flex min-h-[80vh] max-w-6xl items-center px-5 py-16">
      {/* scattered scrapbook decorations */}
      <WashiTape
        color="teal"
        className="left-[4%] top-[10%] hidden h-7 w-28 -rotate-[24deg] md:block"
      />
      <Sparkle className="absolute left-[8%] top-[24%] h-9 w-9 rotate-6 opacity-80" />
      <Sparkle
        className="absolute right-[10%] top-[16%] h-6 w-6 -rotate-12 opacity-70"
        color="var(--color-teal)"
      />
      <Arrow
        className="absolute bottom-[14%] right-[8%] hidden h-16 w-16 -rotate-12 opacity-60 lg:block"
        color="var(--color-teal)"
      />

      {/* AI-lab scatter — neurons, silicon, and a loss curve behaving itself */}
      <NeuralNet className="absolute right-[3%] top-[26%] hidden h-24 w-32 rotate-3 opacity-80 lg:block" />
      <Annotation
        tone="teal"
        className="absolute right-[4%] top-[48%] hidden -rotate-3 lg:block"
      >
        ↑ neurons, doing their thing
      </Annotation>
      <ChipDoodle className="absolute left-[3%] top-[44%] hidden h-16 w-16 -rotate-6 opacity-85 lg:block" />
      <RobotDoodle className="absolute bottom-[7%] left-[8%] hidden h-20 w-20 rotate-6 opacity-90 md:block" />
      <Annotation
        tone="soft"
        className="absolute bottom-[4%] left-[15%] hidden rotate-2 md:block"
      >
        hi, human 👋
      </Annotation>
      <LossCurve className="absolute bottom-[28%] right-[5%] hidden h-20 w-28 -rotate-2 lg:block" />

      {/* sticker pills */}
      <div
        aria-hidden
        className="absolute left-[16%] top-[7%] hidden select-none lg:block"
      >
        <Sticker rotate={-7} tint="var(--color-note-blue)">
          <span className="font-mono text-xs font-semibold text-ink/80">
            model.train()
          </span>
          🧠
        </Sticker>
      </div>
      <div
        aria-hidden
        className="absolute right-[6%] top-[3%] select-none md:right-[16%] md:top-[6%]"
      >
        <Sticker rotate={5} tint="var(--color-note-orange)">
          <span className="font-hand text-lg font-bold text-ink/85">
            gpu go brrr
          </span>
          🔥
        </Sticker>
      </div>
      <div
        aria-hidden
        className="absolute bottom-[9%] right-[24%] hidden select-none lg:block"
      >
        <Sticker rotate={-4} tint="var(--color-note-green)">
          <span className="font-hand text-lg font-bold text-ink/85">
            attention is all you need
          </span>
          📎
        </Sticker>
      </div>

      <div className="mx-auto flex w-full flex-col items-center gap-12 text-center md:flex-row md:justify-center md:gap-16 md:text-left">
        {/* Photo */}
        <Reveal rotate={-3} className="relative">
          <PolaroidFrame
            src={profile.photo || undefined}
            alt={`Photo of ${profile.name}`}
            caption={profile.photoCaption}
            rotate={0}
          />
          <Annotation
            tone="accent"
            className="absolute -bottom-9 right-0 hidden -rotate-3 md:block"
          >
            ↑ exhibit A
          </Annotation>
        </Reveal>

        {/* Text block */}
        <div className="flex flex-col items-center md:items-start">
          <Reveal delay={0.1}>
            <p className="mb-3 font-hand text-xl text-ink-soft">
              ✂️ pasted fresh into the scrapbook —
            </p>
            <div className="relative inline-block">
              <h1 className="font-heading text-5xl font-bold leading-tight text-ink sm:text-6xl lg:text-7xl">
                {profile.name}
              </h1>
              <ScribbleUnderline className="absolute -bottom-2 left-0 h-5 w-full" />
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <h2 className="mt-8 font-heading text-2xl font-semibold text-ink sm:text-3xl">
              <span className="highlight">{profile.title}</span>
            </h2>
          </Reveal>

          <Reveal delay={0.4}>
            <p className="mt-6 max-w-md font-hand text-2xl leading-snug text-ink/85">
              {profile.tagline}
            </p>
            <div className="mt-5 flex items-center justify-center gap-2 font-hand text-lg text-ink-soft md:justify-start">
              <span aria-hidden>📍</span>
              {profile.location}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
