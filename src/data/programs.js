import { programs as sitePrograms } from "./site";

export const programsPageData = {
  hero: {
    eyebrow: sitePrograms.eyebrow,
    title: sitePrograms.title,
    description: "Built around how a Money-making Real Estate Business actually operates. We fix unpredictable staff performance, and secure your profits at absolute scale."
  },
  cta: {
    title: "Ready to Scale?",
    label: sitePrograms.cta.label,
    href: sitePrograms.cta.href,
  },
  process: {
    eyebrow: "Four Steps.",
    title: "Our Process",
    steps: [
      {
        title: "Connect & Map",
        text: "A sharp, focused call to analyze your current setup, map revenue goals, and spot immediate gaps in your Real Estate Market."
      },
      {
        title: "Build the Blueprint",
        text: "You get a clear, system-driven action plan tailored exactly to your Real Estate Market and specific target territory."
      },
      {
        title: "Execute & Close",
        text: "Move from planning to active ground execution. Get practical guidance to evaluate your Real Estate market potential."
      },
      {
        title: "Automate & Scale",
        text: "Implement predictable office systems, automated lead marketing, and strong sales teams so your real estate business keeps growing without you chasing every single deal."
      }
    ]
  },
  items: [
    {
      ...sitePrograms.items[0], // RGC Champions Launchpad
      image: "/images/Rgc-Champions-Launchpad-Banner-1024x1024.png",
      knowMoreUrl: "https://leadmachine.dramolmourya.com/index.php/workshop/"
    },
    {
      ...sitePrograms.items[1], // RGC Mastermind Training
      image: "/images/photo_3_2026-05-22_14-29-22-1024x1024.jpg",
    },
    {
      ...sitePrograms.items[2], // RGC CEO Coaching
      image: "/images/photo_1_2026-05-22_14-29-22-1024x1024.jpg",
    },
    {
      ...sitePrograms.items[3], // RGC System Training
      image: "/images/Website-Box-4-1024x1024.png",
    },
    {
      ...sitePrograms.items[4], // RGC System Consultation
      image: "/images/System-Consultation-1024x1024.png",
    }
  ]
};
