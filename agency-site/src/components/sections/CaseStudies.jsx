import SectionHeading from '../ui/SectionHeading'
import AnimatedSection from '../ui/AnimatedSection'
import TiltCard from '../ui/TiltCard'
import { caseStudies } from '../../data/caseStudies'
import { ArrowUpRight } from 'lucide-react'

export default function CaseStudies() {
  return (
    <section id="case-studies" className="py-24 bg-[#0a0a0f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Our Work"
          title="Real Results for Real Businesses"
          subtitle="Every project starts with a problem and ends with measurable impact. Here's what we've delivered."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {caseStudies.map((study, i) => (
            <AnimatedSection key={i} delay={i * 0.12} direction={i % 2 === 0 ? 'left' : 'right'}>
              <TiltCard>
                <div className="group relative bg-[#16161f] border border-white/10 rounded-xl overflow-hidden hover:border-indigo-500/50 transition-all duration-300">
                  {/* Gradient header */}
                  <div className={`h-48 bg-gradient-to-br ${study.gradient} relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
                    {/* Animated shine on hover */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" />
                    <div className="absolute bottom-4 left-6">
                      <span className="text-white/80 text-sm">{study.client}</span>
                    </div>
                    <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:rotate-45 transition-all duration-300">
                      <ArrowUpRight className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-indigo-300 transition-colors">{study.title}</h3>
                    <p className="text-[#94a3b8] text-sm leading-relaxed mb-4">{study.description}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex gap-2 flex-wrap">
                        {study.tags.map((tag, j) => (
                          <span key={j} className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-md text-xs text-[#94a3b8] hover:border-indigo-500/30 hover:text-indigo-400 transition-colors">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className="text-indigo-400 font-semibold text-sm">{study.result}</span>
                    </div>
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
