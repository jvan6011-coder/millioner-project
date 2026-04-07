import { Brain, Workflow, LineChart } from 'lucide-react'
import TiltCard from '../ui/TiltCard'
import SectionHeading from '../ui/SectionHeading'
import AnimatedSection from '../ui/AnimatedSection'
import { useLanguage } from '../../context/LanguageContext'

const iconMap = { Brain, Workflow, LineChart }
const iconKeys = ['Brain', 'Workflow', 'LineChart']
const serviceKeys = ['ai_dev', 'automation', 'consulting']

export default function Services() {
  const { t } = useLanguage()

  const services = serviceKeys.map((key, i) => ({
    icon: iconKeys[i],
    title: t(`services.${key}_title`),
    description: t(`services.${key}_desc`),
    features: t(`services.${key}_features`),
  }))

  return (
    <section id="services" className="py-16 md:py-24" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label={t('services.label')}
          title={t('services.title')}
          subtitle={t('services.subtitle')}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon]
            return (
              <AnimatedSection key={i} delay={i * 0.15} direction={i === 0 ? 'left' : i === 2 ? 'right' : 'up'}>
                <TiltCard className="h-full">
                  <div className="group rounded-2xl p-5 sm:p-7 h-full hover:border-indigo-500/40 transition-all duration-300 hover:shadow-[0_0_40px_rgba(99,102,241,0.06)]" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-default)' }}>
                    <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6 group-hover:bg-indigo-500/20 group-hover:border-indigo-500/40 transition-all duration-300">
                      <Icon className="w-5 h-5 text-indigo-400" />
                    </div>
                    <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)', fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.02em' }}>{service.title}</h3>
                    <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>{service.description}</p>
                    <ul className="space-y-2.5 pt-5" style={{ borderTop: '1px solid var(--border-color)' }}>
                      {service.features.map((f, j) => (
                        <li key={j} className="text-sm flex items-center gap-2.5 transition-colors" style={{ color: 'var(--text-secondary)' }}>
                          <span className="w-1 h-1 rounded-full bg-indigo-400 shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </TiltCard>
              </AnimatedSection>
            )
          })}
        </div>
      </div>
    </section>
  )
}
