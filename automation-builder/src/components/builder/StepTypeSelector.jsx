import { Webhook, Brain, Send, X } from 'lucide-react'

const stepTypes = [
  {
    type: 'trigger',
    label: 'Trigger',
    description: 'Start your workflow with a webhook, schedule, or manual trigger',
    icon: Webhook,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/15',
    hoverBorder: 'hover:border-emerald-500/40',
  },
  {
    type: 'ai-process',
    label: 'AI Process',
    description: 'Use an AI model to analyze, generate, or transform data',
    icon: Brain,
    color: 'text-purple-400',
    bg: 'bg-purple-500/15',
    hoverBorder: 'hover:border-purple-500/40',
  },
  {
    type: 'output',
    label: 'Output',
    description: 'Send results via email, webhook, file, or notification',
    icon: Send,
    color: 'text-blue-400',
    bg: 'bg-blue-500/15',
    hoverBorder: 'hover:border-blue-500/40',
  },
]

export default function StepTypeSelector({ onSelect, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-[#16161f] border border-white/10 rounded-2xl p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-semibold text-white">Add Step</h3>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3">
          {stepTypes.map(({ type, label, description, icon: Icon, color, bg, hoverBorder }) => (
            <button
              key={type}
              onClick={() => onSelect(type)}
              className={`w-full text-left p-4 rounded-xl border border-white/10 ${hoverBorder} transition cursor-pointer group`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${color}`} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white group-hover:text-indigo-300 transition">
                    {label}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">{description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
