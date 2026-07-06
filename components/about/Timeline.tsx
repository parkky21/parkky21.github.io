import { milestones } from "@/lib/data";
import { Reveal } from "@/components/scrapbook/Reveal";
import { SectionHeading } from "@/components/scrapbook/SectionHeading";
import { Sticker } from "@/components/scrapbook/Sticker";
import { TornCard } from "@/components/scrapbook/TornCard";

export function Timeline() {
  return (
    <section className="relative mx-auto max-w-4xl px-5 py-16">
      <SectionHeading
        kicker="the journey so far"
        title="Career Path"
        underline="var(--color-teal)"
      />

      <div className="relative">
        {/* hand-drawn dashed spine */}
        <div
          aria-hidden
          className="sketch absolute bottom-2 left-4 top-2 border-l-2 border-dashed border-ink/25 sm:left-1/2"
        />

        <ol className="space-y-10">
          {milestones.map((m, i) => (
            <li key={`${m.period}-${m.org}`} className="relative pl-12 sm:pl-0">
              {/* dot on the spine */}
              <span
                aria-hidden
                className="absolute left-4 top-7 h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 border-paper shadow-sm sm:left-1/2"
                style={{
                  background:
                    m.kind === "education"
                      ? "var(--color-teal)"
                      : "var(--color-accent)",
                }}
              />

              <div
                className={`sm:w-[calc(50%-2.25rem)] ${
                  i % 2 === 1 ? "sm:ml-auto" : ""
                }`}
              >
                <Reveal rotate={i % 2 === 0 ? -1.2 : 1.2}>
                  <TornCard tint="#fffdf6" contentClassName="p-5">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <Sticker
                        rotate={i % 2 === 0 ? -2 : 2}
                        className={`font-hand text-sm font-bold ${
                          m.kind === "education"
                            ? "text-teal-deep"
                            : "text-accent-deep"
                        }`}
                      >
                        {m.kind === "education" ? "🎓 school" : "💼 work"}
                      </Sticker>
                      <span className="font-hand text-base text-ink-soft">
                        {m.period}
                      </span>
                    </div>

                    <h3 className="font-heading text-lg font-semibold text-ink">
                      {m.title}
                    </h3>
                    <p className="font-hand text-lg text-ink-soft">{m.org}</p>
                    <p className="mt-1.5 text-[15px] leading-snug text-ink/85">
                      {m.detail}
                    </p>

                    {m.highlights && (
                      <ul className="mt-3 space-y-1.5">
                        {m.highlights.map((h) => (
                          <li
                            key={h}
                            className="flex gap-2 text-sm leading-snug text-ink/80"
                          >
                            <span
                              aria-hidden
                              className="mt-0.5 text-accent-deep"
                            >
                              ✦
                            </span>
                            {h}
                          </li>
                        ))}
                      </ul>
                    )}
                  </TornCard>
                </Reveal>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
