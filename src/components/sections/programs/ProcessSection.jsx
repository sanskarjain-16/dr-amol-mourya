import ButtonLink from '../../ui/ButtonLink'
import { Reveal } from '../../Reveal'
import { programsPageData } from '../../../data/programs'

export default function ProcessSection() {
  const { process } = programsPageData;

  return (
    <section className="py-20 md:py-32 px-6 md:px-12 bg-card border-y border-border">
      <div className="max-w-7xl mx-auto">
        {/* Main CTA Title */}
        <div id="enroll-section" className="scroll-mt-24">
          <Reveal className="mb-20 md:mb-32 text-center flex flex-col items-center">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-display text-foreground tracking-tight">
              {programsPageData.cta.title}
            </h2>
            <div className="mx-auto mt-8 h-1 w-24 bg-gold rounded-full mb-8"></div>
            <ButtonLink href="/workshop" variant="gold">
              Enroll Now
            </ButtonLink>
          </Reveal>
        </div>

        {/* Process Sub-heading */}
        <Reveal className="mb-12 md:mb-16 text-left">
          <span className="eyebrow text-gold-soft mb-3 block">
            {process.eyebrow}
          </span>
          <h3 className="text-3xl md:text-4xl font-display text-foreground">
            {process.title}
          </h3>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {process.steps.map((step, index) => (
            <Reveal key={index} delay={index * 100} className="flex flex-col group">
              <div className="text-5xl md:text-7xl font-sans text-gold/60 mb-6 font-extrabold tracking-tight transition-colors duration-500 group-hover:text-gold">
                0{index + 1}
              </div>
              <h3 className="text-xl md:text-2xl font-display font-medium text-foreground mb-4">
                {step.title}
              </h3>
              <p className="text-foreground/70 font-light leading-relaxed text-base md:text-lg">
                {step.text}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
