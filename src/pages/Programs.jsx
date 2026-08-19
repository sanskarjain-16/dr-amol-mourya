import { useEffect } from "react";
import ProgramsHero from "../components/sections/programs/ProgramsHero";
import ProgramGrid from "../components/sections/programs/ProgramGrid";
import ProgramsCTA from "../components/sections/programs/ProgramsCTA";

export default function Programs() {
  useEffect(() => {
    document.title = "Programs | Dr. Amol Mourya";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Explore Dr. Amol Mourya's comprehensive real estate growth programs, coaching, and consultation systems.");
    }
  }, []);

  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      <ProgramsHero />
      <ProgramGrid />
      <ProgramsCTA />
    </main>
  );
}
