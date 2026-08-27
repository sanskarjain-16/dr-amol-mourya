import ReviewsHero from "../components/sections/reviews/ReviewsHero";
import FeaturedResults from "../components/sections/reviews/FeaturedResults";
import ResultsHighlights from "../components/sections/reviews/ResultsHighlights";
import ReviewsGrid from "../components/sections/reviews/ReviewsGrid";
import ReviewsCTA from "../components/sections/reviews/ReviewsCTA";
import { Helmet } from "react-helmet-async";

export default function Reviews() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-background">
      <Helmet>
        <title>Reviews & Results | Dr. Amol Mourya</title>
        <meta name="description" content="Real experiences, real results, and social proof from thousands of real estate entrepreneurs trained by Dr. Amol Mourya." />
      </Helmet>
      <ReviewsHero />
      <FeaturedResults />
      <ResultsHighlights />
      <ReviewsGrid />
      <ReviewsCTA />
    </main>
  );
}
