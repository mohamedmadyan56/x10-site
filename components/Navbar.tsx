'use client';

import { useState, useEffect } from 'react';
import { useLocale } from '@/context/LocaleContext';

const linksAr = [
  { label: 'المميزات', href: '#features' },
  { label: 'المنصة', href: '#platform' },
  { label: 'كيف تعمل', href: '#how' },
  { label: 'الباقات', href: '#pricing' },
];

const linksEn = [
  { label: 'Features', href: '#features' },
  { label: 'Platform', href: '#platform' },
  { label: 'How It Works', href: '#how' },
  { label: 'Pricing', href: '#pricing' },
];

export default function Navbar() {
  const { locale, setLocale, isArabic } = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const links = isArabic ? linksAr : linksEn;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      id="hdr"
      className="sticky top-0 z-100 transition-all duration-400"
      style={{
        background: scrolled
          ? 'color-mix(in oklch, var(--bg) 92%, transparent)'
          : 'color-mix(in oklch, var(--bg) 78%, transparent)',
        backdropFilter: 'blur(14px)',
        borderBottom: scrolled ? '1px solid var(--border-soft)' : '1px solid transparent',
      }}
    >
      <nav className="wrap flex items-center justify-between h-[76px]">
        <a href="#" className="flex items-center gap-[11px] font-[family-name:var(--font-en)] font-extrabold text-[1.35rem]">
          <span
            className="w-[38px] h-[38px] rounded-[11px] grid place-items-center font-extrabold text-[1.05rem]"
            style={{
              background: 'linear-gradient(135deg, var(--teal-strong), var(--teal-dim))',
              color: 'var(--bg)',
              boxShadow: '0 0 0 1px oklch(80% 0.13 192 / 0.3), 0 8px 24px oklch(80% 0.13 192 / 0.18)',
            }}
          >
            X
          </span>
          <span style={{ fontFamily: 'var(--font-en)' }}>X10</span>
        </a>

        <div className="hidden md:flex items-center gap-[34px]">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-sm font-medium transition-colors duration-250"
              style={{ color: 'var(--text-muted)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              {link.label}
              <span
                className="absolute bottom-[-6px] right-0 h-[2px] transition-all duration-300 rounded-full"
                style={{ background: 'var(--teal)', width: 0 }}
                onMouseEnter={(e) => {
                  const parent = e.currentTarget.closest('a');
                  if (parent) {
                    const spans = parent.querySelectorAll('span');
                    spans.forEach((s) => (s.style.width = '100%'));
                  }
                }}
                onMouseLeave={(e) => {
                  const parent = e.currentTarget.closest('a');
                  if (parent) {
                    const spans = parent.querySelectorAll('span');
                    spans.forEach((s) => (s.style.width = '0'));
                  }
                }}
              />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setLocale(isArabic ? 'en' : 'ar')}
            className="inline-flex items-center gap-[7px] px-[14px] py-[8px] text-sm rounded-full transition-all duration-250"
            style={{
              border: '1px solid var(--border)',
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-en)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--teal-dim)';
              e.currentTarget.style.color = 'var(--text)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border)';
              e.currentTarget.style.color = 'var(--text-muted)';
            }}
          >
            <span>🌐</span> {isArabic ? 'English' : 'العربية'}
          </button>
          <a
            href="#cta"
            className="btn btn-primary"
            style={{ fontFamily: 'var(--font-ar)' }}
          >
            {isArabic ? 'ابدأ الآن' : 'Start Now'}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </a>
        </div>
      </nav>
    </header>
  );
}
