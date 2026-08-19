import { Star } from "lucide-react";
import { successStories } from "../../../data/site";
import { Reveal } from "../../Reveal";
import SectionHeading from "../../ui/SectionHeading";

export default function SuccessStories() {
  return (
    <section className="bg-background py-16 sm:py-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow={successStories.eyebrow}
          title={successStories.title}
          intro={successStories.intro}
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {successStories.items.map((item, i) => (
            <Reveal
              key={item.name}
              delay={i * 60}
              className="flex h-full flex-col justify-between rounded-2xl border border-border bg-card p-5 shadow-soft transition-shadow hover:shadow-lift sm:p-6"
            >
              <div>
                <div className="flex gap-0.5" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="h-4 w-4 fill-accent text-accent" aria-hidden="true" />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
              </div>
              <p className="mt-5 font-semibold text-ink">— {item.name}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
