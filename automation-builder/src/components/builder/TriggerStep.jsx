import { Webhook, Clock, MousePointerClick } from 'lucide-react'

const triggerTypes = [
  { value: 'webhook', label: 'Webhook', icon: Webhook },
  { value: 'schedule', label: 'Schedule', icon: Clock },
  { value: 'manual', label: 'Manual', icon: MousePointerClick },
]

export default function TriggerStep({ config, onUpdate }) {
  const selected = config.triggerType || ''

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">Trigger Type</label>
        <div className="grid grid-cols-3 gap-2">
          {triggerTypes.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              onClick={() => onUpdate({ triggerType: value })}
              className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border text-sm transition cursor-pointer ${
                selected === value
                  ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400'
                  : 'border-white/10 text-slate-400 hover:border-white/20'
              }`}
            >
              <Icon className="w-5 h-5" />
              {label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="trigger-label" className="block text-sm font-medium text-slate-300 mb-1.5">
          Label
        </label>
        <input
          id="trigger-label"
          type="text"
          value={config.label || ''}
          onChange={(e) => onUpdate({ label: e.target.value })}
          placeholder="e.g., Incoming Email Hook"
          className="w-full px-3 py-2 bg-[#0a0a0f] border border-white/10 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />
      </div>

      {selected === 'webhook' && (
        <div>
          <label htmlFor="webhook-url" className="block text-sm font-medium text-slate-300 mb-1.5">
            Webhook URL
          </label>
          <input
            id="webhook-url"
            type="url"
            value={config.webhookUrl || ''}
            onChange={(e) => onUpdate({ webhookUrl: e.target.value })}
            placeholder="https://hooks.autoflow.ai/..."
            className="w-full px-3 py-2 bg-[#0a0a0f] border border-white/10 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>
      )}

      {selected === 'schedule' && (
        <div>
          <label htmlFor="cron" className="block text-sm font-medium text-slate-300 mb-1.5">
            Cron Expression
          </label>
          <input
            id="cron"
            type="text"
            value={config.cronExpression || ''}
            onChange={(e) => onUpdate({ cronExpression: e.target.value })}
            placeholder="0 9 * * 1-5"
            className="w-full px-3 py-2 bg-[#0a0a0f] border border-white/10 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition font-mono"
          />
          <p className="text-xs text-slate-500 mt-1">Standard 5-field cron format</p>
        </div>
      )}
    </div>
  )
}
