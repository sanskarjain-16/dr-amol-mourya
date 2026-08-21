import { Reveal } from "../../Reveal";
import { programsPageData } from "../../../data/programs";
import { Link } from "react-router-dom";

export default function ProgramsCTA() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 bg-muted border-t border-border">
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
        <Reveal>
          <h2 className="text-3xl md:text-5xl font-display text-foreground mb-8">
            {programsPageData.cta.title}
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <Link
            to="/journey"
            className="inline-block px-8 py-4 bg-primary text-primary-foreground font-semibold uppercase tracking-widest text-sm hover:bg-primary/90 transition-colors rounded-md"
          >
            Start your journey
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
