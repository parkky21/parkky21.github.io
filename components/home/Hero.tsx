import { hero, profile } from "@/lib/data";
import {
  Arrow,
  CatPeekDoodle,
  ChipDoodle,
  LossCurve,
  NeuralNet,
  RobotDoodle,
  ScribbleUnderline,
  Sparkle,
} from "@/components/Doodles";
import { Annotation } from "@/components/scrapbook/Annotation";
import { PaperScrap } from "@/components/scrapbook/PaperScrap";
import { PolaroidFrame } from "@/components/scrapbook/PolaroidFrame";
import { Reveal } from "@/components/scrapbook/Reveal";
import { Sticker } from "@/components/scrapbook/Sticker";
import { TornCard } from "@/components/scrapbook/TornCard";
import { WashiTape } from "@/components/scrapbook/WashiTape";

export function Hero() {
  return (
    <section className="relative mx-auto flex min-h-[80vh] max-w-6xl items-center px-5 py-16">
      {/* ----------------------------------------------------------------
          Scrapbook collage — everything hugs the edges so the center
          column (polaroid + name) always breathes. Bigger paper scraps
          only appear at xl, where the side gutters are wide enough.
          ---------------------------------------------------------------- */}

      {/* torn note, top-left: the crossed-out list of old approaches */}
      <div
        aria-hidden
        className="absolute left-[1.5%] top-[6%] hidden select-none xl:block"
      >
        <TornCard
          tint="var(--color-note-yellow)"
          rotate={-5}
          hoverTilt
          className="w-44"
          contentClassName="px-4 py-4"
        >
          <WashiTape
            color="kraft"
            className="-top-2.5 left-1/2 h-5 w-16 -translate-x-1/2 rotate-2"
          />
          {hero.oldApproaches.map((line) => (
            <p
              key={line}
              className="font-hand text-base font-bold text-ink/55 line-through decoration-2"
            >
              {line}
            </p>
          ))}
          <p className="mt-2 font-hand text-lg font-bold leading-tight text-accent-deep">
            {hero.realization}
          </p>
        </TornCard>
      </div>

      {/* quote note, bottom-right: torn scrap with a hand-written motto */}
      <div
        aria-hidden
        className="absolute bottom-[5%] right-[2%] hidden select-none xl:block"
      >
        <TornCard
          tint="#fffdf6"
          rotate={2}
          hoverTilt
          className="w-48"
          contentClassName="px-5 py-5"
        >
          <WashiTape color="teal" className="-top-2.5 right-6 h-5 w-16 rotate-6" />
          <p className="font-hand text-xl leading-snug text-ink/85">
            “{hero.quote}”
          </p>
        </TornCard>
      </div>
      <Arrow
        className="absolute bottom-[13%] right-[20%] hidden h-14 w-14 rotate-[30deg] opacity-60 xl:block"
        color="var(--color-teal)"
      />

      {/* torn paper cutout, left edge below the note */}
      <PaperScrap
        tint="var(--color-note-green)"
        rotate={-8}
        className="absolute left-[11%] top-[36%] hidden xl:block"
        lines={3}
      />

      {/* airmail stamp, left edge */}
      <div
        aria-hidden
        className="absolute bottom-[22%] left-[2.5%] hidden rotate-6 select-none border-2 border-dashed border-ink/30 bg-white/80 p-2 shadow-[0_2px_6px_rgba(58,47,47,0.15)] lg:block"
      >
        <RobotDoodle className="h-10 w-10" />
        <p className="mt-1 text-center font-hand text-xs font-bold tracking-wide text-ink/60">
          {hero.airmailLabel}
        </p>
      </div>

      {/* washi + sparkles scattered along the top */}
      <WashiTape
        color="teal"
        className="left-[36%] top-[5%] hidden h-7 w-28 -rotate-[24deg] md:block"
      />
      <WashiTape
        color="amber"
        className="right-[3%] top-[20%] hidden h-6 w-24 rotate-[18deg] lg:block"
      />
      <Sparkle className="absolute left-[8%] top-[26%] hidden h-9 w-9 rotate-6 opacity-80 md:block" />
      <Sparkle
        className="absolute right-[10%] top-[14%] h-6 w-6 -rotate-12 opacity-70"
        color="var(--color-teal)"
      />
      <Sparkle
        className="absolute bottom-[8%] left-[30%] hidden h-6 w-6 rotate-12 opacity-70 lg:block"
        color="var(--color-teal)"
      />

      {/* AI-lab scatter — neurons, silicon, and a loss curve behaving itself.
          These sit close to the text column's right edge, so they wait for
          xl: below that, the section is narrower than its max-w cap and
          there isn't enough gutter yet. */}
      <NeuralNet className="absolute right-[2%] top-[26%] hidden h-24 w-32 rotate-3 opacity-80 xl:block" />
      <Annotation
        tone="teal"
        className="absolute right-[3%] top-[44%] hidden -rotate-3 xl:block"
      >
        {hero.annotations.neurons}
      </Annotation>
      <ChipDoodle className="absolute left-[3%] top-[44%] hidden h-16 w-16 -rotate-6 opacity-85 lg:block" />
      <RobotDoodle className="absolute bottom-[7%] left-[8%] hidden h-20 w-20 rotate-6 opacity-90 md:block" />
      <Annotation
        tone="soft"
        className="absolute bottom-[4%] left-[15%] hidden rotate-2 md:block"
      >
        {hero.annotations.hiHuman}
      </Annotation>
      <LossCurve className="absolute bottom-[36%] right-[3%] hidden h-20 w-28 -rotate-2 xl:block" />

      {/* sticker pills */}
      <div
        aria-hidden
        className="absolute left-[16%] top-[7%] hidden select-none lg:block"
      >
        <Sticker rotate={-7} tint="var(--color-note-blue)">
          <span className="font-mono text-xs font-semibold text-ink/80">
            {hero.stickers.modelTrain.text}
          </span>
          {hero.stickers.modelTrain.emoji}
        </Sticker>
      </div>
      <div
        aria-hidden
        className="absolute right-[6%] top-[3%] select-none md:right-[16%] md:top-[6%]"
      >
        <Sticker rotate={5} tint="var(--color-note-orange)">
          <span className="font-hand text-lg font-bold text-ink/85">
            {hero.stickers.gpuBrrr.text}
          </span>
          {hero.stickers.gpuBrrr.emoji}
        </Sticker>
      </div>
      <div
        aria-hidden
        className="absolute right-[34%] top-[3%] hidden select-none lg:block"
      >
        <Sticker rotate={-4} tint="var(--color-note-pink)">
          <span className="font-hand text-lg font-bold text-ink/85">
            {hero.stickers.shipIt.text}
          </span>
          {hero.stickers.shipIt.emoji}
        </Sticker>
      </div>
      <div
        aria-hidden
        className="absolute bottom-[27%] right-[5%] hidden select-none xl:block"
      >
        <Sticker rotate={4} tint="var(--color-note-yellow)">
          <span className="font-hand text-lg font-bold text-ink/85">
            {hero.stickers.lossVibes.text}
          </span>
          {hero.stickers.lossVibes.emoji}
        </Sticker>
      </div>
      <div
        aria-hidden
        className="absolute bottom-[9%] right-[24%] hidden select-none lg:block"
      >
        <Sticker rotate={-4} tint="var(--color-note-green)">
          <span className="font-hand text-lg font-bold text-ink/85">
            {hero.stickers.attention.text}
          </span>
          {hero.stickers.attention.emoji}
        </Sticker>
      </div>

      <div className="mx-auto flex w-full flex-col items-center gap-12 text-center md:flex-row md:justify-center md:gap-16 md:text-left">
        {/* Photo */}
        <Reveal rotate={-3} className="relative">
          <CatPeekDoodle className="absolute -top-8 left-1/2 hidden h-9 w-24 -translate-x-1/2 md:block" />
          <PolaroidFrame
            src={profile.photo || undefined}
            alt={`Photo of ${profile.name}`}
            caption={profile.photoCaption}
            rotate={0}
            hoverTilt
          />
          <Annotation
            tone="accent"
            className="absolute -bottom-9 right-0 hidden -rotate-3 md:block"
          >
            {hero.annotations.exhibitA}
          </Annotation>
        </Reveal>

        {/* Text block */}
        <div className="flex flex-col items-center md:items-start">
          <Reveal delay={0.1}>
            <p className="mb-3 font-hand text-xl text-ink-soft">
              {hero.kicker}
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
