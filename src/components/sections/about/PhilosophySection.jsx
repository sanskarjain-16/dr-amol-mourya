import { Reveal } from '../../Reveal'
import { aboutPhilosophy } from '../../../data/about'

export default function PhilosophySection() {
  return (
    <section className="py-20 md:py-32 px-6 md:px-12 bg-card border-y border-border">
      <div className="max-w-7xl mx-auto">
        <Reveal className="mb-16 md:mb-24 text-center">
          <span className="eyebrow text-primary/60 mb-4 block">
            {aboutPhilosophy.eyebrow}
          </span>
          <h2 className="text-3xl md:text-5xl font-display text-foreground">
            {aboutPhilosophy.title}
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {aboutPhilosophy.items.map((item, index) => (
            <Reveal key={index} delay={index * 100} className="flex flex-col group">
              <div className="text-5xl md:text-7xl font-sans text-gold/60 mb-6 font-extrabold tracking-tight transition-colors duration-500 group-hover:text-gold">
                0{index + 1}
              </div>
              <h3 className="text-xl md:text-2xl font-display font-medium text-foreground mb-4">
                {item.title}
              </h3>
              <p className="text-foreground/70 font-light leading-relaxed text-base md:text-lg">
                {item.text}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
