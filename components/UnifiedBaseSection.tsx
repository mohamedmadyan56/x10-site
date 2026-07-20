'use client';

import { motion } from 'framer-motion';
import { useLocale } from '@/context/LocaleContext';

const featuresAr = [
  {
    title: 'هوية X10 المشتركة',
    desc: 'الشعار، والخط Tajawal للعربية، والألوان الثابتة بتاتي من حزمة مشتركة — وتترك صفحات المنتج لمزاجها المعتمدة.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22 }}>
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" />
      </svg>
    ),
    accent: 'coral',
  },
  {
    title: 'Next.js حيث يفيد فعلاً',
    desc: 'الموقع العام يبني Server Components، الاستضافة، والتفاعل محصور في حيز صغيرة.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22 }}>
        <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    accent: 'cyan',
  },
  {
    title: 'تجربة صادقة',
    desc: 'لا توجد أسعار أو POS أو RBAC ظاهرة كواجهة قبل اكتمال مراجعتها.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22 }}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    accent: 'coral',
  },
];

const featuresEn = [
  {
    title: 'Shared X10 Identity',
    desc: 'The logo, Poppins font for English, Tajawal for Arabic, and the brand colors all come from a shared package — leaving product pages to inherit them.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22 }}>
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" />
      </svg>
    ),
    accent: 'coral',
  },
  {
    title: 'Next.js Where It Actually Helps',
    desc: 'The public site is built with Server Components, hosting and interactivity are confined to small, deliberate areas.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22 }}>
        <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    accent: 'cyan',
  },
  {
    title: 'Honest Experience',
    desc: 'No pricing, POS, or RBAC is shown as a UI before its review is complete.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22 }}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
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
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'end', marginBottom: '64px' }}
          className="max-lg:!grid-cols-1 max-lg:!gap-6"
        >
          <div>
            <span className="eyebrow">{isArabic ? 'الأساس المشترك' : 'Shared Foundation'}</span>
            <h2 style={{ fontSize: 'clamp(2rem, 3.6vw, 3rem)', fontWeight: 950, lineHeight: 1.18, marginTop: 4 }}>
              {isArabic ? (
                <>أساس واجهة واحد<br />بدل نسخ <span style={{ background: 'linear-gradient(135deg, var(--coral), #e84545)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>متفرقة</span></>
              ) : (
                <>One interface foundation<br />instead of <span style={{ background: 'linear-gradient(135deg, var(--coral), #e84545)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>scattered copies</span></>
              )}
            </h2>
          </div>
          <p style={{ color: 'var(--muted)', fontSize: 'clamp(1rem, 1.2vw, 1.15rem)', fontWeight: 600, lineHeight: 1.85 }}>
            {isArabic
              ? 'الصفحة تستخدم الشعار والخط والتوكر من حزمة الواجهة المشتركة، وتترك صفحات المنتج لمزاجها المعتمدة.'
              : 'The page uses the shared identity package for brand, fonts, and tokens — leaving product pages to inherit them.'}
          </p>
        </motion.div>

        {/* ── Cards ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }} className="max-md:!grid-cols-1">
          {features.map((feature, i) => {
            const a = accentStyles[feature.accent as 'coral' | 'cyan'];
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                style={{
                  position: 'relative',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 24,
                  padding: '32px 28px 28px',
                  overflow: 'hidden',
                  background: 'linear-gradient(160deg, rgba(41,42,44,0.45), rgba(20,22,26,0.55))',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04), 0 8px 32px rgba(0,0,0,0.2)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 18,
                  minHeight: 220,
                  cursor: 'default',
                  transition: 'border-color 0.35s ease, box-shadow 0.35s ease',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = a.borderHover; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.07)'; }}
              >
                {/* glow */}
                <div style={{ position: 'absolute', inset: 0, background: a.glow, pointerEvents: 'none', borderRadius: 24 }} />

                {/* icon */}
                <div style={{ width: 52, height: 52, borderRadius: 16, display: 'grid', placeItems: 'center', background: a.icon, color: a.iconColor, border: `1px solid ${a.icon}`, position: 'relative', zIndex: 1 }}>
                  {feature.icon}
                </div>

                {/* text */}
                <div style={{ flex: 1, position: 'relative', zIndex: 1 }}>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 900, marginBottom: 8, color: 'var(--text)' }}>{feature.title}</h3>
                  <p style={{ color: 'var(--muted)', fontSize: '0.92rem', fontWeight: 500, lineHeight: 1.8 }}>{feature.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
