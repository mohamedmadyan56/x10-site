'use client';

import { useEffect, useRef, useState } from 'react';
import { useLocale } from '@/context/LocaleContext';
import { motion, AnimatePresence } from 'framer-motion';
import Reveal from '@/components/animations/Reveal';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ExperienceSection() {
  const { isArabic, dir } = useLocale();
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const sweepRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [isLanded, setIsLanded] = useState(false);

  const stRef = useRef<any>(null);
  const activeStepRef = useRef(0);
  activeStepRef.current = activeStep;
  const isTransitioningRef = useRef(false);

  // Main ScrollTrigger mount for pinning the section
  useEffect(() => {
    const el = sectionRef.current;
    const container = containerRef.current;
    if (!el || !container || typeof window === 'undefined') return;

    if (window.innerWidth < 768) return;

    const ctx = gsap.context(() => {
      stRef.current = ScrollTrigger.create({
        trigger: container,
        pin: el,
        start: 'top top',
        end: '+=280%',
        scrub: 0.6,
        onUpdate: (self) => {
          setIsLanded(self.progress > 0.02);
          
          // Fallback step calculation when not driven by custom wheel/touch animation
          if (!isTransitioningRef.current) {
            const step = Math.min(3, Math.floor(self.progress * 4));
            if (step !== activeStepRef.current) {
              isTransitioningRef.current = true;
              setActiveStep(step);
              setTimeout(() => {
                isTransitioningRef.current = false;
              }, 500);
            }
          }
        }
      });
    }, el);

    return () => ctx.revert();
  }, []);

  // Event listeners for intercepting and locking wheel/touch scroll step updates (Skip prevention)
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const st = stRef.current;
      if (!st || !st.isActive) return;

      const dir = e.deltaY > 0 ? 1 : -1;
      const current = activeStepRef.current;
      const nextStep = current + dir;

      if (isTransitioningRef.current) {
        e.preventDefault();
        return;
      }

      if (nextStep >= 0 && nextStep <= 3) {
        e.preventDefault();
        isTransitioningRef.current = true;

        const targetProgress = nextStep / 3;
        const targetScroll = st.start + (st.end - st.start) * targetProgress;

        setActiveStep(nextStep);

        // Interpolate scroll smoothly using GSAP to prevent skipping
        const obj = { y: window.scrollY };
        gsap.to(obj, {
          y: targetScroll,
          duration: 0.45,
          ease: 'power2.out',
          onUpdate: () => {
            window.scrollTo(0, obj.y);
          },
          onComplete: () => {
            setTimeout(() => {
              isTransitioningRef.current = false;
            }, 100);
          }
        });
      }
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const st = stRef.current;
      if (!st || !st.isActive) return;

      const touchEndY = e.touches[0].clientY;
      const diffY = touchStartY - touchEndY;

      if (Math.abs(diffY) > 20) {
        const dir = diffY > 0 ? 1 : -1;
        const current = activeStepRef.current;
        const nextStep = current + dir;

        if (isTransitioningRef.current) {
          e.preventDefault();
          return;
        }

        if (nextStep >= 0 && nextStep <= 3) {
          e.preventDefault();
          isTransitioningRef.current = true;

          const targetProgress = nextStep / 3;
          const targetScroll = st.start + (st.end - st.start) * targetProgress;

          setActiveStep(nextStep);

          const obj = { y: window.scrollY };
          gsap.to(obj, {
            y: targetScroll,
            duration: 0.45,
            ease: 'power2.out',
            onUpdate: () => {
              window.scrollTo(0, obj.y);
            },
            onComplete: () => {
              setTimeout(() => {
                isTransitioningRef.current = false;
              }, 100);
            }
          });
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  const items = isArabic
    ? [
      {
        stepLabel: '01 / 04',
        title: 'شبكة الفروع في خريطة حية',
        desc: 'كل فرع عقدة متصلة بالمركز. تابع الحالة، المبيعات، والمستخدمين النشطين لحظة بلحظة.',
        icon: <NetworkIcon />,
      },
      {
        stepLabel: '02 / 04',
        title: 'لوحة تحكم موحّدة وفورية',
        desc: 'إدارة كامل الفروع من شاشة واحدة. تقارير مجمّعة، تنبيهات مباشرة، وتحكم كامل بكل العمليات.',
        icon: <ChartIcon />,
      },
      {
        stepLabel: '03 / 04',
        title: 'أمان وعزل تلقائي للمستأجرين',
        desc: 'بدون إعدادات إضافية معقدة. كل مستأجر معزول تماماً، وكل صلاحية مضبوطة بحرفية من أول يوم.',
        icon: <ShieldIcon />,
      },
      {
        stepLabel: '04 / 04',
        title: 'تصميم عربي وتوافق سلس',
        desc: 'واجهة RTL كاملة مع خطوط عربية محسّنة وتبديل فوري بين العربية والإنجليزي دون إعادة تحميل.',
        icon: <ArabicIcon />,
      },
    ]
    : [
      {
        stepLabel: '01 / 04',
        title: 'Live Branch Network Map',
        desc: 'Every branch is a connected node. Track status, sales, and active users live in real-time.',
        icon: <NetworkIcon />,
      },
      {
        stepLabel: '02 / 04',
        title: 'Unified Control Dashboard',
        desc: 'Manage all branches from one screen. Aggregate reports, instant alerts, and full control.',
        icon: <ChartIcon />,
      },
      {
        stepLabel: '03 / 04',
        title: 'Automatic Security & Isolation',
        desc: 'No complex setup required. Every tenant is isolated, every permission set from day one.',
        icon: <ShieldIcon />,
      },
      {
        stepLabel: '04 / 04',
        title: 'Arabic-First Responsive UI',
        desc: 'Full RTL interface with optimized fonts and instant bilingual switching without reloads.',
        icon: <ArabicIcon />,
      },
    ];

  // Rich premium accent gradients & colors
  const stepThemes = [
    { glow: 'rgba(249, 115, 22, 0.45)', border: 'rgba(249, 115, 22, 0.65)', accent: '#f97316', filter: 'hue-rotate(30deg) saturate(130%) brightness(1.05) contrast(1.12)' },
    { glow: 'rgba(59, 130, 246, 0.45)', border: 'rgba(59, 130, 246, 0.65)', accent: '#3b82f6', filter: 'hue-rotate(200deg) saturate(130%) brightness(1.05) contrast(1.12)' },
    { glow: 'rgba(6, 182, 212, 0.45)', border: 'rgba(6, 182, 212, 0.65)', accent: '#06b6d4', filter: 'hue-rotate(160deg) saturate(130%) brightness(1.05) contrast(1.12)' },
    { glow: 'rgba(168, 85, 247, 0.45)', border: 'rgba(168, 85, 247, 0.65)', accent: '#a855f7', filter: 'hue-rotate(270deg) saturate(130%) brightness(1.05) contrast(1.12)' }
  ];

  const activeItem = items[activeStep] || items[0];
  const activeTheme = stepThemes[activeStep] || stepThemes[0];
  const progressPercent = ((activeStep + 1) / items.length) * 100;

  // Single coordinated GSAP Reaction Timeline for X elements when activeStep changes
  useEffect(() => {
    if (activeStep === 0 && !isLanded) return;

    const target = document.getElementById('image-target');
    const container = document.getElementById('image-target-container');
    const sweep = sweepRef.current;

    if (!target || !container) return;

    // Create coordinated timeline (lasts 300-400ms total)
    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

    // 1. Subtle tilt + scale (350ms duration)
    tl.to(target, {
      scale: 1.02,
      rotation: 4,
      duration: 0.15,
    })

    // 2. Light sweep crosses the X (350ms duration)
    if (sweep) {
      tl.fromTo(sweep,
        { xPercent: -120, opacity: 0 },
        { xPercent: 120, opacity: 0.75, duration: 0.35, ease: 'power1.inOut' },
        '-=0.1'
      );
    }

    // 3. X returns to normal & glow pulse animation triggers
    tl.to(target, {
      scale: 1,
      rotation: 0,
      duration: 0.2,
      ease: 'power2.inOut',
    }, '-=0.25')
    .to(container, {
      boxShadow: `0 35px 85px ${activeTheme.glow.replace('0.45', '0.65')}`,
      borderColor: activeTheme.border,
      duration: 0.15,
    }, '-=0.3')
    .to(container, {
      boxShadow: `0 25px 70px ${activeTheme.glow}`,
      duration: 0.2,
    });

  }, [activeStep, isLanded, activeTheme]);

  return (
    <section id="experience" className="exp-stage relative overflow-hidden pad-y" dir={dir} ref={containerRef}>

      {/* Soft Dynamic Ambient Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none transition-all duration-700">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[700px] blur-[140px] pointer-events-none transition-all duration-700"
          style={{
            background: `radial-gradient(ellipse at center, ${activeTheme.glow}, transparent 70%)`,
          }}
        />
      </div>

      <div className="exp-shell relative z-10" ref={sectionRef}>
        <Reveal>
          <div className="exp-head mb-12 text-center max-w-3xl mx-auto">
            <span className="exp-label">{isArabic ? 'التجربة' : 'Experience'}</span>
            <h2>{isArabic ? 'جرب الفرق بنفسك' : 'Experience the difference yourself'}</h2>
            <p>{isArabic ? 'واجهة نظيفة، تنقل سلس، وكل شيء شغال من أول لحظة.' : 'Clean interface, smooth navigation, everything working from the first moment.'}</p>
          </div>
        </Reveal>

        {/* Storytelling Canvas: Left = Fixed Static X Visual Anchor, Right = Only Text Changes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-16 w-full">

          {/* Visual Anchor Container: The X Image Lands & Stays Completely Static */}
          <Reveal delay={100}>
            <div
              id="image-target-container"
              className="exp-visual overflow-hidden relative min-h-[380px] md:min-h-[460px] h-[460px] rounded-3xl border transition-all duration-700 bg-[#0c1017]/40 shadow-2xl flex items-center justify-center p-8 md:p-12"
              style={{
                borderColor: activeTheme.border,
                boxShadow: `0 25px 70px ${activeTheme.glow}`,
              }}
            >
              {/* The X Artwork Container - id="image-target" for the Hero scroll animation to target! */}
              <div
                id="image-target"
                className="x-image-frame w-full max-w-[88%] max-h-[88%] transition-all duration-700 relative"
                style={{
                  aspectRatio: 1.34,
                  opacity: isLanded ? 1 : 0,
                  filter: `drop-shadow(0 15px 45px ${activeTheme.glow})`,
                }}
              >
                {/* Pure 3D X Image — Fixed, Static, Unchanging Visual Anchor with dynamic CSS hue filter for lighting color effect */}
                <img
                  src="/generated-image-7e678040-c54d-4cfc-9407-a606acdc5521.png"
                  alt="X10 Story Visual Anchor"
                  className="w-full h-full object-cover transition-all duration-700"
                  style={{
                    filter: activeTheme.filter,
                  }}
                />

                {/* Tint overlay using mix-blend-mode to color the lighting of the image smoothly */}
                <div
                  className="absolute inset-0 pointer-events-none z-10 mix-blend-color transition-all duration-700"
                  style={{
                    backgroundColor: activeTheme.accent,
                    opacity: 0.35,
                  }}
                />

                {/* Glowing lighting effect layer */}
                <div
                  className="absolute inset-0 pointer-events-none z-15 mix-blend-screen transition-all duration-700"
                  style={{
                    background: `radial-gradient(circle at center, ${activeTheme.glow}, transparent 70%)`,
                    opacity: 0.5,
                  }}
                />

                {/* Rich gradient overlay for premium lighting contrast without oversaturating */}
                <div
                  className="absolute inset-0 pointer-events-none z-15 mix-blend-overlay transition-all duration-700 bg-gradient-to-tr"
                  style={{
                    backgroundImage: `linear-gradient(to top right, ${activeTheme.accent}35, transparent 65%)`,
                  }}
                />

                {/* Glass sweep overlay layer */}
                <div 
                  ref={sweepRef}
                  className="absolute inset-0 z-20 pointer-events-none opacity-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  style={{
                    transform: 'skewX(-25deg) translateX(-100%)',
                  }}
                />
              </div>
            </div>
          </Reveal>

          {/* Content Side: ONLY the Text Changes on Scroll */}
          <div className="relative w-full flex flex-col justify-between min-h-[380px] md:min-h-[460px] h-[460px] py-4">

            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="flex flex-col gap-6 my-auto relative z-10"
              >
                {/* Icon & Step Label */}
                <div className="flex items-center gap-4">
                  <motion.div
                    key={`icon-${activeStep}`}
                    initial={{ scale: 0.85, rotate: -8, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="w-14 h-14 rounded-2xl flex items-center justify-center bg-white/5 border transition-all duration-500 shadow-[0_0_30px_rgba(255,255,255,0.08)] shrink-0"
                    style={{
                      color: activeTheme.accent,
                      borderColor: `${activeTheme.accent}30`
                    }}
                  >
                    {activeItem.icon}
                  </motion.div>

                  <span
                    className="text-xs font-mono font-extrabold tracking-widest uppercase px-4 py-2 rounded-xl border transition-all duration-500"
                    style={{
                      backgroundColor: `${activeTheme.accent}15`,
                      borderColor: `${activeTheme.accent}30`,
                      color: activeTheme.accent,
                    }}
                  >
                    {activeItem.stepLabel}
                  </span>
                </div>

                {/* Large Bold Title */}
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-[1.2] tracking-tight">
                  {activeItem.title}
                </h3>

                {/* Large Readable Description */}
                <p className="text-lg md:text-xl leading-[1.85] text-gray-300 font-normal max-w-xl">
                  {activeItem.desc}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Progress Indicator at Bottom */}
            <div className="w-full mt-8 pt-6 border-t border-white/10 flex flex-col gap-3 relative z-10">
              <div className="flex items-center justify-between text-xs font-mono text-gray-400">
                <span>{isArabic ? `الخطوة ${activeStep + 1} من ${items.length}` : `Step ${activeStep + 1} of ${items.length}`}</span>
                <span className="font-extrabold transition-colors duration-500" style={{ color: activeTheme.accent }}>{Math.round(progressPercent)}%</span>
              </div>

              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden relative">
                <motion.div
                  className="h-full rounded-full shadow-lg"
                  style={{
                    background: `linear-gradient(to right, ${activeTheme.accent}, ${activeTheme.accent}80)`,
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                />
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

function NetworkIcon() {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>);
}
function ArabicIcon() {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7"><path d="M4 7V4h3M4 17v3h3M20 7V4h-3M20 17v3h-3M9 9h6v6H9z" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2" /></svg>);
}
function ChartIcon() {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>);
}
function ShieldIcon() {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>);
}
