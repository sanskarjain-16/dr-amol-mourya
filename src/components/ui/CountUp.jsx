import { useEffect, useState } from 'react'
import { useInView } from '../Reveal'

export default function CountUp({
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  duration = 5000,
}) {
  const { ref, inView } = useInView(true)
  const [current, setCurrent] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const [hasCompleted, setHasCompleted] = useState(false)
  
  // Track if we need to show the final value instantly
  const [isReducedMotion, setIsReducedMotion] = useState(false)

  useEffect(() => {
    const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setIsReducedMotion(true)
      setCurrent(value)
      setHasStarted(true)
      setHasCompleted(true)
    }
  }, [value])

  useEffect(() => {
    if (isReducedMotion || hasCompleted) return

    if (!inView) return

    let frame = 0
    setHasStarted(true)
    const start = performance.now()
    
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)

      setCurrent(value * eased)

      if (progress < 1) {
        frame = requestAnimationFrame(tick)
      } else {
        setHasCompleted(true)
      }
    }

    frame = requestAnimationFrame(tick)

    return () => {
      if (frame) cancelAnimationFrame(frame)
    }
  }, [inView, value, duration, hasCompleted, isReducedMotion])

  return (
    <span ref={ref} className="inline-block">
      {prefix}
      {current.toFixed(decimals)}
      {suffix}
    </span>
  )
}