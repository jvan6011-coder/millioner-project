import { Zap, Globe, MessageCircle, Share2, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0f] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <a href="#" className="flex items-center gap-2 text-white font-bold text-xl mb-4">
              <Zap className="w-6 h-6 text-indigo-400" />
              NexusAI
            </a>
            <p className="text-[#94a3b8] text-sm leading-relaxed">
              We build AI solutions that transform how businesses operate. Faster. Smarter. More efficient.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-[#94a3b8] text-sm">
              <li><a href="#services" className="hover:text-white transition-colors">AI Development</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Process Automation</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">AI Consulting</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-[#94a3b8] text-sm">
              <li><a href="#case-studies" className="hover:text-white transition-colors">Case Studies</a></li>
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <div className="flex gap-3">
              {[
                { Icon: MessageCircle, href: '#' },
                { Icon: Share2, href: '#' },
                { Icon: Globe, href: '#' },
                { Icon: Mail, href: '#contact' },
              ].map(({ Icon, href }, i) => (
                <a key={i} href={href} className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#94a3b8] hover:text-indigo-400 hover:border-indigo-500/50 transition-all">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center text-[#94a3b8] text-sm">
          &copy; {new Date().getFullYear()} NexusAI. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
