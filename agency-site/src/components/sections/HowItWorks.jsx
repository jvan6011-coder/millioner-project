import { Phone, Target, Code2, Rocket } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import AnimatedSection from '../ui/AnimatedSection'
import { useLanguage } from '../../context/LanguageContext'

const stepIcons = [Phone, Target, Code2, Rocket]

export default function HowItWorks() {
  const { t } = useLanguage()

  const stepTitles = t('howItWorks.steps')
  const stepDescs = t('howItWorks.step_descs')

  const steps = stepIcons.map((icon, i) => ({
    icon,
    title: stepTitles[i],
    description: stepDescs[i],
  }))

  return (
    <section id="how-it-works" className="py-16 md:py-24" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label={t('howItWorks.label')}
          title={t('howItWorks.title')}
          subtitle={t('howItWorks.subtitle')}
        />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6 lg:gap-8">
          {steps.map((step, i) => (
            <AnimatedSection key={i} delay={i * 0.15} direction="up">
              <div className="relative text-center group">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-[calc(50%+30px)] w-[calc(100%-60px)] h-px bg-gradient-to-r from-indigo-500/40 via-indigo-500/20 to-transparent" />
                )}
                <div className="relative w-12 h-12 rounded-full bg-indigo-500/10 border border-indigo-500/25 flex items-center justify-center mx-auto mb-5 group-hover:bg-indigo-500/20 group-hover:border-indigo-500/50 group-hover:scale-110 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.15)]">
                  <step.icon className="w-5 h-5 text-indigo-400" />
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full border border-indigo-500/40 flex items-center justify-center text-[10px] font-bold text-indigo-400" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                    {i + 1}
                  </span>
                </div>
                <h3 className="text-base font-semibold mb-2 group-hover:text-indigo-300 transition-colors" style={{ color: 'var(--text-primary)', fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.02em' }}>{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{step.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
