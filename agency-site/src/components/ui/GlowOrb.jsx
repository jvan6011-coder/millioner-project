import { useEffect, useRef, useState } from 'react'

export default function GlowOrb({ size = 320, className = '' }) {
  const containerRef = useRef(null)
  const orbRef = useRef(null)
  const highlightRef = useRef(null)
  const glowRef = useRef(null)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  // Mouse tracking
  useEffect(() => {
    const handleMove = (e) => {
      const el = containerRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      setMouse({
        x: (e.clientX - cx) / (rect.width / 2),
        y: (e.clientY - cy) / (rect.height / 2),
      })
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  // Floating + rotation animation
  useEffect(() => {
    const orb = orbRef.current
    const highlight = highlightRef.current
    const glow = glowRef.current
    if (!orb) return
    let animId
    let angle = 0

    const animate = () => {
      angle += 0.008

      // Floating motion
      const floatX = Math.sin(angle * 0.7) * 6
      const floatY = Math.cos(angle * 0.5) * 8
      const scale = 1 + Math.sin(angle * 1.1) * 0.02

      // Mouse influence on 3D rotation
      const rotX = mouse.y * -25 + Math.sin(angle * 0.4) * 5
      const rotY = mouse.x * 25 + Math.cos(angle * 0.6) * 5
      const rotZ = Math.sin(angle * 0.3) * 3

      orb.style.transform = `
        translate(${floatX}px, ${floatY}px)
        scale(${scale})
        perspective(600px)
        rotateX(${rotX}deg)
        rotateY(${rotY}deg)
        rotateZ(${rotZ}deg)
      `

      // Move highlight based on mouse (like light source)
      if (highlight) {
        const hx = 50 + mouse.x * 20
        const hy = 30 + mouse.y * 15
        highlight.style.background = `radial-gradient(circle at ${hx}% ${hy}%,
          rgba(255,255,255,0.9) 0%,
          rgba(200,140,255,0.8) 15%,
          rgba(255,62,222,0.9) 40%,
          rgba(255,0,100,1) 70%,
          rgba(255,0,0,1) 100%
        )`
      }

      // Move outer glow with mouse
      if (glow) {
        glow.style.transform = `translate(${mouse.x * 15}px, ${mouse.y * 15}px) scale(1.8)`
      }

      animId = requestAnimationFrame(animate)
    }
    animate()
    return () => cancelAnimationFrame(animId)
  }, [mouse.x, mouse.y])

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Outer glow - follows mouse */}
      <div
        ref={glowRef}
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(252,0,0,0.4) 0%, transparent 70%)',
          filter: 'blur(60px)',
          transform: 'scale(1.8)',
          transition: 'transform 0.3s ease-out',
        }}
      />

      {/* Main orb with 3D rotation */}
      <div
        ref={orbRef}
        className="absolute inset-0 rounded-full"
        style={{
          transformStyle: 'preserve-3d',
          transition: 'none',
          willChange: 'transform',
        }}
      >
        {/* Gradient sphere surface */}
        <div
          ref={highlightRef}
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle at 50% 30%,
              rgba(255,255,255,0.9) 0%,
              rgba(200,140,255,0.8) 15%,
              rgba(255,62,222,0.9) 40%,
              rgba(255,0,100,1) 70%,
              rgba(255,0,0,1) 100%
            )`,
            boxShadow: `
              0 0 60px rgba(255,0,0,0.75),
              0 0 200px rgba(252,0,0,0.4),
              inset 0 -8px 30px rgba(255,229,88,0.28),
              inset 0 12px 39px rgba(255,229,68,0.6),
              inset 0 36px 114px rgba(255,255,255,0.64)
            `,
          }}
        />

        {/* Glass specular highlight - moves with light */}
        <div
          className="absolute rounded-full overflow-hidden"
          style={{
            top: `${5 + mouse.y * -8}%`,
            left: `${10 + mouse.x * 10}%`,
            width: '75%',
            height: '40%',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 100%)',
            filter: 'blur(6px)',
            mixBlendMode: 'screen',
            transition: 'top 0.2s ease-out, left 0.2s ease-out',
          }}
        />

        {/* Edge rim light */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle at ${50 - mouse.x * 30}% ${50 - mouse.y * 30}%, transparent 45%, rgba(255,200,255,0.4) 80%, rgba(255,255,255,0.2) 100%)`,
            mixBlendMode: 'screen',
          }}
        />

        {/* Blue edge tint */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle, transparent 50%, rgba(0,34,233,0.35) 100%)',
            mixBlendMode: 'screen',
          }}
        />
      </div>

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
