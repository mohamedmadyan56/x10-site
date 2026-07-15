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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
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
            <div
              className="absolute top-4 -left-6 bg-dark-card2 border border-white/10 rounded-xl px-3.5 py-3 flex items-center gap-2.5 shadow-2xl z-10"
              style={{ animation: 'floatCard 4s ease-in-out infinite' }}
            >
              <span className="text-2xl">🔐</span>
              <div>
                <strong className="block text-text-light text-xs">Auth OTP</strong>
                <span className="text-text-muted text-[11px]">{isArabic ? 'متصل وآمن' : 'Connected & Secure'}</span>
              </div>
            </div>

            <div
              className="bg-dark-card border border-white/10 rounded-xl overflow-hidden shadow-2xl transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.01]"
              style={{ boxShadow: '0 24px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(5,96,116,0.2)' }}
            >
              <div className="bg-dark-card2 px-4 py-3 flex items-center gap-2 border-b border-white/10">
                <div className="flex gap-1.5">
                  <span className="w-[10px] h-[10px] rounded-full bg-[#e74c3c]" />
                  <span className="w-[10px] h-[10px] rounded-full bg-[#f39c12]" />
                  <span className="w-[10px] h-[10px] rounded-full bg-[#2ecc71]" />
                </div>
                <div className="flex-1 bg-white/6 rounded-md px-2.5 py-1 font-en text-[11px] text-text-muted text-center">
                  app.x10.sa/dashboard
                </div>
              </div>

              <div className="p-4 grid grid-cols-[auto_1fr] gap-3 min-h-[280px]">
                <div className="w-14 bg-petrol rounded-xl p-3 flex flex-col gap-3 items-center">
                  {['🏠', '📦', '📊', '⚙️', '👤'].map((icon, i) => (
                    <div
                      key={i}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm cursor-pointer transition-colors ${
                        i === 0 ? 'bg-coral' : 'bg-white/15 hover:bg-white/28'
                      }`}
                    >
                      {icon}
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-2.5">
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: isArabic ? 'المبيعات' : 'Sales', val: '12,840', cls: 'text-[#4ade80]' },
                      { label: isArabic ? 'الطلبات' : 'Orders', val: '340', cls: 'text-coral' },
                      { label: isArabic ? 'العملاء' : 'Customers', val: '1,204', cls: 'text-text-light' },
                    ].map((stat, i) => (
                      <div key={i} className="bg-dark-card2 rounded-lg p-2.5 border border-white/10">
                        <div className="text-[10px] text-text-muted mb-1">{stat.label}</div>
                        <div className={`text-base font-bold font-en ${stat.cls}`}>{stat.val}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-end gap-1 h-15 bg-dark-card2 rounded-lg p-2 border border-white/10 overflow-hidden">
                    {[55, 40, 75, 60, 90, 50, 70, 85].map((h, i) => (
                      <div
                        key={i}
                        className={`flex-1 rounded-t min-w-[8px] ${i % 2 === 0 ? 'bg-petrol' : 'bg-coral/70'}`}
                        style={{ height: `${h}%`, animation: `growUp 1s ease-out ${i * 0.1}s both` }}
                      />
                    ))}
                  </div>

                  <div className="bg-dark-card2 rounded-lg border border-white/10 overflow-hidden">
                    {[
                      { name: isArabic ? 'أحمد محمد' : 'Ahmed M.', initial: 'أ', bg: '#e74c3c', badge: isArabic ? 'نشط' : 'Active', bdgCls: 'bg-[#4ade80]/15 text-[#4ade80]' },
                      { name: isArabic ? 'سارة علي' : 'Sara A.', initial: 'س', bg: '#056074', badge: isArabic ? 'نشط' : 'Active', bdgCls: 'bg-[#4ade80]/15 text-[#4ade80]' },
                      { name: isArabic ? 'خالد ناصر' : 'Khaled N.', initial: 'خ', bg: '#8b5cf6', badge: isArabic ? 'انتظار' : 'Pending', bdgCls: 'bg-[#fbbf24]/15 text-[#fbbf24]' },
                    ].map((row, i) => (
                      <div key={i} className="flex items-center px-2.5 py-1.5 gap-2 border-b border-white/10 last:border-b-0">
                        <div
                          className="w-[22px] h-[22px] rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
                          style={{ background: row.bg }}
                        >
                          {row.initial}
                        </div>
                        <div className="flex-1 text-[11px] text-text-sub">{row.name}</div>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${row.bdgCls}`}>
                          {row.badge}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div
              className="absolute -bottom-6 -left-8 bg-petrol/90 border border-petrol/60 rounded-xl px-3.5 py-2.5 shadow-2xl z-10"
              style={{ animation: 'floatCard2 5s ease-in-out infinite', animationDelay: '1s' }}
            >
              <div className="text-xs text-white/90 flex items-center gap-1.5">
                <span>🛡️</span>
                <div>
                  <strong className="text-sm">{isArabic ? 'Tenant آمن' : 'Secure Tenant'}</strong>
                  <br />
                  <span className="text-[10px] opacity-80">
                    {isArabic ? 'Multi-tenant verified' : 'Multi-tenant verified'}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
