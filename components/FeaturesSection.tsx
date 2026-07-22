'use client';

import { useEffect, useRef, useState } from 'react';
import { useLocale } from '@/context/LocaleContext';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
      <path d="M18 6 6 18M6 6l12 12"/>
    </svg>
  );
}

export default function FeaturesSection() {
  const { isArabic } = useLocale();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof window === 'undefined') return;

    if (window.innerWidth < 768) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top top',
        end: '+=280%',
        pin: true,
        scrub: 0.6,
        onUpdate: (self) => {
          const step = Math.min(3, Math.floor(self.progress * 4));
          setActiveStep(step);
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  const stories = isArabic
    ? [
        {
          id: 'rbac',
          stepLabel: '01 / 04',
          tag: 'مصفوفة الصلاحيات (RBAC)',
          title: 'مصفوفة صلاحيات دقيقة ومحكمة',
          desc: 'حدد بالضبط من يرى، يعدّل، وينشئ، ويحذف. كل دور معزول تماماً، وكل فرع بحدوده الصارمة لتفادي التعارض.',
          accentColor: 'var(--cyan)',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <path d="M3 9h18M3 15h18M9 3v18M15 3v18"/>
            </svg>
          ),
          visual: (
            <div className="p-6 rounded-2xl bg-[#0e131a]/80 border border-white/10 w-full shadow-2xl backdrop-blur-md">
              <div className="grid grid-cols-5 gap-3 text-center text-xs font-bold text-gray-400 mb-4 pb-2 border-b border-white/10">
                <span className="text-right">{isArabic ? 'الدور الوظيفي' : 'Role'}</span>
                <span>عرض</span>
                <span>تعديل</span>
                <span>إنشاء</span>
                <span>حذف</span>
              </div>
              {[
                { role: 'المدير العام', checks: [true, true, true, true] },
                { role: 'مدير الفرع', checks: [true, true, true, false] },
                { role: 'المحاسب', checks: [true, true, false, false] },
              ].map((row) => (
                <div key={row.role} className="grid grid-cols-5 gap-3 items-center text-xs py-3 border-t border-white/5">
                  <span className="font-bold text-right text-gray-200">{row.role}</span>
                  {row.checks.map((check, i) => (
                    <div key={i} className="flex justify-center">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${check ? 'bg-[var(--cyan)]/20 text-[var(--cyan)] shadow-[0_0_12px_rgba(16,214,228,0.2)]' : 'bg-[var(--coral)]/20 text-[var(--coral)]'}`}>
                        {check ? <CheckIcon /> : <XIcon />}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ),
        },
        {
          id: 'phone-auth',
          stepLabel: '02 / 04',
          tag: 'مصادقة الهاتف (OTP)',
          title: 'دخول برقم الهاتف دون كلمات مرور',
          desc: 'تجربة تسجيل دخول سريعة ومباشرة عبر رمـز OTP لمرة واحدة. لا تعقيد، ولا نسيان لكلمات السر إطلاقاً.',
          accentColor: 'var(--coral)',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7">
              <rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/>
            </svg>
          ),
          visual: (
            <div className="p-8 rounded-2xl bg-gradient-to-br from-[#1c222b] via-[#141920] to-[#0e1217] border border-[var(--coral)]/30 flex flex-col items-center justify-center text-center gap-5 w-full shadow-2xl">
              <div className="w-14 h-14 rounded-2xl bg-[var(--coral)]/20 text-[var(--coral)] flex items-center justify-center font-black text-2xl shadow-[0_0_30px_rgba(240,138,112,0.35)]">
                OTP
              </div>
              <div className="flex gap-3">
                {['8', '4', '9', '2'].map((digit, i) => (
                  <span key={i} className="w-12 h-14 rounded-xl bg-white/5 border border-[var(--coral)]/40 flex items-center justify-center text-xl font-black text-white shadow-inner">
                    {digit}
                  </span>
                ))}
              </div>
              <span className="text-xs text-[var(--coral)] font-mono font-bold tracking-wide">✓ Verified Passwordless Auth</span>
            </div>
          ),
        },
        {
          id: 'speed',
          stepLabel: '03 / 04',
          tag: 'سرعة استجابة فائقة',
          title: 'أداء ناري بفضل Next.js Server Components',
          desc: 'تحميل مباشر للمحتوى بدون انتظار، مع تخزين مؤقت ذكي للاستعلامات المكررة لسرعة استجابة استثنائية.',
          accentColor: 'var(--cyan)',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7">
              <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>
            </svg>
          ),
          visual: (
            <div className="p-8 rounded-2xl bg-gradient-to-br from-[#121820] to-[#0a0d12] border border-[var(--cyan)]/30 flex flex-col gap-5 w-full shadow-2xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-gray-400">Response Speed</span>
                <span className="text-base font-mono font-black text-[var(--cyan)]">99.4 ms</span>
              </div>
              <div className="w-full h-3.5 rounded-full bg-white/5 overflow-hidden p-0.5 border border-white/10">
                <div className="h-full rounded-full bg-gradient-to-r from-[var(--cyan)] via-teal-400 to-emerald-400 w-[96%] shadow-[0_0_15px_rgba(16,214,228,0.5)]" />
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs text-gray-300 font-mono">
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">TTFB: 18ms</div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">FCP: 0.3s</div>
              </div>
            </div>
          ),
        },
        {
          id: 'multi-tenant',
          stepLabel: '04 / 04',
          tag: 'عزل الفروع (Multi-Tenant)',
          title: 'عزل تام لبيانات كل نشاط وفرع',
          desc: 'بيانات كل فرع معزولة بالكامل على مستوى قاعدة البيانات لمنع أي تداخل أو تسرب للمعلومات.',
          accentColor: 'var(--coral)',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          ),
          visual: (
            <div className="p-8 rounded-2xl bg-[var(--surface-1)] border border-white/10 flex flex-col items-center gap-4 w-full shadow-2xl">
              <div className="flex gap-4 w-full justify-center">
                <div className="px-5 py-4 rounded-xl bg-[var(--coral)]/10 border border-[var(--coral)]/30 text-center flex-1">
                  <span className="block text-sm font-bold text-[var(--coral)]">{isArabic ? 'فرع الرياض' : 'Riyadh Branch'}</span>
                  <span className="text-xs text-gray-400 font-mono">Isolated DB</span>
                </div>
                <div className="px-5 py-4 rounded-xl bg-[var(--cyan)]/10 border border-[var(--cyan)]/30 text-center flex-1">
                  <span className="block text-sm font-bold text-[var(--cyan)]">{isArabic ? 'فرع جدة' : 'Jeddah Branch'}</span>
                  <span className="text-xs text-gray-400 font-mono">Isolated DB</span>
                </div>
              </div>
              <div className="w-full h-[1px] bg-white/10 my-1" />
              <span className="text-xs font-mono text-emerald-400 font-bold">🛡️ Zero Cross-Tenant Data Leaks</span>
            </div>
          ),
        },
      ]
    : [
        {
          id: 'rbac',
          stepLabel: '01 / 04',
          tag: 'Permissions Matrix (RBAC)',
          title: 'Precise Permissions Matrix',
          desc: 'Specify exactly who sees, edits, creates, and deletes. Each role is isolated with strict boundaries.',
          accentColor: 'var(--cyan)',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <path d="M3 9h18M3 15h18M9 3v18M15 3v18"/>
            </svg>
          ),
          visual: (
            <div className="p-6 rounded-2xl bg-[#0e131a]/80 border border-white/10 w-full shadow-2xl backdrop-blur-md">
              <div className="grid grid-cols-5 gap-3 text-center text-xs font-bold text-gray-400 mb-4 pb-2 border-b border-white/10">
                <span className="text-left">Role</span>
                <span>View</span>
                <span>Edit</span>
                <span>Create</span>
                <span>Delete</span>
              </div>
              {[
                { role: 'General Manager', checks: [true, true, true, true] },
                { role: 'Branch Manager', checks: [true, true, true, false] },
                { role: 'Accountant', checks: [true, true, false, false] },
              ].map((row) => (
                <div key={row.role} className="grid grid-cols-5 gap-3 items-center text-xs py-3 border-t border-white/5">
                  <span className="font-bold text-left text-gray-200">{row.role}</span>
                  {row.checks.map((check, i) => (
                    <div key={i} className="flex justify-center">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${check ? 'bg-[var(--cyan)]/20 text-[var(--cyan)] shadow-[0_0_12px_rgba(16,214,228,0.2)]' : 'bg-[var(--coral)]/20 text-[var(--coral)]'}`}>
                        {check ? <CheckIcon /> : <XIcon />}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ),
        },
        {
          id: 'phone-auth',
          stepLabel: '02 / 04',
          tag: 'Phone Authentication',
          title: 'Passwordless OTP Login',
          desc: 'Fast OTP login experience. No password frustrations, no lost credentials.',
          accentColor: 'var(--coral)',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7">
              <rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/>
            </svg>
          ),
          visual: (
            <div className="p-8 rounded-2xl bg-gradient-to-br from-[#1c222b] via-[#141920] to-[#0e1217] border border-[var(--coral)]/30 flex flex-col items-center justify-center text-center gap-5 w-full shadow-2xl">
              <div className="w-14 h-14 rounded-2xl bg-[var(--coral)]/20 text-[var(--coral)] flex items-center justify-center font-black text-2xl shadow-[0_0_30px_rgba(240,138,112,0.35)]">
                OTP
              </div>
              <div className="flex gap-3">
                {['8', '4', '9', '2'].map((digit, i) => (
                  <span key={i} className="w-12 h-14 rounded-xl bg-white/5 border border-[var(--coral)]/40 flex items-center justify-center text-xl font-black text-white shadow-inner">
                    {digit}
                  </span>
                ))}
              </div>
              <span className="text-xs text-[var(--coral)] font-mono font-bold tracking-wide">✓ Verified Passwordless Auth</span>
            </div>
          ),
        },
        {
          id: 'speed',
          stepLabel: '03 / 04',
          tag: 'Blazing Fast Performance',
          title: 'Powered by Next.js Server Components',
          desc: 'Instant loading with intelligent caching for repeated database queries.',
          accentColor: 'var(--cyan)',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7">
              <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>
            </svg>
          ),
          visual: (
            <div className="p-8 rounded-2xl bg-gradient-to-br from-[#121820] to-[#0a0d12] border border-[var(--cyan)]/30 flex flex-col gap-5 w-full shadow-2xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-gray-400">Response Speed</span>
                <span className="text-base font-mono font-black text-[var(--cyan)]">99.4 ms</span>
              </div>
              <div className="w-full h-3.5 rounded-full bg-white/5 overflow-hidden p-0.5 border border-white/10">
                <div className="h-full rounded-full bg-gradient-to-r from-[var(--cyan)] via-teal-400 to-emerald-400 w-[96%] shadow-[0_0_15px_rgba(16,214,228,0.5)]" />
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs text-gray-300 font-mono">
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">TTFB: 18ms</div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">FCP: 0.3s</div>
              </div>
            </div>
          ),
        },
        {
          id: 'multi-tenant',
          stepLabel: '04 / 04',
          tag: 'Multi-Tenant Isolation',
          title: 'Strict Branch Data Isolation',
          desc: 'Every business and branch is strictly isolated at the database level.',
          accentColor: 'var(--coral)',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          ),
          visual: (
            <div className="p-8 rounded-2xl bg-[var(--surface-1)] border border-white/10 flex flex-col items-center gap-4 w-full shadow-2xl">
              <div className="flex gap-4 w-full justify-center">
                <div className="px-5 py-4 rounded-xl bg-[var(--coral)]/10 border border-[var(--coral)]/30 text-center flex-1">
                  <span className="block text-sm font-bold text-[var(--coral)]">Riyadh Branch</span>
                  <span className="text-xs text-gray-400 font-mono">Isolated DB</span>
                </div>
                <div className="px-5 py-4 rounded-xl bg-[var(--cyan)]/10 border border-[var(--cyan)]/30 text-center flex-1">
                  <span className="block text-sm font-bold text-[var(--cyan)]">Jeddah Branch</span>
                  <span className="text-xs text-gray-400 font-mono">Isolated DB</span>
                </div>
              </div>
              <div className="w-full h-[1px] bg-white/10 my-1" />
              <span className="text-xs font-mono text-emerald-400 font-bold">🛡️ Zero Cross-Tenant Data Leaks</span>
            </div>
          ),
        },
      ];

  const activeStory = stories[activeStep] || stories[0];
  const progressPercent = ((activeStep + 1) / stories.length) * 100;

  return (
    <section id="features" className="relative pad-y bg-[var(--bg)] overflow-hidden" ref={sectionRef}>
      
      {/* Soft Ambient Background Glow behind active content */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[radial-gradient(ellipse_at_center,_rgba(16,214,228,0.08),_transparent_70%)] blur-3xl" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[350px] bg-[radial-gradient(ellipse_at_center,_rgba(240,138,112,0.06),_transparent_70%)] blur-3xl" />
      </div>

      <div className="wrap relative z-10 min-h-[620px] flex flex-col justify-between">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <span className="eyebrow">{isArabic ? 'قصة X10' : 'X10 Storytelling'}</span>
            <h2 className="text-[clamp(2.2rem,4vw,3.2rem)] font-black tracking-[-0.02em] mt-2 mb-3 text-[var(--text)]">
              {isArabic ? 'كل ما تحتاجه لتشغيل فروعك، خطوة بخطوة' : 'Everything you need to run your branches, step by step'}
            </h2>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono font-bold text-gray-400">
            <span>{isArabic ? 'الخطوة' : 'Step'}</span>
            <span className="text-[var(--cyan)] font-black text-sm">{activeStep + 1}</span>
            <span>/ {stories.length}</span>
          </div>
        </div>

        {/* Single Premium Glass Panel positioned beside the X image */}
        <div className="relative w-full min-h-[460px] rounded-3xl bg-gradient-to-br from-[#161c24]/85 via-[#0e1218]/90 to-[#0a0d12]/95 border border-white/15 p-8 lg:p-14 overflow-hidden flex flex-col justify-between shadow-[0_30px_70px_rgba(0,0,0,0.5),_inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)', scale: 0.97 }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
              exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full my-auto"
            >
              {/* Text Content */}
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  {/* Independently Animated Icon */}
                  <motion.div
                    initial={{ scale: 0.8, rotate: -12 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.5, ease: 'backOut' }}
                    className="w-14 h-14 rounded-2xl flex items-center justify-center bg-white/5 border border-white/15 text-[var(--coral)] shadow-[0_0_25px_rgba(240,138,112,0.25)]"
                  >
                    {activeStory.icon}
                  </motion.div>

                  <span className="text-xs font-mono font-extrabold tracking-widest text-[var(--coral)] uppercase bg-[var(--coral)]/10 px-3 py-1.5 rounded-lg border border-[var(--coral)]/20">
                    {activeStory.stepLabel} — {activeStory.tag}
                  </span>
                </div>

                {/* Significantly Larger Title */}
                <h3 className="text-3xl lg:text-4xl font-extrabold text-[var(--text)] leading-tight tracking-tight">
                  {activeStory.title}
                </h3>

                {/* Larger Description */}
                <p className="text-lg lg:text-xl leading-[1.8] text-gray-300 font-normal">
                  {activeStory.desc}
                </p>
              </div>

              {/* Synchronized Visual Mockup */}
              <div className="flex items-center justify-center w-full">
                {activeStory.visual}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Progress Indicator at Bottom */}
          <div className="w-full mt-10 pt-6 border-t border-white/10 flex flex-col gap-3">
            <div className="flex items-center justify-between text-xs font-mono text-gray-400">
              <span>{activeStory.tag}</span>
              <span>{Math.round(progressPercent)}%</span>
            </div>
            
            <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden relative">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[var(--cyan)] via-teal-400 to-[var(--coral)] shadow-[0_0_12px_rgba(16,214,228,0.6)]"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
