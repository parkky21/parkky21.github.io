import { openSource } from "@/lib/data";
import { Reveal } from "@/components/scrapbook/Reveal";
import { SectionHeading } from "@/components/scrapbook/SectionHeading";
import { Sticker } from "@/components/scrapbook/Sticker";
import { TornCard } from "@/components/scrapbook/TornCard";
import { WashiTape } from "@/components/scrapbook/WashiTape";

export function OpenSourceSection() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-16">
      <SectionHeading
        kicker="giving back"
        title="Open Source"
        underline="var(--color-teal)"
      />

      <Reveal rotate={-0.8}>
        <TornCard tint="#f3ead6" contentClassName="px-7 py-8 sm:px-9">
          <WashiTape
            color="teal"
            className="-top-3 left-8 h-6 w-24 -rotate-6"
          />

          <ul className="space-y-4">
            {openSource.map((item) => (
              <li key={item} className="flex flex-wrap items-start gap-2">
                <span aria-hidden className="mt-1 text-teal-deep">
                  ✦
                </span>
                <span className="flex-1 text-[15px] leading-relaxed text-ink/85">
                  {item}
                </span>
                {item.toLowerCase().includes("merged") && (
                  <Sticker
                    rotate={3}
                    className="font-hand text-sm font-bold text-teal-deep"
                  >
                    merged ✓
                  </Sticker>
                )}
              </li>
            ))}
          </ul>
        </TornCard>
      </Reveal>
    </section>
  );
}
