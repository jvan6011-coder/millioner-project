import { useState, useEffect } from 'react'
import { Menu, X, Zap } from 'lucide-react'
import Button from '../ui/Button'
import ThemeToggle from '../ui/ThemeToggle'

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Case Studies', href: '#case-studies' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'backdrop-blur-xl backdrop-saturate-150 shadow-[0_1px_30px_rgba(99,102,241,0.04)]' : 'bg-transparent'}`}
      style={scrolled ? { backgroundColor: 'var(--nav-bg)', borderBottom: '1px solid var(--border-color)' } : {}}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a href="#" className="flex items-center gap-2.5 font-bold text-xl tracking-tight" style={{ color: 'var(--text-primary)', fontFamily: "'Space Grotesk', sans-serif" }}>
            <div className="w-8 h-8 rounded-lg bg-indigo-500/15 border border-indigo-500/25 flex items-center justify-center">
              <Zap className="w-4.5 h-4.5 text-indigo-400" />
            </div>
            NexusAI
          </a>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <a key={link.href} href={link.href} className="hover:text-[var(--text-primary)] transition-colors duration-200 text-sm font-medium px-3.5 py-2 rounded-lg hover:bg-[var(--accent-primary-muted)]" style={{ color: 'var(--text-secondary)' }}>
                {link.label}
              </a>
            ))}
            <ThemeToggle />
            <div className="ml-2">
              <Button size="sm">Book a Call</Button>
            </div>
          </div>

          <button className="md:hidden p-2 rounded-lg transition-colors" style={{ color: 'var(--text-primary)' }} onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden backdrop-blur-xl" style={{ backgroundColor: 'var(--nav-bg)', borderBottom: '1px solid var(--border-color)' }}>
          <div className="px-4 py-3 space-y-1">
            {navLinks.map(link => (
              <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="block transition-all py-2.5 px-3 rounded-lg text-base hover:bg-[var(--accent-primary-muted)]" style={{ color: 'var(--text-secondary)' }}>
                {link.label}
              </a>
            ))}
            <div className="pt-3 pb-1">
              <Button size="sm" className="w-full">Book a Call</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
