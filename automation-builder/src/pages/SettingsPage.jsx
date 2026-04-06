import { useAuth } from '../context/AuthContext'
import { User, Bell, Shield, Palette } from 'lucide-react'

export default function SettingsPage() {
  const { user } = useAuth()

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-slate-400 text-sm mt-1">Manage your account and preferences</p>
      </div>

      <div className="max-w-2xl space-y-6">
        <div className="bg-[#16161f] border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <User className="w-5 h-5 text-indigo-400" />
            <h2 className="text-lg font-semibold text-white">Profile</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Name</label>
              <input
                type="text"
                defaultValue={user?.name || ''}
                className="w-full px-3 py-2 bg-[#0a0a0f] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Email</label>
              <input
                type="email"
                defaultValue={user?.email || ''}
                className="w-full px-3 py-2 bg-[#0a0a0f] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>
          </div>
        </div>

        <div className="bg-[#16161f] border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Bell className="w-5 h-5 text-indigo-400" />
            <h2 className="text-lg font-semibold text-white">Notifications</h2>
          </div>
          <div className="space-y-3">
            {['Email notifications', 'Workflow failure alerts', 'Weekly usage reports'].map((item) => (
              <label key={item} className="flex items-center justify-between cursor-pointer">
                <span className="text-sm text-slate-300">{item}</span>
                <div className="w-10 h-5 bg-indigo-500 rounded-full relative">
                  <div className="w-4 h-4 bg-white rounded-full absolute right-0.5 top-0.5" />
                </div>
              </label>
            ))}
          </div>
        </div>

        <button className="px-4 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-lg transition cursor-pointer">
          Save Changes
        </button>
      </div>
    </div>
  )
}
