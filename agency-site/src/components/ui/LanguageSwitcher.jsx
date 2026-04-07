import { useLanguage } from '../../context/LanguageContext'

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage()

  return (
    <div className="flex items-center rounded-lg overflow-hidden" style={{ border: '1px solid var(--border-default)' }}>
      <button
        onClick={() => setLang('ua')}
        className="px-2.5 py-1.5 text-xs font-semibold transition-all duration-200 cursor-pointer"
        style={{
          backgroundColor: lang === 'ua' ? 'rgba(99,102,241,0.2)' : 'transparent',
          color: lang === 'ua' ? 'var(--text-primary)' : 'var(--text-muted)',
          minWidth: '36px',
          minHeight: '32px',
        }}
        aria-label="Switch to Ukrainian"
        aria-pressed={lang === 'ua'}
      >
        UA
      </button>
      <div style={{ width: '1px', height: '16px', backgroundColor: 'var(--border-default)' }} />
      <button
        onClick={() => setLang('en')}
        className="px-2.5 py-1.5 text-xs font-semibold transition-all duration-200 cursor-pointer"
        style={{
          backgroundColor: lang === 'en' ? 'rgba(99,102,241,0.2)' : 'transparent',
          color: lang === 'en' ? 'var(--text-primary)' : 'var(--text-muted)',
          minWidth: '36px',
          minHeight: '32px',
        }}
        aria-label="Switch to English"
        aria-pressed={lang === 'en'}
      >
        EN
      </button>
    </div>
  )
}
