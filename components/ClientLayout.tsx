'use client';

import { ReactNode, useEffect } from 'react';
import { useLocale } from '@/context/LocaleContext';

export default function ClientLayout({ children }: { children: ReactNode }) {
  const { locale, dir } = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
  }, [locale, dir]);

  return <>{children}</>;
}
