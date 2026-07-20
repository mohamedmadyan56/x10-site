'use client';

import { useEffect, useRef, useState } from 'react';
import { useLocale } from '@/context/LocaleContext';
import { motion } from 'framer-motion';
import Reveal from '@/components/animations/Reveal';

function DashboardPreview({ isArabic }: { isArabic: boolean }) {
  return (
    <div className="w-full h-full rounded-2xl overflow-hidden border border-[var(--cyan)]/10 bg-gradient-to-br from-[#11161f] to-[#0a0e14] shadow-[0_0_60px_rgba(16,214,228,0.08)] flex flex-col relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(16,214,228,0.04),_transparent_70%)] pointer-events-none" />

      <div className="flex items-center justify-between px-4 py-2.5 border-b border-[var(--cyan)]/8 bg-[var(--cyan)]/[0.02]">
        <div className="flex items-center gap-2.5">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--coral)]/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
          </div>
          <span className="text-[9px] font-mono font-bold text-gray-500 tracking-wider ml-2">
            {isArabic ? 'لوحة التحكم' : 'x10_dashboard'}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[8px] text-gray-600 font-mono font-bold">10:24 AM</span>
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[var(--coral)] to-orange-500 flex items-center justify-center text-[7px] font-black text-[#241c19]">
            X
          </div>
        </div>
      </div>

      <div className="flex flex-1 min-h-0" style={{ direction: 'ltr' }}>
        <div className="w-12 lg:w-14 flex-shrink-0 border-r border-[var(--cyan)]/5 bg-white/[0.015] flex flex-col items-center gap-3 py-4">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${i === 0
                ? 'bg-[var(--coral)]/20 text-[var(--coral)] shadow-[0_0_12px_rgba(240,138,112,0.2)]'
                : 'text-gray-600 hover:text-gray-400 hover:bg-white/5'
                }`}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                {i === 0 && <><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></>}
                {i === 1 && <><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></>}
                {i === 2 && <><path d="M18 20V10" /><path d="M12 20V4" /><path d="M6 20v-6" /></>}
                {i === 3 && <><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></>}
              </svg>
            </div>
          ))}
        </div>

        <div className="flex-1 p-3 lg:p-4 grid grid-cols-2 gap-2 content-start">
          {[
            { label: isArabic ? 'الفروع' : 'Branches', value: '12', gradient: 'from-[var(--coral)] to-orange-500' },
            { label: isArabic ? 'المستخدمين' : 'Users', value: '1,284', gradient: 'from-[var(--cyan)] to-emerald-400' },
            { label: isArabic ? 'المبيعات' : 'Sales', value: '48.2K', gradient: 'from-emerald-400 to-teal-400' },
            { label: isArabic ? 'التنبيهات' : 'Alerts', value: '3', gradient: 'from-rose-400 to-pink-500' },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-2.5 lg:p-3 flex flex-col gap-1 hover:border-[var(--cyan)]/20 hover:bg-[var(--cyan)]/[0.02] transition-all duration-300">
              <span className="text-[8px] font-semibold text-gray-500">{stat.label}</span>
              <span className={`text-sm lg:text-base font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                {stat.value}
              </span>
            </div>
          ))}

          <div className="col-span-2 rounded-xl bg-white/[0.02] border border-white/[0.05] p-2.5 h-20 flex items-end gap-1">
            {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 50, 95].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-sm"
                style={{
                  height: `${h}%`,
                  background: i % 2 === 0
                    ? 'linear-gradient(to top, var(--coral), transparent)'
                    : 'linear-gradient(to top, var(--cyan), transparent)',
                  opacity: 0.4 + (i / 24),
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ExperienceSection() {
  const { isArabic, dir } = useLocale();
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const items = isArabic
    ? [
      { title: 'تصميم عربي أولاً', desc: 'واجهة RTL كاملة مع خطوط عربية محسّنة ودعم كامل للغتين.', icon: <ArabicIcon /> },
      { title: 'تجربة تسجيل سلسة', desc: 'تسجيل دخول بدون كلمة مرور عبر OTP. لا إحباط، لا تعقيد.', icon: <LockIcon /> },
      { title: 'داشبورد حية', desc: 'إحصائيات مباشرة، تنبيهات ذكية، وفروعك كلها في صورة واحدة.', icon: <ChartIcon /> },
      { title: 'عزل متعدد النشاطات', desc: 'كل فرع له بياناته وصلاحياته — لا تداخل ولا تسرب.', icon: <ShieldIcon /> },
    ]
    : [
      { title: 'Arabic-First Design', desc: 'Full RTL interface with optimized Arabic fonts and bilingual support.', icon: <ArabicIcon /> },
      { title: 'Seamless Registration', desc: 'Passwordless login via OTP. No frustration, no complexity.', icon: <LockIcon /> },
      { title: 'Live Dashboard', desc: 'Real-time stats, smart alerts, and all your branches in one view.', icon: <ChartIcon /> },
      { title: 'Multi-Tenant Isolation', desc: 'Each branch has its own data and permissions — no overlap, no leaks.', icon: <ShieldIcon /> },
    ];

  return (
    <section id="experience" className="exp-stage" dir={dir} ref={sectionRef}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse,_rgba(16,214,228,0.06),_transparent_70%)]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-[radial-gradient(ellipse,_rgba(240,138,112,0.05),_transparent_70%)]" />
        <motion.div className="absolute top-[20%] left-[10%] w-2 h-2 rounded-full bg-[var(--cyan)]/30" animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="absolute top-[60%] right-[15%] w-3 h-3 rounded-full bg-[var(--coral)]/20" animate={{ y: [0, 15, 0], opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }} />
        <motion.div className="absolute top-[40%] left-[80%] w-1.5 h-1.5 rounded-full bg-[var(--cyan)]/25" animate={{ x: [0, -10, 0], opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }} />
      </div>

      <div className="exp-shell relative z-10">
        <Reveal>
          <div className="exp-head">
            <span className="exp-label">{isArabic ? 'التجربة' : 'Experience'}</span>
            <h2>{isArabic ? 'جرب الفرق بنفسك' : 'Experience the difference yourself'}</h2>
            <p>{isArabic ? 'واجهة نظيفة، تنقل سلس، وكل شيء شغال من أول لحظة.' : 'Clean interface, smooth navigation, everything working from the first moment.'}</p>
          </div>
        </Reveal>

        <div className="exp-grid">
          <Reveal delay={100}>
            <motion.div id="dashboard-target" className="exp-visual overflow-hidden p-3 lg:p-4 relative"
              initial={{ opacity: 0, y: 40 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.3 }}>
              <div className="absolute inset-0 rounded-2xl border border-[var(--cyan)]/10 bg-[var(--cyan)]/[0.02]" />
              <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-[var(--cyan)]/20 via-transparent to-[var(--coral)]/20 opacity-50" />
              <div className="relative w-full h-full">
                <DashboardPreview isArabic={isArabic} />
              </div>
            </motion.div>
          </Reveal>

          <div className="exp-list">
            {items.map((item, i) => (
              <Reveal key={item.title} delay={150 + i * 100}>
                <motion.div className="exp-item group"
                  initial={{ opacity: 0, x: isArabic ? 40 : -40 }} animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }} whileHover={{ x: isArabic ? -4 : 4 }}>
                  <div className="exp-item-header">
                    <div className="exp-item-icon group-hover:shadow-[0_0_20px_rgba(16,214,228,0.3)] group-hover:border-[var(--cyan)]/30 transition-all duration-300">
                      {item.icon}
                    </div>
                    <h4>{item.title}</h4>
                  </div>
                  <p>{item.desc}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ArabicIcon() {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7V4h3M4 17v3h3M20 7V4h-3M20 17v3h-3M9 9h6v6H9z" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2" /></svg>);
}
function LockIcon() {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>);
}
function ChartIcon() {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>);
}
function ShieldIcon() {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>);
}
