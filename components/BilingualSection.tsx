'use client';

import { motion } from 'framer-motion';
import { useLocale } from '@/context/LocaleContext';

const bulletsAr = [
  'هيدر رجاحي يتحول عند التغيير دون قفز بصري',
  'نصوص AR/EN مقتصدة عن المكونات',
  'Hero بصري لا نص مدمج حتى نش لش ترجمة حقيقية',
];

const bulletsEn = [
  'Elastic header that switches without visual jump',
  'AR/EN text separated from components',
  'Hero is visual — no embedded text until real translation exists',
];

export default function BilingualSection() {
  const { isArabic, dir } = useLocale();
  const bullets = isArabic ? bulletsAr : bulletsEn;

  return (
    <section
      id="bilingual"
      dir={dir}
      style={{
        position: 'relative',
        overflow: 'hidden',
        padding: '110px 32px 120px',
        background: 'var(--bg-deep)',
      }}
    >
      {/* Background decoration */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background:
            'radial-gradient(ellipse at 10% 50%, rgba(240,138,112,0.06), transparent 50%), radial-gradient(ellipse at 90% 20%, rgba(16,214,228,0.05), transparent 50%)',
        }}
      />

      <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '64px',
            alignItems: 'center',
          }}
          className="max-lg:!grid-cols-1 max-lg:!gap-10"
        >
          {/* ── Left / Text side ── */}
          <motion.div
            initial={{ opacity: 0, x: isArabic ? 40 : -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ order: isArabic ? 2 : 1 }}
            className="max-lg:!order-2"
          >
            <span className="eyebrow">{isArabic ? 'ثنائية اللغة' : 'Bilingual'}</span>

            <h2
              style={{
                fontSize: 'clamp(2rem, 3.6vw, 3rem)',
                fontWeight: 950,
                lineHeight: 1.18,
                marginTop: 4,
                marginBottom: 24,
              }}
            >
              {isArabic ? (
                <>
                  واجهة تصلح للعربية
                  <br />
                  والإنجليزية{' '}
                  <span
                    style={{
                      background: 'linear-gradient(135deg, var(--coral), #e84545)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    من أول يوم
                  </span>
                </>
              ) : (
                <>
                  An interface that works
                  <br />
                  for Arabic and English{' '}
                  <span
                    style={{
                      background: 'linear-gradient(135deg, var(--coral), #e84545)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    from day one
                  </span>
                </>
              )}
            </h2>

            <p
              style={{
                color: 'var(--muted)',
                fontSize: 'clamp(1rem, 1.2vw, 1.12rem)',
                fontWeight: 600,
                lineHeight: 1.85,
                marginBottom: 32,
                maxWidth: 480,
              }}
            >
              {isArabic
                ? 'الهيدر والهيرو والأقسام تستخدم اتجاهًا مناسبًا وتدعم التبديل بين اللغتين والاتجاهات دون إعادة بناء منفصلة.'
                : 'The header, hero, and sections use a fitting direction and support switching between languages and directions without a separate rebuild.'}
            </p>

            <ul style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {bullets.map((bullet, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: isArabic ? 16 : -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 12,
                    color: 'var(--muted)',
                    fontSize: '1rem',
                    fontWeight: 600,
                    lineHeight: 1.7,
                    listStyle: 'none',
                  }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: 'var(--coral)',
                      flexShrink: 0,
                      marginTop: 7,
                    }}
                  />
                  {bullet}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* ── Right / Mockup side ── */}
          <motion.div
            initial={{ opacity: 0, x: isArabic ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            style={{ order: isArabic ? 1 : 2 }}
            className="max-lg:!order-1"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 24,
                background:
                  'linear-gradient(160deg, rgba(41,42,44,0.6), rgba(20,22,26,0.7))',
                boxShadow:
                  '0 30px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)',
                overflow: 'hidden',
              }}
            >
              {/* Window chrome */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 20px',
                  borderBottom: '1px solid rgba(255,255,255,0.07)',
                  background: 'rgba(255,255,255,0.02)',
                }}
              >
                {/* Traffic lights */}
                <div style={{ display: 'flex', gap: 6 }}>
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'rgba(255,95,87,0.7)' }} />
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'rgba(255,189,46,0.7)' }} />
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'rgba(40,200,64,0.7)' }} />
                </div>

                {/* Language toggle */}
                <div style={{ display: 'flex', gap: 4 }}>
                  <span
                    style={{
                      padding: '3px 10px',
                      borderRadius: 8,
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      fontFamily: 'var(--font-en)',
                      background: 'rgba(240,138,112,0.15)',
                      color: 'var(--coral)',
                      border: '1px solid rgba(240,138,112,0.25)',
                    }}
                  >
                    AR
                  </span>
                  <span
                    style={{
                      padding: '3px 10px',
                      borderRadius: 8,
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      fontFamily: 'var(--font-en)',
                      background: 'rgba(255,255,255,0.04)',
                      color: 'var(--faint)',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    EN
                  </span>
                </div>

                {/* X10 logo chip */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-en)',
                      fontWeight: 900,
                      fontSize: '1.1rem',
                      color: 'var(--coral)',
                    }}
                  >
                    X
                  </span>
                  <div
                    style={{
                      width: 28,
                      height: 17,
                      display: 'grid',
                      gridTemplateColumns: '6px 6px 12px',
                      gap: 2,
                    }}
                  >
                    <span style={{ display: 'block', background: '#f5f5f5' }} />
                    <span style={{ display: 'block', background: '#f5f5f5' }} />
                    <span style={{ display: 'block', background: '#f5f5f5' }} />
                  </div>
                </div>
              </div>

              {/* Mock form content */}
              <div style={{ padding: '24px 24px 28px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                {/* Field label */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--muted)' }}>
                    {isArabic ? 'الإعدادات' : 'Settings'}
                  </span>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--coral)', fontFamily: 'var(--font-en)' }}>
                    {isArabic ? 'عربي' : 'Arabic'}
                  </span>
                </div>

                {/* Skeleton input rows */}
                {[0.7, 0.55].map((w, i) => (
                  <div
                    key={i}
                    style={{
                      height: 38,
                      borderRadius: 12,
                      border: '1px solid rgba(255,255,255,0.07)',
                      background: 'rgba(255,255,255,0.03)',
                      display: 'flex',
                      alignItems: 'center',
                      padding: '0 14px',
                    }}
                  >
                    <div
                      style={{
                        height: 10,
                        width: `${w * 100}%`,
                        borderRadius: 6,
                        background: 'rgba(255,255,255,0.08)',
                      }}
                    />
                  </div>
                ))}

                {/* Direction indicator row */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 14px',
                    borderRadius: 12,
                    border: '1px solid rgba(240,138,112,0.15)',
                    background: 'rgba(240,138,112,0.05)',
                    marginTop: 4,
                  }}
                >
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--coral)' }}>
                    {isArabic ? 'اتجاه: يمين → يسار' : 'Direction: Left → Right'}
                  </span>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ width: 16, height: 16, color: 'var(--coral)', transform: isArabic ? 'scaleX(-1)' : 'none' }}
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>

                {/* Bottom skeleton */}
                <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                  <div style={{ height: 36, flex: 1, borderRadius: 10, background: 'var(--coral)', opacity: 0.85 }} />
                  <div
                    style={{
                      height: 36,
                      flex: 1,
                      borderRadius: 10,
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
