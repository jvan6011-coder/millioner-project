import { useAuth } from '../../context/AuthContext'
import { LogOut, Bell } from 'lucide-react'

export default function TopBar() {
  const { user, logout } = useAuth()

  return (
    <header className="h-16 bg-[#12121a]/80 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-6 sticky top-0 z-30">
      <div />
      <div className="flex items-center gap-4">
        <button
          className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition cursor-pointer"
          aria-label="Notifications"
        >
          <Bell className="w-[18px] h-[18px]" />
        </button>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-sm font-semibold">
            {user?.avatar || 'U'}
          </div>
          <span className="text-sm font-medium text-white hidden sm:block">
            {user?.name || 'User'}
          </span>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-2 px-3 py-1.5 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition cursor-pointer"
          aria-label="Log out"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  )
}
