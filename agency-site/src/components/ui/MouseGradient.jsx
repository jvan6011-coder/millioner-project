import { useState, useEffect, useRef } from 'react'

export default function MouseGradient() {
  const [pos, setPos] = useState({ x: 50, y: 50 })
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current?.parentElement
    if (!el) return
    const handleMove = (e) => {
      const rect = el.getBoundingClientRect()
      setPos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      })
    }
    el.addEventListener('mousemove', handleMove)
    return () => el.removeEventListener('mousemove', handleMove)
  }, [])

  return (
    <div
      ref={ref}
      className="absolute inset-0 pointer-events-none transition-opacity duration-500"
      style={{
        background: `radial-gradient(800px circle at ${pos.x}% ${pos.y}%, rgba(99,102,241,0.12), rgba(139,92,246,0.06) 40%, transparent 70%)`,
      }}
    />
  )
}
