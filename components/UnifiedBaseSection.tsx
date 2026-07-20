'use client';

import { motion } from 'framer-motion';
import { useLocale } from '@/context/LocaleContext';

export default function UnifiedBaseSection() {
  const { isArabic, dir } = useLocale();

  return (
    <section id="base" dir={dir} style={{ 
      position: 'relative', 
      overflow: 'hidden', 
      padding: '140px 32px', 
      background: 'radial-gradient(circle at 10% 18%, rgba(10, 208, 220, 0.34), transparent 14%), radial-gradient(circle at 82% 92%, rgba(12, 175, 187, 0.35), transparent 17%), radial-gradient(circle at 18% 96%, rgba(240, 138, 112, 0.18), transparent 21%), linear-gradient(135deg, #0a1115 0%, #1f2228 46%, #10161b 100%)'
    }}>
      
      {/* background decoration */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 150, repeat: Infinity, ease: 'linear' }}
          style={{ position: 'absolute', top: '-30%', right: '-10%', width: '70vw', height: '70vw', background: 'radial-gradient(circle, rgba(16,214,228,0.04) 0%, transparent 60%)', borderRadius: '50%', filter: 'blur(90px)' }}
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
          style={{ position: 'absolute', bottom: '-20%', left: '-10%', width: '80vw', height: '80vw', background: 'radial-gradient(circle, rgba(240,138,112,0.03) 0%, transparent 60%)', borderRadius: '50%', filter: 'blur(100px)' }}
        />
        <div style={{ position: 'absolute', inset: 0, backgroundSize: '40px 40px', backgroundImage: 'linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px)', maskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)', WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)' }} />
      </div>

      <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto 80px' }}
        >
          <span className="eyebrow" style={{ padding: '8px 20px', borderRadius: '100px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
            {isArabic ? 'الأساس المشترك' : 'Shared Foundation'}
          </span>
          
          <h2 style={{ fontSize: 'clamp(2.5rem, 4.5vw, 4rem)', fontWeight: 950, lineHeight: 1.15, marginTop: 24, marginBottom: 24, letterSpacing: isArabic ? 'normal' : '-0.02em' }}>
            {isArabic ? (
              <>نظام تصميم موحّد<br />لتجربة <span style={{ background: 'linear-gradient(135deg, var(--coral), #ff6b6b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block' }}>استثنائية</span></>
            ) : (
              <>Unified design for an<br /><span style={{ background: 'linear-gradient(135deg, var(--coral), #ff6b6b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block' }}>exceptional</span> experience</>
            )}
          </h2>

          <p style={{ color: 'var(--muted)', fontSize: 'clamp(1.05rem, 1.4vw, 1.25rem)', fontWeight: 500, lineHeight: 1.8, maxWidth: 640, margin: '0 auto' }}>
            {isArabic
              ? 'كل عنصر في المنصة يتبع نفس معايير التصميم الصارمة — من الألوان والخطوط إلى المكونات والتفاعلات لضمان تناغم مثالي.'
              : 'Every element in the platform follows the same strict design standards — from colors and fonts to components and interactions.'}
          </p>
        </motion.div>

        {/* ── Bento Grid ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }} className="max-lg:!grid-cols-1">
          
          {/* Card 1: Unified Design (Spans 2 columns) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{
              gridColumn: 'span 2',
              position: 'relative',
              borderRadius: '32px',
              padding: '48px',
              overflow: 'hidden',
              background: 'linear-gradient(145deg, rgba(30, 32, 38, 0.7) 0%, rgba(15, 17, 21, 0.9) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(240,138,112,0.15)',
              boxShadow: '0 20px 50px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,0.1)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '420px',
            }}
            className="max-lg:!col-span-1"
          >
            <div style={{ position: 'absolute', top: 0, right: 0, width: '100%', height: '100%', background: 'radial-gradient(circle at top right, rgba(240,138,112,0.1), transparent 60%)', pointerEvents: 'none' }} />
            
            <div style={{ position: 'relative', zIndex: 1, maxWidth: '400px' }}>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '16px', color: 'var(--foreground)' }}>
                {isArabic ? 'نظام تصميم موحّد ومتماسك' : 'Unified Design System'}
              </h3>
              <p style={{ color: 'var(--muted)', fontSize: '1.1rem', fontWeight: 600, lineHeight: 1.8 }}>
                {isArabic ? 'هوية بصرية موحدة عبر جميع الواجهات؛ نستخدم خط Tajawal للعربية وSora للإنجليزية لضمان تناغم مثالي.' : 'A consistent visual identity across all interfaces. We use Tajawal for Arabic and Sora for English.'}
              </p>
            </div>

            {/* Visual: Typography & Components Intersection */}
            <div style={{ position: 'absolute', bottom: '-20px', right: isArabic ? 'auto' : '-20px', left: isArabic ? '-20px' : 'auto', width: '300px', height: '200px' }}>
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} style={{ position: 'absolute', bottom: '40px', right: isArabic ? '40px' : 'auto', left: isArabic ? 'auto' : '40px', width: '180px', height: '120px', background: 'rgba(240,138,112,0.1)', border: '1px solid rgba(240,138,112,0.3)', borderRadius: '16px', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
                <span style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--coral)', fontFamily: 'var(--font-ar)' }}>ع</span>
              </motion.div>
              <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} style={{ position: 'absolute', bottom: '80px', right: isArabic ? '120px' : 'auto', left: isArabic ? 'auto' : '120px', width: '160px', height: '100px', background: 'rgba(16,214,228,0.1)', border: '1px solid rgba(16,214,228,0.3)', borderRadius: '16px', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
                <span style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--cyan)', fontFamily: 'var(--font-en)' }}>En</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Card 2: Performance (Spans 1 column) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            style={{
              gridColumn: 'span 1',
              position: 'relative',
              borderRadius: '32px',
              padding: '48px',
              overflow: 'hidden',
              background: 'linear-gradient(145deg, rgba(30, 32, 38, 0.7) 0%, rgba(15, 17, 21, 0.9) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(16,214,228,0.15)',
              boxShadow: '0 20px 50px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,0.1)',
              display: 'flex',
              flexDirection: 'column',
              minHeight: '420px',
            }}
          >
            <div style={{ position: 'absolute', top: 0, right: 0, width: '100%', height: '100%', background: 'radial-gradient(circle at bottom left, rgba(16,214,228,0.1), transparent 70%)', pointerEvents: 'none' }} />
            
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h3 style={{ fontSize: '1.6rem', fontWeight: 900, marginBottom: '16px', color: 'var(--foreground)' }}>
                {isArabic ? 'أداء فائق واستثنائي' : 'Blazing Performance'}
              </h3>
              <p style={{ color: 'var(--muted)', fontSize: '1rem', fontWeight: 600, lineHeight: 1.7 }}>
                {isArabic ? 'مبني بـ Next.js لضمان أوقات تحميل شبه معدومة وتجربة فائقة السلاسة.' : 'Built with Next.js to guarantee near-zero load times and a smooth experience.'}
              </p>
            </div>

            {/* Visual: Animated Chart/Bars */}
            <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '12px', marginTop: '40px', position: 'relative', zIndex: 1 }}>
              {[40, 70, 50, 100].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${h}%` }}
                  transition={{ duration: 1, delay: 0.3 + (i * 0.1), type: 'spring' }}
                  style={{ width: '32px', background: i === 3 ? 'var(--cyan)' : 'rgba(16,214,228,0.2)', borderRadius: '8px 8px 0 0', borderTop: i !== 3 ? '2px solid var(--cyan)' : 'none', position: 'relative' }}
                >
                  {i === 3 && (
                    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 1.2 }} style={{ position: 'absolute', top: '-30px', left: '50%', transform: 'translateX(-50%)', background: '#fff', color: '#000', fontSize: '0.8rem', fontWeight: 900, padding: '4px 8px', borderRadius: '8px' }}>
                      99%
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Card 3: Transparency (Spans 3 columns, Horizontal) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              gridColumn: 'span 3',
              position: 'relative',
              borderRadius: '32px',
              padding: '48px',
              overflow: 'hidden',
              background: 'linear-gradient(145deg, rgba(30, 32, 38, 0.7) 0%, rgba(15, 17, 21, 0.9) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(157,78,221,0.15)',
              boxShadow: '0 20px 50px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: '64px',
              minHeight: '280px',
            }}
            className="max-lg:!col-span-1 max-lg:!flex-col max-lg:!items-start max-lg:!gap-8"
          >
            <div style={{ position: 'absolute', top: 0, right: 0, width: '100%', height: '100%', background: 'radial-gradient(circle at center, rgba(157,78,221,0.08), transparent 70%)', pointerEvents: 'none' }} />
            
            <div style={{ flex: 1, position: 'relative', zIndex: 1, maxWidth: '600px' }}>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '16px', color: 'var(--foreground)' }}>
                {isArabic ? 'شفافية ومصداقية تامة' : 'Absolute Transparency'}
              </h3>
              <p style={{ color: 'var(--muted)', fontSize: '1.1rem', fontWeight: 600, lineHeight: 1.8 }}>
                {isArabic ? 'ما تراه هو ما تحصل عليه؛ لا نستخدم واجهات وهمية. كل ميزة معروضة هنا تعمل بكفاءة وواقعية، مع كود برمجي نظيف وموثوق.' : 'What you see is what you get. Every feature displayed works efficiently, backed by clean and reliable code.'}
              </p>
            </div>

            {/* Visual: Wireframe to Real UI Reveal (Scanner) */}
            <div style={{ flex: 1, width: '100%', position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'center' }}>
              <div style={{ 
                position: 'relative', 
                width: '100%', 
                maxWidth: '340px', 
                height: '180px', 
                borderRadius: '20px', 
                overflow: 'hidden', 
                background: 'rgba(255,255,255,0.02)', 
                border: '1px solid rgba(255,255,255,0.05)',
                boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)'
              }}>
                
                {/* Base Layer: Wireframe (Fake Interface) */}
                <div style={{ position: 'absolute', inset: 0, padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px dashed rgba(255,255,255,0.15)' }} />
                    <div style={{ flex: 1, height: '14px', borderRadius: '7px', background: 'rgba(255,255,255,0.05)' }} />
                  </div>
                  <div style={{ width: '85%', height: '12px', borderRadius: '6px', background: 'rgba(255,255,255,0.05)' }} />
                  <div style={{ width: '65%', height: '12px', borderRadius: '6px', background: 'rgba(255,255,255,0.05)' }} />
                  <div style={{ marginTop: 'auto', width: '100%', height: '36px', borderRadius: '10px', border: '2px dashed rgba(255,255,255,0.15)' }} />
                </div>

                {/* Top Layer: Real UI (Revealed by scanner) */}
                <motion.div 
                  animate={{ clipPath: ['inset(0 100% 0 0)', 'inset(0 0% 0 0)', 'inset(0 100% 0 0)'] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ 
                    position: 'absolute', 
                    inset: 0, 
                    padding: '24px', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '18px', 
                    background: 'linear-gradient(135deg, rgba(30, 32, 38, 1) 0%, rgba(20, 22, 26, 1) 100%)',
                    borderLeft: '2px solid var(--purple)' 
                  }}
                >
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <div style={{ 
                      width: '40px', 
                      height: '40px', 
                      borderRadius: '50%', 
                      background: 'linear-gradient(135deg, var(--cyan), var(--purple))', 
                      boxShadow: '0 0 15px rgba(157,78,221,0.5)' 
                    }} />
                    <div style={{ flex: 1, height: '14px', borderRadius: '7px', background: 'rgba(255,255,255,0.9)' }} />
                  </div>
                  <div style={{ width: '85%', height: '12px', borderRadius: '6px', background: 'rgba(255,255,255,0.5)' }} />
                  <div style={{ width: '65%', height: '12px', borderRadius: '6px', background: 'rgba(255,255,255,0.3)' }} />
                  <div style={{ 
                    marginTop: 'auto', 
                    width: '100%', 
                    height: '36px', 
                    borderRadius: '10px', 
                    background: 'var(--purple)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    color: '#fff', 
                    fontSize: '0.85rem', 
                    fontWeight: 800,
                    boxShadow: '0 8px 20px rgba(157,78,221,0.4)'
                  }}>
                    {isArabic ? 'بيانات حقيقية' : 'Live Data Active'}
                  </div>
                </motion.div>

                {/* Scanner Laser Line */}
                <motion.div
                  animate={{ left: ['0%', '100%', '0%'] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ 
                    position: 'absolute', 
                    top: 0, 
                    bottom: 0, 
                    width: '3px', 
                    background: 'var(--purple)', 
                    boxShadow: '0 0 25px 6px var(--purple), 0 0 10px 2px #fff', 
                    zIndex: 10 
                  }}
                />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
