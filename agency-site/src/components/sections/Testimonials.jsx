import { Quote } from 'lucide-react'
import TiltCard from '../ui/TiltCard'
import SectionHeading from '../ui/SectionHeading'
import AnimatedSection from '../ui/AnimatedSection'
import { testimonials } from '../../data/testimonials'

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-16 md:py-24" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Testimonials"
          title="What Our Clients Say"
          subtitle="Don't take our word for it. Here's what the people we've worked with have to say."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t, i) => (
            <AnimatedSection key={i} delay={i * 0.15} direction={i === 0 ? 'left' : i === 2 ? 'right' : 'up'}>
              <TiltCard className="h-full">
                <div className="rounded-2xl p-5 sm:p-7 h-full flex flex-col hover:border-indigo-500/30 transition-all duration-300 hover:shadow-[0_0_40px_rgba(99,102,241,0.06)]" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-default)' }}>
                  <Quote className="w-8 h-8 text-indigo-500/20 mb-5" />
                  <p className="text-sm leading-relaxed flex-1 mb-8 italic" style={{ color: 'var(--text-secondary)' }}>
                    "{t.quote}"
                  </p>
                  <div className="pt-5" style={{ borderTop: '1px solid var(--border-color)' }}>
                    <div className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{t.name}</div>
                    <div className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{t.role}, {t.company}</div>
                  </div>
                </div>
              </TiltCard>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
