'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLocale } from '@/context/LocaleContext';

export default function HeroSection() {
  const { isArabic, dir } = useLocale();
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = particlesRef.current;
    if (!container) return;
    const colors = ['#056074', '#E78871', '#0a9ab8', '#f7f9fb'];
    for (let i = 0; i < 18; i++) {
      const p = document.createElement('div');
      const size = Math.random() * 4 + 2;
      p.className = 'particle';
      Object.assign(p.style, {
        width: `${size}px`,
        height: `${size}px`,
        left: `${Math.random() * 100}%`,
        background: colors[Math.floor(Math.random() * colors.length)],
        animationDuration: `${Math.random() * 12 + 8}s`,
        animationDelay: `${Math.random() * 8}s`,
        position: 'absolute',
        borderRadius: '50%',
        animation: `float ${Math.random() * 12 + 8}s linear infinite`,
        opacity: '0',
      });
      container.appendChild(p);
    }
    return () => {
      container.innerHTML = '';
    };
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
      dir={dir}
    >
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 70% 40%, rgba(5,96,116,0.35) 0%, transparent 70%),
            radial-gradient(ellipse 40% 60% at 20% 70%, rgba(231,136,113,0.12) 0%, transparent 60%),
            linear-gradient(180deg, #0d1f24 0%, #0a1a1f 100%)
          `
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-0 animate-[gridFade_3s_ease-in_forwards]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none overflow-hidden" />

      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(100vh) scale(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 0.6; }
          100% { transform: translateY(-20vh) scale(1); opacity: 0; }
        }
        @keyframes gridFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        @keyframes growUp {
          from { transform: scaleY(0); transform-origin: bottom; }
          to { transform: scaleY(1); transform-origin: bottom; }
        }
        @keyframes floatCard {
          0%, 100% { transform: translateY(0) rotate(-2deg); }
          50% { transform: translateY(-8px) rotate(-1deg); }
        }
        @keyframes floatCard2 {
          0%, 100% { transform: translateY(0) rotate(1deg); }
          50% { transform: translateY(-6px) rotate(0deg); }
        }
      `}</style>

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 md:px-12">
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2">
            <div className="w-full h-full bg-gradient-to-b from-transparent via-petrol/40 to-transparent" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-coral rounded-full shadow-lg shadow-coral/50" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
          </div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-1.5 bg-petrol/20 border border-petrol/50 rounded-full px-3.5 py-1.5 text-sm text-[#7dd4e0] mb-6">
              <span className="w-1.5 h-1.5 bg-coral rounded-full animate-pulse" />
              {isArabic ? 'النسخة الجديدة متاحة الآن' : 'New version is now available'}
            </div>

            <h1 className="text-[clamp(2.2rem,4vw,3.2rem)] font-extrabold leading-tight text-text-light mb-6">
              {isArabic ? (
                <>من أول تسجيل<br />إلى تشغيل يومي<br /><span className="text-coral">بثقة</span></>
              ) : (
                <>From signup to<br />daily operation<br /><span className="text-coral">with confidence</span></>
              )}
            </h1>

            <p className="text-base text-text-sub leading-relaxed mb-8 max-w-[460px]">
              {isArabic
                ? 'X10 يبدأ من تجربة واضحة. تم توجيه المستخدم إلى تسجيل الهاتف وإنشاء النشاط داخل الداشبورد، دون وعود تشغيلية غير منفذة.'
                : 'X10 starts with a clear experience. The user is guided to phone registration and activity creation inside the dashboard, without unfulfilled operational promises.'}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#features"
                className="bg-coral text-white border-none rounded-xl px-7 py-3.5 font-ar text-base font-bold cursor-pointer transition-all no-underline inline-flex items-center gap-2 hover:bg-coral-dark hover:-translate-y-0.5 hover:shadow-lg hover:shadow-coral/35"
              >
                {isArabic ? 'ابدأ من الداشبورد' : 'Start from Dashboard'}
                <span>{isArabic ? '←' : '→'}</span>
              </a>
              <a
                href="#journey"
                className="bg-transparent text-text-light border border-white/20 rounded-xl px-7 py-3.5 font-ar text-base font-medium cursor-pointer transition-all no-underline inline-flex items-center gap-2 hover:border-petrol hover:text-[#7dd4e0]"
              >
                {isArabic ? 'اكتشف المسار' : 'Discover the Path'}
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:block"
          >
            <motion.div
              className="w-full max-w-xl mx-auto"
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative">
                <div
                  className="absolute -inset-4 bg-gradient-to-br from-coral/20 via-petrol/20 to-coral/20 rounded-3xl blur-2xl"
                  style={{ animation: 'pulseGlow 3s ease-in-out infinite' }}
                />
                <div className="relative overflow-hidden rounded-3xl" style={{ clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)' }}>
                  <motion.img
                    src="/hero-image.png"
                    alt="hero"
                    className="w-full h-auto object-cover scale-110"
                    style={{ boxShadow: '0 24px 80px rgba(0,0,0,0.5)' }}
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
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
