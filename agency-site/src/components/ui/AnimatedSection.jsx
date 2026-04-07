import { useEffect, useRef, useState } from 'react'

export default function AnimatedSection({ children, className = '', delay = 0, direction = 'up' }) {
  const [triggered, setTriggered] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px 50px 0px' }
    )
    if (ref.current) observer.observe(ref.current)

    // Fallback: if not triggered after 2s, show anyway
    const timeout = setTimeout(() => setTriggered(true), 2000 + delay * 1000)

    return () => {
      observer.disconnect()
      clearTimeout(timeout)
    }
  }, [delay])

  const directions = {
    up: 'translateY(30px)',
    down: 'translateY(-30px)',
    left: 'translateX(30px)',
    right: 'translateX(-30px)',
    scale: 'scale(0.95)',
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: triggered ? 1 : 0,
        transform: triggered ? 'none' : directions[direction],
        transition: `opacity 0.6s ease-out ${delay}s, transform 0.6s ease-out ${delay}s`,
      }}
    >
      {children}
    </div>
  )
}
