import { Check, Crown } from 'lucide-react'
import MagneticButton from '../ui/MagneticButton'
import SectionHeading from '../ui/SectionHeading'
import AnimatedSection from '../ui/AnimatedSection'
import TiltCard from '../ui/TiltCard'
import { pricingTiers } from '../../data/pricing'

function getCardClass(tier) {
  if (tier.premium) {
    return 'bg-gradient-to-b from-amber-500/10 via-[#1c1e2a] to-[#1c1e2a] border border-amber-500/30 shadow-[0_0_60px_rgba(245,158,11,0.08)] hover:border-amber-400/50'
  }
  if (tier.highlighted) {
    return 'bg-gradient-to-b from-indigo-500/10 via-[#1c1e2a] to-[#1c1e2a] border-2 border-indigo-500/40 shadow-[0_0_50px_rgba(99,102,241,0.08)]'
  }
  return 'bg-[#1c1e2a] border border-white/[0.08] hover:border-white/15'
}

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 md:py-32 t-bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Pricing"
          title="Transparent Pricing, Real ROI"
          subtitle="Every engagement is designed to pay for itself. Choose the model that fits your needs."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto items-stretch pt-4">
          {pricingTiers.map((tier, i) => (
            <AnimatedSection key={i} delay={i * 0.15} direction="scale">
              <TiltCard className="h-full">
                <div className={`relative rounded-2xl p-7 lg:p-8 h-full flex flex-col transition-all duration-300 ${getCardClass(tier)}`}>
                  {tier.highlighted && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-indigo-500 text-white text-[11px] font-semibold uppercase tracking-wider rounded-full shadow-lg shadow-indigo-500/30 z-10">
                      Most Popular
                    </span>
                  )}
                  {tier.premium && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[11px] font-semibold uppercase tracking-wider rounded-full shadow-lg shadow-amber-500/30 z-10 flex items-center gap-1.5">
                      <Crown className="w-3 h-3" />
                      Premium
                    </span>
                  )}

                  {/* Premium gold shimmer border */}
                  {tier.premium && (
                    <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/10 to-transparent animate-[gradient-shift_4s_ease-in-out_infinite] bg-[length:200%_auto]" />
                    </div>
                  )}

                  <h3 className={`text-lg font-semibold mb-1.5 tracking-tight ${tier.premium ? 'bg-gradient-to-r from-amber-300 to-orange-300 bg-clip-text text-transparent' : 'text-white'}`}>
                    {tier.name}
                  </h3>
                  <p className="text-[#94a3b8] text-sm mb-6 leading-relaxed">{tier.description}</p>
                  <div className="mb-8 pb-6 border-b border-white/[0.06]">
                    <span className={`text-4xl font-bold tracking-tight ${tier.premium ? 'bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent' : 'text-white'}`}>
                      {tier.price}
                    </span>
                    {tier.period && <span className="text-[#64748b] text-sm ml-1">{tier.period}</span>}
                  </div>
                  <ul className="space-y-3.5 mb-8 flex-1">
                    {tier.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm text-[#94a3b8]">
                        <Check className={`w-4 h-4 mt-0.5 shrink-0 ${tier.premium ? 'text-amber-400' : 'text-indigo-400'}`} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <MagneticButton
                    variant={tier.highlighted ? 'primary' : 'outline'}
                    className={`w-full ${tier.premium ? '!bg-gradient-to-r !from-amber-500 !to-orange-500 !text-white !border-0 !shadow-lg !shadow-amber-500/25 hover:!shadow-amber-500/40' : ''}`}
                  >
                    {tier.premium && <Crown className="w-4 h-4 mr-2" />}
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
