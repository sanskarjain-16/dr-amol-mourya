import { useEffect } from 'react';
import AboutHero from "../components/sections/about/AboutHero";
import MissionSection from "../components/sections/about/MissionSection";
import FounderIntro from "../components/sections/about/FounderIntro";
import CredentialsSection from "../components/sections/about/CredentialsSection";
import VenturesSection from "../components/sections/about/VenturesSection";
import FounderStory from "../components/sections/about/FounderStory";
import PhilosophySection from "../components/sections/about/PhilosophySection";
import ImpactSection from "../components/sections/about/ImpactSection";
import JourneySection from "../components/sections/about/JourneySection";
import AboutCTA from "../components/sections/about/AboutCTA";

export default function About() {
  useEffect(() => {
    document.title = "About | Dr. Amol Mourya";
    // Setup meta description for SEO
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = "description";
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = "Learn about Dr. Amol Mourya, India's first Ph.D. in Consumer Buying Behavior with specialization in Real Estate, and founder of 6+ real estate brands.";
  }, []);

  return (
    <main className="w-full overflow-x-hidden">
      <AboutHero />
      <MissionSection />
      <FounderIntro />
      <CredentialsSection />
      <VenturesSection />
      <FounderStory />
      <PhilosophySection />
      <ImpactSection />
      <JourneySection />
      <AboutCTA />
    </main>
  );
}