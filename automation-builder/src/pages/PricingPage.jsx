import { Link } from 'react-router-dom'
import { Check, Zap, ArrowLeft } from 'lucide-react'

const tiers = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for getting started with AI automations',
    features: [
      '5 workflows',
      '100 runs per month',
      'Basic AI models',
      'Email output',
      'Community support',
    ],
    cta: 'Get Started',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/month',
    description: 'For professionals who need more power and flexibility',
    features: [
      '50 workflows',
      '5,000 runs per month',
      'All AI models (GPT-4, Claude)',
      'All output types',
      'Priority support',
      'Custom webhooks',
      'Version history',
    ],
    cta: 'Start Pro Trial',
    highlighted: true,
  },
  {
    name: 'Business',
    price: '$99',
    period: '/month',
    description: 'For teams that need advanced features and collaboration',
    features: [
      'Unlimited workflows',
      'Unlimited runs',
      'All AI models + fine-tuning',
      'All output types',
      'Dedicated support',
      'Team collaboration',
      'SSO & audit logs',
      'Custom integrations',
      'SLA guarantee',
    ],
    cta: 'Contact Sales',
    highlighted: false,
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
        </div>

        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-10 h-10 bg-indigo-500/20 rounded-xl flex items-center justify-center">
              <Zap className="w-5 h-5 text-indigo-400" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">Simple, Transparent Pricing</h1>
          <p className="text-lg text-slate-400 max-w-xl mx-auto">
            Choose the plan that fits your automation needs. Upgrade or downgrade at any time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-2xl p-7 flex flex-col ${
                tier.highlighted
                  ? 'bg-[#16161f] border-2 border-indigo-500 shadow-lg shadow-indigo-500/10'
                  : 'bg-[#16161f] border border-white/10'
              }`}
            >
              {tier.highlighted && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-indigo-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-1">{tier.name}</h3>
                <p className="text-sm text-slate-400 mb-4">{tier.description}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">{tier.price}</span>
                  <span className="text-sm text-slate-400">{tier.period}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2.5 text-sm text-slate-300">
                    <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-2.5 px-4 rounded-lg font-medium text-sm transition cursor-pointer ${
                  tier.highlighted
                    ? 'bg-indigo-500 hover:bg-indigo-600 text-white'
                    : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                }`}
              >
                {tier.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
