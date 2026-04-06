export default function Card({ children, className = '', hover = true, ...props }) {
  return (
    <div
      className={`bg-[#16161f] border border-white/10 rounded-xl p-6 ${hover ? 'hover:border-indigo-500/50 transition-all duration-300 hover:-translate-y-1' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
