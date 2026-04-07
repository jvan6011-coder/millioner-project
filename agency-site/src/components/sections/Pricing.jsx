import { Check, Crown } from 'lucide-react'
import MagneticButton from '../ui/MagneticButton'
import SectionHeading from '../ui/SectionHeading'
import AnimatedSection from '../ui/AnimatedSection'
import TiltCard from '../ui/TiltCard'
import { pricingTiers } from '../../data/pricing'

function getCardStyle(tier) {
  if (tier.premium) {
    return {
      background: 'linear-gradient(to bottom, rgba(245,158,11,0.10), var(--bg-card) 40%)',
      border: '1px solid rgba(245,158,11,0.30)',
      boxShadow: '0 0 60px rgba(245,158,11,0.08)',
    }
  }
  if (tier.highlighted) {
    return {
      background: 'linear-gradient(to bottom, rgba(99,102,241,0.10), var(--bg-card) 40%)',
      border: '2px solid rgba(99,102,241,0.40)',
      boxShadow: '0 0 50px rgba(99,102,241,0.08)',
    }
  }
  return {
    backgroundColor: 'var(--bg-card)',
    border: '1px solid var(--border-default)',
  }
}

export default function Pricing() {
  return (
    <section id="pricing" className="py-16 md:py-24" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Pricing"
          title="Transparent Pricing, Real ROI"
          subtitle="Every engagement is designed to pay for itself. Choose the model that fits your needs."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto items-stretch pt-4">
          {pricingTiers.map((tier, i) => (
            <AnimatedSection key={i} delay={i * 0.15} direction="scale">
              <TiltCard className="h-full">
                <div className="relative rounded-2xl p-7 lg:p-8 h-full flex flex-col transition-all duration-300" style={getCardStyle(tier)}>
                  {tier.highlighted && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-indigo-500 text-white text-[11px] font-semibold uppercase rounded-full shadow-lg shadow-indigo-500/30 z-10" style={{ letterSpacing: '0.05em' }}>
                      Most Popular
                    </span>
                  )}
                  {tier.premium && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[11px] font-semibold uppercase rounded-full shadow-lg shadow-amber-500/30 z-10 flex items-center gap-1.5" style={{ letterSpacing: '0.05em' }}>
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

                  <h3 className="text-lg font-semibold mb-1.5" style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.02em', color: tier.premium ? undefined : 'var(--text-primary)' }}>
                    {tier.premium ? (
                      <span className="bg-gradient-to-r from-amber-300 to-orange-300 bg-clip-text text-transparent">{tier.name}</span>
                    ) : tier.name}
                  </h3>
                  <p className="text-sm mb-6 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{tier.description}</p>
                  <div className="mb-8 pb-6" style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <span className="text-4xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.03em', color: tier.premium ? undefined : 'var(--text-primary)' }}>
                      {tier.premium ? (
                        <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">{tier.price}</span>
                      ) : tier.price}
                    </span>
                    {tier.period && <span className="text-sm ml-1" style={{ color: 'var(--text-muted)' }}>{tier.period}</span>}
                  </div>
                  <ul className="space-y-3.5 mb-8 flex-1">
                    {tier.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
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
