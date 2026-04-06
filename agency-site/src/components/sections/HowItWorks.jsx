import { Phone, Target, Code2, Rocket } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import AnimatedSection from '../ui/AnimatedSection'

const steps = [
  { icon: Phone, title: 'Discovery Call', description: 'We learn about your business, pain points, and goals. You get a clear picture of what AI can do for you.' },
  { icon: Target, title: 'Strategy & Scoping', description: 'We identify the highest-ROI opportunity and design a solution with clear milestones and success metrics.' },
  { icon: Code2, title: 'Build & Iterate', description: 'Our team builds your solution in rapid sprints. You see progress every week and provide feedback in real-time.' },
  { icon: Rocket, title: 'Launch & Support', description: 'We deploy to production, train your team, and provide ongoing support to ensure long-term success.' },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-[#12121a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Our Process"
          title="From Idea to Production in Weeks"
          subtitle="A proven 4-step process that minimizes risk and maximizes speed. No surprises, no scope creep."
        />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className="relative text-center md:text-left">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-[calc(50%+30px)] w-[calc(100%-60px)] h-[1px] bg-gradient-to-r from-indigo-500/50 to-transparent" />
                )}
                <div className="w-12 h-12 rounded-full bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center mx-auto md:mx-0 mb-4">
                  <step.icon className="w-5 h-5 text-indigo-400" />
                </div>
                <div className="text-indigo-400 text-sm font-medium mb-2">Step {i + 1}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-[#94a3b8] text-sm leading-relaxed">{step.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
