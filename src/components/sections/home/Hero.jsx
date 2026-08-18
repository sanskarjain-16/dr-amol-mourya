import { ArrowRight, PlayCircle } from 'lucide-react'

import { hero } from '../../../data/site'
import Container from '../../ui/Container'
import ButtonLink from '../../ui/ButtonLink'

import portrait from '../../../assets/images/amol-portrait.png'

export default function Hero() {
  return (
    <section
      id="home"
      className="relative isolate overflow-hidden bg-[#111111] pt-20 text-white sm:pt-24"
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#d8b56a] opacity-[0.08] blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-[#d8b56a] opacity-[0.06] blur-3xl"
      />

      <Container>
        <div className="mx-auto grid w-full items-center gap-10 py-10 pb-16 sm:gap-12 sm:py-14 sm:pb-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-16 lg:pb-24">

          {/* Content */}
          <div className="animate-fade-in">

            {/* Eyebrow */}
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#d8b56a] sm:text-sm">
              {hero.eyebrow}
            </p>

            {/* Name */}
            <h1 className="mt-4 max-w-3xl text-[2.6rem] font-semibold leading-[1.03] tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl xl:text-7xl">
              {hero.name}
            </h1>

            {/* Mission */}
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
              {hero.mission}
            </p>

            {/* Badge */}
            <div className="mt-6 inline-flex items-center rounded-full border border-[#d8b56a]/40 bg-[#d8b56a]/10 px-4 py-2 text-xs font-semibold tracking-wide text-[#f0d58c] sm:text-sm">
              {hero.badge}
            </div>

            {/* Headline */}
            <h2 className="mt-5 max-w-2xl text-2xl font-medium leading-snug tracking-[-0.015em] text-white sm:text-3xl lg:text-4xl">
              {hero.headline}
            </h2>

            {/* Description */}
            <p className="mt-5 max-w-xl text-[0.95rem] leading-relaxed text-white/65 sm:text-base">
              {hero.description}
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">

              <ButtonLink
                href={hero.primaryCta.href}
                className="w-full sm:w-auto"
              >
                {hero.primaryCta.label}

                <ArrowRight className="h-4 w-4" />
              </ButtonLink>

              <ButtonLink
                href={hero.secondaryCta.href}
                variant="ghostLight"
                className="w-full sm:w-auto"
              >
                <PlayCircle className="h-4 w-4" />

                {hero.secondaryCta.label}
              </ButtonLink>

            </div>
          </div>

          {/* Portrait */}
          <div className="relative mx-auto w-full max-w-sm lg:max-w-none">

            {/* Gold frame */}
            <div
              aria-hidden="true"
              className="absolute inset-x-5 bottom-4 top-8 rounded-[2rem] border border-[#d8b56a]/25 bg-[#d8b56a]/[0.04]"
            />

            {/* Glow behind portrait */}
            <div
              aria-hidden="true"
              className="absolute inset-x-10 bottom-6 top-12 rounded-full bg-[#d8b56a]/10 blur-3xl"
            />

            <img
              src={portrait}
              alt="Dr. Amol Mourya, real estate coach"
              width="1000"
              height="1400"
              fetchPriority="high"
              className="relative z-10 mx-auto w-full max-w-sm object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.5)] lg:max-w-md"
            />

          </div>
        </div>
      </Container>
    </section>
  )
}