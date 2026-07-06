import { Hero } from "@/components/home/Hero";
import { RuleBook } from "@/components/home/RuleBook";
import { WritingSection } from "@/components/about/WritingSection";

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <RuleBook />
      <WritingSection />
    </main>
  );
}
