import type { ReactNode } from "react";
import { milestones, openSource, profile, projects, skillGroups } from "@/lib/data";
import { hasRepo } from "@/lib/palette";
import { WashiTape } from "@/components/scrapbook/WashiTape";

/** Strip the protocol so links read cleanly on paper. */
function plainUrl(url: string) {
  return url.replace(/^https?:\/\/(www\.)?/, "");
}

function ResumeSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="mt-7">
      <h2 className="font-heading text-sm font-bold uppercase tracking-wider text-ink">
        {title}
      </h2>
      <div
        aria-hidden
        className="resume-accent mt-1 h-[3px] w-12 rounded-full bg-teal"
      />
      <div className="mt-3">{children}</div>
    </section>
  );
}

export function ResumeSheet() {
  const work = milestones.filter((m) => m.kind === "work").reverse();
  const education = milestones.filter((m) => m.kind === "education").reverse();
  const featured = projects.filter((p) => p.featured);

  return (
    <div className="resume-sheet relative mx-auto max-w-[794px] rotate-[-0.4deg] bg-white px-8 py-10 shadow-[0_1px_2px_rgba(58,47,47,0.06),0_18px_40px_-14px_rgba(58,47,47,0.3)] sm:px-12">
      <WashiTape
        color="amber"
        className="resume-accent -top-3 left-1/2 h-6 w-32 -translate-x-1/2 -rotate-1"
      />

      {/* Header */}
      <header>
        <h1 className="font-heading text-3xl font-bold text-ink">
          {profile.name}
        </h1>
        <p className="mt-0.5 font-hand text-2xl text-accent-deep">
          {profile.title}
        </p>
        <p className="mt-3 text-[13px] leading-relaxed text-ink/85">
          {profile.resumeSummary}
        </p>
        <p className="mt-2 text-xs text-ink-soft">
          {profile.email} · {profile.phone} · {profile.location} ·{" "}
          <a href={profile.socials.github} className="underline decoration-ink/30 underline-offset-2">
            {plainUrl(profile.socials.github)}
          </a>{" "}
          ·{" "}
          <a href={profile.socials.linkedin} className="underline decoration-ink/30 underline-offset-2">
            {plainUrl(profile.socials.linkedin)}
          </a>
        </p>
      </header>

      <ResumeSection title="Experience">
        <div className="space-y-4">
          {work.map((m) => (
            <div key={`${m.period}-${m.title}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                <h3 className="font-heading text-[15px] font-semibold text-ink">
                  {m.title} · <span className="font-normal">{m.org}</span>
                </h3>
                <span className="font-hand text-base text-ink-soft">
                  {m.period}
                </span>
              </div>
              {m.highlights && (
                <ul className="mt-1 space-y-0.5">
                  {m.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex gap-2 text-[13px] leading-snug text-ink/85"
                    >
                      <span aria-hidden className="text-teal-deep">
                        –
                      </span>
                      {h}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </ResumeSection>

      <ResumeSection title="Education">
        <div className="space-y-2">
          {education.map((m) => (
            <div
              key={`${m.period}-${m.org}`}
              className="flex flex-wrap items-baseline justify-between gap-x-3"
            >
              <p className="text-[13px] text-ink/85">
                <span className="font-semibold text-ink">{m.org}</span> —{" "}
                {m.detail}
              </p>
              <span className="font-hand text-base text-ink-soft">
                {m.period}
              </span>
            </div>
          ))}
        </div>
      </ResumeSection>

      <ResumeSection title="Skills">
        <div className="space-y-1">
          {skillGroups.map((g) => (
            <p key={g.label} className="text-[13px] leading-snug text-ink/85">
              <span className="font-semibold text-ink">{g.label}:</span>{" "}
              {g.items.join(", ")}
            </p>
          ))}
        </div>
      </ResumeSection>

      <ResumeSection title="Selected Projects">
        <div className="space-y-2">
          {featured.map((p) => (
            <div key={p.name}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                <h3 className="text-[13px] font-semibold text-ink">
                  {p.name}
                  {hasRepo(p) && (
                    <span className="ml-2 font-normal text-ink-soft">
                      {plainUrl(p.repo)}
                    </span>
                  )}
                </h3>
                <span className="font-hand text-base text-ink-soft">
                  {p.date}
                </span>
              </div>
              <p className="text-[13px] leading-snug text-ink/85">
                {p.blurb.split(". ")[0]}.
              </p>
            </div>
          ))}
        </div>
      </ResumeSection>

      <ResumeSection title="Open Source">
        <ul className="space-y-0.5">
          {openSource.map((item) => (
            <li
              key={item}
              className="flex gap-2 text-[13px] leading-snug text-ink/85"
            >
              <span aria-hidden className="text-teal-deep">
                –
              </span>
              {item}
            </li>
          ))}
        </ul>
      </ResumeSection>
    </div>
  );
}
