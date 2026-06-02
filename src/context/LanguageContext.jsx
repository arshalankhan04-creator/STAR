import { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../i18n/translations';

const LanguageContext = createContext(null);

const STORAGE_KEY = 'star_lang';

export function LanguageProvider({ children }) {
  // null = not chosen yet (shows popup), 'en' | 'gu' = chosen
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) || null;
    } catch {
      return null;
    }
  });

  const t = translations[lang ?? 'en'];

  function chooseLang(code) {
    setLang(code);
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch { /* ignore */ }
  }

  // Expose whether the popup should show
  const showPopup = lang === null;

  return (
    <LanguageContext.Provider value={{ lang: lang ?? 'en', t, chooseLang, showPopup }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used inside <LanguageProvider>');
  return ctx;
}
