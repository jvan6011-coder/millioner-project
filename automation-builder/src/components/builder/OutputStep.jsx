import { Mail, Webhook, FileText, Bell } from 'lucide-react'

const outputTypes = [
  { value: 'email', label: 'Email', icon: Mail },
  { value: 'webhook', label: 'Webhook', icon: Webhook },
  { value: 'file', label: 'File', icon: FileText },
  { value: 'notification', label: 'Notification', icon: Bell },
]

export default function OutputStep({ config, onUpdate }) {
  const selected = config.outputType || ''

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">Output Type</label>
        <div className="grid grid-cols-2 gap-2">
          {outputTypes.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              onClick={() => onUpdate({ outputType: value })}
              className={`flex items-center gap-2 p-3 rounded-xl border text-sm transition cursor-pointer ${
                selected === value
                  ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400'
                  : 'border-white/10 text-slate-400 hover:border-white/20'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {selected === 'email' && (
        <>
          <div>
            <label htmlFor="recipient" className="block text-sm font-medium text-slate-300 mb-1.5">
              Recipient
            </label>
            <input
              id="recipient"
              type="email"
              value={config.recipient || ''}
              onChange={(e) => onUpdate({ recipient: e.target.value })}
              placeholder="recipient@example.com"
              className="w-full px-3 py-2 bg-[#0a0a0f] border border-white/10 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-slate-300 mb-1.5">
              Subject
            </label>
            <input
              id="subject"
              type="text"
              value={config.subject || ''}
              onChange={(e) => onUpdate({ subject: e.target.value })}
              placeholder="Email subject line"
              className="w-full px-3 py-2 bg-[#0a0a0f] border border-white/10 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>
        </>
      )}

      {selected === 'webhook' && (
        <>
          <div>
            <label htmlFor="out-webhook-url" className="block text-sm font-medium text-slate-300 mb-1.5">
              Webhook URL
            </label>
            <input
              id="out-webhook-url"
              type="url"
              value={config.webhookUrl || ''}
              onChange={(e) => onUpdate({ webhookUrl: e.target.value })}
              placeholder="https://api.example.com/endpoint"
              className="w-full px-3 py-2 bg-[#0a0a0f] border border-white/10 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>
          <div>
            <label htmlFor="method" className="block text-sm font-medium text-slate-300 mb-1.5">
              Method
            </label>
            <select
              id="method"
              value={config.method || 'POST'}
              onChange={(e) => onUpdate({ method: e.target.value })}
              className="w-full px-3 py-2 bg-[#0a0a0f] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            >
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="PATCH">PATCH</option>
            </select>
          </div>
        </>
      )}

      {selected === 'file' && (
        <>
          <div>
            <label htmlFor="filename" className="block text-sm font-medium text-slate-300 mb-1.5">
              File Name
            </label>
            <input
              id="filename"
              type="text"
              value={config.fileName || ''}
              onChange={(e) => onUpdate({ fileName: e.target.value })}
              placeholder="output_{{timestamp}}.json"
              className="w-full px-3 py-2 bg-[#0a0a0f] border border-white/10 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>
          <div>
            <label htmlFor="format" className="block text-sm font-medium text-slate-300 mb-1.5">
              Format
            </label>
            <select
              id="format"
              value={config.format || 'JSON'}
              onChange={(e) => onUpdate({ format: e.target.value })}
              className="w-full px-3 py-2 bg-[#0a0a0f] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            >
              <option value="JSON">JSON</option>
              <option value="CSV">CSV</option>
              <option value="TXT">TXT</option>
            </select>
          </div>
        </>
      )}

      {selected === 'notification' && (
        <div>
          <label htmlFor="channel" className="block text-sm font-medium text-slate-300 mb-1.5">
            Notification Channel
          </label>
          <select
            id="channel"
            value={config.channel || 'in-app'}
            onChange={(e) => onUpdate({ channel: e.target.value })}
            className="w-full px-3 py-2 bg-[#0a0a0f] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          >
            <option value="in-app">In-App</option>
            <option value="slack">Slack</option>
            <option value="discord">Discord</option>
          </select>
        </div>
      )}
    </div>
  )
}
