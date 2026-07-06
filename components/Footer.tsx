import { profile } from "@/lib/data";
import { Arrow, Sparkle } from "./Doodles";
import { Reveal } from "./scrapbook/Reveal";

export function Footer() {
  return (
    <footer className="no-print relative mx-auto max-w-4xl px-5 pb-20 pt-16 text-center">
      <Sparkle className="absolute left-[10%] top-8 h-7 w-7 rotate-12 opacity-70" />
      <Arrow
        className="absolute right-[12%] top-6 hidden h-14 w-14 rotate-[120deg] opacity-60 sm:block"
        color="var(--color-teal)"
      />

      <Reveal>
        <h2 className="font-heading text-3xl font-bold text-ink sm:text-4xl">
          Let&apos;s make something together
        </h2>
        <p className="mx-auto mt-5 max-w-md font-hand text-xl text-ink-soft">
          Got an idea worth sticking in the scrapbook? I&apos;m always up for a
          good AI problem, a collaboration, or just a chat.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <a
            href={`mailto:${profile.email}`}
            className="rounded-full bg-ink px-7 py-3 font-heading text-sm font-semibold text-paper transition-transform hover:-translate-y-1 hover:rotate-[-1deg] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            ✉ Email me
          </a>
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border-2 border-ink px-7 py-3 font-heading text-sm font-semibold text-ink transition-transform hover:-translate-y-1 hover:rotate-[1deg] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            GitHub
          </a>
          <a
            href={profile.socials.linkedin}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border-2 border-ink px-7 py-3 font-heading text-sm font-semibold text-ink transition-transform hover:-translate-y-1 hover:rotate-[-1deg] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            LinkedIn
          </a>
        </div>

        <div className="mt-10 flex flex-col items-center gap-1 font-hand text-lg text-ink-soft">
          <span>{profile.email}</span>
          <span>
            {profile.phone} · {profile.location}
          </span>
        </div>

        <p className="mt-12 font-hand text-base text-ink-soft/70">
          ✂️ Cut, taped &amp; glued with Next.js — {new Date().getFullYear()}{" "}
          {profile.name}
        </p>
      </Reveal>
    </footer>
  );
}
