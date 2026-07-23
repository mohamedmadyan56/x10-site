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
            'radial-gradient(ellipse at 10% 50%, rgba(231, 136, 113,0.06), transparent 50%), radial-gradient(ellipse at 90% 20%, rgba(15, 165, 184,0.05), transparent 50%)',
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
            style={{ order: isArabic ? 1 : 2, position: 'relative' }}
            className="max-lg:!order-1"
          >
            {/* Background Glow */}
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3],
                rotate: [0, 90, 0]
              }}
              transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '120%',
                height: '120%',
                transform: 'translate(-50%, -50%)',
                background: 'conic-gradient(from 0deg at 50% 50%, rgba(231, 136, 113,0.25), rgba(15, 165, 184,0.25), rgba(231, 136, 113,0.25))',
                filter: 'blur(70px)',
                zIndex: 0,
                borderRadius: '50%',
                pointerEvents: 'none',
              }}
            />

            {/* Main Window */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'relative',
                zIndex: 1,
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: 24,
                background: 'linear-gradient(145deg, rgba(30, 32, 38, 0.8) 0%, rgba(15, 17, 21, 0.9) 100%)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                boxShadow: '0 40px 100px -20px rgba(0,0,0,0.8), inset 0 1px 2px rgba(255,255,255,0.2)',
                overflow: 'hidden',
              }}
            >
              {/* Window chrome */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px 24px',
                  borderBottom: '1px solid rgba(255,255,255,0.08)',
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0))',
                }}
              >
                {/* Traffic lights */}
                <div style={{ display: 'flex', gap: 8 }}>
                  <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f56', boxShadow: '0 0 12px rgba(255,95,86,0.6)' }} />
                  <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffbd2e', boxShadow: '0 0 12px rgba(255,189,46,0.6)' }} />
                  <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#27c93f', boxShadow: '0 0 12px rgba(39,201,63,0.6)' }} />
                </div>

                {/* Simulated URL Bar */}
                <div style={{ 
                  flex: 1, 
                  maxWidth: 240, 
                  height: 28, 
                  margin: '0 20px', 
                  background: 'rgba(0,0,0,0.4)', 
                  borderRadius: 14, 
                  border: '1px solid rgba(255,255,255,0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8
                }}>
                  <span style={{ width: 10, height: 10, border: '2px solid rgba(255,255,255,0.2)', borderRadius: '50%' }} />
                  <div style={{ width: 80, height: 6, background: 'rgba(255,255,255,0.1)', borderRadius: 3 }} />
                </div>

                {/* X10 logo chip */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-en)',
                      fontWeight: 900,
                      fontSize: '1.2rem',
                      background: 'linear-gradient(135deg, var(--coral), #ff6b6b)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
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
                    <span style={{ display: 'block', background: 'rgba(255,255,255,0.9)', borderRadius: 1 }} />
                    <span style={{ display: 'block', background: 'rgba(255,255,255,0.9)', borderRadius: 1 }} />
                    <span style={{ display: 'block', background: 'rgba(255,255,255,0.9)', borderRadius: 1 }} />
                  </div>
                </div>
              </div>

              {/* Mock form content */}
              <div style={{ padding: '32px 24px', display: 'flex', flexDirection: 'column', gap: 28 }}>
                
                {/* Language Switcher Simulation */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--foreground)' }}>
                      {isArabic ? 'إعدادات النظام' : 'System Settings'}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>
                      {isArabic ? 'التبديل بين اللغات والاتجاهات بسلاسة' : 'Switch languages and directions seamlessly'}
                    </span>
                  </div>

                  <div style={{ 
                      display: 'flex', 
                      background: 'rgba(0,0,0,0.5)', 
                      borderRadius: 16, 
                      padding: 6, 
                      border: '1px solid rgba(255,255,255,0.1)',
                      position: 'relative',
                      boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.5)'
                  }}>
                      <motion.div
                          animate={{ 
                            left: isArabic ? 6 : 'calc(50% - 3px)',
                            right: isArabic ? 'calc(50% - 3px)' : 6 
                          }}
                          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                          style={{
                              position: 'absolute',
                              top: 6,
                              bottom: 6,
                              background: 'linear-gradient(135deg, var(--coral), #ff6b6b)',
                              borderRadius: 10,
                              boxShadow: '0 4px 15px rgba(231, 136, 113, 0.4)',
                              zIndex: 0
                          }}
                      />
                      <span style={{ 
                          padding: '6px 20px', 
                          position: 'relative', 
                          zIndex: 1, 
                          color: isArabic ? '#fff' : 'rgba(255,255,255,0.5)', 
                          fontWeight: 700,
                          fontSize: '0.85rem',
                          transition: 'color 0.3s'
                      }}>عربي</span>
                      <span style={{ 
                          padding: '6px 20px', 
                          position: 'relative', 
                          zIndex: 1, 
                          color: !isArabic ? '#fff' : 'rgba(255,255,255,0.5)', 
                          fontWeight: 700,
                          fontFamily: 'var(--font-en)',
                          fontSize: '0.85rem',
                          transition: 'color 0.3s'
                      }}>English</span>
                  </div>
                </div>

                {/* Dashboard layout simulation */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2.5fr', gap: 20 }}>
                    {/* Sidebar skeleton */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {[...Array(4)].map((_, i) => (
                            <div key={i} style={{ 
                                height: 38, 
                                borderRadius: 10, 
                                background: i === 0 ? 'rgba(231, 136, 113, 0.15)' : 'rgba(255,255,255,0.03)',
                                border: i === 0 ? '1px solid rgba(231, 136, 113, 0.3)' : '1px solid rgba(255,255,255,0.05)',
                                display: 'flex',
                                alignItems: 'center',
                                padding: '0 12px',
                                gap: 12,
                                transition: 'all 0.3s'
                            }}>
                                <div style={{ 
                                  width: 18, 
                                  height: 18, 
                                  borderRadius: 6, 
                                  background: i === 0 ? 'var(--coral)' : 'rgba(255,255,255,0.15)',
                                  boxShadow: i === 0 ? '0 0 10px rgba(231, 136, 113, 0.5)' : 'none'
                                }} />
                                <div style={{ height: 6, width: i === 0 ? '60%' : '80%', borderRadius: 3, background: i === 0 ? 'var(--coral)' : 'rgba(255,255,255,0.15)' }} />
                            </div>
                        ))}
                    </div>

                    {/* Main content skeleton */}
                    <div style={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      gap: 20, 
                      background: 'rgba(255,255,255,0.02)', 
                      padding: 24, 
                      borderRadius: 16, 
                      border: '1px solid rgba(255,255,255,0.08)',
                      boxShadow: 'inset 0 0 20px rgba(0,0,0,0.2)'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                <div style={{ height: 12, width: 120, borderRadius: 6, background: 'rgba(255,255,255,0.3)' }} />
                                <div style={{ height: 8, width: 80, borderRadius: 4, background: 'rgba(255,255,255,0.1)' }} />
                            </div>
                            <div style={{ display: 'flex', gap: -10 }}>
                              {[1, 2, 3].map(i => (
                                <div key={i} style={{ 
                                  width: 32, 
                                  height: 32, 
                                  borderRadius: '50%', 
                                  background: `linear-gradient(135deg, ${i===1 ? 'var(--coral)' : i===2 ? '#0fa5b8' : '#6c5ce7'}, ${i===1 ? '#e84545' : i===2 ? '#0b9ba6' : '#a29bfe'})`,
                                  border: '2px solid rgba(20,22,26,1)',
                                  marginLeft: isArabic ? 0 : -10,
                                  marginRight: isArabic ? -10 : 0,
                                  zIndex: 4-i,
                                  boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
                                }} />
                              ))}
                            </div>
                        </div>

                        {/* Chart simulation */}
                        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, height: 110, marginTop: 10 }}>
                            {[30, 60, 45, 90, 65, 85].map((h, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ height: 0 }}
                                    whileInView={{ height: `${h}%` }}
                                    transition={{ duration: 1.2, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                                    style={{ 
                                        flex: 1, 
                                        background: `linear-gradient(180deg, var(--coral) 0%, rgba(231, 136, 113,0.05) 100%)`, 
                                        borderRadius: '6px 6px 0 0',
                                        borderTop: '2px solid var(--coral)',
                                        opacity: 0.9,
                                        position: 'relative'
                                    }} 
                                >
                                  {h === 90 && (
                                    <motion.div 
                                      initial={{ opacity: 0, y: 10 }}
                                      whileInView={{ opacity: 1, y: -25 }}
                                      transition={{ delay: 1.5, duration: 0.5 }}
                                      style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        background: 'var(--coral)',
                                        padding: '4px 8px',
                                        borderRadius: 6,
                                        fontSize: '0.6rem',
                                        fontWeight: 800,
                                        color: '#fff',
                                        boxShadow: '0 4px 10px rgba(231, 136, 113,0.4)'
                                      }}
                                    >
                                      +90%
                                    </motion.div>
                                  )}
                                </motion.div>
                            ))}
                        </div>

                        {/* Data rows */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 10 }}>
                            {[1, 2].map(i => (
                                <motion.div 
                                  key={i}
                                  initial={{ opacity: 0, y: 10 }}
                                  whileInView={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                                  style={{ 
                                    display: 'flex', 
                                    justifyContent: 'space-between', 
                                    alignItems: 'center',
                                    padding: '14px 16px', 
                                    background: 'rgba(255,255,255,0.03)', 
                                    border: '1px solid rgba(255,255,255,0.05)',
                                    borderRadius: 10,
                                    cursor: 'pointer'
                                  }}
                                  whileHover={{ background: 'rgba(255,255,255,0.06)' }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: i === 1 ? '#0fa5b8' : '#ffbd2e', boxShadow: `0 0 10px ${i === 1 ? 'rgba(15, 165, 184,0.5)' : 'rgba(255,189,46,0.5)'}` }} />
                                      <div style={{ height: 8, width: 80, borderRadius: 4, background: 'rgba(255,255,255,0.2)' }} />
                                    </div>
                                    <div style={{ height: 8, width: 40, borderRadius: 4, background: 'rgba(255,255,255,0.1)' }} />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
