import { useCallback, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "../../../data/site";
import SectionHeading from "../../ui/SectionHeading";

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const trackRef = useRef(null);

  const goTo = useCallback((i) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = (i + testimonials.length) % testimonials.length;
    setIndex(clamped);
    const child = track.children[clamped];
    child?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, []);

  return (
    <section id="reviews" className="bg-secondary py-16 sm:py-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow="What Students Say" title="Voices from the field" align="center" />

        <div
          ref={trackRef}
          role="group"
          aria-label="Student testimonials"
          onScroll={(e) => {
            const el = e.currentTarget;
            const i = Math.round(el.scrollLeft / (el.clientWidth * 0.86));
            if (i !== index) setIndex(Math.min(i, testimonials.length - 1));
          }}
          className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 lg:grid lg:grid-cols-3 lg:overflow-visible"
        >
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="w-[86%] shrink-0 snap-center rounded-2xl border border-border bg-card p-6 shadow-soft sm:w-[60%] lg:w-auto"
            >
              <Quote className="h-7 w-7 text-accent" aria-hidden="true" />
              <blockquote className="mt-4 leading-relaxed text-ink">{t.quote}</blockquote>
              <figcaption className="mt-5 border-t border-border pt-4">
                <span className="block font-semibold text-ink">{t.name}</span>
                <span className="text-sm text-muted-foreground">{t.location}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-center gap-4 lg:hidden">
          <button
            type="button"
            aria-label="Previous testimonial"
            onClick={() => goTo(index - 1)}
            className="grid h-11 w-11 place-items-center rounded-full border border-border bg-card"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex gap-2">
            {testimonials.map((t, i) => (
              <button
                key={t.name}
                type="button"
                aria-label={`Go to testimonial ${i + 1}`}
                aria-current={i === index}
                onClick={() => goTo(i)}
                className={"h-2.5 rounded-full transition-all " + (i === index ? "w-6 bg-accent" : "w-2.5 bg-border")}
              />
            ))}
          </div>
          <button
            type="button"
            aria-label="Next testimonial"
            onClick={() => goTo(index + 1)}
            className="grid h-11 w-11 place-items-center rounded-full border border-border bg-card"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
