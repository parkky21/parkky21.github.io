import { Hero } from "@/components/home/Hero";
import { IntroNote } from "@/components/home/IntroNote";
import { WritingSection } from "@/components/about/WritingSection";

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <IntroNote />
      <WritingSection />
    </main>
  );
}
