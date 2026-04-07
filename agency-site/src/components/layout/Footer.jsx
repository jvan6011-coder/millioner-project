import { Zap, Globe, MessageCircle, Share2, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0f] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 lg:gap-12">
          <div className="sm:col-span-2 md:col-span-1">
            <a href="#" className="flex items-center gap-2.5 text-white font-bold text-xl tracking-tight mb-5">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/15 border border-indigo-500/25 flex items-center justify-center">
                <Zap className="w-4 h-4 text-indigo-400" />
              </div>
              NexusAI
            </a>
            <p className="text-[#64748b] text-sm leading-relaxed max-w-xs">
              We build AI solutions that transform how businesses operate. Faster. Smarter. More efficient.
            </p>
          </div>

          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-5">Services</h4>
            <ul className="space-y-3 text-[#94a3b8] text-sm">
              <li><a href="#services" className="hover:text-white transition-colors duration-200">AI Development</a></li>
              <li><a href="#services" className="hover:text-white transition-colors duration-200">Process Automation</a></li>
              <li><a href="#services" className="hover:text-white transition-colors duration-200">AI Consulting</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors duration-200">Pricing</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-5">Company</h4>
            <ul className="space-y-3 text-[#94a3b8] text-sm">
              <li><a href="#case-studies" className="hover:text-white transition-colors duration-200">Case Studies</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Blog</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors duration-200">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-5">Connect</h4>
            <div className="flex gap-2.5">
              {[
                { Icon: MessageCircle, href: '#' },
                { Icon: Share2, href: '#' },
                { Icon: Globe, href: '#' },
                { Icon: Mail, href: '#contact' },
              ].map(({ Icon, href }, i) => (
                <a key={i} href={href} className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[#64748b] hover:text-indigo-400 hover:border-indigo-500/40 hover:bg-indigo-500/[0.06] transition-all duration-200">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/[0.06] mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[#4a5568] text-xs">
          <span>&copy; {new Date().getFullYear()} NexusAI. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#94a3b8] transition-colors duration-200">Privacy Policy</a>
            <a href="#" className="hover:text-[#94a3b8] transition-colors duration-200">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
