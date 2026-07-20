'use client';

import { motion } from 'framer-motion';
import { useLocale } from '@/context/LocaleContext';

export default function CTABanner() {
  const { isArabic, dir } = useLocale();

  return (
    <section
      id="cta"
      dir={dir}
      style={{
        position: 'relative',
        overflow: 'hidden',
        padding: '80px 32px 100px',
        background: 'var(--bg)',
      }}
    >
      <div className="wrap">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'relative',
            overflow: 'hidden',
            textAlign: 'center',
            borderRadius: 32,
            padding: '72px 40px',
            border: '1px solid rgba(240,138,112,0.2)',
            background:
              'linear-gradient(160deg, rgba(41,42,44,0.6) 0%, rgba(20,22,26,0.8) 100%)',
            boxShadow:
              '0 0 0 1px rgba(255,255,255,0.04) inset, 0 40px 100px rgba(0,0,0,0.35)',
          }}
        >
          {/* Coral glow top-center */}
          <div
            className="glow"
            style={{
              width: 520,
              height: 320,
              background: 'radial-gradient(circle, rgba(240,138,112,0.18), transparent 70%)',
              top: -120,
              left: '50%',
              transform: 'translateX(-50%)',
              pointerEvents: 'none',
            }}
          />

          {/* Subtle grid lines */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
              borderRadius: 32,
            }}
          />

          {/* Content */}
          <div style={{ position: 'relative', zIndex: 2 }}>
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="eyebrow"
            >
              {isArabic ? 'ابدأ الآن' : 'Get Started'}
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 950,
                lineHeight: 1.18,
                marginTop: 8,
                marginBottom: 18,
                color: 'var(--text)',
              }}
            >
              {isArabic ? (
                <>
                  جاهز لتجربة{' '}
                  <span
                    style={{
                      background: 'linear-gradient(135deg, var(--coral), #e84545)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    المسار الحقيقي
                  </span>
                  ؟
                </>
              ) : (
                <>
                  Ready to experience the{' '}
                  <span
                    style={{
                      background: 'linear-gradient(135deg, var(--coral), #e84545)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    real path
                  </span>
                  ?
                </>
              )}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontSize: 'clamp(1rem, 1.25vw, 1.2rem)',
                color: 'var(--muted)',
                fontWeight: 600,
                lineHeight: 1.85,
                maxWidth: '52ch',
                margin: '0 auto 34px',
              }}
            >
              {isArabic
                ? 'ابدأ من الموقع العام، ثم انتقل إلى Auth الداشبورد وسجّل نشاطك الجاري.'
                : 'Start from the public site, then move to dashboard Auth and register your current activity.'}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{
                display: 'flex',
                gap: 14,
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              className="max-sm:!flex-col"
            >
              <a 
                href="#dashboard" 
                className="btn btn-primary btn-lg"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  minWidth: 200,
                  justifyContent: 'center',
                }}
              >
                {isArabic ? 'افتح الداشبورد' : 'Open Dashboard'}
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    width: 18,
                    height: 18,
                    transform: isArabic ? 'scaleX(-1)' : 'none',
                  }}
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <a 
                href="#demo" 
                className="btn btn-ghost btn-lg"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  minWidth: 200,
                  justifyContent: 'center',
                }}
              >
                {isArabic ? 'احجز عرضاً توضيحياً' : 'Book a Demo'}
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
