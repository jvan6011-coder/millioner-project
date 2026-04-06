export default function Button({ children, variant = 'primary', size = 'md', className = '', ...props }) {
  const base = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 cursor-pointer'
  const variants = {
    primary: 'bg-indigo-500 hover:bg-indigo-400 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-400/30',
    outline: 'border border-white/20 hover:border-indigo-500/50 text-white hover:bg-white/5',
    ghost: 'text-[#94a3b8] hover:text-white hover:bg-white/5',
  }
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }
  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  )
}
