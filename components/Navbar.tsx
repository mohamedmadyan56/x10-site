'use client';

import { useState, useEffect } from 'react';
import { useLocale } from '@/context/LocaleContext';

const linksAr = [
  { label: 'المسار', href: '#path' },
  { label: 'الأساس', href: '#base' },
  { label: 'التجربة', href: '#experience' },
];

const linksEn = [
  { label: 'Path', href: '#path' },
  { label: 'Base', href: '#base' },
  { label: 'Experience', href: '#experience' },
];

export default function Navbar() {
  const { setLocale, isArabic } = useLocale();
  const [isScrolled, setIsScrolled] = useState(false);
  const links = isArabic ? linksAr : linksEn;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
      <nav className={`topbar ${isScrolled ? 'scrolled' : ''}`} aria-label="Main navigation">
        <a href="#" className="x10-logo" aria-label="X10">
          <span className="logo-x">X</span>
          <span className="logo-ten">
            <span />
            <span />
            <span />
          </span>
        </a>

        <div className="nav-links">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
        </div>

        <div className="nav-actions">
          <button className="start-pill" type="button">
            {isArabic ? 'ابدأ الآن' : 'Start now'}
          </button>
          <button className="theme-pill" type="button" aria-label={isArabic ? 'تغيير المظهر' : 'Toggle theme'}>
            <span className="sun-icon" />
          </button>
          <button
            className="language-pill"
            type="button"
            onClick={() => setLocale(isArabic ? 'en' : 'ar')}
          >
            {isArabic ? 'English' : 'العربية'}
          </button>
        </div>
      </nav>
    </header>
  );
}
