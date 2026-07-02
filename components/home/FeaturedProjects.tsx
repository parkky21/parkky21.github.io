import Link from "next/link";
import { projects } from "@/lib/data";
import { ChipDoodle, Sparkle } from "@/components/Doodles";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Annotation } from "@/components/scrapbook/Annotation";
import { SectionHeading } from "@/components/scrapbook/SectionHeading";
import { Sticker } from "@/components/scrapbook/Sticker";

export function FeaturedProjects() {
  const featured = projects.filter((p) => p.featured);

  return (
    <section className="relative mx-auto max-w-5xl px-5 py-16">
      <ChipDoodle className="absolute right-[4%] top-6 hidden h-14 w-14 rotate-12 opacity-80 md:block" />
      <Sparkle className="absolute left-[3%] top-16 h-7 w-7 -rotate-6 opacity-70" />
      <div
        aria-hidden
        className="absolute right-[12%] top-14 hidden select-none lg:block"
      >
        <Sticker rotate={-5} tint="var(--color-note-yellow)">
          <span className="font-hand text-lg font-bold text-ink/85">
            evals passed
          </span>
          ✓
        </Sticker>
      </div>

      <SectionHeading kicker="from the lab" title="Featured Projects" />

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        {featured.map((p, i) => (
          <ProjectCard key={p.name} project={p} index={i} />
        ))}
      </div>

      <div className="mt-14 text-center">
        <Annotation tone="soft" className="mr-3">
          want the whole stack of notes?
        </Annotation>
        <Link
          href="/projects"
          className="inline-block rounded-full border-2 border-ink px-6 py-2.5 font-heading text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5 hover:-rotate-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          see all projects →
        </Link>
      </div>
    </section>
  );
}
