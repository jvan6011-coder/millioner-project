import { Brain, Workflow, LineChart } from 'lucide-react'
import Card from '../ui/Card'
import SectionHeading from '../ui/SectionHeading'
import AnimatedSection from '../ui/AnimatedSection'
import { services } from '../../data/services'

const iconMap = { Brain, Workflow, LineChart }

export default function Services() {
  return (
    <section id="services" className="py-24 bg-[#0a0a0f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="What We Do"
          title="AI Solutions That Drive Real Results"
          subtitle="We don't just build AI — we build AI that pays for itself. Every solution is designed around measurable business outcomes."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon]
            return (
              <AnimatedSection key={i} delay={i * 0.1}>
                <Card className="h-full">
                  <div className="w-12 h-12 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6 text-indigo-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
                  <p className="text-[#94a3b8] text-sm leading-relaxed mb-5">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((f, j) => (
                      <li key={j} className="text-sm text-[#94a3b8] flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </Card>
              </AnimatedSection>
            )
          })}
        </div>
      </div>
    </section>
  )
}
