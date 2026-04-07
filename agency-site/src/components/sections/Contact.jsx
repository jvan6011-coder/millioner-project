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
    <section id="contact" className="py-16 md:py-24" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Get in Touch"
          title="Let's Build Something Great"
          subtitle="Book a free consultation or send us a message. We typically respond within 24 hours."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 max-w-5xl mx-auto">
          <AnimatedSection>
            {submitted ? (
              <div className="rounded-2xl p-10 text-center" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid rgba(99,102,241,0.3)' }}>
                <div className="w-16 h-16 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto mb-5">
                  <Send className="w-7 h-7 text-indigo-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)', fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.02em' }}>Message Sent!</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <div className="rounded-2xl p-6 sm:p-8" style={{ backgroundColor: 'color-mix(in srgb, var(--bg-card) 50%, transparent)', border: '1px solid var(--border-color)' }}>
                <form onSubmit={handleSubmit} className="space-y-5">
                  {[
                    { label: 'Name', type: 'text', placeholder: 'John Smith' },
                    { label: 'Email', type: 'email', placeholder: 'john@company.com' },
                    { label: 'Company', type: 'text', placeholder: 'Acme Inc.' },
                  ].map((field) => (
                    <div key={field.label}>
                      <label className="block text-xs font-medium uppercase mb-2" style={{ color: 'var(--text-secondary)', letterSpacing: '0.04em' }}>{field.label}</label>
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        required
                        className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-indigo-500/50 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.1)] transition-all duration-200"
                        style={{
                          backgroundColor: 'var(--input-bg)',
                          border: '1px solid var(--border-default)',
                          color: 'var(--text-primary)',
                        }}
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-xs font-medium uppercase mb-2" style={{ color: 'var(--text-secondary)', letterSpacing: '0.04em' }}>Message</label>
                    <textarea
                      rows={4}
                      placeholder="Tell us about your project..."
                      required
                      className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-indigo-500/50 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.1)] transition-all duration-200 resize-none"
                      style={{
                        backgroundColor: 'var(--input-bg)',
                        border: '1px solid var(--border-default)',
                        color: 'var(--text-primary)',
                      }}
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
                <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--text-primary)', fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.02em' }}>Prefer to talk?</h3>
                <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
                  Book a free 30-minute strategy call. We'll discuss your business, identify quick wins, and outline a roadmap -- whether or not you work with us.
                </p>
                <Button variant="outline">
                  <Calendar className="w-4 h-4 mr-2" />
                  Book a Free Call
                </Button>
              </div>

              <div className="rounded-2xl p-7" style={{ backgroundColor: 'color-mix(in srgb, var(--bg-card) 50%, transparent)', border: '1px solid var(--border-color)' }}>
                <h4 className="font-semibold text-sm mb-4" style={{ color: 'var(--text-primary)', fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.015em' }}>What to expect:</h4>
                <ul className="space-y-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
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

              <div className="flex items-center gap-3 text-sm" style={{ color: 'var(--text-muted)' }}>
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
