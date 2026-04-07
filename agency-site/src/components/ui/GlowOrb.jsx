import { useEffect, useRef } from 'react'

export default function GlowOrb({ size = 320, className = '' }) {
  const orbRef = useRef(null)

  useEffect(() => {
    const el = orbRef.current
    if (!el) return
    let animId
    let angle = 0

    const animate = () => {
      angle += 0.003
      const x = Math.sin(angle) * 8
      const y = Math.cos(angle * 0.7) * 6
      const scale = 1 + Math.sin(angle * 1.3) * 0.03
      el.style.transform = `translate(${x}px, ${y}px) scale(${scale})`
      animId = requestAnimationFrame(animate)
    }
    animate()
    return () => cancelAnimationFrame(animId)
  }, [])

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      {/* Outer red glow */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(252,0,0,0.4) 0%, transparent 70%)',
          filter: 'blur(60px)',
          transform: 'scale(1.8)',
        }}
      />

      {/* Main orb */}
      <div
        ref={orbRef}
        className="absolute inset-0 rounded-full"
        style={{
          background: `
            radial-gradient(circle at 50% 30%,
              rgba(255,255,255,0.9) 0%,
              rgba(200,140,255,0.8) 15%,
              rgba(255,62,222,0.9) 40%,
              rgba(255,0,100,1) 70%,
              rgba(255,0,0,1) 100%
            )
          `,
          boxShadow: `
            0 0 60px rgba(255,0,0,0.75),
            0 0 200px rgba(252,0,0,0.4),
            inset 0 -8px 30px rgba(255,229,88,0.28),
            inset 0 12px 39px rgba(255,229,68,0.6),
            inset 0 36px 114px rgba(255,255,255,0.64)
          `,
        }}
      />

      {/* Glass highlight overlay */}
      <div
        className="absolute rounded-full overflow-hidden"
        style={{
          top: '5%',
          left: '10%',
          width: '80%',
          height: '45%',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.05) 100%)',
          filter: 'blur(4px)',
          mixBlendMode: 'screen',
        }}
      />

      {/* Inner blue tint at edges */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle, transparent 50%, rgba(0,34,233,0.35) 100%)',
          mixBlendMode: 'screen',
        }}
      />

      {/* Bottom reflection glow */}
      <div
        className="absolute left-1/2 -translate-x-1/2 rounded-full"
        style={{
          bottom: '-40%',
          width: '70%',
          height: '60%',
          background: 'radial-gradient(ellipse, rgba(255,0,80,0.5) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
    </div>
  )
}
