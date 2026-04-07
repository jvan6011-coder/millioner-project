import { Zap, Globe, MessageCircle, Share2, Mail } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer style={{ backgroundColor: 'var(--bg-base)', borderTop: '1px solid var(--border-color)' }}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
          <div className="col-span-1 sm:col-span-2 md:col-span-1">
            <a href="#" className="flex items-center gap-2.5 font-bold text-xl tracking-tight mb-5" style={{ color: 'var(--text-primary)', fontFamily: "'Space Grotesk', sans-serif" }}>
              <div className="w-8 h-8 rounded-lg bg-indigo-500/15 border border-indigo-500/25 flex items-center justify-center">
                <Zap className="w-4 h-4 text-indigo-400" />
              </div>
              NexusAI
            </a>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: 'var(--text-muted)' }}>
              {t('footer.desc')}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider mb-5" style={{ color: 'var(--text-primary)', letterSpacing: '0.05em' }}>{t('footer.services')}</h4>
            <ul className="space-y-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
              <li><a href="#services" className="hover:text-[var(--text-primary)] transition-colors duration-200 inline-block py-1">{t('footer.ai_dev')}</a></li>
              <li><a href="#services" className="hover:text-[var(--text-primary)] transition-colors duration-200 inline-block py-1">{t('footer.automation')}</a></li>
              <li><a href="#services" className="hover:text-[var(--text-primary)] transition-colors duration-200 inline-block py-1">{t('footer.consulting')}</a></li>
              <li><a href="#pricing" className="hover:text-[var(--text-primary)] transition-colors duration-200 inline-block py-1">{t('pricing.label')}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider mb-5" style={{ color: 'var(--text-primary)', letterSpacing: '0.05em' }}>{t('footer.company')}</h4>
            <ul className="space-y-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
              <li><a href="#case-studies" className="hover:text-[var(--text-primary)] transition-colors duration-200 inline-block py-1">{t('footer.case_studies')}</a></li>
              <li><a href="#" className="hover:text-[var(--text-primary)] transition-colors duration-200 inline-block py-1">{t('footer.about')}</a></li>
              <li><a href="#" className="hover:text-[var(--text-primary)] transition-colors duration-200 inline-block py-1">{t('footer.blog')}</a></li>
              <li><a href="#contact" className="hover:text-[var(--text-primary)] transition-colors duration-200 inline-block py-1">{t('footer.contact')}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider mb-5" style={{ color: 'var(--text-primary)', letterSpacing: '0.05em' }}>{t('footer.connect')}</h4>
            <div className="flex gap-2.5 justify-center sm:justify-start">
              {[
                { Icon: MessageCircle, href: '#' },
                { Icon: Share2, href: '#' },
                { Icon: Globe, href: '#' },
                { Icon: Mail, href: '#contact' },
              ].map(({ Icon, href }, i) => (
                <a key={i} href={href} className="w-11 h-11 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center hover:text-indigo-400 hover:border-indigo-500/40 transition-all duration-200" style={{ backgroundColor: 'var(--accent-primary-muted)', border: '1px solid var(--border-default)', color: 'var(--text-muted)' }}>
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs" style={{ borderTop: '1px solid var(--border-color)', color: 'var(--text-faint)' }}>
          <span>&copy; {new Date().getFullYear()} NexusAI. {t('footer.rights')}</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[var(--text-secondary)] transition-colors duration-200">{t('footer.privacy')}</a>
            <a href="#" className="hover:text-[var(--text-secondary)] transition-colors duration-200">{t('footer.terms')}</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
