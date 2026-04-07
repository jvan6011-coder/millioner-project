export default function Button({ children, variant = 'primary', size = 'md', className = '', ...props }) {
  const base = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 cursor-pointer active:scale-[0.97]'
  const variants = {
    primary: 'bg-indigo-500 hover:bg-indigo-400 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5',
    outline: 'border border-white/15 hover:border-indigo-500/50 text-white hover:bg-white/[0.04] hover:shadow-[0_0_20px_rgba(99,102,241,0.08)]',
    ghost: 'text-[#94a3b8] hover:text-white hover:bg-white/[0.04]',
  }
  const sizes = {
    sm: 'px-5 py-2.5 text-sm',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  }
  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  )
}
