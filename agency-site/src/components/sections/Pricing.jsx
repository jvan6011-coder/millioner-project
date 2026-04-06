import { Check } from 'lucide-react'
import Button from '../ui/Button'
import SectionHeading from '../ui/SectionHeading'
import AnimatedSection from '../ui/AnimatedSection'
import { pricingTiers } from '../../data/pricing'

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-[#12121a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Pricing"
          title="Transparent Pricing, Real ROI"
          subtitle="Every engagement is designed to pay for itself. Choose the model that fits your needs."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pricingTiers.map((tier, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className={`relative rounded-xl p-8 h-full flex flex-col ${tier.highlighted ? 'bg-gradient-to-b from-indigo-500/10 to-[#16161f] border-2 border-indigo-500/50' : 'bg-[#16161f] border border-white/10'}`}>
                {tier.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-indigo-500 text-white text-xs font-semibold rounded-full">
                    Most Popular
                  </span>
                )}
                <h3 className="text-xl font-semibold text-white mb-2">{tier.name}</h3>
                <p className="text-[#94a3b8] text-sm mb-6">{tier.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-white">{tier.price}</span>
                  <span className="text-[#94a3b8] text-sm">{tier.period}</span>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {tier.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-[#94a3b8]">
                      <Check className="w-4 h-4 text-indigo-400 mt-0.5 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button variant={tier.highlighted ? 'primary' : 'outline'} className="w-full">
                  {tier.cta}
                </Button>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
