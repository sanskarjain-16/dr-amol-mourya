import { Reveal } from "../../Reveal";
import { reviewsPageData } from "../../../data/reviews";

export default function ResultsHighlights() {
  return (
    <section className="py-16 md:py-24 px-6 md:px-12 bg-muted border-y border-border">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-border">
            {reviewsPageData.highlights.map((highlight, idx) => (
              <div key={idx} className="flex flex-col pt-8 md:pt-0 first:pt-0">
                <div className="text-5xl md:text-6xl font-display text-ink mb-2">
                  {highlight.value}
                  <span className="text-gold-soft">{highlight.suffix}</span>
                </div>
                <div className="text-sm md:text-base uppercase tracking-widest text-muted-foreground font-medium mt-2">
                  {highlight.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
