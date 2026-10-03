import type { Metadata } from "next";
import type { ReactNode } from "react";
import { profile, projects } from "@/lib/data";
import { Arrow } from "@/components/Doodles";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { BtwinusSpread } from "@/components/projects/BtwinusSpread";
import { FieldSection } from "@/components/projects/field/FieldSection";
import { LabelTape } from "@/components/scrapbook/LabelTape";
import { SectionHeading } from "@/components/scrapbook/SectionHeading";
import { Stamp } from "@/components/scrapbook/Stamp";
import { WashiTape } from "@/components/scrapbook/WashiTape";
import { RocketSticker, SealSticker } from "@/components/scrapbook/stickers";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Voice agents, language models & multimodal experiments, plus an indie product and the next quest.",
};

const city = profile.location.split(",")[0];

export default function ProjectsPage() {
  return (
    <main className="relative mx-auto max-w-6xl px-5 py-16">
      <header className="relative mx-auto max-w-3xl">
        {/* someone set a mug down on the desk while sorting the files */}
        <span aria-hidden className="coffee-ring -left-6 -top-8 hidden h-40 w-40 opacity-70 sm:block" />
        {/* stickers flanking the title, slapped on like a laptop lid */}
        <span aria-hidden className="absolute left-2 top-6 hidden sm:block lg:-left-6">
          <SealSticker id="projects-seal" ring="built · broken · rebuilt · " center="🛠️" rotate={-8} />
        </span>
        <span aria-hidden className="absolute right-6 top-28 hidden sm:block lg:-right-2">
          <RocketSticker size={58} rotate={14} />
        </span>
        {/* phones: no margin to flank the title, so one small sticker beside it */}
        <span aria-hidden className="absolute right-0 top-14 sm:hidden">
          <RocketSticker size={42} rotate={14} />
        </span>
        {/* the lab's postmark, inked in the margin */}
        <span aria-hidden className="absolute -top-2 right-0 hidden sm:block lg:-right-10">
          <Stamp round rotate={12} color="var(--color-teal-deep)" className="w-[96px]">
            {city}
            <br />★ lab ★
            <br />
            2024–26
          </Stamp>
        </span>

        <SectionHeading
          as="h1"
          kicker="everything glued in so far"
          title="Projects"
          underline="var(--color-teal)"
        />

        <TypedSlip>
          Notes from the lab — voice agents, language models &amp; multimodal
          experiments.
        </TypedSlip>
      </header>

      <BtwinusSpread />

      <section aria-labelledby="board-title">
        <h2 id="board-title" className="sr-only">
          Project board
        </h2>

        {/* the drawer's label, and a margin note on how to read it */}
        <div aria-hidden className="mb-8 flex flex-wrap items-center gap-x-4 gap-y-1 sm:mb-10">
          <LabelTape rotate={-1.5}>
            Lab files · {String(projects.length).padStart(2, "0")}
          </LabelTape>
          <span className="flex items-center gap-1 font-hand text-xl text-ink-soft">
            each with its sketch clipped on
            <Arrow className="h-8 w-9 translate-y-2 rotate-[20deg]" />
          </span>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <ProjectCard key={p.name} project={p} index={i} />
          ))}
        </div>
      </section>

      <FieldSection />
    </main>
  );
}

/**
 * The page's one-line description, typed on a strip of old paper and taped
 * down at both ends with masking tape.
 */
function TypedSlip({ children }: { children: ReactNode }) {
  return (
    <div className="-mt-6 mb-16 flex justify-center px-5 sm:px-2">
      <p className="paper-aged relative max-w-lg -rotate-[0.8deg] px-6 py-3 text-center font-mono text-[13px] leading-relaxed text-ink/85 shadow-[0_1px_2px_rgba(58,47,47,0.14),0_10px_18px_-12px_rgba(40,25,10,0.4)] sm:text-sm">
        <WashiTape className="-left-4 top-1/2 h-5 w-12 -translate-y-1/2 -rotate-[70deg]" />
        <WashiTape className="-right-4 top-1/2 h-5 w-12 -translate-y-1/2 rotate-[75deg]" />
        {children}
      </p>
    </div>
  );
}
