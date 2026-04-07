import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const isLight = theme === 'light'

  return (
    <button
      onClick={toggle}
      className="relative w-14 h-7 rounded-full transition-colors duration-300 cursor-pointer border"
      style={{
        backgroundColor: isLight ? '#e2e8f0' : '#1e293b',
        borderColor: isLight ? '#cbd5e1' : '#334155',
      }}
      aria-label={`Switch to ${isLight ? 'dark' : 'light'} mode`}
    >
      <div
        className="absolute top-0.5 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm"
        style={{
          left: isLight ? 'calc(100% - 26px)' : '2px',
          backgroundColor: isLight ? '#ffffff' : '#6366f1',
        }}
      >
        {isLight ? (
          <Sun className="w-3.5 h-3.5 text-amber-500" />
        ) : (
          <Moon className="w-3.5 h-3.5 text-white" />
        )}
      </div>
    </button>
  )
}
