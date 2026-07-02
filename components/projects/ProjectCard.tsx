import type { Project } from "@/lib/data";
import { hasRepo, noteTint } from "@/lib/palette";
import { Reveal } from "@/components/scrapbook/Reveal";
import { TornCard } from "@/components/scrapbook/TornCard";
import { WashiTape } from "@/components/scrapbook/WashiTape";

const tilts = [-1.8, 1.4, -1.1, 2.2, -1.5, 1];
const tapes = ["amber", "teal", "kraft"] as const;

export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <Reveal
      delay={(index % 3) * 0.08}
      rotate={tilts[index % tilts.length]}
      className="h-full"
    >
      <div className="h-full transition-transform duration-300 hover:-translate-y-1.5">
        <TornCard
          tint={noteTint[project.color]}
          className="h-full"
          contentClassName="flex h-full flex-col p-6"
        >
          <WashiTape
            color={tapes[index % tapes.length]}
            className="-top-3 left-1/2 h-6 w-24 -translate-x-1/2 -rotate-2"
          />

          <div className="mb-1.5 flex items-start justify-between gap-2">
            <h3 className="font-heading text-lg font-semibold leading-tight text-ink">
              {project.name}
            </h3>
            {hasRepo(project) && (
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                aria-label={`GitHub repo for ${project.name}`}
                className="shrink-0 rounded-full border border-ink/25 bg-white/60 px-2.5 py-1 font-hand text-sm font-bold text-ink/70 transition-colors hover:border-ink hover:bg-white hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                GitHub ↗
              </a>
            )}
          </div>

          <p className="font-hand text-base font-bold text-ink-soft">
            {project.date}
          </p>

          <p className="mt-3 text-[15px] leading-snug text-ink/85">
            {project.blurb}
          </p>

          <div className="mt-auto flex flex-wrap gap-2 pt-4">
            {project.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-ink/20 bg-white/50 px-2.5 py-0.5 text-xs font-semibold text-ink/80"
              >
                {t}
              </span>
            ))}
          </div>
        </TornCard>
      </div>
    </Reveal>
  );
}
