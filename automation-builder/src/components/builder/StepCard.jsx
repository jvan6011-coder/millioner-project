import { Webhook, Clock, MousePointerClick, Brain, Send, Trash2, GripVertical, ChevronUp, ChevronDown } from 'lucide-react'

const stepTypeConfig = {
  trigger: {
    label: 'Trigger',
    color: 'border-emerald-500/30 bg-emerald-500/5',
    iconBg: 'bg-emerald-500/15',
    iconColor: 'text-emerald-400',
    icon: Webhook,
  },
  'ai-process': {
    label: 'AI Process',
    color: 'border-purple-500/30 bg-purple-500/5',
    iconBg: 'bg-purple-500/15',
    iconColor: 'text-purple-400',
    icon: Brain,
  },
  output: {
    label: 'Output',
    color: 'border-blue-500/30 bg-blue-500/5',
    iconBg: 'bg-blue-500/15',
    iconColor: 'text-blue-400',
    icon: Send,
  },
}

const triggerSubIcons = {
  webhook: Webhook,
  schedule: Clock,
  manual: MousePointerClick,
}

function getConfigSummary(step) {
  if (step.type === 'trigger') {
    return step.config.label || step.config.triggerType || 'Configure trigger'
  }
  if (step.type === 'ai-process') {
    const model = step.config.model || 'No model'
    const promptPreview = step.config.prompt
      ? step.config.prompt.substring(0, 50) + (step.config.prompt.length > 50 ? '...' : '')
      : 'No prompt set'
    return `${model} - ${promptPreview}`
  }
  if (step.type === 'output') {
    return step.config.outputType || 'Configure output'
  }
  return 'Configure step'
}

export default function StepCard({ step, index, isSelected, onSelect, onRemove, onMoveUp, onMoveDown, isFirst, isLast }) {
  const config = stepTypeConfig[step.type] || stepTypeConfig.trigger
  const Icon = step.type === 'trigger' && step.config.triggerType
    ? triggerSubIcons[step.config.triggerType] || config.icon
    : config.icon

  return (
    <div className="relative">
      <button
        onClick={onSelect}
        className={`w-full text-left rounded-xl border p-4 transition cursor-pointer ${config.color} ${
          isSelected ? 'ring-2 ring-indigo-500' : 'hover:border-white/20'
        }`}
      >
        <div className="flex items-start gap-3">
          <div className="flex flex-col items-center gap-1 pt-0.5">
            <button
              onClick={(e) => { e.stopPropagation(); onMoveUp(); }}
              disabled={isFirst}
              className="p-0.5 text-slate-500 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer"
              aria-label="Move step up"
            >
              <ChevronUp className="w-3.5 h-3.5" />
            </button>
            <GripVertical className="w-3.5 h-3.5 text-slate-600" />
            <button
              onClick={(e) => { e.stopPropagation(); onMoveDown(); }}
              disabled={isLast}
              className="p-0.5 text-slate-500 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer"
              aria-label="Move step down"
            >
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className={`w-9 h-9 ${config.iconBg} rounded-lg flex items-center justify-center shrink-0`}>
            <Icon className={`w-4 h-4 ${config.iconColor}`} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Step {index + 1}
              </span>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${config.iconBg} ${config.iconColor}`}>
                {config.label}
              </span>
            </div>
            <p className="text-sm text-slate-300 truncate">{getConfigSummary(step)}</p>
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); onRemove(); }}
            className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition cursor-pointer"
            aria-label="Remove step"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </button>
    </div>
  )
}
