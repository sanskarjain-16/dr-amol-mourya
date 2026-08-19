import { Reveal } from "../../Reveal";
import { programsPageData } from "../../../data/programs";
import ButtonLink from "../../ui/ButtonLink";

export default function ProgramsCTA() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 bg-muted border-t border-border">
      <div className="max-w-4xl mx-auto text-center">
        <Reveal>
          <h2 className="text-3xl md:text-5xl font-display text-foreground mb-8">
            {programsPageData.cta.title}
          </h2>
          <ButtonLink href={programsPageData.cta.href}>
            {programsPageData.cta.label}
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
