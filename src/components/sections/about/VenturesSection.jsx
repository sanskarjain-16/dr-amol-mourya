import { Reveal } from '../../Reveal'
import { aboutFounder } from '../../../data/about'

export default function VenturesSection() {
  return (
    <section className="py-20 md:py-32 px-6 md:px-12 bg-muted">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <Reveal>
          <span className="eyebrow text-primary/60 mb-4 block">
            {aboutFounder.eyebrow}
          </span>
          <h2 className="text-3xl md:text-5xl font-display text-foreground">
            {aboutFounder.title}
          </h2>
        </Reveal>
      </div>

      <div className="max-w-5xl mx-auto space-y-12 md:space-y-16">
        <Reveal delay={200}>
          <div className="bg-card p-8 md:p-12 rounded-3xl shadow-soft border border-border">
            <div className="space-y-6 text-foreground/80 font-light leading-relaxed text-lg md:text-xl">
              {aboutFounder.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </Reveal>

        {aboutFounder.images && (
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            {aboutFounder.images.map((image, i) => (
              <Reveal key={i} delay={300 + (i % 3) * 100} className="w-[calc(50%-12px)] md:w-[calc(33.333%-22px)] max-w-[280px]">
                <div className="bg-primary rounded-2xl shadow-soft border border-primary/20 p-6 md:p-10 flex items-center justify-center aspect-square md:aspect-[4/3] hover:shadow-lift hover:-translate-y-1 transition-all duration-300 group cursor-pointer w-full h-full relative overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-md"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
