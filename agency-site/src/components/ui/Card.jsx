export default function Card({ children, className = '', hover = true, ...props }) {
  return (
    <div
      className={`rounded-xl p-7 ${hover ? 'hover:border-indigo-500/50 transition-all duration-300 hover:-translate-y-1' : ''} ${className}`}
      style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-default)',
      }}
      {...props}
    >
      {children}
    </div>
  )
}
