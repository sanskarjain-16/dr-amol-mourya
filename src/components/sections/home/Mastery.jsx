import { mastery } from "../../../data/site";
import { Reveal } from "../../Reveal";
import SectionHeading from "../../ui/SectionHeading";

export default function Mastery() {
  return (
    <section className="bg-secondary py-16 sm:py-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow={mastery.eyebrow} title={mastery.title} align="center" />

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {mastery.items.map((item, i) => (
            <Reveal
              key={item.title}
              delay={i * 70}
              className="rounded-2xl border border-border bg-card p-5 shadow-soft sm:p-7"
            >
              <span className="font-display text-2xl text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 text-xl text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
