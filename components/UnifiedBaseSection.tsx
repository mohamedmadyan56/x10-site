'use client';

import { motion } from 'framer-motion';
import { useLocale } from '@/context/LocaleContext';

const featuresAr = [
  {
    title: 'تصميم موحّد',
    desc: 'نفس الشعار، نفس الخطوط (Tajawal للعربية وSora للإنجليزية)، ونفس الألوان عبر كل صفحات المنصة.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 24, height: 24 }}>
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
    accent: 'coral',
  },
  {
    title: 'أداء فائق',
    desc: 'بنية Next.js مع Server Components لسرعة تحميل عالية وتجربة سلسة من أول زيارة.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 24, height: 24 }}>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2v20M2 12h20" />
        <path d="M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" />
      </svg>
    ),
    accent: 'cyan',
  },
  {
    title: 'شفافية كاملة',
    desc: 'كل ميزة معروضة شغالة فعلياً. لا وعود فارغة، لا واجهات وهمية — فقط وظائف حقيقية.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 24, height: 24 }}>
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    accent: 'coral',
  },
];

const featuresEn = [
  {
    title: 'Unified Design',
    desc: 'Same logo, same fonts (Tajawal for Arabic, Sora for English), and same colors across all platform pages.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 24, height: 24 }}>
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
    accent: 'coral',
  },
  {
    title: 'Superior Performance',
    desc: 'Next.js architecture with Server Components for high loading speed and smooth experience from first visit.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 24, height: 24 }}>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2v20M2 12h20" />
        <path d="M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" />
      </svg>
    ),
    accent: 'cyan',
  },
  {
    title: 'Full Transparency',
    desc: 'Every displayed feature actually works. No empty promises, no fake interfaces — only real functionality.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 24, height: 24 }}>
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    accent: 'coral',
  },
];

const accentStyles = {
  coral: {
    icon: 'rgba(240,138,112,0.12)',
    iconColor: 'var(--coral)',
    border: 'rgba(240,138,112,0.0)',
    borderHover: 'rgba(240,138,112,0.3)',
    glow: 'radial-gradient(circle at top right, rgba(240,138,112,0.1), transparent 65%)',
  },
  cyan: {
    icon: 'rgba(16,214,228,0.1)',
    iconColor: 'var(--cyan)',
    border: 'rgba(16,214,228,0.0)',
    borderHover: 'rgba(16,214,228,0.28)',
    glow: 'radial-gradient(circle at top right, rgba(16,214,228,0.08), transparent 65%)',
  },
};

export default function UnifiedBaseSection() {
  const { isArabic, dir } = useLocale();
  const features = isArabic ? featuresAr : featuresEn;

  return (
    <section id="base" dir={dir} style={{ position: 'relative', overflow: 'hidden', padding: '110px 32px 120px', background: 'var(--bg)' }}>
      {/* background decoration */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse at 80% 50%, rgba(16,214,228,0.04), transparent 55%), radial-gradient(ellipse at 20% 80%, rgba(240,138,112,0.04), transparent 50%)' }} />

      <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 64px' }}
        >
          <span className="eyebrow">{isArabic ? 'الأساس المشترك' : 'Shared Foundation'}</span>
          
          <h2 style={{ fontSize: 'clamp(2rem, 3.6vw, 3rem)', fontWeight: 950, lineHeight: 1.18, marginTop: 4, marginBottom: 18 }}>
            {isArabic ? (
              <>نظام تصميم موحّد<br />لتجربة <span style={{ background: 'linear-gradient(135deg, var(--coral), #e84545)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>متسقة</span></>
            ) : (
              <>Unified design system<br />for a <span style={{ background: 'linear-gradient(135deg, var(--coral), #e84545)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>consistent</span> experience</>
            )}
          </h2>

          <p style={{ color: 'var(--muted)', fontSize: 'clamp(1rem, 1.2vw, 1.15rem)', fontWeight: 600, lineHeight: 1.85 }}>
            {isArabic
              ? 'كل عنصر في المنصة يتبع نفس معايير التصميم — من الألوان والخطوط إلى المكونات والتفاعلات.'
              : 'Every element in the platform follows the same design standards — from colors and fonts to components and interactions.'}
          </p>
        </motion.div>

        {/* ── Cards ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }} className="max-md:!grid-cols-1">
          {features.map((feature, i) => {
            const a = accentStyles[feature.accent as 'coral' | 'cyan'];
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                style={{
                  position: 'relative',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 24,
                  padding: '36px 30px',
                  overflow: 'hidden',
                  background: 'linear-gradient(160deg, rgba(41,42,44,0.6), rgba(20,22,26,0.7))',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06), 0 12px 40px rgba(0,0,0,0.25)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 20,
                  minHeight: 260,
                  cursor: 'default',
                  transition: 'border-color 0.35s ease, box-shadow 0.35s ease',
                }}
                onMouseEnter={(e) => { 
                  (e.currentTarget as HTMLDivElement).style.borderColor = a.borderHover;
                  (e.currentTarget as HTMLDivElement).style.boxShadow = `inset 0 1px 0 rgba(255,255,255,0.08), 0 20px 60px rgba(0,0,0,0.35)`;
                }}
                onMouseLeave={(e) => { 
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.08)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.06), 0 12px 40px rgba(0,0,0,0.25)';
                }}
              >
                {/* glow */}
                <div style={{ position: 'absolute', inset: 0, background: a.glow, pointerEvents: 'none', borderRadius: 24, opacity: 0.6 }} />

                {/* icon */}
                <div style={{ 
                  width: 64, 
                  height: 64, 
                  borderRadius: 18, 
                  display: 'grid', 
                  placeItems: 'center', 
                  background: a.icon, 
                  color: a.iconColor, 
                  border: `1px solid ${feature.accent === 'coral' ? 'rgba(240,138,112,0.2)' : 'rgba(16,214,228,0.15)'}`, 
                  position: 'relative', 
                  zIndex: 1,
                  boxShadow: `0 8px 24px ${feature.accent === 'coral' ? 'rgba(240,138,112,0.15)' : 'rgba(16,214,228,0.12)'}`,
                }}>
                  {feature.icon}
                </div>

                {/* text */}
                <div style={{ flex: 1, position: 'relative', zIndex: 1 }}>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 900, marginBottom: 12, color: 'var(--text)', lineHeight: 1.3 }}>{feature.title}</h3>
                  <p style={{ color: 'var(--muted)', fontSize: '0.98rem', fontWeight: 500, lineHeight: 1.75 }}>{feature.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
