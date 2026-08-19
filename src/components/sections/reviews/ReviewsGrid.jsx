import { reviewsPageData } from "../../../data/reviews";
import SectionHeading from "../../ui/SectionHeading";
import ReviewVideoCard from "./ReviewVideoCard";

export default function ReviewsGrid() {
  return (
    <section className="py-16 md:py-24 px-6 md:px-12 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <SectionHeading 
          eyebrow="More Evidence"
          title="In Their Own Words" 
          align="center" 
        />
        
        {/* Short Reviews Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviewsPageData.shortReviews.map((review, idx) => (
            <ReviewVideoCard key={idx} review={review} index={idx} />
          ))}
        </div>

        {/* More Reviews (Text only from site.js) */}
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviewsPageData.moreReviews.map((review, idx) => (
            <ReviewVideoCard key={idx + 10} review={review} index={idx % 3} />
          ))}
        </div>
      </div>
    </section>
  );
}
