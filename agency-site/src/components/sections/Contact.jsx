import { useState } from 'react'
import { Send, Mail, Calendar } from 'lucide-react'
import Button from '../ui/Button'
import SectionHeading from '../ui/SectionHeading'
import AnimatedSection from '../ui/AnimatedSection'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="contact" className="py-24 md:py-32 bg-[#12121a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Get in Touch"
          title="Let's Build Something Great"
          subtitle="Book a free consultation or send us a message. We typically respond within 24 hours."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 max-w-5xl mx-auto">
          <AnimatedSection>
            {submitted ? (
              <div className="bg-[#16161f] border border-indigo-500/30 rounded-2xl p-10 text-center">
                <div className="w-16 h-16 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto mb-5">
                  <Send className="w-7 h-7 text-indigo-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2 tracking-tight">Message Sent!</h3>
                <p className="text-[#94a3b8] text-sm leading-relaxed">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <div className="bg-[#16161f]/50 border border-white/[0.06] rounded-2xl p-6 sm:p-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                  {[
                    { label: 'Name', type: 'text', placeholder: 'John Smith' },
                    { label: 'Email', type: 'email', placeholder: 'john@company.com' },
                    { label: 'Company', type: 'text', placeholder: 'Acme Inc.' },
                  ].map((field) => (
                    <div key={field.label}>
                      <label className="block text-xs font-medium text-[#94a3b8] uppercase tracking-wider mb-2">{field.label}</label>
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        required
                        className="w-full px-4 py-3 bg-[#0a0a0f]/60 border border-white/[0.08] rounded-xl text-white text-sm placeholder-[#4a4a5a] focus:outline-none focus:border-indigo-500/50 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.1)] transition-all duration-200"
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-xs font-medium text-[#94a3b8] uppercase tracking-wider mb-2">Message</label>
                    <textarea
                      rows={4}
                      placeholder="Tell us about your project..."
                      required
                      className="w-full px-4 py-3 bg-[#0a0a0f]/60 border border-white/[0.08] rounded-xl text-white text-sm placeholder-[#4a4a5a] focus:outline-none focus:border-indigo-500/50 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.1)] transition-all duration-200 resize-none"
                    />
                  </div>
                  <Button className="w-full">
                    Send Message
                    <Send className="w-4 h-4 ml-2" />
                  </Button>
                </form>
              </div>
            )}
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-3 tracking-tight">Prefer to talk?</h3>
                <p className="text-[#94a3b8] text-sm leading-relaxed mb-6">
                  Book a free 30-minute strategy call. We'll discuss your business, identify quick wins, and outline a roadmap -- whether or not you work with us.
                </p>
                <Button variant="outline">
                  <Calendar className="w-4 h-4 mr-2" />
                  Book a Free Call
                </Button>
              </div>

              <div className="bg-[#16161f]/50 border border-white/[0.06] rounded-2xl p-6">
                <h4 className="text-white font-semibold text-sm mb-4 tracking-tight">What to expect:</h4>
                <ul className="space-y-3 text-[#94a3b8] text-sm">
                  {[
                    'Quick assessment of your AI readiness',
                    '2-3 specific automation opportunities',
                    'Rough ROI estimates for each opportunity',
                    'Honest recommendation (even if it\'s "not now")',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="w-1 h-1 rounded-full bg-indigo-400 mt-2 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center gap-3 text-[#64748b] text-sm">
                <Mail className="w-4 h-4 text-indigo-400/50" />
                hello@nexusai.agency
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
