import ProgramsHero from "../components/sections/programs/ProgramsHero";
import DetailedProgramGrid from "../components/sections/programs/DetailedProgramGrid";
import ProcessSection from "../components/sections/programs/ProcessSection";
import { Helmet } from "react-helmet-async";

export default function Programs() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      <Helmet>
        <title>Programs | Dr. Amol Mourya</title>
        <meta name="description" content="Explore Dr. Amol Mourya's comprehensive real estate growth programs, coaching, and consultation systems." />
      </Helmet>
      <ProgramsHero />
      <DetailedProgramGrid />
      <ProcessSection />
    </main>
  );
}
