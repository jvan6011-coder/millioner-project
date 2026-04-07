import { useEffect, useRef, useState } from 'react'

export default function SectionHeading({ label, title, subtitle }) {
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
    const timeout = setTimeout(() => setTriggered(true), 1500)
    return () => { observer.disconnect(); clearTimeout(timeout) }
  }, [])

  return (
    <div
      ref={ref}
      className="text-center mb-16 md:mb-20"
      style={{
        opacity: triggered ? 1 : 0,
        transform: triggered ? 'none' : 'translateY(25px)',
        transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
      }}
    >
      {label && (
        <span className="inline-block px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-xs font-semibold uppercase mb-5" style={{ letterSpacing: '0.05em' }}>
          {label}
        </span>
      )}
      <h2 style={{ color: 'var(--text-primary)', fontFamily: "'Space Grotesk', sans-serif" }} className="mb-5 leading-tight">{title}</h2>
      {subtitle && <p className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)', letterSpacing: '-0.011em' }}>{subtitle}</p>}
    </div>
  )
}
