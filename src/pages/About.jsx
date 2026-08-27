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
import { Helmet } from "react-helmet-async";

export default function About() {
  return (
    <main className="w-full overflow-x-hidden">
      <Helmet>
        <title>About | Dr. Amol Mourya</title>
        <meta name="description" content="Learn about Dr. Amol Mourya's journey, mission, and philosophy as a leading real estate growth coach." />
      </Helmet>
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