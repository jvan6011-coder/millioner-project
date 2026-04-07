import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { translations } from '../data/translations'

const LanguageContext = createContext()

function getNestedValue(obj, path) {
  return path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj)
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      const saved = localStorage.getItem('nexus-lang')
      if (saved === 'ua' || saved === 'en') return saved
    } catch {}
    // Detect browser language
    const browserLang = navigator.language || navigator.userLanguage || ''
    return browserLang.startsWith('uk') ? 'ua' : 'en'
  })

  useEffect(() => {
    try {
      localStorage.setItem('nexus-lang', lang)
    } catch {}
  }, [lang])

  const t = useCallback(
    (key) => {
      // key format: "section.field" e.g. "hero.badge"
      const dotIndex = key.indexOf('.')
      if (dotIndex === -1) return key
      const section = key.substring(0, dotIndex)
      const field = key.substring(dotIndex + 1)
      const sectionData = translations[section]
      if (!sectionData) return key
      const langData = sectionData[lang] || sectionData['en']
      if (!langData) return key
      const value = getNestedValue(langData, field)
      return value !== undefined ? value : key
    },
    [lang]
  )

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
