'use client';

import { useLocale } from '@/context/LocaleContext';
import Reveal from '@/components/animations/Reveal';

const linksAr = [
  {
    title: 'المنتج',
    items: [
      { label: 'المسار', href: '#path' },
      { label: 'الأساس', href: '#base' },
      { label: 'التجربة', href: '#experience' },
      { label: 'الأسعار', href: '#' },
    ],
  },
  {
    title: 'الشركة',
    items: [
      { label: 'من نحن', href: '#' },
      { label: 'المدونة', href: '#' },
      { label: 'وظائف', href: '#' },
      { label: 'اتصل بنا', href: '#' },
    ],
  },
  {
    title: 'قانوني',
    items: [
      { label: 'سياسة الخصوصية', href: '#' },
      { label: 'شروط الخدمة', href: '#' },
      { label: 'الأمان', href: '#' },
    ],
  },
];

const linksEn = [
  {
    title: 'Product',
    items: [
      { label: 'Path', href: '#path' },
      { label: 'Base', href: '#base' },
      { label: 'Experience', href: '#experience' },
      { label: 'Pricing', href: '#' },
    ],
  },
  {
    title: 'Company',
    items: [
      { label: 'About', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Jobs', href: '#' },
      { label: 'Contact', href: '#' },
    ],
  },
  {
    title: 'Legal',
    items: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Security', href: '#' },
    ],
  },
];

export default function Footer() {
  const { isArabic, dir } = useLocale();
  const cols = isArabic ? linksAr : linksEn;

  return (
    <footer className="site-footer" dir={dir}>
      <div className="footer-shell">
        <Reveal>
          <div className="footer-grid">
            <div className="footer-brand">
              <a href="#" className="x10-logo" aria-label="X10" style={{ justifySelf: 'start' }}>
                <span className="logo-x">X</span>
                <span className="logo-ten">
                  <span />
                  <span />
                  <span />
                </span>
              </a>
              <p>
                {isArabic
                  ? 'منصة إدارة فروع متعددة المستأجرين، بتجربة عربية أصيلة وأمان حقيقي.'
                  : 'A multi-tenant branch management platform with an authentic Arabic experience and real security.'}
              </p>
            </div>

            {cols.map((col) => (
              <div key={col.title} className="footer-col">
                <h5>{col.title}</h5>
                {col.items.map((item) => (
                  <a key={item.label} href={item.href}>{item.label}</a>
                ))}
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="footer-bottom">
            <span>© 2026 X10. {isArabic ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}</span>
            <div className="footer-bottom-links">
              <a href="#">{isArabic ? 'مصنوع في الرياض' : 'Made in Riyadh'}</a>
            </div>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
