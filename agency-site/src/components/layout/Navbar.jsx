import { useState, useEffect } from 'react'
import { Menu, X, Zap } from 'lucide-react'
import Button from '../ui/Button'

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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0a0a0f]/90 backdrop-blur-md border-b border-white/5' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a href="#" className="flex items-center gap-2 text-white font-bold text-xl">
            <Zap className="w-6 h-6 text-indigo-400" />
            NexusAI
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <a key={link.href} href={link.href} className="text-[#94a3b8] hover:text-white transition-colors text-sm font-medium">
                {link.label}
              </a>
            ))}
            <Button size="sm">Book a Call</Button>
          </div>

          <button className="md:hidden text-white" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-[#12121a] border-b border-white/10">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map(link => (
              <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="block text-[#94a3b8] hover:text-white transition-colors py-2 text-base">
                {link.label}
              </a>
            ))}
            <Button size="sm" className="w-full mt-2">Book a Call</Button>
          </div>
        </div>
      )}
    </nav>
  )
}
