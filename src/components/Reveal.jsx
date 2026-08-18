import { useEffect, useRef, useState } from 'react'

export function useInView(once = true) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const element = ref.current

    if (!element || typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true)

            if (once) {
              observer.disconnect()
            }
          } else if (!once) {
            setInView(false)
          }
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -8% 0px',
      }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [once])

  return {
    ref,
    inView,
  }
}

export function Reveal({
  children,
  className = '',
  delay = 0,
  as: Tag = 'div',
}) {
  const { ref, inView } = useInView()

  return (
    <Tag
      ref={ref}
      data-visible={inView}
      style={
        delay
          ? {
              transitionDelay: `${delay}ms`,
            }
          : undefined
      }
      className={`reveal ${className}`}
    >
      {children}
    </Tag>
  )
}