import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import Button from '../ui/Button'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(99,102,241,0.15)_0%,_transparent_50%)]" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4" />
            AI-Powered Business Solutions
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
        >
          We Build AI That
          <br />
          <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Works For Your Business
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[#94a3b8] text-lg md:text-xl max-w-2xl mx-auto mb-10"
        >
          From intelligent automation to custom AI solutions, we help companies
          cut costs by 40-70% and ship 10x faster. No fluff. Just results.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button size="lg">
            Book a Free Consultation
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <Button variant="outline" size="lg">
            See Our Work
          </Button>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto"
        >
          {[
            { value: '50+', label: 'Projects Delivered' },
            { value: '93%', label: 'Client Retention' },
            { value: '2-6', label: 'Weeks to Launch' },
            { value: '40-70%', label: 'Cost Reduction' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
              <div className="text-[#94a3b8] text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
