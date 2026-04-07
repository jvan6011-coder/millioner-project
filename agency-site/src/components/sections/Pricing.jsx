import { Check } from 'lucide-react'
import MagneticButton from '../ui/MagneticButton'
import SectionHeading from '../ui/SectionHeading'
import AnimatedSection from '../ui/AnimatedSection'
import TiltCard from '../ui/TiltCard'
import { pricingTiers } from '../../data/pricing'

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 md:py-32 bg-[#12121a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Pricing"
          title="Transparent Pricing, Real ROI"
          subtitle="Every engagement is designed to pay for itself. Choose the model that fits your needs."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto items-stretch">
          {pricingTiers.map((tier, i) => (
            <AnimatedSection key={i} delay={i * 0.15} direction="scale">
              <TiltCard className="h-full">
                <div className={`relative rounded-2xl p-7 lg:p-8 h-full flex flex-col ${tier.highlighted ? 'bg-gradient-to-b from-indigo-500/10 via-[#16161f] to-[#16161f] border-2 border-indigo-500/40 shadow-[0_0_50px_rgba(99,102,241,0.08)]' : 'bg-[#16161f] border border-white/[0.08] hover:border-white/15'} transition-all duration-300`}>
                  {tier.highlighted && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-indigo-500 text-white text-[11px] font-semibold uppercase tracking-wider rounded-full shadow-lg shadow-indigo-500/30">
                      Most Popular
                    </span>
                  )}
                  <h3 className="text-lg font-semibold text-white mb-1.5 tracking-tight">{tier.name}</h3>
                  <p className="text-[#94a3b8] text-sm mb-6 leading-relaxed">{tier.description}</p>
                  <div className="mb-8 pb-6 border-b border-white/[0.06]">
                    <span className="text-4xl font-bold text-white tracking-tight">{tier.price}</span>
                    {tier.period && <span className="text-[#64748b] text-sm ml-1">{tier.period}</span>}
                  </div>
                  <ul className="space-y-3.5 mb-8 flex-1">
                    {tier.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm text-[#94a3b8]">
                        <Check className="w-4 h-4 text-indigo-400 mt-0.5 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <MagneticButton variant={tier.highlighted ? 'primary' : 'outline'} className="w-full">
                    {tier.cta}
                  </MagneticButton>
                </div>
              </TiltCard>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
