import { Brain, Workflow, LineChart } from 'lucide-react'
import TiltCard from '../ui/TiltCard'
import SectionHeading from '../ui/SectionHeading'
import AnimatedSection from '../ui/AnimatedSection'
import { services } from '../../data/services'

const iconMap = { Brain, Workflow, LineChart }

export default function Services() {
  return (
    <section id="services" className="py-24 md:py-32 bg-[#0f1117]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="What We Do"
          title="AI Solutions That Drive Real Results"
          subtitle="We don't just build AI — we build AI that pays for itself. Every solution is designed around measurable business outcomes."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon]
            return (
              <AnimatedSection key={i} delay={i * 0.15} direction={i === 0 ? 'left' : i === 2 ? 'right' : 'up'}>
                <TiltCard className="h-full">
                  <div className="group bg-[#1c1e2a] border border-white/[0.08] rounded-2xl p-7 h-full hover:border-indigo-500/40 transition-all duration-300 hover:shadow-[0_0_40px_rgba(99,102,241,0.06)]">
                    <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6 group-hover:bg-indigo-500/20 group-hover:border-indigo-500/40 transition-all duration-300">
                      <Icon className="w-5 h-5 text-indigo-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-3 tracking-tight">{service.title}</h3>
                    <p className="text-[#94a3b8] text-sm leading-relaxed mb-6">{service.description}</p>
                    <ul className="space-y-2.5 border-t border-white/[0.06] pt-5">
                      {service.features.map((f, j) => (
                        <li key={j} className="text-sm text-[#94a3b8] flex items-center gap-2.5 group-hover:text-[#a3b3c8] transition-colors">
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
