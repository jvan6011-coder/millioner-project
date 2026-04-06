import { Mail, FileText, Database, ArrowRight } from 'lucide-react'

const iconMap = {
  Mail,
  FileText,
  Database,
}

export default function TemplateCard({ template, onUse }) {
  const Icon = iconMap[template.icon] || FileText

  return (
    <div className="bg-[#16161f] border border-white/10 rounded-xl p-6 hover:border-indigo-500/30 transition group">
      <div className="w-12 h-12 bg-indigo-500/15 rounded-xl flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-indigo-400" />
      </div>
      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-indigo-300 transition">
        {template.name}
      </h3>
      <p className="text-sm text-slate-400 mb-4 leading-relaxed">{template.description}</p>
      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-500">{template.steps.length} steps</span>
        <button
          onClick={() => onUse(template)}
          className="flex items-center gap-1.5 text-sm font-medium text-indigo-400 hover:text-indigo-300 transition cursor-pointer"
        >
          Use Template
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  )
}
