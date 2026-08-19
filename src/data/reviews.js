import { testimonials as baseTestimonials, successStories as baseStories } from "./site";

export const reviewsPageData = {
  hero: {
    eyebrow: "Proof",
    title: "Quiet, measurable, repeatable.",
    description:
      "Proven transformation across the entire real estate market— from ground-level field agents and marketing agencies to corporate builders and real estate CEOs.",
  },
  featured: [
    {
      name: "Krushna Sahare",
      role: "Realtor — Mumbai",
      quote:
        "I was in a very weak financial place and losing hope. But Dr. Amol's systems completely changed my life. I made a massive comeback, closing 157 deals and earning a 9-figure commission in just one year!",
      result: "157 Deals & 9-figure commission",
      thumbnail:
        "https://dramolmourya.com/wp-content/uploads/2026/05/photo_2026-05-25_18-46-01-1024x682.jpg",
      videoUrl: "", // Available for future implementation
    },
    {
      name: "Sushant Sharma",
      role: "Realtor — Bhopal",
      quote:
        "I started from absolute zero with no background in business. Thanks to the RGC frameworks, I built a powerful real estate brand in Bhopal from scratch and crossed 400Cr+ in a single year!",
      result: "400Cr+ in a single year",
      thumbnail:
        "https://dramolmourya.com/wp-content/uploads/2026/05/photo_2026-05-25_19-00-33-1024x682.jpg",
      videoUrl: "",
    },
    {
      name: "Surendra Bhagat",
      role: "Realtor — Nagpur",
      quote:
        "I used to work in a power plant and struggled heavily to close even a single deal when I started. Joining Dr. Amol's program fixed my mistakes, and I went on to earn a 9-figure property commission!",
      result: "9-figure property commission",
      thumbnail:
        "https://dramolmourya.com/wp-content/uploads/2026/05/photo_2026-05-25_19-00-43-1024x682.jpg",
      videoUrl: "",
    },
    {
      name: "Kanti Jain",
      role: "RE Marketing Agency Owner — Mumbai",
      quote:
        "I spent lakhs on different business coachings but got zero results. Joining Dr. Amol's community changed everything— it helped my marketing agency scale to over 50 Cr+ in a single year, and now I never miss a single RGC event!",
      result: "Scaled to 50 Cr+",
      thumbnail:
        "https://dramolmourya.com/wp-content/uploads/2026/05/photo_2026-05-25_19-00-51-1024x682.jpg",
      videoUrl: "",
    },
  ],
  shortReviews: [
    {
      quote: "ROI consistently above 18% annually. The coaching gave me confidence in commercial.",
      name: "Amit Desai",
      role: "Real Estate Investor – Pune",
    },
    {
      quote: "The deal frameworks have saved me lakhs on every project. World-class.",
      name: "Sneha Reddy",
      role: "Property Developer — Hyderabad",
    },
    {
      quote: "I now own 3 rental properties. Real, recurring passive income.",
      name: "Karan Mehta",
      role: "First-time Investor — Bangalore",
    },
    {
      quote: "Business grew 4x. The client acquisition system is revolutionary.",
      name: "Neha Gupta",
      role: "Real Estate Agent — Jaipur",
    },
    {
      quote: "From abroad, built a solid Indian portfolio. Virtual consulting works.",
      name: "Suresh Iyer",
      role: "NRI Investor — Chennai",
    },
    {
      quote: "Transitioned from IT to full-time real estate. Never looked back.",
      name: "Pooja Sharma",
      role: "Entrepreneur — Lucknow",
    },
  ],
  highlights: [
    { value: "157", label: "Deals Closed", suffix: "" },
    { value: "400", label: "Revenue Generated", suffix: "Cr+" },
    { value: "9", label: "Figure Commissions", suffix: "" },
  ],
  moreReviews: [...baseTestimonials, ...baseStories.items],
  cta: {
    title: "Your story, next.",
    label: "Begin",
    href: "/#contact",
  },
};
