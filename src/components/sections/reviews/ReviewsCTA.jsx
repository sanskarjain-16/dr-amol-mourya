import { reviewsPageData } from "../../../data/reviews";
import { Reveal } from "../../Reveal";
import ButtonLink from "../../ui/ButtonLink";

export default function ReviewsCTA() {
  return (
    <section className="py-24 px-6 md:px-12 bg-ink text-white text-center">
      <div className="max-w-3xl mx-auto">
        <Reveal>
          <h2 className="text-4xl md:text-5xl font-display mb-8">
            {reviewsPageData.cta.title}
          </h2>
          <ButtonLink 
            href={reviewsPageData.cta.href} 
            className="w-full sm:w-auto text-lg px-12 py-4"
          >
            {reviewsPageData.cta.label}
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
