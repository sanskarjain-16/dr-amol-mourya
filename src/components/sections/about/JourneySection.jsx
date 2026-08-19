import { useEffect, useState } from 'react'
import { aboutJourney } from '../../../data/about'
import JourneyMilestone from './JourneyMilestone'

import img1 from '../../../assets/images/amol-square.jpg'
import img2 from '../../../assets/images/amol-hero.jpg'
import img3 from '../../../assets/images/amol-editorial.jpg'
import img4 from '../../../assets/images/amol-portrait.png'

const journeyMilestones = [
  {
    label: "The Beginning",
    title: "Foundational Practices",
    description: "From foundational real estate practices to building a network that empowers thousands, the journey has always been about one thing: creating lasting, system-driven success.",
    image: img1
  },
  {
    label: "Real Estate Journey",
    title: "Building the Empire",
    description: "Dr. Amol Mourya doesn’t just teach real estate business—he lives it every single day. Over his 20+ year career, he has built, scaled, and managed more than 6 successful companies across the property industry.",
    image: img2
  },
  {
    label: "Building the Ecosystem",
    title: "Creating Impact",
    description: "He has empowered over 3.5 Lakh individuals and 100+ corporations in real estate across India to achieve remarkable growth and success, carving his name on the Asia Book and India Book of Records.",
    image: img3
  },
  {
    label: "Today",
    title: "The Present Vision",
    description: "His vision and mission behind this coaching is to empower 1 Lakh entrepreneurs to create 1 Crore Jobs and save 25 lakh lives in real estate.",
    image: img4
  }
];

export default function JourneySection() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Find the container bounding rect to calculate progress
      const section = document.getElementById("journey-timeline");
      if (section) {
        const rect = section.getBoundingClientRect();
        // Calculate progress based on how far the element is up the screen
        const windowHeight = window.innerHeight;
        // Start filling when top is at middle of screen
        const start = windowHeight / 2;
        // End filling when bottom is at middle of screen
        const end = -rect.height + windowHeight / 2;
        
        let progress = (rect.top - start) / (end - start);
        progress = Math.max(0, Math.min(1, progress));
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="py-20 md:py-32 px-6 md:px-12 bg-ink border-t border-white/10 overflow-hidden relative">
      <div className="max-w-7xl mx-auto flex flex-col items-center mb-16 lg:mb-24 text-center z-10 relative">
        <span className="eyebrow text-gold-soft mb-4 block">
          {aboutJourney.eyebrow}
        </span>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-display text-white">
          {aboutJourney.title}
        </h2>
      </div>

      <div id="journey-timeline" className="max-w-7xl mx-auto relative pb-12 lg:pb-0">
        
        {/* Background Track Line */}
        <div className="absolute left-[15px] lg:left-1/2 lg:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-white/5 z-0" />
        
        {/* Animated Fill Line */}
        <div 
          className="absolute left-[15px] lg:left-1/2 lg:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-[image:var(--gradient-gold)] origin-top z-10 transition-transform duration-300 ease-out"
          style={{ transform: `scaleY(${scrollProgress})` }}
        />

        <div className="flex flex-col relative z-20">
          {journeyMilestones.map((item, index) => (
            <JourneyMilestone 
              key={index} 
              item={item} 
              index={index} 
              isLast={index === journeyMilestones.length - 1} 
            />
          ))}
        </div>
      </div>
    </section>
  )
}
