'use client';

import {
  createContext, useContext, useState, useEffect, ReactNode,
  useRef, useCallback
} from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import NeonJourney3D from '@/components/NeonJourney3D';
import UnifiedBaseSection from '@/components/UnifiedBaseSection';
import BilingualSection from '@/components/BilingualSection';
import CTABanner from '@/components/CTABanner';

// ─────────────────────────── Locale Context ───────────────────────────
type Locale = 'ar' | 'en';
interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  dir: 'rtl' | 'ltr';
  isArabic: boolean;
}
const LocaleContext = createContext<LocaleContextType>({
  locale: 'ar', setLocale: () => {}, dir: 'rtl', isArabic: true,
});

function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('ar');
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); const s = localStorage.getItem('locale') as Locale | null; if (s) setLocale(s); }, []);
  useEffect(() => { if (mounted) localStorage.setItem('locale', locale); }, [locale, mounted]);
  const dir = locale === 'ar' ? 'rtl' : 'ltr';
  const isArabic = locale === 'ar';
  return <LocaleContext.Provider value={{ locale, setLocale, dir, isArabic }}>{children}</LocaleContext.Provider>;
}
const useLocale = () => useContext(LocaleContext);

// ─────────────────────────── ClientLayout ───────────────────────────
function ClientLayout({ children }: { children: ReactNode }) {
  const { locale, dir } = useLocale();
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
    document.documentElement.style.fontFamily =
      locale === 'ar' ? 'var(--font-cairo), sans-serif' : 'var(--font-inter), sans-serif';
  }, [locale, dir]);
  return <>{children}</>;
}

// ─────────────────────────── Reveal Animation ───────────────────────────
function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { el.style.transitionDelay = `${delay}ms`; el.classList.add('revealed'); }
        else { el.style.transitionDelay = '0ms'; el.classList.remove('revealed'); }
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return <div ref={ref} className={`reveal-on-scroll ${className}`}>{children}</div>;
}

// ─────────────────────────── Navbar ───────────────────────────
const linksAr = [
  { label: 'المسار', href: '#path' },
  { label: 'الأساس', href: '#base' },
  { label: 'التجربة', href: '#experience' },
];
const linksEn = [
  { label: 'Path', href: '#path' },
  { label: 'Base', href: '#base' },
  { label: 'Experience', href: '#experience' },
];

function Navbar() {
  const { setLocale, isArabic } = useLocale();
  const links = isArabic ? linksAr : linksEn;
  return (
    <header className="site-header">
      <nav className="topbar" aria-label="Main navigation">
        <a href="#" className="x10-logo" aria-label="X10">
          <span className="logo-x">X</span>
          <span className="logo-ten"><span /><span /><span /></span>
        </a>
        <div className="nav-links">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="nav-link">{link.label}</a>
          ))}
        </div>
        <div className="nav-actions">
          <button className="start-pill" type="button">{isArabic ? 'ابدأ الآن' : 'Start now'}</button>
          <button className="theme-pill" type="button" aria-label={isArabic ? 'تغيير المظهر' : 'Toggle theme'}>
            <span className="sun-icon" />
          </button>
          <button className="language-pill" type="button" onClick={() => setLocale(isArabic ? 'en' : 'ar')}>
            {isArabic ? 'English' : 'العربية'}
          </button>
        </div>
      </nav>
    </header>
  );
}

function HeroSection() {
  const { isArabic } = useLocale();
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
  const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.4], [0, -60]);

  return (
    <section ref={containerRef} className="hero-stage" aria-labelledby="hero-title">
      <div className="bg-lines" />
      <div className="dot-field dot-field-left" />
      <div className="dot-field dot-field-right" />
      <div className="hero-shell">
        <div id="hero-image-source" className="hero-art" aria-hidden="true" style={{ visibility: 'hidden' }}>
          <div className="x-image-frame"></div>
        </div>
        <div className="divider-rail" aria-hidden="true"><span /></div>
        <motion.div
          className="copy-frame"
          style={{ opacity: contentOpacity, y: contentY }}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="copy-panel">
            <span className="corner-fold" aria-hidden="true" />
            <h1 id="hero-title">
              {isArabic ? (<>من أول تسجيل إلى<br />تشغيل يومي بثقة</>) : (<>From first signup to<br />trusted daily operation</>)}
            </h1>
            <p>{isArabic
              ? 'X10 يبدأ الآن من تجربة عامة واضحة، ثم يقود المستخدم إلى تسجيل الهاتف وإنشاء النشاط داخل الداشبورد، دون وعود تشغيلية غير منفذة.'
              : 'X10 now starts with a clear public experience, then guides users to phone registration and activity setup inside the dashboard.'}</p>
            <div className="hero-actions">
              <a href="#dashboard" className="hero-btn primary">{isArabic ? 'ابدأ من الداشبورد' : 'Start in dashboard'}</a>
              <a href="#path" className="hero-btn secondary">{isArabic ? 'اكتشف المسار' : 'Explore path'}</a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────── Journey Map Section ───────────────────────────
const mapStepsAr = [
  { 
    title: 'دخول الموقع العام', 
    color: 'coral',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
  },
  { 
    title: 'الانتقال للوحة التحكم', 
    color: 'cyan',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></svg>
  },
  { 
    title: 'التحقق عبر الهاتف (OTP)', 
    color: 'coral',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
  },
  { 
    title: 'اختيار النشاط النشط', 
    color: 'cyan',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></svg>
  },
];

const mapStepsEn = [
  { title: 'Enter Public Site', color: 'coral', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg> },
  { title: 'Go to Dashboard', color: 'cyan', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></svg> },
  { title: 'Phone Verification (OTP)', color: 'coral', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg> },
  { title: 'Select Active Business', color: 'cyan', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></svg> },
];

function JourneyMapSection() {
  const { isArabic, dir } = useLocale();
  const steps = isArabic ? mapStepsAr : mapStepsEn;
  const colorClasses = {
    coral: 'bg-[var(--coral)]/10 text-[var(--coral)]',
    cyan: 'bg-[var(--cyan)]/10 text-[var(--cyan)]'
  };

  return (
    <section id="journey-map" className="exp-stage" dir={dir}>
      <div className="exp-shell">
        <div className="exp-grid items-center">
          {/* Right Column visually in RTL (Info & Steps) */}
          <div className="flex flex-col gap-8 md:pe-8">
            <Reveal>
              <div className="exp-head !max-w-full !mb-0 text-start">
                <span className="exp-label">{isArabic ? 'رحلة المستخدم' : 'User Journey'}</span>
                <h2 className="!text-3xl md:!text-5xl">
                  {isArabic ? (
                    <>رحلة قصيرة من<br /><span className="text-transparent bg-clip-text bg-gradient-to-l from-[var(--coral)] to-[#E84545]">الصفحة العامة</span><br />إلى مساحة العمل</>
                  ) : (
                    <>A short journey from<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--coral)] to-[#E84545]">the public page</span><br />to the workspace</>
                  )}
                </h2>
                <p className="!max-w-xl">
                  {isArabic 
                    ? 'هذه النسخة تربط التسويق بالتسجيل الحقيقي الموجود الآن — اضغط على أي خطوة لمعرفة المزيد.' 
                    : 'This version connects marketing to the real registration that exists now — click any step to learn more.'}
                </p>
              </div>
            </Reveal>

            <div className="flex flex-col gap-3">
              {steps.map((step, i) => (
                <Reveal key={i} delay={i * 100}>
                  <button className="flex items-center justify-between w-full px-6 py-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/[0.1] transition-all group">
                    <span className="text-[15px] font-bold text-gray-300 group-hover:text-white transition-colors text-start">{step.title}</span>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform ${colorClasses[step.color as 'coral' | 'cyan']}`}>
                      {step.icon}
                    </div>
                  </button>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Left Column visually in RTL (3D Canvas) */}
          <div className="w-full relative h-[400px] md:h-[500px] mb-8 md:mb-0">
            <NeonJourney3D />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────── Experience Section ───────────────────────────
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
          <span className="text-[9px] font-mono font-bold text-gray-500 tracking-wider ml-2">{isArabic ? 'لوحة التحكم' : 'x10_dashboard'}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[8px] text-gray-600 font-mono font-bold">10:24 AM</span>
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[var(--coral)] to-orange-500 flex items-center justify-center text-[7px] font-black text-[#241c19]">X</div>
        </div>
      </div>
      <div className="flex flex-1 min-h-0" style={{ direction: 'ltr' }}>
        <div className="w-12 lg:w-14 flex-shrink-0 border-r border-white/[0.06] bg-white/[0.015] flex flex-col items-center gap-3 py-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className={`w-7 h-7 rounded-lg flex items-center justify-content-center transition-colors ${i === 0 ? 'bg-[var(--coral)]/20 text-[var(--coral)]' : 'text-gray-600 hover:text-gray-400 hover:bg-white/5'}`}>
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
              <span className={`text-sm lg:text-base font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>{stat.value}</span>
            </div>
          ))}
          <div className="col-span-2 rounded-xl bg-white/[0.03] border border-white/[0.06] p-3 lg:p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-bold text-gray-400 font-mono uppercase tracking-wider">{isArabic ? 'نشاط الفروع' : 'Branch Activity'}</span>
              <span className="text-[8px] text-emerald-400 font-bold flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />Live</span>
            </div>
            <div className="flex items-end gap-1.5 h-12">
              {[40, 65, 35, 80, 55, 90, 70, 45, 85, 60, 75, 50].map((h, i) => (
                <div key={i} className="flex-1 rounded-t-sm bg-gradient-to-t from-[var(--coral)]/60 to-[var(--coral)]/30" style={{ height: `${h}%` }} />
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

const expItemsAr = [
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}><path d="M3 21V7l9-4 9 4v14" /><path d="M9 21v-6h6v6" /></svg>, title: 'شبكة الفروع في خريطة حية', desc: 'كل فرع عقدة متصلة بالمركز. تابع الحالة والمبيعات والمستخدمين النشطين لحظياً.' },
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M3 15h18M9 3v18M15 3v18" /></svg>, title: 'لوحة تحكم موحّدة', desc: 'كل الفروع من شاشة واحدة. تقارير مجمّعة، تنبيهات فورية، وتحكم كامل.' },
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>, title: 'أمان وعزل تلقائي', desc: 'بدون إعدادات إضافية. كل مستأجر معزول، وكل صلاحية مضبوطة من أول يوم.' },
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>, title: 'تحليلات ذكية ومستمرة', desc: 'راقب أداء نشاطك بشكل لحظي عبر رسومات بيانية وتقارير دقيقة.' },
];
const expItemsEn = [
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}><path d="M3 21V7l9-4 9 4v14" /><path d="M9 21v-6h6v6" /></svg>, title: 'Branch Network Live Map', desc: 'Each branch is a connected node. Track status, sales, and active users in real time.' },
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M3 15h18M9 3v18M15 3v18" /></svg>, title: 'Unified Dashboard', desc: 'All branches from one screen. Aggregated reports, instant alerts, full control.' },
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>, title: 'Automatic Security & Isolation', desc: 'No extra setup. Each tenant is isolated, every permission configured from day one.' },
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>, title: 'Smart Continuous Analytics', desc: 'Monitor your business performance in real time with precise charts and reports.' },
];

function ImageStack({ progress, isArabic }: { progress: MotionValue<number>; isArabic: boolean }) {
  const op1 = useTransform(progress, [0, 0.2, 0.25], [1, 1, 0]);
  const op2 = useTransform(progress, [0.2, 0.25, 0.45, 0.5], [0, 1, 1, 0]);
  const op3 = useTransform(progress, [0.45, 0.5, 0.7, 0.75], [0, 1, 1, 0]);
  const op4 = useTransform(progress, [0.7, 0.75, 1], [0, 1, 1]);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <motion.div className="x-image-frame" style={{ opacity: op1, position: 'absolute', inset: 0, width: '100%', height: '100%', aspectRatio: 'auto' }}>
        <img src="/generated-image-7e678040-c54d-4cfc-9407-a606acdc5521.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </motion.div>
      <motion.div style={{ opacity: op2, position: 'absolute', inset: 0 }}>
        <DashboardPreview isArabic={isArabic} />
      </motion.div>
      <motion.div className="x-image-frame" style={{ opacity: op3, position: 'absolute', inset: 0, width: '100%', height: '100%', aspectRatio: 'auto' }}>
        <img src="/generated-image-7e678040-c54d-4cfc-9407-a606acdc5521.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'hue-rotate(90deg)' }} />
      </motion.div>
      <motion.div className="x-image-frame" style={{ opacity: op4, position: 'absolute', inset: 0, width: '100%', height: '100%', aspectRatio: 'auto' }}>
        <img src="/generated-image-7e678040-c54d-4cfc-9407-a606acdc5521.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'hue-rotate(180deg) invert(1)' }} />
      </motion.div>
    </div>
  );
}

function ExpItem({ item, index, scrollYProgress }: { item: typeof expItemsEn[number]; index: number; scrollYProgress: MotionValue<number> }) {
  const start = index * 0.25;
  const end = (index + 1) * 0.25;
  const opacity = useTransform(scrollYProgress, [Math.max(0, start - 0.1), start, end, Math.min(1, end + 0.1)], [0.3, 1, 1, 0.3]);

  return (
    <motion.div className="exp-item" style={{ opacity }}>
      <div className="exp-item-header">
        <div className="exp-item-icon">{item.icon}</div>
        <h4>{item.title}</h4>
      </div>
      <p>{item.desc}</p>
    </motion.div>
  );
}

function ExperienceSection() {
  const { isArabic, dir } = useLocale();
  const items = isArabic ? expItemsAr : expItemsEn;
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  return (
    <section id="experience" ref={sectionRef} dir={dir} style={{ height: '400vh', position: 'relative' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden' }}>
        <div className="exp-stage" style={{ padding: '60px 32px' }}>
          <div className="exp-shell">
            <Reveal>
              <div className="exp-head">
                <span className="exp-label">{isArabic ? 'التجربة' : 'Experience'}</span>
                <h2>{isArabic ? 'جرب الفرق بنفسك' : 'Experience the difference yourself'}</h2>
                <p>{isArabic ? 'واجهة نظيفة، تنقل سلس، وكل شيء شغال من أول لحظة.' : 'Clean interface, smooth navigation, everything working from the first moment.'}</p>
              </div>
            </Reveal>
            <div className="exp-grid">
              <div className="exp-visual overflow-hidden relative p-4" style={{ width: '100%', aspectRatio: '1.34' }}>
                <div id="image-target" style={{ width: '100%', height: '100%' }}>
                  <ImageStack progress={scrollYProgress} isArabic={isArabic} />
                </div>
              </div>
              <div className="exp-list">
                {items.map((item, i) => (
                  <ExpItem key={item.title} item={item} index={i} scrollYProgress={scrollYProgress} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────── Footer ───────────────────────────
const footerLinksAr = [
  { title: 'المنتج', items: [{ label: 'المسار', href: '#path' }, { label: 'الأساس', href: '#base' }, { label: 'التجربة', href: '#experience' }, { label: 'الأسعار', href: '#' }] },
  { title: 'الشركة', items: [{ label: 'من نحن', href: '#' }, { label: 'المدونة', href: '#' }, { label: 'وظائف', href: '#' }, { label: 'اتصل بنا', href: '#' }] },
  { title: 'قانوني', items: [{ label: 'سياسة الخصوصية', href: '#' }, { label: 'شروط الخدمة', href: '#' }, { label: 'الأمان', href: '#' }] },
];
const footerLinksEn = [
  { title: 'Product', items: [{ label: 'Path', href: '#path' }, { label: 'Base', href: '#base' }, { label: 'Experience', href: '#experience' }, { label: 'Pricing', href: '#' }] },
  { title: 'Company', items: [{ label: 'About', href: '#' }, { label: 'Blog', href: '#' }, { label: 'Jobs', href: '#' }, { label: 'Contact', href: '#' }] },
  { title: 'Legal', items: [{ label: 'Privacy Policy', href: '#' }, { label: 'Terms of Service', href: '#' }, { label: 'Security', href: '#' }] },
];

function FooterSection() {
  const { isArabic, dir } = useLocale();
  const cols = isArabic ? footerLinksAr : footerLinksEn;
  return (
    <footer className="site-footer" dir={dir}>
      <div className="footer-shell">
        <Reveal>
          <div className="footer-grid">
            <div className="footer-brand">
              <a href="#" className="x10-logo" aria-label="X10" style={{ justifySelf: 'start' }}>
                <span className="logo-x">X</span>
                <span className="logo-ten"><span /><span /><span /></span>
              </a>
              <p>{isArabic ? 'منصة إدارة فروع متعددة المستأجرين، بتجربة عربية أصيلة وأمان حقيقي.' : 'A multi-tenant branch management platform with an authentic Arabic experience and real security.'}</p>
            </div>
            {cols.map((col) => (
              <div key={col.title} className="footer-col">
                <h5>{col.title}</h5>
                {col.items.map((item) => <a key={item.label} href={item.href}>{item.label}</a>)}
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={100}>
          <div className="footer-bottom">
            <span>© 2026 X10. {isArabic ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}</span>
            <div className="footer-bottom-links">
              <a href="#">{isArabic ? 'مصنوع في الرياض' : 'Made in Riyadh'}</a>
            </div>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}

// ─────────────────────────── Global Scroll Image ───────────────────────────
function GlobalScrollImage() {
  const { scrollY } = useScroll();
  const [layout, setLayout] = useState({
    start: { top: 0, left: 0, width: 0, height: 0 },
    end: { top: 0, left: 0, width: 0, height: 0 },
    finishScroll: 1000,
    ready: false
  });

  useEffect(() => {
    const update = () => {
      const startEl = document.getElementById('hero-image-source');
      const endEl = document.getElementById('image-target');
      const sectionEl = document.getElementById('experience');
      if (startEl && endEl && sectionEl) {
        const startR = startEl.getBoundingClientRect();
        const endR = endEl.getBoundingClientRect();
        const sectionR = sectionEl.getBoundingClientRect();
        const sY = window.scrollY;
        const sX = window.scrollX;
        
        setLayout({
          start: {
            top: startR.top + sY,
            left: startR.left + sX,
            width: startR.width,
            height: startR.height
          },
          end: {
            top: endR.top + sY,
            left: endR.left + sX,
            width: endR.width,
            height: endR.height
          },
          finishScroll: Math.max(0, sectionR.top + sY),
          ready: true
        });
      }
    };
    
    update();
    const timeout = setTimeout(update, 500);
    window.addEventListener('resize', update);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('resize', update);
    };
  }, []);

  const top = useTransform(scrollY, [0, layout.finishScroll], [layout.start.top, layout.end.top]);
  const left = useTransform(scrollY, [0, layout.finishScroll], [layout.start.left, layout.end.left]);
  const width = useTransform(scrollY, [0, layout.finishScroll], [layout.start.width, layout.end.width]);
  const height = useTransform(scrollY, [0, layout.finishScroll], [layout.start.height, layout.end.height]);
  
  // Fade out instantly when the section becomes sticky, to hand off to the local ImageStack
  const opacity = useTransform(scrollY, [Math.max(0, layout.finishScroll - 2), layout.finishScroll], [1, 0]);

  if (!layout.ready) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 60 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'absolute',
        top,
        left,
        width,
        height,
        zIndex: 50,
        pointerEvents: 'none',
      }}
    >
      <motion.div className="x-image-frame" style={{ width: '100%', height: '100%', opacity, aspectRatio: 'auto' }}>
        <img src="/generated-image-7e678040-c54d-4cfc-9407-a606acdc5521.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </motion.div>
    </motion.div>
  );
}

// ─────────────────────────── Home Page ───────────────────────────
export default function HomePage() {
  return (
    <LocaleProvider>
      <ClientLayout>
        <Navbar />
        <main style={{ position: 'relative' }}>
          <GlobalScrollImage />
          <HeroSection />
          <ExperienceSection />
          <JourneyMapSection />
          <UnifiedBaseSection />
          <BilingualSection />
          <CTABanner />
        </main>
        <FooterSection />
      </ClientLayout>
    </LocaleProvider>
  );
}
