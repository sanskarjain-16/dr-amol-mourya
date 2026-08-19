import { Play } from "lucide-react";
import { media } from "../../../data/site";
import { Reveal } from "../../Reveal";
import cover from "../../../assets/images/amol-hero.jpg";

export default function PrimaryVisual() {
  return (
    <section className="bg-background py-12 sm:py-16">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <Reveal>
          <a
            href={media.channelUrl}
            target="_blank"
            rel="noreferrer"
            className="group relative block overflow-hidden rounded-[1.5rem] shadow-lift sm:rounded-[2rem]"
          >
            <img
              src={cover}
              alt="Dr. Amol Mourya training real estate entrepreneurs on stage"
              width={1600}
              height={1067}
              loading="lazy"
              className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] sm:aspect-[16/9]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-linear-to-t from-ink/85 via-ink/20 to-transparent"
            />
            <div className="absolute inset-x-0 bottom-0 flex items-end gap-4 p-5 sm:p-8">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[image:var(--gradient-gold)] text-ink transition-transform duration-300 group-hover:scale-105 sm:h-16 sm:w-16">
                <Play className="h-6 w-6 fill-current" />
              </span>
              <div className="min-w-0">
                <p className="eyebrow text-gold-soft">Watch Free Training</p>
                <p className="mt-1 font-display text-lg leading-snug text-ink-foreground sm:text-2xl">
                  Real Estate Game Changers with Dr. Amol Mourya
                </p>
              </div>
            </div>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
