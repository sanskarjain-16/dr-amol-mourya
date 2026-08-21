import { useEffect } from "react";
import ProgramsHero from "../components/sections/programs/ProgramsHero";
import DetailedProgramGrid from "../components/sections/programs/DetailedProgramGrid";
import ProcessSection from "../components/sections/programs/ProcessSection";

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
      <DetailedProgramGrid />
      <ProcessSection />
    </main>
  );
}
