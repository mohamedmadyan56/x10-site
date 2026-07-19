'use client';

import { useLocale } from '@/context/LocaleContext';

export default function CTABanner() {
  const { isArabic } = useLocale();

  return (
    <section id="cta" className="pad-y">
      <div className="wrap">
        <div
          className="reveal relative overflow-hidden text-center rounded-[var(--r-lg)] px-[40px] py-[72px]"
          style={{
            background: 'linear-gradient(160deg, var(--surface-1), var(--bg-2))',
            border: '1px solid var(--border)',
          }}
        >
          <div
            className="glow"
            style={{
              width: '500px', height: '300px',
              background: 'oklch(55% 0.12 192 / 0.18)',
              top: '-100px', right: '50%',
              transform: 'translateX(50%)',
            }}
          />
          <div style={{ position: 'relative', zIndex: 2 }}>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-black mb-[18px]">
              {isArabic ? 'جاهز تدير فروعك بشكل مختلف؟' : 'Ready to manage your branches differently?'}
            </h2>
            <p
              className="text-[1.2rem] max-w-[54ch] mx-auto mb-[34px]"
              style={{ color: 'var(--text-muted)' }}
            >
              {isArabic
                ? 'ابدأ مجاناً اليوم. لا حاجة لبطاقة، وإعداد كامل في دقائق.'
                : 'Start for free today. No card needed, full setup in minutes.'}
            </p>
            <div className="flex gap-[14px] flex-wrap justify-center">
              <a href="#" className="btn btn-primary btn-lg">
                {isArabic ? 'ابدأ تجربتك المجانية' : 'Start Your Free Trial'}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
              </a>
              <a href="#" className="btn btn-ghost btn-lg">
                {isArabic ? 'احجز عرضاً توضيحياً' : 'Book a Demo'}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
