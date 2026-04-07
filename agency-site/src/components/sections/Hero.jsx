import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import MagneticButton from '../ui/MagneticButton'
import { useLanguage } from '../../context/LanguageContext'

export default function Hero() {
  const { t } = useLanguage()

  const stats = [
    { value: t('hero.stat_1_value'), label: t('hero.stat_1_label') },
    { value: t('hero.stat_2_value'), label: t('hero.stat_2_label') },
    { value: t('hero.stat_3_value'), label: t('hero.stat_3_label') },
    { value: t('hero.stat_4_value'), label: t('hero.stat_4_label') },
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: 'brightness(0.4) saturate(1.2)', objectPosition: 'center 40%' }}
      >
        <source src="/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-base)]/60 via-transparent to-[var(--bg-base)]" />

      {/* Side fade */}
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-base)]/40 via-transparent to-[var(--bg-base)]/40" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 sm:pt-32 pb-16 sm:pb-24 md:pt-40 md:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-xs font-semibold uppercase mb-6 sm:mb-8 backdrop-blur-sm" style={{ letterSpacing: '0.05em' }}>
            <Sparkles className="w-3.5 h-3.5" />
            {t('hero.badge')}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6 text-[clamp(2rem,5vw,4rem)] leading-[1.1]"
          style={{ color: '#ffffff', fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.03em', fontWeight: 700, textShadow: '0 2px 40px rgba(0,0,0,0.3)' }}
        >
          {t('hero.title_1')}
          <br />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient-shift_3s_ease-in-out_infinite]">
            {t('hero.title_2')}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-8 sm:mb-12 leading-relaxed px-2 sm:px-0"
          style={{ color: 'rgba(255,255,255,0.75)', letterSpacing: '-0.014em', textShadow: '0 1px 20px rgba(0,0,0,0.2)' }}
        >
          {t('hero.subtitle')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col min-[400px]:flex-row items-center justify-center gap-3 sm:gap-4"
        >
          <MagneticButton size="lg" variant="primary">
            {t('hero.cta_primary')}
            <ArrowRight className="w-5 h-5 ml-2" />
          </MagneticButton>
          <MagneticButton variant="outline" size="lg">
            {t('hero.cta_secondary')}
          </MagneticButton>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-14 sm:mt-20 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-3xl mx-auto pt-8 sm:pt-12"
          style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
              className="text-center group"
            >
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white group-hover:text-indigo-400 transition-colors duration-300" style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.03em' }}>{stat.value}</div>
              <div className="text-[11px] sm:text-xs font-medium uppercase mt-1.5 sm:mt-2" style={{ color: 'rgba(255,255,255,0.5)', letterSpacing: '0.04em' }}>{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
