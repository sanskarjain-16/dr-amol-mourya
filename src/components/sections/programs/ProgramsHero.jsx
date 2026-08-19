import { Reveal } from "../../Reveal";
import { programsPageData } from "../../../data/programs";

export default function ProgramsHero() {
  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-24 px-6 md:px-12 bg-ink text-white">
      <div className="max-w-4xl mx-auto text-center">
        <Reveal>
          <span className="eyebrow text-gold-soft mb-6 block">
            {programsPageData.hero.eyebrow}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-display mb-8 leading-tight">
            {programsPageData.hero.title}
          </h1>
          <p className="text-lg md:text-xl text-white/80 font-light max-w-2xl mx-auto leading-relaxed">
            {programsPageData.hero.description}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
