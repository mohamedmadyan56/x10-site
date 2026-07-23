'use client';

import { useLocale } from '@/context/LocaleContext';
import { useTheme } from '@/components/ThemeProvider';

const linksAr = [
  { label: 'المسار', href: '#path' },
  { label: 'الباقات', href: '#base' },
  { label: 'التجربة', href: '#experience' },
];

const linksEn = [
  { label: 'Path', href: '#path' },
  { label: 'Plans', href: '#base' },
  { label: 'Experience', href: '#experience' },
];

export default function Navbar() {
  const { setLocale, isArabic } = useLocale();
  const { theme, toggle } = useTheme();
  const links = isArabic ? linksAr : linksEn;

  return (
    <header className="site-header">
      <nav className="topbar" aria-label="Main navigation">
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
          <button className="theme-pill" type="button" onClick={toggle} aria-label={isArabic ? 'تغيير المظهر' : 'Toggle theme'}>
            {theme === 'dark' ? (
              <span className="sun-icon" />
            ) : (
              <span className="moon-icon" />
            )}
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
