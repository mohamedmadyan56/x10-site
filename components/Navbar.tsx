'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocale } from '@/context/LocaleContext';

const linksAr = [
  { label: 'المسار', href: '#journey' },
  { label: 'الأساس', href: '#features' },
  { label: 'التجربة', href: '#interface' },
];

const linksEn = [
  { label: 'Journey', href: '#journey' },
  { label: 'Features', href: '#features' },
  { label: 'Experience', href: '#interface' },
];

export default function Navbar() {
  const { locale, setLocale, isArabic } = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('journey');
  const links = isArabic ? linksAr : linksEn;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = ['journey', 'features', 'interface'];
      let current = '';
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 100) current = id;
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      dir={isArabic ? 'rtl' : 'ltr'}
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 h-16 transition-all duration-300 ${
        scrolled
          ? 'bg-dark-bg/85 backdrop-blur-md border-b border-white/8'
          : 'bg-transparent'
      }`}
    >
      <a href="#" className="flex items-center gap-1.5 no-underline">
        <div className="flex items-center font-en font-bold text-xl tracking-tight text-text-light">
          <span className="text-coral">X</span>
          <span className="w-[2px] h-[22px] bg-text-muted mx-1" />
          <div className="flex gap-0.5">
            <span className="w-[9px] h-[9px] bg-text-light rounded-sm" />
            <span className="w-[9px] h-[9px] bg-text-light rounded-sm" />
            <span className="w-[9px] h-[9px] bg-text-light rounded-sm" />
            <span className="w-[9px] h-[9px] bg-coral rounded-sm" />
          </div>
        </div>
      </a>

      <ul className="hidden md:flex items-center gap-8 list-none">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className={`text-sm font-medium transition-colors duration-200 relative no-underline ${
                activeSection === link.href.slice(1)
                  ? 'text-text-light'
                  : 'text-text-sub'
              }`}
            >
              {link.label}
              <span
                className={`absolute -bottom-1 left-0 right-0 h-[2px] bg-coral transition-transform duration-250 origin-right ${
                  activeSection === link.href.slice(1) ? 'scale-x-100' : 'scale-x-0'
                }`}
              />
            </a>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-3">
        <button
          onClick={() => setLocale(isArabic ? 'en' : 'ar')}
          className="flex items-center gap-1.5 bg-dark-card border border-white/10 rounded-full px-3.5 py-1.5 text-text-sub text-xs cursor-pointer transition-all hover:border-petrol hover:text-text-light"
        >
          {isArabic ? 'English' : 'العربية'} 🌐
        </button>
        <button
          onClick={() => setLocale(isArabic ? 'en' : 'ar')}
          className="bg-dark-card border border-white/10 rounded-full w-9 h-9 flex items-center justify-center cursor-pointer text-text-sub text-sm transition-all hover:border-petrol hover:text-text-light"
        >
          ☀
        </button>
        <a
          href="#"
          className="bg-coral text-white border-none rounded-[22px] px-5 py-2 font-ar text-sm font-bold cursor-pointer transition-all hover:bg-coral-dark hover:-translate-y-0.5 whitespace-nowrap no-underline"
        >
          {isArabic ? 'ابدأ الآن' : 'Start Now'}
        </a>
      </div>
    </motion.nav>
  );
}
