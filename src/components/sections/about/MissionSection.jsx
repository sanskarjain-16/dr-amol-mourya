import { Reveal } from '../../Reveal'
import { aboutMission } from '../../../data/about'

export default function MissionSection() {
  return (
    <section className="py-20 md:py-32 px-6 md:px-12 bg-background">
      <div className="max-w-3xl mx-auto text-center">
        <Reveal>
          <span className="eyebrow text-primary/60 mb-6 block">
            {aboutMission.eyebrow}
          </span>
          <h2 className="text-3xl md:text-5xl font-display text-foreground mb-8">
            {aboutMission.title}
          </h2>
          <p className="text-xl md:text-3xl text-foreground/80 leading-relaxed font-light">
            "{aboutMission.intro}"
          </p>
        </Reveal>
      </div>
    </section>
  )
}
