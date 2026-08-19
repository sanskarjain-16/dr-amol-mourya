import { useEffect } from "react";
import ReviewsHero from "../components/sections/reviews/ReviewsHero";
import FeaturedResults from "../components/sections/reviews/FeaturedResults";
import ResultsHighlights from "../components/sections/reviews/ResultsHighlights";
import ReviewsGrid from "../components/sections/reviews/ReviewsGrid";
import ReviewsCTA from "../components/sections/reviews/ReviewsCTA";

export default function Reviews() {
  useEffect(() => {
    document.title = "Reviews & Results | Dr. Amol Mourya";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Real experiences, real results, and social proof from thousands of real estate entrepreneurs trained by Dr. Amol Mourya.");
    }
  }, []);

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-background">
      <ReviewsHero />
      <FeaturedResults />
      <ResultsHighlights />
      <ReviewsGrid />
      <ReviewsCTA />
    </main>
  );
}
