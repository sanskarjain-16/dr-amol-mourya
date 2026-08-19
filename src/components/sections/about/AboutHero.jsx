import { Reveal } from '../../Reveal'
import heroImg from '../../../assets/images/amol-hero.jpg'

export default function AboutHero() {
  return (
    <section className="relative w-full min-h-[60vh] flex flex-col justify-end pb-12 pt-32 overflow-hidden bg-ink">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-ink/60 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-transparent z-10" />
        <img
          src={heroImg}
          alt="Dr. Amol Mourya"
          className="w-full h-full object-cover object-top opacity-70"
          loading="eager"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 w-full px-6 md:px-12 max-w-7xl mx-auto">
        <Reveal>
          <span className="eyebrow text-gold-soft mb-4 block">
            Asia's Top Real Estate Coach
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-display text-white mb-6 leading-tight">
            Building Empires. <br />
            <span className="text-gold-gradient">Scaling Impact.</span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl font-light">
            With over two decades of ground-level experience, I empower real estate professionals to transcend ordinary limits and build system-driven businesses.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
