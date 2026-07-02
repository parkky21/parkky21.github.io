import type { Metadata } from "next";
import { projects } from "@/lib/data";
import { Sparkle } from "@/components/Doodles";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { SectionHeading } from "@/components/scrapbook/SectionHeading";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Voice agents, language models & multimodal experiments — the full stack of notes.",
};

export default function ProjectsPage() {
  return (
    <main className="relative mx-auto max-w-6xl px-5 py-16">
      <Sparkle className="absolute left-[6%] top-10 h-8 w-8 rotate-6 opacity-70" />
      <Sparkle
        className="absolute right-[8%] top-24 h-6 w-6 -rotate-12 opacity-60"
        color="var(--color-teal)"
      />

      <SectionHeading
        kicker="everything glued in so far"
        title="Projects"
        underline="var(--color-teal)"
      />

      <p className="mx-auto -mt-8 mb-14 max-w-lg text-center font-hand text-xl text-ink-soft">
        Notes from the lab — voice agents, language models &amp; multimodal
        experiments.
      </p>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <ProjectCard key={p.name} project={p} index={i} />
        ))}
      </div>
    </main>
  );
}
