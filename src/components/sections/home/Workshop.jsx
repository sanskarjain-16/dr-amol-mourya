import { Check } from "lucide-react";
import { workshop, rgc } from "../../../data/site";
import { Reveal } from "../../Reveal";
import ButtonLink from "../../ui/ButtonLink";

export default function Workshop() {
  return (
    <section className="surface-ink py-16 sm:py-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-16">
          <Reveal>
            <p className="eyebrow text-gold-soft">{workshop.eyebrow}</p>
            <h2 className="mt-3 text-3xl leading-tight text-balance text-ink-foreground sm:text-4xl">
              {workshop.title}
            </h2>
            <p className="mt-5 leading-relaxed text-ink-foreground/70">{workshop.description}</p>

            <ul className="mt-6 flex flex-wrap gap-2">
              {rgc.topics.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-ink-foreground/15 px-3 py-1.5 text-xs text-ink-foreground/75"
                >
                  {t}
                </li>
              ))}
            </ul>

            <ButtonLink href={workshop.cta.href} className="mt-8 w-full sm:w-auto">
              {workshop.cta.label}
            </ButtonLink>
          </Reveal>

          <div className="grid gap-3 sm:grid-cols-2">
            {workshop.points.map((p, i) => (
              <Reveal
                key={p.title}
                delay={i * 70}
                className="rounded-2xl border border-ink-foreground/12 bg-ink-foreground/5 p-5 transition-colors hover:border-gold/40"
              >
                <span className="grid h-9 w-9 place-items-center rounded-full bg-gold/15 text-gold-soft">
                  <Check className="h-4 w-4" />
                </span>
                <h3 className="mt-3 text-base font-semibold text-ink-foreground">{p.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-foreground/65">{p.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
