import { ArrowUpRight } from "lucide-react";
import { programs } from "../../../data/site";
import { Reveal } from "../../Reveal";
import SectionHeading from "../../ui/SectionHeading";
import ButtonLink from "../../ui/ButtonLink";

export default function Programs() {
  return (
    <section id="programs" className="bg-background py-16 sm:py-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow={programs.eyebrow} title={programs.title} />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {programs.items.map((item, i) => (
            <Reveal
              key={item.name}
              delay={i * 70}
              className="group flex h-full flex-col rounded-2xl border border-border bg-card p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lift sm:p-6"
            >
              <span className="font-sans font-extrabold text-sm text-accent tracking-widest">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 text-xl font-display font-semibold leading-snug text-ink">{item.name}</h3>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                <span className="font-semibold text-ink">Who It Is For: </span>
                {item.who}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
