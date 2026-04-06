import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Zap } from 'lucide-react'

export default function AuthLayout() {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#0a0a0f]">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 bg-indigo-500/20 rounded-xl flex items-center justify-center">
            <Zap className="w-5 h-5 text-indigo-400" />
          </div>
          <span className="text-xl font-bold text-white">AutoFlow AI</span>
        </div>
        <div className="bg-[#16161f] border border-white/10 rounded-2xl p-8">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
