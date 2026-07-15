'use client';

import { useLocale } from '@/context/LocaleContext';

export default function Footer() {
  const { isArabic, dir } = useLocale();

  return (
    <div className="bg-dark-surface border-t border-white/10" dir={dir}>
      <footer className="max-w-[1200px] mx-auto px-6 md:px-12 py-8 flex flex-col md:flex-row items-center justify-between gap-2 text-text-muted text-[13px]">
        <span>© 2026 X10 — Business Technology Platform</span>
        <div className="flex items-center font-en font-bold text-lg tracking-tight">
          <span className="text-coral">X</span>
          <span className="w-[2px] h-[18px] bg-text-muted mx-1" />
          <div className="flex gap-0.5 scale-[0.85]">
            <span className="w-[9px] h-[9px] bg-text-light rounded-sm" />
            <span className="w-[9px] h-[9px] bg-text-light rounded-sm" />
            <span className="w-[9px] h-[9px] bg-text-light rounded-sm" />
            <span className="w-[9px] h-[9px] bg-coral rounded-sm" />
          </div>
        </div>
        <span className="font-en text-xs opacity-50">Powered by X10 Platform</span>
      </footer>
    </div>
  );
}
