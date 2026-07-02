import { blogs } from "@/lib/data";
import { Reveal } from "@/components/scrapbook/Reveal";
import { SectionHeading } from "@/components/scrapbook/SectionHeading";
import { TornCard } from "@/components/scrapbook/TornCard";
import { WashiTape } from "@/components/scrapbook/WashiTape";

const TINTS = ["#fffdf4", "#f4f0e4"];
const FOLD_COLORS = ["#f5d9ac", "#cde6e2"];

export function WritingSection() {
  return (
    <section className="relative mx-auto max-w-5xl px-5 py-16">
      <SectionHeading kicker="from the notebook" title="Writing" />

      <div className="flex flex-col items-center gap-8 sm:flex-row sm:flex-wrap sm:justify-center">
        {blogs.map((b, i) => (
          <BlogCard
            key={b.title}
            blog={b}
            index={i}
            tint={TINTS[i % TINTS.length]}
            foldColor={FOLD_COLORS[i % FOLD_COLORS.length]}
          />
        ))}
      </div>
    </section>
  );
}

function BlogCard({
  blog,
  index,
  tint,
  foldColor,
}: {
  blog: { title: string; link?: string };
  index: number;
  tint: string;
  foldColor: string;
}) {
  const tilt = index % 2 === 0 ? -1.2 : 1.4;

  return (
    <Reveal rotate={tilt} delay={index * 0.1} className="w-full sm:w-[320px]">
      <a
        href={blog.link ?? "#"}
        target={blog.link && blog.link !== "#" ? "_blank" : undefined}
        rel="noreferrer"
        aria-label={blog.title}
        className="group block transition-transform duration-300 hover:-translate-y-1.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      >
        <TornCard tint={tint} contentClassName="px-6 pb-8 pt-5">
          <WashiTape
            color={index % 2 === 0 ? "amber" : "teal"}
            className="-top-3 left-8 h-6 w-20 -rotate-6"
          />

          {/* Ruled notebook lines */}
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            preserveAspectRatio="none"
            aria-hidden
          >
            {[38, 58, 78, 98, 118, 138, 158].map((y) => (
              <line
                key={y}
                x1="20"
                y1={`${y}%`}
                x2="96%"
                y2={`${y}%`}
                stroke="var(--color-ink)"
                strokeOpacity="0.07"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
            ))}
            {/* margin rule */}
            <line
              x1="18%"
              y1="0"
              x2="18%"
              y2="100%"
              stroke="var(--color-accent)"
              strokeOpacity="0.35"
              strokeWidth="1.2"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {/* Dog-ear fold — top-right corner */}
          <div className="sketch absolute right-0 top-0 h-10 w-10" aria-hidden>
            <svg viewBox="0 0 40 40" className="h-full w-full">
              <path d="M40 0 L40 40 L0 0 Z" fill={foldColor} opacity="0.7" />
              <line
                x1="0"
                y1="0"
                x2="40"
                y2="40"
                stroke="var(--color-ink)"
                strokeOpacity="0.18"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <span
            className="mb-3 block font-hand text-xl text-ink/40"
            aria-hidden
          >
            ✎
          </span>

          <h3 className="relative z-10 font-heading text-lg font-semibold leading-snug text-ink sm:text-xl">
            {blog.title}
          </h3>

          <div className="mt-5 flex items-center gap-2 font-hand text-base text-ink-soft transition-colors group-hover:text-ink">
            <span>read it</span>
            <span className="inline-block transition-transform group-hover:translate-x-1">
              →
            </span>
          </div>
        </TornCard>
      </a>
    </Reveal>
  );
}
