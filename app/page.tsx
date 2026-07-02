import { Hero } from "@/components/home/Hero";
import { IntroNote } from "@/components/home/IntroNote";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <IntroNote />
      <FeaturedProjects />
    </main>
  );
}
