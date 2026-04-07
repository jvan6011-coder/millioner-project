import { useState, useRef } from 'react'

export default function MagneticButton({ children, variant = 'primary', size = 'md', className = '', ...props }) {
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const ref = useRef(null)

  const base = 'inline-flex items-center justify-center font-semibold rounded-lg cursor-pointer relative overflow-hidden group'
  const variants = {
    primary: 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/25',
    outline: 'border',
    ghost: '',
  }
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  const variantStyles = {
    outline: { borderColor: 'var(--border-strong)', color: 'var(--text-primary)' },
    ghost: { color: 'var(--text-secondary)' },
  }

  const handleMouseMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    setOffset({ x: x * 0.15, y: y * 0.15 })
  }

  const handleMouseLeave = () => setOffset({ x: 0, y: 0 })

  return (
    <button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        transition: 'transform 0.2s ease-out, background-color 0.3s, border-color 0.3s, box-shadow 0.3s',
        ...(variantStyles[variant] || {}),
      }}
      {...props}
    >
      {/* Glow effect on hover */}
      <span className={`absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
        variant === 'primary'
          ? 'bg-gradient-to-r from-indigo-400 to-purple-500'
          : 'bg-[var(--accent-primary-muted)]'
      }`} />
      {/* Shimmer effect */}
      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  )
}
