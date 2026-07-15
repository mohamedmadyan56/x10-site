'use client';

import { useLocale } from '@/context/LocaleContext';

export default function Footer() {
  const { isArabic } = useLocale();

  return (
    <footer style={{ borderTop: '1px solid var(--border-soft)', padding: '60px 0 40px' }}>
      <div className="wrap">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-[40px] mb-[48px]">
          <div className="col-span-2 md:col-span-1">
            <a href="#" className="flex items-center gap-[11px] font-[family-name:var(--font-en)] font-extrabold text-[1.35rem] mb-4">
              <span
                className="w-[38px] h-[38px] rounded-[11px] grid place-items-center font-extrabold text-[1.05rem]"
                style={{
                  background: 'linear-gradient(135deg, var(--teal-strong), var(--teal-dim))',
                  color: 'var(--bg)',
                  boxShadow: '0 0 0 1px oklch(80% 0.13 192 / 0.3)',
                }}
              >
                X
              </span>
              <span style={{ fontFamily: 'var(--font-en)' }}>X10</span>
            </a>
            <p className="text-[0.96rem] max-w-[34ch]" style={{ color: 'var(--text-muted)' }}>
              {isArabic
                ? 'منصة إدارة الفروع متعددة المستأجرين، مبنية للسوق العربي بتجربة أصيلة وأمان حقيقي.'
                : 'Multi-tenant branch management platform, built for the Arabic market with authentic experience and real security.'}
            </p>
          </div>

          {[
            {
              title: isArabic ? 'المنتج' : 'Product',
              links: isArabic
                ? [{ label: 'المميزات', href: '#features' }, { label: 'المنصة', href: '#platform' }, { label: 'الباقات', href: '#pricing' }, { label: 'التحديثات', href: '#' }]
                : [{ label: 'Features', href: '#features' }, { label: 'Platform', href: '#platform' }, { label: 'Pricing', href: '#pricing' }, { label: 'Updates', href: '#' }],
            },
            {
              title: isArabic ? 'الشركة' : 'Company',
              links: isArabic
                ? [{ label: 'من نحن', href: '#' }, { label: 'المدونة', href: '#' }, { label: 'الوظائف', href: '#' }, { label: 'تواصل معنا', href: '#' }]
                : [{ label: 'About', href: '#' }, { label: 'Blog', href: '#' }, { label: 'Jobs', href: '#' }, { label: 'Contact', href: '#' }],
            },
            {
              title: isArabic ? 'قانوني' : 'Legal',
              links: isArabic
                ? [{ label: 'سياسة الخصوصية', href: '#' }, { label: 'شروط الاستخدام', href: '#' }, { label: 'الأمان', href: '#' }]
                : [{ label: 'Privacy Policy', href: '#' }, { label: 'Terms of Use', href: '#' }, { label: 'Security', href: '#' }],
            },
          ].map((col) => (
            <div key={col.title}>
              <h5
                className="text-[0.85rem] font-bold mb-[16px] font-[family-name:var(--font-en)] tracking-[0.04em]"
                style={{ color: 'var(--text-faint)' }}
              >
                {col.title}
              </h5>
              {col.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block text-[0.96rem] py-[6px] transition-colors duration-250"
                  style={{ color: 'var(--text-muted)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--teal)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                >
                  {link.label}
                </a>
              ))}
            </div>
          ))}
        </div>

        <div
          className="flex justify-between items-center pt-[26px] flex-wrap gap-[12px] text-[0.9rem]"
          style={{ borderTop: '1px solid var(--border-soft)', color: 'var(--text-faint)' }}
        >
          <span>© 2026 X10. {isArabic ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}</span>
          <span className="font-[family-name:var(--font-en)]">
            {isArabic ? 'Made in Riyadh · صُنع بالعربية' : 'Made in Riyadh · صُنع بالعربية'}
          </span>
        </div>
      </div>
    </footer>
  );
}
