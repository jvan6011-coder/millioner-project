export default function Button({ children, variant = 'primary', size = 'md', className = '', ...props }) {
  const base = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 cursor-pointer active:scale-[0.97]'
  const variants = {
    primary: 'bg-indigo-500 hover:bg-indigo-400 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5',
    outline: 'border hover:border-indigo-500/50 hover:shadow-[0_0_20px_rgba(99,102,241,0.08)]',
    ghost: 'hover:bg-[var(--accent-primary-muted)]',
  }
  const sizes = {
    sm: 'px-5 py-2.5 text-sm min-h-[44px]',
    md: 'px-6 py-3 text-sm min-h-[44px]',
    lg: 'px-8 py-4 text-base min-h-[44px]',
  }

  const variantStyles = {
    outline: { borderColor: 'var(--border-strong)', color: 'var(--text-primary)' },
    ghost: { color: 'var(--text-secondary)' },
  }

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      style={variantStyles[variant] || {}}
      {...props}
    >
      {children}
    </button>
  )
}
