import { skillGroups } from "@/lib/data";
import { Reveal } from "@/components/scrapbook/Reveal";
import { SectionHeading } from "@/components/scrapbook/SectionHeading";

/* Each pill gets its own hand-drawn SVG rect — no CSS border. */
function SketchPill({ label }: { label: string }) {
  return (
    <span className="relative inline-flex cursor-default px-3 py-1 transition-transform duration-200 hover:scale-105">
      <svg
        className="sketch pointer-events-none absolute inset-0 h-full w-full overflow-visible"
        preserveAspectRatio="none"
        aria-hidden
      >
        <rect
          x="1.5"
          y="1.5"
          width="calc(100% - 3px)"
          height="calc(100% - 3px)"
          rx="3"
          ry="3"
          fill="transparent"
          stroke="var(--color-ink)"
          strokeOpacity="0.35"
          strokeWidth="1.8"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <span className="relative text-sm text-ink/85">{label}</span>
    </span>
  );
}

export function SkillsSection() {
  return (
    <section className="relative mx-auto max-w-5xl px-5 py-16">
      <SectionHeading kicker="the toolkit" title="Skills" />

      <div className="divide-y divide-ink/10">
        {skillGroups.map((group, i) => (
          <Reveal key={group.label} delay={i * 0.05}>
            <div className="grid grid-cols-1 gap-4 py-7 sm:grid-cols-[200px_1fr] sm:gap-8">
              <p className="font-hand text-lg font-bold text-ink-soft sm:pt-0.5">
                {group.label}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <SketchPill key={item} label={item} />
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
