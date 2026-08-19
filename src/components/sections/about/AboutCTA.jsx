import { Reveal } from '../../Reveal'
import { aboutCta } from '../../../data/about'
import ButtonLink from '../../ui/ButtonLink'

export default function AboutCTA() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 surface-ink text-center border-t border-white/10">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <Reveal>
          <span className="eyebrow text-gold-soft mb-6 block">
            {aboutCta.eyebrow}
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-display text-white mb-10 leading-tight">
            {aboutCta.title}
          </h2>
          
          <ButtonLink 
            href={`#${aboutCta.cta.hash}`}
            className="w-full sm:w-auto mt-2"
          >
            {aboutCta.cta.label}
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  )
}
