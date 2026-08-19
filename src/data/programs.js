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
  items: [
    {
      ...sitePrograms.items[0], // RGC Champions Launchpad
      image: "https://dramolmourya.com/wp-content/uploads/2026/05/Rgc-Champions-Launchpad-Banner-1024x1024.png",
      knowMoreUrl: "https://leadmachine.dramolmourya.com/index.php/workshop/"
    },
    {
      ...sitePrograms.items[1], // RGC Mastermind Training
      image: "https://dramolmourya.com/wp-content/uploads/2026/05/photo_3_2026-05-22_14-29-22-1024x1024.jpg",
    },
    {
      ...sitePrograms.items[2], // RGC CEO Coaching
      image: "https://dramolmourya.com/wp-content/uploads/2026/05/photo_1_2026-05-22_14-29-22-1024x1024.jpg",
    },
    {
      ...sitePrograms.items[3], // RGC System Training
      image: "https://dramolmourya.com/wp-content/uploads/2026/05/Website-Box-4-1024x1024.png",
    },
    {
      ...sitePrograms.items[4], // RGC System Consultation
      image: "https://dramolmourya.com/wp-content/uploads/2026/05/System-Consultation-1024x1024.png",
    }
  ]
};
