import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import MagneticButton from '../ui/MagneticButton'
import MouseGradient from '../ui/MouseGradient'
import Particles from '../ui/Particles'
import GlowOrb from '../ui/GlowOrb'

function useIsMobile(breakpoint = 640) {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < breakpoint : false
  )
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < breakpoint)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [breakpoint])
  return isMobile
}

export default function Hero() {
  const isMobile = useIsMobile()
  const orbSize = isMobile ? 180 : 280

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-x-hidden">
      {/* Particle background */}
      <Particles count={60} />

      {/* Mouse-following gradient */}
      <MouseGradient />

      {/* Static background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(99,102,241,0.15)_0%,_transparent_50%)]" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 sm:pt-32 pb-16 sm:pb-24 md:pt-40 md:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-xs font-semibold uppercase mb-6 sm:mb-8" style={{ letterSpacing: '0.05em' }}>
            <Sparkles className="w-3.5 h-3.5" />
            AI-Powered Business Solutions
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6 text-[clamp(2rem,5vw,4rem)] leading-[1.1]"
          style={{ color: 'var(--text-primary)', fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.03em', fontWeight: 700, wordBreak: 'break-word', overflowWrap: 'break-word' }}
        >
          We Build AI That
          <br />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient-shift_3s_ease-in-out_infinite]">
            Works For Your Business
          </span>
        </motion.h1>

        {/* Glowing 3D Orb */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center my-6 sm:my-10 overflow-visible"
          style={{ minHeight: orbSize + 40 }}
        >
          <div className="overflow-visible" style={{ width: orbSize, height: orbSize }}>
            <GlowOrb size={orbSize} />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-8 sm:mb-12 leading-relaxed px-2 sm:px-0"
          style={{ color: 'var(--text-secondary)', letterSpacing: '-0.014em' }}
        >
          From intelligent automation to custom AI solutions, we help companies
          cut costs by 40-70% and ship 10x faster. No fluff. Just results.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col min-[400px]:flex-row items-center justify-center gap-3 sm:gap-4"
        >
          <MagneticButton size="lg" variant="primary">
            Book a Free Consultation
            <ArrowRight className="w-5 h-5 ml-2" />
          </MagneticButton>
          <MagneticButton variant="outline" size="lg">
            See Our Work
          </MagneticButton>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-14 sm:mt-20 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-3xl mx-auto pt-8 sm:pt-12"
          style={{ borderTop: '1px solid var(--border-color)' }}
        >
          {[
            { value: '50+', label: 'Projects Delivered' },
            { value: '93%', label: 'Client Retention' },
            { value: '2-6', label: 'Weeks to Launch' },
            { value: '40-70%', label: 'Cost Reduction' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
              className="text-center group"
            >
              <div className="text-xl sm:text-2xl md:text-3xl font-bold group-hover:text-indigo-400 transition-colors duration-300" style={{ color: 'var(--text-primary)', fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.03em' }}>{stat.value}</div>
              <div className="text-[11px] sm:text-xs font-medium uppercase mt-1.5 sm:mt-2" style={{ color: 'var(--text-muted)', letterSpacing: '0.04em' }}>{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
