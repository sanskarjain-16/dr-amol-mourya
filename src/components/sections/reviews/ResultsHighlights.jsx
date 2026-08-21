import { Reveal } from "../../Reveal";
import { reviewsPageData } from "../../../data/reviews";
import CountUp from "../../ui/CountUp";

export default function ResultsHighlights() {
  return (
    <section className="py-16 md:py-24 px-6 md:px-12 bg-muted border-y border-border">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-border">
            {reviewsPageData.highlights.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 100} className="text-center">
                <div className="text-5xl md:text-6xl font-sans font-extrabold tracking-tight text-ink mb-2">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm md:text-base uppercase tracking-widest text-muted-foreground font-medium mt-2">
                  {stat.label}
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
