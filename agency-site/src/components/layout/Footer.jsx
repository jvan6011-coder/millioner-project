import { Zap, Globe, MessageCircle, Share2, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--bg-base)', borderTop: '1px solid var(--border-color)' }}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 lg:gap-12">
          <div className="sm:col-span-2 md:col-span-1">
            <a href="#" className="flex items-center gap-2.5 font-bold text-xl tracking-tight mb-5" style={{ color: 'var(--text-primary)', fontFamily: "'Space Grotesk', sans-serif" }}>
              <div className="w-8 h-8 rounded-lg bg-indigo-500/15 border border-indigo-500/25 flex items-center justify-center">
                <Zap className="w-4 h-4 text-indigo-400" />
              </div>
              NexusAI
            </a>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: 'var(--text-muted)' }}>
              We build AI solutions that transform how businesses operate. Faster. Smarter. More efficient.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider mb-5" style={{ color: 'var(--text-primary)', letterSpacing: '0.05em' }}>Services</h4>
            <ul className="space-y-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
              <li><a href="#services" className="hover:text-[var(--text-primary)] transition-colors duration-200">AI Development</a></li>
              <li><a href="#services" className="hover:text-[var(--text-primary)] transition-colors duration-200">Process Automation</a></li>
              <li><a href="#services" className="hover:text-[var(--text-primary)] transition-colors duration-200">AI Consulting</a></li>
              <li><a href="#pricing" className="hover:text-[var(--text-primary)] transition-colors duration-200">Pricing</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider mb-5" style={{ color: 'var(--text-primary)', letterSpacing: '0.05em' }}>Company</h4>
            <ul className="space-y-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
              <li><a href="#case-studies" className="hover:text-[var(--text-primary)] transition-colors duration-200">Case Studies</a></li>
              <li><a href="#" className="hover:text-[var(--text-primary)] transition-colors duration-200">About Us</a></li>
              <li><a href="#" className="hover:text-[var(--text-primary)] transition-colors duration-200">Blog</a></li>
              <li><a href="#contact" className="hover:text-[var(--text-primary)] transition-colors duration-200">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider mb-5" style={{ color: 'var(--text-primary)', letterSpacing: '0.05em' }}>Connect</h4>
            <div className="flex gap-2.5">
              {[
                { Icon: MessageCircle, href: '#' },
                { Icon: Share2, href: '#' },
                { Icon: Globe, href: '#' },
                { Icon: Mail, href: '#contact' },
              ].map(({ Icon, href }, i) => (
                <a key={i} href={href} className="w-9 h-9 rounded-lg flex items-center justify-center hover:text-indigo-400 hover:border-indigo-500/40 transition-all duration-200" style={{ backgroundColor: 'var(--accent-primary-muted)', border: '1px solid var(--border-default)', color: 'var(--text-muted)' }}>
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs" style={{ borderTop: '1px solid var(--border-color)', color: 'var(--text-faint)' }}>
          <span>&copy; {new Date().getFullYear()} NexusAI. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[var(--text-secondary)] transition-colors duration-200">Privacy Policy</a>
            <a href="#" className="hover:text-[var(--text-secondary)] transition-colors duration-200">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
