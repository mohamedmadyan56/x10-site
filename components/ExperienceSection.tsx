'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useLocale } from '@/context/LocaleContext';
import Reveal from '@/components/animations/Reveal';

function DashboardPreview({ isArabic }: { isArabic: boolean }) {
  return (
    <div className="w-full h-full rounded-2xl overflow-hidden border border-white/[0.08] bg-gradient-to-br from-[#11161f] to-[#0a0e14] shadow-2xl shadow-black/50 flex flex-col">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06] bg-white/[0.02]">
        <div className="flex items-center gap-2.5">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
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
        <div className="w-12 lg:w-14 flex-shrink-0 border-r border-white/[0.06] bg-white/[0.015] flex flex-col items-center gap-3 py-4">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`w-7 h-7 rounded-lg flex items-center justify-content-center transition-colors ${i === 0
                ? 'bg-[var(--coral)]/20 text-[var(--coral)]'
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
            { label: isArabic ? 'الفروع' : 'Branches', value: '12', color: 'from-[var(--coral)] to-orange-500' },
            { label: isArabic ? 'المستخدمين' : 'Users', value: '1,284', color: 'from-[var(--cyan)] to-teal-500' },
            { label: isArabic ? 'المبيعات' : 'Sales', value: '48.2K', color: 'from-emerald-500 to-emerald-400' },
            { label: isArabic ? 'التنبيهات' : 'Alerts', value: '3', color: 'from-rose-500 to-rose-400' },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-2.5 lg:p-3 flex flex-col gap-1">
              <span className="text-[8px] font-semibold text-gray-500">{stat.label}</span>
              <span className={`text-sm lg:text-base font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                {stat.value}
              </span>
            </div>
          ))}

          <div className="col-span-2 rounded-xl bg-white/[0.03] border border-white/[0.06] p-3 lg:p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-bold text-gray-400 font-mono uppercase tracking-wider">
                {isArabic ? 'نشاط الفروع' : 'Branch Activity'}
              </span>
              <span className="text-[8px] text-emerald-400 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live
              </span>
            </div>
            <div className="flex items-end gap-1.5 h-12">
              {[40, 65, 35, 80, 55, 90, 70, 45, 85, 60, 75, 50].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-sm bg-gradient-to-t from-[var(--coral)]/60 to-[var(--coral)]/30"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
            <div className="flex justify-between text-[6px] text-gray-600 font-mono font-bold mt-0.5">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((d, i) => (
                <span key={i} className="text-center flex-1">{d}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const itemsAr = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}>
        <path d="M3 21V7l9-4 9 4v14" /><path d="M9 21v-6h6v6" />
      </svg>
    ),
    title: 'شبكة الفروع في خريطة حية',
    desc: 'كل فرع عقدة متصلة بالمركز. تابع الحالة والمبيعات والمستخدمين النشطين لحظياً.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}>
        <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M3 15h18M9 3v18M15 3v18" />
      </svg>
    ),
    title: 'لوحة تحكم موحّدة',
    desc: 'كل الفروع من شاشة واحدة. تقارير مجمّعة، تنبيهات فورية، وتحكم كامل.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: 'أمان وعزل تلقائي',
    desc: 'بدون إعدادات إضافية. كل مستأجر معزول، وكل صلاحية مضبوطة من أول يوم.',
  },
];

const itemsEn = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}>
        <path d="M3 21V7l9-4 9 4v14" /><path d="M9 21v-6h6v6" />
      </svg>
    ),
    title: 'Branch Network Live Map',
    desc: 'Each branch is a connected node. Track status, sales, and active users in real time.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}>
        <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M3 15h18M9 3v18M15 3v18" />
      </svg>
    ),
    title: 'Unified Dashboard',
    desc: 'All branches from one screen. Aggregated reports, instant alerts, full control.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: 'Automatic Security & Isolation',
    desc: 'No extra setup. Each tenant is isolated, every permission configured from day one.',
  },
];

export default function ExperienceSection() {
  const { isArabic, dir } = useLocale();
  const items = isArabic ? itemsAr : itemsEn;
  const sectionRef = useRef<HTMLElement>(null);
  const [flyState, setFlyState] = useState<'idle' | 'flying' | 'complete'>('idle');
  const [flyStyle, setFlyStyle] = useState<React.CSSProperties>({});
  const played = useRef(false);

  useEffect(() => {
    if (played.current) return;
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !played.current) {
          played.current = true;
          triggerFly();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  function triggerFly() {
    const heroEl = document.getElementById('hero-image-source');
    const targetEl = document.getElementById('dashboard-target');
    if (!heroEl || !targetEl) return;

    const heroRect = heroEl.getBoundingClientRect();
    const targetRect = targetEl.getBoundingClientRect();

    const dx = targetRect.left - heroRect.left;
    const dy = targetRect.top - heroRect.top;
    const scale = Math.min(
      targetRect.width / heroRect.width,
      targetRect.height / heroRect.height
    );

    // ✅ الإصلاح 1: مش بنخفي الصورة الأصلية — بنخليها تفضل ظاهرة أثناء الطيران
    // الـ clone بيطير فوقها وهي موجودة

    setFlyStyle({
      position: 'fixed',
      left: heroRect.left,
      top: heroRect.top,
      width: heroRect.width,
      height: heroRect.height,
      zIndex: 50,
      pointerEvents: 'none',
      transformOrigin: 'top left',
      transform: 'translate(0, 0) scale(1)',
      transition: 'none',
    });
    setFlyState('flying');

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setFlyStyle((prev) => ({
          ...prev,
          transform: `translate(${dx}px, ${dy}px) scale(${scale})`,
          transition: 'transform 1s cubic-bezier(0.22, 1, 0.36, 1)',
        }));

        // تم إزالة إخفاء الصورة الأصلية - الصورة تفضل ظاهرة طول الوقت
      });
    });

    // بعد الأنيميشن نعرض الداشبورد ونشيل الـ clone
    setTimeout(() => {
      setFlyState('complete');
    }, 1200);
  }

  return (
    <section id="experience" className="exp-stage" dir={dir} ref={sectionRef}>
      <div className="exp-shell">
        <Reveal>
          <div className="exp-head">
            <span className="exp-label">{isArabic ? 'التجربة' : 'Experience'}</span>
            <h2>
              {isArabic ? 'جرب الفرق بنفسك' : 'Experience the difference yourself'}
            </h2>
            <p>
              {isArabic
                ? 'واجهة نظيفة، تنقل سلس، وكل شيء شغال من أول لحظة.'
                : 'Clean interface, smooth navigation, everything working from the first moment.'}
            </p>
          </div>
        </Reveal>

        <div className="exp-grid">
          <Reveal delay={100}>
            <div
              id="dashboard-target"
              className="exp-visual overflow-hidden p-3 lg:p-4"
            >
              {/* ✅ الإصلاح 4: الداشبورد يظهر بعد complete مع fade-in */}
              <div
                style={{
                  opacity: flyState === 'complete' ? 1 : 0,
                  transition: flyState === 'complete'
                    ? 'opacity 0.6s ease 0.1s'
                    : 'none',
                  width: '100%',
                  height: '100%',
                }}
              >
                <DashboardPreview isArabic={isArabic} />
              </div>
            </div>
          </Reveal>

          <div className="exp-list">
            {items.map((item, i) => (
              <Reveal key={item.title} delay={150 + i * 100}>
                <div className="exp-item">
                  <div className="exp-item-header">
                    <div className="exp-item-icon">{item.icon}</div>
                    <h4>{item.title}</h4>
                  </div>
                  <p>{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ✅ الإصلاح 5: الـ clone يظهر فقط أثناء flying وبعد complete يختفي */}
      {flyState === 'flying' && (
        <div style={flyStyle} className="flying-image-clip">
          <img
            src="/generated-image-7e678040-c54d-4cfc-9407-a606acdc5521.png"
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </div>
      )}
    </section>
  );
}