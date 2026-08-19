import { Reveal } from '../../Reveal'
import { aboutAchievements } from '../../../data/about'
import CountUp from '../../ui/CountUp'

export default function ImpactSection() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 surface-ink text-white">
      <div className="max-w-7xl mx-auto text-center mb-16 md:mb-24">
        <Reveal>
          <span className="eyebrow text-gold-soft mb-4 block">
            {aboutAchievements.eyebrow}
          </span>
          <h2 className="text-3xl md:text-5xl font-display">
            {aboutAchievements.title}
          </h2>
        </Reveal>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12 md:gap-x-12 md:gap-y-20">
          {aboutAchievements.items.map((stat, index) => (
            <Reveal key={index} delay={index * 100} className="flex flex-col items-center text-center">
              <div className="text-4xl md:text-6xl lg:text-7xl font-display text-gold-gradient mb-4 font-semibold tracking-tight">
                {stat.prefix || ''}
                <CountUp value={stat.value} decimals={stat.decimals || 0} />
                {stat.suffix || ''}
              </div>
              <div className="text-sm md:text-base text-white/70 font-light max-w-[150px] md:max-w-xs uppercase tracking-wide">
                {stat.label}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
