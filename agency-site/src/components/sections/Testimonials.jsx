import { Quote } from 'lucide-react'
import Card from '../ui/Card'
import SectionHeading from '../ui/SectionHeading'
import AnimatedSection from '../ui/AnimatedSection'
import { testimonials } from '../../data/testimonials'

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-[#0a0a0f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Testimonials"
          title="What Our Clients Say"
          subtitle="Don't take our word for it. Here's what the people we've worked with have to say."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <Card className="h-full flex flex-col">
                <Quote className="w-8 h-8 text-indigo-500/30 mb-4" />
                <p className="text-[#94a3b8] text-sm leading-relaxed flex-1 mb-6">
                  "{t.quote}"
                </p>
                <div>
                  <div className="text-white font-semibold text-sm">{t.name}</div>
                  <div className="text-[#94a3b8] text-xs">{t.role}, {t.company}</div>
                </div>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
