import { programsPageData } from "../../../data/programs";
import ProgramCard from "./ProgramCard";

export default function ProgramGrid() {
  return (
    <section className="py-16 md:py-24 px-6 md:px-12 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programsPageData.items.map((program, index) => (
            <ProgramCard 
              key={program.title} 
              program={program} 
              index={index} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}
