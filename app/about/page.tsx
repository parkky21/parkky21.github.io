import type { Metadata } from "next";
import { profile } from "@/lib/data";
import { Timeline } from "@/components/about/Timeline";
import { SkillsSection } from "@/components/about/SkillsSection";
import { OpenSourceSection } from "@/components/about/OpenSourceSection";
import { Annotation } from "@/components/scrapbook/Annotation";
import { PolaroidFrame } from "@/components/scrapbook/PolaroidFrame";
import { Reveal } from "@/components/scrapbook/Reveal";
import { TornCard } from "@/components/scrapbook/TornCard";
import { WashiTape } from "@/components/scrapbook/WashiTape";

export const metadata: Metadata = {
  title: "About",
  description: `Who ${profile.name} is — the journey, the toolkit, and the writing.`,
};

export default function AboutPage() {
  return (
    <main className="relative">
      {/* Intro: polaroid + torn intro card */}
      <section className="mx-auto flex max-w-4xl flex-col items-center gap-10 px-5 pb-8 pt-16 sm:flex-row sm:items-start sm:gap-12">
        <Reveal rotate={2} className="relative shrink-0">
          <PolaroidFrame
            src={profile.photo || undefined}
            alt={`Photo of ${profile.name}`}
            caption={profile.photoCaption}
            rotate={0}
            width={210}
          />
          <Annotation
            tone="teal"
            className="absolute -bottom-9 left-2 hidden -rotate-2 sm:block"
          >
            hi again ✌️
          </Annotation>
        </Reveal>

        <Reveal delay={0.15} rotate={-0.8} className="w-full">
          <TornCard tint="#fffdf6" contentClassName="px-7 py-8 sm:px-9">
            <WashiTape
              color="kraft"
              className="-top-3 right-10 h-6 w-24 rotate-3"
            />
            <h1 className="font-heading text-3xl font-bold text-ink sm:text-4xl">
              About me
            </h1>
            <p className="mt-4 font-hand text-2xl leading-relaxed text-ink/90">
              {profile.introAbout}
            </p>
          </TornCard>
        </Reveal>
      </section>

      <Timeline />
      <SkillsSection />
      <OpenSourceSection />
    </main>
  );
}
