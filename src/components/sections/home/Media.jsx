import { PlayCircle } from "lucide-react";
import { media } from "../../../data/site";
import { Reveal } from "../../Reveal";
import ButtonLink from "../../ui/ButtonLink";
import thumb from "../../../assets/images/amol-square.jpg";

export default function Media() {
  return (
    <section id="media" className="bg-background py-16 sm:py-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <Reveal className="overflow-hidden rounded-[1.5rem] border border-border bg-card shadow-lift sm:rounded-[2rem]">
          <div className="grid gap-0 md:grid-cols-2">
            <img
              src={thumb}
              alt="Dr. Amol Mourya on his YouTube channel"
              width={1024}
              height={1024}
              loading="lazy"
              className="aspect-[16/10] w-full object-cover md:aspect-auto md:h-full"
            />
            <div className="p-6 sm:p-10">
              <p className="eyebrow text-accent">{media.eyebrow}</p>
              <h2 className="mt-3 text-3xl leading-tight text-ink sm:text-4xl">{media.title}</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Free real estate training, market breakdowns and coaching sessions from Dr. Amol
                Mourya's official YouTube channel.
              </p>
              <ButtonLink
                href={media.channelUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-7 w-full sm:w-auto"
              >
                <PlayCircle className="h-4 w-4" />
                Find us on YouTube
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
