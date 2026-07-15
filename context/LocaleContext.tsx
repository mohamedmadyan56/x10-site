'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type Locale = 'ar' | 'en';

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  isArabic: boolean;
  dir: 'rtl' | 'ltr';
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('ar');
  const isArabic = locale === 'ar';
  const dir = isArabic ? 'rtl' : 'ltr';

  return (
    <LocaleContext.Provider value={{ locale, setLocale, isArabic, dir }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) throw new Error('useLocale must be used within a LocaleProvider');
  return context;
}
