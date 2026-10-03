import type { ComponentType } from "react";
import { skillGroups } from "@/lib/data";
import { Reveal } from "@/components/scrapbook/Reveal";
import { SectionHeading } from "@/components/scrapbook/SectionHeading";
import { WashiTape } from "@/components/scrapbook/WashiTape";
import {
  BrainSticker,
  BugSticker,
  RobotSticker,
  RocketSticker,
  SealSticker,
} from "@/components/scrapbook/stickers";
import { LabelTape, type TapeRoll } from "@/components/scrapbook/LabelTape";

/** one tape colour per skill group */
const GROUP_ROLLS: TapeRoll[] = ["ink", "red", "blue", "green", "teal", "yellow"];
import { LuggageTag } from "./LuggageTag";

/* the tiny wobble each label got when it was pressed down by hand */
const LABEL_TILTS = [-1.2, 0.8, -0.4, 1.4, -0.9, 0.3, 1, -1.5];

/* a sticker slapped on some tags, keyed by group label; unknown groups get none */
const TAG_STICKERS: Record<string, ComponentType<{ size?: number; rotate?: number }>> = {
  Programming: BugSticker,
  "AI & Machine Learning": BrainSticker,
  "Frameworks & Tools": RobotSticker,
  "Cloud & Deployment": RocketSticker,
};

/**
 * The toolkit, pressed out on a label maker: a sheet of kraft card taped
 * into the journal, each group a manila luggage tag with its skills punched
 * onto strips of embossed tape beside it — one tape roll per group.
 */
export function SkillsSection() {
  return (
    <section className="relative mx-auto max-w-5xl px-4 py-16 sm:px-5">
      <SectionHeading kicker="the toolkit" title="Skills" />

      <Reveal rotate={0.4}>
        <div className="paper-kraft relative px-5 pb-10 pt-10 shadow-[0_1px_2px_rgba(58,47,47,0.15),0_22px_38px_-20px_rgba(40,25,10,0.55)] sm:px-10 sm:pb-12 sm:pt-12">
          <WashiTape color="amber" className="-left-2 -top-1 h-7 w-20 -rotate-[32deg] sm:-left-4 sm:w-24" />
          <WashiTape color="teal" className="-right-2 -top-1 h-7 w-20 rotate-[32deg] sm:-right-4 sm:w-24" />

          <span className="absolute -bottom-10 right-6 z-20 hidden sm:block">
            <SealSticker
              id="skills-coffee"
              // the rim fits ~26 characters before the text laps itself
              ring="runs on coffee · mumbai · "
              center="☕"
              color="#c43d2b"
              size={96}
              rotate={10}
            />
          </span>

          <ul className="space-y-8 sm:space-y-7">
            {skillGroups.map((group, g) => {
              const roll = GROUP_ROLLS[g % GROUP_ROLLS.length];
              const TagSticker = TAG_STICKERS[group.label];
              return (
                <li
                  key={group.label}
                  className="grid grid-cols-1 items-start gap-x-8 gap-y-3 sm:grid-cols-[210px_minmax(0,1fr)]"
                >
                  {/* sticker sits beside the tag, not inside it — the tag's clip-path would cut it off */}
                  <div className={`relative ml-7 w-[190px] ${g % 2 ? "rotate-[1.2deg]" : "-rotate-[1.4deg]"}`}>
                    <LuggageTag>
                      <h3 className="font-hand text-[21px] font-bold leading-[1.05] text-ink">
                        {group.label}
                      </h3>
                    </LuggageTag>
                    {TagSticker && (
                      <span className="absolute -right-4 -top-4 z-10 hidden sm:block">
                        <TagSticker size={42} rotate={g % 2 ? -12 : 14} />
                      </span>
                    )}
                  </div>

                  <ul className="flex flex-wrap gap-x-2.5 gap-y-3 sm:pt-3.5">
                    {group.items.map((item, i) => (
                      <li key={item}>
                        <LabelTape roll={roll} rotate={LABEL_TILTS[(i + g * 3) % LABEL_TILTS.length]}>
                          {item}
                        </LabelTape>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
