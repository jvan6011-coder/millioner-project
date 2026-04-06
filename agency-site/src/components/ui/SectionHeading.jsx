export default function SectionHeading({ label, title, subtitle }) {
  return (
    <div className="text-center mb-16">
      {label && (
        <span className="inline-block px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-sm font-medium mb-4">
          {label}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{title}</h2>
      {subtitle && <p className="text-[#94a3b8] text-lg max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  )
}
