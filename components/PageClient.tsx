'use client';

import {
  useState, useEffect, ReactNode,
  useRef
} from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import dynamic from 'next/dynamic';
import { LocaleProvider, useLocale } from '@/context/LocaleContext';
import { useTheme } from '@/components/ThemeProvider';

const InteractiveJourneySection = dynamic(() => import('@/components/InteractiveJourneySection'), { ssr: false });
const UnifiedBaseSection = dynamic(() => import('@/components/UnifiedBaseSection'), { ssr: false });
const CTABanner = dynamic(() => import('@/components/CTABanner'), { ssr: false });

function ClientLayout({ children }: { children: ReactNode }) {
  const { locale, dir } = useLocale();
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
    document.documentElement.style.fontFamily =
      locale === 'ar' ? 'var(--font-cairo), sans-serif' : 'var(--font-sora), sans-serif';
  }, [locale, dir]);
  return <>{children}</>;
}

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

const linksAr = [
  { label: 'المسار', href: '#path' },
  { label: 'الباقات', href: '#base' },
  { label: 'التجربة', href: '#experience' },
];
const linksEn = [
  { label: 'Path', href: '#path' },
  { label: 'Plans', href: '#base' },
  { label: 'Experience', href: '#experience' },
];

function Navbar() {
  const { setLocale, isArabic } = useLocale();
  const { theme, toggle } = useTheme();
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
          <button className="theme-pill" type="button" onClick={toggle} aria-label={isArabic ? 'تغيير المظهر' : 'Toggle theme'}>
            {theme === 'dark' ? <span className="sun-icon" /> : <span className="moon-icon" />}
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
  // البوكس يفضل فاضي أثناء طيران الصورة (progress = 0)، وتظهر أول صورة بالتدريج بعد الثبات
  const op1 = useTransform(progress, [0, 0.06, 0.2, 0.25], [0, 1, 1, 0]);
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

function ExperienceCard({ item, index, scrollYProgress }: { item: typeof expItemsEn[number]; index: number; scrollYProgress: MotionValue<number> }) {
  const start = index * 0.25;
  const end = (index + 1) * 0.25;
  const enter = Math.max(0, start - 0.035);
  const exit = Math.min(1, end + 0.035);
  const opacityInput = index === 0
    ? [0, end - 0.04, exit]
    : index === 3
      ? [enter, start + 0.04, 1]
      : [enter, start + 0.04, end - 0.04, exit];
  const opacityOutput = index === 0
    ? [1, 1, 0]
    : index === 3
      ? [0, 1, 1]
      : [0, 1, 1, 0];
  const yInput = index === 0
    ? [0, end, exit]
    : index === 3
      ? [enter, start + 0.04, 1]
      : [enter, start + 0.04, end - 0.04, exit];
  const yOutput = index === 0
    ? [0, 0, -26]
    : index === 3
      ? [28, 0, 0]
      : [28, 0, 0, -26];
  const opacity = useTransform(scrollYProgress, opacityInput, opacityOutput);
  const y = useTransform(scrollYProgress, yInput, yOutput);
  const scale = useTransform(scrollYProgress, [enter, start + 0.08, end - 0.08, exit], [0.96, 1, 1, 0.97]);
  const progressWidth = useTransform(scrollYProgress, [start, end], ['0%', '100%']);

  const isCoralAccent = index % 2 === 0;
  const accentColor = isCoralAccent ? 'var(--coral)' : 'var(--cyan)';
  const accentBg = isCoralAccent ? 'rgba(231, 136, 113,0.16)' : 'rgba(15, 165, 184,0.13)';
  const accentBorder = isCoralAccent ? 'rgba(231, 136, 113,0.34)' : 'rgba(15, 165, 184,0.28)';
  const cardGlow = isCoralAccent ? 'rgba(231, 136, 113,0.16)' : 'rgba(15, 165, 184,0.12)';

  return (
    <motion.div
      className="experience-card"
      style={{
        opacity,
        y,
        scale,
        borderColor: accentBorder,
        boxShadow: `0 26px 70px rgba(0,0,0,0.34), 0 0 48px ${cardGlow}`,
      }}
    >
      <div className="experience-card-top">
        <span className="experience-card-count">{String(index + 1).padStart(2, '0')}</span>
        <div
          className="experience-card-icon"
          style={{
            background: accentBg,
            color: accentColor,
            border: `1px solid ${accentBorder}`,
          }}
        >
          {item.icon}
        </div>
      </div>
      <h3>{item.title}</h3>
      <p>{item.desc}</p>
      <div className="experience-card-progress" aria-hidden="true">
        <motion.span style={{ width: progressWidth, background: accentColor }} />
      </div>
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
        <div
          style={{
            padding: '60px 32px',
            background: 'var(--panel)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              background:
                'radial-gradient(ellipse at 70% 20%, rgba(15, 165, 184,0.06), transparent 50%), radial-gradient(ellipse at 30% 80%, rgba(231, 136, 113,0.05), transparent 50%)',
            }}
          />

          <div className="exp-shell" style={{ position: 'relative', zIndex: 1 }}>
            <div className="exp-grid">
              <div
                className="exp-visual overflow-hidden relative p-4"
                style={{
                  width: '100%',
                  aspectRatio: '1.34',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 28,
                  background: 'linear-gradient(160deg, rgba(41,42,44,0.45), rgba(20,22,26,0.55))',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04), 0 20px 60px rgba(0,0,0,0.25)',
                }}
              >
                <div id="image-target" style={{ width: '100%', height: '100%' }}>
                  <ImageStack progress={scrollYProgress} isArabic={isArabic} />
                </div>
              </div>
              <div className="exp-list exp-card-stage">
                {items.map((item, i) => (
                  <ExperienceCard key={item.title} item={item} index={i} scrollYProgress={scrollYProgress} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function GlobalScrollImage() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgFrameRef = useRef<HTMLDivElement>(null);
  const colFrameRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  // ابدأ دايماً من الهيرو بعد الـ refresh (ألغِ استرجاع المتصفح لموضع السكرول)
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    let raf = 0;

    const apply = () => {
      raf = 0;
      const heroTarget = document.getElementById('hero-image-source');
      const expTarget = document.getElementById('image-target');
      const journeyTarget = document.getElementById('journey-center-target');
      const expSection = document.getElementById('experience');
      const journeySection = document.getElementById('journey-map');

      if (!heroTarget || !expTarget || !expSection || !journeyTarget || !journeySection) return;

      const scrollY = window.scrollY;
      const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

      // Phase 1: Hero -> Experience
      const finishScroll1 = Math.max(1, expSection.offsetTop);
      const p1 = Math.min(1, Math.max(0, scrollY / finishScroll1));

      // Phase 3: Experience -> Journey
      const scrollStart2 = expSection.offsetTop + expSection.offsetHeight - window.innerHeight;
      const scrollEnd2 = journeySection.offsetTop;
      const diff2 = Math.max(1, scrollEnd2 - scrollStart2);
      const p2 = Math.min(1, Math.max(0, (scrollY - scrollStart2) / diff2));

      const rHero = heroTarget.getBoundingClientRect();
      const rExp = expTarget.getBoundingClientRect();
      const rJourney = journeyTarget.getBoundingClientRect();

      if (scrollY < finishScroll1) {
        // Phase 1 active
        wrap.style.top = `${lerp(rHero.top, rExp.top, p1)}px`;
        wrap.style.left = `${lerp(rHero.left, rExp.left, p1)}px`;
        wrap.style.width = `${lerp(rHero.width, rExp.width, p1)}px`;
        wrap.style.height = `${lerp(rHero.height, rExp.height, p1)}px`;

        // Fade out slightly before reaching 1 to crossfade with the actual element
        wrap.style.opacity = p1 >= 1 ? '0' : String(Math.min(1, (1 - p1) / 0.06));

        if (imgFrameRef.current) {
          imgFrameRef.current.style.filter = 'none';
          imgFrameRef.current.style.opacity = '1';
        }
        if (colFrameRef.current) {
          colFrameRef.current.style.opacity = '0';
        }
      } 
      else if (scrollY >= scrollStart2 && p2 < 1) {
        // Phase 3 active: Experience to Journey Center Column
        wrap.style.top = `${lerp(rExp.top, rJourney.top, p2)}px`;
        wrap.style.left = `${lerp(rExp.left, rJourney.left, p2)}px`;
        wrap.style.width = `${lerp(rExp.width, rJourney.width, p2)}px`;
        wrap.style.height = `${lerp(rExp.height, rJourney.height, p2)}px`;

        wrap.style.opacity = '1';

        if (imgFrameRef.current) {
          imgFrameRef.current.style.filter = 'hue-rotate(180deg) invert(1)';
          // Fade out X image as it morphs to column
          imgFrameRef.current.style.opacity = String(Math.max(0, 1 - p2 * 1.5));
        }
        if (colFrameRef.current) {
          // Fade in the column styles
          colFrameRef.current.style.opacity = String(p2);
        }
      } 
      else {
        // Phase 2 (Inside Experience Section) or fully inside Journey Section (p2 >= 1)
        wrap.style.opacity = '0';
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };

    setReady(true);
    apply();
    const t = setTimeout(apply, 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      clearTimeout(t);
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <motion.div
      ref={wrapRef}
      initial={{ opacity: 0, scale: 0.9, y: 60 }}
      animate={ready ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 0,
        height: 0,
        zIndex: 50,
        pointerEvents: 'none',
        willChange: 'top, left, width, height, opacity',
      }}
    >
      <div 
        ref={colFrameRef}
        style={{
          position: 'absolute', inset: 0, opacity: 0,
          border: '1px solid rgba(255, 255, 255, 0.24)',
          borderRadius: '28px',
          background: 'linear-gradient(180deg, rgba(88, 89, 97, 0.82), rgba(58, 57, 63, 0.82))',
          boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.28), inset 0 -1px 0 rgba(0, 0, 0, 0.18), 0 22px 56px rgba(0, 0, 0, 0.34), 0 0 46px rgba(15, 165, 184, 0.08)'
        }}
      />
      <div ref={imgFrameRef} className="x-image-frame" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', aspectRatio: 'auto' }}>
        <img src="/generated-image-7e678040-c54d-4cfc-9407-a606acdc5521.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
    </motion.div>
  );
}

function SnapIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2c2.7 0 4.6 2 4.7 4.7 0 .6-.03 1.2-.06 1.7.24.13.53.2.83.14.5-.1.9.2.98.6.07.4-.16.8-.62.94-.2.06-.5.13-.78.24-.4.16-.6.4-.5.86.35 1.7 1.6 2.9 2.9 3.2.3.07.5.32.5.63 0 .5-.7.86-1.9 1.06-.1.02-.2.2-.24.42-.03.16-.07.34-.16.5-.1.16-.28.22-.5.2-.3-.03-.66-.1-1.1-.1-.4 0-.8.08-1.2.36-.7.5-1.4 1.1-2.9 1.1s-2.2-.6-2.9-1.1c-.4-.28-.8-.36-1.2-.36-.44 0-.8.07-1.1.1-.22.02-.4-.04-.5-.2-.1-.16-.13-.34-.16-.5-.04-.22-.14-.4-.24-.42-1.2-.2-1.9-.56-1.9-1.06 0-.3.2-.56.5-.63 1.3-.3 2.55-1.5 2.9-3.2.1-.46-.1-.7-.5-.86-.28-.11-.58-.18-.78-.24-.46-.14-.7-.54-.62-.94.08-.4.48-.7.98-.6.3.06.6 0 .83-.14-.03-.5-.06-1.1-.06-1.7C7.4 4 9.3 2 12 2Z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 1.8a8.2 8.2 0 0 1 6.9 12.6l-.3.4.8 2.9-3-.8-.4.2A8.2 8.2 0 1 1 12 3.8Zm-3 4.2c-.2 0-.5.06-.7.3-.24.26-.9.9-.9 2.16 0 1.27.92 2.5 1.05 2.67.13.17 1.8 2.86 4.5 3.9 2.24.86 2.7.7 3.2.65.5-.05 1.6-.65 1.83-1.3.22-.63.22-1.17.16-1.28-.07-.11-.24-.17-.5-.3-.26-.13-1.55-.77-1.79-.85-.24-.09-.42-.13-.6.13-.17.26-.68.85-.83 1.02-.15.17-.3.2-.56.07-.26-.13-1.1-.4-2.1-1.3-.78-.7-1.3-1.55-1.46-1.8-.15-.27-.02-.4.11-.54.12-.12.26-.3.4-.46.13-.16.17-.26.26-.44.09-.17.04-.33-.02-.46-.06-.13-.6-1.42-.8-1.95-.22-.5-.44-.44-.6-.44Z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M14 8.5V6.8c0-.7.2-1.1 1.2-1.1H16.5V3.1C16.2 3.05 15.3 3 14.3 3c-2.1 0-3.5 1.3-3.5 3.6v1.9H8.5V11h2.3v8h2.9v-8h2.2l.4-2.5H14Z" />
    </svg>
  );
}

function CheckBadgeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12.5 10 17l9-10" />
    </svg>
  );
}

function FooterSection() {
  const { isArabic } = useLocale();

  const linkColumns = isArabic
    ? [
        { title: 'المنصة', links: ['المسار', 'الباقات', 'التجربة', 'الداشبورد'] },
        { title: 'الشركة', links: ['من نحن', 'المدونة', 'وظائف', 'اتصل بنا'] },
        { title: 'قانوني', links: ['الخصوصية', 'شروط الخدمة', 'الأمان', 'حالة النظام'] },
      ]
    : [
        { title: 'Platform', links: ['Roadmap', 'Plans', 'Experience', 'Dashboard'] },
        { title: 'Company', links: ['About us', 'Blog', 'Careers', 'Contact'] },
        { title: 'Legal', links: ['Privacy', 'Terms', 'Security', 'System status'] },
      ];

  const socials = [
    { key: 'snap', label: isArabic ? 'سناب' : 'Snapchat', Icon: SnapIcon },
    { key: 'whatsapp', label: isArabic ? 'واتساب' : 'WhatsApp', Icon: WhatsAppIcon },
    { key: 'facebook', label: isArabic ? 'فيسبوك' : 'Facebook', Icon: FacebookIcon },
  ];

  const scrollTop = () => {
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer">
      <div className="footer-bg" aria-hidden="true" />
      <div className="footer-shell">
        <div className="footer-main">
          {/* Brand column */}
          <div className="footer-brand">
            <a href="#" className="x10-logo" aria-label="X10">
              <span className="logo-x">X</span>
              <span className="logo-ten"><span /><span /><span /></span>
            </a>
            <p className="footer-brand-copy">
              {isArabic
                ? 'من نقطة البيع للمخزون والفروع، كل حاجة متجمعة في مكان واحد يساعدك تكبر بثقة.'
                : 'From POS to inventory and branches, everything in one place so you can scale with confidence.'}
            </p>
            <div className="footer-follow">
              <span className="footer-follow-label">{isArabic ? 'تابع X10' : 'Follow X10'}</span>
              <div className="footer-socials">
                {socials.map(({ key, label, Icon }) => (
                  <a key={key} href="#" className={`footer-social footer-social-${key}`} aria-label={label} title={label}>
                    <Icon />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Hero-style divider rail */}
          <div className="footer-rail" aria-hidden="true"><span /></div>

          {/* Link columns */}
          <nav className="footer-links" aria-label={isArabic ? 'روابط الفوتر' : 'Footer links'}>
            {linkColumns.map((col) => (
              <div key={col.title} className="footer-link-col">
                <h5>{col.title}</h5>
                <ul>
                  {col.links.map((link) => (
                    <li key={link}><a href="#">{link}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Trust badges */}
        <div className="footer-badges">
          <div className="footer-badge">
            <span className="footer-badge-emblem footer-badge-vision">2030</span>
            <span className="footer-badge-text">
              <strong>{isArabic ? 'رؤية السعودية' : 'Saudi Vision'}</strong>
              <small>Saudi Vision 2030</small>
            </span>
          </div>
          <div className="footer-badge">
            <span className="footer-badge-emblem footer-badge-check"><CheckBadgeIcon /></span>
            <span className="footer-badge-text">
              <strong>{isArabic ? 'الرقابة العامة' : 'Public Oversight'}</strong>
              <small>Saudi Authority</small>
            </span>
          </div>
        </div>

        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} X10 POS. {isArabic ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}</span>
          <div className="footer-bottom-links">
            <a href="#">{isArabic ? 'الخصوصية' : 'Privacy'}</a>
            <a href="#">{isArabic ? 'الشروط' : 'Terms'}</a>
          </div>
          <button type="button" className="footer-top-btn" onClick={scrollTop}>
            {isArabic ? 'للأعلى ↑' : 'Back to top ↑'}
          </button>
        </div>
      </div>
    </footer>
  );
}

export default function PageClient() {
  return (
    <LocaleProvider>
      <ClientLayout>
        <Navbar />
        <main style={{ position: 'relative' }}>
          <GlobalScrollImage />
          <HeroSection />
          <ExperienceSection />
          <InteractiveJourneySection />
          <UnifiedBaseSection />
          <CTABanner />
        </main>
        <FooterSection />
      </ClientLayout>
    </LocaleProvider>
  );
}