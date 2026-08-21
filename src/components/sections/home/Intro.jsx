import { ArrowRight } from "lucide-react";
import { hero, rgc } from "../../../data/site";
import { Reveal } from "../../Reveal";
import ButtonLink from "../../ui/ButtonLink";
import editorial from "../../../assets/images/home-intro-photo.jpg";

export default function Intro() {
  return (
    <section id="rgc" className="bg-background py-16 sm:py-24">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16">
        <Reveal className="order-1">
          <div className="relative mx-auto max-w-sm lg:max-w-none">
            <div
              aria-hidden="true"
              className="absolute -inset-3 rounded-[1.75rem] border border-accent/25"
            />
            <img
              src={editorial}
              alt="Portrait of Dr. Amol Mourya"
              width={1200}
              height={1600}
              loading="lazy"
              className="relative w-full aspect-[3/4] rounded-[1.5rem] object-cover shadow-lift"
            />
          </div>
        </Reveal>

        <div className="order-2">
          <Reveal>
            <p className="eyebrow text-accent">{rgc.eyebrow}</p>
            <h2 className="mt-3 text-3xl leading-tight text-balance sm:text-4xl">
              {hero.headline} <span className="text-gold-gradient">with {hero.name}</span>
            </h2>
            <p className="mt-5 font-display text-xl leading-snug text-ink">{rgc.lead}</p>
            {rgc.body.map((p) => (
              <p key={p.slice(0, 24)} className="mt-4 max-w-prose leading-relaxed text-muted-foreground">
                {p}
              </p>
            ))}
          </Reveal>

          <div className="mt-8 space-y-3">
            {rgc.pillars.map((pillar, i) => (
              <Reveal
                key={pillar.title}
                delay={i * 90}
                className="rounded-2xl border border-border bg-card p-4 shadow-soft sm:p-5"
              >
                <h3 className="text-base font-semibold text-ink">{pillar.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{pillar.text}</p>
              </Reveal>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
