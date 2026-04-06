import { GitBranch, Play, BarChart3, CheckCircle } from 'lucide-react'

const statConfig = [
  { key: 'totalWorkflows', label: 'Total Workflows', icon: GitBranch, color: 'text-indigo-400', bg: 'bg-indigo-500/15' },
  { key: 'activeWorkflows', label: 'Active', icon: Play, color: 'text-emerald-400', bg: 'bg-emerald-500/15' },
  { key: 'totalRuns', label: 'Total Runs', icon: BarChart3, color: 'text-blue-400', bg: 'bg-blue-500/15' },
  { key: 'successRate', label: 'Success Rate', icon: CheckCircle, color: 'text-amber-400', bg: 'bg-amber-500/15', suffix: '%' },
]

export default function StatsBar({ stats }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statConfig.map(({ key, label, icon: Icon, color, bg, suffix }) => (
        <div
          key={key}
          className="bg-[#16161f] border border-white/10 rounded-xl p-5 flex items-center gap-4"
        >
          <div className={`w-11 h-11 ${bg} rounded-xl flex items-center justify-center`}>
            <Icon className={`w-5 h-5 ${color}`} />
          </div>
          <div>
            <p className="text-sm text-slate-400">{label}</p>
            <p className="text-2xl font-bold text-white">
              {stats[key]?.toLocaleString()}{suffix || ''}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
