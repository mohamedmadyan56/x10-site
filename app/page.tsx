'use client';

import {
  createContext, useContext, useState, useEffect, ReactNode,
  useRef, useCallback
} from 'react';
import { motion } from 'framer-motion';
import NeonJourney3D from '@/components/NeonJourney3D';
import HeroSection from '@/components/HeroSection';
import Navbar from '@/components/Navbar';
import UnifiedBaseSection from '@/components/UnifiedBaseSection';
import BilingualSection from '@/components/BilingualSection';
import CTABanner from '@/components/CTABanner';
import InteractiveJourneySection from '@/components/InteractiveJourneySection';
import ExperienceSection from '@/components/ExperienceSection';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// ─────────────────────────── Locale Context ───────────────────────────
type Locale = 'ar' | 'en';
interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  dir: 'rtl' | 'ltr';
  isArabic: boolean;
}
const LocaleContext = createContext<LocaleContextType>({
  locale: 'ar', setLocale: () => { }, dir: 'rtl', isArabic: true,
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

function useMagneticButtons() {
  useEffect(() => {
    const selector = '.btn, .hero-btn, .start-pill, .btn-primary, .btn-secondary, .btn-ghost';
    const buttons = document.querySelectorAll<HTMLElement>(selector);

    const handlers: { btn: HTMLElement; move: (e: MouseEvent) => void; leave: () => void; down: () => void }[] = [];

    buttons.forEach((btn) => {
      const move = (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) * 0.22;
        const y = (e.clientY - rect.top - rect.height / 2) * 0.22;
        btn.style.transform = `translate3d(${x}px, ${y - 3}px, 0) scale(1.04)`;
      };

      const leave = () => {
        btn.style.transform = '';
      };

      const down = () => {
        btn.style.transform = `translate3d(0px, 0px, 0) scale(0.95)`;
      };

      btn.addEventListener('mousemove', move);
      btn.addEventListener('mouseleave', leave);
      btn.addEventListener('mousedown', down);

      handlers.push({ btn, move, leave, down });
    });

    return () => {
      handlers.forEach(({ btn, move, leave, down }) => {
        btn.removeEventListener('mousemove', move);
        btn.removeEventListener('mouseleave', leave);
        btn.removeEventListener('mousedown', down);
      });
    };
  }, []);
}

// ─────────────────────────── ClientLayout ───────────────────────────
function ClientLayout({ children }: { children: ReactNode }) {
  const { locale, dir } = useLocale();
  useMagneticButtons();

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
  const wrapperRef = useRef<HTMLDivElement>(null);
  const floatInnerRef = useRef<HTMLDivElement>(null);
  const imgFrameRef = useRef<HTMLDivElement>(null);

  const [layout, setLayout] = useState({
    start: { top: 0, left: 0, width: 0, height: 0 },
    end: { top: 0, left: 0, width: 0, height: 0 },
    finishScroll: 1000,
    ready: false
  });

  useEffect(() => {
    const updateLayout = () => {
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

    updateLayout();
    const timeout = setTimeout(updateLayout, 400);
    window.addEventListener('resize', updateLayout);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('resize', updateLayout);
    };
  }, []);

  useEffect(() => {
    if (!layout.ready || !wrapperRef.current || !floatInnerRef.current || !imgFrameRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Idle state: Floating animation + slight rotation + smooth infinite movement
      gsap.to(floatInnerRef.current, {
        y: -14,
        rotation: 2.5,
        duration: 4.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // 2. Scroll behavior using GSAP ScrollTrigger:
      // Travel toward target placeholder, scaling, rotating, and settling cleanly into destination with a small bounce
      const endTop = layout.end.top - layout.start.top;
      const endLeft = layout.end.left - layout.start.left;
      const endWidth = layout.end.width;
      const endHeight = layout.end.height;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.hero-stage',
          start: 'top top',
          endTrigger: '#image-target',
          end: 'top 35%',
          scrub: 1.2,
          onLeave: () => {
            // Settle and fade out flying wrapper so the static X inside ExperienceSection takes over seamlessly
            gsap.to(imgFrameRef.current, {
              scale: 1,
              rotation: 0,
              duration: 0.35,
              ease: 'back.out(2)',
            });
            gsap.to(wrapperRef.current, {
              opacity: 0,
              duration: 0.2,
            });
          },
          onEnterBack: () => {
            // Restore visibility of flying X when scrolling back up
            gsap.to(wrapperRef.current, {
              opacity: 1,
              duration: 0.2,
            });
            gsap.to(imgFrameRef.current, {
              scale: 0.75,
              rotation: -14,
              opacity: 0.76,
              duration: 0.25,
            });
          },
        },
      });

      tl.to(wrapperRef.current, {
        y: endTop,
        x: endLeft,
        width: endWidth,
        height: endHeight,
        ease: 'power1.out',
      }, 0)
        .to(imgFrameRef.current, {
          scale: 0.75,       // Scale down gradually during travel
          rotation: -14,     // Natural scroll rotation
          opacity: 0.78,      // Slightly reduced opacity during flight
          ease: 'power2.out',
        }, 0);
    });

    return () => ctx.revert();
  }, [layout]);

  if (!layout.ready) return null;

  return (
    <div
      ref={wrapperRef}
      style={{
        position: 'absolute',
        top: layout.start.top,
        left: layout.start.left,
        width: layout.start.width,
        height: layout.start.height,
        zIndex: 50,
        pointerEvents: 'none',
      }}
    >
      <div ref={floatInnerRef} style={{ width: '100%', height: '100%' }}>
        <div
          ref={imgFrameRef}
          className="x-image-frame"
          style={{ width: '100%', height: '100%', aspectRatio: 'auto' }}
        >
          <img
            src="/generated-image-7e678040-c54d-4cfc-9407-a606acdc5521.png"
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      </div>
    </div>
  );
}

function AmbientBackground() {
  return (
    <div className="ambient-bg-container" aria-hidden="true">
      <div className="ambient-blob ambient-blob-1" />
      <div className="ambient-blob ambient-blob-2" />
      <div className="ambient-blob ambient-blob-3" />
    </div>
  );
}

// ─────────────────────────── Home Page ───────────────────────────
export default function HomePage() {
  return (
    <LocaleProvider>
      <ClientLayout>
        <AmbientBackground />
        <Navbar />
        <main style={{ position: 'relative' }}>
          <GlobalScrollImage />
          <HeroSection />
          <ExperienceSection />
          <InteractiveJourneySection />
          <UnifiedBaseSection />
          <BilingualSection />
          <CTABanner />
        </main>
        <FooterSection />
      </ClientLayout>
    </LocaleProvider>
  );
}
