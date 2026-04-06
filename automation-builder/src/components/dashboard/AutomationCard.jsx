import { Webhook, Clock, MousePointerClick, MoreVertical } from 'lucide-react'

const statusColors = {
  active: 'bg-emerald-500/15 text-emerald-400',
  paused: 'bg-amber-500/15 text-amber-400',
  error: 'bg-red-500/15 text-red-400',
}

const triggerIcons = {
  webhook: Webhook,
  schedule: Clock,
  manual: MousePointerClick,
}

export default function AutomationCard({ automation, onClick }) {
  const TriggerIcon = triggerIcons[automation.triggerType] || Webhook

  return (
    <button
      onClick={onClick}
      className="w-full bg-[#16161f] border border-white/10 rounded-xl p-5 hover:border-indigo-500/30 transition text-left cursor-pointer group"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-indigo-500/15 rounded-lg flex items-center justify-center">
            <TriggerIcon className="w-4 h-4 text-indigo-400" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white group-hover:text-indigo-300 transition">
              {automation.name}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">{automation.steps} steps</p>
          </div>
        </div>
        <span
          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium capitalize ${
            statusColors[automation.status] || statusColors.active
          }`}
        >
          {automation.status}
        </span>
      </div>

      <div className="flex items-center justify-between text-xs text-slate-400">
        <span>Trigger: {automation.triggerType}</span>
        <span>Last run: {automation.lastRun}</span>
      </div>

      <div className="flex items-center gap-4 mt-3 pt-3 border-t border-white/5 text-xs text-slate-500">
        <span>{automation.totalRuns?.toLocaleString()} runs</span>
        <span>{automation.successRate}% success</span>
      </div>
    </button>
  )
}
