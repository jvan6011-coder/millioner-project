import SectionHeading from '../ui/SectionHeading'
import AnimatedSection from '../ui/AnimatedSection'
import TiltCard from '../ui/TiltCard'
import CyberIllustration from '../ui/CyberIllustration'
import { ArrowUpRight } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'

export default function CaseStudies() {
  const { t } = useLanguage()

  const cases = t('caseStudies.cases')

  return (
    <section id="case-studies" className="py-16 md:py-24" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label={t('caseStudies.label')}
          title={t('caseStudies.title')}
          subtitle={t('caseStudies.subtitle')}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {cases.map((study, i) => (
            <AnimatedSection key={i} delay={i * 0.12} direction={i % 2 === 0 ? 'left' : 'right'}>
              <TiltCard>
                <div className="group relative rounded-2xl overflow-hidden hover:border-indigo-500/40 transition-all duration-300 hover:shadow-[0_0_40px_rgba(99,102,241,0.06)]" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-default)' }}>
                  {/* Cyberpunk illustration header */}
                  <div className="h-40 sm:h-48 relative overflow-hidden" style={{ backgroundColor: 'var(--bg-base)' }}>
                    <CyberIllustration index={i} />
                    {/* Animated shine on hover */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12" />
                    <div className="absolute bottom-3 left-5">
                      <span className="text-indigo-400/70 text-xs font-medium uppercase" style={{ letterSpacing: '0.05em' }}>{study.client}</span>
                    </div>
                    <div className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:rotate-45 transition-all duration-300" style={{ backgroundColor: 'var(--accent-primary-muted)' }}>
                      <ArrowUpRight className="w-4 h-4 text-indigo-400" />
                    </div>
                  </div>

                  <div className="p-5 sm:p-7">
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-indigo-300 transition-colors" style={{ color: 'var(--text-primary)', fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.02em' }}>{study.title}</h3>
                    <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--text-secondary)' }}>{study.description}</p>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 pt-4" style={{ borderTop: '1px solid var(--border-color)' }}>
                      <div className="flex gap-1.5 flex-wrap">
                        {study.tags.map((tag, j) => (
                          <span key={j} className="px-2.5 py-1 rounded-md text-[11px] font-medium hover:border-indigo-500/30 hover:text-indigo-400 transition-colors" style={{ backgroundColor: 'var(--accent-primary-muted)', border: '1px solid var(--border-default)', color: 'var(--text-muted)' }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className="text-indigo-400 font-semibold text-sm whitespace-nowrap">{study.result}</span>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
