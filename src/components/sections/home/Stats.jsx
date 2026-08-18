import { CountUp } from '../../ui/CountUp'
import Container from '../../ui/Container'
import { stats } from '../../../data/site'

export default function Stats() {
  return (
    <section
      aria-label="Dr. Amol Mourya achievements"
      className="relative border-y border-white/10 bg-[#111111] py-12 text-white sm:py-16"
    >
      <Container>
        <div className="grid grid-cols-2 gap-y-8 sm:grid-cols-3 lg:grid-cols-5 lg:gap-0">

          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`relative px-4 text-center sm:px-6 ${
                index !== 0
                  ? 'lg:border-l lg:border-white/10'
                  : ''
              }`}
            >
              <div className="text-3xl font-semibold tracking-tight text-[#d8b56a] sm:text-4xl lg:text-4xl">
                {stat.prefix || ''}

                <CountUp
                  value={stat.value}
                  decimals={stat.decimals || 0}
                />

                {stat.suffix || ''}
              </div>

              <p className="mx-auto mt-2 max-w-[180px] text-xs leading-relaxed text-white/55 sm:text-sm">
                {stat.label}
              </p>
            </div>
          ))}

        </div>
      </Container>
    </section>
  )
}