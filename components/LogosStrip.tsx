'use client';

import { useLocale } from '@/context/LocaleContext';

const logos = ['Marketly', 'Qanat', 'Nakhla POS', 'Rawaj', 'Tabuk Retail'];

export default function LogosStrip() {
  const { isArabic } = useLocale();

  return (
    <div style={{ borderTop: '1px solid var(--border-soft)', borderBottom: '1px solid var(--border-soft)', padding: '26px 0' }}>
      <div className="wrap flex items-center gap-[44px] flex-wrap justify-center">
        <span style={{ color: 'var(--text-faint)', fontSize: '0.88rem' }}>
          {isArabic ? 'تثق بها فرق تشغيل في' : 'Trusted by operations teams in'}
        </span>
        {logos.map((name) => (
          <span
            key={name}
            className="font-[family-name:var(--font-en)] font-bold text-[1.15rem] transition-opacity duration-300"
            style={{ color: 'var(--text-muted)', opacity: 0.6 }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.6')}
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
