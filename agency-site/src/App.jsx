import { ThemeProvider } from './context/ThemeContext'
import { LanguageProvider } from './context/LanguageContext'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import Services from './components/sections/Services'
import HowItWorks from './components/sections/HowItWorks'
import CaseStudies from './components/sections/CaseStudies'
import Pricing from './components/sections/Pricing'
import Testimonials from './components/sections/Testimonials'
import Contact from './components/sections/Contact'

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen t-bg-primary overflow-x-hidden">
          <Navbar />
          <Hero />
          <div className="section-divider" />
          <Services />
          <div className="section-divider" />
          <HowItWorks />
          <div className="section-divider" />
          <CaseStudies />
          <div className="section-divider" />
          <Pricing />
          <div className="section-divider" />
          <Testimonials />
          <div className="section-divider" />
          <Contact />
          <Footer />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  )
}
