"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { profile } from "@/lib/data";
import { LabelTape } from "./scrapbook/LabelTape";
import { BoltSticker, StarSticker } from "./scrapbook/stickers";

/** each section is a divider tab cut from its own card stock */
const links = [
  { href: "/", label: "home", stock: "var(--color-note-yellow)" },
  { href: "/projects", label: "projects", stock: "var(--color-note-green)" },
  { href: "/about", label: "about", stock: "var(--color-note-pink)" },
];

/**
 * The top strip of the journal: a cream paper band with a tear-off
 * perforation along its bottom edge. The name is punched out on label-maker
 * tape; the pages are binder divider tabs standing up from that edge — the
 * open page's tab is pulled up tallest and sits in front of the others.
 */
export function Nav() {
  const pathname = usePathname();

  return (
    <header
      className="sticky top-0 z-50 bg-[#fdf6e7]/95 shadow-[0_8px_12px_-10px_rgba(58,47,47,0.35)] backdrop-blur-sm"
      style={{ backgroundImage: "var(--paper-grain)" }}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-end justify-between gap-3 px-3 sm:h-16 sm:px-5">
        <Link
          href="/"
          aria-label="Home"
          className="relative mb-3 self-end rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:mb-4"
        >
          <LabelTape rotate={-2} size="lg" cut className="scrap-tilt-hover">
            {profile.nickname || profile.name.split(" ")[0]}
            <span aria-hidden className="text-accent">
              ✦
            </span>
          </LabelTape>
          {/* a little star stuck half over the tape's end */}
          <span className="absolute -right-4 -top-3.5">
            <StarSticker size={26} rotate={14} />
          </span>
        </Link>

        <nav aria-label="Main" className="flex items-end self-stretch">
          {links.map((l, i) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={`group relative -ml-1 flex items-start justify-center rounded-t-[9px] border border-b-0 border-ink/15 px-3 pt-1.5 font-hand text-[17px] leading-none transition-[height,color] duration-200 first:ml-0 focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-accent motion-reduce:transition-none sm:-ml-1.5 sm:px-5 sm:text-lg ${
                  active
                    ? "h-10 font-bold text-ink shadow-[0_-2px_6px_rgba(58,47,47,0.14)] sm:h-11"
                    : "h-8 text-ink-soft shadow-[0_-1px_3px_rgba(58,47,47,0.1)] hover:h-9 hover:text-ink sm:h-9 sm:hover:h-10"
                }`}
                style={{
                  // later tabs tuck behind earlier ones, like staggered dividers
                  zIndex: active ? 20 : 10 - i,
                  backgroundColor: l.stock,
                  backgroundImage:
                    "var(--paper-grain), linear-gradient(180deg, rgba(255,255,255,0.35), transparent 40%)",
                }}
              >
                {l.label}
                {/* a bolt stuck on the open tab's corner, so it reads as "you are here" */}
                {active && (
                  <span className="absolute -right-2.5 -top-3">
                    <BoltSticker size={22} rotate={12} />
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* tear-off perforation along the strip's bottom edge */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[3px]"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(58,47,47,0.28) 1.1px, transparent 1.5px)",
          backgroundSize: "9px 3px",
        }}
      />
    </header>
  );
}
