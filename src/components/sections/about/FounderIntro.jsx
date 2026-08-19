import { Reveal } from '../../Reveal'
import { aboutMeet } from '../../../data/about'
import portraitImg from '../../../assets/images/amol-portrait.png'

export default function FounderIntro() {
  return (
    <section className="py-16 md:py-24 px-6 md:px-12 surface-ink text-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        
        {/* Mobile Image First */}
        <Reveal delay={100} className="w-full">
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-lift border border-white/10 bg-white/5">
            <img 
              src={portraitImg} 
              alt="Dr. Amol Mourya Portrait" 
              className="w-full h-full object-cover object-top"
              loading="lazy"
            />
          </div>
        </Reveal>

        {/* Content */}
        <Reveal className="flex flex-col">
          <span className="eyebrow text-gold-soft mb-4 block">
            {aboutMeet.eyebrow}
          </span>
          <h2 className="text-3xl md:text-5xl font-display mb-8">
            {aboutMeet.title}
          </h2>
          
          <div className="space-y-6 text-white/80 font-light leading-relaxed">
            {/* Show first two paragraphs here to keep it scannable */}
            <p className="text-lg">
              {aboutMeet.paragraphs[0]}
            </p>
            <p className="text-lg">
              {aboutMeet.paragraphs[1]}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
