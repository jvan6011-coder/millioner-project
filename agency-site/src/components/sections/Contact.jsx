import { useState } from 'react'
import { Send, Mail, Calendar } from 'lucide-react'
import Button from '../ui/Button'
import SectionHeading from '../ui/SectionHeading'
import AnimatedSection from '../ui/AnimatedSection'
import { useLanguage } from '../../context/LanguageContext'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const { t } = useLanguage()

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const fields = [
    { label: t('contact.name'), type: 'text', placeholder: 'John Smith' },
    { label: t('contact.email'), type: 'email', placeholder: 'john@company.com' },
    { label: t('contact.company'), type: 'text', placeholder: 'Acme Inc.' },
  ]

  const expectItems = t('contact.expect_items')

  return (
    <section id="contact" className="py-16 md:py-24" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label={t('contact.label')}
          title={t('contact.title')}
          subtitle={t('contact.subtitle')}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 max-w-5xl mx-auto">
          <AnimatedSection>
            {submitted ? (
              <div className="rounded-2xl p-10 text-center" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid rgba(99,102,241,0.3)' }}>
                <div className="w-16 h-16 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto mb-5">
                  <Send className="w-7 h-7 text-indigo-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)', fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.02em' }}>{t('contact.sent_title')}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{t('contact.sent_desc')}</p>
              </div>
            ) : (
              <div className="rounded-2xl p-6 sm:p-8" style={{ backgroundColor: 'color-mix(in srgb, var(--bg-card) 50%, transparent)', border: '1px solid var(--border-color)' }}>
                <form onSubmit={handleSubmit} className="space-y-5">
                  {fields.map((field) => (
                    <div key={field.label}>
                      <label className="block text-xs font-medium uppercase mb-2" style={{ color: 'var(--text-secondary)', letterSpacing: '0.04em' }}>{field.label}</label>
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        required
                        className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-indigo-500/50 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.1)] transition-all duration-200"
                        style={{
                          backgroundColor: 'var(--input-bg)',
                          border: '1px solid var(--border-default)',
                          color: 'var(--text-primary)',
                          minHeight: '44px',
                        }}
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-xs font-medium uppercase mb-2" style={{ color: 'var(--text-secondary)', letterSpacing: '0.04em' }}>{t('contact.message')}</label>
                    <textarea
                      rows={4}
                      placeholder={t('contact.message_placeholder')}
                      required
                      className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-indigo-500/50 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.1)] transition-all duration-200 resize-none"
                      style={{
                        backgroundColor: 'var(--input-bg)',
                        border: '1px solid var(--border-default)',
                        color: 'var(--text-primary)',
                        minHeight: '44px',
                      }}
                    />
                  </div>
                  <Button className="w-full">
                    {t('contact.send')}
                    <Send className="w-4 h-4 ml-2" />
                  </Button>
                </form>
              </div>
            )}
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--text-primary)', fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.02em' }}>{t('contact.prefer_talk')}</h3>
                <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
                  {t('contact.prefer_talk_desc')}
                </p>
                <Button variant="outline" style={{ minHeight: '44px' }}>
                  <Calendar className="w-4 h-4 mr-2" />
                  {t('contact.book_call')}
                </Button>
              </div>

              <div className="rounded-2xl p-7" style={{ backgroundColor: 'color-mix(in srgb, var(--bg-card) 50%, transparent)', border: '1px solid var(--border-color)' }}>
                <h4 className="font-semibold text-sm mb-4" style={{ color: 'var(--text-primary)', fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.015em' }}>{t('contact.expect_title')}</h4>
                <ul className="space-y-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {expectItems.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="w-1 h-1 rounded-full bg-indigo-400 mt-2 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center gap-3 text-sm" style={{ color: 'var(--text-muted)' }}>
                <Mail className="w-4 h-4 text-indigo-400/50" />
                hello@nexusai.agency
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
