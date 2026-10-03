import type { Metadata } from "next";
import { profile } from "@/lib/data";
import { IntroLetter } from "@/components/about/IntroLetter";
import { Timeline } from "@/components/about/Timeline";
import { SkillsSection } from "@/components/about/SkillsSection";
import { OpenSourceSection } from "@/components/about/OpenSourceSection";

export const metadata: Metadata = {
  title: "About",
  description: `Who ${profile.name} is — the journey, the toolkit, and the writing.`,
};

export default function AboutPage() {
  return (
    <main className="relative">
      <IntroLetter />
      <Timeline />
      <SkillsSection />
      <OpenSourceSection />
    </main>
  );
}
