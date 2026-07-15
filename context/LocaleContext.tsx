'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Locale = 'ar' | 'en';

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  dir: 'rtl' | 'ltr';
  isArabic: boolean;
}

const LocaleContext = createContext<LocaleContextType>({
  locale: 'ar',
  setLocale: () => {},
  dir: 'rtl',
  isArabic: true,
});

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('ar');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('locale') as Locale | null;
    if (saved) setLocale(saved);
  }, []);

  useEffect(() => {
    if (mounted) localStorage.setItem('locale', locale);
  }, [locale, mounted]);

  const dir = locale === 'ar' ? 'rtl' : 'ltr';
  const isArabic = locale === 'ar';

  return (
    <LocaleContext.Provider value={{ locale, setLocale, dir, isArabic }}>
      {children}
    </LocaleContext.Provider>
  );
}

export const useLocale = () => useContext(LocaleContext);
