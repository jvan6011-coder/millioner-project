import { NavLink } from 'react-router-dom'
import { LayoutDashboard, GitBranch, BookTemplate, CreditCard, Settings, Zap } from 'lucide-react'

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/builder', icon: GitBranch, label: 'Workflow Builder' },
  { to: '/templates', icon: BookTemplate, label: 'Templates' },
  { to: '/pricing', icon: CreditCard, label: 'Pricing' },
  { to: '/settings', icon: Settings, label: 'Settings' },
]

export default function Sidebar() {
  return (
    <aside className="w-60 bg-[#12121a] border-r border-white/10 flex flex-col h-screen fixed left-0 top-0">
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-white/10">
        <div className="w-9 h-9 bg-indigo-500/20 rounded-xl flex items-center justify-center">
          <Zap className="w-5 h-5 text-indigo-400" />
        </div>
        <span className="text-lg font-bold text-white">AutoFlow AI</span>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1" role="navigation" aria-label="Main navigation">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                isActive
                  ? 'bg-indigo-500/15 text-indigo-400'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`
            }
          >
            <Icon className="w-[18px] h-[18px]" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="px-3 pb-4">
        <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4">
          <p className="text-sm font-medium text-white mb-1">Free Plan</p>
          <p className="text-xs text-slate-400 mb-3">3 of 5 workflows used</p>
          <div className="w-full bg-white/10 rounded-full h-1.5 mb-3">
            <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: '60%' }} />
          </div>
          <NavLink
            to="/pricing"
            className="block text-center text-xs font-medium text-indigo-400 hover:text-indigo-300 transition"
          >
            Upgrade to Pro
          </NavLink>
        </div>
      </div>
    </aside>
  )
}
