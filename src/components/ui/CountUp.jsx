import { useEffect, useState } from 'react'
import { useInView } from '../Reveal'

export function CountUp({
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  duration = 1400,
}) {
  const { ref, inView } = useInView()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!inView) return

    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches

    if (reduced) {
      setCurrent(value)
      return
    }

    let frame = 0

    const start = performance.now()

    const tick = (now) => {
      const progress = Math.min(
        (now - start) / duration,
        1
      )

      const eased =
        1 - Math.pow(1 - progress, 3)

      setCurrent(value * eased)

      if (progress < 1) {
        frame = requestAnimationFrame(tick)
      }
    }

    frame = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frame)
    }
  }, [inView, value, duration])

  return (
    <span ref={ref}>
      {prefix}
      {current.toFixed(decimals)}
      {suffix}
    </span>
  )
}