"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { profile } from "@/lib/data";
import { Sticker } from "./scrapbook/Sticker";

const links = [
  { href: "/", label: "home" },
  { href: "/projects", label: "projects" },
  { href: "/about", label: "about" },
  { href: "/resume", label: "resume" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <header className="no-print sticky top-0 z-50 border-b border-ink/10 bg-paper/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-y-1 px-3 py-3 sm:px-5">
        {/* Logo sticker */}
        <Link href="/" aria-label="Home">
          <Sticker
            rotate={-2}
            className="font-hand text-base font-bold text-ink sm:text-lg"
          >
            {profile.nickname || profile.name.split(" ")[0]}
            <span className="text-accent">✦</span>
          </Sticker>
        </Link>

        <nav className="flex items-center gap-3 sm:gap-6">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={`group relative py-1 font-hand text-base transition-colors sm:text-lg ${
                  active ? "text-ink" : "text-ink-soft hover:text-ink"
                }`}
              >
                {l.label}
                {/* washi-style underline bar */}
                <span
                  className={`pointer-events-none absolute -bottom-0.5 left-0 h-[5px] w-full -rotate-1 rounded-[1px] bg-accent transition-opacity duration-300 ${
                    active ? "opacity-60" : "opacity-0 group-hover:opacity-25"
                  }`}
                />
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
