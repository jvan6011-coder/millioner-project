const models = [
  { value: 'gpt-4', label: 'GPT-4' },
  { value: 'gpt-4-turbo', label: 'GPT-4 Turbo' },
  { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' },
  { value: 'claude-3-opus', label: 'Claude 3 Opus' },
  { value: 'claude-3-sonnet', label: 'Claude 3 Sonnet' },
]

export default function AIProcessStep({ config, onUpdate }) {
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="model-select" className="block text-sm font-medium text-slate-300 mb-1.5">
          AI Model
        </label>
        <select
          id="model-select"
          value={config.model || ''}
          onChange={(e) => onUpdate({ model: e.target.value })}
          className="w-full px-3 py-2 bg-[#0a0a0f] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        >
          <option value="">Select a model</option>
          {models.map((m) => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="prompt" className="block text-sm font-medium text-slate-300 mb-1.5">
          Prompt
        </label>
        <textarea
          id="prompt"
          value={config.prompt || ''}
          onChange={(e) => onUpdate({ prompt: e.target.value })}
          placeholder="Describe what the AI should do with the input data..."
          rows={6}
          className="w-full px-3 py-2 bg-[#0a0a0f] border border-white/10 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition resize-none"
        />
      </div>

      <div>
        <label htmlFor="temperature" className="block text-sm font-medium text-slate-300 mb-1.5">
          Temperature: {config.temperature ?? 0.7}
        </label>
        <input
          id="temperature"
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={config.temperature ?? 0.7}
          onChange={(e) => onUpdate({ temperature: parseFloat(e.target.value) })}
          className="w-full accent-indigo-500"
        />
        <div className="flex justify-between text-xs text-slate-500 mt-1">
          <span>Precise (0)</span>
          <span>Creative (1)</span>
        </div>
      </div>
    </div>
  )
}
